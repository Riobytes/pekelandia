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


/*pendiente*/

router.post('/saveEstudiantes',function(req,res){

    var connection = mysql.createConnection(datos);


    var str='INSERT INTO estudiantes ( CEDULA, ID_JORNADA, ID_REFRIGERIO, NOMBRE, FECHA_NACIMIENTO, ANIOS, MESES,DIAS, SEXO, TALLA, PESO, TORAX, ALIMENTOS_EXCLUIDOS, PROBLEMAS_SALUD, ALERGIAS, MEDICACION, PEDIATRA, TEL_PEDIATRA, PERSO_RECIBIR_NINO, TEL_EMERGENCIA, OBSERVACIONES, CENTRO_EDU_ANTERIOR) VALUES' +
        '( "'+req.body.cedula+'", "'+req.body.id_jornada+'","'+req.body.id_refrigerio+'" , "'+req.body.nombre+'", "'+req.body.fecha_naci+'", '+req.body.años+', '+req.body.meses+','+req.body.dias+',"'+req.body.sexo+'", "'+req.body.talla+'","'+req.body.peso+'", "'+req.body.torax+'", "'+req.body.alimentos_excluidos+'", "'+req.body.problemas_salud+'", "'+req.body.alergias+'", "'+req.body.medicacion+'", "'+req.body.pediatra+'", "'+req.body.tel_pediatra+'", "'+req.body.perso_recibir_ninios+'", "'+req.body.tel_emergencia+'", "'+req.body.observaciones+'", "'+req.body.centro_edu_anterior+'")';


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


router.post('/updateEstudiantes',function(req,res){


    var connection = mysql.createConnection(datos);


    var str ='UPDATE `estudiantes` SET `ID_JORNADA`= "'+req.body.id_jornada+'",`ID_REFRIGERIO`="'+req.body.id_refrigerio+'" ,`NOMBRE`="'+req.body.nombre+'",`FECHA_NACIMIENTO`="'+req.body.fecha_naci+'",`ANIOS`='+req.body.años+',`MESES`='+req.body.meses+',`DIAS`='+req.body.dias+',`SEXO`="'+req.body.sexo+'",`TALLA`="'+req.body.talla+'",`PESO`="'+req.body.peso+'",`TORAX`="'+req.body.torax+'",`ALIMENTOS_EXCLUIDOS`="'+req.body.alimentos_excluidos+'",`PROBLEMAS_SALUD`="'+req.body.problemas_salud+'",`ALERGIAS`="'+req.body.alergias+'",`MEDICACION`="'+req.body.medicacion+'",`PEDIATRA`="'+req.body.pediatra+'",`TEL_PEDIATRA`="'+req.body.tel_pediatra+'",`PERSO_RECIBIR_NINO`="'+req.body.perso_recibir_ninios+'",`TEL_EMERGENCIA`="'+req.body.tel_emergencia+'",`OBSERVACIONES`="'+req.body.observaciones+'",`CENTRO_EDU_ANTERIOR`="'+req.body.centro_edu_anterior+'" WHERE `CEDULA` = "'+req.body.cedula+'"';
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

router.post('/getByIdUsuario',function(req,res){


    var connection = mysql.createConnection(datos);
    var str='SELECT * FROM usuarios where CODIGO='+req.body.codigo;
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


router.post('/getAllEstudiantes',function(req,res){


    var connection = mysql.createConnection(datos);
    var str='SELECT * FROM `estudiantes`';
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