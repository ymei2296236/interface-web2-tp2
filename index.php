<!DOCTYPE html>
<html lang="fr_CA">
<head>
    <!-- meta -->
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title>TP2 | Mei Yang</title>
	<meta name="description" content="TP2 du cours 582-21F-MA Programmation d'interface Web 1">

	<!-- styles -->
	<link rel="stylesheet" type="text/css" href="./assets/styles/styles.css">

	<!-- scripts -->
	<!-- <script src="./assets/scripts/aTaches.js"></script>
	<script src="./assets/scripts/App.js"></script>
	<script src="./assets/scripts/Detail.js"></script>
	<script src="./assets/scripts/Tache.js"></script>
	<script src="./assets/scripts/Formulaire.js"></script>
	<script src="./assets/scripts/TrierTaches.js"></script> -->
	<script type="module" src="./assets/scripts/main.js" defer></script>
</head>

<body data-js-component="Router">
	<header>
		<h1>TP2</h1>
        <p>Un gestionnaire de tâches (to-do-list) en POO.</p>
        <hr>
	</header>
	<main>

        <!-- Section ajout d'une tâche -->
        <section>
            <h3>Ajouter une tâche</h3>
            <form data-js-formulaire>
                <div>
                    <label for="tache">Nouvelle tâche : </label>
                    <input type="text" id="tache" name="tache">
                </div>

                <div>
                    <label for="description">Description : </label>
                    <input type="text" id="description" name="description">
                </div>

                <div>
                    <label for="haute">Haute : </label>
                    <input type="radio" id="haute" name="importance" value="1">
                    <label for="moyenne">Moyenne : </label>
                    <input type="radio" id="moyenne" name="importance" value="2">
                    <label for="basse">Basse : </label>
                    <input type="radio" id="basse" name="importance" value="3">
                </div>

                <div>
                    <button data-js-btn>Ajouter</button>
                </div>
            </form>
        </section>


        <!-- Section liste des tâches -->
        <section class="to-do-list">
            <h3>Liste des tâches</h3>

            <div data-js-taches>
            </div>

            <div class="to-do-list__actions" data-js-trier-taches>
                <button data-js-trier="tache">Trier par ordre alphabétique</button>
                <button data-js-trier="importance">Trier par importance</button>
            </div>
        </section>


        <!-- Section détail d'une tâche -->
        <section class="detail detail--ouvert" data-js-detail>
            <h3>Détail d'une tâche</h3>

            <div class="chevron chevron--top" data-js-chevron></div>

            <div class="detail__tache" data-js-tache-detail></div>
        </section>
</body>
</html>