import {  ajouteTache, afficheDetailParTache, supprimeTache, trieTaches } from "./TacheService.js";
import App from "./App.js";

export default class Formulaire extends App {
    constructor(el) {
        super();
        this._el = el;
        this._elInputTache = this._el.tache;
        this._elInputDescription = this._el.description;
        this._elsInputImportance = this._el.querySelectorAll('input[name="importance"]');
        this._elBouton = this._el.querySelector('[data-js-btn]'); 
        
        this._elTaches = document.querySelector('[data-js-taches]');

        this.init();
    }


    /**
     * Initialise les comportements
     */
    init() {
        this._elBouton.addEventListener('click', function(e) {
            e.preventDefault();

            /* Si valide */
            let estValide = this.valideFormulaire();
            if (estValide) {
                ajouteTache();
                this._el.reset();
            }
        }.bind(this));
    }


    /**
     * Validation du formulaire
     * @returns
     */
    valideFormulaire() {

        let estValide = true;

        /* Input 'Nouvelle tâche' */
        if (this._elInputTache.value == '') {
            this._elInputTache.parentNode.classList.add('error');
            estValide = false;
        } else {
            if (this._elInputTache.parentNode.classList.contains('error')) this._elInputTache.parentNode.classList.remove('error');
        }

        /* Inputs Radio 'Importance' */
        let elCheckedImportance = this._el.querySelector('input[name="importance"]:checked');

        if (elCheckedImportance) {
            if (this._elsInputImportance[0].parentNode.classList.contains('error')) this._elsInputImportance[0].parentNode.classList.remove('error');
        } else {
            this._elsInputImportance[0].parentNode.classList.add('error');
            estValide = false;
        }

        return estValide;
    }


    /**
     * Ajoute la tâche au tableau aTaches et appelle la méthode pour injecter la nouvelle tâche
     */
    // ajouteTache() 
    // {
    //     let data = {
    //         action: 'ajouteTache',
    //         tache: this._elInputTache.value,
    //         description: this._elInputDescription.value,
    //         importance: this._el.querySelector('input[name="importance"]:checked').value
    //     },
    //         oOptions = {
    //          method: 'POST',
    //          headers: {
    //              'Content-type': 'application/json'
    //          },
    //          body: JSON.stringify(data)
    //     },
    //         requete = new Request('requetes/requetesAsync.php', oOptions);

    //     fetch(requete)
    //     .then(function(reponse)
    //     {
    //         if (reponse.ok) return reponse.text();
    //         else throw new Error('La réponse n\'est pas ok.');
    //     })
    //     .then(function(data)
    //     {
    //        if (data != 0)
    //        {
    //         // console.log(data);
    //         this.injecteTache(data);
    //        }

    //     }.bind(this))
    //     .catch(function(err)
    //     {
    //         console.log(err.message);
    //     })

    // }
}