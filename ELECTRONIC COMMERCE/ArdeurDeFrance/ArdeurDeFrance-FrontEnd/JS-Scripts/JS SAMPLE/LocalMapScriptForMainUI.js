var map = L.map('map', { zoomControl: false }).setView([6.9214, 122.0790], 14); 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map); 

var zoomLevel = 14;
function zoomOut() {
    if (zoomLevel > 1) { map.zoomOut(); zoomLevel = map.getZoom(); }
    else { console.log('YOU CANT ZOOM OUT ANYMORE'); }
} function zoomIn() {
    if (zoomLevel < 18) { map.zoomIn(); zoomLevel = map.getZoom(); } 
    else { console.log('YOU CANT ZOOM IN ANYMORE'); }
} document.getElementById('ZoomOutButton').addEventListener('click', zoomIn);
document.getElementById('ZoomInButton').addEventListener('click', zoomOut);

function ViewDirection(HotelCoordinates){
    const coordinatesArray = HotelCoordinates.split(',');
    const latitude = parseFloat(coordinatesArray[0].trim());
    const longitude = parseFloat(coordinatesArray[1].trim());

    var newZoomLevel = 18;
    var newCoordinates = [latitude, longitude + 0.0010];
    map.setView(newCoordinates, newZoomLevel);
}

function ViewDirection2(HotelCoordinates){
    const coordinatesArray = HotelCoordinates.split(',');
    const latitude = parseFloat(coordinatesArray[0].trim());
    const longitude = parseFloat(coordinatesArray[1].trim());

    var markerCoordinates = [latitude, longitude];
    L.marker(markerCoordinates).addTo(map);
}