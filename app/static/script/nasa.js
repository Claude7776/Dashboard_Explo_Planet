        // Clé API NASA
        const API_KEY = "jQUrsHd9jNo73Sp1S3jfZmAXWD3ysMYjkz5gBU8c";

        // Données des planètes (statiques pour la démonstration)
        const planetsData = {
            earth: {
                name: "Terre",
                distance: 0,
                mass: 1,
                radius: 1,
                temperature: 15,
                flux: 1,
                orbitalPeriod: 365.25,
                habitability: 0.99,
                factors: { water: 95, atmosphere: 90, stability: 98, radiation: 85 }
            },
            teegarden: {
                name: "Teegarden's Star c",
                distance: 12.5,
                mass: 1.1,
                radius: 1.04,
                temperature: -47,
                flux: 0.72,
                orbitalPeriod: 11.4,
                habitability: 0.84,
                factors: { water: 80, atmosphere: 70, stability: 85, radiation: 60 }
            },
            kepler1229: {
                name: "Kepler-1229 b",
                distance: 49.5,
                mass: 2.7,
                radius: 1.4,
                temperature: -48,
                flux: 0.73,
                orbitalPeriod: 86.7,
                habitability: 0.79,
                factors: { water: 75, atmosphere: 65, stability: 80, radiation: 55 }
            },
            trappist1f: {
                name: "TRAPPIST-1 f",
                distance: 39.5,
                mass: 0.93,
                radius: 1.04,
                temperature: -65,
                flux: 0.38,
                orbitalPeriod: 9.2,
                habitability: 0.76,
                factors: { water: 70, atmosphere: 60, stability: 75, radiation: 50 }
            },
            proxima: {
                name: "Proxima Centauri b",
                distance: 4.24,
                mass: 1.27,
                radius: 1.1,
                temperature: -39,
                flux: 0.65,
                orbitalPeriod: 11.2,
                habitability: 0.87,
                factors: { water: 85, atmosphere: 75, stability: 90, radiation: 60 }
            },
            lhs1140: {
                name: "LHS 1140 b",
                distance: 40.7,
                mass: 6.38,
                radius: 1.73,
                temperature: -50,
                flux: 0.46,
                orbitalPeriod: 24.7,
                habitability: 0.81,
                factors: { water: 78, atmosphere: 68, stability: 83, radiation: 58 }
            }
        };

        // Variables globales pour les graphiques
        let sizeChart, tempChart, fluxChart;

        // === VOS SCRIPTS NASA ===

        // === NASA APOD ===
        async function loadAPOD() {
            const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
            try {
                const res = await fetch(url);
                const data = await res.json();

                const container = document.getElementById('apodContainer');
                if (container) {
                    container.innerHTML = `
                        <div class="apod">
                            <h3>${data.title}</h3>
                            <img src="${data.url}" alt="${data.title}">
                            <p>${data.explanation}</p>
                        </div>
                    `;
                }
            } catch (error) {
                console.error("Erreur APOD:", error);
                const container = document.getElementById('apodContainer');
                if (container) {
                    container.innerHTML = `<div class="error-message">Erreur lors du chargement de l'image du jour NASA</div>`;
                }
            }
        }

        // === NASA NEO ===
        async function loadNEO() {
            const url = `https://api.nasa.gov/neo/rest/v1/feed?api_key=${API_KEY}`;
            try {
                const res = await fetch(url);
                const data = await res.json();

                const planetsDiv = document.getElementById('neoPlanets');
                const asteroids = Object.values(data.near_earth_objects)[0];

                // Limiter à 6 astéroïdes pour ne pas surcharger l'interface
                const limitedAsteroids = asteroids.slice(0, 6);

                // Injection des cartes
                planetsDiv.innerHTML = '';

for (const obj of limitedAsteroids) {
    planetsDiv.insertAdjacentHTML("beforeend", `
        <div class="planet-card">
            <div class="planet-image">☄️</div>
            <h3>${obj.name}</h3>
            <p>Diamètre: ${obj.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km</p>
            <p>Vitesse: ${Number.parseFloat(obj.close_approach_data[0].relative_velocity.kilometers_per_hour).toFixed(0)} km/h</p>
            <p>Distance: ${Number.parseFloat(obj.close_approach_data[0].miss_distance.kilometers).toFixed(0)} km</p>
        </div>
    `);
}

                // Préparation des données pour Chart.js
                const labels = limitedAsteroids.map(obj => 
                    obj.name.length > 15 ? obj.name.substring(0, 15) + '...' : obj.name
                );
                const diameters = limitedAsteroids.map(obj => 
                    obj.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)
                );

                const ctx = document.getElementById("neoChart").getContext("2d");
                
                // Détruire le graphique existant s'il y en a un
                if (window.neoChartInstance) {
                    window.neoChartInstance.destroy();
                }
                
                window.neoChartInstance = new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: labels,
                        datasets: [{
                            label: "Diamètre (km)",
                            data: diameters,
                            backgroundColor: "rgba(46, 134, 222, 0.6)",
                            borderColor: "rgba(46, 134, 222, 1)",
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                labels: { color: 'white' }
                            },
                            title: {
                                display: true,
                                text: "Comparaison des diamètres des astéroïdes (NASA NEO)",
                                color: 'white'
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: { 
                                    display: true, 
                                    text: "Diamètre (km)",
                                    color: 'white'
                                },
                                ticks: { color: 'white' }
                            },
                            x: {
                                ticks: { 
                                    color: 'white',
                                    maxRotation: 45
                                }
                            }
                        }
                    }
                });

            } catch (error) {
                console.error("Erreur NEO:", error);
                const planetsDiv = document.getElementById('neoPlanets');
                if (planetsDiv) {
                    planetsDiv.innerHTML = `<div class="error-message">Erreur lors du chargement des données NEO</div>`;
                }
            }
        }

        // === MES FONCTIONS EXISTANTES (adaptées) ===

        // Initialisation des graphiques de comparaison
        function initializeCharts() {
            const sizeCtx = document.getElementById('sizeChart').getContext('2d');
            const tempCtx = document.getElementById('tempChart').getContext('2d');
            const fluxCtx = document.getElementById('fluxChart').getContext('2d');

            sizeChart = new Chart(sizeCtx, {
                type: 'bar',
                data: {
                    labels: ['Terre', 'Teegarden c'],
                    datasets: [{ 
                        label: 'Rayon (Terre=1)', 
                        data: [1, 1.04], 
                        backgroundColor: ['#2e86de', '#7fdbda'],
                        borderColor: ['#2e86de', '#7fdbda'],
                        borderWidth: 2
                    }]
                },
                options: getChartOptions('Rayon terrestre (R⊕)')
            });

            tempChart = new Chart(tempCtx, {
                type: 'bar',
                data: {
                    labels: ['Terre', 'Teegarden c'],
                    datasets: [{ 
                        label: 'Température (°C)', 
                        data: [15, -47], 
                        backgroundColor: ['#2e86de', '#7fdbda'],
                        borderColor: ['#2e86de', '#7fdbda'],
                        borderWidth: 2
                    }]
                },
                options: getChartOptions('Température (°C)')
            });

            fluxChart = new Chart(fluxCtx, {
                type: 'bar',
                data: {
                    labels: ['Terre', 'Teegarden c'],
                    datasets: [{ 
                        label: 'Flux stellaire (Terre=1)', 
                        data: [1, 0.72], 
                        backgroundColor: ['#2e86de', '#7fdbda'],
                        borderColor: ['#2e86de', '#7fdbda'],
                        borderWidth: 2
                    }]
                },
                options: getChartOptions('Flux stellaire (S⊕)')
            });
        }

        // Options communes des graphiques
        function getChartOptions(yAxisTitle) {
            return {
                responsive: true,
                plugins: {
                    legend: {
                        labels: { color: 'white' }
                    }
                },
                scales: { 
                    y: { 
                        beginAtZero: true,
                        title: { 
                            display: true, 
                            text: yAxisTitle,
                            color: 'white'
                        },
                        ticks: { color: 'white' }
                    },
                    x: {
                        ticks: { color: 'white' }
                    }
                }
            };
        }

        // Gestion des sélections de planètes
        function attachPlanetEventListeners() {
    document.querySelectorAll('.planet-item').forEach(item => {
        item.addEventListener('click', function() {
            const prev = document.querySelector('.planet-item.selected');
            if (prev) prev.classList.remove('selected');
            this.classList.add('selected');

            const planetId = this.getAttribute('data-planet');
            const planet = planetsData[planetId];
            
            // On passe l'élément cliqué (this) à updateSelectedPlanet
            updateSelectedPlanet(planet, this);
        });
    });
}

        // Met à jour la planète sélectionnée
