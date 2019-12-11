const MyCalendar = {
    filterEvents: [],
    events: [
        // {
        //     "id": 1,
        //     "title": "Trocar roteador SEMP",
        //     "descricao": "O Cliente informou a queima do aparelho, subistituir por um novo.",
        //     "start": '2018-07-08T08:00:00',
        //     color: "red",
        //     equipe: [
        //         "Fulano 3"
        //     ]
        // },
        // {
        //     "id": 2,
        //     "title": 'Reunião de Planejamento',
        //     "descricao": "Reunião para re-planejar metodos de agilidade da Equipe de desenvolvimento.",
        //     "start": '2018-07-09T16:00:00',
        //     color: "rgb(239, 200, 43)",
        //     textColor: "rgb(0, 0, 0)",
        //     equipe: [
        //         "Nilton Caldas",
        //         "Dayane Felix",
        //         "Adelson Guimarães"
        //     ]
        // },
        // {
        //     "id": 3,
        //     "title": 'Instalação Honda',
        //     "descricao": "Inicio de instalação de friba na fábrica da honda.",
        //     "start": '2018-07-14T08:00:00',
        //     "end": '2018-05-14T12:00:00',
        //     color: "rgb(34, 73, 137)",
        //     // textColor: "rgb(0, 0, 0)"
        //     equipe: [
        //         "Fulano 1",
        //         "Fulano 2"
        //     ]
        // },
        // {
        //     "id": 4,
        //     "title": 'Retirada de Equipamentos Locomotiva',
        //     "descricao": "O Cliente entrou com o pedido de cancelamento no dia 05/05/2018, fazer a retirada do equipamento.",
        //     "start": '2018-07-14T15:00:00',
        //     color: "rgb(34, 73, 137)",
        //     // textColor: "rgb(0, 0, 0)"
        //     equipe: [
        //         "Fulano 3"
        //     ]
        // },
        // {
        //     "id": 5,
        //     "title": 'Concerto de Rompimento de Fibra',
        //     "descricao": "Identificado Rompimento de fibra na Rua Torquato tapajós, próximo a KIA, fazer o reparo.",
        //     "start": '2018-07-16T09:00:00',
        //     color: "rgb(34, 73, 137)",
        //     // textColor: "rgb(0, 0, 0)"
        //     equipe: [
        //         "Fulano 1",
        //         "Fulano 2",
        //         "Fulano 3"
        //     ]
        // },
        // {
        //     "id": 6,
        //     "title": 'Verificação do Disel do Gerador',
        //     "descricao": "Fazer a verificação de rotina do disel do gerador.",
        //     "start": '2018-07-18T10:00:00',
        //     color: "rgb(34, 73, 137)",
        //     // textColor: "rgb(0, 0, 0)"
        //     equipe: [
        //         "Fulano 1"
        //     ]
        // },
        // {
        //     "id": 7,
        //     "title": 'Testar conexão do cliente Panasonic',
        //     "descricao": "A instalação da internet do cliente foi finalizada, agora é necessário testar a conexão do cliente.",
        //     "start": '2018-07-18T14:00:00',
        //     color: "rgb(34, 73, 137)",
        //     // textColor: "rgb(0, 0, 0)"
        //     equipe: [
        //         "Fulano 1"
        //     ]
        // },
        // {
        //     "id": 8,
        //     "title": 'Enviar proposta comercial para cliente Bemol',
        //     "descricao": "Enviar uma nova proposta para o cliente informando os novos valores para os serviços solicitados.",
        //     "start": '2018-07-22T08:30:00',
        //     color: "rgb(34, 73, 137)",
        //     // textColor: "rgb(0, 0, 0)"
        //     equipe: [
        //         "Fulano 1"
        //     ]
        // },
        // {
        //     "id": 9,
        //     "title": 'Trocar lâmpadas do escritório',
        //     "descricao": "Verificar e trocar lâmpadas queimadas do escritório da Akto.",
        //     "start": '2018-07-23T15:00:00',
        //     color: "rgb(34, 73, 137)",
        //     // textColor: "rgb(0, 0, 0)"
        //     equipe: [
        //         "Fulano 1"
        //     ]
        // }
    ],
    getDefaultView: function () {
        return (window.innerWidth < 514) ? "listMonth" : "month";
    },
    setEvents: function (events) {
        this.events = events;
        this.filterEvents = events;
        $('#calendar').fullCalendar("removeEvents");
        $('#calendar').fullCalendar("renderEvents", MyCalendar.filterEvents);
    },
    myEvents: function () {
        return this.events;
    },
    render: function () {
        // document.addEventListener("DOMContentLoaded", () => {
            $('#calendar').fullCalendar({
                windowResize: function (view) {
                    $('#calendar').fullCalendar('changeView', MyCalendar.getDefaultView());
                    $('#calendar').fullCalendar("rerenderEvents");
                },
                defaultView: MyCalendar.getDefaultView(),
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
                events: MyCalendar.myEvents(),
                navLinks: true, // can click day/week names to navigate views
                editable: false,
                // droppable: false, // não arrastar
                eventLimit: true,
                buttonText: {
                    // today:    'today',
                    // month:    'month',
                    // week:     'week',
                    // day:      'day',
                    list: 'Lista'
                },
                eventClick: function (date, jsEvent, view) {
                    // MyCalendar.EventClick(date);
                    calendarioCtrl.clickTarefaCalendar(date);
                }
            });
            MyCalendar.setTitle(); // setando o titulo do calendário
            MyCalendar.clickItemMenu(); // cliando num item do menu
            MyCalendar.dragCalendar(); // arrastando o dedo na tela
            MyCalendar.prevOrNext(); // clicando nos botões de navegação Prev ou Next
            MyCalendar.filterEvents = this.myEvents();
        // }, false);
    },

    setTitle: function () {
        document.getElementById('calendar-title').innerHTML = `${$('#calendar').fullCalendar('getView').title}`;
    },

    prevOrNext: function () {
        document.getElementById('prev').addEventListener("click", function (e) {
            // move calendario para trás
            $('#calendar').fullCalendar('prev');
            MyCalendar.setTitle(); // atualiza o título
            // var fil = MyCalendar.filtering(MyCalendar.myEvents(), 'title');
            $('#calendar').fullCalendar("removeEvents");
            $('#calendar').fullCalendar("renderEvents", MyCalendar.filterEvents);
        });
        document.getElementById('next').addEventListener("click", function (e) {
            // move o calendário para frente
            $('#calendar').fullCalendar('next');
            MyCalendar.setTitle(); // atualiza o título
            $('#calendar').fullCalendar("removeEvents");
            $('#calendar').fullCalendar("renderEvents", MyCalendar.filterEvents);
        });
    },

    getEvent: function (id) {
        var events = this.myEvents();
        event = null;
        for (var i in events) {
            if (events[i].id === id) {
                event = events[i];
            }
        }
        return event;
    },

    listaEquipe: function (equipe) {
        var s = "";
        for (var i in equipe) {
            s += equipe[i] + ", ";
        }
        if (s.length >= 0) s = s.substr(0, s.lastIndexOf(","));
        return s;
    },

    setDataEventModal: function (id) {
        event = MyCalendar.getEvent(id);
        if (event === null) return false;

        var dataEvent = document.getElementById('dataevent');
        var modal = document.getElementById('modal');
        dataEvent.innerHTML = `
			<p>
				<b>Evento:</b> ${event.title}<br>
				<b>Descrição:</b> ${event.descricao}<br>
				<b>Data:</b> ${moment(event.start).format('DD MMMM YYYY')}<br>
				<b>Equipe:</b> ${MyCalendar.listaEquipe(event.equipe)}
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
        var cal = document.getElementById('calendar');
        cal = cal.children[0];
        var clicked = false;
        var position = 0;
        var touch = false;
        var brushes = []; // pinturas da tela
        var timeini = null;

        // keybord event
        document.addEventListener("keyup", (e) => {
            // esquerda
            if (e.keyCode === 37) {
                $('#calendar').fullCalendar('prev');
                MyCalendar.setTitle();
                $('#calendar').fullCalendar("removeEvents");
                $('#calendar').fullCalendar("renderEvents", MyCalendar.filterEvents);
                // direita
            } else if (e.keyCode === 39) {
                $('#calendar').fullCalendar('next');
                MyCalendar.setTitle();
                $('#calendar').fullCalendar("removeEvents");
                $('#calendar').fullCalendar("renderEvents", MyCalendar.filterEvents);
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
            if (clicked && touch) {
                // moveu para esquerda
                if (e.changedTouches[0].clientX < position) {
                    if ((position - e.changedTouches[0].clientX) > 60) {
                        $('#calendar').fullCalendar('next');
                        MyCalendar.setTitle();
                        $('#calendar').fullCalendar("removeEvents");
                        $('#calendar').fullCalendar("renderEvents", MyCalendar.filterEvents);
                    }
                    // moveu para direita
                } else {
                    if ((e.changedTouches[0].clientX - position) > 60) {
                        $('#calendar').fullCalendar('prev');
                        MyCalendar.setTitle();
                        $('#calendar').fullCalendar("removeEvents");
                        $('#calendar').fullCalendar("renderEvents", MyCalendar.filterEvents);
                    }
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
            if (moment().diff(timeini, "seconds", true) > 1.5) return false;
            if (clicked && touch) {
                var brush = document.createElement("span");
                brush.classList.add("dragPaint");
                brush.style.left = `${e.changedTouches[0].clientX}px`;
                brush.style.top = `${e.changedTouches[0].clientY}px`;
                brush.style.position = "absolute";
                brush.style.zIndex = 1300;
                if (brushes.length <= 15) {
                    brushes.push(brush);
                    document.body.appendChild(brush);
                }
            }
        });
    },

    openDropDown: function (e) {
        var menu = document.getElementById('menuDrop');
        menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
    },
    clickItemMenu: function () {
        var menu = document.getElementById('menuDrop');
        menu.addEventListener("click", (e) => {
            if (e.target.tagName === 'A') {
                if (e.target.name === 'today') return $('#calendar').fullCalendar('gotoDate', moment());
                $('#calendar').fullCalendar('changeView', e.target.name);
                MyCalendar.setTitle();
                $('#calendar').fullCalendar("removeEvents");
                $('#calendar').fullCalendar("renderEvents", MyCalendar.filterEvents);
            }
        });
    },

    goToDate: function (date) {
        var view = $('#calendar').fullCalendar('getView');
        $('#calendar').fullCalendar('changeView', view.name, date);
        MyCalendar.setTitle();
    },

    configDatePicker: function () {
        // start date picker
        $(".form_datetime").datetimepicker({
            format: "dd MM yyyy - hh:ii",
            minView: 2,
            maxView: 4,
            autoclose: true,
            todayBtn: true,
            pickerPosition: "bottom-left",
            language: 'pt-BR'
        });
    },

    clickTitle: function () {
        // document.addEventListener('DOMContentLoaded', () => {
            var title = document.getElementById('calendar-title');
            var datepicker = document.getElementById('datetimepicker');
            document.addEventListener('click', function (e) {
                if (e.target === title) {
                    datepicker.style.display = "block";
                } else {
                    datepicker.style.display = "none";
                }
            });
            $(".form_datetime").datetimepicker()
                .on('changeDate', function (ev) {
                    var date = moment(ev.date).format('YYYY-MM-DD');
                    MyCalendar.goToDate(date);
                    datepicker.style.display = "none";
                });
        // });
    },

    especialCharMask: function (palavra) {
        var com_acento = 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ´`^¨~';
        var sem_acento = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC     ';
        for (l in palavra) {
            for (l2 in com_acento) {
                if (palavra[l] == com_acento[l2]) {
                    palavra = palavra.replace(palavra[l], sem_acento[l2]);
                }
            }
        }
        return palavra;
    },

    // filtrando
    filtering: function (data, field) {
        return {
            temp: [],
            inputValue: '',
            fil: (val) => {
                var f = document.getElementById('filter-calendar');
                var str = MyCalendar.especialCharMask(f.value).toUpperCase();
                return MyCalendar.especialCharMask(val[field]).toUpperCase().indexOf(str) >= 0;
            },
            filter: function () {
                var changes = [];
                changes = data;
                changes = changes.filter(this.fil);
                this.temp.splice(0, this.temp.length);
                for (var i in changes) {
                    this.temp.push(changes[i]);
                }
                MyCalendar.filterEvents = this.temp;
                return this.temp;
            },
            watch: function (callback) {
                Array.observe(this.temp, callback);
            },
            start: function () {
                // document.addEventListener('DOMContentLoaded', () => {
                    var f = document.getElementById('filter-calendar');
                    f.addEventListener('keyup', (e) => {
                        return this.filter();
                    });
                // })
            }
        }
    },

    init: function () {
        MyCalendar.clickTitle();
        MyCalendar.render();
        // criando instancia de filtering
        var fil = MyCalendar.filtering(MyCalendar.myEvents(), 'title');
        // startando
        fil.start();
        // escutando evento de filtro
        fil.watch((changes) => {
            $('#calendar').fullCalendar("removeEvents");
            $('#calendar').fullCalendar("renderEvents", fil.temp);
        });
    }
}



