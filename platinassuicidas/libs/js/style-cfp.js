document.addEventListener('DOMContentLoaded', function (event) {
    // console.log(document.getElementsByTagName('i'));
});

/*
    ações do menu
*/
// document.addEventListener('click', function (e) {
//     var menu = document.getElementsByClassName('menu-cfp');
//     for (var i in menu) {
//         for(var p in  e.path) {
//             if (e.path[p].className != undefined && e.path[p].className.indexOf('menu-cfp') >= 0) {
//                 if (menu[i] === e.target || menu[i] === e.target.parentElement) {
//                     menu[i].className += " nav-menu-active";
//                 }else{
//                     menu[i].className = "menu-cfp";
//                 }       
//             }
//         }
//     }
//     // e.preventDefault();
// });

var menus = document.getElementsByClassName('menu-cfp');
for (var x in menus) {
    // console.log(menus[x]);
}

// função para seta o menu ativo
function setActivatedMenu (menu) {
    //lista de todos os elementos que contém a classe menu
    // var menus = document.getElementsByClassName('menu-cfp');
    // laco com os menus encontrados
    for (var i in menus) {
        // se o menu setado está na lista
        if (menus[i] === menu) {
            menus[i].classList.add('nav-menu-active');
        }else{
            if(menus[i].classList != undefined && menus[i].classList.contains('nav-menu-active')) {
                menus[i].classList.remove('nav-menu-active');
            }
        }       
    }
    
}