<?php
    include_once('../DatabaseConnection.php');
    try {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $SearchInput = $_POST['SearchInput'];

            $SQLquery = "SELECT * FROM hotelinfo
                WHERE LOWER(HotelAmenities) LIKE LOWER('%$SearchInput%');";
            
            $Result = mysqli_query($DBConnection, $SQLquery);
            if ($Result) {
                $HotelInfo = [];
                while ($Row = mysqli_fetch_assoc($Result)) {
                    $LocationImagePath = file_get_contents($Row['HotelImagePath']);
                    $LocImageBase64 = base64_encode($LocationImagePath);
                    $HotelInfo[] = [
                        'HotelInfo' => $Row,
                        'HotelImage' => $LocImageBase64,
                    ];
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