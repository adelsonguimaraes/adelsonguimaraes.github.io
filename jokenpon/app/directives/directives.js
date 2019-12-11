/**
 * INSPINIA - Responsive Admin Theme
 *
 * Main directives.js file
 * Define directives for used plugin
 *
 *
 * Functions (directives)
 *  - sideNavigation
 *  - iboxTools
 *  - minimalizaSidebar
 *  - vectorMap
 *  - sparkline
 *  - icheck
 *  - ionRangeSlider
 *  - dropZone
 *  - responsiveVideo
 *  - chatSlimScroll
 *  - customValid
 *  - fullScroll
 *  - closeOffCanvas
 *  - clockPicker
 *  - landingScrollspy
 *  - fitHeight
 *  - iboxToolsFullScreen
 *  - slimScroll
 *  - truncate
 *  - touchSpin
 *  - markdownEditor
 *  - resizeable
 *
 */


/**
 * pageTitle - Directive for set Page title - mata title
 */
function pageTitle($rootScope, $timeout) {
    return {
        link: function(scope, element) {
            var listener = function(event, toState, toParams, fromState, fromParams) {
                // Default title - load on Dashboard 1
                var title = 'PCE | Painel       ';
                // Create your own title pattern
                if (toState.data && toState.data.pageTitle) title = 'PCE | ' + toState.data.pageTitle;
                $timeout(function() {
                    element.text(title);
                });
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    }
};

/**
 * sideNavigation - Directive for run metsiMenu on sidebar navigation
 */
function sideNavigation($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            // Call the metsiMenu plugin and plug it to sidebar navigation
            $timeout(function(){
                element.metisMenu();

            });
        }
    };
};

/**
 * responsibleVideo - Directive for responsive video
 */
function responsiveVideo() {
    return {
        restrict: 'A',
        link:  function(scope, element) {
            var figure = element;
            var video = element.children();
            video
                .attr('data-aspectRatio', video.height() / video.width())
                .removeAttr('height')
                .removeAttr('width')

            //We can use $watch on $window.innerWidth also.
            $(window).resize(function() {
                var newWidth = figure.width();
                video
                    .width(newWidth)
                    .height(newWidth * video.attr('data-aspectRatio'));
            }).resize();
        }
    }
}

/**
 * iboxTools - Directive for iBox tools elements in right corner of ibox
 */
function iboxTools($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            };
                // Function for close ibox
                $scope.closebox = function () {
                    var ibox = $element.closest('div.ibox');
                    ibox.remove();
                }
        }
    };
}

/**
 * iboxTools with full screen - Directive for iBox tools elements in right corner of ibox with full screen option
 */
function iboxToolsFullScreen($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools_full_screen.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            };
            // Function for close ibox
            $scope.closebox = function () {
                var ibox = $element.closest('div.ibox');
                ibox.remove();
            };
            // Function for full screen
            $scope.fullscreen = function () {
                var ibox = $element.closest('div.ibox');
                var button = $element.find('i.fa-expand');
                $('body').toggleClass('fullscreen-ibox-mode');
                button.toggleClass('fa-expand').toggleClass('fa-compress');
                ibox.toggleClass('fullscreen');
                setTimeout(function() {
                    $(window).trigger('resize');
                }, 100);
            }
        }
    };
}

/**
 * minimalizaSidebar - Directive for minimalize sidebar
*/
function minimalizaSidebar($timeout) {
    return {
        restrict: 'A',
        template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
        controller: function ($scope, $element) {
            $scope.minimalize = function () {
                $("body").toggleClass("mini-navbar");
                if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                    // Hide menu in order to smoothly turn on when maximize menu
                    $('#side-menu').hide();
                    // For smoothly turn on menu
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(400);
                        }, 200);
                } else if ($('body').hasClass('fixed-sidebar')){
                    $('#side-menu').hide();
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(400);
                        }, 100);
                } else {
                    // Remove all inline style from jquery fadeIn function to reset menu state
                    $('#side-menu').removeAttr('style');
                }
            }
        }
    };
};


