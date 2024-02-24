const ClearSearchInputButton = document.querySelector('#ClearSearchInputButton');
const SearchInput = document.querySelector('#SearchInput'); const ViewMapButton = document.querySelector('#ViewMapButton');
const VisitLocationButton = document.querySelector('#VisitImgDesButton'); const VisitLocationButton2 = document.querySelector('#VisitDesButton');
const NextButtonRight = document.querySelector('#NextButtonRight'); const NextButtonLeft = document.querySelector('#NextButtonLeft');
const SearchResultContainer = document.querySelector('#SearchResultContainer'); const SearchButton = document.querySelector('#SearchButton');

document.addEventListener('DOMContentLoaded', function() {
    RetrieveAvailLocation();
});

SearchInput.addEventListener('input', function() {
    const inputValue = SearchInput.value.trim();
    if (inputValue !== '') {
        ClearSearchInputButton.style.opacity = '1';
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
            window.location.href = '../QuickSpotZCFront-End/HTML-Forms/AdminPanel.html';
        } else {
            RedirectToMainUIForm('ShowSearchResult', SearchInput.value);
        }
    }
}); ClearSearchInputButton.addEventListener('click', function() {
    SearchInput.value = '';
    ClearSearchInputButton.style.opacity = '';
    SearchResultContainer.innerHTML = '';
    SearchResultContainer.style.display = 'none';
}); SearchButton.addEventListener('click', function(){
    RedirectToMainUIForm('ShowSearchResult', SearchInput.value);
});

ViewMapButton.addEventListener('click', function() {
    RedirectToMainUIForm('ViewMap', 'None');
});

function DisplayResult(HotelName, HotelID){
    const searchResultDiv = document.createElement("div");
    searchResultDiv.className = "SearchResult";

    const resultLink = document.createElement("a");
    resultLink.className = "ResultLink";
    resultLink.addEventListener("click", function(){
        RedirectToMainUIForm('InputSearchResult', HotelID);
    });
    resultLink.textContent = HotelName;

    searchResultDiv.appendChild(resultLink);
    SearchResultContainer.appendChild(searchResultDiv);
}

function RedirectToMainUIForm(SystemCommand, Searched){
    const Command = encodeURIComponent(SystemCommand);
    const Search = encodeURIComponent(Searched);
    const NewHref = `../QuickSpotZCFront-End/HTML-Forms/MainUI.html?Command=${Command}&Search=${Search}`;
    window.location.href = NewHref;
}

const RecDesName = document.querySelector('#RecDesName'); const RecDecLocation = document.querySelector('#RecDecLocation');
const RecDecTime = document.querySelector('#RecDecTime'); const RecDecContact = document.querySelector('#RecDecContact');
const RecDecription = document.querySelector('#RecDecription'); const RecImg = document.querySelector('#RecImg');
const ImgDesName = document.querySelector('#ImgDesName'); const ImgDesReview = document.querySelector('#ImgDesReview');
const RecDesReview = document.querySelector('#RecDesReview');
NextButtonRight.addEventListener('click', function(){
    RetriveBackORNextLocation('Next', NextButtonRight.name);
}); NextButtonLeft.addEventListener('click', function(){
    RetriveBackORNextLocation('Back', NextButtonLeft.name);
}); VisitLocationButton.addEventListener('click', function() {
    RedirectToMainUIForm('ViewHotelInfo', VisitLocationButton.name);
}); VisitLocationButton2.addEventListener('click', function() {
    RedirectToMainUIForm('ViewHotelInfo', VisitLocationButton2.name);
});

async function EnlistHotelInfo(HotelInfo, HotelImage) {
    RecDesReview.innerHTML = '';
    ImgDesReview.innerHTML = '';
    NextButtonRight.name = HotelInfo.HotelID;
    NextButtonLeft.name = HotelInfo.HotelID;
    VisitLocationButton.name = HotelInfo.HotelID;
    VisitLocationButton2.name = HotelInfo.HotelID;

    RecImg.src = `data:image/jpeg;base64,${HotelImage}`;
    ImgDesName.textContent = HotelInfo.HotelName;
    const LocationRating = await GetLocationRating(HotelInfo.HotelID);
    CalculateRatings(LocationRating[0].HotelRating, LocationRating[0].ReviewCount, ImgDesReview,
        "ImgStarCon", "ImgStarIcon" , "ImgStarRate");

    RecDesName.textContent = HotelInfo.HotelName;
    CalculateRatings(LocationRating[0].HotelRating, LocationRating[0].ReviewCount, RecDesReview,
        "StarCon", "StarIcon" , "StarRate");
    RecDecLocation.textContent = HotelInfo.HotelLocation;
    RecDecTime.textContent = HotelInfo.HotelTimeAvailable;
    RecDecContact.textContent = HotelInfo.HotelContact;
    RecDecription.textContent = HotelInfo.HotelDescription;
}

function CalculateRatings(Rating, Reviews, ParentDiv, StarContainer, StarIconClass, RateP) {
    const fullStars = Math.floor(Rating);
    const halfStar = Rating % 1 !== 0;
    const blankStars = 5 - fullStars - (halfStar ? 1 : 0);
    const clickedImgStarCon = document.createElement("div");
    clickedImgStarCon.classList.add(StarContainer);
    for (let i = 0; i < fullStars; i++) {
        const fullStarIcon = document.createElement("img");
        fullStarIcon.classList.add(StarIconClass);
        fullStarIcon.src = "Source-Files/Icons/PassiveIcons/Star-Icon.png";
        clickedImgStarCon.appendChild(fullStarIcon);
    } if (halfStar) {
        const halfStarIcon = document.createElement("img");
        halfStarIcon.classList.add(StarIconClass);
        halfStarIcon.src = "Source-Files/Icons/PassiveIcons/HalfStar-Icon.png";
        clickedImgStarCon.appendChild(halfStarIcon);
    } for (let i = 0; i < blankStars; i++) {
        const blankStarIcon = document.createElement("img");
        blankStarIcon.classList.add(StarIconClass);
        blankStarIcon.src = "Source-Files/Icons/PassiveIcons/BlankStar-Icon.png";
        clickedImgStarCon.appendChild(blankStarIcon);
    }
    const RoundedRating = Math.round(Rating * Math.pow(10, 1)) / Math.pow(10, 1);
    const ClickedLocationRate = document.createElement("p");
    ClickedLocationRate.classList.add(RateP);
    ClickedLocationRate.textContent = `${RoundedRating} • ${Reviews} Reviews`;

    ParentDiv.appendChild(clickedImgStarCon);
    ParentDiv.appendChild(ClickedLocationRate);
}



