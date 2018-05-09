function getDefaultView() {
	return (window.innerWidth < 514) ? "listMonth" : "month"; 
}

function myEvents () {
	let events = [
		{
			"id": 1,
			"title": "Trocar roteador SEMP",
			"descricao": "O Cliente informou a queima do aparelho, subistituir por um novo.",
			"start": '2018-05-08T08:00:00',
			color: "red",
			equipe: [
				"Fulano 3"
			]
		},
		{
			"id": 2,
			"title": 'Reunião de Planejamento',
			"descricao": "Reunião para re-planejar metodos de agilidade da Equipe de desenvolvimento.",
			"start": '2018-05-09T16:00:00',
			color: "rgb(239, 200, 43)",
			textColor: "rgb(0, 0, 0)",
			equipe: [
				"Nilton Caldas",
				"Dayane Felix",
				"Adelson Guimarães"
			]
		},
		{
			"id": 3,
			"title": 'Instalação Honda',
			"descricao": "Inicio de instalação de friba na fábrica da honda.",
			"start": '2018-05-14T08:00:00',
			"end": '2018-05-14T12:00:00',
			color: "rgb(34, 73, 137)",
			// textColor: "rgb(0, 0, 0)"
			equipe: [
				"Fulano 1",
				"Fulano 2"
			]
		},
		{
			"id": 4,
			"title": 'Retirada de Equipamentos Locomotiva',
			"descricao": "O Cliente entrou com o pedido de cancelamento no dia 05/05/2018, fazer a retirada do equipamento.",
			"start": '2018-05-14T15:00:00',
			color: "rgb(34, 73, 137)",
			// textColor: "rgb(0, 0, 0)"
			equipe: [
				"Fulano 3"
			]
		},
		{
			"id": 5,
			"title": 'Concerto de Rompimento de Fibra',
			"descricao": "Identificado Rompimento de fibra na Rua Torquato tapajós, próximo a KIA, fazer o reparo.",
			"start": '2018-05-16T09:00:00',
			color: "rgb(34, 73, 137)",
			// textColor: "rgb(0, 0, 0)"
			equipe: [
				"Fulano 1",
				"Fulano 2",
				"Fulano 3"
			]
		},
		{
			"id": 6,
			"title": 'Verificação do Disel do Gerador',
			"descricao": "Fazer a verificação de rotina do disel do gerador.",
			"start": '2018-05-18T10:00:00',
			color: "rgb(34, 73, 137)",
			// textColor: "rgb(0, 0, 0)"
			equipe: [
				"Fulano 1"
			]
		},
		{
			"id": 7,
			"title": 'Testar conexão do cliente Panasonic',
			"descricao": "A instalação da internet do cliente foi finalizada, agora é necessário testar a conexão do cliente.",
			"start": '2018-05-18T14:00:00',
			color: "rgb(34, 73, 137)",
			// textColor: "rgb(0, 0, 0)"
			equipe: [
				"Fulano 1"
			]
		},
		{
			"id": 8,
			"title": 'Enviar proposta comercial para cliente Bemol',
			"descricao": "Enviar uma nova proposta para o cliente informando os novos valores para os serviços solicitados.",
			"start": '2018-05-22T08:30:00',
			color: "rgb(34, 73, 137)",
			// textColor: "rgb(0, 0, 0)"
			equipe: [
				"Fulano 1"
			]
		},
		{
			"id": 9,
			"title": 'Trocar lâmpadas do escritório',
			"descricao": "Verificar e trocar lâmpadas queimadas do escritório da Akto.",
			"start": '2018-05-23T15:00:00',
			color: "rgb(34, 73, 137)",
			// textColor: "rgb(0, 0, 0)"
			equipe: [
				"Fulano 1"
			]
		}
	];
	return events;
}

document.addEventListener("DOMContentLoaded", () => {
	$('#calendar').fullCalendar({
		windowResize: function(view) {
			$('#calendar').fullCalendar('changeView', getDefaultView());
			$('#calendar').fullCalendar("rerenderEvents");
		},
		defaultView: getDefaultView(),
		nowIndicator: true,
		header: false,
		// {
			// left: 'prev,next today',
			// left: 'today',
	        // center: 'title',
			// right: 'month,agendaWeek,agendaDay,listWeek'
			// left: '',
	        // center: '',
	        // right: ''
    	// },
    	titleFormat: 'DD MMMM YYYY',
    	height: 'parent',
		events: myEvents(),
		navLinks: true, // can click day/week names to navigate views
		editable: true,
		eventLimit: true,
		buttonText: {
		  // today:    'today',
		  // month:    'month',
		  // week:     'week',
		  // day:      'day',
		  list:     'Lista'
		},
		eventClick: function (date, jsEvent, view) {
			setDataEventModal(date.id);
		}
	});
	setTitle(); // setando o titulo do calendário
	clickItemMenu(); // cliando num item do menu
	dragCalendar(); // arrastando o dedo na tela
	prevOrNext(); // clicando nos botões de navegação Prev ou Next
}, false);

function setTitle () {
	document.getElementById('title').innerHTML = `${$('#calendar').fullCalendar('getView').title}`;
}

function prevOrNext () {
	document.getElementById('prev').addEventListener("click", function (e) {
		// move calendario para trás
		$('#calendar').fullCalendar('prev');
		setTitle(); // atualiza o título
	});
	document.getElementById('next').addEventListener("click", function (e) {
		// move o calendário para frente
		$('#calendar').fullCalendar('next');
		setTitle(); // atualiza o título
	});
}