function closeOffCanvas() {
    return {
        restrict: 'A',
        template: '<a class="close-canvas-menu" ng-click="closeOffCanvas()"><i class="fa fa-times"></i></a>',
        controller: function ($scope, $element) {
            $scope.closeOffCanvas = function () {
                $("body").toggleClass("mini-navbar");
            }
        }
    };
}

/**
 * vectorMap - Directive for Vector map plugin
 */
function vectorMap() {
    return {
        restrict: 'A',
        scope: {
            myMapData: '=',
        },
        link: function (scope, element, attrs) {
            var map = element.vectorMap({
                map: 'world_mill_en',
                backgroundColor: "transparent",
                regionStyle: {
                    initial: {
                        fill: '#e4e4e4',
                        "fill-opacity": 0.9,
                        stroke: 'none',
                        "stroke-width": 0,
                        "stroke-opacity": 0
                    }
                },
                series: {
                    regions: [
                        {
                            values: scope.myMapData,
                            scale: ["#1ab394", "#22d6b1"],
                            normalizeFunction: 'polynomial'
                        }
                    ]
                },
            });
            var destroyMap = function(){
                element.remove();
            };
            scope.$on('$destroy', function() {
                destroyMap();
            });
        }
    }
}


/**
 * sparkline - Directive for Sparkline chart
 */
function sparkline() {
    return {
        restrict: 'A',
        scope: {
            sparkData: '=',
            sparkOptions: '=',
        },
        link: function (scope, element, attrs) {
            scope.$watch(scope.sparkData, function () {
                render();
            });
            scope.$watch(scope.sparkOptions, function(){
                render();
            });
            var render = function () {
                $(element).sparkline(scope.sparkData, scope.sparkOptions);
            };
        }
    }
};

/**
 * icheck - Directive for custom checkbox icheck
 */
function icheck($timeout) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function($scope, element, $attrs, ngModel) {
            return $timeout(function() {
                var value;
                value = $attrs['value'];

                $scope.$watch($attrs['ngModel'], function(newValue){
                    $(element).iCheck('update');
                })

                return $(element).iCheck({
                    checkboxClass: 'icheckbox_square-green',
                    radioClass: 'iradio_square-green'

                }).on('ifChanged', function(event) {
                        if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                            $scope.$apply(function() {
                                return ngModel.$setViewValue(event.target.checked);
                            });
                        }
                        if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                            return $scope.$apply(function() {
                                return ngModel.$setViewValue(value);
                            });
                        }
                    });
            });
        }
    };
}

/**
 * ionRangeSlider - Directive for Ion Range Slider
 */
function ionRangeSlider() {
    return {
        restrict: 'A',
        scope: {
            rangeOptions: '='
        },
        link: function (scope, elem, attrs) {
            elem.ionRangeSlider(scope.rangeOptions);
        }
    }
}

/**
 * dropZone - Directive for Drag and drop zone file upload plugin
 */
function dropZone() {
    return {
        restrict: 'C',
        link: function(scope, element, attrs) {

            var config = {
                url: 'http://localhost:8080/upload',
                maxFilesize: 100,
                paramName: "uploadfile",
                maxThumbnailFilesize: 10,
                parallelUploads: 1,
                autoProcessQueue: false
            };

            var eventHandlers = {
                'addedfile': function(file) {
                    scope.file = file;
                    if (this.files[1]!=null) {
                        this.removeFile(this.files[0]);
                    }
                    scope.$apply(function() {
                        scope.fileAdded = true;
                    });
                },

                'success': function (file, response) {
                }

            };

            dropzone = new Dropzone(element[0], config);

            angular.forEach(eventHandlers, function(handler, event) {
                dropzone.on(event, handler);
            });

            scope.processDropzone = function() {
                dropzone.processQueue();
            };

            scope.resetDropzone = function() {
                dropzone.removeAllFiles();
            }
        }
    }
}

/**
 * chatSlimScroll - Directive for slim scroll for small chat
 */
