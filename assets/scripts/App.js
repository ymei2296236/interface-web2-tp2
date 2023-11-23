import Tache from "./Tache.js";

export default class App {

    /**
     * Construit, injecte et lance les comportements de chaque nouvelle tâche
     * @param {Int} idTache 
     */
    injecteTache(idTache) 
    {
        let data = {
            action: 'afficheDetailsParTache',
            id: idTache
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
                let dom =  `<div data-js-tache=${data[0]['id']}>
                            <p>
                                <span>
                                    <small>Tâche : ${data[0]['tache']}</small>
                                </span>
                                -
                                <span>
                                    <small>Importance : ${data[0]['importance']}</small>
                                </span>
                                <span data-js-actions>
                                    <button data-js-action="afficher">Afficher le détail</button>
                                    <button data-js-action="supprimer">Supprimer</button>
                                </span>
                            </p>
                        </div>`;

                this._elTaches.insertAdjacentHTML('beforeend', dom);

                new Tache(this._elTaches.lastElementChild);
            }

        }.bind(this))
        .catch(function(err)
        {
            console.log(err.message);
        })
    }
}