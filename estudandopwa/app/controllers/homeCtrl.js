setTimeout(() => {
    var rotas = document.getElementById('rotas');
    rotas.addEventListener("change", function (e) {
        goPage(e.target.value);
    });    
}, 500);
