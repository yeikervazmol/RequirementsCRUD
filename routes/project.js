var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('proyecto');
    collection.find({},{},function(e,projects){
        // test.html -> Para pruebas
        res.render('test', 
        {
            proyectos: projects
        }
    );

    });
});

// Luego ":projectName" realmente va a ser _id del proyecto
router.get('/:projectName', function(req, res) {
    var projectName = req.param('projectName');
    console.log(projectName);
    var db = req.db;
    var collection = db.get('requerimiento');
    collection.find({proyecto: projectName}, 'nombre',function(e,requirements){
        console.log(requirements);
        // test.html -> Para pruebas
        res.render('test', 
        {
            requerimientos: requirements
        }
    );

    });
});


module.exports = router;