function getEvent (id) {
	let events = myEvents();
	event = null;
	for (var i in events) {
		if (events[i].id === id) {
			event = events[i];
		}
	}
	return event;
}

function listaEquipe (equipe) {
	var s = "";
	for (var i in equipe) {
		s += equipe[i] + ", ";
	}
	if (s.length >= 0) s = s.substr(0, s.lastIndexOf(","));
	return s;
}

function setDataEventModal (id) {
	event = getEvent(id);
	if (event === null) return false;

	var dataEvent = document.getElementById('dataevent');
	var modal = document.getElementById('modal');
	dataEvent.innerHTML = `
		<p>
			<b>Evento:</b> ${event.title}<br>
			<b>Descrição:</b> ${event.descricao}<br>
			<b>Data:</b> ${moment(event.start).format('DD MMMM YYYY')}<br>
			<b>Equipe:</b> ${listaEquipe(event.equipe)}
		<p>
	`;
	modal.style.display = "block";

	modal.addEventListener('click', (e) => {
		if (e.target.id === "modal") {
			modal.style.display = 'none';
		}
	});
}

function dragCalendar () {
	let cal = document.getElementById('calendar');
	cal = cal.children[0];
	let clicked = false;
	let position = 0;
	let touch = false;
	let brushes = []; // pinturas da tela
	let timeini = null;

	// keybord event
	document.addEventListener("keyup", (e) => {
		// esquerda
		if (e.keyCode === 37) {
			$('#calendar').fullCalendar('prev');
			setTitle();
		// direita
		}else if (e.keyCode === 39) {
			$('#calendar').fullCalendar('next');
			setTitle();
		}
	});

	//touch event
	cal.addEventListener("touchstart", (e) => {
		touch = true;
		clicked = true;
		position = e.changedTouches[0].clientX;
		timeini = moment();
	});
	
	cal.addEventListener("touchend", (e) => {
		if ( clicked && touch ) {
			// moveu para esquerda
			if (e.changedTouches[0].clientX < position) {
				if ((position - e.changedTouches[0].clientX) > 60) $('#calendar').fullCalendar('next');
				setTitle();
			// moveu para direita
			}else{
				if ((e.changedTouches[0].clientX - position) > 60) $('#calendar').fullCalendar('prev');
				setTitle();
			}
		}
		clicked = false;
		position = 0;
		for (var i in brushes) {
			brushes[i].remove();
		}
		brushes = [];
	});
	
	cal.addEventListener("touchmove", (e) => {
		// se manter pressionado por mais de 1,5 segundos break
		if(moment().diff(timeini, "seconds", true) > 1.5) return false;
		if (clicked && touch) {
			let brush = document.createElement("span");
			brush.classList.add("dragPaint");
			brush.style.left = `${e.changedTouches[0].clientX}px`;
			brush.style.top = `${e.changedTouches[0].clientY}px`;
			brush.style.position = "absolute";
			brush.style.zIndex = 1300;
			if (brushes.length <=15) {
				brushes.push(brush);
				document.body.appendChild(brush);
			}
		}
	});
}

function clickItemMenu () {
	let = menu = document.getElementById('menuDrop');
	menu.addEventListener("click", (e) => {
		if (e.target.tagName === 'A') {
			if (e.target.name === 'today') return $('#calendar').fullCalendar('gotoDate', moment());
			$('#calendar').fullCalendar('changeView', e.target.name);
			setTitle();
		}
	});
}

function goToDate (date) {
	let view = $('#calendar').fullCalendar('getView');
	$('#calendar').fullCalendar('changeView', view.name, date);
	setTitle();
}

function clickTitle () {
	document.addEventListener('DOMContentLoaded', () => {
		let title = document.getElementById('title');
		let datepicker = document.getElementById('datetimepicker');
		document.addEventListener('click', function (e) {
			if (e.target === title) {
				datepicker.style.display = "block";	
			}else{
				datepicker.style.display = "none";
			}
		});
		$(".form_datetime").datetimepicker()
			.on('changeDate', function (ev) {
				let date = moment(ev.date).format('YYYY-MM-DD');
				goToDate(date);
				datepicker.style.display = "none";
			});
	});
}
clickTitle();

function especialCharMask (palavra){
	var com_acento = 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ´`^¨~';  
    var sem_acento = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC     ';
    for (l in palavra){
        for (l2 in com_acento){
            if (palavra[l] == com_acento[l2]){
                palavra=palavra.replace(palavra[l],sem_acento[l2]);
    		}
        }
    }
    return palavra;
}

// filtrando
function filtering (data, field) {
	return {
		temp : [],
		inputValue: '',
		fil: (val) => {
			let f = document.getElementById('filter');
			let str = especialCharMask(f.value).toUpperCase();
			return especialCharMask(val[field]).toUpperCase().indexOf(str)>=0;
		},
		filter: function () {
			let changes = [];
			changes = data;
			changes = changes.filter(this.fil);
			this.temp.splice(0, this.temp.length);
			for(var i in changes) {
				this.temp.push(changes[i]);
			}
			return this.temp;
		},
		watch : function (callback) {
			Array.observe(this.temp, callback);
		},
		start: function () {
			document.addEventListener('DOMContentLoaded', () => {
				let f = document.getElementById('filter');
				f.addEventListener('keyup', (e) => {
					return this.filter();
				});
			})
		}
	}
};
// criando instancia de filtering
let fil = filtering(myEvents(), 'title');
// startando
fil.start();
// escutando evento de filtro
fil.watch( (changes) => {
	$('#calendar').fullCalendar("removeEvents");
	$('#calendar').fullCalendar("renderEvents", fil.temp);
});
