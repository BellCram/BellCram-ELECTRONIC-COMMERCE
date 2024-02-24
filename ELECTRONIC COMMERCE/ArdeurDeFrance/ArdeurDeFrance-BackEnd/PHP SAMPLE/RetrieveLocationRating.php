<?php
    include_once('../DatabaseConnection.php');
    try {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $HotelID = $_POST['HotelID'];

            $SQLqueryFirst = "SELECT AVG(Rating) AS Rating, COUNT(*) AS ReviewCount
                FROM locationreview WHERE HotelID = ?";
            $stmt1 = mysqli_prepare($DBConnection, $SQLqueryFirst);
            mysqli_stmt_bind_param($stmt1, "s", $HotelID);
            mysqli_stmt_execute($stmt1);

            mysqli_stmt_bind_result($stmt1, $Rating, $ReviewCount);
            mysqli_stmt_fetch($stmt1);
            $CombinedData[] = [
                'HotelRating' => $Rating,
                'ReviewCount' => $ReviewCount,
            ];
            mysqli_stmt_close($stmt1);
            echo json_encode(['Status' => 'SUCCESS', 'Message' => 'LOCATION RATING RETRIEVED', 'DATA' => $CombinedData]);
        } else {
            echo json_encode(['Status' => 'ERROR', 'Message' => 'METHOD IS NOT POST']);
        }
        mysqli_close($DBConnection);
    } catch (Exception $e) {
        echo json_encode(['Status' => 'ERROR', 'Message' => 'ERROR OCCURRED: DATABASE ERROR']);
        die();
    }
?>