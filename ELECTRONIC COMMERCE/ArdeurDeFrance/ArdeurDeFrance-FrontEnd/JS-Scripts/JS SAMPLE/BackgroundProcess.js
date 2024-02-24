function Log(Message) {
    console.log(Message);
}

function CreateNewLocationData(
    HotelName, Coordinates, HotelLocation, Type, PriceRange, TimeAvailable,
    ContactInfo, Description, Amenities, LocationImg, LocationFeatures) {

    const Host = 'http://localhost/';
    const Path = 'QuickSpotZC/QuickSpotZCBack-End/UserRequests/CreateNewLocation.php';
    const Url = `${Host}${Path}`;

    const LocationData = new FormData();
    LocationData.append('HotelName', HotelName);
    LocationData.append('Coordinates', Coordinates);
    LocationData.append('HotelLocation', HotelLocation);
    LocationData.append('Type', Type);
    LocationData.append('PriceRange', PriceRange);
    LocationData.append('TimeAvailable', TimeAvailable);
    LocationData.append('ContactInfo', ContactInfo);
    LocationData.append('Description', Description);
    LocationData.append('Amenities', Amenities);

    LocationData.append('LocationImg', LocationImg[0], LocationImg.name);
    for (let i = 0; i < LocationFeatures.length; i++) {
        LocationData.append(`LocationFeature${i}`, LocationFeatures[i], LocationFeatures[i].name);
    }

    fetch(Url, { method: 'POST', body: LocationData, })
        .then(Response => Response.json())
        .then(ServerResponse => {
            if (ServerResponse.Status === 'SUCCESS') {
                Log(ServerResponse.Message);
            } else if (ServerResponse.Status === 'ERROR'){
                Log(ServerResponse.Message);
            } else {
                Log('SAVING NEW LOCATION: INVALID FORMAT');
            }
        })
        .catch(error => {
            Log('ERROR OCCURRED: WHILE SAVING NEW LOCATION');
        });
}  

function RetrieveLocationsData(LIMC) {
    LIMC.innerHTML = '';
    const Host = 'http://localhost/';
    const Path = 'QuickSpotZC/QuickSpotZCBack-End/UserRequests/RetrieveLocationsInfo.php';
    const Url = `${Host}${Path}`;

    fetch(Url, { method: 'POST', })
        .then(Response => Response.json())
        .then(ServerResponse => {
            if (ServerResponse.Status === 'SUCCESS') {
                const CombinedData = ServerResponse.DATA;
                CombinedData.forEach(Data => {
                    const HotelInfo = Data.HotelInfo;
                    const HotelImage = Data.HotelImage;
                    const FeatureImages = Data.FeatureImages;
                    CreateSavedLocationList(HotelInfo, HotelImage, FeatureImages);
                });
                Log(ServerResponse.Message);
            } else if (ServerResponse.Status === 'ERROR'){
                Log(ServerResponse.Message);
            } else {
                Log('RETRIEVING HOTEL INFO: INVALID FORMAT');
            }
        })
        .catch(error => {
            Log('ERROR OCCURRED: WHILE RETRIEVING HOTEL INFO');
        });
}

function RetrieveLocationData(HotelID) {
    const Host = 'http://localhost/';
    const Path = 'QuickSpotZC/QuickSpotZCBack-End/UserRequests/RetrieveLocationInfo.php';
    const Url = `${Host}${Path}`;

    const LocationData = new FormData();
    LocationData.append('HotelID', HotelID);

    fetch(Url, { method: 'POST', body: LocationData, })
        .then(Response => Response.json())
        .then(ServerResponse => {
            if (ServerResponse.Status === 'SUCCESS') {
                const CombinedData = ServerResponse.DATA[0];
                const HotelInfo = CombinedData.HotelInfo;
                const HotelImage = CombinedData.HotelImage;
                const FeatureImages = CombinedData.FeatureImages;
                DisplayLocationInfo(HotelInfo, HotelImage, FeatureImages)
                Log(ServerResponse.Message);
            } else if (ServerResponse.Status === 'ERROR'){
                Log(ServerResponse.Message);
            } else {
                Log('RETRIEVING HOTEL INFO: INVALID FORMAT');
            }
        })
        .catch(error => {
            Log('ERROR OCCURRED: WHILE RETRIEVING HOTEL INFO');
        });
}