function updateSelectedPlanet(planet, element) {
    if (!planet) return;
    
    document.querySelector('.selected-planet span').textContent = planet.name;

    const planetCard = document.getElementById('selectedExoplanet');
    planetCard.querySelector('h3').textContent = planet.name;
    planetCard.querySelector('.planet-image').textContent = planet === planetsData.earth ? '🌎' : '🪐';

    const pElems = planetCard.querySelectorAll('p');
    if (pElems.length >= 4) {
        pElems[0].textContent = `Distance: ${planet.distance} AL`;
        pElems[1].textContent = `Masse: ${planet.mass} M⊕`;
        pElems[2].textContent = `Rayon: ${planet.radius} R⊕`;
        pElems[3].textContent = `Période orbitale: ${planet.orbitalPeriod} jours`;
    }

    const discoveryYearElem = planetCard.querySelector('.discovery-year');
    if (planet !== planetsData.earth) {
        // Utiliser l'élément passé en paramètre pour obtenir l'année
        const match = element.textContent.match(/\((\d{4})\)/);
        const year = match ? match[1] : '';
        discoveryYearElem.textContent = year ? `Découverte: ${year}` : '';
        discoveryYearElem.style.display = year ? 'block' : 'none';
    } else {
        discoveryYearElem.style.display = 'none';
    }

    planetCard.querySelector('.habitability-score').textContent = `Habitabilité: ${planet.habitability}`;

    // Mise à jour des graphiques
    updateCharts(planet);
    
    // Mise à jour des facteurs d'habitabilité
    updateHabitabilityFactors(planet.factors);
}
        // Met à jour les graphiques
        function updateCharts(planet) {
            sizeChart.data.labels = ['Terre', planet.name];
            sizeChart.data.datasets[0].data = [1, planet.radius];
            sizeChart.update();

            tempChart.data.labels = ['Terre', planet.name];
            tempChart.data.datasets[0].data = [15, planet.temperature];
            tempChart.update();

            fluxChart.data.labels = ['Terre', planet.name];
            fluxChart.data.datasets[0].data = [1, planet.flux];
            fluxChart.update();
        }

        // Met à jour les facteurs d'habitabilité
        function updateHabitabilityFactors(factors) {
            const factorEls = document.querySelectorAll('.factor-value');
            if (factorEls.length >= 4 && factors) {
                factorEls[0].style.width = `${factors.water}%`;
                factorEls[1].style.width = `${factors.atmosphere}%`;
                factorEls[2].style.width = `${factors.stability}%`;
                factorEls[3].style.width = `${factors.radiation}%`;
            }
        }

        // Export des données en CSV
        document.getElementById('exportBtn').addEventListener('click', function() {
            let csvContent = "Planète,Distance (AL),Masse (M⊕),Rayon (R⊕),Période orbitale (jours),Température (°C),Flux stellaire,Habitabilité\r\n";
            
            for (const [key, planet] of Object.entries(planetsData)) {
                csvContent += `${planet.name},${planet.distance},${planet.mass},${planet.radius},${planet.orbitalPeriod},${planet.temperature},${planet.flux},${planet.habitability}\r\n`;
            }
            
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', 'donnees_planetes_habitables.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });

        // Actualisation des données NASA
        document.getElementById('refreshData').addEventListener('click', async function() {
            const btn = this;
            const originalText = btn.innerHTML;
            btn.innerHTML = '<div class="loading">Actualisation...</div>';
            btn.disabled = true;
            
            await Promise.all([loadAPOD(), loadNEO()]);
            
            btn.innerHTML = originalText;
            btn.disabled = false;
            document.getElementById('lastUpdate').textContent = new Date().toLocaleDateString('fr-FR');
            
            // Animation de confirmation
            const botText = document.querySelector('.bot-text');
            botText.textContent = "Données NASA actualisées!";
            botText.style.color = "#6bcf7f";
            setTimeout(() => {
                botText.textContent = "Explorez l'univers!";
                botText.style.color = "white";
            }, 3000);
        });

        // Initialisation de l'application
        async function initializeApp() {
            // Initialiser les graphiques de comparaison
            initializeCharts();
            
            // Attacher les écouteurs d'événements
            attachPlanetEventListeners();
            
            // Charger les données NASA
            await Promise.all([loadAPOD(), loadNEO()]);
            
            // Mettre à jour la date
            document.getElementById('lastUpdate').textContent = new Date().toLocaleDateString('fr-FR');
            
            // Animation du texte du bot
// === FONCTION TYPEWRITER CORRIGÉE ===
function typeWriter(element, text, speed = 50, callback = null) {
    // Vérifier que l'élément existe
    if (!element) {
        console.error("Element not found for typewriter");
        return;
    }
    
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            setTimeout(callback, 1000);
        }
    }
    
    type();
}

