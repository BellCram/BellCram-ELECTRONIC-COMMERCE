<?php
    include_once('../DatabaseConnection.php');
    try {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $InputChar = $_POST['Character'];

            $SQLquery = "SELECT * FROM hotelinfo
                WHERE LOWER(HotelName) LIKE LOWER('$InputChar%');";
            
            $Result = mysqli_query($DBConnection, $SQLquery);
            if ($Result) {
                $HotelInfo = [];
                while ($Row = mysqli_fetch_assoc($Result)) {
                    $HotelInfo[] = $Row;
                }
                mysqli_free_result($Result);
                echo json_encode(['Status' => 'SUCCESS', 'Message' => 'SHOWING CHAR SEARCH RESULT', 'DATA' => $HotelInfo]);
            } else {
                echo json_encode(['Status' => 'ERROR', 'Message' => 'FAILED TO RETRIEVE INFO']);
            }
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