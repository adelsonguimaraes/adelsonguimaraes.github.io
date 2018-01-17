const categoriaDAO = {
    "data":{
        'id':'',
        'idnuvem': '',
        'descricao':'',
        'tipo':'',
        'datacadastro':'',
        'dataedicao':''
    },
    setData (id, idnuvem, descricao, tipo, datacastro, dataedicao) {
        this.data.id = (id != undefined) ? id : null;
        this.data.idnuvem = (idnuvem != undefined) ? idnuvem : null;
        this.data.descricao = (descricao != undefined) ? descricao : null;
        this.data.tipo = (tipo != undefined) ? tipo : null;
        this.data.datacastro = (datacastro != undefined) ? datacastro : null;
        this.data.dataedicao = (dataedicao != undefined) ? dataedicao : null;
    },
    cadastrar (data) {
        return new Promise (resolve => {
        var response = {success:false, msg:'default', data: ''};
            // seta os atributos
            categoriaDAO.setData(
                new Date().getTime(), // id increment
                data.id, // nuvem
                data.descricao, // descricao 
                data.tipo, // tipo
                (data.datacadastro != undefined) ? data.datacadastro : moment().format('YYYY-MM-DD hh:mm:ss'), // datacadastro
                (data.dataedicao != undefined) ? data.dataedicao : null // dataedicao
            );
            indexedDBCtrl.start().then(db => {
                db.add('categoria', this.data).then(data => {
                        response.success = true; 
                        response.msg = 'Cadastrado com sucesso!';
                        response.data = data;
                        resolve(response);
                });
            });
        });
    },
    atualizar (data) {
        return new Promise (resolve => {
            var response = {success:false, msg:'default', data: ''};
            // buscamos por ID para verificar se o Categoria existe    
            this.buscarPorId(data).then(resp => {

                // se haver sucesso
                if (resp.success) {

                    // verificamos se a data tem tamanho maior que 0
                    if (resp.data != '') {
                        // seta os atributos
                        this.setData(
                            data.id, // id
                            data.idnuvem, // nuvem
                            data.descricao, // descricao 
                            data.tipo, // tipo
                            data.datacadastro, // datacadastro
                            (data.dataedicao != undefined) ? data.dataedicao : moment().format('YYYY-MM-DD hh:mm:ss') // dataedicao
                        );
                        indexedDBCtrl.start().then(db => {
                            db.update('categoria', this.data).then(data => {
                                response.success = true; 
                                response.msg = 'Atualizado com sucesso!';
                                response.data = data;
                                resolve(response);
                            });   
                        });   
                    }else{
                        response.msg = 'Categoria não encontrado!';
                        resolve(response);
                    }
                }else{
                    resolve(resp);
                }
            });
        });
    },
    buscarPorId (data) {
        return new Promise (resolve => {
            var response = {success:false, msg:'default', data: ''};
            indexedDBCtrl.start().then(db => {
                db.get('categoria', +data.id).then(item => {
                    if (item){
                        response.success = true; 
                        response.msg = 'Buscado com sucesso!';
                        response.data = item;
                        resolve(response);
                    }else{
                        response.msg = 'Categoria não encontrado!';
                        resolve(response);
                    }
                });
            });
        });
    },
    listarTodos () {
        return new Promise (resolve => {
            var response = {success:false, msg:'default', data: ''};
            indexedDBCtrl.start().then(db => {
                db.getAll('categoria').then(list => {
                    response.success = true; 
                    response.msg = 'Listagem com sucesso!';
                    response.data = list;
                    resolve(response);
                });
            });
        });
    },
    listarPorTipo (tipo) {
        return new Promise (resolve => {
            var response = {success:false, msg:'default', data: ''};
            var array = [];
            // indexedDBCtrl.start().then(db => {
            //     db.getAll('categoria').then(list => {
            //         for (var i in list) {
            //             if (list[i].tipo === 'tipo' || list[i].tipo === 'AMBOS') {
            //                 l.push(list[i]);
            //             }
            //         }
            //         response.success = true; 
            //         response.msg = 'Listagem com sucesso!';
            //         response.data = l;
            //         resolve(response);
            //     });
            // });
            this.listarTodos().then(response => {
                if (response.success) {
                    // console.log(lista);
                    // var l = [];
                    // for (var i in lista) {
                    //     if (lista[i].tipo === tipo || lista[i].tipo === 'AMBOS') {
                    //         l.push(lista[i]);
                    //     }
                    // }
                    percorreArray = function(l, t, p) {
                        console.log(p + ' _ ' + t);
                        if (t < p) {
                            if (l[p].tipo === tipo || l[p].tipo === 'AMBOS') {
                                araay.push(l[i]);
                            }   
                            percorreArray (l, l.length, p+1);
                        }else{
                            response.success = true; 
                            response.msg = 'Listagem com sucesso!';
                            response.data = array;
                            resolve(response);
                        }
                    };
                    percorreArray (response.data, response.data.length, 0);
                    // response.success = true; 
                    // response.msg = 'Listagem com sucesso!';
                    // response.data = l;
                    // resolve(response);
                };
            });
        });
    }
    // autoIncrementID() {
    //     return new Promise (resolve => {
    //         var ultimo = 0;
    //         indexedDBCtrl.start().then(db => {
    //             db.getAll('categoria').then(list => {
    //                 for (var i in list) {
    //                     ultimo = list[i].id; //  recebe todos até o último
    //                 }
    //                 console.log(utltimo+1);
    //                 resolve(ultimo+1);
    //             });
    //         });
    //     });
    // }
    
}