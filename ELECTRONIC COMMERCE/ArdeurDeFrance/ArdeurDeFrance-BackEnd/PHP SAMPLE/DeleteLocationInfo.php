<?php
    include_once('../DatabaseConnection.php');
    try {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $HotelID = $_POST['HotelID'];

            $SQLquery = "DELETE FROM hotelinfo WHERE HotelID = ?";
            $stmt = mysqli_prepare($DBConnection, $SQLquery);
            mysqli_stmt_bind_param($stmt, "s", $HotelID);
            mysqli_stmt_execute($stmt);

            echo json_encode(['Status' => 'SUCCESS', 'Message' => 'LOCATION DELETED']);
        } else {
            echo json_encode(['Status' => 'ERROR', 'Message' => 'METHOD IS NOT POST']);
        }
        mysqli_close($DBConnection);
    } catch (Exception $e) {
        echo json_encode(['Status' => 'ERROR', 'Message' => 'ERROR OCCURRED: SCRIPT ERROR']);
        mysqli_close($DBConnection);
        die();
    }
    
?>