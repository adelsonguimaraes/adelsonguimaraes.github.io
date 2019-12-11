const $agscope = [];
const innerHtmlOrigem =  document.documentElement.innerHTML;

function addScope(model) {
    $agscope.push();
}

function extractModels() {
    // capturando o HTML inteiro
    var innerHtml = innerHtmlOrigem;
    // regex para encontrar {{...}} chaves que tenham algum conteúdo
    var regexChaves = /\{{2}.*\}{2}/g;

    while (result = regexChaves.exec(innerHtml)) {
        // convertendo as {{}} em '';
        var content = result[0].replace(/[\}\{]/g, '').trim();
        
        // limpando strings isoladas por 'aspas'
        var regexStrings = /['][a-zA-z\s]+[']/g;
        var strings = regexStrings.exec(content);
        content = content.replace(regexStrings, '');
        // var response = false;

        // regex para encontrar conteúdo
        var regexModels = /[a-z-A-Z\S]+[.a-z-A-Z]/g;
        var temp = '';
        while (result2 = regexModels.exec(content)) {
            // getando apenas as chaves das models
            var modelKeys = Object.keys($agscope);
            // quebrando o conteúdo das chaves por ponto(.)
            var split = result2[0].split('.');
            // getando a posição da model caso exista
            var indexModel = modelKeys.indexOf(split[0]);

            // verficando se existe a model
            if (indexModel >= 0) {
                // pegando o nome da model encontrada
                var key = modelKeys[indexModel];
                temp = '$agscope.' + key;
                for (var i in split) {
                    if (i > 0) temp += '.' + split[i];
                }
                // innerHtml = innerHtml.replace(result2[0], eval(temp));
                // document.documentElement.innerHTML = innerHtml;
                // response = true;
            }
        }
        
        innerHtml = innerHtml.replace(result[0], eval(temp));
        document.documentElement.innerHTML = innerHtml.replace(/[\}\{]/g, '');
    }
}


function convertAgRepeat () {
    // document.addEventListener('DOMContentLoaded', function (e) {
        // capturando o HTML inteiro
        var agRepeatAll = document.querySelectorAll('[ag-repeat]');
        for (var i in agRepeatAll) {
            var inner = '';
            var element = agRepeatAll[i];
            for (var a in element.attributes) {
                var atribute = element.attributes[a];
                if (atribute.name === 'ag-repeat') {
                    var split = atribute.value.trim().split(" ");
                    if (split.length > 3) throw new Error('O conteúdo para ag-repeat não segue o padrão "item in itens"');
                    if (split[1] !== 'in') throw new Error('Não foi encontado o perador IN do padrão "item in itens"');
                    var modelKeys = Object.keys($agscope);
                    var indexModel = modelKeys.indexOf(split[2]);
                    var key = modelKeys[indexModel];
                    if (!Array.isArray($agscope[key])) throw new Error('O valor de $agscope.'+key+' não é um Array');
                    for(var p in $agscope[key]) {
                        var prop = $agscope[key][p];
                        if (typeof ($agscope[key][p]) === 'object') prop = JSON.stringify($agscope[key][p]);
                        inner += element.innerHTML.replace(split[0], prop);
                    }
                }
            }
            element.innerHTML = inner.replace(/[\}\{]/g, '');
            extractModels();
        }
    // });
}

function convertAgSrc () {
    // document.addEventListener('DOMContentLoaded', function (e) {
        var agSrcAll = document.querySelectorAll('[ag-src]'); 
        for (var i in agSrcAll) {
            var element = agSrcAll[i];
            for (var a in element.attributes) {
                var atribute = element.attributes[a];
                if (atribute.name === 'ag-src') {
                    if (atribute.value.indexOf('{')>=0) return false;
                    element.src = atribute.value;
                }
            }
        }
    // });
}


function apllyAgShow () {
    // document.addEventListener('DOMContentLoaded', function (e) {
        var agIfAll = document.querySelectorAll('[ag-show]'); 
        for (var i in agIfAll) {
            var element = agIfAll[i];
            for (var a in element.attributes) {
                var atribute = element.attributes[a];
                if (atribute.name === 'ag-show') {
                    var modelKeys = Object.keys($agscope);
                    var indexModel = modelKeys.indexOf(atribute.value);
                    var key = modelKeys[indexModel];
                    if (key!==undefined) {
                        if (typeof($agscope[key]) !== 'boolean') throw new Error('O valor de $agscope.'+key+' não é um Boleano válido');
                        if ($agscope[key]) {
                            element.style.display = 'block';
                        }else{
                            element.style.display = 'none';
                        }
                    }
                }
            }
        }
    // });
}

function agInit() {
    Array.observe($agscope, function (e) {
        convertAgRepeat();
        convertAgSrc();
        apllyAgShow();
    });
}