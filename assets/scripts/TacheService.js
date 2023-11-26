import Tache from "./Tache.js";

class TacheService 
{
    #_path;
    #_elTaches;
    #_elForm;
    #_elTacheDetail;
    
    constructor() 
    {
        this.#_elTaches = document.querySelector('[data-js-taches]');
        this.#_elForm = document.querySelector('[data-js-formulaire]')
        this.#_elTacheDetail = document.querySelector('[data-js-tache-detail]');
        this.#_path = location.pathname; 

        this.accueil = this.#accueil.bind(this);
        this.afficheTachesParOrdre = this.#afficheTachesParOrdre.bind(this);
        this.ajouteTache = this.#ajouteTache.bind(this);
        this.afficheTacheParId = this.#afficheTacheParId.bind(this);
        this.afficheDetailParTacheId = this.#afficheDetailParTacheId.bind(this);
        this.supprimeTache = this.#supprimeTache.bind(this);
    }


    /**
     * Appels asynchrones Fetch POST, pour les méthodes :  #ajouteTache(), #afficheTachesParOrdre(), #supprimeTache(id)
     */

    /**
     * Ajouter une tâche à la DB
     */
    #ajouteTache()
    {
        // insèrer la nouvelle tâche à la BD
        this.#appelFetchPost(
            {
                action: 'ajouteTache',
                tache: this.#_elForm.tache.value,
                description: this.#_elForm.description.value,
                importance: this.#_elForm.querySelector('input[name="importance"]:checked').value
            }, 'text') 
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
     * Afficher la liste de tâches, ordonnées par 'tache' par défault
     * @param {string} ordre 
     */
    #afficheTachesParOrdre(ordre) 
    {
        this.#appelFetchPost(
            {
                action: 'afficheTachesParOrdre',
                ordre: ordre
            }, 'json') 
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
     * Supprimer une tâche  
     * @param {int} id 
     */
    #supprimeTache(id) 
    {
        this.#appelFetchPost(
            {
                action: 'supprimeTache',
                id: id 
            }, 'text') 
        // Réinjecte la liste de tâches purgé de la tâche supprimée
        .then(function(data)
        {
            if (data != "Les champs ne sont pas tous saisis." && data != "Erreur query string") 
            {
                afficheTachesParOrdre('importance');
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
    * Retourne la promesse de la fonction asynchrone par Fetch Post
    * @param {Object} data 
    * @param {String} type 
    * @returns 
    */
    async #appelFetchPost(data, type) 
    {
        try 
        {
            let response = await fetch('requetes/requetesAsync.php', 
            {
                method: 'POST',
                headers: 
                {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) 
            {   
                // spécifier la type de données de retour
                if (type == 'text') return response.text();
                else if (type == 'json') return response.json();
            }
            else throw new Error('La réponse n\'est pas OK');
        } 
        catch (error) 
        {
            return error.message;
        }
    };


    /**
    * Appels asynchrones Fetch GET avec engin gabarits, pour les méthodes : #afficheTacheParId(id), #afficheDetailParTacheId(id)
    */

    /**
     * Injecte la tache sélectionnée
     * @param {String} id 
     */
    #afficheTacheParId(id)
    {
        let template = 'template-parts/tache-template.html',
            divCible = this.#_elTaches,
            afficheDetailParTacheId = false;

        this.#appelFetchGet(id, template, divCible, afficheDetailParTacheId);
    }

    /**
     * Afficher les détails d'une tâche
     * @param {int} id 
     */
    #afficheDetailParTacheId(id)
    {
        let template = 'template-parts/tache-detail-template.html',
        divCible = this.#_elTacheDetail,
        afficheDetailParTacheId = true;

        this.#appelFetchGet(id, template, divCible, afficheDetailParTacheId);
    }

    /**
     * traiter les données retournées par le fetch #promessesFetch(id, template)
     * @param {Int} id 
     * @param {String} template 
     * @param {ElementHTML} divCible 
     * @param {Boolean} afficheDetailParTacheId 
     */
    #appelFetchGet(id, template, divCible, afficheDetailParTacheId) 
    {
        Promise.all(this.#promessesFetch(id, template))
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
                        let cible = document.querySelector('#cible');

                        window.scrollTo({
                            top:cible.getBoundingClientRect().top - 50,
                            behavior:'smooth'
                        });
                    }

                    // créer le dom à partir du template et des données et l'injecter 
                    this.#injecteTacheTemplate(divCible, tache, template);

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
     * spécifier la ressource à charger par l'appel asynchrones Fetch GET et recevoir la réponse
     * @param {int} id 
     * @param {*} string 
     * @returns 
     */
    #promessesFetch(id, template)
    {
        let encodedId = encodeURIComponent(id),
            aUrls = [`requetes/requetesAsync.php?idTache=${encodedId}`, template],
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
        return aPromesses;
    }


    /**
     * créer et injecter le dom à partir des données traitées par #appelFetchGet(id, template, divCible, afficheDetailParTacheId) 
     * @param {ElementHTML} divCible 
     * @param {Object} tache 
     * @param {String} template 
     */
    #injecteTacheTemplate(divCible, tache, template)
    {
        // convertir le template à un élément HTML
        let templateDOM = new DOMParser().parseFromString(template, 'text/html').head.firstChild;
        let elCloneTemplate = templateDOM.cloneNode(true);

        // remplacer les regex par les vrais valeurs
        for (const cle in tache)
        {
            let regex = new RegExp('{{' + cle + '}}', 'g');
            elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace(regex, tache[cle]);
        }

        // créer une copie du Node et l'importer à partir du fichier de template
        let elNouvelTache = document.importNode(elCloneTemplate.content, true);

        divCible.append(elNouvelTache);
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