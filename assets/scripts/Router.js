import {  accueil, afficheDetailParTacheId } from "./TacheService.js";

export default class Router 
{
    #_routes;

    constructor()
    {
        this.#_routes = 
        [
            ['/tache/:id', afficheDetailParTacheId]
        ];
        
        this.#init();
    }

    #init()
    {
        this.#gereHashbang();
        
    
        /**
         * Gestion suite à l'événement hashchange
         */
        window.addEventListener('hashchange', function()
        {
            this.#gereHashbang();
        }.bind(this));
    }

    /**
    * Gestion du fragent d'URL suite au #!
    */
    #gereHashbang() 
    {
        let hash = window.location.hash.slice(2),
            isRoute = false;      
            
        if (hash.endsWith('/')) hash = hash.slice(0, -1);
        
        for (let i = 0, l = this.#_routes.length; i < l; i++) 
        {
            // parcourt chaque route
            let route = this.#_routes[i][0],
                isId = false;
                
                // si la route demande une valeur pour executer la requête
            if (route.indexOf(':') > -1) 
            {
                route = route.substring(0, route.indexOf('/:'));
                isId = true;
            } 
            
            // si cette route est trouvée dans le hash
            if (hash.indexOf(route) > -1) 
            {
                // décompose le hash par la route 
                let hashInArray = hash.split(route);
                
                // si une valeur/id trouvé dans le hash
                if (hashInArray[1] != '') 
                {
                    if (isId) 
                    {
                        // traite la valeur et execute la requête
                        let id  = hashInArray[1].slice(1);
                        this.#_routes[i][1](id);
                        isRoute = true;
                    }
                }
            } 
        }

        // si il n'y a pas de route dans le hash
        if (!isRoute) 
        {
            accueil();
        }
    }    
}