function chatSlimScroll($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            $timeout(function(){
                element.slimscroll({
                    height: '234px',
                    railOpacity: 0.4
                });

            });
        }
    };
}

/**
 * customValid - Directive for custom validation example
 */
function customValid(){
    return {
        require: 'ngModel',
        link: function(scope, ele, attrs, c) {
            scope.$watch(attrs.ngModel, function() {

                // You can call a $http method here
                // Or create custom validation

                var validText = "Inspinia";

                if(scope.extras == validText) {
                    c.$setValidity('cvalid', true);
                } else {
                    c.$setValidity('cvalid', false);
                }

            });
        }
    }
}


/**
 * fullScroll - Directive for slimScroll with 100%
 */
function fullScroll($timeout){
    return {
        restrict: 'A',
        link: function(scope, element) {
            $timeout(function(){
                element.slimscroll({
                    height: '100%',
                    railOpacity: 0.9
                });

            });
        }
    };
}

/**
 * slimScroll - Directive for slimScroll with custom height
 */
function slimScroll($timeout){
    return {
        restrict: 'A',
        scope: {
            boxHeight: '@'
        },
        link: function(scope, element) {
            $timeout(function(){
                element.slimscroll({
                    height: scope.boxHeight,
                    railOpacity: 0.9
                });

            });
        }
    };
}

/**
 * clockPicker - Directive for clock picker plugin
 */
function clockPicker() {
    return {
        restrict: 'A',
        link: function(scope, element) {
                element.clockpicker();
        }
    };
};


/**
 * landingScrollspy - Directive for scrollspy in landing page
 */
function landingScrollspy(){
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.scrollspy({
                target: '.navbar-fixed-top',
                offset: 80
            });
        }
    }
}

/**
 * fitHeight - Directive for set height fit to window height
 */
function fitHeight(){
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.css("height", $(window).height() + "px");
            element.css("min-height", $(window).height() + "px");
        }
    };
}

/**
 * truncate - Directive for truncate string
 */
function truncate($timeout){
    return {
        restrict: 'A',
        scope: {
            truncateOptions: '='
        },
        link: function(scope, element) {
            $timeout(function(){
                element.dotdotdot(scope.truncateOptions);

            });
        }
    };
}


/**
 * touchSpin - Directive for Bootstrap TouchSpin
 */
function touchSpin() {
    return {
        restrict: 'A',
        scope: {
            spinOptions: '='
        },
        link: function (scope, element, attrs) {
            scope.$watch(scope.spinOptions, function(){
                render();
            });
            var render = function () {
                $(element).TouchSpin(scope.spinOptions);
            };
        }
    }
};

/**
 * markdownEditor - Directive for Bootstrap Markdown
 */
function markdownEditor() {
    return {
        restrict: "A",
        require:  'ngModel',
        link:     function (scope, element, attrs, ngModel) {
            $(element).markdown({
                savable:false,
                onChange: function(e){
                    ngModel.$setViewValue(e.getContent());
                }
            });
        }
    }
};

function footable () {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            var footableTable = element.parents('table');

            if (! footableTable.hasClass('footable-loaded')) {
                footableTable.footable();
            }

            footableTable.trigger('footable_initialized');
            footableTable.trigger('footable_resize');
            footableTable.data('footable').redraw();
        }
    }

};

function datamode () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (sc, el, att, model) {
            // formata data
            var _format = function (date) {
                date = date.replace(/[^0-9]+/g, "");
                if(date.length > 2) {
                    date = date.substring(0,2) +"/"+ date.substring(2);
                }
                if(date.length > 5) {
                    date = date.substring(0,5) +"/"+ date.substring(5,9);
                }
                return date;
            };

            // ao digitar
            el.bind("keyup", function () {
                model.$setViewValue(_format(model.$viewValue));
                model.$render();
            });

            // ao perder o foco
            el.bind("blur", function () {
                if(model.$viewValue.length === 10) {
                    var parts = model.$viewValue.split('/');
                    var date = parts[2]+'-'+parts[1]+'-'+parts[0];
                    model.$$rawModelValue = moment(date);
                    
                    // model.$setViewValue(model.$$rawModelValue.format('DD/MM/YYYY'));
                }else{
                    model.$$rawModelValue = moment();
                    // model.$setViewValue(model.$$rawModelValue.format('DD/MM/YYYY'));
                }
                model.$render();

            });
        }
    }
};

