const ClearSearchInputButton = document.querySelector('#ClearSearchInputButton'); const SearchInput = document.querySelector('#SearchInput'); 
const MinMaxButton = document.querySelector('#MinMaxButton'); const PopUpOverlay = document.querySelector('#PopUpOverlay');
const MinMaxButtonIcon = document.querySelector('#MinMaxButtonIcon'); const LocationInfoContainer = document.querySelector('#LocationInfoContainer');
const ClickedLocationContainer = document.querySelector('#ClickedLocationContainer'); 
const SearchedLocationContaineOverlay = document.querySelector('.ISearchedLocationContaineOverlay'); const GoBackButton = document.querySelector('#GoBackButton');
const WriteReviewButton = document.querySelector('#WriteReviewButton'); const SearchedLocationMainContainer = document.querySelector('.ISearchedLocationMainContainer');
const ClickedImg = document.querySelector('#ClickedImg'); const ClickedLocationName = document.querySelector('#ClickedLocationName'); 
const ClickedLocation = document.querySelector('#ClickedLocation'); const ClickedPricing = document.querySelector('#ClickedPricing'); 
const ClickedTimeDes = document.querySelector('#ClickedTimeDes'); const ClickedContact = document.querySelector('#ClickedContact'); 
const LocationDescription = document.querySelector('#LocationDescription'); const ClickedLocationFeaturesContainer = document.querySelector('#ClickedLocationFeaturesContainer');
const SubmitButton = document.getElementById('SubmitButton'); const UserName = document.getElementById('UserName'); const RevDate = document.getElementById('Date');
const UserInputContainer = document.getElementById('UserInputContainer'); const stars = document.querySelectorAll('.SI');
const userRating = document.getElementById('UR'); const fileInputIcon = document.getElementById('FileInputIcon');
const inputFile = document.getElementById('InputFile'); const ReviewsContainer = document.querySelector('#ReviewsContainer');
const SearchedLoactionContaner = document.querySelector('#SearchedLoactionContaner');

function HandleCommonBehavior() {
    MinMaxButtonIcon.src = '../Source-Files/Icons/ButtonIcons/NextButtonRight-White.png';
    MinMaxButtonIcon.style.marginLeft = '0.5rem';
    MinMaxButtonIcon.style.marginRight = '0';
    LocationInfoContainer.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function() {
    const UrlParams = new URLSearchParams(window.location.search);
    const Command = UrlParams.get('Command');
    const Search = UrlParams.get('Search');

    if (Command === 'InputSearchResult' || Command === 'ShowSearchResult' || Command === 'ViewHotelInfo') {
        HandleCommonBehavior();
        if (Command === 'ShowSearchResult') {
            SearchedLoactionContaner.style.display = 'block';
            ClickedLocationContainer.style.display = 'none';
            ListLocationsData(Search);
        } else {
            SearchedLoactionContaner.style.display = 'none';
            ClickedLocationContainer.style.display = 'flex';
            RetrieveSearchedLocationData(Search);
        }
    } else if (Command === 'ViewMap') {
        MinMaxButtonIcon.src = '../Source-Files/Icons/ButtonIcons/NextButtonRight-White.png';
        MinMaxButtonIcon.style.marginLeft = '0.5rem';
        MinMaxButtonIcon.style.marginRight = '0';
        LocationInfoContainer.style.display = 'block';
        SearchedLoactionContaner.style.display = 'block';
        ListLocationsData(SearchInput.value);
    }
});

const HomeButton = document.querySelector('#HomeButton');
HomeButton.addEventListener('click', function() {
    window.location.href = '../MainForm.html';
});

