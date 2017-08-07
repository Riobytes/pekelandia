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



    router.post('/saveJornada',function(req,res){

    var connection = mysql.createConnection(datos);
    var str='INSERT INTO jornada (DESCRIPCION_JORNADA)VALUES("'+req.body.descripcion_jornada+'")';
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


router.post('/updateJornada',function(req,res){



    var connection = mysql.createConnection(datos);
    var str='UPDATE jornada SET DESCRIPCION_JORNADA="'+req.body.descripcion_jornada+'" where ID_JORNADA='+req.body.id_jornada;
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

router.post('/getByIdJornada',function(req,res){


    var connection = mysql.createConnection(datos);
    var str='SELECT * FROM jornada where ID_JORNADA='+req.body.id_jornada;
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


router.post('/getAllJornada',function(req,res){


    var connection = mysql.createConnection(datos);
    var str='SELECT * FROM jornada where ESTADO = '+0;
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

router.post('/eliminarJornada', function (req, res) {


    var connection = mysql.createConnection(datos);
    var str = 'UPDATE `jornada` SET `ESTADO`= '+1+' where ID_JORNADA=' + req.body.id_jornada;

    console.log(str);
    try {
        connection.query(str, function (error, results, fields) {
            if (error) {
                res.send(error);
            }
            res.send(results);

        });

        connection.end();

    } catch (err) {


    }

});


module.exports=router;