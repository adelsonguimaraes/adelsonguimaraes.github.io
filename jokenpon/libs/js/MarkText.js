const MarkText = {
    aplicandoQuebraLinha: function (text) {
        /*
            Criando uma nova Regex
            1. [*] - * no incicio;
            2. \S - Seguido de qualquer caracter, menos WhiteSpaces(espaço, tab..);
            3. .*? - Nenhum ou Mais caracteres de qualquer tipo, não obrigatorio;
            4. \S - Qualquer caracter, menos WhiteSpaces(espaço, tab..);
            5. [*] - * no final.
            6. 'g' - global, pode se repetir durante a string.
        */
        var objRegex = new RegExp(/\r?\n/, 'g');
        var s = text; // variavel temporária

        // laço dos Matchs da Regex no texto
        while (result = objRegex.exec(text)) {
            // subistituindo * inicial por <b> e final por </b>
            var str = text.substr(result.index + 1, result[0].length - 2) + '</br>';
            s = s.replace(result[0], str); // subistituindo no texto a mundança
        }
        return s;
    },

    aplicandoNegrito: function (text) {
        /*
            Criando uma nova Regex
            1. [*] - * no incicio;
            2. \S - Seguido de qualquer caracter, menos WhiteSpaces(espaço, tab..);
            3. .*? - Nenhum ou Mais caracteres de qualquer tipo, não obrigatorio;
            4. \S - Qualquer caracter, menos WhiteSpaces(espaço, tab..);
            5. [*] - * no final.
            6. 'g' - global, pode se repetir durante a string.
        */
        var objRegex = new RegExp(/[*]\S.*?\S[*]/, 'g');
        var s = text; // variavel temporária

        // laço dos Matchs da Regex no texto
        while (result = objRegex.exec(text)) {
            // subistituindo * inicial por <b> e final por </b>
            var str = '<b>' + text.substr(result.index + 1, result[0].length - 2) + '</b>';
            s = s.replace(result[0], str); // subistituindo no texto a mundança
        }
        return s;
    },

    aplicandoNegrito: function (text) {
        /*
            Criando uma nova Regex
            1. [*] - * no incicio;
            2. \S - Seguido de qualquer caracter, menos WhiteSpaces(espaço, tab..);
            3. .*? - Nenhum ou Mais caracteres de qualquer tipo, não obrigatorio;
            4. \S - Qualquer caracter, menos WhiteSpaces(espaço, tab..);
            5. [*] - * no final.
            6. 'g' - global, pode se repetir durante a string.
        */
        var objRegex = new RegExp(/[*]\S.*?\S[*]/, 'g');
        var s = text; // variavel temporária

        // laço dos Matchs da Regex no texto
        while (result = objRegex.exec(text)) {
            // subistituindo * inicial por <b> e final por </b>
            var str = '<b>' + text.substr(result.index + 1, result[0].length - 2) + '</b>';
            s = s.replace(result[0], str); // subistituindo no texto a mundança
        }
        return s;
    },

    aplicandoItalico: function (text) {
        /*
            Criando uma nova Regex
            1. [_] - _ no incicio;
            2. \S - Seguido de qualquer caracter, menos WhiteSpaces(espaço, tab..);
            3. .*? - Nenhum ou Mais caracteres de qualquer tipo, não obrigatorio;
            4. \S - Qualquer caracter, menos WhiteSpaces(espaço, tab..);
            5. [_] - _ no final.
            6. 'g' - global, pode se repetir durante a string.
        */
        var objRegex = new RegExp(/[_]\S.*?\S[_]/, 'g');
        var s = text; // variavel temporária

        // laço dos Matchs da Regex no texto
        while (result = objRegex.exec(text)) {
            // subistituindo * inicial por <b> e final por </b>
            var str = '<i>' + text.substr(result.index + 1, result[0].length - 2) + '</i>';
            s = s.replace(result[0], str); // subistituindo no texto a mundança
        }
        return s;
    },

    aplicandoStrike: function (text) {
        /*
            Criando uma nova Regex
            1. [~] - _ no incicio;
            2. \S - Seguido de qualquer caracter, menos WhiteSpaces(espaço, tab..);
            3. .*? - Nenhum ou Mais caracteres de qualquer tipo, não obrigatorio;
            4. \S - Qualquer caracter, menos WhiteSpaces(espaço, tab..);
            5. [~] - _ no final.
            6. 'g' - global, pode se repetir durante a string.
        */
        var objRegex = new RegExp(/[~]\S.*?\S[~]/, 'g');
        var s = text; // variavel temporária

        // laço dos Matchs da Regex no texto
        while (result = objRegex.exec(text)) {
            // subistituindo * inicial por <b> e final por </b>
            var str = '<strike>' + text.substr(result.index + 1, result[0].length - 2) + '</strike>';
            s = s.replace(result[0], str); // subistituindo no texto a mundança
        }
        return s;
    },

    aplicandoSublinhado: function (text) {
        /*
            Criando uma nova Regex
            1. [#] - # no incicio;
            2. \S - Seguido de qualquer caracter, menos WhiteSpaces(espaço, tab..);
            3. .*? - Nenhum ou Mais caracteres de qualquer tipo, não obrigatorio;
            4. \S - Qualquer caracter, menos WhiteSpaces(espaço, tab..);
            5. [#] - # no final.
            6. 'g' - global, pode se repetir durante a string.
        */
        var objRegex = new RegExp(/[#]\S.*?\S[#]/, 'g');
        var s = text; // variavel temporária

        // laço dos Matchs da Regex no texto
        while (result = objRegex.exec(text)) {
            // subistituindo * inicial por <b> e final por </b>
            var str = '<u>' + text.substr(result.index + 1, result[0].length - 2) + '</u>';
            s = s.replace(result[0], str); // subistituindo no texto a mundança
        }
        return s;
    },

    aplicandoHighlighter: function (text) {
        /*
            Criando uma nova Regex
            1. \^ - ^ no incicio;
            2. \S - Seguido de qualquer caracter, menos WhiteSpaces(espaço, tab..);
            3. .+? - Nenhum ou Mais caracteres de qualquer tipo, não obrigatorio;
            4. \S - Qualquer caracter, menos WhiteSpaces(espaço, tab..);
            5. \^ - ^ no final.
            6. 'g' - global, pode se repetir durante a string.
        */
        var objRegex = new RegExp(/\^\S.*?\S\^/, 'g');
        var s = text; // variavel temporária

        // laço dos Matchs da Regex no texto
        while (result = objRegex.exec(text)) {
            // subistituindo * inicial por <b> e final por </b>
            var str = '<span class="text-highlight">' + text.substr(result.index + 1, result[0].length - 2) + '</span>';
            s = s.replace(result[0], str); // subistituindo no texto a mundança
        }
        return s;
    },

    aplicandoH1: function (text) {
        /*
            Criando uma nova Regex
            1. [.] - ponto no incicio;
            2. \S - Seguido de qualquer caracter, menos WhiteSpaces(espaço, tab..);
            3. .+? - Nenhum ou Mais caracteres de qualquer tipo, não obrigatorio;
            4. \S - Qualquer caracter, menos WhiteSpaces(espaço, tab..);
            5. [\r\n] - Enter no final.
            6. 'g' - global, pode se repetir durante a string.
        */
        var objRegex = new RegExp(/\.[A-Z].+[\r\n]/, 'g');
        var s = text; // variavel temporária

        // laço dos Matchs da Regex no texto
        while (result = objRegex.exec(text)) {
            // subistituindo * inicial por <b> e final por </b>
            var str = '<h4>' + text.substr(result.index + 1, result[0].length - 2) + '</h4>';
            s = s.replace(result[0], str); // subistituindo no texto a mundança
        }
        return s;
    },
};