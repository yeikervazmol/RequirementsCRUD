var express = require('express');
var router = express.Router();

// Aqui se autentica al usuario de forma sencilla y se obtienen sus proyectos.
router.post('/login', function(req, res) {
	
	var username 			= req.body.usuario;
	var password 			= req.body.clave;
	var db 					= req.db;
	var userCollection 		= db.get('usuario');
	var projectCollection 	= db.get('proyecto');

	userCollection.findOne(
		{nombre: username, clave: password}, 
		function(e,user){

		if(user == null){
			// Caso en el que el usuario no ha sido autenticado.

			return res.json(
			//return res.render('test0',
				    {
				        usuario: "Usuario no autorizado"
				    }
				);
		} else {

			projectCollection.find(
				{usuario: username}, 
				function(e,projects){

			    return res.render('test0', 
			    //res.json(
				    {
				        usuario: user.nombre,
				        proyectos: projects
				    }
				);
			});
		}
	});
});


// Insertar un proyecto a un usuario en la base de datos.
router.post('/addproject', function(req, res) {

    var db 					= req.db;
	var projectName 		= req.body.proyecto;
    var username 			= req.body.usuario;
    var projectCollection 	= db.get('proyecto');

    projectCollection.insert({
        "nombre"    : projectName,
        "usuario"   : username
    }, function (err, doc) {

        if (err) {
            res.send("The database has defended itself against the dark magic.");
        }
        else {

        	res.json(doc);
        }
    });
});


// Se obtienen los requerimientos asociados a un usuario y proyecto dado.
router.get('/requirements', function(req, res) {
	
	var project 				= req.param('proyecto');
	var username 				= req.param('usuario');
	var db 						= req.db;
	var requirementCollection 	= db.get('requerimiento');

	requirementCollection.find(
		{usuario: username, proyecto: project}, 
		'nombre', 
		function(e,requirements){

	    res.render('test1', 
		    {
		        proyecto 		: project,
		        requerimientos 	: requirements
		    }
		);
	});
});


// Insertar un requerimiento asociado a un usuario y proyecto en la 
// base de datos.
router.post('/addrequirement', function(req, res) {

    var db 						= req.db;
	var requirementName 		= req.body.requerimiento;
	var description 			= req.body.descripcion;
    var projectName 			= req.body.proyecto;
    var username 		    	= req.body.usuario;
    var clasificacion 			= req.body.clasificacion;
    var requirementCollection 	= db.get('requerimiento');

    requirementCollection.insert({
        "nombre"        : requirementName,
        "descripcion"   : description,
        "proyecto"      : projectName,
        "usuario"       : username,
        "clasificacion" : clasificacion
        
    }, function (err, doc) {
        if (err) {
            res.send("The database has defended itself against the dark magic.");
        }
        else {
            res.json(doc);
        }
    });
});


// Eliminar un requerimiento (sus tareas incluidas) asociado a un usuario 
// y proyecto en la base de datos.
router.delete('/deleterequirement', function(req, res) {

    var db                      = req.db;
    var requirementName 	    = req.param('requerimiento');
    var projectName 		    = req.param('proyecto');
    var username 		        = req.param('usuario');
    var taskCollection          = db.get('tarea');
    var requirementCollection 	= db.get('requerimiento');

    // Aqui se eliminan todas las tareas asociadas al requerimiento que se eliminara.
    taskCollection.remove(
    	{	requerimiento 	: requirementName, 
    		proyecto 		: projectName, 
    		usuario 		: username
    	}, 
    	function (err, result) {

	        if (err) {
	            res.send("The database has defended itself against the dark magic.");
	        }
	        else {

	        	requirementCollection.remove(
			    	{	nombre 			: requirementName, 
			    		proyecto 		: projectName, 
			    		usuario 		: username
			    	}, function (err1, result1){
			    		if (err) {
			    			res.send(
			    				"Solo se borraron las tareas de este proyecto."
			    			);
			    		} else {
			    			res.json(
			    			{
			    				proyectoBorrado: result1,
			    				tareasBorradas: result
			    			}
			    			);
			    		}
			    	});
	        }
    });

});


// Se obtienen las tareas asociadas a un usuario, proyecto y requerimiento 
// dado.
router.get('/tasks', function(req, res) {
	
	var project 				= req.param('proyecto');
	var username 				= req.param('usuario');
	var requirementName 		= req.param('requerimiento');
	var db 						= req.db;
	var requirementCollection 	= db.get('requerimiento');
	var taskCollection 			= db.get('tarea');

	requirementCollection.findOne(
		{nombre: requirementName, usuario: username, proyecto: project}, 
		function(e,requirement){

		taskCollection.find(
			{usuario: username, proyecto: project, requerimiento: requirementName}, 
			function(e,tasks){

		    res.render('test2', 
			    {
			        proyecto 		: project,
			        requerimiento 	: requirementName,
			        descripcion 	: requirement.descripcion,
			        categoria 		: requirement.clasificacion,
			        tareas 			: tasks
			    }
			);
		});
	});
});


// Insertar una tarea asociado a un usuario, requerimiento y proyecto en la
// base de datos.
router.post('/addtask', function(req, res) {

    var db                  = req.db;
	var taskName 	        = req.body.tarea;
	var description 		= req.body.descripcion;
    var requirementName 	= req.body.requerimiento;
    var projectName 		= req.body.proyecto;
    var username 		    = req.body.usuario;
    var taskCollection 		= db.get('tarea');

    taskCollection.insert({
        "nombre"        : taskName,
        "descripcion"   : description,
        "requerimiento" : requirementName,
        "proyecto"      : projectName,
        "usuario"       : username
    }, function (err, doc) {
        if (err) {
            res.send("The database has defended itself against the dark magic.");
        }
        else {
            res.json(doc);
        }
    });
});


// Eliminar una tarea asociado a un usuario, requerimiento y proyecto en la 
// base de datos.
router.delete('/deletetask', function(req, res) {

    var db                      = req.db;
    var requirementName 	    = req.param('requerimiento');
    var projectName 		    = req.param('proyecto');
    var username 		        = req.param('usuario');
    var taskName 				= req.param('tarea');
    var taskCollection          = db.get('tarea');

    taskCollection.remove(
    	{	nombre 			: taskName, 
    		requerimiento 	: requirementName, 
    		proyecto 		: projectName, 
    		usuario 		: username
    	}, 
    	function (err, result) {

	        if (err) {
	            res.send("The database has defended itself against the dark magic.");
	        }
	        else {

	        	res.json(result);
	        }
    });

});

module.exports = router;
