import { ajouteTache } from "./TacheService.js";
import Validation from "./Validation.js";

export default class Formulaire 
{
    #_el;
    #_elBouton;

    constructor(el) 
    {
        this.#_el = el;
        this.#_elBouton = this.#_el.querySelector('[data-js-btn]');   

        this.#init();
    }

    /**
     * Initialise les comportements
     */
    #init() 
    {
        this.#_elBouton.addEventListener('click', function(e) 
        {
            e.preventDefault();

            let validation = new Validation(this.#_el);
            
            /* Si valide */
            if (validation.estValide) 
            {
                ajouteTache();
                this.#_el.reset();
            }
        }.bind(this));
    }

}