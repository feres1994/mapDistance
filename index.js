//***********************map creation***********************//
var mymap = L.map("mapid").setView([35.76029352, 10.75603748], 13); //tunisia lat && long with 13 zoom

L.tileLayer(
  //map imag and config
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZmVyZXM5NCIsImEiOiJjazNvZDRkcHIwa3ljM2Rxcmg5ODR0c2FoIn0.3W34uJmM9kNnCGDhncur0Q",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    accessToken:
      "pk.eyJ1IjoiZmVyZXM5NCIsImEiOiJjazNvZDRkcHIwa3ljM2Rxcmg5ODR0c2FoIn0.3W34uJmM9kNnCGDhncur0Q"
  }
).addTo(mymap);
//**************blue points creation**************//
const cords = [
  [35.76029352, 10.75603748],
  [35.76834406, 10.81664311],
  [35.764356, 10.818549],
  [35.779205, 10.807902],
  [35.770186, 10.767053],
  [35.77905892, 10.69856859]
];
/******************FORMULE POUR CALCUER LA DISTANCE EN KM *******************/
function distance(l1, l2) {
  if (l1[0] == l2[0] && l1[1] == l2[1]) {
    return 0;
  } else {
    var radlat1 = (Math.PI * l1[0]) / 180;
    var radlat2 = (Math.PI * l2[0]) / 180;
    var theta = l1[1] - l2[1];
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;

    return dist;
  }
}

/*****************************************/
//************add blue points to the map and add the point to see the distance between them********************/
function getCoords(x) {
  var firstPointChecked = false; //test if the first point is selected or not
  var secondPointChecked = false; //test if the second point is selected or not
  var firstPointLatLng = []; //array in wich we will add latitude and longitude of first point
  var secondPointLatLng = []; //array in wich we will add latitude and longitude of second point
  //we need 2 array's to calculate the distance after
  return x.map(el => {
    const x = L.marker([el[0], el[1]])
      .addTo(mymap)
      .on("click", () => {
        //awel if ntsti kn l point loula mahech selectionner nselectoneha  tettzedli fel box l abyeth
        if (firstPointChecked === false && secondPointChecked === false) {
          document.querySelector(".first-point").innerHTML = x._latlng;
          firstPointLatLng = [x._latlng.lat, x._latlng.lng];
          firstPointChecked = true;
          return;
        }
        //theni if ntsti kn l point loula selectionner w thenia lé nselectoneha
        // tettzedli fel box l abyeth w ne7seb distance
        if (firstPointChecked === true && secondPointChecked === false) {
          document.querySelector(".second-point").innerHTML = x._latlng;
          secondPointChecked = true;
          secondPointLatLng = [x._latlng.lat, x._latlng.lng];
          document.querySelector(".distance").innerHTML = distance(
            firstPointLatLng,
            secondPointLatLng
          );
          return;
        }
        //theleth if kn zouz selectionner nwali n3aweth e loula b point okra
        //w ne7seb e distance
        if (firstPointChecked === true && secondPointChecked === true) {
          document.querySelector(".first-point").innerHTML = x._latlng;
          secondPointChecked = true;
          firstPointLatLng = [x._latlng.lat, x._latlng.lng];
          document.querySelector(".distance").innerHTML = distance(
            firstPointLatLng,
            secondPointLatLng
          );
          return;
        }
      });
  });
}
getCoords(cords);
//appler la fonction getCords
var polygon = L.polygon(cords, { color: "red" }).addTo(mymap);
//polygon eli tzid l khtout l 7mor
