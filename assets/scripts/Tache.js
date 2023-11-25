import { supprimeTache } from "./TacheService.js";

export default class Tache 
{
    constructor(el) 
    {
        this._el = el;
        this._index = this._el.dataset.jsTache;
        this._elActions = this._el.querySelector('[data-js-actions]');
        this.init();
    }


    /**
     * Initialise le comportement de suppression
     */
    init() 
    {
        this._elActions.addEventListener('click', function(e) 
        {
            if (e.target.dataset.jsAction == 'supprimer') supprimeTache(this._index);
        }.bind(this));
    }


}