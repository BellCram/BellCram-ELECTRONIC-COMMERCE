<?php
    include_once('../DatabaseConnection.php');
    try {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $Command = $_POST['Command'];
            $HotelID = $_POST['HotelID'];

            if ($Command == 'Next') {
                $SQLquery = "SELECT * FROM hotelinfo WHERE HotelID > $HotelID ORDER BY HotelID ASC LIMIT 1";
            } else if ($Command == 'Back') {
                $SQLquery = "SELECT * FROM hotelinfo WHERE HotelID < $HotelID ORDER BY HotelID ASC LIMIT 1";
            }

            $Result = mysqli_query($DBConnection, $SQLquery);
            if ($Result) {
                $HotelInfo = [];
                $Row = mysqli_fetch_assoc($Result);
                $LocationImagePath = file_get_contents($Row['HotelImagePath']);
                $LocImageBase64 = base64_encode($LocationImagePath);
                $HotelInfo[] = [
                    'HotelInfo' => $Row,
                    'HotelImage' => $LocImageBase64,
                ];     
                mysqli_free_result($Result);
                echo json_encode(['Status' => 'SUCCESS', 'Message' => 'LOCATION INFO RETRIEVE', 'DATA' => $HotelInfo]);
            } else {
                echo json_encode(['Status' => 'ERROR', 'Message' => 'FAILED TO RETRIEVE INFO']);
            }
        } else {
            echo json_encode(['Status' => 'ERROR', 'Message' => 'METHOD IS NOT POST']);
        }
        mysqli_close($DBConnection);
    } catch (Exception $e) {
        echo json_encode(['Status' => 'ERROR', 'Message' => 'ERROR OCCURRED: DATABASE ERROR']);
        die();
    }
?>