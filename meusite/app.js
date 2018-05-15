// adicionando Rotas
let rotas = [
	LoadPage.newRoute("home", "./app/views/home.html"), // alias, html, css, controller
	// LoadPage.newRoute("home", "./app/views/home.html", "home")
];
LoadPage.addRoutes(rotas);