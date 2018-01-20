const categoriaDAO = {
    "data":{
        'id':'',
        'descricao':'',
        'tipo':'',
        'datacadastro':'',
        'dataedicao':'',
        'sync':''
    },
    "lista":[],
    setData (id, descricao, tipo, sync, ativo, datacadastro, dataedicao) {
        this.data.id = (id != undefined) ? id : null;
        this.data.descricao = (descricao != undefined) ? descricao : null;
        this.data.tipo = (tipo != undefined) ? tipo : null;
        this.data.sync = (sync != undefined) ? sync : null;
        this.data.ativo = (ativo != undefined) ? ativo : null;
        this.data.datacadastro = (datacadastro != undefined) ? datacadastro : null;
        this.data.dataedicao = (dataedicao != undefined) ? dataedicao : null;
    },
    cadastrar (data) {
        return new Promise (resolve => {
            var response = {success:false, msg:'default', data: ''};
            // seta os atributos
            categoriaDAO.setData(
                +data.id, // nuvem
                data.descricao, // descricao 
                data.tipo, // tipo
                (data.sync != undefined) ? data.sync : 'NAO',
                (data.ativo != undefined) ? data.ativo : 'SIM',
                (data.datacadastro != undefined) ? data.datacadastro : moment().format('YYYY-MM-DD hh:mm:ss'), // datacadastro
                (data.dataedicao != undefined) ? data.dataedicao : null // dataedicao
            );
            indexedDBCtrl.add('categoria', this.data).then(data => {
                    //setTimeout(() => {
                        response.success = true; 
                        response.msg = 'Cadastrado com sucesso!';
                        response.data = data;
                        resolve(response);
                    //}, 100);
                });
        });
    },
    atualizar (data) {
        return new Promise (resolve => {
            var response = {success:false, msg:'default', data: ''};
            // buscamos por ID para verificar se o Categoria existe    
            this.buscarPorId(data).then(resp => {
                //setTimeout(() => {
                    // se haver sucesso
                    if (resp.success) {

                        // verificamos se a data tem tamanho maior que 0
                        if (resp.data != '') {
                            // seta os atributos
                            this.setData(
                                +data.id, // nuvem
                                data.descricao, // descricao 
                                data.tipo, // tipo
                                data.sync,
                                data.ativo,
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
                //}, 100);
            });
        });
    },
    buscarPorId (data) {
        return new Promise (resolve => {
            var response = {success:false, msg:'default', data: ''};
            //setTimeout(() => {
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
            //}, 200);
        });
    },
    listarTodos () {
        return new Promise (resolve => {
            var response = {success:false, msg:'default', data: ''};
            //setTimeout(() => {
                indexedDBCtrl.start().then(db => {
                    db.getAll('categoria').then(list => {
                        
                            response.success = true; 
                            response.msg = 'Listagem com sucesso!';
                            response.data = list;
                            resolve(response);
                    });
                });
            //}, 100);
        });
    },
    listarPorTipo (tipo) {
        return new Promise (resolve => {
            var response = {success:false, msg:'default', data: ''};
            var array = [];
            this.listarTodos().then(response => {
                //setTimeout(() => {
                    if (response.success) {
                        this.lista = response.data;
                        var l = [];
                        for (var i in this.lista) {
                            if (this.lista[i].tipo === tipo || this.lista[i].tipo === 'AMBOS') {
                                l.push(this.lista[i]);
                            }
                        }
                        response.success = true; 
                        response.msg = 'Listagem com sucesso!';
                        response.data = l;
                        resolve(response);
                    };
                //}, 100);
            });
        });
    },
    setIDNuvem (data, newID) {
        return new Promise (resolve => {
            //setTimeout(() => {
                indexedDBCtrl.remove('categoria', +data.id).then(list => {
                    data.id = newID;
                    this.cadastrar(data).then(response => {
                        if (response.success) {
                            resolve(response);
                        }
                    });
                });
            //}, 100);
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