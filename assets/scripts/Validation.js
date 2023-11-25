export default class Validation 
{
    constructor(el) 
    {
        this._el = el;
        this._elInputTache = this._el.tache;
        this._elsInputImportance = this._el.querySelectorAll('input[name="importance"]');

        this.init();
    }
    
    init()
    {
        this.valideForumlaire();
    }

    /**
     * Validation du formulaire
     * @returns
     */
    valideForumlaire() 
    {
        let estValide = true;

        /* Input 'Nouvelle tâche' */
        if (this._elInputTache.value == '') 
        {
            this._elInputTache.parentNode.classList.add('error');
            estValide = false;
        } 
        else 
        {
            if (this._elInputTache.parentNode.classList.contains('error')) 
                this._elInputTache.parentNode.classList.remove('error');
        }

        /* Inputs Radio 'Importance' */
        let elCheckedImportance = this._el.querySelector('input[name="importance"]:checked');

        if (elCheckedImportance) 
        {
            if (this._elsInputImportance[0].parentNode.classList.contains('error')) 
                this._elsInputImportance[0].parentNode.classList.remove('error');
        } 
        else 
        {
            this._elsInputImportance[0].parentNode.classList.add('error');
            estValide = false;
        }

        return estValide;
    }

	/**
	 * GETTER (public)
	 * Retourne le résultat de la validation
	 */
    get estValide()
    {
        return this.valideForumlaire();
    }
}