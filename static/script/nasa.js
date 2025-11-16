const API_KEY = "jQUrsHd9jNo73Sp1S3jfZmAXWD3ysMYjkz5gBU8c"; // remplace DEMO_KEY

async function loadAPOD() {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  // Injection dans ton header hero
  const container = document.querySelector('.comparison-header');
  if (container) {
    container.insertAdjacentHTML("beforeend", `
      <div class="apod">
        <h3>${data.title}</h3>
        <img src="${data.url}" alt="${data.title}" style="max-width:300px;border-radius:10px;">
        <p>${data.explanation}</p>
      </div>
    `);
  }
}
async function loadNEO() {
  const url = `https://api.nasa.gov/neo/rest/v1/feed?api_key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  const planetsDiv = document.querySelector('.planet-cards');
  Object.values(data.near_earth_objects)[0].forEach(obj => {
    planetsDiv.insertAdjacentHTML("beforeend", `
      <div class="planet-card">
      <head>
        <div class="planet-image">☄️</div>
        <h3>${obj.name}</h3>
        <p>Diamètre: ${obj.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km</p>
        <p>Vitesse: ${obj.close_approach_data[0].relative_velocity.kilometers_per_hour} km/h</p>
      </div>
      </head>
    `);
  });
}

function typeWriterEffect(element, text, speed = 50) {
  let i = 0;
  function typing() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}

function welcomeBotMessage() {
  const messages = [
    "👋 Bienvenue explorateur ! Prépare-toi à voyager entre Terre et exoplanètes…",
    "🌌 Aujourd’hui, notre dashboard ouvre une fenêtre sur l’univers numérique.",
    "🚀 Chaque planète dévoile ses secrets : distance, vitesse, habitabilité…",
    "✨ Souviens-toi : les chiffres ne sont pas que des données, ce sont des histoires."
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  const botElement = document.querySelector("#welcomeBot .bot-text");
  botElement.textContent = ""; // reset
  typeWriterEffect(botElement, randomMessage, 40);
}

window.addEventListener("DOMContentLoaded", welcomeBotMessage);
loadNEO();
loadAPOD();