function validarCPF ($timeout, SweetAlert, genericAPI) {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (sc, el, att, model) {

            function valCPF(cpf) {  
                cpf = cpf.replace(/[^\d]+/g,'');    
                if(cpf == '') return false; 
                // Elimina CPFs invalidos conhecidos    
                if (cpf.length != 11 || 
                    cpf == "00000000000" || 
                    cpf == "11111111111" || 
                    cpf == "22222222222" || 
                    cpf == "33333333333" || 
                    cpf == "44444444444" || 
                    cpf == "55555555555" || 
                    cpf == "66666666666" || 
                    cpf == "77777777777" || 
                    cpf == "88888888888" || 
                    cpf == "99999999999")
                        return false;       
                // Valida 1o digito 
                add = 0;    
                for (i=0; i < 9; i ++)       
                    add += parseInt(cpf.charAt(i)) * (10 - i);  
                    rev = 11 - (add % 11);  
                    if (rev == 10 || rev == 11)     
                        rev = 0;    
                    if (rev != parseInt(cpf.charAt(9)))     
                        return false;       
                // Valida 2o digito 
                add = 0;    
                for (i = 0; i < 10; i ++)        
                    add += parseInt(cpf.charAt(i)) * (11 - i);  
                rev = 11 - (add % 11);  
                if (rev == 10 || rev == 11) 
                    rev = 0;    
                if (rev != parseInt(cpf.charAt(10)))
                    return false;       
                return true;   
            }

            function duplicado ( model ) {
                cpf = model.$viewValue.replace(/[^\d]+/g,'');
                if(cpf == '') return false;

                var dados = {'session':true, 'metodo': 'buscarPorCpfcnpj', 'data': cpf, 'class': 'pessoa'};

                genericAPI.generic(dados)
                .then(function successCallback(response) {
                    if(response.data.success){
                        if ( response.data.data !== null ) {
                            model.$setViewValue(null);
                            model.$render();
                            sweetAlert("Atenção", "CPF já está em uso!", "error");
                        }
                    }else{
                        SweetAlert.swal({ html:true, title:"Atenção", text:response.data.msg, type:"error"});
                    }
                }, function errorCallback(response) {
                });
            };

            // ao perder o foco
            el.bind("blur", function () {
                $timeout(function () {
                    
                    // verifica se houve algum dígito
                    if( model.$viewValue === undefined || model.$viewValue === null ) return false;
                    
                    if(!valCPF(model.$viewValue)) {
                        model.$setViewValue(null);
                        model.$render();
                        sweetAlert("Atenção", "CPF Inválido!", "error");
                    }   

                    // duplicado( model );                 
                }, 100);
            });
        }
    }
};