const SearchResultContainer = document.querySelector('#SearchResultContainer');
SearchInput.addEventListener('input', function() {
    const inputValue = SearchInput.value.trim();
    if (inputValue !== '') {
        ClearSearchInputButton.style.opacity = '1';
        LocationInfoContainer.style.display = 'none';
        MinMaxButtonIcon.src = '../Source-Files/Icons/ButtonIcons/NextButtonLeft-White.png';
        MinMaxButtonIcon.style.marginLeft = '0rem';
        MinMaxButtonIcon.style.marginRight = '0.25rem';
        SearchResultContainer.innerHTML = '';
        SearchResultContainer.style.display = 'flex';
        CharacterSearchLocation(SearchInput.value);
    } else {
        ClearSearchInputButton.style.opacity = '';
        SearchResultContainer.innerHTML = '';
        SearchResultContainer.style.display = 'none';
    }
}); SearchInput.addEventListener('keypress', function(Input) {
    if (Input.key === 'Enter') {
        if (SearchInput.value === 'ShowAdminPanel') {
            SearchInput.value = '';
            window.location.href = '../HTML-Forms/AdminPanel.html';
        } else {
            SearchedLoactionContaner.innerHTML = '';
            LocationInfoContainer.style.display = 'block';
            SearchedLoactionContaner.style.display = 'block';
            ClickedLocationContainer.style.display = 'none';
            MinMaxButtonIcon.src = '../Source-Files/Icons/ButtonIcons/NextButtonRight-White.png';
            MinMaxButtonIcon.style.marginLeft = '0.5rem';
            MinMaxButtonIcon.style.marginRight = '0';
            ListLocationsData(SearchInput.value);
            SearchInput.value = '';
            SearchResultContainer.style.display = 'none';
        }
    }
}); ClearSearchInputButton.addEventListener('click', function() {
    SearchInput.value = '';
    ClearSearchInputButton.style.opacity = '';
    SearchResultContainer.innerHTML = '';
    SearchResultContainer.style.display = 'none';
}); const SearchButton = document.querySelector('#SearchButton');
SearchButton.addEventListener('click', function(){
    SearchedLoactionContaner.innerHTML = '';
    LocationInfoContainer.style.display = 'block';
    SearchedLoactionContaner.style.display = 'block';
    ClickedLocationContainer.style.display = 'none';
    MinMaxButtonIcon.src = '../Source-Files/Icons/ButtonIcons/NextButtonRight-White.png';
    MinMaxButtonIcon.style.marginLeft = '0.5rem';
    MinMaxButtonIcon.style.marginRight = '0';
    ListLocationsData(SearchInput.value);
});

function DisplayResult(HotelName, HotelID){
    const searchResultDiv = document.createElement("div");
    searchResultDiv.className = "SearchResult";

    const resultLink = document.createElement("a");
    resultLink.className = "ResultLink";
    resultLink.addEventListener("click", function(){
        ClearSearchInputButton.style.opacity = '';
        SearchResultContainer.innerHTML = '';
        SearchInput.value = '';
        SearchResultContainer.style.display = 'none';
        SearchedLoactionContaner.innerHTML = '';
        LocationInfoContainer.style.display = 'block';
        MinMaxButtonIcon.src = '../Source-Files/Icons/ButtonIcons/NextButtonRight-White.png';
        MinMaxButtonIcon.style.marginLeft = '0.5rem';
        MinMaxButtonIcon.style.marginRight = '0';
        SearchedLoactionContaner.style.display = 'none';
        ClickedLocationContainer.style.display = 'flex';
        RetrieveSearchedLocationData(HotelID);
    });
    resultLink.textContent = HotelName;

    searchResultDiv.appendChild(resultLink);
    SearchResultContainer.appendChild(searchResultDiv);
}

MinMaxButton.addEventListener('click', function() {
    if (LocationInfoContainer.style.display === 'block') {
        LocationInfoContainer.style.display = 'none';
        MinMaxButtonIcon.src = '../Source-Files/Icons/ButtonIcons/NextButtonLeft-White.png';
        MinMaxButtonIcon.style.marginLeft = '0rem';
        MinMaxButtonIcon.style.marginRight = '0.25rem';
    } else {
        SearchInput.value = '';
        SearchResultContainer.style.display = 'none';
        LocationInfoContainer.style.display = 'block';
        MinMaxButtonIcon.src = '../Source-Files/Icons/ButtonIcons/NextButtonRight-White.png';
        MinMaxButtonIcon.style.marginLeft = '0.5rem';
        MinMaxButtonIcon.style.marginRight = '0';
    }   
});

