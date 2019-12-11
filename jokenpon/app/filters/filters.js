/*
	Filtros
*/


function string30() {
    return function (input) {
        input = input.substring(0, 30);
        return input;
    }
};

function nomeProprio() {
    return function (input) {
        if (!input) return input;
        var listaNomes = input.split(" ");
        var listaNomeFormat = listaNomes.map(function (nome) {
        	return nome.charAt(0).toUpperCase() + nome.substring(1).toLowerCase();
        });
        return listaNomeFormat.join(" ");
    }
};

function cpf() {
    return function (input) {
        if (!input) return 'NÃO INFORMADO';
        var cpf = input.substring(0, 3) + '.' + input.substring(3, 6) + '.' + input.substring(6, 9) + '-' + input.substring(9);
        return cpf;
    }
};

function cnpj() {
    return function (input) {
        if (!input) return 'NÃO INFORMADO';
        var cnpj = input.substring(0, 2) + '.' + input.substring(2, 5) + '.' + input.substring(5, 8) + '/' + input.substring(8, 12) + '-' + input.substring(12);
        return cnpj;
    }
};

function cep() {
    return function (input) {
        if (!input) return input;
        var cep = input.substring(0, 5) + '-' + input.substring(5);
        return cep;
    }
};

function tel() {
    return function (input) {
        if (!input) return input;
        var tel = '(' + input.substring(0, 2) + ') ' + input.substring(2, 6) + '-' + input.substring(6);
        return tel;
    }
};

function fax() {
    return function (input) {
        if (!input) return input;
        var fax = '(' + input.substring(0, 2) + ') ' + input.substring(2, 6) + '-' + input.substring(6);
        return fax;
    }
};

function cel() {
    return function (input) {
        if (!input) return 'NÃO INFORMADO';
        var cel = '(' + input.substring(0, 2) + ') ' + input.substring(2, 7) + '-' + input.substring(7);
        return cel;
    }
};


function hora ($timeout) {
    return function (input) {
        if (!input || typeof (input) == 'object') return input;
        var data = moment(input).format('HH:mm:ss');
        // var data = input.substring(8, 10) + '/' + input.substring(5, 7) + '/' + input.substring(0, 4) + input.substring(10);
        return data;
    }
}

function data ($timeout) {
    return function (input) {
        if(!input || typeof(input) == 'object') return input;
        var data = moment(input).format('DD/MM/YYYY');
        // var data = input.substring(8, 10) + '/' + input.substring(5, 7) + '/' + input.substring(0, 4) + input.substring(10);
        return data;
    }
}

function datahora ($timeout) {
    return function (input) {
        if(!input || typeof(input) == 'object') return input;
        var data = moment(input).format('DD/MM/YYYY HH:mm:ss');
        // var data = input.substring(8, 10) + '/' + input.substring(5, 7) + '/' + input.substring(0, 4) + input.substring(10);
        return data;
    }
}

function moeda () {
    return function (input) {
        if(!input || typeof(input) === 'object') return input;
        return formataValor(input);
    }
}
function email($timeout) {
    return function (input) {
        if (!input) return 'NÃO INFORMADO';
        return input;
    }
};
function real() {
    return function (input) {
        return data;
    }
}
function cliente() {
    return function (input) {
        if (input === undefined) return input;
        if (input.indexOf('INDETERMINADO') >=0) {
            input = 'Indeterminado';
        }
        return input;
    }
}

function nomeMembro() {
    return function (input) {
        var split = input.split(' ');
        input = split[0];
        input += ' ' + ((split.length > 2) ? split[2] : split[1]);
        return input;
    }
}

// filtros para timeline

function aplicandoQuebraLinha () {
    return function (input) {
        if (!input) return input;
        return MarkText.aplicandoQuebraLinha(input);
    }
}

function aplicandoNegrito  () {
    return function (input) {
        if (!input) return input;
        return MarkText.aplicandoNegrito(input);
    }
}
function aplicandoItalico () {
    return function (input) {
        if (!input) return input;
        return MarkText.aplicandoItalico(input);
    }
}
function aplicandoStrike() {
    return function (input) {
        if (!input) return input;
        return MarkText.aplicandoStrike(input);
    }
}
function aplicandoSublinhado() {
    return function (input) {
        if (!input) return input;
        return MarkText.aplicandoSublinhado(input);
    }
}
function aplicandoHighlighter() {
    return function (input) {
        if (!input) return input;
        return MarkText.aplicandoHighlighter(input);
    }
}
function aplicandoH1() {
    return function (input) {
        if (!input) return input;
        return MarkText.aplicandoH1(input);
    }
}
function indefinido () {
    return function (input) {
        if (!input) return 'Indefinido';
        return input;
    }
}

// incubus
function cargo () {
    return function (input) {
        if (!input) return 'Indefinido';
        // if (input === 'LIDER') return 'Supervisor(a) de Vendas';
        // if (input === 'VENDEDOR') return 'Consultor(a) de Vendas';
        return 'Consultor(a) de Vendas';
    }
}

angular
    .module(module)
    .filter('string30', string30)
    .filter('nomeProprio', nomeProprio)
    .filter('cpf', cpf)
    .filter('cnpj', cnpj)
    .filter('cep', cep)
    .filter('tel', tel)
    .filter('fax', fax)
    .filter('cel', cel)
    .filter('hora', hora)
    .filter('data', data)
    .filter('datahora', datahora)
    .filter('moeda', moeda)
    .filter('email', email)
    .filter('real', real)
    .filter('cliente', cliente)
    .filter('nomeMembro', nomeMembro)
    .filter('indefinido', indefinido)
    // filtros timeline
    .filter('aplicandoNegrito', aplicandoNegrito)
    .filter('aplicandoItalico', aplicandoItalico)
    .filter('aplicandoStrike', aplicandoStrike)
    .filter('aplicandoSublinhado', aplicandoSublinhado)
    .filter('aplicandoHighlighter', aplicandoHighlighter)
    .filter('aplicandoH1', aplicandoH1)
    .filter('aplicandoQuebraLinha', aplicandoQuebraLinha)
    .filter('cargo', cargo);