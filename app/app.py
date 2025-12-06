from flask import Flask, render_template
import os
import logging

app = Flask(__name__, template_folder="template", static_folder="static")
app.config['DEBUG'] = False

# Configuration sécurité
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['PERMANENT_SESSION_LIFETIME'] = 1800  # 30 minutes

@app.route("/")
def index():
    """Endpoint principal sécurisé"""
    try:
        return render_template("dashboard.html")
    except Exception as e:
        logging.error("Erreur chargement template: %s", str(e))
        return "Erreur interne du serveur", 500

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'), 500

if __name__ == "__main__":
    # Configuration du port via variable d'environnement
    port = int(os.environ.get('PORT', 5000))
    
    # Désactivation du debug et configuration de l'écoute
    app.run(
        host='0.0.0.0',
        port=port,
        debug=False,
        threaded=True
    )