function UpdateLocationData(HotelID,
    HotelName, Coordinates, HotelLocation, Type,
    PriceRange, TimeAvailable, ContactInfo, Description,
    Amenities, LocationImg, LocationFeatures ) {
    const Host = 'http://localhost/';
    const Path = 'QuickSpotZC/QuickSpotZCBack-End/UserRequests/UpdateLocationInfo.php';
    const Url = `${Host}${Path}`;

    const LocationData = new FormData();
    LocationData.append('HotelID', HotelID);
    LocationData.append('HotelName', HotelName);
    LocationData.append('Coordinates', Coordinates);
    LocationData.append('HotelLocation', HotelLocation);
    LocationData.append('Type', Type);
    LocationData.append('PriceRange', PriceRange);
    LocationData.append('TimeAvailable', TimeAvailable);
    LocationData.append('ContactInfo', ContactInfo);
    LocationData.append('Description', Description);
    LocationData.append('Amenities', Amenities);

    // LocationData.append('LocationImg', LocationImg[0].img, LocationImg[0].name);
    // for (let i = 0; i < LocationFeatures.length; i++) {
    //     LocationData.append(`LocationFeature${i}`, LocationFeatures[i].img, LocationFeatures[i].name);
    // }

    fetch(Url, { method: 'POST', body: LocationData, })
        .then(Response => Response.json())
        .then(ServerResponse => {
            if (ServerResponse.Status === 'SUCCESS') {
                Log(ServerResponse.Message);
            } else if (ServerResponse.Status === 'ERROR'){
                Log(ServerResponse.Message);
            } else {
                Log('SAVING NEW LOCATION: INVALID FORMAT');
            }
        })
        .catch(error => {
            Log('ERROR OCCURRED: WHILE UPDATING NEW LOCATION');
        })   
}

function DeleteLocationData(HotelID) {
    const Host = 'http://localhost/';
    const Path = 'QuickSpotZC/QuickSpotZCBack-End/UserRequests/DeleteLocationInfo.php';
    const Url = `${Host}${Path}`;

    const LocationData = new FormData();
    LocationData.append('HotelID', HotelID);

    fetch(Url, { method: 'POST', body: LocationData, })
        .then(Response => Response.json())
        .then(ServerResponse => {
            if (ServerResponse.Status === 'SUCCESS') {
                Log(ServerResponse.Message);
            } else if (ServerResponse.Status === 'ERROR'){
                Log(ServerResponse.Message);
            } else {
                Log('RETRIEVING HOTEL INFO: INVALID FORMAT');
            }
        })
        .catch(error => {
            Log('ERROR OCCURRED: WHILE RETRIEVING HOTEL INFO');
        });
}

function CharacterSearchLocation(Character) {
    const Host = 'http://localhost/';
    const Path = 'QuickSpotZC/QuickSpotZCBack-End/UserRequests/UserSearchCharInput.php';
    const Url = `${Host}${Path}`;

    const UserInput = new FormData();
    UserInput.append('Character', Character);

    fetch(Url, { method: 'POST', body: UserInput, })
        .then(Response => Response.json())
        .then(ServerResponse => {
            if (ServerResponse.Status === 'SUCCESS') {
                const HotelData = ServerResponse.DATA;
                HotelData.forEach(Data => {
                    const HotelName = Data.HotelName;
                    const HotelID = Data.HotelID;
                    DisplayResult(HotelName, HotelID);
                })
                Log(ServerResponse.Message);
            } else if (ServerResponse.Status === 'ERROR'){
                Log(ServerResponse.Message);
            } else {
                Log('RETRIEVING HOTEL INFO: INVALID FORMAT');
            }
        })
        .catch(error => {
            Log('ERROR OCCURRED: WHILE USER INPUT SEARCH CHARACTER INFO');
        });
}

