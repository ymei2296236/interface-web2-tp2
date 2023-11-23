import Tache from "./Tache.js";

class TacheService 
{
    constructor(el) 
    {
        this._el = el;
        this.afficheTachesParOrdre = this.afficheTachesParOrdre.bind(this);
        this.ajouteTache = this.ajouteTache.bind(this);
        this.injecteTache = this.injecteTache.bind(this);
        this.afficheDetailParTache = this.afficheDetailParTache.bind(this);
        this.supprimeTache = this.supprimeTache.bind(this);
    }

    afficheTachesParOrdre(ordre) 
    {
        let data = 
            {
                action: 'afficheTachesParOrdre',
                ordre: ordre
            },
            oOptions = 
            {
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
                    let elTaches = document.querySelector('[data-js-taches]');
                    let dom = '';

                    elTaches.innerHTML = '';
                    for (let i = 0, l = data.length; i < l; i++) {
                        this.injecteTache(data[i].id);
                    }
                }

            }.bind(this))
            .catch(function(err)
            {
                console.log(err.message);
            })
        
    }

    ajouteTache() 
    {
        let elForm = document.querySelector('[data-js-formulaire]');


        let data = 
            {
                action: 'ajouteTache',
                tache: elForm.tache.value,
                description: elForm.description.value,
                importance: elForm.querySelector('input[name="importance"]:checked').value
            },
            oOptions = 
            {
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
           if (data != 0)
           {
            this.injecteTache(data);
           }

        }.bind(this))
        .catch(function(err)
        {
            console.log(err.message);
        })
    }

    injecteTache(idTache) 
    {
        let data = 
            {
                action: 'afficheDetailsParTache',
                id: idTache
            },
            oOptions = 
            {
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
        }.bind(this))
        .then(function(data)
        {
           if (data != 0)
           {
                let elTaches = document.querySelector('[data-js-taches]');
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

                elTaches.insertAdjacentHTML('beforeend', dom);

                new Tache(elTaches.lastElementChild);
            }

        }.bind(this))
        .catch(function(err)
        {
            console.log(err.message);
        }.bind(this))
    }


    afficheDetailParTache(id) 
    {
        let data = 
            {
                action: 'afficheDetailsParTache',
                id: id 
            },
            oOptions = 
            {
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
            let description = data[0].description,
                elTacheDetail = document.querySelector('[data-js-tache-detail]');

            let elDetailDom =  `<div class="detail__info">
                                    <p><small>Tâche : </small>${data[0].tache}</p>
                                    <p><small>Description : </small>${description ? description : 'Aucune description disponible.'}</p>
                                    <p><small>Importance : </small>${data[0].importance}</p>
                                </div>`;

            elTacheDetail.innerHTML = elDetailDom;
            }

        }.bind(this))
        .catch(function(err)
        {
            console.log(err.message);
        })
    }

    supprimeTache(id) 
    {
        // Réinjecte le tableau de tâches purgé de la tâche supprimée
        let data = 
            {
                action: 'supprimeTache',
                id: id 
            },
            oOptions = 
            {
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
                afficheTachesParOrdre('importance');
            }
        }.bind(this))
        .catch(function(err)
        {
            console.log(err.message);
        })
    }
}

export const { ajouteTache, afficheDetailParTache, supprimeTache, afficheTachesParOrdre, injecteTache } = new TacheService();