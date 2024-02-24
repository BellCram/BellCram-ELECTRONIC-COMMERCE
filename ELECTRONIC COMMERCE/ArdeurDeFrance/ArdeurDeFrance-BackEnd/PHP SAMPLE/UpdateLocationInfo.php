<?php
    include_once('../DatabaseConnection.php');
    try {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $HotelID = $_POST['HotelID'];
            $HotelName = $_POST['HotelName'];
            $HotelLocation = $_POST['HotelLocation'];
            $HotelCoordinates = $_POST['Coordinates'];
            $Type = $_POST['Type'];
            $PriceRange = $_POST['PriceRange'];
            $TimeAvailable = $_POST['TimeAvailable'];
            $ContactInfo = $_POST['ContactInfo'];
            $Description = $_POST['Description'];
            $Amenities = $_POST['Amenities'];
    
            // $HotelImagePath = HandleFileUpload($_FILES['LocationImg'], '../LocationImageFolder/');
            // $LocationFeaturesImagePath = [];
            // foreach ($_FILES as $Name => $File) {
            //     if (strpos($Name, 'LocationFeature') === 0) {
            //         $LocationFeaturesImagePath[] = HandleFileUpload($File, '../LocationFeaturesImageFolder/');
            //     }
            // } 

            $SQLqueryFirst = "UPDATE hotelinfo SET
                HotelName = ?, HotelLocation = ?, HotelCoordinates = ?,
                HotelPriceRange = ?, HotelTimeAvailable = ?, HotelContact = ?,
                HotelDescription = ?, HotelAmenities = ?, HotelType = ?
                WHERE HotelID = ?";
            $stmt1 = mysqli_prepare($DBConnection, $SQLqueryFirst);
            mysqli_stmt_bind_param($stmt1, "ssssssssss", $HotelName, $HotelLocation, $HotelCoordinates, 
                $PriceRange, $TimeAvailable, $ContactInfo, $Description, $Amenities, $Type, $HotelID);
            mysqli_stmt_execute($stmt1);
            mysqli_stmt_close($stmt1);
    
            // $SQLquerySecond = "";
            // $stmt2 = mysqli_prepare($DBConnection, $SQLquerySecond);
            // foreach ($LocationFeaturesImagePath as $ImagePath) {
            //     mysqli_stmt_bind_param($stmt2, "", );
            //     mysqli_stmt_execute($stmt2);
            // } mysqli_stmt_close($stmt2);
            
            echo json_encode(['Status' => 'SUCCESS', 'Message' => 'LOCATION UPDATED ']);
        } else {
            echo json_encode(['Status' => 'ERROR', 'Message' => 'METHOD IS NOT POST']);
        }
        mysqli_close($DBConnection);
    } catch (Exception $e) {
        echo json_encode(['Status' => 'ERROR', 'Message' => 'ERROR OCCURRED: SCRIPT ERROR']);
        mysqli_close($DBConnection);
        die();
    }
    
    function HandleFileUpload($File, $UploadDir) {
        $FileName = $File['name'];
        $FileExtension = pathinfo($FileName, PATHINFO_EXTENSION);
        $FileTmpName = $File['tmp_name'];
    
        $FilePath = $UploadDir . uniqid() . '.' . $FileExtension;
        move_uploaded_file($FileTmpName, $FilePath);
    
        return $FilePath;
    }
?>