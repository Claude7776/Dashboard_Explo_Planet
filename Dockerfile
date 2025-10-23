# Utilise une image Python légère
FROM python:3.12-slim

# Variables d'environnement
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PORT=8000

# Préparer le répertoire de l'application
WORKDIR /app

# Installer les dépendances système nécessaires
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Copier les fichiers de dépendances d'abord pour tirer profit du cache Docker
COPY requirements.txt /app/requirements.txt

# Créer un environnement virtuel et l'utiliser pour installer les paquets
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

RUN pip install --upgrade pip setuptools wheel
RUN pip install -r /app/requirements.txt

# Copier le code de l'application
COPY . /app

# Créer un utilisateur non-root pour exécuter l'application
RUN useradd --create-home --shell /bin/false appuser && chown -R appuser:appuser /app
USER appuser

# Exposer le port
EXPOSE 8000

# Commande de démarrage en production avec gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "4", "app:app"]
