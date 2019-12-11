function formataValor ( val ) {
    
   if (val == undefined) return 'R$ 0.00';

    val = this.trataValor( val ); // limita a 30 caracteres

    var polaridade = (val.toString().indexOf('-') === -1) ? '' : '-';

    /*
       Se valor estiver com Mascará
       retiramos a mascará
    */
    // if ( val.toString().indexOf('R$') >= 0 ) {
    //    val = this.desformataValor(val);
    // }

    /*
       Se o valor estiver em um formato diferente do decimal americano
       retornamos valor inválido
    */
    if ( val.toString().indexOf(',') >= 0 || val.toString().indexOf('.') === -1 ) {
       sgaf.util.Util.showErrorMsg("Formato Inválido! " + val + " Formato correto deve ser (999.99)");
       return 'Formato Inválido';
    }

    /*
       Retirando caracteres especiais
    */
    val = val.toString().replace(/\D/g, ""); 

    /*
       pegando o tamanho do valor total
    */
    var valTam = val.length;
    /*
       Recebe os inteiros do valor, números antes da virgula
    */
    var temp = val.substr(0, valTam-2);

    /*
       retirando os zeros a esquerda
    */
    var x = '';
    var c = 0;
    for (var i in temp) {
       if (temp[i] != '0') {
          c++;
       }
       if (c>0){
          x += temp[i];
       }
    }
    temp = x;

    /*
       Se o valor sem zeros a esquerda for vazio
       adicionamos um zero
    */
    temp = ( temp !== '' ) ? temp : '0';
    
    /*
       descobre o tamanho de temp (numeros inteiros)
    */
    var t = temp.toString().length;
    var count = 0;
    var r = '';

    /*
       Adiciona os os pontos entre as casas de centena, milhar, milhão...
    */
    for ( var i=t; i>0; i-- ) {
       var iNeg = i-1;
       count ++;
       if (count>3) {
          r = '.' + r;
          count=1;
       }
       // console.log( temp.toString().substr(iNeg, 1) );
       r = temp.toString().substr(iNeg, 1) + r;
    }

    // console.log(r);

    /*
       adiciona a virgula que separa a casa decimal
    */
    r += ',';

    /*
       Verifica se as casas após a virgula formam um numero maior que 10
       se sim junta ao r, se não adiciona 0 a frente
    */
    r += (parseInt(val.substr(-2)) < 10) ? '0' + parseInt(val.substr(-2)) : parseInt(val.substr(-2));

    /*
       Adiciona a moeda Real
       e polaridade (Positivo/Negativo)
    */
    r = 'R$ ' + polaridade + r;

    return r;
 };

 function desformataValor ( val ) {
    /*
       retira todos os caracteres
    */
    val = val.toString().replace(/\D/g, "");
    var t = val.length;
    
    /*
       Formata para 9999.99
    */
    val = val.substr(0, t-2) + '.' + val.substr(-2);

    return val;
 };

 function trataValor ( val ) {
    
    /*
       converte o valor para string
    */
    val = val.toString().substr(-30);

    /*
       Verifica polaridade do valor
    */
    var polaridade = (val.toString().indexOf('-') === -1) ? '' : '-';

    /*
       Verifica se o valor está usando mascará de moeda
    */
    if ( val.toString().indexOf('R$') >= 0 ) {
       val = this.desformataValor(val);
    }

    /*
       Verificando se há ponto separador de decimais
    */
    if ( val.indexOf('.') >=0 ) {
       var posPonto =  val.substr(val.indexOf('.')+1);
       if ( posPonto.length < 2 )  { 
          posPonto += '0';
       }else { 
          posPonto = (parseInt(posPonto)<10) ? '0'+parseInt(posPonto) : parseInt(posPonto);
       }
       val = val.substr(0, val.indexOf('.')) + '.' + posPonto;
    }else{
       val = val + '.00';              
    }

    val = polaridade + val;

    return val;
 };