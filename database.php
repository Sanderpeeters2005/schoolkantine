<?php

$dsn = "mysql:host=localhost;dbname=schoolkantine;charset=utf8";
$username = "schoolkantine";
$password = "schoolkantine";

try {
    $pdo = new PDO($dsn, $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    
    echo "Verbinding succesvol!<br>";

    // Controleer of er een zoekopdracht is ingediend
    if (isset($_GET['searchbar'])) {
        $search = '%' . $_GET['searchbar'] . '%';
        $stmt = $pdo->prepare("SELECT * FROM producten WHERE naam LIKE :search");
        $stmt->bindParam(':search', $search, PDO::PARAM_STR);
        $stmt->execute();

        $results = $stmt->fetchAll();

        if ($results) {
            foreach ($results as $row) {
                echo "ID: " . $row['id'] . " - Naam: " . $row['naam'] . " - Prijs: " . $row['prijs'] . "<br>";
            }
        } else {
            echo "Geen resultaten gevonden.";
        }
    }
    
} catch (PDOException $e) {
    die("Verbindingsfout: " . $e->getMessage());
}





?>

