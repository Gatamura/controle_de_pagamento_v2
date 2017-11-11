module.exports = function(application){
	application.get('/dashboard', function(req, res){
		application.app.controllers.dashboard.dashboard(application,req,res);
	});

	application.get('/sair', function(req,res){
		application.app.controllers.dashboard.sair(application,req,res);
	})
}

