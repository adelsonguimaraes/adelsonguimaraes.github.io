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
    "atributos":[
        {'description':'id', 'index':'id', 'unique':true},
        {'description':'nome', 'index':'nome', 'unique':false},
        {'description':'email', 'index':'email', 'unique':false},
        {'description':'senha', 'index':'senha', 'unique':false},
        {'description':'perfil', 'index':'perfil', 'unique':false},
        {'description':'datacadastro', 'index':'datacastro', 'unique':false},
        {'description':'dataedicao', 'index':'dataedicao', 'unique':false}
    ],
    "setAtributos": function (data) {
        
    },
    "reset": function () {
        usuarioDAO.response.success = "";
        usuarioDAO.response.msg = "";
        usuarioDAO.response.data = "";
    },
    "cadastrar": function (data) {
        // reset response
        usuarioDAO.reset();

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
    "authentication": function (data) {
        // reset response
        // usuarioDAO.reset();
        var resp = indexedDBCtrl.getAll('usuario');

        setTimeout(function(){
            if (resp.success) {
                if (resp.data.length>1) {
                    for (var i in indexedDBCtrl.listItem) {
                        if (indexedDBCtrl.listItem[i].email === data.email && indexedDBCtrl.listItem[i].senha === data.senha) {
                            resp.msg = 'Usuário existe ' + indexedDBCtrl.listItem[i].nome;
                            resp.data = indexedDBCtrl.listItem[i];
                        }else{
                            resp.msg = 'Email ou Senha Inválidos!';
                        }
                    }
                }else{
                    resp.msg = 'Email ou Senha Inválidos!';
                }
            }else{
                resp.msg = 'Ocorreu um erro na operação com o banco!';
            }
        }, 300);
        
        return resp;
    }
}