<?php
    include_once('../DatabaseConnection.php');
    try {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $HotelID = $_POST['HotelID'];

            $SQLqueryFirst = "SELECT * FROM locationreview WHERE HotelID = ?";
            $stmt1 = mysqli_prepare($DBConnection, $SQLqueryFirst);
            mysqli_stmt_bind_param($stmt1, "s", $HotelID);
            mysqli_stmt_execute($stmt1);

            $Result = mysqli_stmt_get_result($stmt1);
            $LocationReviews = [];
            while ($Row = mysqli_fetch_assoc($Result)) {
                $ReviewImagePath = $Row['ReviewImagePath'];
                if ($ReviewImagePath != '') {
                    $ReviewImage = base64_encode(file_get_contents($ReviewImagePath));
                } else {
                    $ReviewImage = '';
                }

                $LocationReviews[] = [
                    'ReviewInfo' => $Row,
                    'ReviewImage' => $ReviewImage,
                ];
            }

            mysqli_stmt_close($stmt1);
            echo json_encode(['Status' => 'SUCCESS', 'Message' => 'LOCATION REVIEWS RETRIEVED', 'DATA' => $LocationReviews]);
        } else {
            echo json_encode(['Status' => 'ERROR', 'Message' => 'METHOD IS NOT POST']);
        }
        mysqli_close($DBConnection);
    } catch (Exception $e) {
        echo json_encode(['Status' => 'ERROR', 'Message' => 'ERROR OCCURRED: DATABASE ERROR']);
        die();
    }
?>