function validarCNPJ ($timeout, SweetAlert, genericAPI) {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (sc, el, att, model) {

            function valCNPJ(cnpj) {
 
                cnpj = cnpj.replace(/[^\d]+/g,'');
             
                if(cnpj == '') return false;
                 
                if (cnpj.length != 14)
                    return false;
             
                // Elimina CNPJs invalidos conhecidos
                if (cnpj == "00000000000000" || 
                    cnpj == "11111111111111" || 
                    cnpj == "22222222222222" || 
                    cnpj == "33333333333333" || 
                    cnpj == "44444444444444" || 
                    cnpj == "55555555555555" || 
                    cnpj == "66666666666666" || 
                    cnpj == "77777777777777" || 
                    cnpj == "88888888888888" || 
                    cnpj == "99999999999999")
                    return false;
                     
                // Valida DVs
                tamanho = cnpj.length - 2
                numeros = cnpj.substring(0,tamanho);
                digitos = cnpj.substring(tamanho);
                soma = 0;
                pos = tamanho - 7;
                for (i = tamanho; i >= 1; i--) {
                  soma += numeros.charAt(tamanho - i) * pos--;
                  if (pos < 2)
                        pos = 9;
                }
                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                if (resultado != digitos.charAt(0))
                    return false;
                     
                tamanho = tamanho + 1;
                numeros = cnpj.substring(0,tamanho);
                soma = 0;
                pos = tamanho - 7;
                for (i = tamanho; i >= 1; i--) {
                  soma += numeros.charAt(tamanho - i) * pos--;
                  if (pos < 2)
                        pos = 9;
                }
                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                if (resultado != digitos.charAt(1))
                      return false;
                       
                return true;
                
            };

            function duplicado ( model ) {
                cnpj = model.$viewValue.replace(/[^\d]+/g,'');
                if(cnpj == '') return false;

                var dados = {'session':true, 'metodo': 'buscarPorCpfcnpj', 'data': cnpj, 'class': 'pessoa'};

                genericAPI.generic(dados)
                .then(function successCallback(response) {
                    if(response.data.success){
                        if ( response.data.data !== null ) {
                            model.$setViewValue(null);
                            model.$render();
                            sweetAlert("Atenção", "CNPJ já está em uso!", "error");
                        }
                    }else{
                        SweetAlert.swal({ html:true, title:"Atenção", text:response.data.msg, type:"error"});
                    }
                }, function errorCallback(response) {
                });
            };

            // ao perder o foco
            el.bind("blur", function () {
                $timeout(function () {

                    // verifica se algo foi digitado
                    if( model.$viewValue === undefined || model.$viewValue === null ) return false;

                    if(!valCNPJ(model.$viewValue)) {
                        model.$setViewValue(null);
                        model.$render();
                        sweetAlert("Atenção", "CNPJ Inválido!", "error");
                    }

                }, 100);
            });
        }
    }
};

function validarCEP ($timeout, SweetAlert) {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (sc, el, att, model) {

            // Função para retirar os espaços em branco do início e do fim da string.
            function Trim(strTexto) {
                // Substitúi os espaços vazios no inicio e no fim da string por vazio.
                return strTexto.replace(/^s+|s+$/g, '');
            }
         
            // Função para validação de CEP.
            function IsCEP(strCEP) {
                // Caso o CEP não esteja nesse formato ele é inválido!
                var objER = /^[0-9]{2}.[0-9]{3}-[0-9]{3}$/;
         
                strCEP = Trim(strCEP)
                if(strCEP.length > 0) {
                    if(objER.test(strCEP))
                        return true;
                    else
                        return false;
                } else
                        return false;
            }

            // ao perder o foco
            el.bind("blur", function () {
                $timeout(function () {
                    if(model.$viewValue.length) {
                        if(!IsCEP(model.$viewValue)) {
                            model.$setViewValue('');
                            model.$render();
                            sweetAlert("Atenção", "CNPJ Inválido!", "error");
                        }                    
                    }
                }, 100);
            });
        }
    }
};

