/**
 * Created by xaipo on 5/11/2017.
 */
/**
 * Created by xaipo on 5/2/2017.
 */
var express= require('express');
var router= express.Router();
var datos= require('./conection');
var mysql= require('mysql');






router.post('/saveTipoPadres',function(req,res){

    var connection = mysql.createConnection(datos);
    var str='INSERT INTO tipo (descripcion_tipo)VALUES("'+req.body.descripcion_tipo+'")';
    console.log(str);
    try{
        connection.query(str, function (error, results, fields) {
            if (error) {
                res.send(error);
            }
            res.send(results);

        });

        connection.end();

    }catch(err){


    }


});


router.post('/updateTipoPadres',function(req,res){



    var connection = mysql.createConnection(datos);
    var str='UPDATE tipo SET descripcion_tipo="'+req.body.descripcion_tipo+'"where ID_TIPO='+req.body.id_tipo;
    console.log(str);
    try{
        connection.query(str, function (error, results, fields) {
            if (error) {
                res.send(error);
            }
            res.send(results);

        });

        connection.end();

    }catch(err){


    }

});

router.post('/getByIdTipoPadres',function(req,res){


    var connection = mysql.createConnection(datos);
    var str='SELECT * FROM tipo where ID_TIPO='+req.body.id_tipo;
    console.log(str);
    try{
        connection.query(str, function (error, results, fields) {
            if (error) {
                res.send(error);
            }
            res.send(results);

        });

        connection.end();

    }catch(err){


    }
});

router.post('/eliminarTipoPadre',function(req,res){


    var connection = mysql.createConnection(datos);
    //var str='SELECT * FROM tipo where ID_TIPO='+req.body.id_tipo;
    var str = 'UPDATE `tipo` SET `ESTADO`='+1+' WHERE ID_TIPO='+req.body.id_tipo;
    console.log(str);
    try{
        connection.query(str, function (error, results, fields) {
            if (error) {
                res.send(error);
            }
            res.send(results);

        });

        connection.end();

    }catch(err){


    }
});


router.post('/getAllTipoPadre',function(req,res){

console.log("hey");
    var connection = mysql.createConnection(datos);
    var str='SELECT * FROM tipo where estado ='+0;
    console.log(str);
    try{
        connection.query(str, function (error, results, fields) {
            if (error) {
                res.send(error);
            }
            res.send(results);

        });

        connection.end();

    }catch(err){


    }
});




module.exports=router;