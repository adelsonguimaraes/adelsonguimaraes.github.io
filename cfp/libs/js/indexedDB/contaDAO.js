const contaDAO = {
    "data":{
        'id':'',
        'idusuario':'',
        'idcategoria':'',
        'descricao':'',
        'valor':'',
        'parcela':'',
        'indeterminada':'',
        'tipo':'',
        'status':'',
        'datavencimento':'',
        'sync':'',
        'datacadastro':'',
        'dataedicao':''
    },
    setData (id, idusuario, idcategoria, descricao, valor, parcela, indeterminada, tipo, status, datavencimento, sync, datacadastro, dataedicao) {
        this.data.id = (id != undefined) ? id : null;
        this.data.idusuario = (idusuario != undefined) ? idusuario : null;
        this.data.idcategoria = (idcategoria != undefined) ? idcategoria : null;
        this.data.descricao = (descricao != undefined) ? descricao : null;
        this.data.valor = (valor != undefined) ? valor : null;
        this.data.parcela = (parcela != undefined) ? parcela : null;
        this.data.indeterminada = (indeterminada != undefined) ? indeterminada : null;
        this.data.tipo = (tipo != undefined) ? tipo : null;
        this.data.status = (status != undefined) ? status : null;
        this.data.datavencimento = (datavencimento != undefined) ? datavencimento : null;
        this.data.sync = (sync != undefined) ? sync : null;
        this.data.datacadastro = (datacadastro != undefined) ? datacadastro : null;
        this.data.dataedicao = (dataedicao != undefined) ? dataedicao : null;
    },
    cadastrar (data) {
        return new Promise (resolve => {
            //setTimeout(() => {
                var response = {success:false, msg:'default', data: ''};
                // seta os atributos
                contaDAO.setData(
                    +data.id, // id
                    +data.idusuario,
                    +data.idcategoria,
                    data.descricao,
                    data.valor,
                    data.parcela,
                    data.indeterminada,
                    data.tipo,
                    (data.status != undefined  || data.status != null) ? data.status : 'EMABERTO',
                    data.datavencimento,
                    (data.sync != undefined || data.sync != null) ? data.sync : 'NAO',
                    (data.datacadastro != undefined || data.datacadastro != null) ? data.datacadastro : moment().format('YYYY-MM-DD hh:mm:ss'), // datacadastro
                    (data.dataedicao != undefined || data.dataedicao != null) ? data.dataedicao : null // dataedicao
                );
                indexedDBCtrl.add('conta', this.data).then(data => {
                    response.success = true; 
                    response.msg = 'Cadastrado com sucesso!';
                    response.data = data;
                    resolve(response);
                });
            //},100);
        });
    },
    atualizar (data) {
        return new Promise (resolve => {
            //setTimeout(() => {
                var response = {success:false, msg:'default', data: ''};
                // buscamos por ID para verificar se o usuário existe    
                this.buscarPorId(data).then(resp => {

                    // se haver sucesso
                    if (resp.success) {

                        // verificamos se a data tem tamanho maior que 0
                        if (resp.data != '') {
                            // seta os atributos
                            this.setData(
                                +data.id, // id
                                +data.idusuario,
                                +data.idcategoria,
                                data.descricao,
                                data.valor,
                                data.parcela,
                                data.indeterminada,
                                data.tipo,
                                data.status,
                                data.datavencimento,
                                data.sync,
                                data.datacadastro, // datacadastro
                                moment().format('YYYY-MM-DD hh:mm:ss') // dataedicao
                            );
                            indexedDBCtrl.start().then(db => {
                                db.update('conta', this.data).then(data => {
                                    response.success = true; 
                                    response.msg = 'Atualizado com sucesso!';
                                    response.data = data;
                                    resolve(response);
                                });   
                            });   
                        }else{
                            response.msg = 'Usuário não encontrado!';
                            resolve(response);
                        }
                    }else{
                        resolve(resp);
                    }
                });
            //}, 100);
        });
    },
    buscarPorId (data) {
        return new Promise (resolve => {
            //setTimeout(() => {
                var response = {success:false, msg:'default', data: ''};
                indexedDBCtrl.start().then(db => {
                    db.get('conta', +data.id).then(item => {
                        if (item){
                            response.success = true; 
                            response.msg = 'Buscado com sucesso!';
                            response.data = item;
                            resolve(response);
                        }else{
                            response.msg = 'Usuário não encontrado!';
                            resolve(response);
                        }
                    });
                });
            //}, 100);
        });
    },
    listarTodos () {
        return new Promise (resolve => {
            //setTimeout(() => {
                var response = {success:false, msg:'default', data: ''};
                var list = [];
                indexedDBCtrl.start().then(db => {
                    db.getAll('conta').then(resquest => {
                        request.onsuccess = (event) => {
                            cursor = event.target.result;
                            if (cursor) {
                                list.push(cursor.value);
                                cursor.continue();
                            }
                            response.success = true; 
                            response.msg = 'Listagem com sucesso!';
                            response.data = list;
                            resolve(response);
                        }
                    });
                });
            });
        //}, 100);
    },
    /*
        Listar todos os intens que já estão com status sincronizado
    */
    listarSync (idusuario) {
        return new Promise (resolve => {
            var list = [];
            var response = {success:false, msg:'default', data: ''};
            indexedDBCtrl.start().then(db => {
                db.getAll('conta').then(resquest => {
                    request.onsuccess = (event) => {
                        cursor = event.target.result;
                        if (cursor) {
                            if (+cursor.value.idusuario === +idusuario && cursor.value.sync == 'SIM') {
                                list.push(cursor.value);
                            }
                            cursor.continue();
                        }
                        response.success = true; 
                        response.msg = 'Listagem Conta com sucesso!';
                        response.data = list;
                        resolve(response);
                    }
                });
            });
        });
    },
    listarNoSync (idusuario) {
        return new Promise (resolve => {
            var list = [];
            var response = {success:false, msg:'default', data: ''};
            indexedDBCtrl.start().then(db => {
                db.getAll('conta').then(resquest => {
                    request.onsuccess = (event) => {
                        cursor = event.target.result;
                        if (cursor) {
                            if (+cursor.value.idusuario === +idusuario && cursor.value.sync == 'NAO') {
                                list.push(cursor.value);
                            }
                            cursor.continue();
                        }
                        response.success = true; 
                        response.msg = 'Listagem Conta com sucesso!';
                        response.data = list;
                        resolve(response);
                    }
                });
            });
        });
    },
    listarContasPorUsuario(idusuario) {
        return new Promise (resolve  => {
            var list = [];
            var response = {success:false, msg:'default', data: ''};
            indexedDBCtrl.start().then(db => {
                db.getAll('conta').then(resquest => {
                    request.onsuccess = (event) => {
                        cursor = event.target.result;
                        if (cursor) {
                            if (+cursor.value.idusuario === +idusuario) {
                                list.push(cursor.value);
                            }
                            cursor.continue();
                        }
                        response.success = true; 
                        response.msg = 'Listagem com sucesso!';
                        response.data = list;
                        resolve(response);
                    }
                });
            });
        });
    },
    listarContasAPagarPorUsuario(idusuario) {
        return new Promise (resolve  => {
                var list = [];
                var response = {success:false, msg:'default', data: ''};
                
                setTimeout(() => {

                    indexedDBCtrl.start().then(db => {
                        db.getAll('conta').then(resquest => {
                            request.onsuccess = (event) => {
                                
                                        
                                    cursor = event.target.result;
                                    
                                    if (cursor) {
                                        if (+cursor.value.idusuario === +idusuario) {
                                            list.push(cursor.value);
                                        }
                                        cursor.continue();
                                    }
                                    response.success = true; 
                                    response.msg = 'Listagem com sucesso!';
                                    response.data = list;
                                    resolve(response);
                                
                            }
                        });
                            
                    });
                }, 0);
        });
    },
    setIDNuvem (data, newID) {
        return new Promise (resolve => {
            //setTimeout(() => {
                indexedDBCtrl.remove('conta', +data.id).then(list => {
                    data.id = newID;
                    this.cadastrar(data).then(response => {
                        if (response.success) {
                            resolve(response);
                        }
                    });
                });
            //}, 100);
        });
    },
    autoIncrementID() {
        return new Promise (resolve => {
            //setTimeout(() =>{
                var ultimo = 0;
                indexedDBCtrl.start().then(db => {
                    db.getAll('conta').then(list => {
                        for (var i in list) {
                            ultimo = list[i].id; //  recebe todos até o último
                        }
                        resolve(ultimo+1);
                    });
                }); 
            //},100);
        });
    }
}