function RetrieveSearchedLocationData(HotelID) {
    const Host = 'http://localhost/';
    const Path = 'QuickSpotZC/QuickSpotZCBack-End/UserRequests/RetrieveLocationInfo.php';
    const Url = `${Host}${Path}`;

    const LocationData = new FormData();
    LocationData.append('HotelID', HotelID);

    fetch(Url, { method: 'POST', body: LocationData, })
        .then(Response => Response.json())
        .then(ServerResponse => {
            if (ServerResponse.Status === 'SUCCESS') {
                const CombinedData = ServerResponse.DATA[0];
                const HotelInfo = CombinedData.HotelInfo;
                const HotelImage = CombinedData.HotelImage;
                const FeatureImages = CombinedData.FeatureImages;
                ShowSearchResult(HotelInfo, HotelImage, FeatureImages);
                Log(ServerResponse.Message);
            } else if (ServerResponse.Status === 'ERROR'){
                Log(ServerResponse.Message);
            } else {
                Log('RETRIEVING HOTEL INFO: INVALID FORMAT');
            }
        })
        .catch(error => {
            Log('ERROR OCCURRED: WHILE RETRIEVING HOTEL INFO');
        });
}

async function GetLocationRating(HotelID) {
    const Host = 'http://localhost/';
    const Path = 'QuickSpotZC/QuickSpotZCBack-End/UserRequests/RetrieveLocationRating.php';
    const Url = `${Host}${Path}`;

    const Data = new FormData();
    Data.append('HotelID', HotelID);

    try {
        const response = await fetch(Url, { method: 'POST', body: Data });
        const serverResponse = await response.json();
        if (serverResponse.Status === 'SUCCESS') {
            Log(serverResponse.Message);
            return serverResponse.DATA;
        } else if (serverResponse.Status === 'ERROR') {
            Log(serverResponse.Message);
        } else {
            Log('RETRIEVING HOTEL INFO: INVALID FORMAT');
        }
    } catch (error) {
        Log('ERROR OCCURRED: WHILE RETRIEVING LOCATION RATING');
    }
}

async function GetLocationReview(HotelID) {
    const Host = 'http://localhost/';
    const Path = 'QuickSpotZC/QuickSpotZCBack-End/UserRequests/RetrieveLocationReview.php';
    const Url = `${Host}${Path}`;

    const Data = new FormData();
    Data.append('HotelID', HotelID);

    try {
        const response = await fetch(Url, { method: 'POST', body: Data });
        const serverResponse = await response.json();
        if (serverResponse.Status === 'SUCCESS') {
            Log(serverResponse.Message);
            return serverResponse.DATA;
        } else if (serverResponse.Status === 'ERROR') {
            Log(serverResponse.Message);
        } else {
            Log('RETRIEVING HOTEL INFO: INVALID FORMAT');
        }
    } catch (error) {
        Log('ERROR OCCURRED: WHILE RETRIEVING LOCATION REVIEW');
    }
}

function SaveLocationRating(HotelID, UserName, RevDate,
    UserComment, UserRating, UserInputFile) {

    const Host = 'http://localhost/';
    const Path = 'QuickSpotZC/QuickSpotZCBack-End/UserRequests/CreateUserReview.php';
    const Url = `${Host}${Path}`;

    const ReviewData = new FormData();
    ReviewData.append('HotelID', HotelID);
    ReviewData.append('UserName', UserName);
    ReviewData.append('RevDate', RevDate);
    ReviewData.append('UserComment', UserComment);
    ReviewData.append('UserRating', UserRating);

    if (UserInputFile.length > 0) {
        ReviewData.append('UserInputFile', UserInputFile[0], UserInputFile.name);
    }

    fetch(Url, { method: 'POST', body: ReviewData, })
        .then(Response => Response.json())
        .then(ServerResponse => {
            if (ServerResponse.Status === 'SUCCESS') {
                Log(ServerResponse.Message);
            } else if (ServerResponse.Status === 'ERROR'){
                Log(ServerResponse.Message);
            } else {
                Log('SAVING NEW LOCATION: INVALID FORMAT');
            }
        })
        .catch(error => {
            Log('ERROR OCCURRED: WHILE SAVING NEW REVIEW');
        });
}

