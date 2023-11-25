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
        this.accueil = this.accueil.bind(this);
        this._path = location.pathname; 

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
        let elForm = document.querySelector('[data-js-formulaire]'),
            data = 
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

    /**
     * Injecte la tache sélectionné
     * @param {String} id 
     */
    injecteTache(id) 
    {
        let encodedId = encodeURIComponent(id),
            aUrls = [`requetes/requetesAsync.php?idTache=${encodedId}`, 'template-parts/tache-template.html'],
            aPromesses = [];

        aUrls.forEach(function(url) 
        {
            const promesse = fetch(url)
                .then(function(response) 
                {
                    if (response.ok)
                    {
                        const contentType = response.headers.get("content-type");
                        if (contentType && contentType.indexOf("application/json") !== -1) return response.json();
                        else return response.text();
                    }
                    else throw new Error('La réponse n\'est pas OK');
                })

            aPromesses.push(promesse);
        });

        Promise.all(aPromesses)
            .then(function(data) 
            {
                let tache = data[0],
                    template = data[1];

                if (tache) 
                {
                    let dom;
                    let elTaches = document.querySelector('[data-js-taches]');

                    if (tache == 'Cette tache n\'existe pas.') 
                    {
                        dom = document.createElement('p');
                        dom.append(data);
                    }  
                    else 
                    {
                        let templateDOM = new DOMParser().parseFromString(template, 'text/html').head.firstChild;

                        let elCloneTemplate = templateDOM.cloneNode(true);
                        
                        for (const cle in tache)
                        {
                            let regex = new RegExp('{{' + cle + '}}', 'g');
                            elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace(regex, tache[cle]);
                        }
                        
                        let elNouvelTache = document.importNode(elCloneTemplate.content, true);

                        elTaches.append(elNouvelTache);

                        new Tache(elTaches.lastElementChild);
                    }
                }
            })
            .catch(function(error) 
            {
                console.log(`Il y a eu un problème avec l'opération fetch: ${error.message}`);
            });
    }

    afficheDetailParTache(id) 
    {
        let encodedId = encodeURIComponent(id),
            aUrls = [`requetes/requetesAsync.php?idTache=${encodedId}`, 'template-parts/tache-detail-template.html'],
            aPromesses = [];

        aUrls.forEach(function(url) 
        {
            const promesse = fetch(url)
                .then(function(response) 
                {
                    if (response.ok) 
                    {
                        const contentType = response.headers.get("content-type");
                        if (contentType && contentType.indexOf("application/json") !== -1) return response.json();
                        else return response.text();
                    }
                    else throw new Error('La réponse n\'est pas OK');
                })

            aPromesses.push(promesse);
        });

        Promise.all(aPromesses)
            .then(function(data) 
            {
                let tache = data[0],
                    template = data[1];

                    if (data[0].description == '') data[0].description = 'Aucune description disponible.'

                    console.log(tache);
                if (tache) 
                {

                    // let dom;
                    let elTacheDetail = document.querySelector('[data-js-tache-detail]');
                    elTacheDetail.innerHTML = '';
                    history.replaceState(null, null, '');

                    if (tache == 'Cette tâche n\'existe pas.') 
                    {
                        // dom = document.createElement('p');
                        // dom.append(data);

                        return tache;
                    }  
                    else 
                    {

                        let templateDOM = new DOMParser().parseFromString(template, 'text/html').head.firstChild;

                        let elCloneTemplate = templateDOM.cloneNode(true);
                        for (const cle in tache)
                        {
                            let regex = new RegExp('{{' + cle + '}}', 'g');
                            elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace(regex, tache[cle]);
                        }
                        
                        let elNouvelTache = document.importNode(elCloneTemplate.content, true);

                        elTacheDetail.append(elNouvelTache);
                    }
                }
                else
                {
                    console.log('tache-non-existe');
                }
            }.bind(this))
            .catch(function(error) 
            {
                // console.log(`Il y a eu un problème avec l'opération fetch: ${error.message}`);
                this.accueil();

            }.bind(this));
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

    accueil()
    {
        let elTacheDetail = document.querySelector('[data-js-tache-detail]');
        elTacheDetail.innerHTML = '';
        history.replaceState(null, null, this._path);
        console.log('replaceState');
    }
}

export const { accueil, ajouteTache, afficheDetailParTache, supprimeTache, afficheTachesParOrdre, injecteTache } = new TacheService();