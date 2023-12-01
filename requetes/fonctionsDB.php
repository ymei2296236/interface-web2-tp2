<?php

$connexion = connexionDB();

/**
 * Connection avec la base de données
 */
function connexionDB() {
    define('DB_HOST', 'localhost');
    define('DB_USER', 'root');                  // Localhost
    define('DB_PASSWORD', 'root');		// Localhost MAC
    // define('DB_PASSWORD', '');			// Localhost Windows

    $laConnexion = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD);
            
    if (!$laConnexion) {
        // La connexion n'a pas fonctionné
        die('Erreur de connexion à la base de données. ' . mysqli_connect_error());
    }
    
    $db = mysqli_select_db($laConnexion, 'to-do-list'); 	// Localhost

    if (!$db) {
        die ('La base de données n\'existe pas.');
    }
    
    mysqli_query($laConnexion, 'SET NAMES "utf8"');
    return $laConnexion;
}

/**
 * Exécute la requête SQL
 * Si le paramètre $insert est true, retourne l'id de la ressource ajoutée à la db
 */
function executeRequete($requete, $insert = false) 
{
    global $connexion;
    if ($insert) 
    {
        mysqli_query($connexion, $requete);
        return $connexion->insert_id;
    } 
    else 
    {
        $resultats = mysqli_query($connexion, $requete);
        return $resultats;
    }
}

function ajouteTache($tache, $description, $importance)
{
    $query = "INSERT INTO taches (`tache`, `description`, `importance`) 
            VALUES ('" . $tache . "','" . $description . "','" . $importance. "')";
    return executeRequete($query, true);
}

function afficheTachesParOrdre($ordre = 'id')
{
    return executeRequete("SELECT * FROM taches ORDER BY $ordre");

}

function afficheDetailsParTache($id_tache)
{
    global $connexion;
    $id_tache = mysqli_real_escape_string($connexion, $id_tache);

    return executeRequete("SELECT * FROM taches WHERE id = ". $id_tache);
}

function supprimeTache($id_tache)
{
    global $connexion;
    $id_tache = mysqli_real_escape_string($connexion, $id_tache);

    return executeRequete("DELETE FROM taches WHERE id = ". $id_tache);
}

?>