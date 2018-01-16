const usuarioDAO = {
    "response":{
        "success":false,
        "msg":"",
        "data":"",
        "set": function (s, m, d) {
            usuarioDAO.success = s;
            usuarioDAO.msg = m;
            usuarioDAO.data = d;
        }
    },
    "data":{
        'id':'',
        'nome':'',
        'email':'',
        'senha':'',
        'perfil':'',
        'datacadastro':'',
        'dataedicao':''
    },
    "setData": function (id, nome, email, senha, perfil, datacastro, dataedicao) {
        usuarioDAO.data.id = (id != undefined) ? id : null;
        usuarioDAO.data.nome = (nome != undefined) ? nome : null;
        usuarioDAO.data.email = (email != undefined) ? email : null;
        usuarioDAO.data.senha = (senha != undefined) ? senha : null;
        usuarioDAO.data.perfil = (perfil != undefined) ? perfil : null;
        usuarioDAO.data.datacastro = (datacastro != undefined) ? datacastro : null;
        usuarioDAO.data.dataedicao = (dataedicao != undefined) ? dataedicao : null;
    },
    "reset": function () {
        usuarioDAO.response.success = "";
        usuarioDAO.response.msg = "";
        usuarioDAO.response.data = "";
    },
    "cadastrar": function (data) {
        return new Promise (resolve => {
            // reset response
            usuarioDAO.reset();

            // auto incrementa
            usuarioDAO.autoIncrementID().then(idIncrementado => {
                setTimeout(function (){
                    // seta os atributos
                    usuarioDAO.setData(
                        idIncrementado, // id
                        data.nome, // nome 
                        data.email, // email
                        data.senha, // senha
                        data.perfil, // perfil
                        (data.datacadastro != undefined) ? data.datacadastro : moment().format('YYYY-MM-DD hh:mm:ss'), // datacadastro
                        (data.dataedicao != undefined) ? data.dataedicao : null // dataedicao
                    );
                    indexedDBCtrl.add('usuario', usuarioDAO.data).then(response => {
                        console.log(idIncrementado);
                        
                        if (response) {
                            usuarioDAO.response.set(true, 'Cadastrado com Sucesso!', response.data);
                            console.log(response.data);
                        }
                        resolve(usuarioDAO.response);
                    });
                });
            });
        });
    },
    "atualizar": function (data) {
        return new Promise (resolve => {
           setTimeout(function (){
                // buscamos por ID para verificar se o usuário existe    
                usuarioDAO.buscarPorId(data).then(response => {

                    // reset response
                    usuarioDAO.reset();
                    
                    // se haver sucesso
                    if (response.success) {

                        // verificamos se a data tem tamnho maior que 0
                        if (response.data.length > 0) {
                            // seta os atributos
                            usuarioDAO.setData(
                                data.id, // id
                                data.nome, // nome 
                                data.email, // email
                                data.senha, // senha
                                data.perfil, // perfil
                                data.datacadastro, // datacadastro
                                (data.dataedicao != undefined) ? data.dataedicao : moment().format('YYYY-MM-DD hh:mm:ss') // dataedicao
                            );
                            indexedDBCtrl.update('usuario', usuarioDAO.data).then(data => {
                                usuarioDAO.response.set(true, 'Dados atualizados', response.data);
                                resolve(usuarioDAO.response);
                            });   
                        }else{
                            usuarioDAO.response.set(true, 'Usuário não encontrado!', '');
                            resolve(usuarioDAO.response);
                        }

                    }
                });
            });
        });
    },
    "buscarPorId": function (data) {
        return new Promise (resolve => {
            indexedDBCtrl.getPorId('usuario', +data.id).then(item => {
                setTimeout(function () {
                    // reset response
                    usuarioDAO.reset();

                    if (item){
                        usuarioDAO.response.set(true, 'Dado encontrado', item);
                        console.log(item);
                        resolve(usuarioDAO.response);
                    }else{
                        usuarioDAO.response.set(false, 'Usuário não encontado!', item);
                        resolve(usuarioDAO.response);
                    }
                },500);
            });
        });
    },
    "listarTodos": function () {
        return new Promise (resolve => {
            setTimeout(function () {
                // reset response
                usuarioDAO.reset();
                indexedDBCtrl.getAll('usuario').then(listItem => {
                    usuarioDAO.response.set(true, 'Listagem com sucesso', listItem);
                    resolve(usuarioDAO.response);
                });
            });
        });
    },
    "autoIncrementID": function () {
        return new Promise (resolve => {
            setTimeout(function (){
                var ultimo = 0;
                indexedDBCtrl.getAll('usuario').then(listItem => {
                    for (var x in listItem) {
                        ultimo = listItem[x].id; //  recebe todos até o último
                    }
                    resolve(ultimo+1);
                });
            });
        });
    },
    "authentication": function (data) {
        return new Promise (resolve => {
            setTimeout(function(){
            
                // reset response
                usuarioDAO.reset();
                
                var usuario = null;

                indexedDBCtrl.getAll('usuario').then(listItem =>{
                    if (listItem.length>1) {
                        for (var i in listItem) {
                            if (listItem[i].email === data.email && listItem[i].senha === data.senha) {
                                usuario = listItem[i];
                            }
                        }
                    }
                    if (usuario !== null) {
                        usuarioDAO.response.set(true, 'Logado com sucesso!', usuario);
                    }else{
                        usuarioDAO.response.set(true, 'Login ou Senha inválidos!', '');
                    }
                    resolve(usuarioDAO.response);
                });
            });
                     
        });        
    }
}