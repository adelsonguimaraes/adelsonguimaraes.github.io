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
    "reset": function () {
        usuarioDAO.response.success = "";
        usuarioDAO.response.msg = "";
        usuarioDAO.response.data = "";
    },
    "cadastrar": function (data) {
        // reset response
        usuarioDAO.reset();

        indexedDBCtrl.add('usuario', data)
        .then(function success(result) {
            usuarioDAO.response.set(result.success, result.msg, result.data);
        },function error(result) {
            usuarioDAO.response.set(result.success, result.msg, result.data);
        });
        return usuarioDAO.response;
    },
    "atualizar": function (data) {
        // reset response
        usuarioDAO.reset();
        
        indexedDBCtrl.update('usuario', data)
        .then(function success(result) {
            usuarioDAO.response.set(result.success, result.msg, result.data);
        },function error(result) {
            usuarioDAO.response.set(result.success, result.msg, result.data);
        });
        return usuarioDAO.response;
    },
    "buscarPorId": function (data) {
        // reset response
        usuarioDAO.reset();

        indexedDBCtrl.getPorId('usuario', +data.id)
        .then(function success(result) {
            usuarioDAO.response.set(result.success, result.msg, result.data);
        },function error(result) {
            usuarioDAO.response.set(result.success, result.msg, result.data);
        });
        return usuarioDAO.response;
    },
    "listarTodos": function () {
        // reset response
        usuarioDAO.reset();
        var response;

        indexedDBCtrl.getAll('usuario')
        .then(function success(result){
            response = {"success":result.success, "msg":result.msg, "data":result.data};
        },function error(result) {
            response = {"success":result.success, "msg":result.msg, "data":result.data};
        });
        return response;
    },
    "authentication": function (data) {
        // reset response
        usuarioDAO.reset();

        indexedDBCtrl.getAll('usuario')
            .then(function success(result){
                for (var i in indexedDBCtrl.listItem) {
                    if (indexedDBCtrl.listItem[i].email === data.email && indexedDBCtrl.listItem[i].senha === data.senha) {
                        usuarioDAO.response.set(true, 'Usuário existe ' + indexedDBCtrl.listItem[i].nousuarioDAO, indexedDBCtrl.listItem[i]);
                    }else{
                        usuarioDAO.response.set(false, 'Email ou Senha Inválidos! ', '');
                    }
                }
            },function error(result) {
                usuarioDAO.response = result;
            });
        return usuarioDAO.response;
    }
}