function ReviewPreparation() {
    const currentDate = new Date();
    const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
    const FormattedDate = `${months[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
    RevDate.innerText = FormattedDate;
    UserName.value = '';
    UserInputContainer.innerText = 'Enter Your Comment Here';
    inputFile.value = '';
    fileInputIcon.src = '../Source-Files/Icons/ButtonIcons/Image-Icon.png';
} GoBackButton.addEventListener('click', function() {
    PopUpOverlay.style.display = 'none';
    ReviewPreparation();
}); UserInputContainer.addEventListener('click', function(){
    if (UserInputContainer.innerText === "Enter Your Comment Here") {
        UserInputContainer.innerText = '';
    }
}); stars.forEach((star, index) => {
    star.addEventListener('click', () => {
        userRating.textContent = (index + 1).toString();
        for (let i = 0; i <= index; i++) {
        stars[i].src = '../Source-Files/Icons/PassiveIcons/Star-Icon.png';
        } for (let i = index + 1; i < stars.length; i++) {
        stars[i].src = '../Source-Files/Icons/PassiveIcons/BlankStar-Icon.png';
        }
    });
}); fileInputIcon.addEventListener('click', () => {
    inputFile.click();
}); inputFile.addEventListener('change', () => {
    if (inputFile.files.length > 0) {
        fileInputIcon.src = '../Source-Files/Icons/ButtonIcons/ImageIcon.png';
    } else {
        fileInputIcon.src = '../Source-Files/Icons/ButtonIcons/Image-Icon.png';
    }
}); SubmitButton.addEventListener('click', function(){
    if (UserName.value !== '' && UserInputContainer.innerText !== 'Enter Your Comment Here'
        && UserInputContainer.innerText !== '') {
        SaveLocationRating(SubmitButton.name, UserName.value, RevDate.innerText,
            UserInputContainer.innerText, userRating.innerText, inputFile.files);
        PopUpOverlay.style.display = 'none';
        ReviewPreparation();
    } else {
        console.log('FILL UP CONTENTS FIRST');
    }
}); 

async function ShowSearchResult(HotelInfo, HotelImage, FeatureImages) {
    ClickedImg.src = `data:image/jpeg;base64,${HotelImage}`;
    ClickedLocationName.innerText = HotelInfo.HotelName;

    const ClickedLocationReview = document.querySelector('#ClickedLocationReview');
    const LocationRating = await GetLocationRating(HotelInfo.HotelID);
    CalculateRatings(LocationRating[0].HotelRating, LocationRating[0].ReviewCount, ClickedLocationReview, "ClickedImgStarCon",
        "ClickedStarIcon" , "ClickedLocationRate");

    ClickedLocation.innerText = HotelInfo.HotelLocation;
    const hotelPriceRange = HotelInfo.HotelPriceRange;
    const [minPrice, maxPrice] = hotelPriceRange.split(/- |, /);
    ClickedPricing.innerHTML = `&#8369;${minPrice} - &#8369;${maxPrice}`;
    ClickedTimeDes.innerText = HotelInfo.HotelTimeAvailable;
    ClickedContact.innerText = HotelInfo.HotelContact;
    ClickedLocationFeaturesContainer.innerHTML = '';
    FeatureImages.forEach((Images) => {
        const imgConDiv = document.createElement('div');
        imgConDiv.classList.add('ClickedLocationFeatures');
        const img = document.createElement('img');
        img.classList.add('ClickedLocationFeaturesImg');
        img.src = `data:image/jpeg;base64,${Images.FeatureImage}`;
        imgConDiv.appendChild(img);
        ClickedLocationFeaturesContainer.appendChild(imgConDiv);
    });
    LocationDescription.innerText = HotelInfo.HotelDescription;
    CalculateRatings2(LocationRating[0].HotelRating, LocationRating[0].ReviewCount, HotelInfo.HotelID);

    ReviewsContainer.innerHTML = '';
    const reviewLabelElement = document.createElement('p');
    reviewLabelElement.id = 'ReviewsLabel';
    reviewLabelElement.textContent = 'Reviews';
    ReviewsContainer.appendChild(reviewLabelElement);
    const LocationReview = await GetLocationReview(HotelInfo.HotelID); 
    LocationReview.forEach(Data => {
        const ReviewInfo = Data.ReviewInfo;
        const ReviewImage = Data.ReviewImage;
        ListLocationReviews(ReviewInfo, ReviewImage);
    });

    ViewDirection(HotelInfo.HotelCoordinates);
    ViewDirection2(HotelInfo.HotelCoordinates);
}

