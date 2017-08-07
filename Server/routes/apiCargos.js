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






router.post('/getsaveCargo',function(req,res){

    var connection = mysql.createConnection(datos);
    var str='INSERT INTO `cargo`(`DESCRIPCION`,`REMUNERACION`,`ALIMENTACION`,`FONDO`) VALUES ("'+req.body.descripcion+'","'+req.body.remuneracion+'","'+req.body.alimentacion+'","'+req.body.fondo+'")';


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


router.post('/updateCargo',function(req,res){



    var connection = mysql.createConnection(datos);
    var str='UPDATE  cargo SET descripcion="'+req.body.descripcion_cargo+'", remuneracion="'+req.body.remuneracion+'", alimentacion="'+req.body.alimentacion+'", fondo="'+req.body.fondo+'" where ID_CARGO='+req.body.id_cargo;
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


router.post('/getAllCargos',function(req,res){


    var connection = mysql.createConnection(datos);
    var str='SELECT * FROM cargo where estado ='+0;
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

router.post('/geteliminarCargo',function(req,res){


    var connection = mysql.createConnection(datos);
    //var str='SELECT * FROM tipo where ID_TIPO='+req.body.id_tipo;
    var str = 'UPDATE `cargo` SET `ESTADO`='+1+' WHERE ID_CARGO='+req.body.id_cargo;
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

router.post('/getSavePersonal',function(req,res){


    var connection = mysql.createConnection(datos);
    //var str='SELECT * FROM tipo where ID_TIPO='+req.body.id_tipo;
    var str = 'INSERT INTO `personal`(`CEDULA`, `NOMBRE`, `FECHA_NACI`, `DIRECCION_DOMI`, `CELULAR`, `FECHA_INGRESO_INST`, `CARGO`, `SUELDO`, `CONTRATO`, `APORTE_IESS`) VALUES ("'+req.body.cedula+'","'+req.body.nombres+'","'+req.body.fecha_naci+'","'+req.body.domicilio+'","'+req.body.celular+'","'+req.body.fecha_ingre+'","'+req.body.cargo+'","'+req.body.sueldo+'","'+req.body.contrato+'","'+req.body.aporte+'")';
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

router.post('/consultarCedulaPer',function(req,res){


    var connection = mysql.createConnection(datos);
    var str= "SELECT * FROM `personal` WHERE `CEDULA` ="+req.body.cedula;
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

router.post('/getAllPersonal',function(req,res){


    var connection = mysql.createConnection(datos);
    var str= "select personal.`CEDULA`, personal.`NOMBRE`, personal.`FECHA_NACI`,personal.`DIRECCION_DOMI`,personal.`CELULAR`,personal.`FECHA_INGRESO_INST`,cargo.`DESCRIPCION`,personal.`SUELDO`,personal.`CONTRATO`,personal.`APORTE_IESS` from personal inner join cargo on personal.CARGO=cargo.ID_CARGO WHERE personal.ESTADO="+0;
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

router.post('/getUpdatePersonal',function(req,res){



    var connection = mysql.createConnection(datos);
    var str='UPDATE `personal` SET `NOMBRE`="'+req.body.nombres+'",`FECHA_NACI`="'+req.body.fecha_naci+'",`DIRECCION_DOMI`="'+req.body.domicilio+'",`CELULAR`="'+req.body.celular+'",`FECHA_INGRESO_INST`="'+req.body.fecha_ingre+'",`CARGO`="'+req.body.cargo+'",`SUELDO`="'+req.body.sueldo+'",`CONTRATO`="'+req.body.contrato+'",`APORTE_IESS`="'+req.body.aporte+'" WHERE `CEDULA`='+req.body.cedula;

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

router.post('/getCargosDescripcion',function(req,res){



    var connection = mysql.createConnection(datos);
    var str='SELECT `ID_CARGO` FROM `cargo` WHERE `DESCRIPCION` = "'+req.body.descripcion+'"';
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

router.post('/geteliminarPersonal',function(req,res){


    var connection = mysql.createConnection(datos);
    //var str='SELECT * FROM tipo where ID_TIPO='+req.body.id_tipo;
    var str = 'UPDATE `personal` SET `ESTADO`='+1+' WHERE CEDULA='+req.body.cedula;
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

router.post('/getParalelos_Personal',function(req,res){


    var connection = mysql.createConnection(datos);
    //var str='SELECT * FROM tipo where ID_TIPO='+req.body.id_tipo;
    var str = 'INSERT INTO `para_personal`(`ID_PARALELO_PER`, `CEDULA_PER`) VALUES ("'+req.body.id_paralelo+'","'+req.body.cedula+'")';

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

router.post('/getUpdateParalelos_Personal',function(req,res){


    var connection = mysql.createConnection(datos);
    //var str='SELECT * FROM tipo where ID_TIPO='+req.body.id_tipo;
    var str = 'UPDATE `para_personal` SET `CEDULA_PER`="'+req.body.cedula+'" WHERE `ID_PARALELO_PER`="'+req.body.id_paralelo+'"';

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

router.post('/getUpdatePatronal',function(req,res){


    var connection = mysql.createConnection(datos);
    //var str='SELECT * FROM tipo where ID_TIPO='+req.body.id_tipo;
    var str = 'UPDATE `disponibilidad_matri` SET `APORTE_PATRONAL`="'+req.body.patronal+'" WHERE `COD`='+1;


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

router.post('/getUpdateAportePersonal',function(req,res){


    var connection = mysql.createConnection(datos);
    //var str='SELECT * FROM tipo where ID_TIPO='+req.body.id_tipo;
    var str = 'UPDATE `disponibilidad_matri` SET `APORTE_PERSONAL`="'+req.body.personal+'" WHERE `COD`='+1;


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


router.post('/getrolpagos',function(req,res){


    var connection = mysql.createConnection(datos);
    //var str='SELECT * FROM tipo where ID_TIPO='+req.body.id_tipo;
    var str = 'select * from personal inner join cargo on personal.`CARGO`=cargo.ID_CARGO where personal.CEDULA="'+req.body.cedula+'"';



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

router.post('/getAdelantoPersonalCedula',function(req,res){


    var connection = mysql.createConnection(datos);
    //var str='SELECT * FROM tipo where ID_TIPO='+req.body.id_tipo;
    //var str = 'UPDATE `personal` SET `SUELDO`='+req.body.adelanto+' WHERE `CEDULA`="'+req.body.cedula+'"';
    var str =' SELECT * FROM `personal` inner join cargo on personal.`CARGO`=cargo.ID_CARGO WHERE personal.CEDULA = "'+req.body.cedula+'"';



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

router.post('/getUpdateAdelanto',function(req,res){


    var connection = mysql.createConnection(datos);
    //var str='SELECT * FROM tipo where ID_TIPO='+req.body.id_tipo;
    var str = 'UPDATE `personal` SET `SUELDO`='+req.body.adelanto+' WHERE `CEDULA`="'+req.body.cedula+'"';



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