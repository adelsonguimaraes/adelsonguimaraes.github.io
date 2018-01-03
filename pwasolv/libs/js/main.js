function loadPage (page) {
    document.getElementById("content").innerHTML='<object type="text/html" data="views/'+page+'.html" ></object>';
}

loadPage('login');