function CalculateRatings(Rating, Reviews, ParentDiv, StarContainer, StarIconClass, RateP) {
    ParentDiv.innerHTML = '';
    const fullStars = Math.floor(Rating);
    const halfStar = Rating % 1 !== 0;
    const blankStars = 5 - fullStars - (halfStar ? 1 : 0);
    const clickedImgStarCon = document.createElement("div");
    clickedImgStarCon.classList.add(StarContainer);
    for (let i = 0; i < fullStars; i++) {
        const fullStarIcon = document.createElement("img");
        fullStarIcon.classList.add(StarIconClass);
        fullStarIcon.src = "../Source-Files/Icons/PassiveIcons/Star-Icon.png";
        clickedImgStarCon.appendChild(fullStarIcon);
    } if (halfStar) {
        const halfStarIcon = document.createElement("img");
        halfStarIcon.classList.add(StarIconClass);
        halfStarIcon.src = "../Source-Files/Icons/PassiveIcons/HalfStar-Icon.png";
        clickedImgStarCon.appendChild(halfStarIcon);
    } for (let i = 0; i < blankStars; i++) {
        const blankStarIcon = document.createElement("img");
        blankStarIcon.classList.add(StarIconClass);
        blankStarIcon.src = "../Source-Files/Icons/PassiveIcons/BlankStar-Icon.png";
        clickedImgStarCon.appendChild(blankStarIcon);
    }
    const RoundedRating = Math.round(Rating * Math.pow(10, 1)) / Math.pow(10, 1);
    const ClickedLocationRate = document.createElement("p");
    ClickedLocationRate.classList.add(RateP);
    ClickedLocationRate.textContent = `${RoundedRating} • ${Reviews} Reviews`;

    ParentDiv.appendChild(clickedImgStarCon);
    ParentDiv.appendChild(ClickedLocationRate);
}

