import Detail from "./Detail.js";
import {  ajouteTache, afficheDetailParTache, supprimeTache, afficheTachesParOrdre } from "./TacheService.js";

export default class Tache 
{
    constructor(el) 
    {
        this._el = el;
        this._index = this._el.dataset.jsTache;
        this._elActions = this._el.querySelector('[data-js-actions]');
        this._elsDetail = document.querySelector('[data-js-detail]');
        this.init();
    }


    /**
     * Initialise les comportements
     */
    init() 
    {
        this._elActions.addEventListener('click', function(e) 
        {
            if (e.target.dataset.jsAction == 'afficher')
            {
                afficheDetailParTache(this._index);
                new Detail(this._elsDetail);
            } 
            else if (e.target.dataset.jsAction == 'supprimer') {
                supprimeTache(this._index);
            }
        }.bind(this));
    }
}