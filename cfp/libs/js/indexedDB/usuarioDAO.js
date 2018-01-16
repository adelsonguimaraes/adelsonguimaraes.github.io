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
                        if (response) {
                            usuarioDAO.response.set(true, 'Cadastrado com Sucesso!', response.data);
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
                // reset response
                usuarioDAO.reset();
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
                indexedDBCtrl.update('usuario', usuarioDAO.data).then(response => {
                    if (response.success) {
                        usuarioDAO.response.set(true, 'Dados atualizados', response.data);
                        resolve(usuarioDAO.response);
                    }else{
                        resolve(response);
                    }
                });
            });
        });
    },
    "buscarPorId": function (data) {
        // reset response
        usuarioDAO.reset();

        var resp = indexedDBCtrl.getPorId('usuario', +data.id)
        return resp;
    },
    "listarTodos": function () {
        // reset response
        // usuarioDAO.reset();
        var response = indexedDBCtrl.getAll('usuario');
        return response;
    },
    "autoIncrementID": function () {
        // var response = indexedDBCtrl.getAll('usuario');
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
        // reset response
        // usuarioDAO.reset();
        // var resp = indexedDBCtrl.getAll('usuario');

        // setTimeout(function(){
            indexedDBCtrl.getAll('usuario')
            .then(function resolve(result){
            if (result.success) {
                if (result.data.length>1) {
                    for (var i in indexedDBCtrl.listItem) {
                        if (indexedDBCtrl.listItem[i].email === data.email && indexedDBCtrl.listItem[i].senha === data.senha) {
                            usuarioDAO.response.msg = 'Usuário existe ' + indexedDBCtrl.listItem[i].nome;
                            usuarioDAO.response.data = indexedDBCtrl.listItem[i];
                        }else{
                            usuarioDAO.response.msg = 'Email ou Senha Inválidos!';
                        }
                    }
                }else{
                    usuarioDAO.response.msg = 'Email ou Senha Inválidos!';
                }
            }else{
                usuarioDAO.response.msg = 'Ocorreu um erro na operação com o banco!';
            }
        },function reject(result){
            //
        });
        // }, 300);
        
        return usuarioDAO.response;
    }
}