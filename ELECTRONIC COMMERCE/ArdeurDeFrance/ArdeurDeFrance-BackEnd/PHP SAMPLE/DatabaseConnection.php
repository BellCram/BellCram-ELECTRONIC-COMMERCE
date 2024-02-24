<?php
    $DatabaseHost = 'localhost';
    $DatabaseUsername = 'root';
    $DatabasePassword = '';
    $DatabaseName = 'QuickSpotZC';
    
    try {
        $DBConnection = @mysqli_connect($DatabaseHost, $DatabaseUsername, $DatabasePassword, $DatabaseName);
        if (!$DBConnection) {
            echo json_encode(['Status' => 'ERROR', 'DATABASE CONNECTION: FAILED']);
            die();
        }
    } catch (Exception $e) {
        echo json_encode(['Status' => 'ERROR', 'DATABASE CONNECTION: ERROR OCCURED']);
        die();
    }
?>