const usuarioDAO = {
    "data":{
        'id':'',
        'nome':'',
        'email':'',
        'senha':'',
        'perfil':'',
        'datacadastro':'',
        'dataedicao':''
    },
    setData (id, nome, email, senha, perfil, datacastro, dataedicao) {
        this.data.id = (id != undefined) ? id : null;
        this.data.nome = (nome != undefined) ? nome : null;
        this.data.email = (email != undefined) ? email : null;
        this.data.senha = (senha != undefined) ? senha : null;
        this.data.perfil = (perfil != undefined) ? perfil : null;
        this.data.datacastro = (datacastro != undefined) ? datacastro : null;
        this.data.dataedicao = (dataedicao != undefined) ? dataedicao : null;
    },
    cadastrar (data) {
        return new Promise (resolve => {
            var response = {success:false, msg:'default', data: ''};
            // auto incrementa
            this.autoIncrementID().then(idIncrementado => {
                // seta os atributos
                usuarioDAO.setData(
                    +data.id, // id
                    data.nome, // nome 
                    data.email, // email
                    data.senha, // senha
                    data.perfil, // perfil
                    (data.datacadastro != undefined) ? data.datacadastro : moment().format('YYYY-MM-DD hh:mm:ss'), // datacadastro
                    (data.dataedicao != undefined) ? data.dataedicao : null // dataedicao
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
                            data.perfil, // perfil
                            data.datacadastro, // datacadastro
                            (data.dataedicao != undefined) ? data.dataedicao : moment().format('YYYY-MM-DD hh:mm:ss') // dataedicao
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
            indexedDBCtrl.start().then(db => {
                db.getAll('usuario').then(list => {
                    response.success = true; 
                    response.msg = 'Listagem com sucesso!';
                    response.data = list;
                    resolve(response);
                });
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
            var session = '';
            var response = {success:false, msg:'default', data: ''};
            indexedDBCtrl.start().then(db => {
                db.getAll('usuario').then(list => {
                    for (var i in list) {
                        if (list[i].email === data.email && list[i].senha === data.senha) {
                            session = list[i];
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
                });
            });
        });
    }
}