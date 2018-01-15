const categoriaDAO = {
    "response":{
        "success":false,
        "msg":"",
        "data":"",
        "set": function (s, m, d) {
            categoriaDAO.success = s;
            categoriaDAO.msg = m;
            categoriaDAO.data = d;
        }
    },
    "reset": function () {
        categoriaDAO.response.success = false;
        categoriaDAO.response.msg = "";
        categoriaDAO.response.data = "";
    },
    "cadastrar": function (data) {
        // reset response
        categoriaDAO.reset();

        indexedDBCtrl.add('categoria', data)
        .then(function success(result) {
            categoriaDAO.response.set(result.success, result.msg, result.data);
        },function error(result) {
            categoriaDAO.response.set(result.success, result.msg, result.data);
        });
        return categoriaDAO.response;
    },
    "atualizar": function (data) {
        // reset response
        categoriaDAO.reset();
        
        indexedDBCtrl.update('categoria', data)
        .then(function success(result) {
            categoriaDAO.response.set(result.success, result.msg, result.data);
        },function error(result) {
            categoriaDAO.response.set(result.success, result.msg, result.data);
        });
        return categoriaDAO.response;
    },
    "buscarPorId": function (data) {
        // reset response
        categoriaDAO.reset();

        indexedDBCtrl.getPorId('categoria', +data.id)
        .then(function success(result) {
            categoriaDAO.response.set(result.success, result.msg, result.data);
        },function error(result) {
            categoriaDAO.response.set(result.success, result.msg, result.data);
        });
        return categoriaDAO.response;
    },
    "listarTodos": function () {
        // reset response
        categoriaDAO.reset();

        indexedDBCtrl.getAll('categoria')
        .then(function success(result){
            categoriaDAO.response.set(result.success, result.msg, result.data);
        },function error(result) {
            categoriaDAO.response.set(result.success, result.msg, result.data);
        });
        return categoriaDAO.response;
    }
}