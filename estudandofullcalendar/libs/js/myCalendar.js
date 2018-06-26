const myCalendar = {
	
	getDefaultView: function() {
		return (window.innerWidth < 514) ? "listMonth" : "month"; 
	},
	myEvents: function() {
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
	},
	render: function () {
		document.addEventListener("DOMContentLoaded", () => {
			$('#calendar').fullCalendar({
				windowResize: function(view) {
					$('#calendar').fullCalendar('changeView', getDefaultView());
					$('#calendar').fullCalendar("rerenderEvents");
				},
				defaultView: myCalendar.getDefaultView(),
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
				events: myCalendar.myEvents(),
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
					myCalendar.setDataEventModal(date.id);
				}
			});
			myCalendar.setTitle(); // setando o titulo do calendário
			myCalendar.clickItemMenu(); // cliando num item do menu
			myCalendar.dragCalendar(); // arrastando o dedo na tela
			myCalendar.prevOrNext(); // clicando nos botões de navegação Prev ou Next
		}, false);
	},
	
	setTitle: function() {
		document.getElementById('title').innerHTML = `${$('#calendar').fullCalendar('getView').title}`;
	},

	prevOrNext: function() {
		document.getElementById('prev').addEventListener("click", function (e) {
			// move calendario para trás
			$('#calendar').fullCalendar('prev');
			myCalendar.setTitle(); // atualiza o título
			let fil = myCalendar.filtering(myCalendar.myEvents(), 'title');
			$('#calendar').fullCalendar("removeEvents");
			$('#calendar').fullCalendar("renderEvents", fil.temp);
		});
		document.getElementById('next').addEventListener("click", function (e) {
			// move o calendário para frente
			$('#calendar').fullCalendar('next');
			myCalendar.setTitle(); // atualiza o título
			let fil = myCalendar.filtering(myCalendar.myEvents(), 'title');
			$('#calendar').fullCalendar("removeEvents");
			$('#calendar').fullCalendar("renderEvents", fil.temp);
		});
	},
	
	getEvent: function(id) {
		let events = this.myEvents();
		event = null;
		for (var i in events) {
			if (events[i].id === id) {
				event = events[i];
			}
		}
		return event;
	},

	listaEquipe: function(equipe) {
		var s = "";
		for (var i in equipe) {
			s += equipe[i] + ", ";
		}
		if (s.length >= 0) s = s.substr(0, s.lastIndexOf(","));
		return s;
	},

	setDataEventModal: function (id) {
		event = myCalendar.getEvent(id);
		if (event === null) return false;
	
		var dataEvent = document.getElementById('dataevent');
		var modal = document.getElementById('modal');
		dataEvent.innerHTML = `
			<p>
				<b>Evento:</b> ${event.title}<br>
				<b>Descrição:</b> ${event.descricao}<br>
				<b>Data:</b> ${moment(event.start).format('DD MMMM YYYY')}<br>
				<b>Equipe:</b> ${myCalendar.listaEquipe(event.equipe)}
			<p>
		`;
		modal.style.display = "block";
	
		modal.addEventListener('click', (e) => {
			if (e.target.id === "modal") {
				modal.style.display = 'none';
			}
		});
	},

	dragCalendar: function () {
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
				myCalendar.setTitle();
			// direita
			}else if (e.keyCode === 39) {
				$('#calendar').fullCalendar('next');
				myCalendar.setTitle();
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
					myCalendar.setTitle();
				// moveu para direita
				}else{
					if ((e.changedTouches[0].clientX - position) > 60) $('#calendar').fullCalendar('prev');
					myCalendar.setTitle();
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
	},

	clickItemMenu: function () {
		let = menu = document.getElementById('menuDrop');
		menu.addEventListener("click", (e) => {
			if (e.target.tagName === 'A') {
				if (e.target.name === 'today') return $('#calendar').fullCalendar('gotoDate', moment());
				$('#calendar').fullCalendar('changeView', e.target.name);
				myCalendar.setTitle();
			}
		});
	},
	
	goToDate: function (date) {
		let view = $('#calendar').fullCalendar('getView');
		$('#calendar').fullCalendar('changeView', view.name, date);
		myCalendar.setTitle();
	},

	clickTitle: function () {
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
					myCalendar.goToDate(date);
					datepicker.style.display = "none";
				});
		});
	},

	especialCharMask: function (palavra){
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
	},

	// filtrando
	filtering: function (data, field) {
		return {
			temp : [],
			inputValue: '',
			fil: (val) => {
				let f = document.getElementById('filter');
				let str = myCalendar.especialCharMask(f.value).toUpperCase();
				return myCalendar.especialCharMask(val[field]).toUpperCase().indexOf(str)>=0;
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
	},

	init: function () {
		myCalendar.clickTitle();
		// criando instancia de filtering
		let fil = myCalendar.filtering(myCalendar.myEvents(), 'title');
		// startando
		fil.start();
		// escutando evento de filtro
		fil.watch( (changes) => {
			$('#calendar').fullCalendar("removeEvents");
			$('#calendar').fullCalendar("renderEvents", fil.temp);
		});
	}
}



