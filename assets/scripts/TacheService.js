class TacheService {

    constructor() 
    {
        // this._elTache = 
        // this._elTemplateTache = 
        this.init();
    }

    init()
    {
    }

    
    ajouteTache(tache, description, importance)
    {
        let nouvelTache = 
        {
             action: 'ajouteTache',
             tache: tache,
             description: description,
             importance: importance
        }

        let oOptions = 
        {
             method: 'POST',
             headers: {
                 'Content-type': 'application/json'
             },
             body: JSON.stringify(nouvelTache)
        }

        fetch('requetes/requeteAsync.php', oOptions)
        .then(function(reponse)
        {
            if (reponse.ok) return reponse.json();
            else throw new Error('La réponse n\'est pas ok.');
        })
        .then(function(data)
        {
           console.log(data);

        })
        .catch(function(err)
        {
            console.log(err.message);
        })
    }

    

    afficheTache()
    {
        // fetch('template-parts/tache-template.html')
        //      .then(function(reponse)
        //      {
        //          if (reponse.ok) return reponse.json();
        //          else throw new Error('La réponse n\'est pas ok.');
        //      })
        //      .then(function(data)
        //      {
                console.log(data);
                //  this._elTache.innerHTML = '';
                //  // console.log(data);
                //  for (let i = 0, l = data.length; i < l; i++) {
                //      // console.log(data[i]);
                //      let elCloneTemplate = this._elTemplateTache.cloneNode(true);
                     
                //      for (const cle in data[i])
                //      {
                //          let regex = new RegExp('{{' + cle + '}}', 'g');
                //          elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace(regex, data[i][cle]);
                //      }
                     
                //      let elNouveauJoueur = document.importNode(elCloneTemplate.content, true);
 
                //      // container cible
                //      this._elTache.append(elNouveauJoueur);
                //  }
 
            //  })
            //  .catch(function(err)
            //  {
            //      console.log(err.message);
            //  })
    
    }
    
    afficheDetailParTache()
    {

    }
    supprimeTache()
    {
        
    }

    trieTaches()
    {

    }
        
}

export const { ajouteTache, afficheTache, afficheDetailParTache, supprimeTache, trieTaches } = new TacheService();