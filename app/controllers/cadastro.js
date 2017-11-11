module.exports.cadastro = function(application,req,res){
    res.render('cadastro', {validacao: {}, dadosFOrm: {}});
}

module.exports.cadastrar = function(application,req,res){
    var dadosForm = req.body;
    
            req.assert('nome', 'nome nao pode ser vazio').notEmpty();
            req.assert('usuario', 'usuario nao pode ser vazio').notEmpty();
            req.assert('senha', 'senha nao pode ser vazio').notEmpty();
    
            var erros = req.validationErrors();
    
            if(erros){
                res.render('cadastro', {validacao : erros,dadosForm})
                return;
            }

            var connection = application.config.dbConnection;
            var UsuariosDAO = new application.app.models.usuariosDAO(connection);

            UsuariosDAO.inserirUsuario(dadosForm);
    
                res.send('PODEMOS CADASTRAR')
            
            
    
}