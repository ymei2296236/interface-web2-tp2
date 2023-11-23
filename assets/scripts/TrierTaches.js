import App from "./App.js";

export default class TrierTaches extends App 
{
    constructor(el) {
        super();
        this._el = el;
        this._elTaches = document.querySelector('[data-js-taches]');

        this.init();
    }


    /**
     * Initialise les comportements
     */
    init() {
        this._el.addEventListener('click', function(e) {
            let ordre = e.target.dataset.jsTrier;
                this.trieTaches(ordre);
        }.bind(this));
    }


    /**
     * Réordonne le tableau aTaches et appelle la méthode pour injecter les tâches mises à jour
     * @param {String} propriete 
     */
    trieTaches(ordre) {

        let data = {
            action: 'getTaches',
            ordre: ordre
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
                if (data) 
                {
                    this._elTaches.innerHTML = '';
                    let dom = '';

                    for (let i = 0, l = data.length; i < l; i++) {
                        console.log(data);

                        dom += `<div data-js-tache=${data[i].id}>
                                    <p>
                                        <span>
                                            <small>Tâche : ${data[i].tache}</small>
                                        </span>
                                        -
                                        <span>
                                            <small>Importance : ${data[i].importance}</small>
                                        </span>
                                        <span data-js-actions>
                                            <button data-js-action="afficher">Afficher le détail</button>
                                            <button data-js-action="supprimer">Supprimer</button>
                                        </span>
                                    </p>
                                </div>`;
                    }
                    this._elTaches.innerHTML = dom;
                }

            }.bind(this))
            .catch(function(err)
            {
                console.log(err.message);
            })
        
    }
}