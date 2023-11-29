import Tache from "./Tache.js";
import { appelFetch } from "./App.js";


class TacheService 
{
    #_path;
    #_elTaches;
    #_elForm;
    #_elDetail;
    #_elDetailTop;
    #_elTacheDetail;
    
    constructor() 
    {
        this.#_elTaches = document.querySelector('[data-js-taches]');
        this.#_elForm = document.querySelector('[data-js-component="Formulaire"]');
        this.#_elDetail = document.querySelector('[data-js-component="Detail"]');
        this.#_elDetailTop = this.#_elDetail.getBoundingClientRect().top;
        this.#_elTacheDetail = document.querySelector('[data-js-tache-detail]');
        this.#_path = location.pathname; 

        this.accueil = this.#accueil.bind(this);
        this.afficheTachesParOrdre = this.#afficheTachesParOrdre.bind(this);
        this.ajouteTache = this.#ajouteTache.bind(this);
        this.afficheTacheParId = this.#afficheTacheParId.bind(this);
        this.afficheDetailParTacheId = this.#afficheDetailParTacheId.bind(this);
        this.supprimeTache = this.#supprimeTache.bind(this);
        this.traitePromesses = this.#traitePromesses.bind(this);
    }



    /**
     * Ajouter une tâche à la DB
     */
    #ajouteTache()
    {
        let data = 
            {
                action: 'ajouteTache',
                tache: this.#_elForm.tache.value,
                description: this.#_elForm.description.value,
                importance: this.#_elForm.querySelector('input[name="importance"]:checked').value
            },
            oOptions = 
            {    
                method: 'POST',
                headers: 
                {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            };

        // faire un appel async await fetch
        appelFetch('requetes/requetesAsync.php', oOptions) 
            .then(function(data)
            {
                // injète la tâche à la liste une fois qu'elle est insérée à la DB
                if (data != 0)
                {
                    this.afficheTacheParId(data);
                }
            }.bind(this))
            .catch(function(error) 
            {
                console.log(`Il y a eu un problème avec l'opération fetch: ${error.message}`);
            })
            .finally(function() 
            {
                //supprimer loader
            });
    }



    /**
     * Injecte la tache sélectionnée
     * @param {String} id 
     */
    #afficheTacheParId(id)
    {
        let template = 'template-parts/tache-template.html',
            divCible = this.#_elTaches;

        this.#traitePromesses(id, template, divCible);
    }



    /**
    * Supprimer une tâche  
    * @param {int} id 
    */
    #supprimeTache(id) 
    {
        let data = 
            {
                action: 'supprimeTache',
                id: id 
            },
            oOptions = 
            {    
                method: 'POST',
                headers: 
                {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            };

        // faire un appel async await fetch
        appelFetch('requetes/requetesAsync.php', oOptions) 
            .then(function(data)
            {
                if (data != "Les champs ne sont pas tous saisis." && data != "Erreur query string") 
                {
                    this.afficheTachesParOrdre();
                }
            }.bind(this))
            .catch(function(error) 
            {
                console.log(`Il y a eu un problème avec l'opération fetch: ${error.message}`);
            })
            .finally(function() 
            {
                //supprimer loader
            });
    }
    
    /**
    * Afficher la liste de tâches, ordonnées par 'tache' par défault
    * @param {string} ordre 
    */
    #afficheTachesParOrdre(ordre) 
    {
        let data = 
            {
                action: 'afficheTachesParOrdre',
                ordre: ordre
            },
            oOptions = 
            {    
                method: 'POST',
                headers: 
                {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            };

        // faire un appel async await fetch
        appelFetch('requetes/requetesAsync.php', oOptions) 
            .then(function(data)
            {
                if (data) 
                {
                    // vider la section de liste avant de l'injection
                    this.#_elTaches.innerHTML = '';
                    
                    for (let i = 0, l = data.length; i < l; i++) 
                    {
                        this.afficheTacheParId(data[i].id);
                    }
                }
            }.bind(this))
            .catch(function(error) 
            {
                console.log(`Il y a eu un problème avec l'opération fetch: ${error.message}`);
            })
            .finally(function() 
            {
                //supprimer loader
            }); 
    }



    /**
     * Afficher les détails d'une tâche
     * @param {int} id 
     */
    #afficheDetailParTacheId(id)
    {
        let template = 'template-parts/tache-detail-template.html',
            divCible = this.#_elTacheDetail;

        this.#traitePromesses(id, template, divCible, true);
    }

    /**
     * traiter les données retournées par l'appel Fetch
     * @param {Int} id 
     * @param {String} template 
     * @param {ElementHTML} divCible 
     * @param {Boolean} afficheDetailParTacheId 
     */
    #traitePromesses(id, template, divCible, afficheDetailParTacheId = false) 
    {
        let aUrls = 
            [
                `requetes/requetesAsync.php`, 
                template
            ],
            aPromesses = [],
            data = 
            {
                action: 'afficheDetailsParTache',
                id: encodeURIComponent(id),
            },
            oOptions = 
            { 
                method: 'POST',
                headers: 
                {
                    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                },
                body: JSON.stringify(data)
            };

        // faire un appel async await fetch dans un boucle
        aUrls.forEach(function(url) 
        {
            const promesse = appelFetch(url, oOptions);
            aPromesses.push(promesse);

        }.bind(this));

        Promise.all(aPromesses)
            .then(function(data) 
            {
                let tache = data[0],
                    template = data[1];

                if (data[0].description == '') data[0].description = 'Aucune description disponible.'

                if (tache) 
                {
                    /* si pour afficher les détails d'une tâche */
                    if (afficheDetailParTacheId == true)
                    {
                        // vider la section de détails avant de l'injection des détails
                        divCible.innerHTML = '';

                        // fait descendre la fenêtre du navigateur lorsqu'un clic à une tâche valide pour afficher les détails
                        let elDetailTop = this.#_elDetail.getBoundingClientRect().top;

                        if (elDetailTop > this.#_elDetailTop) this.#_elDetailTop = elDetailTop;

                        window.scrollTo({
                            top: this.#_elDetailTop - 200,
                            behavior:'smooth'
                        });
                    }

                    // créer le dom à partir du template et des données et l'injecter 
                    let templateDOM = new DOMParser().parseFromString(template, 'text/html').head.firstChild,
                        elCloneTemplate = templateDOM.cloneNode(true);

                    // remplacer les regex par les vrais valeurs
                    for (const cle in tache)
                    {
                        let regex = new RegExp('{{' + cle + '}}', 'g');
                        elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace(regex, tache[cle]);
                    }
            
                    // créer une copie du Node et l'importer à partir du fichier de template
                    let elNouvelTache = document.importNode(elCloneTemplate.content, true);
            
                    divCible.append(elNouvelTache);

                    /*  si pour afficher les détails d'une tâche */
                    if (afficheDetailParTacheId == false)
                    {
                        new Tache(divCible.lastElementChild);
                    }
                }     
            }.bind(this))
            .catch(function(error) 
            {
                console.log(`Il y a eu un problème avec l'opération fetch: ${error.message}`);
                
                this.accueil();

            }.bind(this));
    }


    /**
     *  Réinitialiser la section détail et l'Url si le fragment d'Url suite au hashbang  n'existe pas
     */
    #accueil()
    {
        let elTacheDetail = document.querySelector('[data-js-tache-detail]');

        elTacheDetail.innerHTML = '';

        history.replaceState(null, null, this.#_path);
    }
}


export const { accueil, ajouteTache, afficheDetailParTacheId, supprimeTache, afficheTachesParOrdre, afficheTacheParId } = new TacheService();