const ClickedLocationReviewsContainer = document.getElementById("ClickedLocationReviewsContainer");
function CalculateRatings2(Rating, Reviews, HotelID) {
    ClickedLocationReviewsContainer.innerHTML = '';
    const fullStars = Math.floor(Rating);
    const halfStar = Rating % 1 !== 0;
    const blankStars = 5 - fullStars - (halfStar ? 1 : 0);

    const RoundedRating = Math.round(Rating * Math.pow(10, 2)) / Math.pow(10, 2);
    const LocationRate = document.createElement("p");
    LocationRate.id = "LocationRate";
    LocationRate.textContent = RoundedRating;

    const ReviewStarCon = document.createElement("div");
    ReviewStarCon.id = "ReviewStarCon";
    for (let i = 0; i < fullStars; i++) {
        const fullStarIcon = document.createElement("img");
        fullStarIcon.classList.add("ReviewStarIcon");
        fullStarIcon.src = "../Source-Files/Icons/PassiveIcons/Star-Icon.png";
        ReviewStarCon.appendChild(fullStarIcon);
    } if (halfStar) {
        const halfStarIcon = document.createElement("img");
        halfStarIcon.classList.add("ReviewStarIcon");
        halfStarIcon.src = "../Source-Files/Icons/PassiveIcons/HalfStar-Icon.png";
        ReviewStarCon.appendChild(halfStarIcon);
    } for (let i = 0; i < blankStars; i++) {
        const blankStarIcon = document.createElement("img");
        blankStarIcon.classList.add("ReviewStarIcon");
        blankStarIcon.src = "../Source-Files/Icons/PassiveIcons/BlankStar-Icon.png";
        ReviewStarCon.appendChild(blankStarIcon);
    }

    const ReviewCount = document.createElement("p");
    ReviewCount.id = "ReviewCount";
    ReviewCount.textContent = `${Reviews} Reviews`;

    const WriteReviewButton = document.createElement("button");
    WriteReviewButton.id = "WriteReviewButton";
    WriteReviewButton.textContent = "Write Review";
    WriteReviewButton.addEventListener('click', function() {
        PopUpOverlay.style.display = 'flex';
        SubmitButton.name = HotelID;
        ReviewPreparation();
    });

    const reviewLabelElement = document.createElement('p');
    reviewLabelElement.id = 'ReviewLabel';
    reviewLabelElement.textContent = 'REVIEW SUMMARY';

    ClickedLocationReviewsContainer.appendChild(reviewLabelElement);
    ClickedLocationReviewsContainer.appendChild(LocationRate);
    ClickedLocationReviewsContainer.appendChild(ReviewStarCon);
    ClickedLocationReviewsContainer.appendChild(ReviewCount);
    ClickedLocationReviewsContainer.appendChild(WriteReviewButton);
}

function ListLocationReviews(Reviews, Image) {
    const CommentContainer = document.createElement('div');
    CommentContainer.classList.add('CContainer');
    const uInfo = document.createElement('div');
    uInfo.classList.add('UInfo');
    const uAvatar = document.createElement('img');
    uAvatar.classList.add('UAvatar');
    uAvatar.src = '../Source-Files/Icons/PassiveIcons/Avatar-Icon.png';
    const uInfoCon = document.createElement('div');
    uInfoCon.classList.add('UInfoCon');
    const uAlias = document.createElement('p');
    uAlias.classList.add('UAlias');
    uAlias.textContent = Reviews.UserNickname;
    const rDate = document.createElement('p');
    rDate.classList.add('RDate');
    rDate.textContent = Reviews.ReviewDate;
    uInfoCon.appendChild(uAlias);
    uInfoCon.appendChild(rDate);
    uInfo.appendChild(uAvatar);
    uInfo.appendChild(uInfoCon);
    const uCommentContainer = document.createElement('div');
    uCommentContainer.classList.add('UCommentContainer');
    const uComment = document.createElement('span');
    uComment.classList.add('UComment');
    uComment.textContent = Reviews.Feedback;
    const uImgReview = document.createElement('div');
    uImgReview.classList.add('UImgReview');

    const iReview = document.createElement('img');
    iReview.classList.add('IReview');
    if (Image !== '') {
        iReview.src = `data:image/jpeg;base64,${Image}`;
    } else {
        iReview.src = '';
    }

    uImgReview.appendChild(iReview);
    uCommentContainer.appendChild(uComment);
    uCommentContainer.appendChild(uImgReview);
    const uRate = document.createElement('div');
    uRate.classList.add('URate');
    const uStarCon = document.createElement('div');
    uStarCon.classList.add('uStarCon');
    const fullStars = Reviews.Rating;
    const blankStars = 5 - fullStars;
    for (let i = 0; i < fullStars; i++) {
        const fullStarIcon = document.createElement("img");
        fullStarIcon.classList.add('UserRateStarIcon');
        fullStarIcon.src = "../Source-Files/Icons/PassiveIcons/Star-Icon.png";
        uStarCon.appendChild(fullStarIcon);
    } for (let i = 0; i < blankStars; i++) {
        const blankStarIcon = document.createElement("img");
        blankStarIcon.classList.add('UserRateStarIcon');
        blankStarIcon.src = "../Source-Files/Icons/PassiveIcons/BlankStar-Icon.png";
        uStarCon.appendChild(blankStarIcon);
    }
    const uReviewRate = document.createElement('p');
    uReviewRate.classList.add('UReviewRate');
    uReviewRate.textContent = Reviews.Rating;

    uRate.appendChild(uStarCon);
    uRate.appendChild(uReviewRate);
    CommentContainer.appendChild(uInfo);
    CommentContainer.appendChild(uCommentContainer);
    CommentContainer.appendChild(uRate);
    ReviewsContainer.appendChild(CommentContainer);



}

