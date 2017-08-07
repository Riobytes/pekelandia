app.controller('personalController', ['$scope', '$http', '$location','myProvider','$localStorage','$timeout',  function ($scope,$http,$location,myProvider,$localStorage,$timeout) {
    var a    = JSON.parse(window.localStorage.getItem('usuario'));
    var token="Bearer "+ a.id_token;
    
    $scope.CargosInicio=function(){

        $http({
            method: 'POST',
            url: myProvider.getAllCargos(),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {



            }


        }).then(function successCallback(response) {
            //console.log(response.data);

            if (response.data.length == 0) {

                alert('No existen usuarios en la BD');
            } else {

                $scope.listcargos = response.data;
                console.log($scope.listcargos);
                //console.log($scope.user);
                //alert('Busqueda exitosa');

            }


        }, function errorCallback(response) {

            swal({
                    title: "Mensaje al usuario: Usted no se encuetra con permisos para usar el sistema",
                    text: "Es necesario hacer login para usar los servicios!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Si, realizar el login!",
                    cancelButtonText: "No, cancelar!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(isConfirm){
                    if (isConfirm) {
                        window.location ='../index.html';
                    } else {

                    }
                });

        });

        $('#fecha_naci').datepicker({
            autoclose: true,
            changeMonth: true,
            changeYear: true,
            format: 'yyyy-mm-dd', //Se especifica como deseamos representarla
            firstDay: 1

        });

        $('#fecha_ingreso').datepicker({
            autoclose: true,
            changeMonth: true,
            changeYear: true,
            format: 'yyyy-mm-dd', //Se especifica como deseamos representarla
            firstDay: 1

        });

        //   console.log($scope.us);
    }



    $scope.registrarCargo=function(){


            $http({
                method: 'POST',
                url: myProvider.getsaveCargo(),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                data: {

                    descripcion: $scope.descri_cargo,
                    remuneracion: $scope.remuneracion_cargo,
                    alimentacion: $scope.alimentacion_cargo,
                    fondo: $scope.fondos_cargo



                }


            }).then(function successCallback(response) {
                console.log(response.data);

                if (response.data.length == 0) {

                    swal("Error!", "El cargo no se agregado!", "error");
                } else {

                    swal("Exito!", "El cargo se agregado!", "success");
                    $scope.CargosInicio();
                    $scope.descri_cargo = "";

                }


            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });



    }

    $scope.modiCargo=function(cargo){

        window.localStorage["cargo"]= JSON.stringify(cargo);
        $location.path("/updateCargos");
    }

    $scope.updateCargosInicio=function(){

        $scope.cargo = JSON.parse(window.localStorage.getItem('cargo'));
        //console.log($scope.updateuser);
        // $scope.updateuser = JSON.parse(window.localStorage.getItem('alluser'));
        $scope.remuneracion_cargo =  $scope.cargo.REMUNERACION;
        $scope.alimentacion_cargo =  $scope.cargo.ALIMENTACION;
        $scope.fondos_cargo =  $scope.cargo.FONDO;


        //   console.log($scope.us);
    }

    $scope.cancelarCargo=function(){

        $location.path('/listarCargos');



    }

    $scope.modificarCargo=function(){

        $http({
            method: 'POST',
            url: myProvider.updateCargo(),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {

                id_cargo: $scope.cargo.ID_CARGO,
                descripcion_cargo: $scope.cargo.DESCRIPCION,
                remuneracion: $scope.remuneracion_cargo,
                alimentacion: $scope.alimentacion_cargo,
                fondo:$scope.fondos_cargo

            }


        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Exito!", "El cargo no se modifico!", "success");
            } else {

                swal("Exito!", "El cargo se modifico!", "success");
                $location.path('/listarCargos');

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });



    }

    $scope.eliminarCargo=function(cargo){
        var id_cargo = cargo.ID_CARGO;
        console.log(id_cargo);
        var descripcion_cargo = cargo.DESCRIPCION;
        $http({
            method: 'POST',
            url: myProvider.geteliminarCargo(),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {

                id_cargo: id_cargo

            }


        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Error!", "El cargo no se elimino correctamente!", "error");
            } else {

                swal("Exito!", "El cargo se elimino correctamente!", "success");
                $scope.CargosInicio();

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });



    }

    $scope.validar_cedula = function (cedula) {


        var count1 = 0;
        var count2 = 0;


        var cedula = cedula;

        //Preguntamos si la cedula consta de 10 digitos
        if (cedula.length == 10) {

            //Obtenemos el digito de la region que sonlos dos primeros digitos
            var digito_region = cedula.substring(0, 2);

            //Pregunto si la region existe ecuador se divide en 24 regiones
            if (digito_region >= 1 && digito_region <= 24) {

                // Extraigo el ultimo digito
                var ultimo_digito = cedula.substring(9, 10);

                //Agrupo todos los pares y los sumo
                var pares = parseInt(cedula.substring(1, 2)) + parseInt(cedula.substring(3, 4)) + parseInt(cedula.substring(5, 6)) + parseInt(cedula.substring(7, 8));

                //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
                var numero1 = cedula.substring(0, 1);
                var numero1 = (numero1 * 2);
                if (numero1 > 9) {
                    var numero1 = (numero1 - 9);
                }

                var numero3 = cedula.substring(2, 3);
                var numero3 = (numero3 * 2);
                if (numero3 > 9) {
                    var numero3 = (numero3 - 9);
                }

                var numero5 = cedula.substring(4, 5);
                var numero5 = (numero5 * 2);
                if (numero5 > 9) {
                    var numero5 = (numero5 - 9);
                }

                var numero7 = cedula.substring(6, 7);
                var numero7 = (numero7 * 2);
                if (numero7 > 9) {
                    var numero7 = (numero7 - 9);
                }

                var numero9 = cedula.substring(8, 9);
                var numero9 = (numero9 * 2);
                if (numero9 > 9) {
                    var numero9 = (numero9 - 9);
                }

                var impares = numero1 + numero3 + numero5 + numero7 + numero9;

                //Suma total
                var suma_total = (pares + impares);

                //extraemos el primero digito
                var primer_digito_suma = String(suma_total).substring(0, 1);

                //Obtenemos la decena inmediata
                var decena = (parseInt(primer_digito_suma) + 1) * 10;

                //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
                var digito_validador = decena - suma_total;

                //Si el digito validador es = a 10 toma el valor de 0
                if (digito_validador == 10)
                    var digito_validador = 0;

                //Validamos que el digito validador sea igual al de la cedula
                if (digito_validador == ultimo_digito) {
                    console.log('la cedula:' + cedula + ' es correcta');
                    count1++;
                } else {
                    console.log('la cedula:' + cedula + ' es incorrecta');
                    count2++;
                }

            } else {
                // imprimimos en consola si la region no pertenece
                console.log('Esta cedula no pertenece a ninguna region');

                count2++
            }
        } else {
            //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
            console.log('Esta cedula tiene menos de 10 Digitos');

            count2++;
        }

        console.log(count1); //corecta la cedula
        console.log(count2); //incorrecta la cedula
        return count1;


    }
    $scope.enviarDatosPersonal=function(){

        var cedula = $scope.cedula_per;
        var nombres = $scope.nombre_per;
        var apellidos = $scope.apellido_per;
        var fecha_naci = $('#fecha_naci').val();
        var domicilio = $scope.domi_per;
        var celular = $scope.celular_pe;
        var fecha_ingre = $('#fecha_ingreso').val();
        var cargo = $scope.cargoselect;
        var sueldo = $scope.sueldo_per;
        var contrato = $('#opcontrato:checked').val();
        var aporte = $('#opaporte:checked').val();


        $http({
            method: 'POST',
            url: myProvider.consultarCedulaPer(),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {

                cedula: cedula

            }


        }).then(function successCallback(response) {
            //console.log(response.data);

            if (response.data.length == 0) {

                if ($scope.validar_cedula($scope.cedula_per) == 1) {

                    $http({
                        method: 'POST',
                        url: myProvider.getSavePersonal(),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        },
                        data: {

                            cedula: cedula,
                            nombres: nombres,
                            apellidos: apellidos,
                            fecha_naci: fecha_naci,
                            domicilio: domicilio,
                            celular: celular,
                            fecha_ingre: fecha_ingre,
                            cargo: cargo,
                            sueldo: sueldo,
                            contrato: contrato,
                            aporte: aporte

                        }


                    }).then(function successCallback(response) {
                        console.log(response.data);

                        if (response.data.length == 0) {

                            swal("Error!", "El registro no se agregado!", "error");
                        } else {

                            swal("Exito!", "El registro fue agregado!", "success");
                            $scope.cedula_per = "";
                            $scope.nombre_per = "";
                            $scope.apellido_per = "";
                            $scope.fecha_naci_per = "";
                            $scope.domi_per = "";
                            $scope.celular_pe = "";
                            $scope.fecha_ingreso_per = "";
                            $scope.cargoselect = "";
                            $scope.sueldo_per = "";
                            $scope.contrato_val = "";
                            $scope.aporte_val = "";


                        }


                    }, function errorCallback(response) {

                        alert('error al realizar Ingreso');

                    });

                } else {

                    swal("Error!", "La cedula esta incorrecta!", "error");
                }


            } else {

                swal("Alert!", "Ya se encuentra en la BD!", "warning");
                $scope.cedula_per = "";
                $scope.nombre_per = "";
                $scope.apellido_per = "";
                $scope.fecha_naci_per = "";
                $scope.domi_per = "";
                $scope.celular_pe = "";
                $scope.fecha_ingreso_per = "";
                $scope.cargoselect = "";
                $scope.sueldo_per = "";
                $scope.contrato_val = "";
                $scope.aporte_val = "";

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });















    }

    $scope.PersonalInicio=function() {

        $http({
            method: 'POST',
            url: myProvider.getAllPersonal(),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {



            }


        }).then(function successCallback(response) {
            //console.log(response.data);

            if (response.data.length == 0) {

                alert('No existen usuarios en la BD');
            } else {

                $scope.listpersonal = response.data;
                console.log($scope.listpersonal);
                //console.log($scope.user);
                //alert('Busqueda exitosa');

            }


        }, function errorCallback(response) {

            swal({
                    title: "Mensaje al usuario: Usted no se encuetra con permisos para usar el sistema",
                    text: "Es necesario hacer login para usar los servicios!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Si, realizar el login!",
                    cancelButtonText: "No, cancelar!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(isConfirm){
                    if (isConfirm) {
                        window.location ='../index.html';
                    } else {

                    }
                });

        });
        $timeout(function(){

            $('#datatablePersonal').dataTable({
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }


            });
        }, 1500, false);

    }

    $scope.modiPersonal=function(personal){

        window.localStorage["personal"]= JSON.stringify(personal);
        $location.path("/updatePersonal");
    }
    $scope.adelantarSueldo=function(personal){

        window.localStorage["personal"]= JSON.stringify(personal);
        $location.path("/adelantoSueldo");
    }

    $scope.updatePersonalInicio=function() {

        $scope.personal = JSON.parse(window.localStorage.getItem('personal'));

        $http({
            method: 'POST',
            url: myProvider.getAllCargos(),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {



            }


        }).then(function successCallback(response) {
            //console.log(response.data);

            if (response.data.length == 0) {

                alert('No existen usuarios en la BD');
            } else {

                $scope.listcargos = response.data;
                $scope.cargoselect = $scope.personal.DESCRIPCION;
                //console.log($scope.user);
                //alert('Busqueda exitosa');

            }


        }, function errorCallback(response) {

            swal({
                    title: "Mensaje al usuario: Usted no se encuetra con permisos para usar el sistema",
                    text: "Es necesario hacer login para usar los servicios!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Si, realizar el login!",
                    cancelButtonText: "No, cancelar!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(isConfirm){
                    if (isConfirm) {
                        window.location ='../index.html';
                    } else {

                    }
                });

        });

        $('#fecha_naci').datepicker({
            autoclose: true,
            changeMonth: true,
            changeYear: true,
            format: 'yyyy-mm-dd', //Se especifica como deseamos representarla
            firstDay: 1

        });

        $('#fecha_ingreso').datepicker({
            autoclose: true,
            changeMonth: true,
            changeYear: true,
            format: 'yyyy-mm-dd', //Se especifica como deseamos representarla
            firstDay: 1

        });

        //   console.log($scope.us);


    }

    $scope.enviarDatosModificarPersonal=function() {

        var cedula = $scope.personal.CEDULA;
        var nombres = $scope.personal.NOMBRE;
        var apellidos = $scope.personal.APELLIDO;
        var fecha_naci = $('#fecha_naci').val();
        var domicilio = $scope.personal.DIRECCION_DOMI;
        var celular = $scope.personal.CELULAR;
        var fecha_ingre = $('#fecha_ingreso').val();
        var cargo = $scope.cargoselect;
        var sueldo = $scope.personal.SUELDO;
        var contrato = $('#opcontrato:checked').val();
        var aporte = $('#opaporte:checked').val();

        $http({
            method: 'POST',
            url: myProvider.getCargosDescripcion(),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {

                descripcion:cargo

            }


        }).then(function successCallback(response) {
            //console.log(response.data);

            if (response.data.length == 0) {

                alert('No existen usuarios en la BD');
            } else {

                $scope.cargo_descrip= response.data;
                console.log($scope.cargo_descrip[0].ID_CARGO);

                if ($scope.validar_cedula(cedula) == 1) {

                    $http({
                        method: 'POST',
                        url: myProvider.getUpdatePersonal(),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        },
                        data: {

                            cedula: cedula,
                            nombres: nombres,
                            apellidos: apellidos,
                            fecha_naci: fecha_naci,
                            domicilio: domicilio,
                            celular: celular,
                            fecha_ingre: fecha_ingre,
                            cargo: $scope.cargo_descrip[0].ID_CARGO,
                            sueldo: sueldo,
                            contrato: contrato,
                            aporte: aporte

                        }


                    }).then(function successCallback(response) {
                        console.log(response.data);

                        if (response.data.length == 0) {

                            swal("Error!", "El registro no se modifico!", "error");
                        } else {

                            swal("Exito!", "El registro fue modificado correctamente!", "success");
                            $location.path('/listarPersonal');


                        }


                    }, function errorCallback(response) {

                        alert('error al realizar Ingreso');

                    });

                } else {

                    swal("Error!", "La cedula esta incorrecta!", "error");
                }
                //console.log($scope.user);
                //alert('Busqueda exitosa');

            }


        }, function errorCallback(response) {

            swal({
                    title: "Mensaje al usuario: Usted no se encuetra con permisos para usar el sistema",
                    text: "Es necesario hacer login para usar los servicios!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Si, realizar el login!",
                    cancelButtonText: "No, cancelar!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(isConfirm){
                    if (isConfirm) {
                        window.location ='../index.html';
                    } else {

                    }
                });

        });

    }

    $scope.eliminarPersonal=function(personal){
        var cedula = personal.CEDULA;
        console.log(cedula);
        $http({
            method: 'POST',
            url: myProvider.geteliminarPersonal(),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {

                cedula: cedula

            }


        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Error!", "El personal no se elimino correctamente!", "error");
            } else {

                swal("Exito!", "El personal se elimino correctamente!", "success");

                setTimeout('location.reload(true)',1000);

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });



    }


    $scope.inicioPersonal=function(){

        $('#imprimirRol').hide();

        $http({
            method: 'POST',
            url: myProvider.getAllEstadoMatricula(),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {

            }


        }).then(function successCallback(response) {

            console.log(response.data);
            $scope.datos_IESS = response.data[0];
            console.log($scope.datos_IESS.APORTE_PATRONAL);


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });

        $http({
            method: 'POST',
            url: myProvider.getAllPersonal(),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {



            }


        }).then(function successCallback(response) {
            //console.log(response.data);

            if (response.data.length == 0) {

                alert('No existen usuarios en la BD');
            } else {

                $scope.listpersonal = response.data;
                console.log($scope.listpersonal);
                //console.log($scope.user);
                //alert('Busqueda exitosa');

            }


        }, function errorCallback(response) {

            swal({
                    title: "Mensaje al usuario: Usted no se encuetra con permisos para usar el sistema",
                    text: "Es necesario hacer login para usar los servicios!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Si, realizar el login!",
                    cancelButtonText: "No, cancelar!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(isConfirm){
                    if (isConfirm) {
                        window.location ='../index.html';
                    } else {

                    }
                });

        });


    }

    $scope.cambiar_PATRONAL=function(){

        $http({
            method: 'POST',
            url: myProvider.getUpdatePatronal(),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {
                patronal:$scope.datos_IESS.APORTE_PATRONAL
            }


        }).then(function successCallback(response) {

            if (response.data.length == 0) {

                swal("Error!", "El aporte patronal no se modifico!", "error");
            } else {

                swal("Exito!", "El aporte patronal se modifico!", "success");

               // setTimeout('location.reload(true)',1000);
                $scope.inicioPersonal();

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });


    }
    $scope.cambiar_PERSONAL=function(){

        $http({
            method: 'POST',
            url: myProvider.getUpdateAportePersonal(),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {
                personal:$scope.datos_IESS.APORTE_PERSONAL
            }


        }).then(function successCallback(response) {

            if (response.data.length == 0) {

                swal("Error!", "El aporte personal no se modifico!", "error");
            } else {

                swal("Exito!", "El aporte personal se modifico!", "success");

                // setTimeout('location.reload(true)',1000);
                $scope.inicioPersonal();

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });



    }

    $scope.aceptar_pesonal=function(persona){

        $('#imprimirRol').show();

      console.log(persona.CEDULA);
        $http({
            method: 'POST',
            url: myProvider.getrolpagos(),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {

                cedula:persona.CEDULA

            }


        }).then(function successCallback(response) {
            //console.log(response.data);

            if (response.data.length == 0) {

                alert('No existen usuarios en la BD');
            } else {
                
                console.log(response.data);
                $scope.datos_per = response.data;
                $scope.APORTE_PATRO = $scope.datos_per[0].REMUNERACION * ($scope.datos_IESS.APORTE_PATRONAL)/100;
                $scope.APORTE_PERSO = $scope.datos_per[0].REMUNERACION * ($scope.datos_IESS.APORTE_PERSONAL)/100;
                //console.log($scope.user);
                //alert('Busqueda exitosa');

            }


        }, function errorCallback(response) {

            swal({
                    title: "Mensaje al usuario: Usted no se encuetra con permisos para usar el sistema",
                    text: "Es necesario hacer login para usar los servicios!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Si, realizar el login!",
                    cancelButtonText: "No, cancelar!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(isConfirm){
                    if (isConfirm) {
                        window.location ='../index.html';
                    } else {

                    }
                });

        });





    }


    function getBase64Image(img) {

        var canvas = document.createElement("canvas");

        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");

        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/jpeg");

        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

    }
    var img = new Image();

    img.onload = function(){
        var dataURI = getBase64Image(img);
        return dataURI;

    }

    img.src = "images/cabecerapeke.png";



    $scope.Imprimir_rol_pagos=function(){


        console.log($scope.datos_per);



        var doc = new jsPDF('p', 'mm', [297, 210]);

        var x=25;
        var y=25;

        var patronal = $scope.datos_per[0].REMUNERACION * ($scope.datos_IESS.APORTE_PATRONAL)/100;
        var patronal_val = patronal.toFixed(2);
        console.log(patronal);

        doc.addImage(img.onload(), 'PNG', x+30, y, 110, 17);

        doc.setFontSize(8);
        doc.setFontType("bold");
        doc.text( 'APORTE PATRONAL IESS('+$scope.datos_IESS.APORTE_PATRONAL+'%) = ',x+105, y+0);
        doc.setFontType("normal");
        doc.text( patronal_val,x+155, y+0);
        doc.rect(x, y+0.5, 165,105, 'S')

        doc.setFontSize(8);
        doc.setFontType("bold");
        doc.text( 'ROL DE PAGOS DE HABERES',x+60, y+19.5);

        doc.line(x, y+20, x+165,y+20)

        doc.setFontSize(8);
        doc.setFontType("bold");

        var meses = new Array ("ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE");
        var f=new Date();

        doc.text( meses[f.getMonth()] + " EJERCICIO FISCAL "+ f.getFullYear(),x+3, y+28.5);

        doc.line(x, y+35, x+165,y+35)
        doc.text( 'NOMBRE: '+$scope.datos_per[0].NOMBRE+'',x+3, y+38.5);
        doc.text( 'CEDULA: '+$scope.datos_per[0].CEDULA+'',x+132, y+38.5);
        doc.line(x, y+40, x+165,y+40);

        doc.setFontSize(8);
        doc.setFontType("bold");
        doc.text( 'Rubro Ingreso',x+3, y+48.5);
        doc.text( 'Monto',x+50, y+48.5);
        doc.text( 'Rubro Descuento',x+85, y+48.5);
        doc.text( 'Monto',x+135, y+48.5);

        doc.setFontSize(8);
        doc.setFontType("normal");
        doc.text( 'Remuneracion',x+3, y+58.5);
        var sueldo = $scope.datos_per[0].REMUNERACION.toString();
        doc.text( sueldo ,x+50, y+58.5);
        doc.text( 'Aporte Personal IESS('+$scope.datos_IESS.APORTE_PERSONAL+'%)',x+80, y+58.5);
        var personal=0;
        var personal_val = personal.toFixed(2);

        console.log($scope.datos_per[0].APORTE_IESS);

        if($scope.datos_per[0].APORTE_IESS == "SI")
        {
            var personal = $scope.datos_per[0].REMUNERACION * ($scope.datos_IESS.APORTE_PERSONAL)/100;
            personal_val = personal.toFixed(2);
        }

        doc.text( personal_val.toString(),x+135, y+58.5);

        doc.setFontSize(8);
        doc.setFontType("normal");
        doc.text( 'Alimentacion',x+3, y+63.5);
        var alimentacion = $scope.datos_per[0].ALIMENTACION.toString();
        doc.text( alimentacion ,x+50, y+63.5);
        doc.text( 'Adelanto sueldo',x+80, y+63.5);

        $scope.adelanto = $scope.datos_per[0].SUELDO;
        doc.text( $scope.adelanto.toString(),x+135, y+63.5);
        doc.line(x+132, y+64, x+145,y+64)


        doc.setFontSize(8);
        doc.setFontType("normal");
        doc.text( 'Fondos de Reserva',x+3, y+68.5);
        var fondos = $scope.datos_per[0].FONDO.toString();
        doc.text( fondos ,x+50, y+68.5);
        doc.setFontType("bold");
        doc.text( 'Total descuentos',x+80, y+68.5);
        doc.setFontType("normal");
        doc.line(x+45, y+69, x+65,y+69)
        $scope.total_descu = personal + $scope.adelanto;
        $scope.total_descuento = $scope.total_descu.toFixed(2);
        console.log($scope.total_descuento);

        doc.text( $scope.total_descuento,x+135, y+68.5);

        doc.setFontSize(8);
        doc.setFontType("bold");
        doc.text( 'Total Ingresos',x+3, y+73.5);
        doc.setFontType("normal");
        var total_ingresos = $scope.datos_per[0].REMUNERACION + $scope.datos_per[0].ALIMENTACION + $scope.datos_per[0].FONDO;
        console.log(total_ingresos);
        doc.text( total_ingresos.toString() ,x+50, y+73.5);
        doc.setFontType("bold");
        doc.text( 'Total sueldo',x+80, y+93.5);
        doc.setFontType("normal");
        $scope.total_sueldo = total_ingresos - $scope.total_descuento;
        $scope.total_total = $scope.total_sueldo.toFixed(2);
        console.log($scope.total_total);

        doc.text( $scope.total_total,x+135, y+93.5);

        var f = new Date();
        var formato_fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();

        doc.text( 'FECHA: '+formato_fecha,x+1, y+109);

        doc.setFontSize(8);
        doc.setFontType("bold");
        doc.line(x+23, y+151, x+60,y+151)
        doc.text( 'TRABAJADORA',x+30, y+155);
        doc.line(x+103, y+151, x+140,y+151)
        doc.text( 'EMPLEADORA',x+112, y+155);

        doc.save('rol_de_pagos.pdf');

        $http({
            method: 'POST',
            url: myProvider.getUpdateAdelanto(),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {
                cedula: $scope.datos_per[0].CEDULA,
                adelanto:0
            }


        }).then(function successCallback(response) {

            if (response.data.length == 0) {

                swal("Error!", "No se agrego el adelanto de sueldo!", "error");
            } else {

                swal("Exito!", "Se agrego el adelanto de sueldo!", "success");

                // setTimeout('location.reload(true)',1000);
                $scope.inicioPersonal();

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });






    }

    $scope.adelantodeSueldo=function(){
        $scope.personal = JSON.parse(window.localStorage.getItem('personal'));
        var sueldoadelanto = $('#adelanto').val();
        console.log(sueldoadelanto);
        $http({
            method: 'POST',
            url: myProvider.getUpdateAdelanto(),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {
               cedula: $scope.personal.CEDULA,
               adelanto:sueldoadelanto
            }


        }).then(function successCallback(response) {

            if (response.data.length == 0) {

                swal("Error!", "No se agrego el adelanto de sueldo!", "error");
            } else {

                swal("Exito!", "Se agrego el adelanto de sueldo!", "success");

                // setTimeout('location.reload(true)',1000);
                $scope.updateAdelantoSueldoInicio();

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });



    }

    $scope.updateAdelantoSueldoInicio=function() {

        $scope.personal = JSON.parse(window.localStorage.getItem('personal'));

        $http({
            method: 'POST',
            url: myProvider.getAdelantoPersonalCedula(),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {

                    cedula:$scope.personal.CEDULA

            }


        }).then(function successCallback(response) {
            //console.log(response.data);

            if (response.data.length == 0) {

                alert('No existen usuarios en la BD');
            } else {

                $scope.profesor = response.data


            }


        }, function errorCallback(response) {

            swal({
                    title: "Mensaje al usuario: Usted no se encuetra con permisos para usar el sistema",
                    text: "Es necesario hacer login para usar los servicios!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Si, realizar el login!",
                    cancelButtonText: "No, cancelar!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(isConfirm){
                    if (isConfirm) {
                        window.location ='../index.html';
                    } else {

                    }
                });

        });


        //   console.log($scope.us);


    }


}]);