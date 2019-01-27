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
        'ativo':'',
        'datacadastro':'',
        'dataedicao':''
    },
    setData (id, idusuario, idcategoria, descricao, valor, parcela, indeterminada, tipo, status, datavencimento, sync, ativo, datacadastro, dataedicao) {
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
        this.data.ativo = (ativo != undefined) ? ativo : null;
        this.data.datacadastro = (datacadastro != undefined) ? datacadastro : null;
        this.data.dataedicao = (dataedicao != undefined) ? dataedicao : null;
    },
    cadastrar (data) {
        return new Promise (resolve => {
            //setTimeout(() => {
                var response = {success:false, msg:'default', data: ''};
                
                this.autoIncrementID().then(idIncrementado => {
                    // seta os atributos
                    contaDAO.setData(
                        (data.id != null) ? +data.id : +idIncrementado, // id
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
                        (data.ativo != undefined || data.ativo != null) ? data.ativo : 'SIM',
                        (data.datacadastro != undefined || data.datacadastro != null) ? data.datacadastro : moment().format('YYYY-MM-DD HH:mm:ss'), // datacadastro
                        (data.dataedicao != undefined || data.dataedicao != null) ? data.dataedicao : null // dataedicao
                    );
                    indexedDBCtrl.add('conta', this.data).then(data => {
                        // console.log('[contaDAO]:[Cadastrar] Sucesso', data);
                        response.success = true; 
                        response.msg = 'Cadastrado com sucesso!';
                        response.data = data;
                        resolve(response);
                    });
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
                                data.ativo,
                                data.datacadastro, // datacadastro
                                moment().format('YYYY-MM-DD HH:mm:ss') // dataedicao
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
                            response.msg = 'Conta não encontrada!';
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
                            
                            // cursor = event.target.result;
                            // if (cursor) {
                            //     list.push(cursor.value);
                            //     cursor.continue();
                            // }
                            list = event.target.result;
                            
                            response.success = true; 
                            response.msg = 'Listagem com sucesso!';
                            response.data = list;
                            resolve(response);
                        };
                        request.onerror = (event) => {
                            console.error('[ContaDAO]:[ERROR]: ListarTodos', event);
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
                        // cursor = event.target.result;
                        // if (cursor) {
                        //     if (+cursor.value.idusuario === +idusuario && cursor.value.sync == 'SIM') {
                        //         list.push(cursor.value);
                        //     }
                        //     cursor.continue();
                        // }
                        result = event.target.result;
                        for(var i in result) {
                            if (+result[i].idusuario === +idusuario && result[i].sync === 'SIM') {
                                list.push(result[i]);
                            }
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
    listarContasAPagarPorUsuario(idusuario) {
        return new Promise (resolve  => {
                var list = [];
                var response = {success:false, msg:'default', data: ''};
                
                    indexedDBCtrl.start().then(db => {
                        db.getAll('conta').then(resquest => {
                            request.onsuccess = (event) => {
                                var result = event.target.result;
                                for (var i in result) {
                                    if ( +result[i].idusuario === +idusuario && result[i].tipo === 'APAGAR' && result[i].ativo === 'SIM') {
                                        list.push(result[i]);
                                    }
                                }
                                response.success = true; 
                                response.msg = 'listarContasAPagarPorUsuario com sucesso!';
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
        
            // listamos primeiro as categorias
            categoriaDAO.listar().then(resp => {
                // se tudo listar correto
                if (resp.success) {
                    // listamos as contas
                    this.listarTodos().then(response => {
                        // se listar as contas ok
                        if (response.success) {
                            // separamos só contas do usuário
                            let contas = response.data;
                            let categorias = resp.data;
                            contas.forEach(function(conta) {
                                if (+conta.idusuario === +idusuario) {
                                    // pegamos a categoria de cada conta
                                    categorias.forEach(function(categoria) {
                                        if (+conta.idcategoria === +categoria.id) {
                                            conta.categoria = categoria.descricao;
                                            list.push(conta);
                                        }
                                    });
                                }
                            });
                            // setamos o response
                            response.success = true;
                            response.msg = '[ContaDAO]:[ListaPorUsuario]: Sucesso na Listagem!';
                            response.data = list;
                            
                            //resolvemos a promise
                            resolve(response);
                        }
                    });
                }
            });
        });
    },
    listarContasAtivasPorUsuario(idusuario) {
        return new Promise (resolve  => {
            var list = [];
            var response = {success:false, msg:'default', data: ''};
        
            // listamos primeiro as categorias
            categoriaDAO.listar().then(resp => {
                // se tudo listar correto
                if (resp.success) {
                    // listamos as contas
                    this.listarTodos().then(response => {
                        // se listar as contas ok
                        if (response.success) {
                            // separamos só contas do usuário
                            let contas = response.data;
                            let categorias = resp.data;
                            contas.forEach(function(conta) {
                                if (+conta.idusuario === +idusuario  && conta.ativo === 'SIM') {

                                    // verificando se a conta aind cai nesse mês
                                    let p = conta.parcela - 1; // caso a parcela seja indeterminada
                                    let vencimentoAtual = moment(conta.datavencimento).add(p, "M"); // desconta a 1a parcela
                                    // se a data do último vencimento da conta, ainda estiver para chegar ou for hoje
                                    // ou ainda a conta seja INDETERMINADA
                                    // seguimos com o tratamento
                                    if (+conta.parcela === 0 || vencimentoAtual.format('YYYY-MM').valueOf() >= moment().format('YYYY-MM').valueOf()) {
                                        // pegamos a categoria de cada conta
                                        categorias.forEach(function(categoria) {
                                            if (+conta.idcategoria === +categoria.id) {
                                                conta.categoria = categoria.descricao;
                                                list.push(conta);
                                            }
                                        });
                                    }
                                }
                            });
                            // setamos o response
                            response.success = true;
                            response.msg = '[ContaDAO]:[ListaPorUsuario]: Sucesso na Listagem!';
                            response.data = list;
                            
                            //resolvemos a promise
                            resolve(response);
                        }
                    });
                }
            });
        });
    },
    listarContasAReceberPorUsuario(idusuario) {
        return new Promise (resolve  => {
                var list = [];
                var response = {success:false, msg:'default', data: ''};
                
                    indexedDBCtrl.start().then(db => {
                        db.getAll('conta').then(resquest => {
                            request.onsuccess = (event) => {
                                var result = event.target.result;
                                for (var i in result) {
                                    if ( +result[i].idusuario === +idusuario && result[i].tipo === 'ARECEBER' && result[i].ativo === 'SIM') {
                                        list.push(result[i]);
                                    }
                                }
                                response.success = true; 
                                response.msg = 'listarContasAReceberPorUsuario com sucesso!';
                                response.data = list;
                                resolve(response);
                            }
                        });
                            
                    });
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
                        request.onsuccess = (event) => {
                            var result = event.target.result;
                            for (var i in result) {
                                ultimo = result[i].id;
                            }
                            resolve(ultimo+1);
                        }
                    });
                }); 
            //},100);
        });
    },
    desativar(data) {
        return new Promise (resolve => {
            var response = {success:false, msg:'default', data: ''};

            this.buscarPorId(data).then(resp => {
                if ( resp.success ) {
                    let obj = resp.data; // recebendo o obj
                    obj.ativo = 'NAO'; // desativando
                    this.atualizar(obj).then(resp => {
                        if ( resp.success ) {
                            response.success = true; 
                            response.msg = '[ContaDAO][Desativar]: Desativado com Sucesso!';
                            response.data = resp.data;
                            resolve(response);
                        }
                    });
                }
            });
        });
    },
    sync(data) {
        return new Promise (resolve => {
            function percorreArraySync(i) {
                if (data[i] != undefined) {
                    switch (data[i].metodo) {
                        case 'cadastrar': {
                            contaDAO.cadastrar(data[i].data).then(response => {
                                if (response.success){
                                    percorreArraySync(i+1);
                                    // console.log('[contaDAO]:[Sync] Cadastro com Sucesso', response.data);
                                }
                            });
                            break;
                        }
                        case 'atualizar': {
                            // deletamos o dado do banco e adicionamos novamente com o ID nuvem
                            let id = (data[i].data.old_id !== undefined) ? data[i].data.old_id : data[i].data.id; // tratando o id para cadastro e atualização
                            indexedDBCtrl.remove('conta', id).then(() => {
                                contaDAO.cadastrar(data[i].data).then(response => {
                                    if (response.success){
                                        percorreArraySync(i+1);
                                        // console.log('[contaDAO]:[Sync] Atualizado com Sucesso', response.data);
                                    }
                                });
                            });
                            break;
                        }
                        case 'deletar': {
                            indexedDBCtrl.remove('conta', data[i].data.id).then(() => {
                                i++;
                                percorreArraySync(i+1);
                                // console.log('[contaDAO]:[Sync] Deletado com Sucesso');
                            });
                            break;
                        }
                    }
                }else{
                    // se finalizou os dados
                    resolve();
                }
            }
            percorreArraySync(0);
        });
    }
}