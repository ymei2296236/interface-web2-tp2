import { afficheTachesParOrdre } from "./TacheService.js";

export default class TrierTaches 
{
    constructor(el) 
    {
        this._el = el;

        this.init();
    }


    /**
     * Initialise les comportements
     */
    init() 
    {
        this._el.addEventListener('click', function(e) 
        {
            let ordre = e.target.dataset.jsTrier;

            afficheTachesParOrdre(ordre);

        }.bind(this));
    }
}