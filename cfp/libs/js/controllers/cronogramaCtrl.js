/*******************************************
		Controller de Home
*******************************************/
var cronogramaCtrl = function ($scope, $rootScope, $location, genericAPI, $timeout) {
        //verifica sessao
        if(!$rootScope.usuario) {
            $location.path('/login');
            return false;
        }
    
        var meses = [
            {"nome":"Janeiro",	"sigla":"JAN", "ano":"0000"},
            {"nome":"Fevereiro",	"sigla":"FEV", "ano":"0000"},
            {"nome":"Março", 		"sigla":"MAR", "ano":"0000"},
            {"nome":"Abril", 		"sigla":"ABRIL", "ano":"0000"},
            {"nome":"Maio",	 	"sigla":"MAIO", "ano":"0000"},
            {"nome":"Junho", 		"sigla":"JUN", "ano":"0000"},
            {"nome":"Julho", 		"sigla":"JUL", "ano":"0000"},
            {"nome":"Agosto", 	"sigla":"AGO", "ano":"0000"},
            {"nome":"Setembro", 	"sigla":"SET", "ano":"0000"},
            {"nome":"Outubro", 	"sigla":"OUT", "ano":"0000"},
            {"nome":"Novembro", 	"sigla":"NOV", "ano":"0000"},
            {"nome":"Dezembro", 	"sigla":"DEZ", "ano":"0000"}
        ];
    
        $scope.contas = [
            // {"descricao":"Tênis", "valor":"90.00", "parcela":"5", "datavencimento":"2017-12-05"},
            // {"descricao":"Mouse Razor", "valor":"150", "parcela":"3", "datavencimento":"2018-01-05"},
            // {"descricao":"Carro", "valor":"450", "parcela":"25", "datavencimento":"2016-07-01"},
            // {"descricao":"Bolsa", "valor":"70", "parcela":"1", "datavencimento":"2016-07-08"},
            // {"descricao":"Oculos", "valor":"180", "parcela":"2", "datavencimento":"2016-07-20"},
            // {"descricao":"Notebook", "valor":"2000", "parcela":"10", "datavencimento":"2016-07-15"},
            // {"descricao":"Meia", "valor":"500", "parcela":"7", "datavencimento":"2018-01-31"}
        ];

        $scope.periodos = [
            '3','4','5','6','7','8','9','10','11','12'
        ];
    
        $scope.tlmeses = '3';
        function carregaMeses () {
            $scope.meses = [];
    
            var now = new Date(); // pegamos a data atual
            var index = now.getMonth(); // retiramos o indicador do mes da data
            var total = index + parseInt($scope.tlmeses); // mes da data + quantidade de meses selecionada
            var ano = moment(now).year(); // pegando o ano da data
            var count = 0;

            // equanto index do mês atual for menor que a quantidade de meses para visualizar conta
            while (index < 12) { //12
                meses[index].ano = ano; // dentro de meses a posição ano recebe ano
                if ($scope.meses.length < $scope.tlmeses) {
                    $scope.meses.push(meses[index]); // o escopo meses recebe cada mês
                }
                index++;
            }
            var resto = total - index; // calculamos o total de meses restantes
            index = 0;
            // enquanto index for menor que o resto
            while (index < resto) {
                meses[index].ano = ano+1; // meses conta acrescendo de 1 ano
                if ($scope.meses.length < $scope.tlmeses) {
                    $scope.meses.push(meses[index]); // o escopo meses recebe cada mês
                }
                index++;
            }
        }
        carregaMeses ();
    
        function totaisValor () {
            $scope.totalMesDespesa = []; // total mensal da despesa
            $scope.totalMesRecebimento = []; // total mensal do recebimento
            $scope.totalMesSaldo = [];
            $scope.totalDespesa = 0; // total geral da despesa
            $scope.totalRecebimento = 0; // total geral do recebimento
            $scope.totalSaldo = 0;
            for ( var i=0; i<$scope.tlmeses; i++ ) {
                $scope.totalMesDespesa.push({"valor":0});
                $scope.totalMesRecebimento.push({"valor":0});
                $scope.totalMesSaldo.push({"valor":0});
            }
        };
        totaisValor();
    
        $scope.listarContasAtivasPorUsuario = function () {
            $rootScope.startLoad();
            // listar localmente
            contaDAO.listarContasAtivasPorUsuario($rootScope.usuario.idusuario).then(response => {
                $timeout(() => {
                    if (response.success) {
                        $scope.contas = response.data;
                        ordenaDatas( $scope.contas );
                        montaValorMes();
                        $rootScope.stopLoad();
                        // $scope.$apply();
                    };
                    if ($scope.contas.length <= 0) {
                        // verificar se há conectividade
                        if (!$rootScope.onLine) return false;
                        $rootScope.startLoad();
                        // lista nuvem
                        var data = {
                            "metodo":"listarContasPorUsuario",
                            "class":"conta"
                        };
                        genericAPI.generic(data)
                        .then(function successCallback(response) {
                            if( response.data.success === true ){
                                $scope.contas = response.data.data;
                                ordenaDatas( $scope.contas );
                                montaValorMes();
                                $rootScope.stopLoad();
                                // $scope.$apply();
                            }else{
                                console.log( response.data.msg );
                            }
                        }, function errorCallback(response) {
                            //error
                        });	
                    }
                }, 0);
            });
        }
        $scope.listarContasAtivasPorUsuario();
    
        /*
            Está função ordena as contas por data
        */
        function ordenaDatas (contas) {
            var datas = contas; // copiamos o array de contas para uma segunda variável
            var array = []; // criamos um array temporário pra orgranizar as contas por ordem
            
            // o laco repetirá enquanto data for > 0
            while (datas.length > 0) { 
                // var num = {"datavencimento":"9999/12/31"}; // startamos a variável NUM com um valor alto
                var num = {'diavencimento':'9999'};
                var pos = 0; // startamos a variável pos com 0
                
                // criamos um laco de data para varrer a estrutura comparando as datas
                for (var x in datas) {
                    // verificamos se a data atual é < que a antiga data se sim a data nova subistitui a antiga
                    // na variável NUM, repetiremos até finalizar o laço
                    // if (moment(datas[x].datavencimento).valueOf() < moment(num.datavencimento).valueOf()) {
                    if (moment(datas[x].datavencimento).format('DD') < num.diavencimento) {
                        num = datas[x]; // substituindo NUM com o valor da conta menor
                        num.diavencimento = moment(num.datavencimento).format('DD'); // adicionando dia do vencimento a num
                        pos = x; // passando a posição do item no array para a variável pos
                    }
                }
                
                array.push(num); // adicionando o item de menor data encontrado ao array temporário
                datas.splice( pos, 1 ); // deletando o item do array datas para que ele não seja mais comparado, repete-se até zerar o array
            }
            // ao finalizar repassamos array para $scope.contas
            $scope.contas = array;
        }
        
        // construindo tabelas de mes
    
        function montaValorMes () {
            // laco de contas
            for (var x in $scope.contas) {
                // separo a despesa
                var conta = $scope.contas[x];
                // crio um atributo pres(array) na conta
                conta.pres = [];
    
                // laco de meses até 8
                // for (var m=0; m<8; m++) {
                for (var m=0; m<$scope.tlmeses; m++) {
                    var day = moment().add(m, "M").date(); // dia atual + 1
                    var month = moment().add(m, "M").month(); // mes atual + 1
                    var year = moment().add(m, "M").year(); // ano atual + 1
                    var data = ''; // variavel data
    
                    var totalParcela = (conta.parcela<10) ? '0'+conta.parcela : conta.parcela;
                    var valorParcela = (conta.valor/conta.parcela).toFixed(2);
                    var contaparcela = conta.parcela;

                    // se as parcelas forem indeterminadas
                    if (+conta.parcela === 0) {
                        totalParcela = 'IND';
                        valorParcela = conta.valor;
                        contaparcela = 12;
                    }

                    
                    // if (totalParcela === undefined) {
                    //     console.log(conta);
                    // }

                    // laco de parcelas da conta
                    for (var p=0; p<contaparcela; p++) {
                        var dia = moment(conta.datavencimento).add(p, "M").date(); // dia da data conta + index
                        var mes = moment(conta.datavencimento).add(p, "M").month(); // mes data conta + index
                        var ano = moment(conta.datavencimento).add(p, "M").year(); // ano data conta + index
                        
                        // console.log(dia + ' _ ' + mes + ' _ ' + ano);

                        // caso o mes e ano da conta seja = ao mes e ano atual 
                        if (mes === month && ano === year) {
                            if (conta.tipo === 'ARECEBER') {
                                data = {"data": mes+"/"+ano, "valor":valorParcela, "icon":"fa fa-plus", "ngClass":"entrada"};//conta.valor};
                            }else{
                                data = {"data": mes+"/"+ano, "valor":valorParcela, "icon":"fa fa-minus", "ngClass":"saida"};//conta.valor};
                            }
                            // pegando a prestação atual
                            if (m === 0) { // m = o ( mes atual )
                                var pa = ((p+1)<10)?'0'+(p+1):(p+1);
                                // indeterminado
                                if (+conta.parcela === 0) {
                                    conta.parcelaAtual = totalParcela;
                                // com parcelas
                                }else{
                                    conta.parcelaAtual = pa+"/"+totalParcela;
                                }
                            }
                        }
                    }

                    if (!conta.parcelaAtual) {
                        // se ano = atual mas mes menor ou ano menor
                        if ( (ano === year && mes < month) || (ano < year) ) {
                            if (+conta.parcela === 0) {
                                conta.parcelaAtual = totalParcela;
                            }else{
                                conta.parcelaAtual = totalParcela+"/"+totalParcela;
                            }
                        }else{
                            // if (+conta.parcela === 0) {
                            //     conta.parcelaAtual = totalParcela;
                            // }else{
                                conta.parcelaAtual = "00/"+totalParcela;
                            // }
                        }
                    }
    
                    if ( data === '' ) {
                        conta.pres.push({"data": "00/0000", "valor":"xxxx", "ngClass":"neutro", "icon":"fa-trophyx"});
                    }else{
                        conta.pres.push(data);
                        // calculando o total mensal
                        if (conta.tipo === 'APAGAR') {
                            $scope.totalMesDespesa[m].valor = (+$scope.totalMesDespesa[m].valor + +valorParcela).toFixed(2);
                        }else{
                            $scope.totalMesRecebimento[m].valor = (+$scope.totalMesRecebimento[m].valor + +valorParcela).toFixed(2);
                        }
                        $scope.totalMesSaldo[m].valor = (+$scope.totalMesRecebimento[m].valor + -$scope.totalMesDespesa[m].valor).toFixed(2);

                    }
                }
                
                if (conta.tipo === 'APAGAR') {
                    $scope.totalDespesa = (+$scope.totalDespesa + +conta.valor).toFixed(2);
                }else{
                    $scope.totalRecebimento = (+$scope.totalRecebimento + +conta.valor).toFixed(2);
                }
                
                $scope.totalSaldo = (+$scope.totalRecebimento - +$scope.totalDespesa).toFixed(2);
            }
            setUpDownMes();
        }
    
        function setUpDownMes () {
            // despesas
            for (var m in $scope.totalMesDespesa) {
                if($scope.totalMesDespesa[m-1] != undefined && $scope.totalMesDespesa[m].valor < $scope.totalMesDespesa[m-1].valor) {
                    $scope.totalMesDespesa[m].icon = "fa-arrow-down";
                }else if($scope.totalMesDespesa[m-1] != undefined && $scope.totalMesDespesa[m].valor > $scope.totalMesDespesa[m-1].valor) {
                    $scope.totalMesDespesa[m].icon = "fa-arrow-up";
                }else{
                    $scope.totalMesDespesa[m].icon = "fa-arrow-right";
                }
            }
            // recebimentos
            for (var m in $scope.totalMesRecebimento) {
                if($scope.totalMesRecebimento[m-1] != undefined && $scope.totalMesRecebimento[m].valor < $scope.totalMesRecebimento[m-1].valor) {
                    $scope.totalMesRecebimento[m].icon = "fa-arrow-down";
                }else if($scope.totalMesRecebimento[m-1] != undefined && $scope.totalMesRecebimento[m].valor > $scope.totalMesRecebimento[m-1].valor) {
                    $scope.totalMesRecebimento[m].icon = "fa-arrow-up";
                }else{
                    $scope.totalMesRecebimento[m].icon = "fa-arrow-right";
                }
            }
            // saldos
            for (var m in $scope.totalMesSaldo) {
                if(+$scope.totalMesSaldo[m].valor === 0) {
                    $scope.totalMesSaldo[m].icon = "";
                    $scope.totalMesSaldo[m].ngClass = "positivo";
                }else if(+$scope.totalMesSaldo[m].valor > 0) {
                    $scope.totalMesSaldo[m].icon = "fa fa-star-o";
                    $scope.totalMesSaldo[m].ngClass = "positivo";
                }else{
                    $scope.totalMesSaldo[m].icon = "fa fa-exclamation-circle";
                    $scope.totalMesSaldo[m].ngClass = "negativo";
                }
            }
        }

        $scope.changeTlMeses = function () {
            $scope.meses = [];
            carregaMeses();
            totaisValor();
            ordenaDatas( $scope.contas );
            montaValorMes();
        };
        $scope.changeTlMeses();

        setTimeout(()=>{
            setActivatedMenu(document.getElementById('menu_cronograma'));
        }, 100);
    }
    
    
    angular
        .module('cfp')
        .controller('cronogramaCtrl', cronogramaCtrl);