async function CreateSearchedList(HotelInfo, HotelImage) {
    const iSearchedLocationMainContainer = document.createElement('div');
    iSearchedLocationMainContainer.classList.add('ISearchedLocationMainContainer');
    const iSearchedLocationContaineOverlay = document.createElement('div');
    iSearchedLocationContaineOverlay.classList.add('ISearchedLocationContaineOverlay');

    ViewDirection2(HotelInfo.HotelCoordinates);

    iSearchedLocationContaineOverlay.addEventListener('click', function() {
        SearchedLoactionContaner.style.display = 'none';
        ClickedLocationContainer.style.display = 'flex';
        RetrieveSearchedLocationData(HotelInfo.HotelID);
    }); 

    iSearchedLocationMainContainer.appendChild(iSearchedLocationContaineOverlay);
    const iSearchedImgContainer = document.createElement('div');
    iSearchedImgContainer.classList.add('ISearchedImgContainer');
    const iSearchedImg = document.createElement('img');
    iSearchedImg.classList.add('ISearchedImg');
    iSearchedImg.src = `data:image/jpeg;base64,${HotelImage}`;
    iSearchedImgContainer.appendChild(iSearchedImg);
    iSearchedLocationMainContainer.appendChild(iSearchedImgContainer);
    const iSearchedDescriptionContainer = document.createElement('div');
    iSearchedDescriptionContainer.classList.add('ISearchedDescriptionContainer');
    const iSearchedLocationName = document.createElement('p');
    iSearchedLocationName.classList.add('ISearchedLocationName');
    iSearchedLocationName.textContent = HotelInfo.HotelName;
    iSearchedDescriptionContainer.appendChild(iSearchedLocationName);

    const iSearchedLocationReview = document.createElement('div');
    iSearchedLocationReview.classList.add('ISearchedLocationReview');
    const iImgStarCon = document.createElement('div');
    iImgStarCon.classList.add('IImgStarCon');
    const searchedStarIcon = document.createElement('img');
    searchedStarIcon.classList.add('SearchedStarIcon');
    const iSearchedLocationRate = document.createElement('p');
    iSearchedLocationRate.classList.add('ISearchedLocationRate');

    const LocationRating = await GetLocationRating(HotelInfo.HotelID);
    CalculateRatings(LocationRating[0].HotelRating, LocationRating[0].ReviewCount, iSearchedLocationReview, 'IImgStarCon',
        'SearchedStarIcon' , "ISearchedLocationRate");

    iSearchedDescriptionContainer.appendChild(iSearchedLocationReview);
    const iSearchedLocationContainer = document.createElement('div');
    iSearchedLocationContainer.classList.add('ISearchedLocationContainer');
    const iLocationIcon = document.createElement('img');
    iLocationIcon.classList.add('ILocationIcon');
    iLocationIcon.src = '../Source-Files/Icons/PassiveIcons/Location-Icon.png';
    iSearchedLocationContainer.appendChild(iLocationIcon);
    const iSearchedLocation = document.createElement('p');
    iSearchedLocation.classList.add('ISearchedLocation');
    iSearchedLocation.textContent = HotelInfo.HotelLocation;
    iSearchedLocationContainer.appendChild(iSearchedLocation);
    iSearchedDescriptionContainer.appendChild(iSearchedLocationContainer);
    iSearchedLocationMainContainer.appendChild(iSearchedDescriptionContainer);
    SearchedLoactionContaner.appendChild(iSearchedLocationMainContainer);

}