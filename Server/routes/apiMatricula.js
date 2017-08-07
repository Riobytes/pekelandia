
/**
 * Created by xaipo on 5/2/2017.
 */
var express= require('express');
var router= express.Router();
var datos= require('./conection');
var mysql= require('mysql');





router.post('/saveMatricula',function(req,res){

    var connection = mysql.createConnection(datos);
    var str='INSERT INTO matricula (cedula,id_nivel,fecha,estado_mat,id_periodo)VALUES("'+req.body.cedula+'","'+req.body.id_nivel+'","'+req.body.fecha+'","'+req.body.estado+'","'+req.body.id_periodo+'")';
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



router.post('/getByIdMatricula',function(req,res){


    var connection = mysql.createConnection(datos);
    var str='SELECT * FROM matricula where id_matricula="'+req.body.id_matricula+'"';
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

router.post('/getByStateMatricula',function(req,res){


    var connection = mysql.createConnection(datos);
    var str='SELECT * FROM matricula where estado_mat="'+req.body.estado_mat+'"';
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

router.post('/getByStateAndDateMatricula',function(req,res){


    var connection = mysql.createConnection(datos);
    var str='SELECT * FROM matricula where estado_mat="'+req.body.estado_mat+'"and fecha="'+req.body.fecha+'"';
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

router.post('/getAllMatricula',function(req,res){


    var connection = mysql.createConnection(datos);
    var str='SELECT * FROM matricula';
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

router.post('/updateEstadoMatricula',function(req,res){



    var connection = mysql.createConnection(datos);
    var str='UPDATE disponibilidad_matri SET estado="'+req.body.estado+'"where cod='+1;
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

router.post('/updateMatricula',function(req,res){



    var connection = mysql.createConnection(datos);
    var str='UPDATE `matricula` SET `ID_NIVEL`= "'+req.body.id_nivel+'",`FECHA`="'+req.body.fecha+'",`ESTADO_MAT`="'+req.body.estado+'" WHERE `CEDULA` = "'+req.body.cedula+'" and ID_PERIODO='+req.body.id_periodo;
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

router.post('/saveEstadoMatricula',function(req,res){

    var connection = mysql.createConnection(datos);
    var str='INSERT INTO disponibilidad_matri (estado)VALUES("'+req.body.estado+'")';
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


router.post('/getAllEstadoMatricula',function(req,res){

    console.log("hey");
    var connection = mysql.createConnection(datos);
    var str='SELECT * FROM disponibilidad_matri';
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

router.post('/consultarCedula',function(req,res){


    var connection = mysql.createConnection(datos);
    var str= "SELECT * FROM `estudiantes` WHERE `CEDULA` ="+req.body.cedula;
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

router.post('/getMat_Estu',function(req,res){


    var connection = mysql.createConnection(datos);
    var str= 'select estudiantes.CEDULA,estudiantes.NOMBRE,estudiantes.ANIOS,estudiantes.MESES,estudiantes.TEL_EMERGENCIA,matricula.FECHA,matricula.ESTADO_MAT from estudiantes inner join matricula on estudiantes.CEDULA=matricula.cedula inner join nivel on matricula.ID_NIVEL=nivel.ID_NIVEL where nivel.ID_NIVEL="'+req.body.id_nivel+'" and matricula.ESTADO_MAT="'+req.body.estado+'"and matricula.ID_PERIODO="'+req.body.id_periodo+'"';
    //var str= 'select estudiantes.CEDULA,estudiantes.NOMBRE,estudiantes.ANIOS,estudiantes.MESES,estudiantes.TEL_EMERGENCIA,matricula.FECHA,matricula.ESTADO_MAT from estudiantes inner join matricula on estudiantes.CEDULA=matricula.cedula inner join nivel on matricula.ID_NIVEL=nivel.ID_NIVEL where nivel.ID_NIVEL="'+req.body.id_nivel+'" and matricula.ESTADO_MAT="'+req.body.estado+'"';
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

router.post('/getMat_Estu_Para',function(req,res){


    var connection = mysql.createConnection(datos);
   // var str= 'select estudiantes.CEDULA,estudiantes.NOMBRE,estudiantes.ANIOS,estudiantes.MESES,estudiantes.TEL_EMERGENCIA,matricula.FECHA,matricula.ESTADO_MAT from estudiantes inner join matricula on estudiantes.CEDULA=matricula.cedula inner join nivel on matricula.ID_NIVEL=nivel.ID_NIVEL where nivel.ID_NIVEL="'+req.body.id_nivel+'" and matricula.ID_PARALELO="'+req.body.paralelo+'" and matricula.ID_PERIODO="'+req.body.id_periodo+'"';
    var str= 'select estudiantes.CEDULA,estudiantes.NOMBRE,estudiantes.ANIOS,estudiantes.MESES,estudiantes.TEL_EMERGENCIA,matricula.FECHA,matricula.ESTADO_MAT, personal.NOMBRE as NOMBRE_PER, estudiantes.FECHA_NACIMIENTO, estudiantes.PESO, estudiantes.TALLA, estudiantes.ALIMENTOS_EXCLUIDOS from estudiantes inner join matricula on estudiantes.CEDULA=matricula.cedula inner join nivel on matricula.ID_NIVEL=nivel.ID_NIVEL inner join paralelos on matricula.ID_PARALELO = paralelos.ID_PARALELO inner join para_personal on paralelos.ID_PARALELO = para_personal.ID_PARALELO_PER inner join personal on para_personal.CEDULA_PER=personal.CEDULA where nivel.ID_NIVEL="'+req.body.id_nivel+'" and matricula.ID_PARALELO="'+req.body.paralelo+'" and matricula.ID_PERIODO="'+req.body.id_periodo+'"';


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

router.post('/getAsig_Estu_Para',function(req,res){



    var connection = mysql.createConnection(datos);
    //var str='UPDATE `MATRICULA` SET `ESTADO_MAT`="'+req.body.estado+'",`ID_PARALELO`="'+req.body.paralelo+'" WHERE `CEDULA` = "'+req.body.cedula+'"';
    var str='UPDATE `matricula` SET `ESTADO_MAT`="'+req.body.estado+'",`ID_PARALELO`="'+req.body.paralelo+'" WHERE `CEDULA` = "'+req.body.cedula+'" and ID_PERIODO = "'+req.body.id_periodo+'"';
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

router.post('/getParaleloId',function(req,res){



    var connection = mysql.createConnection(datos);
   // var str='SELECT `ID_PARALELO`, `DESCRIPCION_PARA`, `CANTIDAD_ESTU`, `ID_NIVEL` FROM `paralelos` WHERE `ID_PARALELO` ='+req.body.paralelo;
    var str='SELECT `ID_PARALELO`, `DESCRIPCION_PARA`, `CANTIDAD_ESTU`, `ID_NIVEL` FROM `paralelos` WHERE `ID_PARALELO` ="'+req.body.paralelo+'"and ID_PERIODO ='+ req.body.id_periodo;
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

router.post('/getMatriculaCed_Idnivel',function(req,res){



    var connection = mysql.createConnection(datos);
    var str='SELECT * FROM `matricula` WHERE `CEDULA`="'+req.body.cedula+'" and `ID_NIVEL`='+req.body.id_nivel;

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

router.post('/getMatriculaxCedula',function(req,res){



    var connection = mysql.createConnection(datos);
    var str='SELECT * FROM `matricula` WHERE `CEDULA`='+req.body.cedula;

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

router.post('/getMatriculaxCedulaPeriodo',function(req,res){



    var connection = mysql.createConnection(datos);
    var str='SELECT * FROM `matricula` WHERE `CEDULA`="'+req.body.cedula+'" and `ID_PERIODO`='+req.body.id_periodo;

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

router.post('/getReporte',function(req,res){



    var connection = mysql.createConnection(datos);
    var str='SELECT * FROM `estu_padres` inner join padres on estu_padres.CI_PADRE=padres.CI_PADRE WHERE estu_padres.CEDULA="'+req.body.cedula+'" ORDER BY padres.ID_TIPO';




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