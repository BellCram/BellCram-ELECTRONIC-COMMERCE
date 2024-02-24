const HotelName = document.querySelector('#HotelName'); const Coordinates = document.querySelector('#Coordinates');
const HotelLocation = document.querySelector('#Location'); const Type = document.querySelector('#Type');
const PriceRange = document.querySelector('#PriceRange'); const TimeAvailable = document.querySelector('#TimeAvailable');
const ContactInfo = document.querySelector('#ContactInfo'); const Description = document.querySelector('#Description');
const Amenities = document.querySelector('#Amenities'); const LocationImg = document.querySelector('#LocationImg');
const LocationFeatures = document.querySelector('#LocationFeatures'); const LocationImgContainer = document.querySelector('#LIC');
const FeatureImgContainer = document.querySelector('#FIC'); const AddButton = document.querySelector('#AddButton');
const UpdateButton = document.querySelector('#UpdateButton'); const Add = document.querySelector('#Add'); 
const Home = document.querySelector('#Home'); const CreateLocationContainer = document.querySelector('#CreateLocationContainer');
const LIMC = document.querySelector('#LocationInfoMainContainer'); 

const LIImageContainer = [];
const LFImagesContainer = [];

document.addEventListener('DOMContentLoaded', function() {
    RetrieveLocationsData(LIMC);
});

function ClearInputs() {
    HotelName.value = ''; Coordinates.value = ''; HotelLocation.value = ''; Type.value = ''; PriceRange.value = '';
    TimeAvailable.value = ''; ContactInfo.value = ''; Description.innerText = ''; Amenities.value = ''; LocationImg.value = '';
    LocationFeatures.value = ''; LocationImgContainer.innerHTML = ''; FeatureImgContainer.innerHTML = '';
    LFImagesContainer.splice(0, LFImagesContainer.length); LIImageContainer.splice(0, LIImageContainer.length);
}

Home.addEventListener('click', function() {
    ClearInputs();
    LIMC.style.display = 'flex';
    CreateLocationContainer.style.display = 'none';
    AddButton.style.display = 'block';
    UpdateButton.style.display = 'none';
});

Add.addEventListener('click', function() {
    ClearInputs();
    LIMC.style.display = 'none';
    CreateLocationContainer.style.display = 'flex';
    AddButton.style.display = 'block';
    UpdateButton.style.display = 'none';
});

LocationImg.addEventListener('change', function() {
    const selectedFiles = LocationImg.files;
    if (UpdateButton.style.display === 'none') {
        LocationImgContainer.innerHTML = '';
        for (const File of selectedFiles) {
            const imgConDiv = document.createElement('div');
            imgConDiv.classList.add('ICon1');
            const img = document.createElement('img');
            img.classList.add('I1');
            img.src = URL.createObjectURL(File);
            imgConDiv.appendChild(img);
            LocationImgContainer.appendChild(imgConDiv);
        }
    } else {
        LocationImgContainer.innerHTML = '';
        LIImageContainer.splice(0, LFImagesContainer.length);
        for (const File of selectedFiles) {
            const imgConDiv = document.createElement('div');
            imgConDiv.classList.add('ICon1');
            const img = document.createElement('img');
            img.classList.add('I1');
            img.src = URL.createObjectURL(File);
            LIImageContainer.push({ id: File.name, file: File });
            imgConDiv.appendChild(img);
            LocationImgContainer.appendChild(imgConDiv);
        }
    }
}); 

LocationFeatures.addEventListener('change', function() {
    const selectedFiles = LocationFeatures.files;
    if (UpdateButton.style.display === 'none') {
        FeatureImgContainer.innerHTML = '';
        for (const File of selectedFiles) { 
            const imgConDiv = document.createElement('div');
            imgConDiv.classList.add('ICon2');
            const img = document.createElement('img');
            img.classList.add('I2');
            img.src = URL.createObjectURL(File);
            imgConDiv.appendChild(img);
            FeatureImgContainer.appendChild(imgConDiv);
        }
    } else {
        let Index = 0;
        for (const File of selectedFiles) {
            const imgConDiv = document.createElement('div');
            imgConDiv.classList.add('ICon2');
            imgConDiv.id = `${Date.now() + Index}`;
            const img = document.createElement('img');
            img.classList.add('I2');
            img.src = URL.createObjectURL(File);
            LFImagesContainer.push({ id: imgConDiv.id, file: File });
            const XButton3 = document.createElement('img');
            XButton3.classList.add('Xbutton');
            XButton3.src = '../Source-Files/Icons/ButtonIcons/X-Icon.png';
            XButton3.addEventListener('click', function() {
                const ElementToRemove = document.getElementById(imgConDiv.id);
                FeatureImgContainer.removeChild(ElementToRemove);
                const FileIndex = LFImagesContainer.findIndex(Img => Img.id === imgConDiv.id);
                LFImagesContainer.splice(FileIndex, 1);
            });
            imgConDiv.appendChild(XButton3);
            imgConDiv.appendChild(img);
            FeatureImgContainer.appendChild(imgConDiv);
            Index++;
        }
    }
});

