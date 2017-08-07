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





router.post('/saveNivel',function(req,res){

    var connection = mysql.createConnection(datos);
    var str='INSERT INTO nivel (descripcion_Nivel,precio)VALUES("'+req.body.descripcion_nivel+'","'+req.body.precio+'")';
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


router.post('/updateNivel',function(req,res){



    var connection = mysql.createConnection(datos);
    var str='UPDATE nivel SET descripcion_Nivel="'+req.body.descripcion_nivel+'",precio="'+req.body.precio+'"  where ID_Nivel='+req.body.id_nivel;
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

router.post('/getByIdNivel',function(req,res){


    var connection = mysql.createConnection(datos);
    var str='SELECT * FROM nivel where ID_Nivel='+req.body.id_nivel;
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


router.post('/getAllNivel',function(req,res){


    var connection = mysql.createConnection(datos);
    var str='SELECT * FROM nivel where estado='+0;
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
    //var str='SELECT * FROM paralelos where id_nivel='+req.body.id_nivel;
    var str='SELECT * FROM paralelos inner join para_personal on paralelos.`ID_PARALELO`= para_personal.ID_PARALELO_PER inner join personal on para_personal.CEDULA_PER=personal.CEDULA where paralelos.id_nivel="'+req.body.id_nivel+'" and paralelos.id_periodo="'+req.body.id_periodo+'" and paralelos.estado='+0;

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
    //var str='INSERT INTO `paralelos`(`DESCRIPCION_PARA`, `CANTIDAD_ESTU`, `ID_NIVEL`) VALUES ("'+req.body.descripcion_paralelo+'","'+req.body.cantidad+'","'+req.body.id_nivel+'")';
    var str='INSERT INTO `paralelos`(`DESCRIPCION_PARA`, `CANTIDAD_ESTU`, `ID_NIVEL`,`ID_PERIODO`) VALUES ("'+req.body.descripcion_paralelo+'","'+req.body.cantidad+'","'+req.body.id_nivel+'","'+req.body.id_periodo+'")';


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

router.post('/updateParalelos',function(req,res){

    var connection = mysql.createConnection(datos);

    var str='UPDATE `paralelos` SET `DESCRIPCION_PARA`="'+req.body.nom_para+'",`CANTIDAD_ESTU`="'+req.body.cantidad+'" WHERE id_paralelo="'+req.body.id_paralelo+'" and id_periodo='+req.body.id_periodo;


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

router.post('/getEliminarNivel',function(req,res){


    var connection = mysql.createConnection(datos);
    //var str='SELECT * FROM paralelos where id_nivel='+req.body.id_nivel;
   // var str='SELECT * FROM nivel where ID_Nivel='+req.body.id_nivel;
    var str = 'UPDATE `nivel` SET `ESTADO`='+1+' WHERE ID_NIVEL='+req.body.id_nivel;
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

router.post('/geteliminarParalelo',function(req,res){


    var connection = mysql.createConnection(datos);
    //var str='SELECT * FROM paralelos where id_nivel='+req.body.id_nivel;
    // var str='SELECT * FROM nivel where ID_Nivel='+req.body.id_nivel;
    var str = 'UPDATE `paralelos` SET `ESTADO`='+1+' WHERE ID_PARALELO='+req.body.id_paralelo;
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