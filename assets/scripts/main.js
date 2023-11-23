import Formulaire from "./Formulaire.js";
import TrierTaches from "./TrierTaches.js";
import Detail from "./Detail.js";
import { classMapping } from "./classMapping.js";

(function() 
{
    let elsFormulaire = document.querySelectorAll('[data-js-formulaire]'),
        elsTrierTaches = document.querySelectorAll('[data-js-trier-taches]'),
        elsDetail = document.querySelectorAll('[data-js-detail]'),
        elComponents = document.querySelectorAll('[data-js-component]');

    for (let i = 0, l = elsFormulaire.length; i < l; i++) 
    {
        new Formulaire(elsFormulaire[i]);
    }

    for (let i = 0, l = elsTrierTaches.length; i < l; i++) 
    {
        new TrierTaches(elsTrierTaches[i]);
    }

    for (let i = 0, l = elsDetail.length; i < l; i++) 
    {
        new Detail(elsDetail[i]);
    }

	for (let i = 0, l = elComponents.length; i < l; i++) 
    {
		let datasetComponent = elComponents[i].dataset.jsComponent, 			// => string
			elComponent = elComponents[i];

		for (let key in classMapping) 
        {
			if (datasetComponent == key) new classMapping[datasetComponent](elComponent);
		}
	}
})(); 