AddButton.addEventListener('click', async function() {
    const LImg = LocationImg.files; const LFImg = LocationFeatures.files;
    if (LImg[0] && LFImg.length > 0) {
        CreateNewLocationData(
            HotelName.value, Coordinates.value, HotelLocation.value, Type.value,
            PriceRange.value, TimeAvailable.value, ContactInfo.value, Description.innerText,
            Amenities.value, LocationImg.files, LocationFeatures.files
        );
        await new Promise(Wait => setTimeout(Wait, 1000));
        ClearInputs();
        RetrieveLocationsData(LIMC);
        LIMC.style.display = 'flex';
        CreateLocationContainer.style.display = 'none';
        AddButton.style.display = 'block';
        UpdateButton.style.display = 'none';
    } else { console.log('NO IMAGE DETECTED');}
});

UpdateButton.addEventListener('click', async function() {
    UpdateLocationData( UpdateButton.name,
        HotelName.value, Coordinates.value, HotelLocation.value, Type.value,
        PriceRange.value, TimeAvailable.value, ContactInfo.value, Description.innerText,
        Amenities.value, LIImageContainer, LFImagesContainer
    );
    await new Promise(Wait => setTimeout(Wait, 1000));
    ClearInputs();
    RetrieveLocationsData(LIMC);
    LIMC.style.display = 'flex';
    CreateLocationContainer.style.display = 'none';
    AddButton.style.display = 'block';
    UpdateButton.style.display = 'none';
});

// JAVASCRIPT ELEMENT CREATION
function CreateSavedLocationList(HotelInfo, HotelImage, FeatureImages) {
    const locationInfoContainer = document.createElement('div');
    locationInfoContainer.classList.add('LocationInfoContainer');

    const containDiv = document.createElement('div');
    containDiv.classList.add('ConTain');

    const imgContainerDiv = document.createElement('div');
    imgContainerDiv.classList.add('ImgContainer');

    const locImg = document.createElement('img');
    locImg.classList.add('LocImg');
    locImg.src = `data:image/jpeg;base64,${HotelImage}`;
    imgContainerDiv.appendChild(locImg);

    const locationInfoDiv = document.createElement('div');
    locationInfoDiv.classList.add('LocationInfo');

    const infoHolders = ['N', 'C', 'L', 'T', 'PR', 'TA', 'CI', 'A', 'D'];
    const infoHoldersValues = [HotelInfo.HotelName, HotelInfo.HotelCoordinates, HotelInfo.HotelLocation, 
        HotelInfo.HotelType, HotelInfo.HotelPriceRange, HotelInfo.HotelTimeAvailable, HotelInfo.HotelContact,
        HotelInfo.HotelAmenities, HotelInfo.HotelDescription];
    infoHolders.forEach((info, index) => {
        const span = document.createElement('span');
        span.classList.add('InfoHolder');
        span.id = info;
        span.innerText = infoHoldersValues[index];
        locationInfoDiv.appendChild(span);
    });

    containDiv.appendChild(imgContainerDiv);
    containDiv.appendChild(locationInfoDiv);

    const buttonContainerDiv = document.createElement('div');
    buttonContainerDiv.classList.add('ButtonContainer');

    const featureImgContainerDiv = document.createElement('div');
    featureImgContainerDiv.classList.add('FeatureImgContainer');

    FeatureImages.forEach((Images) => {
        const imgConDiv = document.createElement('div');
        imgConDiv.classList.add('ImgCon');

        const img = document.createElement('img');
        img.classList.add('Img');
        img.src = `data:image/jpeg;base64,${Images.FeatureImage}`;

        imgConDiv.appendChild(img);
        featureImgContainerDiv.appendChild(imgConDiv);
    });

    const editButton = document.createElement('button');
    editButton.id = HotelInfo.HotelID;
    editButton.classList.add('Buttons');
    editButton.textContent = 'EDIT';

    editButton.addEventListener('click', function(){
        ClearInputs();
        RetrieveLocationData(editButton.id);
        LIMC.style.display = 'none';
        CreateLocationContainer.style.display = 'flex';
        AddButton.style.display = 'none';
        UpdateButton.style.display = 'block';
    });

    const deleteButton = document.createElement('button');
    deleteButton.id = HotelInfo.HotelID;
    deleteButton.classList.add('Buttons');
    deleteButton.textContent = 'DELETE';

    deleteButton.addEventListener('click', function(){
        const ConfirmDeleteOverlay = document.querySelector('#ConfirmDeleteOverlay');
        const ConfirmButton = document.querySelector('#ConfirmButton');
        const cancelButton = document.querySelector('#cancelButton');
        ConfirmDeleteOverlay.style.display = 'flex';
        function handleCancelClick() {
            RemoveEventListeners();
        } async function handleConfirmClick() {
            RemoveEventListeners();
            DeleteLocationData(deleteButton.id);
            await new Promise(Wait => setTimeout(Wait, 1000));
            ClearInputs();
            RetrieveLocationsData(LIMC);
        } cancelButton.addEventListener('click', handleCancelClick);
        ConfirmButton.addEventListener('click', handleConfirmClick);
        function RemoveEventListeners() {
            cancelButton.removeEventListener('click', handleCancelClick);
            ConfirmButton.removeEventListener('click', handleConfirmClick);
            ConfirmDeleteOverlay.style.display = 'none';
        }
    })

    buttonContainerDiv.appendChild(featureImgContainerDiv);
    buttonContainerDiv.appendChild(editButton);
    buttonContainerDiv.appendChild(deleteButton);
    locationInfoContainer.appendChild(containDiv);
    locationInfoContainer.appendChild(buttonContainerDiv);

    LIMC.appendChild(locationInfoContainer);
}

