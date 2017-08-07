/**
 * Created by xaipo on 5/11/2017.
 */
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





router.post('/savePeriodo',function(req,res){

    var connection = mysql.createConnection(datos);
    var str='INSERT INTO periodo (descripcion_peri)VALUES("'+req.body.descripcion+'")';
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


router.post('/updatePeriodoActual',function(req,res){



    var connection = mysql.createConnection(datos);
    var str='UPDATE disponibilidad_matri SET id_periodo="'+req.body.id_periodo+'" where cod ='+1;
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

router.post('/getIdPeriodo',function(req,res){


    var connection = mysql.createConnection(datos);
    var str='SELECT * FROM periodo where ID_PERIODO='+req.body.id_periodo;
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


router.post('/getAllPeriodos',function(req,res){


    var connection = mysql.createConnection(datos);
    var str='SELECT * FROM periodo';
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

router.post('/getParalelos_Nivel',function(req,res){


    var connection = mysql.createConnection(datos);
    var str='SELECT * FROM paralelos where id_nivel='+req.body.id_nivel;
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

router.post('/getSaveParalelos',function(req,res){

    var connection = mysql.createConnection(datos);
    var str='INSERT INTO `paralelos`(`DESCRIPCION_PARA`, `CANTIDAD_ESTU`, `ID_NIVEL`) VALUES ("'+req.body.descripcion_paralelo+'","'+req.body.cantidad+'","'+req.body.id_nivel+'")';


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