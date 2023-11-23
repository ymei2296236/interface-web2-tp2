import App from "./App.js";
import TrierTaches from "./TrierTaches.js";
import {  ajouteTache, afficheDetailParTache, supprimeTache, trieTaches } from "./TacheService.js";

export default class Tache {
    constructor(el) {
        // super();
        this._el = el;
        this._index = this._el.dataset.jsTache;
        this._elActions = this._el.querySelector('[data-js-actions]');
        
        this._elTaches = this._el.closest('[data-js-taches]');
        this._elTacheDetail = document.querySelector('[data-js-tache-detail]');

        this.init();
    }


    /**
     * Initialise les comportements
     */
    init() {
        this._elActions.addEventListener('click', function(e) {
            if (e.target.dataset.jsAction == 'afficher') afficheDetailParTache(this._index);
            else if (e.target.dataset.jsAction == 'supprimer') supprimeTache(this._index);
        }.bind(this));
    }


    /**
     * Affiche le détail d'une tâche
     */
    afficheDetail() {

        let data = {
            action: 'afficheDetailsParTache',
            id: this._index 
        },
            oOptions = {
            method: 'POST',
            headers: {
                 'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        },
            requete = new Request('requetes/requetesAsync.php', oOptions);

        fetch(requete)
        .then(function(reponse)
        {
            if (reponse.ok) return reponse.json();
            else throw new Error('La réponse n\'est pas ok.');
        })
        .then(function(data)
        {
           if (data != 0)
           {
            let description = data[0].description;

            let elDetailDom =  `<div class="detail__info">
                                    <p><small>Tâche : </small>${data[0].tache}</p>
                                    <p><small>Description : </small>${description ? description : 'Aucune description disponible.'}</p>
                                    <p><small>Importance : </small>${data[0].importance}</p>
                                </div>`;

            this._elTacheDetail.innerHTML = elDetailDom;
            }

        }.bind(this))
        .catch(function(err)
        {
            console.log(err.message);
        })
    }


    /**
     * Supprime la tâche du tableau aTaches et appelle la méthode pour injecter les tâches mises à jour
     */
    supprimeTache() {

        // Réinjecte le tableau de tâches purgé de la tâche supprimée

        let data = {
            action: 'supprimeTache',
            id: this._index 
        },
            oOptions = {
            method: 'POST',
            headers: {
                 'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        },
            requete = new Request('requetes/requetesAsync.php', oOptions);

        fetch(requete)
        .then(function(reponse)
        {
            if (reponse.ok) return reponse.text();
            else throw new Error('La réponse n\'est pas ok.');
        })
        .then(function(data)
        {
            if (data != "Les champs ne sont pas tous saisis." && data != "Erreur query string") 
            {
                trieTaches('importance');

            }
        }.bind(this))
        .catch(function(err)
        {
            console.log(err.message);
        })
    }
}