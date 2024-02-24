<?php
    include_once('../DatabaseConnection.php');
    try {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $HotelID = $_POST['HotelID'];
            $UserName = $_POST['UserName'];
            $RevDate = $_POST['RevDate'];
            $UserComment = $_POST['UserComment'];
            $UserRating = $_POST['UserRating'];
            $UserRating = intval($UserRating);

            
            if (isset($_FILES['UserInputFile'])) {
                $HotelImagePath = HandleFileUpload($_FILES['UserInputFile'], '../ReviewImageFolder/');
            } else {
                $HotelImagePath = '';
            }

            $SQLqueryFirst = "INSERT INTO locationreview ( HotelID, UserNickname,
                Feedback, Rating, ReviewDate, ReviewImagePath) 
                VALUES (?,?,?,?,?,?)";
            $stmt1 = mysqli_prepare($DBConnection, $SQLqueryFirst);
            mysqli_stmt_bind_param($stmt1, "ssssss", $HotelID, $UserName, $UserComment, $UserRating,
                $RevDate, $HotelImagePath );
            mysqli_stmt_execute($stmt1);
            mysqli_stmt_close($stmt1);
    
            echo json_encode(['Status' => 'SUCCESS', 'Message' => 'REVIEW SAVED']);
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