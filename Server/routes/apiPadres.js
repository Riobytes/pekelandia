/**
 * Created by xaipo on 5/11/2017.
 */
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





router.post('/savePadres',function(req,res){

    var connection = mysql.createConnection(datos);
    var str='INSERT INTO padres (ci_padre,id_tipo,nombre,lugar_trabajo,direccion_trabajo,tel_padre,email,direccion_domicilio,tipo_vivienda,tel_aux)VALUES("'+req.body.cedulapa+'","'+req.body.id_tipopa+'","'+req.body.nombrepa+'","'+req.body.lugarpa+'","'+req.body.direccion_trapa+'","'+req.body.telefonopa+'","'+req.body.emailpa+'","'+req.body.domiciliopa+'","'+req.body.tipo_vipa+'","'+req.body.teauxpa+'")';
    var str1='INSERT INTO padres (ci_padre,id_tipo,nombre,lugar_trabajo,direccion_trabajo,tel_padre,email,direccion_domicilio,tipo_vivienda,tel_aux)VALUES("'+req.body.cedulama+'","'+req.body.id_tipoma+'","'+req.body.nombrema+'","'+req.body.lugartrama+'","'+req.body.direccion_trama+'","'+req.body.telefonoma+'","'+req.body.emailma+'","'+req.body.domicilioma+'","'+req.body.tipo_vima+'","'+req.body.teauxma+'")';
    console.log(str);
    console.log(str1);
    try{
        connection.query(str, function (error, results, fields) {
            if (error) {
                res.send(error);
            }
            res.send(results);

        });

        connection.query(str1, function (error, results, fields) {
            if (error) {
                res.send(error);
            }


        });

        connection.end();

    }catch(err){


    }


});


router.post('/updatePadres',function(req,res){



    var connection = mysql.createConnection(datos);
    var str='UPDATE padres SET id_tipo="'+req.body.id_tipopa+'",nombre="'+req.body.nombrepa+'",lugar_trabajo="'+req.body.lugarpa+'" ,direccion_trabajo= "'+req.body.direccion_trapa+'" ,tel_padre="'+req.body.telefonopa+'" ,email="'+req.body.emailpa+'" ,direccion_domicilio="'+req.body.domiciliopa+'",tipo_vivienda="'+req.body.tipo_vipa+'",tel_aux="'+req.body.teauxpa+'" where ci_padre="'+req.body.cedulapa+'"';
    var str1='UPDATE padres SET id_tipo="'+req.body.id_tipoma+'",nombre="'+req.body.nombrema+'",lugar_trabajo="'+req.body.lugartrama+'" ,direccion_trabajo= "'+req.body.direccion_trama+'" ,tel_padre="'+req.body.telefonoma+'",email="'+req.body.emailma+'" ,direccion_domicilio="'+req.body.domicilioma+'" ,tipo_vivienda="'+req.body.tipo_vima+'",tel_aux="'+req.body.teauxma+'" where ci_padre="'+req.body.cedulama+'"';
    console.log(str);
    console.log(str1);
    try{
        connection.query(str, function (error, results, fields) {
            if (error) {
                res.send(error);
            }
            res.send(results);

        });



        connection.query(str1, function (error, results, fields) {
            if (error) {
                res.send(error);
            }


        });
        connection.end();

    }catch(err){


    }

});

router.post('/getByIdPadres',function(req,res){


    var connection = mysql.createConnection(datos);
    var str='SELECT * FROM padres where ci_padre="'+req.body.ci_padre+'"';
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


router.post('/getAllPadres',function(req,res){


    var connection = mysql.createConnection(datos);
    var str='SELECT * FROM padres';
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