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
    "data":[
        'id',
        'nome',
        'email',
        'senha',
        'perfil',
        'datacadastro',
        'dataedicao'
    ],
    "setData": function (id, nome, email, senha, perfil, datacastro, dataedicao) {
        this.data.id = (id != undefined) ? id : null;
        this.data.nome = (nome != undefined) ? nome : null;
        this.data.email = (email != undefined) ? email : null;
        this.data.senha = (senha != undefined) ? senha : null;
        this.data.perfil = (perfil != undefined) ? perfil : null;
        this.data.datacastro = (datacastro != undefined) ? datacastro : null;
        this.data.dataedicao = (dataedicao != undefined) ? dataedicao : null;
    },
    "reset": function () {
        usuarioDAO.response.success = "";
        usuarioDAO.response.msg = "";
        usuarioDAO.response.data = "";
    },
    "cadastrar": function (data) {
        // reset response
        usuarioDAO.reset();

        // seta os atributos
        usuarioDAO.setData(
            usuarioDAO.autoIncrementID(), // id
            data.nome, // nome 
            data.email, // email
            data.senha, // senha
            data.perfil, // perfil
            data.datacadastro, // datacadastro
            null // dataedicao
        );

        var resp = indexedDBCtrl.add('usuario', data)
        
        return resp;
    },
    "atualizar": function (data) {
        // reset response
        usuarioDAO.reset();
        
        var resp = indexedDBCtrl.update('usuario', data)
        return resp;
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
        var ultimo = 0;
        
        indexedDBCtrl.getAll('usuario')
        .then(function resolve(result){
            if (result.data.length > 0) {
                for (var x in result.data) {
                    ultimo = result.data[x].id;
                    console.log(result.data[x].id);
                }
            }
        },function reject(result){
            //
        });
        // setTimeout(function () {
        //     if (response.success === false) return response;
        //     if (response.data.length > 0) {
        //         for (var x in response.data) {
        //             ultimo = response.data[x].id;
        //         }
        //     }
        // }, 100);
        return ultimo+1;
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