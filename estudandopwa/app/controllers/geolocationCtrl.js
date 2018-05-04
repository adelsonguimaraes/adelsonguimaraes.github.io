var x = document.getElementById("demo");
var dist = document.getElementById("metros");
var radius = 20;

var latLocal = '-3.107039';
var lonLocal = '-60.020749';
var latlonLocal = null;

var lat = 0;
var lon = 0;

var directionsDisplay = null;
var directionsService = null;

var map = null;

var markerLocal = null;
var markerEquipe = null;
var ciclo = 0;

function init() {

    latlonLocal = new google.maps.LatLng(latLocal, lonLocal);
    directionsDisplay = new google.maps.DirectionsRenderer;
    directionsService = new google.maps.DirectionsService;
    // opções iniciais do mapa
    var myOptions = {
        center: latlonLocal, zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL },
        disableDefaultUI: true
    };
    map = new google.maps.Map(document.getElementById("mapholder"), myOptions);

    mapholder = document.getElementById('mapholder')
    mapholder.style.height = (window.innerHeight - 150) + 'px';
    // mapholder.style.width = '500px';

    markerLocal = new google.maps.Marker({ position: latlonLocal, map: map, title: "Local da Tarefa", icon: './libs/img/work-icon.png' }); // local
    var circulo = new google.maps.Circle({
        map: map,
        center: new google.maps.LatLng(latLocal, lonLocal),
        radius: radius, // 1000 metros = 1k.
        strokeColor: "#0000FF",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#0000FF",
        fillOpacity: 0.4
    });
}



function getLocation() {
    if (navigator.geolocation) {
        var options = {
            enableHighAccuracy: true,
            timeout: 30000, // 30 segundos para esperar a resposta 
            maximumAge: 30000 // 30 segundos para atualizar a localização
        };

        // const watcher = navigator.geolocation.watchPosition(showPosition, showError, options);

        navigator.geolocation.getCurrentPosition(showPosition, showError, options);
    } else {
        x.innerHTML = "Geolocalização não é suportada nesse browser.";
    }
}

function showPosition(position) {
    // var latLocal = '-3.107039';
    // var lonLocal = '-60.020749';

    lat = position.coords.latitude;
    lon = position.coords.longitude;

    var distancia = getDistanceFromLatLonInKm(
        { lat: latLocal, lng: lonLocal },
        { lat: lat, lng: lon }
    );

    // if (distancia <= radius) {
    //   x.innerHTML = "<b><font color='green'>Parabéns você está no seu local de Tarefa.</font><b>";
    // }else{
    //   x.innerHTML = "<b><font color='red'>Você está distante do Local de Tarefa, se aproxime mais!</font><b>";
    // }

    dist.innerHTML = "Você está há " + distancia + " metros do local da tarefa!";

    latlon = new google.maps.LatLng(lat, lon)
    // latlonLocal = new google.maps.LatLng(latLocal, lonLocal)
    // mapholder=document.getElementById('mapholder')
    // mapholder.style.height='250px';
    // mapholder.style.width='500px';

    // var myOptions = {
    // center: latlonLocal,zoom:18,
    // mapTypeId:google.maps.MapTypeId.ROADMAP,
    // mapTypeControl:false,
    // navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
    // };
    // var map=new google.maps.Map(document.getElementById("mapholder"),myOptions);
    if (markerEquipe != null) {
        ciclo++;
        markerEquipe.setMap(null);
    }
    // equipe
    markerEquipe = new google.maps.Marker({
        position: latlon,
        map: map,
        title: "Você está Aqui!",
        icon: './libs/img/worker-icon.png',
        animation: google.maps.Animation.Bounce
    });

    // var markerLocal = new google.maps.Marker({ position: latlonLocal, map: map, title: "Local da Tarefa", icon: '../libs/img/work-icon.png' }); // local
    // var circulo = new google.maps.Circle({
    //   map: map,
    //   center: new google.maps.LatLng(latLocal, lonLocal),
    //   radius: radius, // 1000 metros = 1k.
    //   strokeColor: "#0000FF",
    //   strokeOpacity: 0.8,
    //   strokeWeight: 2,
    //   fillColor: "#0000FF",
    //   fillOpacity: 0.4
    // });
    if (ciclo <= 0) {
        map.setCenter(latlon); // centraliza na minha posição
    }

    calculateAndDisplayRoute();


}

function IniciarTarefa() {
    getLocation();
    var distancia = getDistanceFromLatLonInKm(
        { lat: latLocal, lng: lonLocal },
        { lat: lat, lng: lon }
    );

    if (distancia <= radius) {
        x.innerHTML = "<b><font color='green'>Parabéns você está no seu local de Tarefa.</font><b>";
    } else {
        x.innerHTML = "<b><font color='red'>Você está distante do Local de Tarefa, se aproxime mais!</font><b>";
    }
}

function centralizar() {
    latlon = new google.maps.LatLng(lat, lon);
    map.setCenter(latlon);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "Usuário rejeitou a solicitação de Geolocalização."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Localização indisponível."
            break;
        case error.TIMEOUT:
            x.innerHTML = "O tempo da requisição expirou."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "Algum erro desconhecido aconteceu."
            break;
    }
}
//   function localizarUsuario(){
//   if (window.navigator && window.navigator.geolocation) {
//    var geolocation = window.navigator.geolocation;
//    geolocation.getCurrentPosition(sucesso, erro);
//   } else {
//      alert('Geolocalização não suportada em seu navegador.')
//   }
//   function sucesso(posicao){

//     var latitude = posicao.coords.latitude;
//     var longitude = posicao.coords.longitude;
//     alert('Sua latitude estimada é: ' + latitude + ' e longitude: ' + longitude )
//   }
//   function erro(error){
//     console.log(error)
//   }
// }

// calulando distancia entre duas coordenadas
function getDistanceFromLatLonInKm(position1, position2) {
    "use strict";
    var deg2rad = function (deg) { return deg * (Math.PI / 180); },
        R = 6371,
        dLat = deg2rad(position2.lat - position1.lat),
        dLng = deg2rad(position2.lng - position1.lng),
        a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(deg2rad(position1.lat))
            * Math.cos(deg2rad(position1.lat))
            * Math.sin(dLng / 2) * Math.sin(dLng / 2),
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return ((R * c * 1000).toFixed());
}

//calculando distancia entre rotas;
function calculateAndDisplayRoute() {
    // var selectedMode = document.getElementById('mode').value;
    // var directionsRendererOptions = new google.maps.DirectionsRendererOptions;
    // directionsRendererOptions.preserveViewport(true);
    directionsDisplay.setMap(map);
    directionsDisplay.setOptions({
        preserveViewport: true, // preservar a visualização atual
        suppressMarkers: true // desabilitar marcadores(waypoints) de rota
    });
    directionsService.route({
        origin: { lat: +lat, lng: +lon },  // origem gps do usuario
        destination: { lat: +latLocal, lng: +lonLocal },  // local de chegada
        // Note that Javascript allows us to access the constant
        // using square brackets and a string value as its
        // "property."
        travelMode: google.maps.TravelMode['DRIVING']
    }, function (response, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            console.warn('Directions request failed due to ' + status);
        }
    });
}

setTimeout(() => {
    init();
    getLocation();
}, 1500);