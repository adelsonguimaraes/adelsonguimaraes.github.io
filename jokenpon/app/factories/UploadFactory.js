const UploadFactory = {
    // Contantes de Configurações
    extensions: ['image'], // tipo de arquivos aceitos
    sizeLimit: 2000000, // 2mb
    limitTotalSize: 8000000, // 8mb
    limitAmount: 5, // limite de arquivos por ocorrência
    // Resolve arquivos dentro das extensões permitidas
    resolveExtensions: function (files) {
        var count = 0;
        var response = {
            filesFiltered: [],
            erros: ''
        }
        
        // lista de files
        for (var i in files) {
            for (var e in this.extensions) {
                // verificando se o tipo do FILE é compatível com alguma extensão
                if (files[i].type.indexOf(this.extensions[e])>=0) {
                    response.filesFiltered.push(files[i]);
                }else{
                    count++;
                }
            }
        }

        if (count > 0) {
            response.erros += "Só são permitidos arquivos dos tipos<br>";
            for (var ext in this.extensions) {
                response.erros += " - " + this.extensions[ext] + '<br>';
            }
            response.erros += '<br>';
        }

        return response;
    },
    // resolve arquivos dentro do limite de tamanho permitido
    resolveLimitSizes: function (files, callback) {
        var control = this;
        var totalSize = 0;
        var fileResize;
        var response = {
            filesFiltered: [],
            erros: ''
        }

        for (var i in files) {
            // se o tamanho do arquivo foi <= a 2 MB, é permitido
            // control.convertImgBase64(files[i], function (e) {
            //     control.convertImgBase64ToFile(e.target.result, files[i].name)
            //         .then(function (e) {
            //             console.log(e);
            //         })
            // });
            if (files[i].size <= this.sizeLimit) {
                if (totalSize + files[i].size <= this.limitTotalSize) {
                    totalSize += files[i].size;
                    response.filesFiltered.push(files[i]);
                }else{
                    response.erros += ' - Adição de ' + files[i].name + ' excede o Limite Máximo ' + this.limitTotalSize +'MB total.<br>';
                }
            }else{
                response.erros += ' - O arquivo ' + files[i].name + ' excede o Limite Máximo ' + (this.sizeLimit / 1000000) + 'MB por arquivo.<br>'
            }
        }

        // if (response.erros.length >= 1) response.erros = 'Os seguintes arquivos Excedem o Limit Máximo' + response.erros;

        return response;
    },

    resolveAmount: function (files) {
        var response = {
            filesFiltered: [],
            erros: ''
        }
        for (var i in files) {
            if ((+i+1)<=this.limitAmount) {
                response.filesFiltered.push(files[i]);
            }else{
                response.erros += ' - O arquivo ' + files[i].name + ' não pôde ser adicionado por que o limite máximo de ' + this.limitAmount + '  arquivos foi atingido!<br>';
            }
        }
        return response;
    },

    convertFileBase64: function (files) {
        return new Promise (resolve => {
            var erros= '';

            for (var i in files) {
                var file = files[i];
                var reader = new FileReader();

                if ((+timeline_sidebarCtrl.filesCopy.length+(+i)) >= +this.limitAmount) {
                    erros += 'Alguns arquivos não poderam ser anexados, limite máximo de ' + this.limitAmount + ' anexos';
                    resolve(erros);
                    break;
                }
                
                if (typeof(file)==='object') {
                    reader.readAsDataURL(file);
                    reader.onloadend = (function (file) {
                        return function (evt) {
                            var binary = evt.target.result;
                            // var base64 = btoa(binary);
                            timeline_sidebarCtrl.filesCopy.push({
                                name: file.name,
                                size: file.size,
                                type: file.type,
                                base64: binary
                            });
                        }
                    })(file);
                }
                if ((+i + 1) >= +files.length ) {
                    resolve(erros);
                    break;
                }
            }
        });
    },

    // convertFileBase64: function (files) {
    //     return new Promise(resolve => {
    //         for (var i in files) {
    //             var file = files[i];
    //             // Create an image
    //             var img = document.createElement("img");
    //             var reader = new FileReader();
    //             if (typeof (file) === 'object') {
    //                 reader.readAsDataURL(file);
    //                 reader.onloadend = (function (file) {
    //                     return function (evt) {                            
    //                         img.src = evt.target.result;
    //                         var canvas = document.createElement("canvas");
    //                         //var canvas = $("<canvas>", {"id":"testing"})[0];
    //                         var ctx = canvas.getContext("2d");
    //                         ctx.drawImage(img, 0, 0);

    //                         var MAX_WIDTH = 400;
    //                         var MAX_HEIGHT = 400;
    //                         var width = img.width;
    //                         var height = img.height;

    //                         if (width > height) {
    //                             if (width > MAX_WIDTH) {
    //                                 height *= MAX_WIDTH / width;
    //                                 width = MAX_WIDTH;
    //                             }
    //                         } else {
    //                             if (height > MAX_HEIGHT) {
    //                                 width *= MAX_HEIGHT / height;
    //                                 height = MAX_HEIGHT;
    //                             }
    //                         }
    //                         canvas.width = width;
    //                         canvas.height = height;
    //                         var ctx = canvas.getContext("2d");
    //                         ctx.drawImage(img, 0, 0, width, height);

    //                         var dataurl = canvas.toDataURL("image/png");
    //                         // dataurl =  btoa(dataurl);
                            
    //                         if (dataurl.length > 6) {
    //                             console.log(dataurl);
    //                             // var base64 = btoa(binary);
    //                             timeline_sidebarCtrl.filesCopy.push({
    //                                 name: file.name,
    //                                 size: file.size,
    //                                 type: file.type,
    //                                 base64: dataurl
    //                             });
    //                         }
    //                     }
    //                 })(file);
    //             }
    //             if ((+i + 1) >= +files.length) {
    //                 resolve();
    //                 break;
    //             }
    //         }
    //     });
    // },

    ResizeImage: function () {
        var filesToUpload = document.getElementById('imageFile').files;
        var file = filesToUpload[0];

        // Create an image
        var img = document.createElement("img");
        // Create a file reader
        var reader = new FileReader();
        // Set the image once loaded into file reader
        reader.onload = function (e) {
            img.src = e.target.result;

            var canvas = document.createElement("canvas");
            //var canvas = $("<canvas>", {"id":"testing"})[0];
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            var MAX_WIDTH = 400;
            var MAX_HEIGHT = 400;
            var width = img.width;
            var height = img.height;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            var dataurl = canvas.toDataURL("image/png");
            document.getElementById('output').src = dataurl;
        }
        // Load files into file reader
        reader.readAsDataURL(file);
    },

    //return a promise that resolves with a File instance
    convertImgBase64ToFile: function (url, filename, mimeType) {
        mimeType = mimeType || (url.match(/^data:([^;]+);/) || '')[1];
        return (fetch(url)
            .then(function (res) { return res.arrayBuffer(); })
            .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
        );
    },

    convertImgBase64: function (file, callback) {
        // var filesToUpload = files;
        // var file = filesToUpload[0];
        var result;
        // Create an image
        var img = document.createElement("img");
        // Create a file reader
        var reader = new FileReader();
        // Set the image once loaded into file reader
        reader.onload = async function (e) {
            img.src = e.target.result;

            var canvas = document.createElement("canvas");
            //var canvas = $("<canvas>", {"id":"testing"})[0];
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            var MAX_WIDTH = 400;
            var MAX_HEIGHT = 300;
            var width = img.width;
            var height = img.height;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            result = img;
            // var dataurl = canvas.toDataURL("image/png");
            // console.log(dataurl);
            // document.getElementById('image').src = dataurl;
        }
        // Load files into file reader
        reader.readAsDataURL(file);

        return reader.onloadend = callback;
    }
}