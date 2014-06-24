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



module.exports = router;