function mascara () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (sc, el, att, model) {
            
            var objRegex = new RegExp(/(\w{1,})?([(|)|.|\/|-])?/, 'g');
            var s = att.mascara; // variavel temporária

            console.log(s);
            return false;

            // laço dos Matchs da Regex no texto
            while (result = objRegex.exec(att.mascara)) {
                console.log(result);

                // subistituindo * inicial por <b> e final por </b>
                var str = att.mascara.substr(result.index + 1, result[0].length - 2) + '</br>';
                s = s.replace(result[0], str); // subistituindo no texto a mundança
            }

            return false;
            
            var maskTxt = att.mascara.replace(/[^\d,A-Z]+/g,'');
            console.log(maskTxt);
            var maskArray = [];
            var lenMask = maskTxt.length;
            for(var x=0; x<lenMask; x++) {
                maskArray.push(maskTxt.substring(x, x+1));
            }

            var _digitado = function (input) {
                var len = input.length;
                if(len && len<lenMask) {
                    len = len-1;
                    var digito = input.substring(len);
                    input = input.substring(0,len);
                    if(maskArray[len].search(/[^A-Za-z]/)) {
                        digito = digito.replace(/[^A-Za-z]/, "");
                        input += digito.toUpperCase();
                    }else if(maskArray[len].search(/[^0-9]+/g)) {
                        digito = digito.replace(/[^0-9]+/g, "");
                        input += digito;
                    }
                }
                input = input.substring(0, lenMask);

                return input;
            };

            var _keyCodes = function (e) {
                var keys = [
                    91, //left window
                    92, //right window
                    93  //select key
                ];
                if (keys.indexOf(e.keyCode)>=0 || e.keyCode<48 || e.keyCode>105 || e.altKey === true || e.ctrlKey === true || e.shiftkey === true) return true;
                return false;
            };

            el.bind("keyup", function (e) {
                if (_keyCodes(e)) return false;
                model.$setViewValue(_digitado(model.$viewValue));
                model.$render();
            });

            el.bind("keypress", function (e) {
                if (_keyCodes(e.keyCode)) return false;
                model.$setViewValue(_digitado(model.$viewValue));
                model.$render();
            });

            // format
            var _format = function (input) {
                var text = '';
                var count = 0;
                input = input.replace(/[^\d,A-Z]+/g,'');
                if(input.length === lenMask) {
                    for(var x in att.mascara) {
                        if(att.mascara[x].search(/[^\s\/\(\)\._-]/)) {
                            text += att.mascara[x];
                            count++;
                        }else{
                            text += input[x-count];
                        }
                    }
                    input = text;
                }else if(input.length === att.mascara.length) {
                    input = input;
                }else{
                    input = "";
                }
                return input;
            };

            // após ganhar foco
            el.bind("focus", function () {
                model.$setViewValue(_format(model.$viewValue));
                model.$render();
            });

            // após perder o foco
            el.bind("blur", function () {
                model.$setViewValue(_format(model.$viewValue));
                model.$render();
            });
        }
    }
};

function mascaraMoeda ($timeout) {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (sc, el, att, model) {
            
            var KEY_RANGES = {
                numeric: [48, 57],
                padnum: [96, 105]
            };

            function isInRange (a, b) {
                return a >= b[0] && a <= b[1];
            };
            
            function stopEventFunction (a) {
                var b = a.keyCode;
                if (isInRange(b, KEY_RANGES.padnum)) {
                   b -= 48;
                }
                if (((b >= 41 && b <= 122) || b == 32 || b == 8 || b > 186) && (!a.altKey && !a.ctrlKey)) {
                    a.stopPropagation();
                }
            };
            function start (input) {
                return formataValor( input );
            };

            el.bind("keyup", function (e) {
                stopEventFunction(e);
                model.$setViewValue(format(model.$viewValue));
                model.$render();
            });

            el.bind("keydown", function (e) {
                stopEventFunction(e);
                // if (_keyCodes(e.keyCode)) return false;
                model.$setViewValue(format(model.$viewValue));
                model.$render();
            });
            
            el.bind("keypress", function (e) {
                if(stopEventFunction(e)) return false;
                model.$setViewValue(format(model.$viewValue));
                model.$render();
            });

            // format
            function format (k) {
                var value = model.$viewValue;

                var j = k.keyCode;
                if (isInRange(j, KEY_RANGES.padnum)) {
                   j -= 48;
                }
                var d = (isInRange(j, KEY_RANGES.numeric) ? String.fromCharCode(j) : "");
                var h = (value.replace(/\D/g, "").substr(0) + d).replace(/\D/g, "");
                
                var a = h.length;
                
                
                if (d == "" && a > 0 && j == 8) {
                   a--;
                   h = h.substring(0, a);      
                   k.stopPropagation();
                }
                
                // if (a >= 23){
                //     k.stopPropagation();
                // }
          
                /*
                   adiciona ponto do decimal
                */
                h = h.substr(0, h.length-2) + '.' + h.substr(-2);
          
                return formataValor( h );
             }

            // após ganhar foco
            el.bind("focus", function (e) {
                model.$setViewValue(start(model.$viewValue));
                model.$render();
            });

            // após perder o foco
            el.bind("blur", function () {
                model.$setViewValue(start(model.$viewValue));
                model.$render();
            });
        }
    }
};

