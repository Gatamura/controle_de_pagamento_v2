module.exports.dashboard = function(application,req,res){
    
    if(req.session.autorizado){
        res.render('dashboard')
    } else {
        res.send('usuario precisa fazer login')
    }

}

module.exports.sair = function(application,req,res){

    req.session.destroy(function(error){
        res.render('index',{validacao: {}});    
    });

}