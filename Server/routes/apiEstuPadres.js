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



router.post('/saveEstuPadres',function(req,res){

    var connection = mysql.createConnection(datos);
    var str='INSERT INTO estu_padres (cedula,ci_padre)VALUES("'+req.body.cedulaestu+'","'+req.body.cedula+'")';
    var str1='INSERT INTO estu_padres (cedula,ci_padre)VALUES("'+req.body.cedulaestu+'","'+req.body.cedulama+'")';
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

            }


        });

        connection.end();

    }catch(err){


    }


});


router.post('/updateEstuPadres',function(req,res){



    var connection = mysql.createConnection(datos);
    var str='UPDATE estu_padres SET cedula="'+req.body.cedula+'",cedula="'+req.body.ci_padre+'" where cedula="'+req.body.cedula+'" and ci_padre="'+req.body.ci_padre+'"';
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

router.post('/getParentsBySon',function(req,res){


    var connection = mysql.createConnection(datos);
    var str='SELECT * FROM estu_padres where cedula='+req.body.cedula;
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

router.post('/consultarpadres',function(req,res){


    var connection = mysql.createConnection(datos);
    var str='SELECT * FROM padres where ci_padre ='+req.body.cedula;
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

router.post('/getSonByParents',function(req,res){


    var connection = mysql.createConnection(datos);
    var str='SELECT * FROM estu_padres where ci_padre='+req.body.ci_padre;
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
router.post('/getAllEstuPadres',function(req,res){


    var connection = mysql.createConnection(datos);
    var str='SELECT * FROM estu_padres';
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