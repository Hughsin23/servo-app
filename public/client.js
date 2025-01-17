// Initialize and add the map

// import { MarkerClusterer } from "@googlemaps/markerclusterer";

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: -25.363, lng: 131.044 },
  });
  createMarkers();
}

function createMarkers() {
  axios.get("/api/stations/all").then((res) => {
    res.data.forEach((station) => {
      let marker = new google.maps.Marker({
        position: { lat: station.latitude, lng: station.longitude },
        map: map,
        title: station.owner,
      });
      const infowindow = new google.maps.InfoWindow({
        content: `<h1 class="info-marker-title1">${station.name}</h1> <h4 class="info-marker-title2">${station.owner}</h4>`,
      });
    
    marker.addListener('click', () => {
        infowindow.open({
            anchor: marker,
            map,
            shouldFocus: true,
        })
    })   
    });
  });
}

//Adding top 5 stations to right column
//declare a function
//call axios with the endpoint
//with the data create dom elements and append to the parent element

const stationList = document.querySelector(".station-list");
const stationDetail = document.querySelector(".station-detail");

const getTop5Stations = () => {
  axios.get("http://localhost:8080/api/stations/all").then((res) => {
    console.log(res.data);
    // console.log(res.rows)
    var stations = res.data;
    stations.forEach((station) => {
      const ulStation = document.createElement("ul");
      const liName = document.createElement("li");
      const liAddress = document.createElement("li");
      const liSuburb = document.createElement("li");
      ulStation.classList.add("station-list");
      liName.classList.add("bulletFreeList");
      liAddress.classList.add("bulletFreeList");
      liSuburb.classList.add("bulletFreeList");

      liName.textContent = station.name;
      liAddress.textContent = station.address;
      liSuburb.textContent = station.suburb;

      ulStation.appendChild(liName);
      ulStation.appendChild(liAddress);
      ulStation.appendChild(liSuburb);
      stationDetail.appendChild(ulStation);
    });
  });
};
window.onload = () => {
  getTop5Stations();
};

function getStationStats() {
  axios.get("http://localhost:8080/api/stats").then((res) => {
    const ownerDiv = document.querySelector(".owners");

    res.data.forEach((station) => {
      const stationOwnerDiv = document.createElement("div");
      const stationStatDiv = document.createElement("div");

      stationOwnerDiv.classList.add("owner-item");
      stationStatDiv.classList.add("owner-item");
      stationOwnerDiv.textContent = station.owner;
      stationStatDiv.textContent = station.count;

      ownerDiv.appendChild(stationOwnerDiv);
      ownerDiv.appendChild(stationStatDiv);
    });
  });
}

getStationStats();
