let searchs = [
  'Contrato',
  'Contrato Consulta',
  'Cliente',
  'Boleto',
  'NotaFiscal',
  'Serviço',
  'Template',
  'Projeto'
];

// pegando o body
let body = document.querySelector('body');
// pegando a div search
let divSearch = document.getElementById('search');

// filtro
let fil = function (val) {
  var filter = divSearch.querySelector('input').value.toUpperCase();
  return val.toUpperCase().indexOf(filter)>-1;
}

// pegando o input dentro da div search
// adicionando e capturando o evendo keyup
divSearch.querySelector('input').addEventListener('keyup', function (e) {
  while (divSearch.querySelector('ul').firstChild) {
     divSearch.querySelector('ul').removeChild(divSearch.querySelector('ul').firstChild);
  }
  let ss = searchs.filter(fil);
  for ( var s in ss) {
    let li = document.createElement('li');
    let a = document.createElement('li');
    a.innerHTML = ss[s];
    li.appendChild(a);
    
    divSearch.querySelector('ul').appendChild(li);
  }
});

// pegando da pagina para chave especial de CTRL + ALT + '+'
// exibindo o campo de busca escondido
document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.altKey && e.key != 'AltGraph' ) {
    if ( e.key === '§' ) {
        divSearch.style.display = 'block';
        divSearch.querySelector('input').focus();
        setTimeout(
          function () {
            divSearch.querySelector('input').value = '';
            while (divSearch.querySelector('ul').firstChild) {
               divSearch.querySelector('ul').removeChild(divSearch.querySelector('ul').firstChild);
            }
            for ( var s in searchs) {
              let li = document.createElement('li');
              let a = document.createElement('a');
              a.innerHTML = searchs[s];
              li.appendChild(a);
              divSearch.querySelector('ul').appendChild(li);
            }
          },
          20
         );
    }
  }
  // verificando se ESC foi acionado
  // esconde o campo de busca
  if ( e.key.toLowerCase() === 'escape' ) {
    divSearch.style.display = 'none';
  }
});

// pegando o click do mouse no documento
// caso não seja um click dendo da div search
// a div é escondida novamente
document.addEventListener("click", function (e) {
  if (e.srcElement.id != 'search' && e.srcElement.parentNode.id != 'search') {
//     divSearch.style.display = 'none';
  }
});
