// getando a div de status net
var div = document.getElementById("statusnet");
var p = div.querySelector('p');
var figure = document.getElementById("imgstatus");
var img = figure.querySelector('img');
var toast = document.getElementById("toast");

// function que funciona como escuta do evento
function setStatusNet(e) {
    if(navigator.onLine) {
        p.innerHTML = "Deslige a internet para testar!";
        img.src = "http://sambandocomevelyn.com.br/wp-content/uploads/2016/12/selo-online.png";
        img.height = "80";
        toast.style.display = "none";
    }else{
        p.innerHTML = "Ligue a internet para testar!";
        img.src = "libs/img/off-line.jpg";
        img.height = "140";
        toast.style.display = "block";
    }
}

window.addEventListener("online", setStatusNet); // adicionando o evento de escuta
window.addEventListener("offline", setStatusNet); // adicionando o evento de escuta
setStatusNet(); // iniciando o evento de escuta

