/**
 * Created by Lench0 on 23/05/2017.
 */
/**
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






router.post('/saveNoticia',function(req,res){

    var connection = mysql.createConnection(datos);
    var str='INSERT INTO noticias (titulo,resumen,noticia,fecha_noticia)VALUES("'+req.body.titulo+'","'+req.body.resumen+'","'+req.body.noti+'","'+req.body.fecha_noti+'")';
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


router.post('/updateNoticias',function(req,res){



    var connection = mysql.createConnection(datos);
    var str='UPDATE `noticias` SET `TITULO`="'+req.body.titulo+'",`RESUMEN`="'+req.body.resumen+'",`NOTICIA`="'+req.body.noti+'",`FECHA_NOTICIA`="'+req.body.fecha+'" WHERE ID_NOTICIA ='+req.body.id_noti;

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




router.post('/getAllNoticias',function(req,res){


    var connection = mysql.createConnection(datos);
    var str='SELECT * FROM noticias WHERE ESTADO='+0;
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

router.post('/geteliminarNoticia',function(req,res){



    var connection = mysql.createConnection(datos);
    var str='UPDATE `noticias` SET `ESTADO`='+1+' WHERE ID_NOTICIA ='+req.body.id_noti;

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