/*******************************************
		Controller de Home
*******************************************/
var cronogramaCtrl = function ($scope, $rootScope, $location, genericAPI) {
    
        //verifica sessao
        // if(!$rootScope.usuario) {
        //     $location.path('/login');
        //     return false;
        // }
    
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
    
        $scope.despesas = [
            {"descricao":"Tênis", "valor":"90.00", "prestacoes":"5", "datavencimento":"2017-12-05"},
            {"descricao":"Mouse Razor", "valor":"150", "prestacoes":"3", "datavencimento":"2018-01-05"},
            {"descricao":"Carro", "valor":"450", "prestacoes":"25", "datavencimento":"2016-07-01"},
            {"descricao":"Bolsa", "valor":"70", "prestacoes":"1", "datavencimento":"2016-07-08"},
            {"descricao":"Oculos", "valor":"180", "prestacoes":"2", "datavencimento":"2016-07-20"},
            {"descricao":"Notebook", "valor":"2000", "prestacoes":"10", "datavencimento":"2016-07-15"},
            {"descricao":"Meia", "valor":"500", "prestacoes":"7", "datavencimento":"2016-09-15"}
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
    
        $scope.listarDespesaPorUsuario = function () {
            var data = {
                "metodo":"listarPorUsuario",
                "class":"despesa"
            };
            genericAPI.generic(data)
            .then(function successCallback(response) {
                if( response.data.success === true ){
                    $scope.despesas = response.data.data;
                    ordenaDatas( $scope.despesas );
                    montaValorMes();
                }else{
                    console.log( response.data.msg );
                }
            }, function errorCallback(response) {
                //error
            });	
    
        }
        $scope.listarDespesaPorUsuario();
    
        function ordenaDatas (despesas) {
            var datas = despesas;
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
            $scope.despesas = array;
        }
        
        // construindo tabelas de mes
    
        function montaValorMes () {
            // laco de despesas
            for (var x in $scope.despesas) {
                // separo a despesa
                var despesa = $scope.despesas[x];
                // crio um atributo pres(array) na despesa
                despesa.pres = [];
    
                // laco de meses até 8
                // for (var m=0; m<8; m++) {
                for (var m=0; m<$scope.tlmeses; m++) {
                    var day = moment().add(m, "M").date(); // dia atual + 1
                    var month = moment().add(m, "M").month(); // mes atual + 1
                    var year = moment().add(m, "M").year(); // ano atual + 1
                    var data = ''; // variavel data
    
                    // laco de prestacoes da despesa
                    for (var p=0; p<despesa.prestacoes; p++) {
                        var dia = moment(despesa.datavencimento).add(p, "M").date(); // dia da data despesa + index
                        var mes = moment(despesa.datavencimento).add(p, "M").month(); // mes data despesa + index
                        var ano = moment(despesa.datavencimento).add(p, "M").year(); // ano data despesa + index
                        
                        // caso o mes e ano da despesa seja = ao mes e ano atual 
                        if (mes === month && ano === year) {
                            data = {"data": mes+"/"+ano, "valor":despesa.valor};
                            // pegando a prestação atual
                            if (m === 0) { // m = o ( mes atual )
                                despesa.prestacao = (p+1)+"/"+despesa.prestacoes;
                            }
                        }
                    }

                    // var totalprestacao = despesa.parcelas.length;
                    // for (var p=0; p<totalprestacao; p++) {
                    //     var parcela = despesa[p]; // parcela da despesa

                    //     var dia = moment(parcela.datavencimento).date(); // dia da data despesa
                    //     var mes = moment(parcela.datavencimento).month(); // mes data despesa
                    //     var ano = moment(parcela.datavencimento).year(); // ano data despesa
                        
                    //     // caso o mes e ano da despesa seja = ao mes e ano atual 
                    //     if (mes === month && ano === year) {
                    //         data = {"data": mes+"/"+ano, "valor":despesa[p].valor};
                    //         // pegando a prestação atual
                    //         if (m === 0) { // m = o ( mes atual )
                    //             despesa.prestacao = (p+1)+"/"+despesa.prestacoes;
                    //         }
                    //     }
                    // }
    
                    if (!despesa.prestacao) {
                        // se ano = atual mas mes menor ou ano menor
                        if ( (ano === year && mes < month) || (ano < year) ) {
                            despesa.prestacao = despesa.prestacoes+"/"+despesa.prestacoes;
                        }else{
                            despesa.prestacao = "0/"+despesa.prestacoes;
                        }
                    }
    
                    if ( data === '' ) {
                        despesa.pres.push({"data": "00/0000", "valor":"xxxx", "color":"background:#f0f5f5; color:#ccc;", "icon":"fa-trophyx"});
                    }else{
                        despesa.pres.push(data);
                        $scope.totais[m].valor = $scope.totais[m].valor +  parseInt(despesa.valor);
                        
                        if($scope.totais[m-1] != undefined && $scope.totais[m].valor < $scope.totais[m-1].valor) {
                            $scope.totais[m].icon = "fa-arrow-down";
                        }else if($scope.totais[m-1] != undefined && $scope.totais[m].valor > $scope.totais[m-1].valor) {
                            $scope.totais[m].icon = "fa-arrow-up";
                        }else{
                            $scope.totais[m].icon = "fa-arrow-right";
                        }
                    }
                }
    
                $scope.totalgeral = $scope.totalgeral + parseFloat(despesa.valor);
            }
        }
    
        $scope.changeTlMeses = function () {
            $scope.meses = [];
            carregaMeses();
            totaisValor();
            ordenaDatas( $scope.despesas );
            montaValorMes();
        };
        $scope.changeTlMeses();
    }
    
    
    angular
        .module('cfp')
        .controller('cronogramaCtrl', cronogramaCtrl);