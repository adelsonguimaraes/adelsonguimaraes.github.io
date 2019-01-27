const usuarioDAO = {
    "data":{
        'id':'',
        'nome':'',
        'email':'',
        'senha':'',
        'ativo':'',
        'perfil':'',
        'sync':'',
        'datacadastro':'',
        'dataedicao':''
    },
    setData (id, nome, email, senha, ativo, perfil, sync, datacastro, dataedicao) {
        this.data.id = (id != undefined) ? id : null;
        this.data.nome = (nome != undefined) ? nome : null;
        this.data.email = (email != undefined) ? email : null;
        this.data.senha = (senha != undefined) ? senha : null;
        this.data.ativo = (ativo != undefined) ? ativo : null;
        this.data.perfil = (perfil != undefined) ? perfil : null;
        this.data.sync = (sync != undefined) ? sync : null;
        this.data.datacastro = (datacastro != undefined) ? datacastro : null;
        this.data.dataedicao = (dataedicao != undefined) ? dataedicao : null;
    },
    cadastrar (data) {
        return new Promise (resolve => {
            var response = {success:false, msg:'default', data: ''};
            // seta os atributos
            usuarioDAO.setData(
                +data.id, // id
                data.nome, // nome 
                data.email, // email
                data.senha, // senha
                (data.ativo != undefined || data.ativo != null) ? data.ativo : 'SIM',
                data.perfil, // perfil
                (data.sync != undefined || data.sync != null) ? data.sync : 'NAO',
                (data.datacadastro != undefined || data.datacadastro != null) ? data.datacadastro : moment().format('YYYY-MM-DD HH:mm:ss'), // datacadastro
                (data.dataedicao != undefined || data.dataedicao != null) ? data.dataedicao : null // dataedicao
            );
            indexedDBCtrl.start().then(db => {
                db.add('usuario', this.data).then(data => {
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
            // buscamos por ID para verificar se o usuário existe    
            this.buscarPorId(data).then(resp => {

                // se haver sucesso
                if (resp.success) {

                    // verificamos se a data tem tamanho maior que 0
                    if (resp.data != '') {
                        // seta os atributos
                        this.setData(
                            +data.id, // id
                            data.nome, // nome 
                            data.email, // email
                            data.senha, // senha
                            data.ativo,
                            data.perfil, // perfil
                            data.sync,
                            data.datacadastro, // datacadastro
                            moment().format('YYYY-MM-DD HH:mm:ss') // dataedicao
                        );
                        indexedDBCtrl.start().then(db => {
                            db.update('usuario', this.data).then(data => {
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
        });
    },
    atualizarSenha (data) {
        return new Promise (resolve => {
            let response = {success:false, msg:'default', data:''};
            this.buscarPorId(data).then(resp => {
                if (resp.success) {
                    let obj = resp.data;
                    obj.senha = data.novasenha;
                    obj.sync = 'SIM';
                    this.atualizar(obj).then(resp => {
                        if (resp.success) {
                            response.success = true; 
                            response.msg = 'Senha atualizada com sucesso!';
                            response.data = resp.data;
                            resolve(response);
                        }
                    });
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
                db.get('usuario', +data.id).then(item => {
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
        });
    },
    listarTodos () {
        return new Promise (resolve => {
            var response = {success:false, msg:'default', data: ''};
            var list = [];
            indexedDBCtrl.start().then(db => {
                setTimeout(() => {
                    db.getAll('usuario').then(resquest => {
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
                }, 100);
            });
        });
    },
    autoIncrementID() {
        return new Promise (resolve => {
            var ultimo = 0;
            indexedDBCtrl.start().then(db => {
                db.getAll('usuario').then(list => {
                    for (var i in list) {
                        ultimo = list[i].id; //  recebe todos até o último
                    }
                    resolve(ultimo+1);
                });
            });
        });
    },
    auth(data) {
        return new Promise (resolve => {
            var response = {success:false, msg:'default', data: ''};
            var session = '';
            indexedDBCtrl.start().then(db => {
                setTimeout(() => {
                    db.getAll('usuario').then(resquest => {
                        request.onsuccess = (event) => {
                            var result = event.target.result;
                            for (var i in result) {
                                if ( result[i].email === data.email && result[i].senha === data.senha ) {
                                    session = result[i];
                                }
                            }
                            if (session != '') {
                                response.success = true; 
                                response.msg = 'Logado com sucesso!';
                                response.data = session;
                            }else{
                                response.msg = 'Email ou Senha inválidos!';
                            }
                            resolve(response);
                        }
                    });
                }, 100);
            });
        });
    },
    sync(data) {
        return new Promise (resolve => {
            function percorreArraySync(i) {
                if (data[i] != undefined) {
                    switch (data[i].metodo) {
                        // case 'cadastrar': {
                        //     contaDAO.cadastrar(data[i].data).then(response => {
                        //         if (response.success){
                        //             percorreArraySync(i+1);
                        //             // console.log('[contaDAO]:[Sync] Cadastro com Sucesso', response.data);
                        //         }
                        //     });
                        //     break;
                        // }
                        case 'atualizar': {
                            // deletamos o dado do banco e adicionamos novamente com o ID nuvem
                            indexedDBCtrl.remove('conta', data[i].data.id).then(() => {
                                contaDAO.cadastrar(data[i].data).then(response => {
                                    if (response.success){
                                        percorreArraySync(i+1);
                                        // console.log('[contaDAO]:[Sync] Atualizado com Sucesso', response.data);
                                    }
                                });
                            });
                            break;
                        }
                        // case 'deletar': {
                        //     indexedDBCtrl.remove('conta', data[i].data.id).then(() => {
                        //         i++;
                        //         percorreArraySync(i+1);
                        //         // console.log('[contaDAO]:[Sync] Deletado com Sucesso');
                        //     });
                        //     break;
                        // }
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