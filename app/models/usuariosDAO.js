function UsuariosDAO(connection){
    this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("usuarios", function(err, collection){
            collection.insert(usuario);
            mongoclient.close();
        });
    });
}

UsuariosDAO.prototype.autenticar = function(usuario,req,res,errosValidacao){
    this._connection.open(function(error,mongoclient){
        mongoclient.collection('usuarios', function(error,collection){
            collection.find({usuario : {$eq : usuario.usuario},
                            senha : {$eq : usuario.senha}})
                            .toArray(function(error, results){
                                
                                if(results[0] != undefined){

                                    req.session.autorizado = true;
                                    req.session.usuario = results[0].usuario;
                                    req.session.casa = results[0].casa;

                                }

                                if(!req.session.autorizado){
                                    res.render('index', {validacao: errosValidacao})
                                    
                                } else {
                                    res.redirect("dashboard");
                                }

                            });
            
            mongoclient.close();
        })
    })
}

module.exports = function(){
    return UsuariosDAO;
}