<?php
    require_once('fonctionsDB.php');

    $request_payload = file_get_contents('php://input');
    $data = json_decode($request_payload, true);
    // requêtes asynchrones par fetch POST
    if (isset($data['action'])) 
    {
        // Switch en fonction de l'action envoyée
        switch ($data['action']) 
        {
            case 'ajouteTache':   
                if (isset($data['tache'], $data['description'], $data['importance'])) {
                    
                    if ($data['tache'] != "" && $data['importance'] != "") {
            
                        $tache = htmlspecialchars($data['tache']);
                        $description = htmlspecialchars($data['description']);
                        $importance = htmlspecialchars($data['importance']);
        
            
                        echo ajouteTache($tache, $description, $importance);
                    } else {
                        echo 'Les champs ne sont pas tous saisis.';
                    }
                } else {
                    echo 'Erreur query string';
                }
                break;
             
            case 'afficheTachesParOrdre':
                if (isset($data['ordre']))
                {
                    $ordre = htmlspecialchars($data['ordre']);
                    $data = array();   
                    $taches = afficheTachesParOrdre($ordre);

                    while ($tache = mysqli_fetch_assoc($taches)) { 
                        $data[] = $tache;
                    }
                
                    header('Content-type: application/json; charset=utf-8');
                    echo json_encode($data);
                }

                break;

            // case 'afficheDetailsParTache':
                if (isset($data['id'])) 
                {
                    $taches = afficheDetailsParTache($data['id']);
                    $data = [];

                    if (mysqli_num_rows($taches) > 0) {
                        // Récupérer la ligne suivante d'un ensemble de résultats sous forme de tableau associatif
                        while ($tache = mysqli_fetch_assoc($taches)) { 
                            $data[] = $tache;
                        }
                    }
                    header('Content-type: application/json; charset=utf-8');
					echo json_encode($data);
                }
                break;

            case 'supprimeTache':
                if (isset($data['id'])) 
                {
                    if ($data['id'] != '') 
                    {
                        $id = htmlspecialchars($data['id']);
                
                        supprimeTache($id);
                    }
                    else 
                    {
                        echo 'Les champs ne sont pas tous saisis.';
                    }
                } 
                else 
                {
                    echo 'Erreur query string';
                }

                break;

        }
    } 
    // requêtes asynchrones par fetch GET
    else if (isset($_GET['idTache'])) {

        $id_tache = htmlspecialchars($_GET['idTache']);

        // Si l'id existe
        if (mysqli_num_rows(afficheDetailsParTache($id_tache)) > 0) {

            // Obtenir l'usager dans la BD
            $data = mysqli_fetch_assoc(afficheDetailsParTache($id_tache));

        } else {
            $data = 'Cet usager n\'existe pas.';
        }
        header('Content-type: application/json; charset=utf-8');
        echo json_encode($data);
    }
    else {
        echo 'Erreur action';					
    }


?>