function DisplayLocationInfo(HotelInfo, HotelImage, FeatureImages) {
    HotelName.value = HotelInfo.HotelName;
    Coordinates.value = HotelInfo.HotelCoordinates;
    HotelLocation.value = HotelInfo.HotelLocation;
    Type.value = HotelInfo.HotelType;
    PriceRange.value = HotelInfo.HotelPriceRange; 
    TimeAvailable.value = HotelInfo.HotelTimeAvailable;
    ContactInfo.value = HotelInfo.HotelContact;
    Amenities.value = HotelInfo.HotelAmenities;
    Description.innerText = HotelInfo.HotelDescription;
    LocationImgContainer.innerHTML = '';
    const IConDiv = document.createElement('div');
    IConDiv.classList.add('ICon1');
    IConDiv.id = 'LL';

    const Image = base64ToFile(`data:image/jpeg;base64,${HotelImage}`, IConDiv.id);
    // LIImageContainer.push({ id: IConDiv.id, file: Image });
    const imageUrl = URL.createObjectURL(Image);

    const ImageD = document.createElement('img');
    ImageD.classList.add('I1');
    ImageD.src = imageUrl;

    IConDiv.appendChild(ImageD);
    LocationImgContainer.appendChild(IConDiv);
    FeatureImgContainer.innerHTML = '';
    FeatureImages.forEach((Images, Index) => {
        const imgConDiv = document.createElement('div');
        imgConDiv.classList.add('ICon2');
        imgConDiv.id = `LF${Index + 1}`;

        const Image = base64ToFile(`data:image/jpeg;base64,${Images.FeatureImage}`, imgConDiv.id);
        // LFImagesContainer.push({ id: imgConDiv.id, file: Image });
        const imageUrl = URL.createObjectURL(Image);

        const img = document.createElement('img');
        img.classList.add('I2');
        img.src = imageUrl;

        const XButton2 = document.createElement('img');
        XButton2.classList.add('Xbutton');
        XButton2.src = '../Source-Files/Icons/ButtonIcons/X-Icon.png';
        XButton2.addEventListener('click', function() {
            const ElementToRemove = document.getElementById(imgConDiv.id);
            FeatureImgContainer.removeChild(ElementToRemove);
            const FileIndex = LFImagesContainer.findIndex(Img => Img.id === imgConDiv.id);
            LFImagesContainer.splice(FileIndex, 1);
        });
        imgConDiv.appendChild(XButton2);
        imgConDiv.appendChild(img);
        FeatureImgContainer.appendChild(imgConDiv);
    }); UpdateButton.name = HotelInfo.HotelID;
}

function base64ToFile(base64String, fileName) {
    const base64Data = base64String.split(',')[1];
    const binaryData = atob(base64Data);
    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
    const file = new File([blob], fileName, { type: 'image/jpeg' });
    return file;
}