function ListLocationsData(SearchInput) {
    const Host = 'http://localhost/';
    const Path = 'QuickSpotZC/QuickSpotZCBack-End/UserRequests/RetrieveSearchedInputData.php';
    const Url = `${Host}${Path}`;

    const UserInput = new FormData();
    UserInput.append('SearchInput', SearchInput);

    fetch(Url, { method: 'POST', body: UserInput, })
        .then(Response => Response.json())
        .then(ServerResponse => {
            if (ServerResponse.Status === 'SUCCESS') {
                const HotelData = ServerResponse.DATA;
                HotelData.forEach(Data => {
                    const HotelInfo = Data.HotelInfo;
                    const HotelImage = Data.HotelImage;
                    CreateSearchedList(HotelInfo, HotelImage);
                })
                Log(ServerResponse.Message);
            } else if (ServerResponse.Status === 'ERROR'){
                Log(ServerResponse.Message);
            } else {
                Log('RETRIEVING HOTEL INFO: INVALID FORMAT');
            }
        })
        .catch(error => {
            Log('ERROR OCCURRED: WHILE USER INPUT SEARCH CHARACTER INFO');
        });
}

function RetrieveAvailLocation() {
    const Host = 'http://localhost/';
    const Path = 'QuickSpotZC/QuickSpotZCBack-End/UserRequests/RetrieveAvailLocation.php';
    const Url = `${Host}${Path}`;

    fetch(Url, { method: 'POST', })
        .then(Response => Response.json())
        .then(ServerResponse => {
            if (ServerResponse.Status === 'SUCCESS') {
                const CombinedData = ServerResponse.DATA[0];
                const HotelInfo = CombinedData.HotelInfo;
                const HotelImage = CombinedData.HotelImage;
                EnlistHotelInfo(HotelInfo, HotelImage);
                Log(ServerResponse.Message);
            } else if (ServerResponse.Status === 'ERROR'){
                Log(ServerResponse.Message);
            } else {
                Log('RETRIEVING HOTEL INFO: INVALID FORMAT');
            }
        })
        .catch(error => {
            Log('ERROR OCCURRED: WHILE RETRIEVING HOTEL INFO');
        });
}

function RetriveBackORNextLocation(Command, HotelID) {
    const Host = 'http://localhost/';
    const Path = 'QuickSpotZC/QuickSpotZCBack-End/UserRequests/RetriveBackORNextLocation.php';
    const Url = `${Host}${Path}`;

    const UserCommand = new FormData();
    UserCommand.append('Command', Command);
    UserCommand.append('HotelID', HotelID);

    fetch(Url, { method: 'POST', body: UserCommand, })
        .then(Response => Response.json())
        .then(ServerResponse => {
            if (ServerResponse.Status === 'SUCCESS') {
                const CombinedData = ServerResponse.DATA[0];
                const HotelInfo = CombinedData.HotelInfo;
                const HotelImage = CombinedData.HotelImage;
                EnlistHotelInfo(HotelInfo, HotelImage);
                Log(ServerResponse.Message);
            } else if (ServerResponse.Status === 'ERROR'){
                Log(ServerResponse.Message);
            } else {
                Log('RETRIEVING HOTEL INFO: INVALID FORMAT');
            }
        })
        .catch(error => {
            Log('ERROR OCCURRED: WHILE RETRIEVING HOTEL INFO');
        });
}