/*******************************************
		Controller de Home
*******************************************/
var cronogramaCtrl = function ($scope, $rootScope, $location, genericAPI) {
    
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
            {"descricao":"Tênis", "valor":"90.00", "parcela":"5", "datavencimento":"2017-12-05"},
            {"descricao":"Mouse Razor", "valor":"150", "parcela":"3", "datavencimento":"2018-01-05"},
            {"descricao":"Carro", "valor":"450", "parcela":"25", "datavencimento":"2016-07-01"},
            {"descricao":"Bolsa", "valor":"70", "parcela":"1", "datavencimento":"2016-07-08"},
            {"descricao":"Oculos", "valor":"180", "parcela":"2", "datavencimento":"2016-07-20"},
            {"descricao":"Notebook", "valor":"2000", "parcela":"10", "datavencimento":"2016-07-15"},
            {"descricao":"Meia", "valor":"500", "parcela":"7", "datavencimento":"2016-09-15"}
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
            $scope.totais = [];
            $scope.totalgeral = 0;
            for ( var i=0; i<$scope.tlmeses; i++ ) {
                $scope.totais.push({"valor":0});
            }
        };
        totaisValor();
    
        $scope.listarContaPorUsuario = function () {
            var data = {
                "metodo":"listarPorUsuario",
                "class":"conta"
            };
            genericAPI.generic(data)
            .then(function successCallback(response) {
                if( response.data.success === true ){
                    $scope.contas = response.data.data;
                    ordenaDatas( $scope.contas );
                    montaValorMes();
                }else{
                    console.log( response.data.msg );
                }
            }, function errorCallback(response) {
                //error
            });	
    
        }
        $scope.listarContaPorUsuario();
    
        function ordenaDatas (contas) {
            var datas = contas;
            var array = [];
            while (datas.length > 0) {
                var num = {"datavencimento":"9999/12/31"};
                var pos = 0;
                for (var x in datas) {
                    if (moment(datas[x].datavencimento).date() < moment(num.datavencimento).date()) {
                        num = datas[x];
                        num.diavencimento = num.datavencimento.substr(8,2);
                        pos = x;
                    }
                }
                array.push(num);
                datas.splice( pos, 1 );
            }
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

                    // laco de parcelas da conta
                    for (var p=0; p<conta.parcela; p++) {
                        var dia = moment(conta.datavencimento).add(p, "M").date(); // dia da data conta + index
                        var mes = moment(conta.datavencimento).add(p, "M").month(); // mes data conta + index
                        var ano = moment(conta.datavencimento).add(p, "M").year(); // ano data conta + index
                        
                        // caso o mes e ano da conta seja = ao mes e ano atual 
                        if (mes === month && ano === year) {
                            data = {"data": mes+"/"+ano, "valor":conta.valor};
                            // pegando a prestação atual
                            if (m === 0) { // m = o ( mes atual )
                                var pa = ((p+1)<10)?'0'+(p+1):(p+1);
                                conta.parcelaAtual = pa+"/"+totalParcela;
                            }
                        }
                    }

                    if (!conta.parcelaAtual) {
                        // se ano = atual mas mes menor ou ano menor
                        if ( (ano === year && mes < month) || (ano < year) ) {
                            conta.parcelaAtual = totalParcela+"/"+totalParcela;
                        }else{
                            conta.parcelaAtual = "00/"+totalParcela;
                        }
                    }
    
                    if ( data === '' ) {
                        conta.pres.push({"data": "00/0000", "valor":"xxxx", "color":"background:#f0f5f5; color:#ccc;", "icon":"fa-trophyx"});
                    }else{
                        conta.pres.push(data);
                        $scope.totais[m].valor += parseInt(conta.valor);
                    }
                }
    
                $scope.totalgeral += parseFloat(conta.valor);
            }
            setUpDownMes();
        }
    
        function setUpDownMes () {
            for (var m in $scope.totais) {
                if($scope.totais[m-1] != undefined && $scope.totais[m].valor < $scope.totais[m-1].valor) {
                    $scope.totais[m].icon = "fa-arrow-down";
                }else if($scope.totais[m-1] != undefined && $scope.totais[m].valor > $scope.totais[m-1].valor) {
                    $scope.totais[m].icon = "fa-arrow-up";
                }else{
                    $scope.totais[m].icon = "fa-arrow-right";
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
    }
    
    
    angular
        .module('cfp')
        .controller('cronogramaCtrl', cronogramaCtrl);