<?php
    include_once('../DatabaseConnection.php');
    try {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $HotelID = $_POST['HotelID'];

            $SQLqueryFirst = "SELECT * FROM hotelinfo WHERE HotelId = ?";
            $stmt1 = mysqli_prepare($DBConnection, $SQLqueryFirst);
            mysqli_stmt_bind_param($stmt1, "s", $HotelID);
            mysqli_stmt_execute($stmt1);

            $RetrievedData = mysqli_stmt_get_result($stmt1);
            $Row1 = mysqli_fetch_assoc($RetrievedData);
            if ($Row1) {
                $LocationImagePath = file_get_contents($Row1['HotelImagePath']);
                $LocImageBase64 = base64_encode($LocationImagePath);

                $SQLquerySecond = "SELECT FeatureImagePath FROM featureimages WHERE HotelID = ?";
                $stmt2 = mysqli_prepare($DBConnection, $SQLquerySecond);
                mysqli_stmt_bind_param($stmt2, "s", $HotelID);
                mysqli_stmt_execute($stmt2);

                $Result = mysqli_stmt_get_result($stmt2);
                if ($Result) {
                    $FeatureImagePaths = [];
                    while ($Row2 = mysqli_fetch_assoc($Result)) {
                        $FeatureImagePaths[] = $Row2;
                    }
                    $FeatureImages = [];
                    foreach ($FeatureImagePaths as $ImagePath) {
                        $ImageContent = file_get_contents($ImagePath['FeatureImagePath']);
                        $ImageBase64 = base64_encode($ImageContent);
                        $FeatureImages[] = ['FeatureImage' => $ImageBase64];
                    }

                    $CombinedData[] = [
                        'HotelInfo' => $Row1,
                        'HotelImage' => $LocImageBase64,
                        'FeatureImages' => $FeatureImages
                    ];
                    mysqli_free_result($Result);
                } else {
                    echo json_encode(['Status' => 'ERROR', 'Message' => 'ERROR OCCURRED: FAILED TO RETRIEVE FEATURE IMAGE PATH']);
                }
                mysqli_free_result($RetrievedData);
                echo json_encode(['Status' => 'SUCCESS', 'Message' => 'LOCATION INFO RETRIEVED', 'DATA' => $CombinedData]);
            } else {
                echo json_encode(['Status' => 'ERROR', 'Message' => 'NO DATA FOUND']);
            }
            mysqli_stmt_close($stmt1);
            mysqli_stmt_close($stmt2);
        } else {
            echo json_encode(['Status' => 'ERROR', 'Message' => 'METHOD IS NOT POST']);
        }
        mysqli_close($DBConnection);
    } catch (Exception $e) {
        echo json_encode(['Status' => 'ERROR', 'Message' => 'ERROR OCCURRED: DATABASE ERROR']);
        die();
    }
?>