<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tests unitaires des fonctions du modèle</title>
</head>
<body>
    <h1>afficheTachesParOrdre('tache')</h1>
    <?php 
    require_once("requetes/fonctionsDB.php");

    $taches = afficheTachesParOrdre();  
    var_dump($taches); 

    ?>

    <h1>afficheDetailParTache(id)</h1>
    <?php 
    require_once("requetes/fonctionsDB.php");

    $tache = afficheDetailParTache(10);  
    var_dump($tache); 

    ?>
  
</body>
</html>