// Animation du texte du bot avec typewriter
function startBotAnimation() {
    const botText = document.getElementById('bot-text');
    
    // Vérifier que l'élément existe
    if (!botText) {
        console.error("Element 'botText' not found");
        return;
    }
    
    const messages = [
    "👋 Bienvenue explorateur ! Prépare-toi à voyager entre Terre et exoplanètes…",
    "🌌 Aujourd’hui, notre dashboard ouvre une fenêtre sur l’univers numérique.",
    "🚀 Chaque planète dévoile ses secrets : distance, vitesse, habitabilité…",
    "✨ Souviens-toi : les chiffres ne sont pas que des données, ce sont des histoires.",
    "🛰️ Les satellites nous transmettent des échos du cosmos, traduits en données vivantes.",
    "🌍 La Terre est notre point de départ, mais l’horizon s’étend vers des milliers de mondes.",
    "🔭 Chaque clic est une observation, chaque filtre une exploration interstellaire.",
    "💫 Derrière chaque chiffre se cache une aventure cosmique prête à être racontée.",
    "🌠 Le ciel n’est pas une limite, mais une invitation à découvrir l’infini.",
    "📊 Les données deviennent des constellations numériques, reliant science et imagination.",
    "De la Terre 🌍 aux exoplanètes, en gardant un œil sur les comètes qui frôlent notre ciel.",
    ];
    
    let messageIndex = 0;
    
    function showNextMessage() {
        typeWriter(botText, messages[messageIndex], 30, () => {
            messageIndex = (messageIndex + 1) % messages.length;
            setTimeout(showNextMessage, 1000);
        });
    }
    
    // Démarrer l'animation
    showNextMessage();
}

// Messages contextuels pour les interactions
function showBotMessage(message) {
    const botText = document.getElementById('bot-text');
    
    // Vérifier que l'élément existe
    if (!botText) {
        console.error("Element 'botText' not found in showBotMessage");
        return;
    }
    
    typeWriter(botText, message, 30);
}

// Initialisation sécurisée
function initializeTypewriter() {
    // Attendre que le DOM soit complètement chargé
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startBotAnimation);
    } else {
        // DOM déjà chargé
        startBotAnimation();
    }
}

// Démarrer l'initialisation
initializeTypewriter();        
}

        // Démarrage de l'application
        document.addEventListener('DOMContentLoaded', initializeApp);