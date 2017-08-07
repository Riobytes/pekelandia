/**
 * Created by xaipo on 5/2/2017.
 */
var express = require('express');
var router = express.Router();
var datos = require('./conection');
var mysql = require('mysql');







router.post('/login', function (req, res) {

    var connection = mysql.createConnection(datos);
    var str = 'SELECT * from usuarios where USER="' + req.body.user + '"and CONTRASENIA="' + req.body.password + '"';

    connection.query(str, function (error, results, fields) {
        if (error) {
            res.send(error);
        }
        //add tokens
        var currentUser = JSON.stringify(results);
        console.log(JSON.parse(currentUser));
        var datab=JSON.parse(currentUser);
        var datauser=datab[0];
        console.log(datauser);
      //  const token = jwt.sign(datauser, "shhhhh");
        const token = jwt.sign(datauser, "shhhhh", {
            expiresIn: 604800 //1 semana
        });
        //console.log(token);
        res.send([{
            success: true,
            token: 'JWT' + token,
            user: currentUser
        }]);

        //var aux = JSON.stringify(results);
        //console.log("aux "+aux)
        //res.send(aux);
    });

    connection.end();

    /*const token = jwt.sign({ foo: 'bar' }, "shhhhh");
    console.log(token);
    res.json({
        success: true,
        token: 'JWT' + token,
        user: {
            id: currentUser.id_user,
            username: currentUser.user
        }
    });
    console.log(res.json);*/


});


router.post('/saveUsuario', function (req, res) {

    var connection = mysql.createConnection(datos);
    var str = 'INSERT INTO usuarios (USER,CONTRASENIA)VALUES("' + req.body.user + '", "' + req.body.password + '")';
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


router.post('/updateUsuario', function (req, res) {



    var connection = mysql.createConnection(datos);
    var str = 'UPDATE usuarios SET USER="' + req.body.user + '",CONTRASENIA="' + req.body.password + '" where ID_USER=' + req.body.codigo;
    console.log(str);
    try {
        connection.query(str, function (error, results, fields) {
            if (error) {

            }
            res.send(results);

        });

        connection.end();

    } catch (err) {


    }

});

router.post('/getByIdUsuario', function (req, res) {


    var connection = mysql.createConnection(datos);
    var str = 'SELECT * FROM usuarios where ID_USER=' + req.body.id_user;
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


router.post('/getAllUsuario', function (req, res) {


    var connection = mysql.createConnection(datos);
    var str = 'SELECT * FROM usuarios';
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

router.post('/getInstituto', function (req, res) {


    var connection = mysql.createConnection(datos);
    var str = 'SELECT * FROM instituto';
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

router.post('/getModificarInsti', function (req, res) {


    var connection = mysql.createConnection(datos);
    var str = ' UPDATE `instituto` SET `NOMBRE_INSTITUTO`="' + req.body.nombre + '",`NOMBRE_PROPIERTARIO`="' + req.body.nomb_pro + '",`DIRECCION_INSTITUTO`="' + req.body.direccion + '",`NUM_FAC_INICIO`="' + req.body.nomfac_inicio + '",`NUM_ACTUAL`="' + req.body.no_actual + '",`NUM_FINAL_FINAL`="' + req.body.nomfac_final + '",`TELF_INSTITUTO`="' + req.body.telefono + '",`RUC`="' + req.body.ruc + '",`NUM_AUTORIZACION`="' + req.body.numautorizacion + '",`IVA`="' + req.body.iva + '" WHERE `ID_INSTITUTO`=' + 1;
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

router.post('/eliminarUsuario', function (req, res) {


    var connection = mysql.createConnection(datos);
    var str = 'DELETE FROM `usuarios` where ID_USER=' + req.body.id_user;
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



module.exports = router;