function soNumeros() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (sc, el, att, model) {
            el.bind("keyup", function (e) {
                var input = model.$viewValue;
                input = input.toString().replace(/^0|[\D]/g, "");
                if (+input <= 0) input = 0;

                model.$setViewValue(input);
                model.$render();
            });
        }
    }
}

function celular () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (sc, el, att, model) {

            function format (input) {
                input = input.toString().replace(/^0|[\D]/g, "");
                input = input.substring(0, 11); // limitando a 11 digitos

                if (input.length >= 1 && input.length <= 2) {
                    input = '(' + input.substr(0, 2);
                } else if (input.length >= 3 && input.length <= 6) {
                    input = '(' + input.substr(0, 2) + ') ' + input.substr(2, 4);
                } else if (input.length >= 7 && input.length <= 10) {
                    input = '(' + input.substr(0, 2) + ') ' + input.substr(2, 4) + '-' + input.substr(6, 10);
                } else if (input.length >= 7 && input.length <= 11) {
                    input = '(' + input.substr(0, 2) + ') ' + input.substr(2, 5) + '-' + input.substr(7, 11);
                }
                return input;
            }

            el.bind("keyup", function (e) {
                var input = model.$viewValue;
                if(input.length<=0) return false;
                model.$setViewValue(format(input));
                model.$render();
            });

            el.bind("focus", function (e) {
                var input = model.$viewValue;
                if (input.length <= 0) return false;
                model.$setViewValue(format(input));
                model.$render();
            });
        }
    }
}

/**
 *
 * Pass all functions into module
 */
