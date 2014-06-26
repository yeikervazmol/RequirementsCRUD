var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/login', function(req, res) {
	var username 			= req.body.usuario;
	var password 			= req.body.clave;
	var db 					= req.db;
	var userCollection 		= db.get('usuario');
	var projectCollection 	= db.get('proyecto');
	userCollection.find({nombre: username, clave: password}, 'nombre', function(e,users){

		projectCollection.find({usuario: username}, {}, function(e,projects){
		    res.render('test0', 
			    {
			        usuarios: users,
			        proyectos: projects
			    }
			);
		});
	});
});

router.get('/requirements', function(req, res) {
	var project 				= req.param('proyecto');
	var username 				= req.param('usuario');
	var db 						= req.db;
	var requirementCollection 	= db.get('requerimiento');
	requirementCollection.find({usuario: username, proyecto: project}, 'nombre', function(e,requirements){

	    res.render('test1', 
		    {
		        proyecto 		: project,
		        requerimientos 	: requirements
		    }
		);
	});
});

router.get('/tasks', function(req, res) {
	var project 				= req.param('proyecto');
	var username 				= req.param('usuario');
	var requirement 			= req.param('requerimiento');
	var db 						= req.db;
	var requirementCollection 	= db.get('requerimiento');
	var taskCollection 			= db.get('tarea');
	requirementCollection.find({nombre: requirement, usuario: username, proyecto: project}, {}, function(e,requirements){
		taskCollection.find({usuario: username, proyecto: project, requerimiento: requirement}, {}, function(e,tasks){

		    res.render('test2', 
			    {
			        proyecto 		: project,
			        requerimiento 	: requirement,
			        descripcion 	: requirements[0].descripcion,
			        categoria 		: requirements[0].clasificacion,
			        tareas 			: tasks
			    }
			);
		});
	});
});

module.exports = router;
