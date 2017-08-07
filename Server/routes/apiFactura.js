var express= require('express');
var router= express.Router();
var datos= require('./conection');
var mysql= require('mysql');





router.post('/insertardatosfac',function(req,res){

        var connection = mysql.createConnection(datos);
        var str='INSERT INTO `factura`(`CI_PADRE`, `RUC`, `NUM_AUTORIZACION`, `NOMBRE_EMPRESA`, `DIRECCION_EMPRE`, `TELF_EMPRESA`,`NUM_FAC`) VALUES ("'+req.body.cedula+'","'+req.body.ruc+'","'+req.body.num_autorizacion+'","'+req.body.nombre_empresa+'","'+req.body.direccion_empresa+'","'+req.body.telf_empresa+'","'+req.body.num_fac+'") ';
        console.log(str);
        //console.log(str1);
        try{
            connection.query(str, function (error, results, fields) {
                if (error) {
                    res.send(error);
                }
                res.send(results);

            });

            /*  connection.query(str1, function (error, results, fields) {
             if (error) {
             res.send(error);
             }


             });*/

            connection.end();

        }catch(err){


        }


});

router.post('/getconsultadatosinstituto',function(req,res){

    var connection = mysql.createConnection(datos);
    var str='SELECT * FROM `instituto`';
    console.log(str);
    //console.log(str1);
    try{
        connection.query(str, function (error, results, fields) {
            if (error) {
                res.send(error);
            }
            res.send(results);

        });

        /*  connection.query(str1, function (error, results, fields) {
         if (error) {
         res.send(error);
         }


         });*/

        connection.end();

    }catch(err){


    }


});

router.post('/aumentarNum_Actual',function(req,res){

    var connection = mysql.createConnection(datos);
    var str='UPDATE `instituto` SET `NUM_ACTUAL`="'+req.body.num_actual+'" WHERE `ID_INSTITUTO`='+ 1;
    console.log(str);
    //console.log(str1);
    try{
        connection.query(str, function (error, results, fields) {
            if (error) {
                res.send(error);
            }
            res.send(results);

        });

        /*  connection.query(str1, function (error, results, fields) {
         if (error) {
         res.send(error);
         }


         });*/

        connection.end();

    }catch(err){


    }


});

router.post('/insertardatosdetallefac',function(req,res){

    var connection = mysql.createConnection(datos);
    var str='INSERT INTO `detalle_fac`(`ID_REFRIGERIO`, `ID_FACTURA`, `ID_MATRICULA`, `FECHA`, `CANTIDAD`, `VALOR_UNITARIO`, `IVA`, `HORA`, `SUB_TOTAL`, `TOTAL_FACTURA`) VALUES ("'+req.body.id_refrigerio+'","'+req.body.id_factura+'","'+req.body.id_matricula+'","'+req.body.fecha+'","'+req.body.cantidad+'","'+req.body.valor_unitario+'","'+req.body.iva+'","'+req.body.hora+'","'+req.body.v_total+'","'+req.body.total_factura+'")'
    console.log(str);
    //console.log(str1);
    try{
        connection.query(str, function (error, results, fields) {
            if (error) {
                res.send(error);
            }
            res.send(results);

        });

        /*  connection.query(str1, function (error, results, fields) {
         if (error) {
         res.send(error);
         }


         });*/

        connection.end();

    }catch(err){


    }


});




module.exports=router;