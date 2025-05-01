let map;
let controlRutas;
const ubicacionNegocio = [41.385372838075234, 2.149157895656964]; // LATITUD, LONGITUD

function initMap() {
  map = L.map("map").setView(ubicacionNegocio, 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  L.marker(ubicacionNegocio).addTo(map).bindPopup("MasterD").openPopup();

  document
    .getElementById("btnRuta")
    .addEventListener("click", obtenerUbicacion);
}

function obtenerUbicacion() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (posicion) => {
        const ubicacionCliente = [
          posicion.coords.latitude,
          posicion.coords.longitude,
        ];
        calcularRuta(ubicacionCliente, ubicacionNegocio);
      },
      () => {
        alert("No pudimos obtener tu ubicación.");
      }
    );
  } else {
    alert("Tu navegador no soporta geolocalización.");
  }
}

function calcularRuta(origen, destino) {
  if (controlRutas) {
    map.removeControl(controlRutas);
  }

  controlRutas = L.Routing.control({
    waypoints: [
      L.latLng(origen[0], origen[1]),
      L.latLng(destino[0], destino[1]),
    ],
    routeWhileDragging: true,
    language: "es",
    createMarker: function () {
      return null;
    },
    directionsServiceOptions: {
      suppressInfoWindows: true,
    },
  }).addTo(map);
}

document.addEventListener("DOMContentLoaded", initMap);