angular
    .module(module)
    .directive('pageTitle', pageTitle)
    .directive('sideNavigation', sideNavigation)
    .directive('iboxTools', iboxTools)
    .directive('minimalizaSidebar', minimalizaSidebar)
    .directive('vectorMap', vectorMap)
    .directive('sparkline', sparkline)
    .directive('icheck', icheck)
    .directive('ionRangeSlider', ionRangeSlider)
    .directive('dropZone', dropZone)
    .directive('responsiveVideo', responsiveVideo)
    .directive('chatSlimScroll', chatSlimScroll)
    .directive('customValid', customValid)
    .directive('fullScroll', fullScroll)
    .directive('closeOffCanvas', closeOffCanvas)
    .directive('clockPicker', clockPicker)
    .directive('landingScrollspy', landingScrollspy)
    .directive('fitHeight', fitHeight)
    .directive('iboxToolsFullScreen', iboxToolsFullScreen)
    .directive('slimScroll', slimScroll)
    .directive('truncate', truncate)
    .directive('touchSpin', touchSpin)
    .directive('markdownEditor', markdownEditor)
    .directive('footable', footable)
    .directive('datamode', datamode)
    .directive('validarcpf', validarCPF)
    .directive('validarcnpj', validarCNPJ)
    .directive('validarcep', validarCEP)
    .directive('mascara', mascara)
    .directive('mascaraMoeda', mascaraMoeda)
    .directive('soNumeros', soNumeros)
    .directive('celular', celular)
    .directive('reiniciarFootable', function () {
        return function (scope, element) {
            var footableTable = element.parents('table');


            if (!scope.$last) {
                return false;
            }

            scope.$evalAsync(function () {

                if (!footableTable.hasClass('footable-loaded')) {
                    footableTable.footable();
                }

                footableTable.trigger('footable_initialized');
                footableTable.trigger('footable_resize');
                footableTable.data('footable').redraw();

            });
        };
    })
    .directive('qrcode', ['$window', function($window) {

        var canvas2D = !!$window.CanvasRenderingContext2D,
            levels = {
                'L': 'Low',
                'M': 'Medium',
                'Q': 'Quartile',
                'H': 'High'
            },
            draw = function(context, qr, modules, tile) {
                for (var row = 0; row < modules; row++) {
                    for (var col = 0; col < modules; col++) {
                        var w = (Math.ceil((col + 1) * tile) - Math.floor(col * tile)),
                            h = (Math.ceil((row + 1) * tile) - Math.floor(row * tile));

                        context.fillStyle = qr.isDark(row, col) ? '#000' : '#fff';
                        context.fillRect(Math.round(col * tile),
                            Math.round(row * tile), w, h);
                    }
                }
            };

        return {
            restrict: 'E',
            template: '<canvas class="qrcode"></canvas>',
            link: function(scope, element, attrs) {
                var domElement = element[0],
                    $canvas = element.find('canvas'),
                    canvas = $canvas[0],
                    context = canvas2D ? canvas.getContext('2d') : null,
                    download = 'download' in attrs,
                    href = attrs.href,
                    link = download || href ? document.createElement('a') : '',
                    trim = /^\s+|\s+$/g,
                    error,
                    version,
                    errorCorrectionLevel,
                    data,
                    size,
                    modules,
                    tile,
                    qr,
                    $img,
                    setVersion = function(value) {
                        version = Math.max(1, Math.min(parseInt(value, 10), 10)) || 4;
                    },
                    setErrorCorrectionLevel = function(value) {
                        errorCorrectionLevel = value in levels ? value : 'M';
                    },
                    setData = function(value) {
                        if (!value) {
                            return;
                        }

                        data = value.replace(trim, '');
                        qr = qrcode(version, errorCorrectionLevel);
                        qr.addData(data);

                        try {
                            qr.make();
                        } catch(e) {
                            error = e.message;
                            return;
                        }

                        error = false;
                        modules = qr.getModuleCount();
                    },
                    setSize = function(value) {
                        size = parseInt(value, 10) || modules * 2;
                        tile = size / modules;
                        canvas.width = canvas.height = size;
                    },
                    render = function() {
                        if (!qr) {
                            return;
                        }

                        if (error) {
                            if (link) {
                                link.removeAttribute('download');
                                link.title = '';
                                link.href = '#_';
                            }
                            if (!canvas2D) {
                                domElement.innerHTML = '<img src width="' + size + '"' +
                                    'height="' + size + '"' +
                                    'class="qrcode">';
                            }
                            scope.$emit('qrcode:error', error);
                            return;
                        }

                        if (download) {
                            domElement.download = 'qrcode.png';
                            domElement.title = 'Download QR code';
                        }

                        if (canvas2D) {
                            draw(context, qr, modules, tile);

                            if (download) {
                                domElement.href = canvas.toDataURL('image/png');
                                return;
                            }
                        } else {
                            domElement.innerHTML = qr.createImgTag(tile, 0);
                            $img = element.find('img');
                            $img.addClass('qrcode');

                            if (download) {
                                domElement.href = $img[0].src;
                                return;
                            }
                        }

                        if (href) {
                            domElement.href = href;
                        }
                    };

                if (link) {
                    link.className = 'qrcode-link';
                    $canvas.wrap(link);
                    domElement = domElement.firstChild;
                }

                setVersion(attrs.version);
                setErrorCorrectionLevel(attrs.errorCorrectionLevel);
                setSize(attrs.size);

                attrs.$observe('version', function(value) {
                    if (!value) {
                        return;
                    }

                    setVersion(value);
                    setData(data);
                    setSize(size);
                    render();
                });

                attrs.$observe('errorCorrectionLevel', function(value) {
                    if (!value) {
                        return;
                    }

                    setErrorCorrectionLevel(value);
                    setData(data);
                    setSize(size);
                    render();
                });

                attrs.$observe('data', function(value) {
                    if (!value) {
                        return;
                    }

                    setData(value);
                    setSize(size);
                    render();
                });

                attrs.$observe('size', function(value) {
                    if (!value) {
                        return;
                    }

                    setSize(value);
                    render();
                });

                attrs.$observe('href', function(value) {
                    if (!value) {
                        return;
                    }

                    href = value;
                    render();
                });
            }
        };
    }])

