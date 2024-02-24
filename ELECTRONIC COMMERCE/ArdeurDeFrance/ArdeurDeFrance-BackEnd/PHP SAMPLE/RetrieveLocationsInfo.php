<?php
    include_once('../DatabaseConnection.php');
    try {
        $SQL = "SELECT * FROM hotelinfo";
        $stmt1 = mysqli_prepare($DBConnection, $SQL);
        if ($stmt1) {
            mysqli_stmt_execute($stmt1);
            $RetrivedData = mysqli_stmt_get_result($stmt1);
            if ($RetrivedData) {
                $CombinedData = [];
                while ($Row1 = mysqli_fetch_assoc($RetrivedData)) {
                    $HotelId = $Row1['HotelID'];

                    $LocationImagePath = file_get_contents($Row1['HotelImagePath']);
                    $LocImageBase64 = base64_encode($LocationImagePath);

                    $SQL = "SELECT FeatureImagePath FROM featureimages WHERE HotelID = $HotelId";
                    $Result = mysqli_query($DBConnection, $SQL);
                    if ($Result) {
                        $FeatureImagePaths = [];
                        while ($Row2 = mysqli_fetch_assoc($Result)) {
                            $FeatureImagePaths[] = $Row2;
                        }
                        $FeatureImages = [];
                        foreach ($FeatureImagePaths as $ImagePath) {
                            $ImageContent = file_get_contents($ImagePath['FeatureImagePath']);
                            $ImageBase64 = base64_encode($ImageContent);
                            $FeatureImages[] = [
                                'FeatureImage' => $ImageBase64,
                            ];
                        }
                        $CombinedData[] = ['HotelInfo' => $Row1, 'HotelImage' => $LocImageBase64,
                            'FeatureImages' => $FeatureImages];
                        mysqli_free_result($Result);
                    } else {
                        echo json_encode(['Status' => 'ERROR', 'Message' => 'ERROR OCCURRED: FAILED TO RETRIEVE FEATURE IMAGE PATH']);
                    }
                }
                mysqli_free_result($RetrivedData);
                echo json_encode(['Status' => 'SUCCESS','Message' => 'LOCATIONS INFO RETRIEVED', 'DATA' => $CombinedData]);
            } else {
                echo json_encode(['Status' => 'ERROR', 'Message' => 'ERROR OCCURRED: FAILED TO RETRIEVE DATA']);
            }
        } else {
            echo json_encode(['Status' => 'ERROR', 'Message' => 'ERROR OCCURRED: SQLQUERY ERROR']);
        }
        mysqli_close($DBConnection);
    } catch (Exception $e) {
        echo json_encode(['Status' => 'ERROR', 'Message' => 'ERROR OCCURRED: DATABASE ERROR']);
        die();
    }
?>