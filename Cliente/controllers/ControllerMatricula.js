app.controller('matriculaController', ['$scope', '$http', '$location','myProvider','$localStorage', '$timeout',  function ($scope,$http,$location,myProvider,$localStorage, $timeout) {
    var a    = JSON.parse(window.localStorage.getItem('usuario'));
    var token="Bearer "+ a.id_token;
   
$scope.pre_matriculaInicio=function(){

      //Inicializar wizard
        $('#wizard').smartWizard();

        $('#wizard_verticle').smartWizard({
          transitionEffect: 'slide'
        });

    //inicializar fecha y calendario


    $('#textfecha_naci').datepicker({
        autoclose: true,
        changeMonth: true,
        changeYear: true,
        format: 'yyyy-mm-dd', //Se especifica como deseamos representarla
        firstDay: 1

    });


        //inicializar botones
    $('.buttonNext').addClass('btn btn-success');
    $('.buttonPrevious').addClass('btn btn-primary');
    $('.buttonFinish').addClass('btn btn-default');



        $('#button1').hide();
        $('#button2').hide();
        $('#button3').hide();
        $('#button4').hide();
         $('#button5').hide();
        $('#button6').hide();
        $('#button7').hide();
        $('#button8').hide();
    $('#botonimprimirlista').hide();


         $("#estado_proceso").html("<h1> Proceso aun no terminado!!</h1>");
         $('#buttonimprimir').hide();

          $('#paralelo').hide();
          $('#labelpara').hide();



        //inicializar niveles
          $http({
            method: 'POST',
            url: myProvider.getAllNiveles(),
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
                console.log(response.data);
                $scope.niveles = response.data;
                $scope.seleccion = $scope.niveles[0].id_nivel;

                //alert('Busqueda exitosa');

            }


        }, function errorCallback(response) {

            alert('error al realizar la busqueda');

        });

        //inicializar jornadas

         $http({
            method: 'POST',
            url: myProvider.getAllJornadas(),
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

                $scope.jornadas = response.data;
                //console.log($scope.user);
                //alert('Busqueda exitosa');

            }


        }, function errorCallback(response) {

            alert('error al realizar la busqueda');

        });
        //inicializar lunch

        $http({
            method: 'POST',
            url: myProvider.getAllLunch(),
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

                $scope.lunch= response.data;
                //console.log($scope.user);
                //alert('Busqueda exitosa');

            }


        }, function errorCallback(response) {

            alert('error al realizar la busqueda');

        });

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

        $scope.id_perido_actual = response.data[0].ID_PERIODO;
        console.log($scope.id_perido_actual);

        $http({
            method: 'POST',
            url: myProvider.getIdPeriodo(),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {
                id_periodo: $scope.id_perido_actual
            }


        }).then(function successCallback(response) {
            console.log(response.data);
            $scope.peri_actual = response.data[0].DESCRIPCION_PERI;
            console.log($scope.peri_actual);



        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });


    }, function errorCallback(response) {

        alert('error al realizar Ingreso');

    });

    }



    $scope.estadoMatriculaInicio=function(){

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
            //console.log(response.data);

            if (response.data.length == 0) {

                alert('No existen usuarios en la BD');
            } else {

                $scope.estado_matri = response.data;
                if($scope.estado_matri[0].ESTADO=="si")
                {
                    $("#estado_matri").html("<h1> Activado</h1>");
                }else
                {
                    $("#estado_matri").html("<h1> Desactivado</h1>");
                }
                
               

            }


        }, function errorCallback(response) {

            alert('error al realizar la busqueda');

        });

    }

    $scope.estadoMatriculaInicio=function(){

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
            //console.log(response.data);

            if (response.data.length == 0) {

                alert('No existen usuarios en la BD');
            } else {

                $scope.estado_matri = response.data;
                if($scope.estado_matri[0].ESTADO=="si")
                {
                    $("#estado_matri").html("<h1> Activado</h1>");
                }else
                {
                    $("#estado_matri").html("<h1> Desactivado</h1>");
                }



            }


        }, function errorCallback(response) {

            alert('error al realizar la busqueda');

        });

    }

     $scope.modificarEstadoMatricula=function(estado){

            var estado = estado;
             if(estado=="si")
                {
                    $("#estado_matri").html("<h1> Activado</h1>");
                }else
                {
                    $("#estado_matri").html("<h1> Desactivado</h1>");
                }
                $http({
                    method: 'POST',
                    url: myProvider.updateEstadoMatricula(),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {

                        estado:estado
                      
                       
                    }


                }).then(function successCallback(response) {
                    //console.log(response.data);

                    if (response.data.length == 0) {

                        alert('Error en la base');
                    } else {

                        //alert('Ingreso correcto');

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



    $scope.consultar_cedula = function () {

   $scope.estudiante= {};

    var cedula = $('#cedula_es').val();
        $scope.ced_spet1 = cedula;
        console.log($scope.ced_spet1);
        console.log($scope.validar_cedula($scope.ced_spet1));

        if($scope.validar_cedula($scope.ced_spet1) == 1) {

            $http({
                method: 'POST',
                url: myProvider.consultarCedula(),
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

                    $('#button1').show();
                    $('#button2').show();
                    $('#button3').hide();
                    $('#button4').hide();

                    $scope.estudiante[0] = {CEDULA: $scope.ced_spet1};
                    swal("Alerta!", "El usuario no se encuentra dentro de la BD, precione siguiente!", "warning");


                } else {
                    swal("Exitoso!", "El usuario ya se encuentra dentro de la BD, precione siguiente!", "success");

                    $scope.alertType = "Success";
                    $scope.text = "Exitoso";


                    $scope.estudiante = response.data;

                    console.log($scope.estudiante);


                    $scope.jornadaselect = $scope.estudiante[0].ID_JORNADA;

                    $scope.lunchselect = $scope.estudiante[0].ID_REFRIGERIO;


                    $('#button3').show();
                    $('#button4').show();
                    $('#button1').hide();
                    $('#button2').hide();

                    $http({
                        method: 'POST',
                        url: myProvider.getMatriculaxCedula(),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        },
                        data: {

                            cedula: cedula

                        }


                    }).then(function successCallback(response) {
                        console.log(response.data);

                        $scope.nivelselect = response.data[0].ID_NIVEL; //
                        


                    }, function errorCallback(response) {

                        alert('error al realizar Ingreso');

                    });


                }


            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });
        }else {

            swal("Error!", "La cedula esta incorrecta!", "error");
        }


     }


     $scope.enviarDatos=function(){

    var cedula = $('#cedula').val();
    var nombre = $('#textnom_usuario').val();
    var fecha_naci = $('#textfecha_naci').val();
    var años = 0;
    var meses = 0;
    var sexo = $('#opsexo:checked').val();
    var talla = $('#numtalla').val();
    var peso = $('#numpeso').val();
    var torax = $('#numtorax').val();
    var id_jornada = $scope.jornadaselect;
    var nivel = $scope.nivelselect;
    var id_refrigerio = $scope.lunchselect;
    var alimentos_excluidos = $('#textalimen_exc').val();
    var problemas_salud = $('#textprob_salud').val();
    var alergias = $('#textaler_niño').val();
    var medicacion = $('#textmedi_recibe').val();
    var pediatra = $('#text_nom_pedia').val();
    var tel_pediatra = $('#numtelf').val();
    var perso_recibir_niños = $('#textreci_niño').val();
    var tel_emergencia = $('#telf_emerg').val();
    var observaciones = $('#textobserv').val();
    var centro_edu_anterior = $('#textcentro_edu').val();
    var fecha_act = new Date();




         console.log(fecha_naci);

            console.log ("aca estoy");
         console.log (nivel);



         // realizamos el calculo
         var birthday = new Date(fecha_naci);
         console.log(fecha_naci);
         var today = new Date();
         console.log(today);

         var values = fecha_naci.split("-");


         var dia = values[2];
         var mes = values[1];
         var ano = values[0];

         console.log(dia);
         console.log(mes);
         console.log(ano);

         var fecha_hoy = new Date();
         var ahora_ano = fecha_hoy.getFullYear();
         var ahora_mes = fecha_hoy.getMonth()+1;
         var ahora_dia = fecha_hoy.getDate();

         console.log(ahora_dia);
         console.log(ahora_mes);
         console.log(ahora_ano);

         // realizamos el calculo
         var edad = (ahora_ano + 1900) - ano;
         if ( ahora_mes < mes )
         {
             console.log(1);
             edad--;
         }

         if ((mes == ahora_mes) && (ahora_dia < dia))
         {
             console.log(2);
             edad--;
         }
         if (edad > 1900)
         {
             console.log(3);
             edad -= 1900;
         }

         // calculamos los meses
         var meses=0;
         if(ahora_mes>mes) {
             console.log(4);
             meses = ahora_mes - mes;

         }
         if(ahora_mes<mes) {
             console.log(5);
             meses = 12 - (mes - ahora_mes);
         }
         if(ahora_mes==mes && dia>ahora_dia) {

             console.log(6);
             meses = 11;
         }
         // calculamos los dias
         var dias=0;
         if(ahora_dia>dia) {
             console.log(7);
             dias = ahora_dia - dia;
         }
         if(ahora_dia<dia)
         {
             console.log(8);
             ultimoDiaMes=new Date(ahora_ano, ahora_mes, 0);
             dias=ultimoDiaMes.getDate()-(dia-ahora_dia);
         }





         console.log("años "+edad);
         console.log("meses "+meses);
         console.log("dias "+dias);






         $http({
             method: 'POST',
             url: myProvider.consultarCedula(),
             headers: {
                 'Content-Type': 'application/json',
                 'Authorization': token
             },
             data: {

                 cedula:cedula


             }


         }).then(function successCallback(response) {
             //console.log(response.data);

             if (response.data.length == 0) {



                 $http({
                     method: 'POST',
                     url: myProvider.saveEstudiantes(),
                     headers: {
                         'Content-Type': 'application/json',
                         'Authorization': token
                     },
                     data: {

                         cedula: cedula,
                         nombre: nombre,
                         fecha_naci: fecha_naci,
                         años: edad,
                         meses: meses,
                         dias:dias,
                         sexo:sexo,
                         talla: talla,
                         peso:peso,
                         torax: torax,
                         id_jornada: id_jornada,
                         //nivel:nivel,
                         id_refrigerio: id_refrigerio,
                         alimentos_excluidos: alimentos_excluidos,
                         problemas_salud: problemas_salud,
                         alergias: alergias,
                         medicacion: medicacion,
                         pediatra: pediatra,
                         tel_pediatra: tel_pediatra,
                         perso_recibir_ninios: perso_recibir_niños,
                         tel_emergencia: tel_emergencia,
                         observaciones: observaciones,
                         centro_edu_anterior: centro_edu_anterior



                     }


                 }).then(function successCallback(response) {
                     console.log(response.data);

                     if(response.data.length==0){

                         swal("Error!", "El usuario ya se encuentra dentro de la BD!", "error");
                     }else{

                         window.localStorage["cedulaestu"]= cedula;
                         console.log("se guardo el localStorage");

                         $http({
                             method: 'POST',
                             url: myProvider.getSaveMatricula(),
                             headers: {
                                 'Content-Type': 'application/json',
                                 'Authorization': token
                             },
                             data: {

                                 cedula: cedula,
                                 id_nivel: nivel,
                                 fecha: fecha_act,
                                 estado:"Pendiente",
                                 id_periodo: $scope.id_perido_actual

                             }


                         }).then(function successCallback(response) {
                             console.log(response.data);

                             if (response.data.length == 0) {

                                 swal("Error!", "Error al ingresar la matricula!", "error");
                             } else {

                                 swal("Exitoso!", "Se ingreso correctamente!", "success");
                                 $('#button5').show();
                                 $('#button6').show();
                                 $('#button7').hide();
                                 $('#button8').hide();
                                 console.log($scope.id_perido_actual);




                             }


                         }, function errorCallback(response) {


                             swal("Error!", "Error al realizar Ingreso!", "Error");

                         });
                     }


                 }, function errorCallback(response) {
                     // called asynchronously if an error occurs
                     // or server returns response with an error status.
                     // console.log(response);
                     //$scope.mesaje = response.mensaje;
                     swal("Error!", "Error al realizar Ingreso!", "Error");

                 });




             } else {
                 swal("Alerta!", "El usuario ya se encuentra dentro de la BD!", "warning");

             }


         }, function errorCallback(response) {

             swal("Error!", "Error al realizar Ingreso!", "Error");;

         });





    }


    $scope.enviarModificacion=function(){

        var cedula = $('#cedula').val();
        var nombre = $('#textnom_usuario').val();
        var fecha_naci = $('#textfecha_naci').val();
        var años = 0;
        var meses = 0;
        var sexo = $('#opsexo:checked').val();
        var talla = $('#numtalla').val();
        var peso = $('#numpeso').val();
        var torax = $('#numtorax').val();
        var id_jornada = $scope.jornadaselect;
        var nivel = $scope.nivelselect;
        var id_refrigerio = $scope.lunchselect;
        var alimentos_excluidos = $('#textalimen_exc').val();
        var problemas_salud = $('#textprob_salud').val();
        var alergias = $('#textaler_niño').val();
        var medicacion = $('#textmedi_recibe').val();
        var pediatra = $('#text_nom_pedia').val();
        var tel_pediatra = $('#numtelf').val();
        var perso_recibir_niños = $('#textreci_niño').val();
        var tel_emergencia = $('#telf_emerg').val();
        var observaciones = $('#textobserv').val();
        var centro_edu_anterior = $('#textcentro_edu').val();
        var fecha_act = new Date();

        $scope.padre= {};
        $scope.madre= {};


// CAlculo del los años meses del la fecha actual
        console.log ("aca estoy");

        // realizamos el calculo
        var birthday = new Date(fecha_naci);
        console.log(fecha_naci);
        var today = new Date();
        console.log(today);

        var values = fecha_naci.split("-");


        var dia = values[2];
        var mes = values[1];
        var ano = values[0];

        console.log(dia);
        console.log(mes);
        console.log(ano);

        var fecha_hoy = new Date();
        var ahora_ano = fecha_hoy.getFullYear();
        var ahora_mes = fecha_hoy.getMonth()+1;
        var ahora_dia = fecha_hoy.getDate();

        console.log(ahora_dia);
        console.log(ahora_mes);
        console.log(ahora_ano);

        // realizamos el calculo
        var edad = (ahora_ano + 1900) - ano;
        if ( ahora_mes < mes )
        {
            console.log(1);
            edad--;
        }

        if ((mes == ahora_mes) && (ahora_dia < dia))
        {
            console.log(2);
            edad--;
        }
        if (edad >= 1900)
        {
            console.log(3);
            edad -= 1900;
        }

        // calculamos los meses
        var meses=0;
        if(ahora_mes>mes) {
            console.log(4);
            meses = ahora_mes - mes;

        }
        if(ahora_mes<mes) {
            console.log(5);
            meses = 12 - (mes - ahora_mes);
        }
        if(ahora_mes==mes && dia>ahora_dia) {

            console.log(6);
            meses = 11;
        }
        // calculamos los dias
        var dias=0;
        if(ahora_dia>dia) {
            console.log(7);
            dias = ahora_dia - dia;
        }
        if(ahora_dia<dia)
        {
            console.log(8);
            ultimoDiaMes=new Date(ahora_ano, ahora_mes, 0);
            dias=ultimoDiaMes.getDate()-(dia-ahora_dia);
        }





        console.log("años hoy"+edad);
        console.log("meses hoy "+meses);
        console.log("dias hoy "+dias);


        // CAlculo del los años meses y dias a la fecha del 31 de Diciembre del año actual

        var fecha_limite = ahora_ano +"-12-31";
        console.log (fecha_limite);

        // realizamos el calculo


        var values1 = fecha_limite.split("-");


        var dia_max = values1[2];
        var mes_max = values1[1];
        var ano_max = values1[0];

        console.log(dia_max);
        console.log(mes_max);
        console.log(ano_max);



        // realizamos el calculo
        var edad_max = (parseInt(ano_max) + 1900) - ano;
        console.log(edad_max);
        if ( mes_max  < mes )
        {
            console.log(1);
            edad_max--;
        }

        if ((mes == mes_max ) && (dia_max < dia))
        {
            console.log(2);
            edad_max--;
        }
        if (edad_max >= 1900)
        {
            console.log(3);
            edad_max -= 1900;
        }

        // calculamos los meses
        var meses_max=0;
        if(mes_max >mes) {
            console.log(4);
            meses_max = mes_max  - mes;

        }
        if(mes_max <mes) {
            console.log(5);
            meses_max = 12 - (mes - mes_max);
        }
        if((mes_max ==mes) && (dia>dia_max)) {

            console.log(6);
            meses_max = 11;
        }
        // calculamos los dias
        var dias_max=0;
        if(dia_max>dia) {
            console.log(7);
            dias_max = dia_max - dia;
        }
        if(dia_max<dia)
        {
            console.log(8);
            ultimoDiaMes1=new Date(ano_max, mes_max, 0);
            dias_max=ultimoDiaMes1.getDate()-(dia-dia_max);
        }





        console.log("años 31 de dic "+edad_max);
        console.log("meses 31 de dic "+meses_max);
        console.log("dias 31 de dic "+dias_max);

        if(nivel == 1)
        {
            if(((edad == 1)&&(meses >= 6))||(edad>1))
            {

                if((edad_max<3)&&(meses_max<=12)&&(dias_max<=31))
                {
                    $http({
                        method: 'POST',
                        url: myProvider.updateEstudiantes(),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        },
                        data: {

                            cedula: cedula,
                            nombre: nombre,
                            fecha_naci: fecha_naci,
                            años: edad,
                            meses: meses,
                            dias: dias,
                            sexo:sexo,
                            talla: talla,
                            peso:peso,
                            torax: torax,
                            id_jornada: id_jornada,
                            //nivel:nivel,
                            id_refrigerio: id_refrigerio,
                            alimentos_excluidos: alimentos_excluidos,
                            problemas_salud: problemas_salud,
                            alergias: alergias,
                            medicacion: medicacion,
                            pediatra: pediatra,
                            tel_pediatra: tel_pediatra,
                            perso_recibir_ninios: perso_recibir_niños,
                            tel_emergencia: tel_emergencia,
                            observaciones: observaciones,
                            centro_edu_anterior: centro_edu_anterior


                        }


                    }).then(function successCallback(response) {
                        console.log(response.data);

                        if(response.data.length==0){

                            swal("Error!", "No se puedo modificar el estudiante!", "error");
                        }else{


                            $http({
                                method: 'POST',
                                url: myProvider.getMatriculaxCedulaPeriodo(),
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': token
                                },
                                data: {

                                    cedula: cedula,
                                    id_periodo: $scope.id_perido_actual

                                }


                            }).then(function successCallback(response) {
                                console.log(response.data);

                                if (response.data.length == 0) {


                                    $http({
                                        method: 'POST',
                                        url: myProvider.getSaveMatricula(),
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': token
                                        },
                                        data: {

                                            cedula: cedula,
                                            id_nivel: nivel,
                                            fecha: fecha_act,
                                            estado:"Pendiente",
                                            id_periodo: $scope.id_perido_actual

                                        }


                                    }).then(function successCallback(response) {
                                        console.log(response.data);

                                        if (response.data.length == 0) {

                                            swal("Error!", "Error al ingresar la matricula!", "error");
                                        } else {

                                            swal("Exitoso!", "Se ingreso correctamente!", "success");
                                            console.log($scope.id_perido_actual);
                                            $('#button5').hide();
                                            $('#button6').hide();
                                            $('#button7').show();
                                            $('#button8').show();

                                            //----------------consulat si estan asociados los padres

                                            $http({
                                                method: 'POST',
                                                url: myProvider.getParentsBySon(),
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Authorization': token
                                                },
                                                data: {

                                                    cedula: cedula,

                                                }


                                            }).then(function successCallback(response) {
                                                console.log(response.data);

                                                if(response.data.length==0){

                                                    swal("Alerta!", "No existen padres asociados!", "warning");
                                                    $('#button5').show();
                                                    $('#button6').show();
                                                    $('#button7').hide();
                                                    $('#button8').hide();

                                                }else{

                                                    var padres = response.data;
                                                    var cedulapadre = padres[0].CI_PADRE;
                                                    console.log("obtengo las cedulas de los padres");
                                                    console.log("padre:"+cedulapadre);
                                                    if(padres[1]!=undefined)
                                                    {
                                                        var cedulamadre = padres[1].CI_PADRE;

                                                        console.log("madre:"+cedulamadre);
                                                    }


                                                    $http({
                                                        method: 'POST',
                                                        url: myProvider.consultarpadres(),
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'Authorization': token
                                                        },
                                                        data: {

                                                            cedula: cedulapadre

                                                        }


                                                    }).then(function successCallback(response) {
                                                        console.log(response.data);

                                                        if (response.data.length == 0) {

                                                            alert('Error al ingresar');
                                                        } else {

                                                            $scope.padre = response.data;


                                                        }


                                                    }, function errorCallback(response) {

                                                        alert('error al realizar Ingreso');

                                                    });

                                                    $http({
                                                        method: 'POST',
                                                        url: myProvider.consultarpadres(),
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'Authorization': token
                                                        },
                                                        data: {

                                                            cedula: cedulamadre

                                                        }


                                                    }).then(function successCallback(response) {
                                                        console.log(response.data);

                                                        if (response.data.length == 0) {

                                                            alert('Error al ingresar');
                                                        } else {

                                                            $scope.madre = response.data;


                                                        }


                                                    }, function errorCallback(response) {

                                                        alert('error al realizar Ingreso');

                                                    });




                                                }


                                            }, function errorCallback(response) {
                                                // called asynchronously if an error occurs
                                                // or server returns response with an error status.
                                                // console.log(response);
                                                //$scope.mesaje = response.mensaje;
                                                alert('error al realizar Ingreso');

                                            });





                                        }


                                    }, function errorCallback(response) {


                                        swal("Error!", "Error al realizar Ingreso!", "Error");

                                    });





                                } else {


                                    window.localStorage["cedulaestu"]= cedula;
                                    console.log("se guardo el localStorage");

                                    $http({
                                        method: 'POST',
                                        url: myProvider.updateMatricula(),
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': token
                                        },
                                        data: {

                                            cedula: cedula,
                                            id_nivel: nivel,
                                            fecha: fecha_act,
                                            estado:"Pendiente",
                                            id_periodo: $scope.id_perido_actual

                                        }


                                    }).then(function successCallback(response) {
                                        console.log(response.data);

                                        if (response.data.length == 0) {

                                            swal("Error!", "No se puedo modificar la matricula!", "error");
                                        } else {

                                            swal("Exito!", "Se modifico correctamente el estudiante!", "success");
                                            $('#button5').hide();
                                            $('#button6').hide();
                                            $('#button7').show();
                                            $('#button8').show();

                                            //----------------consulat si estan asociados los padres

                                            $http({
                                                method: 'POST',
                                                url: myProvider.getParentsBySon(),
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Authorization': token
                                                },
                                                data: {

                                                    cedula: cedula,

                                                }


                                            }).then(function successCallback(response) {
                                                console.log(response.data);

                                                if(response.data.length==0){

                                                    swal("Alerta!", "No existen padres asociados!", "warning");
                                                    $('#button5').show();
                                                    $('#button6').show();
                                                    $('#button7').hide();
                                                    $('#button8').hide();

                                                }else{

                                                    var padres = response.data;
                                                    var cedulapadre = padres[0].CI_PADRE;
                                                    console.log("obtengo las cedulas de los padres");
                                                    console.log("padre:"+cedulapadre);
                                                    if(padres[1]!=undefined)
                                                    {
                                                        var cedulamadre = padres[1].CI_PADRE;

                                                        console.log("madre:"+cedulamadre);
                                                    }


                                                    $http({
                                                        method: 'POST',
                                                        url: myProvider.consultarpadres(),
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'Authorization': token
                                                        },
                                                        data: {

                                                            cedula: cedulapadre

                                                        }


                                                    }).then(function successCallback(response) {
                                                        console.log(response.data);

                                                        if (response.data.length == 0) {

                                                            alert('Error al ingresar');
                                                        } else {

                                                            $scope.padre = response.data;


                                                        }


                                                    }, function errorCallback(response) {

                                                        alert('error al realizar Ingreso');

                                                    });

                                                    $http({
                                                        method: 'POST',
                                                        url: myProvider.consultarpadres(),
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'Authorization': token
                                                        },
                                                        data: {

                                                            cedula: cedulamadre

                                                        }


                                                    }).then(function successCallback(response) {
                                                        console.log(response.data);

                                                        if (response.data.length == 0) {

                                                            alert('Error al ingresar');
                                                        } else {

                                                            $scope.madre = response.data;


                                                        }


                                                    }, function errorCallback(response) {

                                                        alert('error al realizar Ingreso');

                                                    });




                                                }


                                            }, function errorCallback(response) {
                                                // called asynchronously if an error occurs
                                                // or server returns response with an error status.
                                                // console.log(response);
                                                //$scope.mesaje = response.mensaje;
                                                alert('error al realizar Ingreso');

                                            });


                                        }


                                    }, function errorCallback(response) {

                                        alert('error al realizar Ingreso');

                                    });
                                }


                            }, function errorCallback(response) {
                                // called asynchronously if an error occurs
                                // or server returns response with an error status.
                                // console.log(response);
                                //$scope.mesaje = response.mensaje;
                                alert('error al realizar Ingreso');

                            });





                        }


                    }, function errorCallback(response) {

                        alert('error al realizar Ingreso');

                    });

                }else {
                    alert("La edad exede para ingresar al nivel 1");
                }




            }else
            {
                alert("no tiene la minima edad para ingresar a NIvel 1");
            }
        }

        if(nivel == 2)
        {
            if(((edad_max == 3)&&(meses_max >= 0)&&(dias_max>=0))||(edad_max>3))
            {

                if((edad_max<4)&&(meses_max<=12)&&(dias_max<=31))
                {
                    $http({
                        method: 'POST',
                        url: myProvider.updateEstudiantes(),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        },
                        data: {

                            cedula: cedula,
                            nombre: nombre,
                            fecha_naci: fecha_naci,
                            años: edad,
                            meses: meses,
                            dias: dias,
                            sexo:sexo,
                            talla: talla,
                            peso:peso,
                            torax: torax,
                            id_jornada: id_jornada,
                            //nivel:nivel,
                            id_refrigerio: id_refrigerio,
                            alimentos_excluidos: alimentos_excluidos,
                            problemas_salud: problemas_salud,
                            alergias: alergias,
                            medicacion: medicacion,
                            pediatra: pediatra,
                            tel_pediatra: tel_pediatra,
                            perso_recibir_ninios: perso_recibir_niños,
                            tel_emergencia: tel_emergencia,
                            observaciones: observaciones,
                            centro_edu_anterior: centro_edu_anterior


                        }


                    }).then(function successCallback(response) {
                        console.log(response.data);

                        if(response.data.length==0){

                            swal("Error!", "No se puedo modificar el estudiante!", "error");
                        }else{


                            $http({
                                method: 'POST',
                                url: myProvider.getMatriculaxCedulaPeriodo(),
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': token
                                },
                                data: {

                                    cedula: cedula,
                                    id_periodo: $scope.id_perido_actual

                                }


                            }).then(function successCallback(response) {
                                console.log(response.data);

                                if (response.data.length == 0) {


                                    $http({
                                        method: 'POST',
                                        url: myProvider.getSaveMatricula(),
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': token
                                        },
                                        data: {

                                            cedula: cedula,
                                            id_nivel: nivel,
                                            fecha: fecha_act,
                                            estado:"Pendiente",
                                            id_periodo: $scope.id_perido_actual

                                        }


                                    }).then(function successCallback(response) {
                                        console.log(response.data);

                                        if (response.data.length == 0) {

                                            swal("Error!", "Error al ingresar la matricula!", "error");
                                        } else {

                                            swal("Exitoso!", "Se ingreso correctamente!", "success");
                                            console.log($scope.id_perido_actual);
                                            $('#button5').hide();
                                            $('#button6').hide();
                                            $('#button7').show();
                                            $('#button8').show();

                                            //----------------consulat si estan asociados los padres

                                            $http({
                                                method: 'POST',
                                                url: myProvider.getParentsBySon(),
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Authorization': token
                                                },
                                                data: {

                                                    cedula: cedula,

                                                }


                                            }).then(function successCallback(response) {
                                                console.log(response.data);

                                                if(response.data.length==0){

                                                    swal("Alerta!", "No existen padres asociados!", "warning");
                                                    $('#button5').show();
                                                    $('#button6').show();
                                                    $('#button7').hide();
                                                    $('#button8').hide();

                                                }else{

                                                    var padres = response.data;
                                                    var cedulapadre = padres[0].CI_PADRE;
                                                    console.log("obtengo las cedulas de los padres");
                                                    console.log("padre:"+cedulapadre);
                                                    if(padres[1]!=undefined)
                                                    {
                                                        var cedulamadre = padres[1].CI_PADRE;

                                                        console.log("madre:"+cedulamadre);
                                                    }


                                                    $http({
                                                        method: 'POST',
                                                        url: myProvider.consultarpadres(),
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'Authorization': token
                                                        },
                                                        data: {

                                                            cedula: cedulapadre

                                                        }


                                                    }).then(function successCallback(response) {
                                                        console.log(response.data);

                                                        if (response.data.length == 0) {

                                                            alert('Error al ingresar');
                                                        } else {

                                                            $scope.padre = response.data;


                                                        }


                                                    }, function errorCallback(response) {

                                                        alert('error al realizar Ingreso');

                                                    });

                                                    $http({
                                                        method: 'POST',
                                                        url: myProvider.consultarpadres(),
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'Authorization': token
                                                        },
                                                        data: {

                                                            cedula: cedulamadre

                                                        }


                                                    }).then(function successCallback(response) {
                                                        console.log(response.data);

                                                        if (response.data.length == 0) {

                                                            alert('Error al ingresar');
                                                        } else {

                                                            $scope.madre = response.data;


                                                        }


                                                    }, function errorCallback(response) {

                                                        alert('error al realizar Ingreso');

                                                    });




                                                }


                                            }, function errorCallback(response) {
                                                // called asynchronously if an error occurs
                                                // or server returns response with an error status.
                                                // console.log(response);
                                                //$scope.mesaje = response.mensaje;
                                                alert('error al realizar Ingreso');

                                            });





                                        }


                                    }, function errorCallback(response) {


                                        swal("Error!", "Error al realizar Ingreso!", "Error");

                                    });





                                } else {


                                    window.localStorage["cedulaestu"]= cedula;
                                    console.log("se guardo el localStorage");

                                    $http({
                                        method: 'POST',
                                        url: myProvider.updateMatricula(),
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': token
                                        },
                                        data: {

                                            cedula: cedula,
                                            id_nivel: nivel,
                                            fecha: fecha_act,
                                            estado:"Pendiente",
                                            id_periodo: $scope.id_perido_actual

                                        }


                                    }).then(function successCallback(response) {
                                        console.log(response.data);

                                        if (response.data.length == 0) {

                                            swal("Error!", "No se puedo modificar la matricula!", "error");
                                        } else {

                                            swal("Exito!", "Se modifico correctamente el estudiante!", "success");
                                            $('#button5').hide();
                                            $('#button6').hide();
                                            $('#button7').show();
                                            $('#button8').show();

                                            //----------------consulat si estan asociados los padres

                                            $http({
                                                method: 'POST',
                                                url: myProvider.getParentsBySon(),
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Authorization': token
                                                },
                                                data: {

                                                    cedula: cedula,

                                                }


                                            }).then(function successCallback(response) {
                                                console.log(response.data);

                                                if(response.data.length==0){

                                                    swal("Alerta!", "No existen padres asociados!", "warning");
                                                    $('#button5').show();
                                                    $('#button6').show();
                                                    $('#button7').hide();
                                                    $('#button8').hide();

                                                }else{

                                                    var padres = response.data;
                                                    var cedulapadre = padres[0].CI_PADRE;
                                                    console.log("obtengo las cedulas de los padres");
                                                    console.log("padre:"+cedulapadre);
                                                    if(padres[1]!=undefined)
                                                    {
                                                        var cedulamadre = padres[1].CI_PADRE;

                                                        console.log("madre:"+cedulamadre);
                                                    }


                                                    $http({
                                                        method: 'POST',
                                                        url: myProvider.consultarpadres(),
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'Authorization': token
                                                        },
                                                        data: {

                                                            cedula: cedulapadre

                                                        }


                                                    }).then(function successCallback(response) {
                                                        console.log(response.data);

                                                        if (response.data.length == 0) {

                                                            alert('Error al ingresar');
                                                        } else {

                                                            $scope.padre = response.data;


                                                        }


                                                    }, function errorCallback(response) {

                                                        alert('error al realizar Ingreso');

                                                    });

                                                    $http({
                                                        method: 'POST',
                                                        url: myProvider.consultarpadres(),
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'Authorization': token
                                                        },
                                                        data: {

                                                            cedula: cedulamadre

                                                        }


                                                    }).then(function successCallback(response) {
                                                        console.log(response.data);

                                                        if (response.data.length == 0) {

                                                            alert('Error al ingresar');
                                                        } else {

                                                            $scope.madre = response.data;


                                                        }


                                                    }, function errorCallback(response) {

                                                        alert('error al realizar Ingreso');

                                                    });




                                                }


                                            }, function errorCallback(response) {
                                                // called asynchronously if an error occurs
                                                // or server returns response with an error status.
                                                // console.log(response);
                                                //$scope.mesaje = response.mensaje;
                                                alert('error al realizar Ingreso');

                                            });


                                        }


                                    }, function errorCallback(response) {

                                        alert('error al realizar Ingreso');

                                    });
                                }


                            }, function errorCallback(response) {
                                // called asynchronously if an error occurs
                                // or server returns response with an error status.
                                // console.log(response);
                                //$scope.mesaje = response.mensaje;
                                alert('error al realizar Ingreso');

                            });





                        }


                    }, function errorCallback(response) {

                        alert('error al realizar Ingreso');

                    });

                }else {
                    alert("La edad exede para el Nivel 2 (3-4)años");
                }




            }else
            {
                alert("no tiene la minima edad para ingresar a NIvel 2 (3-4)años");
            }
        }

        if(nivel == 3)
        {
            if(((edad_max == 4)&&(meses_max >= 0)&&(dias_max>=0))||(edad_max>4))
            {

                if((edad_max<5)&&(meses_max<=12)&&(dias_max<=31))
                {
                    $http({
                        method: 'POST',
                        url: myProvider.updateEstudiantes(),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        },
                        data: {

                            cedula: cedula,
                            nombre: nombre,
                            fecha_naci: fecha_naci,
                            años: edad,
                            meses: meses,
                            dias: dias,
                            sexo:sexo,
                            talla: talla,
                            peso:peso,
                            torax: torax,
                            id_jornada: id_jornada,
                            //nivel:nivel,
                            id_refrigerio: id_refrigerio,
                            alimentos_excluidos: alimentos_excluidos,
                            problemas_salud: problemas_salud,
                            alergias: alergias,
                            medicacion: medicacion,
                            pediatra: pediatra,
                            tel_pediatra: tel_pediatra,
                            perso_recibir_ninios: perso_recibir_niños,
                            tel_emergencia: tel_emergencia,
                            observaciones: observaciones,
                            centro_edu_anterior: centro_edu_anterior


                        }


                    }).then(function successCallback(response) {
                        console.log(response.data);

                        if(response.data.length==0){

                            swal("Error!", "No se puedo modificar el estudiante!", "error");
                        }else{


                            $http({
                                method: 'POST',
                                url: myProvider.getMatriculaxCedulaPeriodo(),
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': token
                                },
                                data: {

                                    cedula: cedula,
                                    id_periodo: $scope.id_perido_actual

                                }


                            }).then(function successCallback(response) {
                                console.log(response.data);

                                if (response.data.length == 0) {


                                    $http({
                                        method: 'POST',
                                        url: myProvider.getSaveMatricula(),
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': token
                                        },
                                        data: {

                                            cedula: cedula,
                                            id_nivel: nivel,
                                            fecha: fecha_act,
                                            estado:"Pendiente",
                                            id_periodo: $scope.id_perido_actual

                                        }


                                    }).then(function successCallback(response) {
                                        console.log(response.data);

                                        if (response.data.length == 0) {

                                            swal("Error!", "Error al ingresar la matricula!", "error");
                                        } else {

                                            swal("Exitoso!", "Se ingreso correctamente!", "success");
                                            console.log($scope.id_perido_actual);
                                            $('#button5').hide();
                                            $('#button6').hide();
                                            $('#button7').show();
                                            $('#button8').show();

                                            //----------------consulat si estan asociados los padres

                                            $http({
                                                method: 'POST',
                                                url: myProvider.getParentsBySon(),
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Authorization': token
                                                },
                                                data: {

                                                    cedula: cedula,

                                                }


                                            }).then(function successCallback(response) {
                                                console.log(response.data);

                                                if(response.data.length==0){

                                                    swal("Alerta!", "No existen padres asociados!", "warning");
                                                    $('#button5').show();
                                                    $('#button6').show();
                                                    $('#button7').hide();
                                                    $('#button8').hide();

                                                }else{

                                                    var padres = response.data;
                                                    var cedulapadre = padres[0].CI_PADRE;
                                                    console.log("obtengo las cedulas de los padres");
                                                    console.log("padre:"+cedulapadre);
                                                    if(padres[1]!=undefined)
                                                    {
                                                        var cedulamadre = padres[1].CI_PADRE;

                                                        console.log("madre:"+cedulamadre);
                                                    }


                                                    $http({
                                                        method: 'POST',
                                                        url: myProvider.consultarpadres(),
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'Authorization': token
                                                        },
                                                        data: {

                                                            cedula: cedulapadre

                                                        }


                                                    }).then(function successCallback(response) {
                                                        console.log(response.data);

                                                        if (response.data.length == 0) {

                                                            alert('Error al ingresar');
                                                        } else {

                                                            $scope.padre = response.data;


                                                        }


                                                    }, function errorCallback(response) {

                                                        alert('error al realizar Ingreso');

                                                    });

                                                    $http({
                                                        method: 'POST',
                                                        url: myProvider.consultarpadres(),
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'Authorization': token
                                                        },
                                                        data: {

                                                            cedula: cedulamadre

                                                        }


                                                    }).then(function successCallback(response) {
                                                        console.log(response.data);

                                                        if (response.data.length == 0) {

                                                            alert('Error al ingresar');
                                                        } else {

                                                            $scope.madre = response.data;


                                                        }


                                                    }, function errorCallback(response) {

                                                        alert('error al realizar Ingreso');

                                                    });




                                                }


                                            }, function errorCallback(response) {
                                                // called asynchronously if an error occurs
                                                // or server returns response with an error status.
                                                // console.log(response);
                                                //$scope.mesaje = response.mensaje;
                                                alert('error al realizar Ingreso');

                                            });





                                        }


                                    }, function errorCallback(response) {


                                        swal("Error!", "Error al realizar Ingreso!", "Error");

                                    });





                                } else {


                                    window.localStorage["cedulaestu"]= cedula;
                                    console.log("se guardo el localStorage");

                                    $http({
                                        method: 'POST',
                                        url: myProvider.updateMatricula(),
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': token
                                        },
                                        data: {

                                            cedula: cedula,
                                            id_nivel: nivel,
                                            fecha: fecha_act,
                                            estado:"Pendiente",
                                            id_periodo: $scope.id_perido_actual

                                        }


                                    }).then(function successCallback(response) {
                                        console.log(response.data);

                                        if (response.data.length == 0) {

                                            swal("Error!", "No se puedo modificar la matricula!", "error");
                                        } else {

                                            swal("Exito!", "Se modifico correctamente el estudiante!", "success");
                                            $('#button5').hide();
                                            $('#button6').hide();
                                            $('#button7').show();
                                            $('#button8').show();

                                            //----------------consulat si estan asociados los padres

                                            $http({
                                                method: 'POST',
                                                url: myProvider.getParentsBySon(),
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Authorization': token
                                                },
                                                data: {

                                                    cedula: cedula,

                                                }


                                            }).then(function successCallback(response) {
                                                console.log(response.data);

                                                if(response.data.length==0){

                                                    swal("Alerta!", "No existen padres asociados!", "warning");
                                                    $('#button5').show();
                                                    $('#button6').show();
                                                    $('#button7').hide();
                                                    $('#button8').hide();

                                                }else{

                                                    var padres = response.data;
                                                    var cedulapadre = padres[0].CI_PADRE;
                                                    console.log("obtengo las cedulas de los padres");
                                                    console.log("padre:"+cedulapadre);
                                                    if(padres[1]!=undefined)
                                                    {
                                                        var cedulamadre = padres[1].CI_PADRE;

                                                        console.log("madre:"+cedulamadre);
                                                    }


                                                    $http({
                                                        method: 'POST',
                                                        url: myProvider.consultarpadres(),
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'Authorization': token
                                                        },
                                                        data: {

                                                            cedula: cedulapadre

                                                        }


                                                    }).then(function successCallback(response) {
                                                        console.log(response.data);

                                                        if (response.data.length == 0) {

                                                            alert('Error al ingresar');
                                                        } else {

                                                            $scope.padre = response.data;


                                                        }


                                                    }, function errorCallback(response) {

                                                        alert('error al realizar Ingreso');

                                                    });

                                                    $http({
                                                        method: 'POST',
                                                        url: myProvider.consultarpadres(),
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'Authorization': token
                                                        },
                                                        data: {

                                                            cedula: cedulamadre

                                                        }


                                                    }).then(function successCallback(response) {
                                                        console.log(response.data);

                                                        if (response.data.length == 0) {

                                                            alert('Error al ingresar');
                                                        } else {

                                                            $scope.madre = response.data;


                                                        }


                                                    }, function errorCallback(response) {

                                                        alert('error al realizar Ingreso');

                                                    });




                                                }


                                            }, function errorCallback(response) {
                                                // called asynchronously if an error occurs
                                                // or server returns response with an error status.
                                                // console.log(response);
                                                //$scope.mesaje = response.mensaje;
                                                alert('error al realizar Ingreso');

                                            });


                                        }


                                    }, function errorCallback(response) {

                                        alert('error al realizar Ingreso');

                                    });
                                }


                            }, function errorCallback(response) {
                                // called asynchronously if an error occurs
                                // or server returns response with an error status.
                                // console.log(response);
                                //$scope.mesaje = response.mensaje;
                                alert('error al realizar Ingreso');

                            });





                        }


                    }, function errorCallback(response) {

                        alert('error al realizar Ingreso');

                    });

                }else {
                    alert("La edad exede para el Nivel 2 (4-5)años");
                }

            }else
            {
                alert("no tiene la minima edad para ingresar a NIvel 2 (3-4)años");
            }
        }





    }

    $scope.enviarDatosPadre = function () {

            var cedulapa = $('#textcedulapa').val();
            var nombrepa = $('#textnombrepa').val();
            var lugartrapa = $('#textlugar_trapa').val();
            var direccion_trapa= $('#textdir_trapa').val();
            var telefonopa = $('#texttel_pa').val();
            var emailpa = $('#textemail_pa').val();
            var domiciliopa = $('#textdir_do_pa').val();
            var tipo_vipa = document.getElementById("viviendapa").value;
            var teauxpa = $('#texttel_aux_pa').val();
            var id_tipopa = 1;

            var cedulama = $('#textcedulama').val();
            var nombrema = $('#textnombrema').val();
            var lugartrama = $('#textlugar_trama').val();
            var  direccion_trama = $('#textdir_trama').val();
            var telefonoma = $('#texttel_ma').val();
            var emailma = $('#textemail_ma').val();
            var domicilioma = $('#textdir_do_ma').val();
            var tipo_vima = document.getElementById("viviendama").value;
            var teauxma = $('#texttel_aux_ma').val();
            var id_tipoma = 2;

        if(($scope.validar_cedula(cedulapa) == 1) && ($scope.validar_cedula(cedulama) == 1))
        {
            $http({
                method: 'POST',
                url: myProvider.getSavePadre(),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                data: {

                    cedulapa: cedulapa,
                    nombrepa: nombrepa,
                    lugarpa: lugartrapa,
                    direccion_trapa:direccion_trapa,
                    telefonopa:telefonopa,
                    emailpa:emailpa,
                    domiciliopa: domiciliopa,
                    tipo_vipa: tipo_vipa,
                    teauxpa: teauxpa,
                    id_tipopa:id_tipopa,

                    cedulama:cedulama,
                    nombrema:nombrema,
                    lugartrama:lugartrama,
                    direccion_trama:direccion_trama,
                    telefonoma:telefonoma,
                    emailma:emailma ,
                    domicilioma:domicilioma,
                    tipo_vima:tipo_vima,
                    teauxma:teauxma,
                    id_tipoma:id_tipoma
                    //recaptcha:recaptcha,

                }

            }).then(function successCallback(response) {
                console.log(response.data);

                if (response.data.length == 0) {

                    swal("Error!", "No se ingreso corectamente los datos de los padres!", "error");
                } else {

                    swal("Exitoso!", "Se ingreso coreectamente los datos de los padres!", "success");


                    $scope.estu=  localStorage.getItem("cedulaestu");
                    var cedula_estu = $scope.estu;


                    $http({
                        method: 'POST',
                        url: myProvider.saveEstu_padre(),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        },
                        data: {

                            cedula:cedulapa,
                            cedulaestu:cedula_estu,
                            cedulama:cedulama


                        }


                    }).then(function successCallback(response) {
                        console.log(response.data);

                        if (response.data.length == 0) {

                            swal("Error!", "No se ingreso corectamente los datos estudiante padres!", "error");
                        } else {



                            $("#estado_proceso").html("<h1> Proceso terminado correctamente!!</h1>");
                            $('#buttonimprimir').show();

                        }


                    }, function errorCallback(response) {

                        alert('error al realizar Ingreso');

                    });


                }

            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });

        }
        if(($scope.validar_cedula(cedulapa) == 0))
        {
            swal("Error!", "Cedula del PADRE esta incorrecto, ingrese una cedula correcta!", "error");
        }
        if(($scope.validar_cedula(cedulama) == 0))
        {
            swal("Error!", "Cedula del MADRE esta incorrecto, ingrese una cedula correcta!", "error");
        }
        if(($scope.validar_cedula(cedulapa) == 0)&&($scope.validar_cedula(cedulama) == 0))
        {
            swal("Error!", "Las cedulas del PADRE y la MADRE estan INCORRECTAS!", "error");
        }





     }

    $scope.modificarDatosPadres = function () {

        var cedulapa = $('#textcedulapa').val();
        var nombrepa = $('#textnombrepa').val();
        var lugartrapa = $('#textlugar_trapa').val();
        var  direccion_trapa= $('#textdir_trapa').val();
        var telefonopa = $('#texttel_pa').val();
        var emailpa = $('#textemail_pa').val();
        var domiciliopa = $('#textdir_do_pa').val();
        var tipo_vipa = document.getElementById("viviendapa").value;
        var teauxpa = $('#texttel_aux_pa').val();
        var id_tipopa = 1;

        var cedulama = $('#textcedulama').val();
        var nombrema = $('#textnombrema').val();
        var lugartrama = $('#textlugar_trama').val();
        var  direccion_trama = $('#textdir_trama').val();
        var telefonoma = $('#texttel_ma').val();
        var emailma = $('#textemail_ma').val();
        var domicilioma = $('#textdir_do_ma').val();
        var tipo_vima = document.getElementById("viviendama").value;
        var teauxma = $('#texttel_aux_ma').val();
        var id_tipoma = 2;

        $http({
            method: 'POST',
            url: myProvider.getUpdatePadre(),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {

                cedulapa: cedulapa,
                nombrepa: nombrepa,
                lugarpa: lugartrapa,
                direccion_trapa:direccion_trapa,
                telefonopa:telefonopa,
                emailpa:emailpa,
                domiciliopa: domiciliopa,
                tipo_vipa: tipo_vipa,
                teauxpa: teauxpa,
                id_tipopa:id_tipopa,

                cedulama:cedulama,
                nombrema:nombrema,
                lugartrama:lugartrama,
                direccion_trama:direccion_trama,
                telefonoma:telefonoma,
                emailma:emailma ,
                domicilioma:domicilioma,
                tipo_vima:tipo_vima,
                teauxma:teauxma,
                id_tipoma:id_tipoma
                //recaptcha:recaptcha,

            }


        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Error!", "No se modifico corectamente los datos de los padres!", "error");
            } else {

                swal("Exito!", "Se modifico corectamente los datos de los padres!", "success");
                $("#estado_proceso").html("<h1> Proceso terminado correctamente!!</h1>");
                $('#buttonimprimir').show();


            }

        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });



    }
$scope.seleccion ;
    $scope.select_nivel = function () {


        var nivel1 = JSON.parse(document.getElementById("nivel").value);
        var nivel = nivel1.ID_NIVEL;
        var estado = document.getElementById("estado_mat").value;

        $scope.info={};
        $scope.info.nivel=nivel1.DESCRIPCION_NIVEL;
        $scope.info.estado=estado;

        $scope.visualizarboton =false;
        $scope.visualizaracciones =true;
        console.log(nivel1);
        console.log(estado);
        $('#botonimprimirlista').hide();

        if(estado=="Aceptado")
        {
            $('#paralelo').show();
            $('#labelpara').show();
            $('#botonimprimirlista').show();
            $scope.info.paralelo = "A";
            $scope.visualizarboton =true;
            $scope.visualizaracciones =false;
            $scope.canpeticionnivel = "";
            $http({
                method: 'POST',
                url: myProvider.getParalelos_Nivel(),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                data: {

                    id_nivel:nivel,
                    id_periodo:$scope.id_perido_actual
                }


            }).then(function successCallback(response) {
                //console.log(response.data);

                if (response.data.length == 0) {

                    // alert('No existen paralelos para este nivel');
                    $scope.paralelos={};
                } else {

                    $scope.paralelos = response.data;
                    $scope.numestupara = $scope.paralelos[0].CANTIDAD_ESTU;
                    console.log($scope.paralelos);

                    $http({
                        method: 'POST',
                        url: myProvider.getMat_Estu_Para(),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        },
                        data: {

                            id_nivel:nivel,
                            paralelo:$scope.paralelos[0].ID_PARALELO,
                            id_periodo:$scope.id_perido_actual

                        }


                    }).then(function successCallback(response) {
                        console.log(response.data);

                        if (response.data.length == 0) {

                            //alert('No existen estudiantes');
                            $scope.estu_mat={};
                            $scope.canactualestu = 0;

                        } else {

                            $scope.estu_mat = response.data;
                            console.log($scope.estu_mat);
                            console.log("cantidad de registros"+response.data.length);
                            $scope.canactualestu = response.data.length;
                            console.log($scope.canactualestu);



                            //alert('Busqueda exitosa');

                        }


                    }, function errorCallback(response) {

                        alert('error al realizar la busqueda');

                    });

                    //alert('Busqueda exitosa');

                }


            }, function errorCallback(response) {

                alert('error al realizar la busqueda');

            });






        }else {
            $('#paralelo').hide();
            $('#labelpara').hide();
            $scope.numestupara ="";
            $scope.canactualestu ="";

            $http({
                method: 'POST',
                url: myProvider.getMat_Estu(),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                data: {

                    id_nivel:nivel,
                    estado:estado,
                    id_periodo: $scope.id_perido_actual

                }


            }).then(function successCallback(response) {
                console.log(response.data);

                if (response.data.length == 0) {

                    // alert('No existen usuarios en la BD');
                    $scope.estu_mat={};
                    $scope.canpeticionnivel ="";
                } else {

                    $scope.estu_mat = response.data;
                    $scope.canpeticionnivel = response.data.length;

                    
                    $http({
                        method: 'POST',
                        url: myProvider.getParalelos_Nivel(),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        },
                        data: {

                            id_nivel:nivel,
                            id_periodo: $scope.id_perido_actual
                        }


                    }).then(function successCallback(response) {
                        //console.log(response.data);

                        if (response.data.length == 0) {

                            // alert('No existen paralelos para este nivel');
                            $scope.paralelos={};

                        } else {

                            $scope.paralelos = response.data;

                            console.log($scope.paralelos);
                            //alert('Busqueda exitosa');


                        }


                    }, function errorCallback(response) {

                        alert('error al realizar la busqueda');

                    });


                    //alert('Busqueda exitosa');

                }


            }, function errorCallback(response) {

                alert('error al realizar la busqueda');

            });


        }
        $timeout(function(){

            $('#datatable').dataTable({
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }


            });
        }, 1500, false);



    }

    $scope.filtro_paralelor = function () {


        var nivel1 = JSON.parse(document.getElementById("nivel").value);
        var nivel = nivel1.ID_NIVEL;
        var paralelo1 = JSON.parse(document.getElementById("paralelo").value);
        var paralelo = paralelo1.ID_PARALELO;

        $scope.info.paralelo=paralelo1.DESCRIPCION_PARA;
        $scope.canpeticionnivel = "";


        console.log(nivel);
        console.log(paralelo);

            $http({
                method: 'POST',
                url: myProvider.getMat_Estu_Para(),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                data: {

                    id_nivel:nivel,
                    paralelo:paralelo,
                    id_periodo:$scope.id_perido_actual

                }


            }).then(function successCallback(response) {
                //console.log(response.data);

                if (response.data.length == 0) {

                    // alert('No existen usuarios en la BD');
                    $scope.estu_mat={};
                    $scope.canactualestu=0;
                } else {

                    $scope.estu_mat = response.data;
                    $scope.canactualestu = response.data.length;



                    console.log("for empieza");
                    $scope.listaReporte3=[];
                    var n = $scope.estu_mat.length;
                    var aux1=n;
                    var b=0;

                    for(var i = 0; i < n; i++)
                    {





                        $http({
                            method: 'POST',
                            url: myProvider.getReporte(),
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': token
                            },
                            data: {

                                cedula: $scope.estu_mat[i].CEDULA


                            }


                        }).then(function successCallback(response) {
                            //console.log(response.data);

                            if (response.data.length == 0) {



                            } else {



                                if (i == n) {

                                    aux1=aux1-1;
                                    console.log(aux1);
                                    if (aux1==0){
                                        console.log(aux1);
                                        console.log(b);
                                        console.log("verdad "+b);
                                        // objeto.listaSintomasAsociados[b]={nombre:aux.descripcion};

                                        var datos_mostrar = Object.assign({},{CELULARPA:response.data[0].TEL_PADRE},{CELULARMA:response.data[1].TEL_PADRE},$scope.estu_mat[b]);
                                        console.log(datos_mostrar);
                                        $scope.listaReporte3.push(datos_mostrar);
                                        console.log($scope.listaReporte3);

                                        b++;

                                    }
                                    else {
                                        console.log(aux1);
                                        console.log(b);
                                        //siempre empieza aqui
                                        // objeto.listaSintomasAsociados[b]={nombre:aux.descripcion};
                                        var datos_mostrar = Object.assign({},{CELULARPA:response.data[0].TEL_PADRE},{CELULARMA:response.data[1].TEL_PADRE},$scope.estu_mat[b]);
                                        console.log(datos_mostrar);
                                        $scope.listaReporte3.push(datos_mostrar);


                                        console.log("falso "+b);
                                        b++;
                                    }

                                }








                            }


                        }, function errorCallback(response) {

                            alert('error al realizar la busqueda');

                        });




                    }
                    console.log($scope.datos_reporte);


                    //alert('Busqueda exitosa');

                }


            }, function errorCallback(response) {

                alert('error al realizar la busqueda');

            });
//-------------Saber la cantidad del paralelo
        $http({
            method: 'POST',
            url: myProvider.getParaleloId(),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {

                paralelo:paralelo,
                id_periodo:$scope.id_perido_actual


            }


        }).then(function successCallback(response) {
            //console.log(response.data);

            if (response.data.length == 0) {

                // alert('No existen usuarios en la BD');
                $scope.paraleloporID={};
            } else {

                $scope.paraleloporID = response.data;
                console.log($scope.paraleloporID);
                $scope.numestupara = $scope.paraleloporID[0].CANTIDAD_ESTU;
                console.log($scope.numestupara);



                //alert('Busqueda exitosa');

            }


        }, function errorCallback(response) {

            alert('error al realizar la busqueda');

        });



    }



    $scope.AceptarParalelo = function (valor,y) {

       if((valor.ANIOS>=1)&&(valor.MESES>=6))
       {
           var cedula = valor.CEDULA;
           var paralelo = y.ID_PARALELO;
           var estado = "Aceptado";
           var nivel1 = JSON.parse(document.getElementById("nivel").value);
           var nivel = nivel1.ID_NIVEL;
           var estado1 = document.getElementById("estado_mat").value;



           ///////////////////////////////////////////////////////////////////

           $http({
               method: 'POST',
               url: myProvider.getMat_Estu_Para(),
               headers: {
                   'Content-Type': 'application/json',
                   'Authorization': token
               },
               data: {

                   id_nivel:nivel,
                   paralelo:paralelo,
                   id_periodo:$scope.id_perido_actual

               }


           }).then(function successCallback(response) {
               //console.log(response.data);



               $scope.canestu = response.data.length;

               //-------------Saber la cantidad del paralelo
               $http({
                   method: 'POST',
                   url: myProvider.getParaleloId(),
                   headers: {
                       'Content-Type': 'application/json',
                       'Authorization': token
                   },
                   data: {

                       paralelo:paralelo,
                       id_periodo:$scope.id_perido_actual

                   }


               }).then(function successCallback(response) {
                   //console.log(response.data);

                   if (response.data.length == 0) {

                       alert('No hay paralelos para este nivel');

                   } else {
                       //alert('zzz');
                       $scope.paraleloporID = response.data;
                       console.log($scope.paraleloporID);
                       $scope.nummaximo = $scope.paraleloporID[0].CANTIDAD_ESTU;

                       console.log($scope.canestu);
                       console.log($scope.nummaximo);

                       if($scope.canestu<$scope.nummaximo)
                       {
                           $http({
                               method: 'POST',
                               url: myProvider.getAsig_Estu_Para(), //modifica la matricula agregando paralelo y cambiando de estado a aprobado
                               headers: {
                                   'Content-Type': 'application/json',
                                   'Authorization': token
                               },
                               data: {

                                   cedula: cedula,
                                   paralelo: paralelo,
                                   estado: estado,
                                   id_periodo:$scope.id_perido_actual

                               }


                           }).then(function successCallback(response) {
                               //console.log(response.data);

                               if (response.data.length == 0) {


                               } else {



                                   // alert("aqui");
                                   $http({
                                       method: 'POST',
                                       url: myProvider.getMat_Estu(),
                                       headers: {
                                           'Content-Type': 'application/json',
                                           'Authorization': token
                                       },
                                       data: {

                                           id_nivel: nivel,
                                           estado: estado1,
                                           id_periodo:$scope.id_perido_actual

                                       }


                                   }).then(function successCallback(response) {
                                       console.log(response.data);

                                       if (response.data.length == 0) {

                                           // alert('No existen usuarios en la BD');
                                           $scope.estu_mat = {};
                                       } else {

                                           $scope.estu_mat = response.data;
                                           $http({
                                               method: 'POST',
                                               url: myProvider.getParalelos_Nivel(),
                                               headers: {
                                                   'Content-Type': 'application/json',
                                                   'Authorization': token
                                               },
                                               data: {

                                                   id_nivel: nivel
                                                   ,id_periodo:$scope.id_perido_actual
                                               }


                                           }).then(function successCallback(response) {
                                               //console.log(response.data);

                                               if (response.data.length == 0) {

                                                   // alert('No existen paralelos para este nivel');
                                                   $scope.paralelos = {};
                                               } else {

                                                   $scope.paralelos = response.data;

                                                   console.log($scope.paralelos);
                                                   //alert('Busqueda exitosa');
                                                   //alert("aca");

                                               }


                                           }, function errorCallback(response) {

                                               alert('error al realizar la busqueda');

                                           });


                                           //alert('Busqueda exitosa');

                                       }


                                   }, function errorCallback(response) {

                                       alert('error al realizar la busqueda');

                                   });


                               }


                           }, function errorCallback(response) {

                               alert('error al realizar la busqueda');

                           });

                       }else
                       {
                           alert("Supero el numero maximo de estudiantes en este paralelo, escoja otro paralelo")
                       }




                       //alert('Busqueda exitosa');

                   }


               }, function errorCallback(response) {

                   alert('error al realizar la busqueda');

               });

               ///////////////////////////////////////////////////////////////////////77



               //alert('Busqueda exitosa');




           }, function errorCallback(response) {

               alert('error al realizar la busqueda');

           });
       }else
       {
           alert ("no cumple con el minimo de edad ");
       }







    }

    $scope.ImprimirFac = function (infofac) {
        var nivel1 = JSON.parse(document.getElementById("nivel").value);

        console.log(infofac);
        console.log($scope.info.nivel);
        infofac.nivel =  nivel1.ID_NIVEL;
        window.localStorage.setItem("datosfactura", JSON.stringify(infofac));
        $location.path('/datosFactura');




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




    $scope.Imprimir_lista_de_alumnos = function (lista) {


        console.log(lista[0].NOMBRE_PER);

        var doc = new jsPDF('p', 'mm', [297, 210]);

        var x=25;
        var y=25;


        doc.addImage(img.onload(), 'PNG', x, y-20, 165, 25);
        doc.rect(x, y+10, 165,10, 'S')
        doc.setFontSize(8);
        doc.setFontType("bold");
        doc.text( "PERIODO: ",x+5, y+16);
        doc.setFontType("normal");
        doc.text( $scope.peri_actual,x+20, y+16);
        doc.setFontSize(10);
        doc.setFontType("bold");
        doc.text( "LISTA DE ALUMNOS ",x+60, y+16);
        doc.setFontSize(8);
        doc.setFontType("bold");
        doc.text( "NIVEL: ",x+135, y+16);
        doc.setFontType("normal");
        doc.text( $scope.info.nivel ,x+145, y+16);

        doc.setFontSize(8);
        doc.setFontType("bold");
        doc.text( "PARALELO: ",x+5, y+25);
        doc.setFontType("normal");
        doc.text( $scope.info.paralelo ,x+23, y+25);
        doc.setFontType("bold");
        doc.text( "PROFESOR: ",x+5, y+30);
        doc.setFontType("normal");
        doc.text( lista[0].NOMBRE_PER,x+23, y+30);

        doc.rect(x, y+35, 165,220, 'S')
      
        var aun = 45;
        for (var i = 0; i < 42; i++) {

            doc.line(x, y+aun, x+165,y+aun)
            aun = aun + 5;

        }


        if($scope.op_reporte == undefined) //imprime el reporte desde el apratdado de cursos
        {
            //lineas vertivales

            doc.line(x, y+40, x+165,y+40)
            doc.line(x+15, y+35, x+15,y+255)
            doc.line(x+50, y+35, x+50,y+255)
            
            doc.setFontSize(10);
            doc.setFontType("bold");
            doc.text( "Num",x+4, y+39);
            doc.text( "Cedula",x+25, y+39);
            doc.text( "Nombre Completo",x+55, y+39);

            doc.setFontSize(10);
            doc.setFontType("normal");
            var z = 44;
            var num = 1;
            for (var i = 0; i < lista.length; i++) {

                doc.text( num.toString() ,x+6, y+z);
                doc.text( lista[i].CEDULA ,x+22, y+z);
                doc.text( lista[i].NOMBRE ,x+55, y+z);
                z = z + 5;
                num = num +1;

            }
        }

        if($scope.op_reporte == "Reporte 2") //Reporte 1
        {

            doc.line(x, y+40, x+165,y+40)
            doc.line(x+10, y+35, x+10,y+255)
            doc.line(x+30, y+35, x+30,y+255)
            doc.line(x+90, y+35, x+90,y+255)

            
            doc.setFontSize(10);
            doc.setFontType("bold");
            doc.text( "Num",x+1, y+39);
            doc.text( "Cedula",x+14, y+39);
            doc.text( "Nombre Completo",x+45, y+39);
            doc.text( "Alimentos excliodos",x+110, y+39);


            doc.setFontSize(8);
            doc.setFontType("normal");
            var z = 44;
            var num = 1;
            for (var i = 0; i < lista.length; i++) {

                doc.text( num.toString() ,x+3, y+z);
                doc.text( lista[i].CEDULA ,x+12, y+z);
                doc.text( lista[i].NOMBRE ,x+32, y+z);
                doc.text( lista[i].ALIMENTOS_EXCLUIDOS ,x+92, y+z);
                z = z + 5;
                num = num +1;

            }
        }

        if($scope.op_reporte == "Reporte 1") //Reporte 1
        {

            doc.line(x, y+40, x+165,y+40)
            doc.line(x+10, y+35, x+10,y+255)
            doc.line(x+30, y+35, x+30,y+255)
            doc.line(x+95, y+35, x+95,y+255)
            doc.line(x+133, y+35, x+133,y+255)
            doc.line(x+150, y+35, x+150,y+255)

            doc.setFontSize(10);
            doc.setFontType("bold");
            doc.text( "Num",x+1, y+39);
            doc.text( "Cedula",x+14, y+39);
            doc.text( "Nombre Completo",x+45, y+39);
            doc.text( "Fecha de nacimiento",x+97, y+39);
            doc.text( "Talla",x+138, y+39);
            doc.text( "Peso",x+154, y+39);

            doc.setFontSize(8);
            doc.setFontType("normal");
            var z = 44;
            var num = 1;
            for (var i = 0; i < lista.length; i++) {

                doc.text( num.toString() ,x+3, y+z);
                doc.text( lista[i].CEDULA ,x+12, y+z);
                doc.text( lista[i].NOMBRE ,x+32, y+z);
                doc.text( lista[i].FECHA_NACIMIENTO ,x+105, y+z);
                doc.text( lista[i].TALLA.toString() ,x+140, y+z);
                doc.text( lista[i].PESO.toString() ,x+156, y+z);
                z = z + 5;
                num = num +1;

            }
        }

        if($scope.op_reporte == "Reporte 3") //Reporte 1
        {

            doc.line(x, y+40, x+165,y+40)
            doc.line(x+10, y+35, x+10,y+255)
            doc.line(x+30, y+35, x+30,y+255)
            doc.line(x+85, y+35, x+85,y+255)
            doc.line(x+107, y+35, x+107,y+255)
            doc.line(x+130, y+35, x+130,y+255)

            doc.setFontSize(8);
            doc.setFontType("bold");
            doc.text( "Num",x+1, y+39);
            doc.text( "Cedula",x+14, y+39);
            doc.text( "Nombre Completo",x+45, y+39);
            doc.text( "Celular papá",x+87, y+39);
            doc.text( "Celular mamá",x+109, y+39);
            doc.text( "Telefono de domiciolio",x+133, y+39);

            doc.setFontSize(7);
            doc.setFontType("normal");
            var z = 44;
            var num = 1;
            for (var i = 0; i < lista.length; i++) {

                doc.text( num.toString() ,x+3, y+z);
                doc.text( lista[i].CEDULA ,x+12, y+z);
                doc.text( lista[i].NOMBRE ,x+32, y+z);
                doc.text( lista[i].CELULARPA ,x+89, y+z);
                doc.text( lista[i].CELULARMA ,x+111, y+z);
                doc.text( lista[i].TEL_EMERGENCIA ,x+140, y+z);
                z = z + 5;
                num = num +1;

            }
        }

        if($scope.op_reporte == "Reporte 4") //Reporte 1
        {

            doc.line(x, y+40, x+165,y+40)
            doc.line(x+10, y+35, x+10,y+255)
            doc.line(x+30, y+35, x+30,y+255)
            doc.line(x+75, y+35, x+75,y+255)
            doc.line(x+120, y+35, x+120,y+255)
            doc.line(x+142, y+35, x+142,y+255)

            doc.setFontSize(7);
            doc.setFontType("bold");
            doc.text( "Num",x+1, y+39);
            doc.text( "Cedula",x+12, y+39);
            doc.text( "Nombre Estudiante",x+42, y+39);
            doc.text( "Nombre del repre",x+77, y+39);
            doc.text( "CI del repre",x+124, y+39);
            doc.text( "Direccion",x+144, y+39);

            doc.setFontSize(6);
            doc.setFontType("normal");
            var z = 44;
            var num = 1;
            for (var i = 0; i < lista.length; i++) {

                doc.text( num.toString() ,x+3, y+z);
                doc.text( lista[i].CEDULA ,x+12, y+z);
                doc.text( lista[i].NOMBRE ,x+32, y+z);
                doc.text( lista[i].NOMBREPA ,x+77, y+z);
                doc.text( lista[i].CEDULAPA ,x+122, y+z);
                doc.text( lista[i].DIRECCION_RE ,x+143, y+z);
                z = z + 5;
                num = num +1;

            }
        }







        doc.save('Listado.pdf');




    }


    $scope.reporteInicio=function(){



        $('#paralelo').show();
        $('#labelpara').show();

        $('#table1').hide();
        $('#table2').hide();
        $('#table3').hide();
        $('#table4').hide();



        //inicializar niveles
        $http({
            method: 'POST',
            url: myProvider.getAllNiveles(),
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
                console.log(response.data);
                $scope.niveles = response.data;
                $scope.seleccion = $scope.niveles[0].id_nivel;

                //alert('Busqueda exitosa');

            }


        }, function errorCallback(response) {

            alert('error al realizar la busqueda');

        });

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

            $scope.id_perido_actual = response.data[0].ID_PERIODO;
            console.log($scope.id_perido_actual);

            $http({
                method: 'POST',
                url: myProvider.getIdPeriodo(),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                data: {
                    id_periodo: $scope.id_perido_actual
                }


            }).then(function successCallback(response) {
                console.log(response.data);
                $scope.peri_actual = response.data[0].DESCRIPCION_PERI;
                console.log($scope.peri_actual);



            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });

    }

    $scope.selection_nivel = function () {
        $scope.datos_reporte = [];
        $scope.valor ={};
        var nivel1 = JSON.parse(document.getElementById("nivel").value);
        var nivel = nivel1.ID_NIVEL;

        $scope.info={};
        $scope.info.nivel=nivel1.DESCRIPCION_NIVEL;

        $('#botonimprimirlista').hide();

///-------------------------------------------------------
            $('#paralelo').show();
            $('#labelpara').show();
            $('#botonimprimirlista').show();
            $scope.info.paralelo = "A";

        if(($scope.op_reporte != "Reporte 3") && ($scope.op_reporte != "Reporte 4")) {

            $http({
                method: 'POST',
                url: myProvider.getParalelos_Nivel(),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                data: {

                    id_nivel: nivel,
                    id_periodo: $scope.id_perido_actual
                }


            }).then(function successCallback(response) {
                //console.log(response.data);

                if (response.data.length == 0) {

                    // alert('No existen paralelos para este nivel');
                    $scope.paralelos = {};
                } else {

                    $scope.paralelos = response.data;
                    console.log($scope.paralelos);

                    $http({
                        method: 'POST',
                        url: myProvider.getMat_Estu_Para(),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        },
                        data: {

                            id_nivel: nivel,
                            paralelo: $scope.paralelos[0].ID_PARALELO,
                            id_periodo: $scope.id_perido_actual

                        }


                    }).then(function successCallback(response) {
                        //console.log(response.data);

                        if (response.data.length == 0) {

                            //alert('No existen estudiantes');
                            $scope.estu_mat = {};
                            $scope.canactualestu = 0;

                        } else {

                            $scope.estu_mat = response.data;
                            console.log($scope.estu_mat);


                        }


                    }, function errorCallback(response) {

                        alert('error al realizar la busqueda');

                    });

                    //alert('Busqueda exitosa');

                }


            }, function errorCallback(response) {

                alert('error al realizar la busqueda');

            });
        }

        if(($scope.op_reporte == "Reporte 3")||($scope.op_reporte == "Reporte 4"))
        {



            $http({
                method: 'POST',
                url: myProvider.getParalelos_Nivel(),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                data: {

                    id_nivel: nivel,
                    id_periodo: $scope.id_perido_actual
                }


            }).then(function successCallback(response) {
                //console.log(response.data);

                if (response.data.length == 0) {

                    // alert('No existen paralelos para este nivel');
                    $scope.paralelos = {};
                } else {

                    $scope.paralelos = response.data;
                    console.log($scope.paralelos);

                    $http({
                        method: 'POST',
                        url: myProvider.getMat_Estu_Para(),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        },
                        data: {

                            id_nivel: nivel,
                            paralelo: $scope.paralelos[0].ID_PARALELO,
                            id_periodo: $scope.id_perido_actual

                        }


                    }).then(function successCallback(response) {
                        //console.log(response.data);

                        if (response.data.length == 0) {

                            //alert('No existen estudiantes');
                            $scope.estu_mat = {};
                            $scope.canactualestu = 0;

                        } else {


                            $scope.estu_mat = response.data;
                            console.log($scope.estu_mat);
                            console.log($scope.estu_mat.length);


                            console.log("for empieza");
                            $scope.listaReporte3=[];
                            var n = $scope.estu_mat.length;
                            var aux1=n;
                            var b=0;

                            for(var i = 0; i < n; i++)
                            {





                                $http({
                                    method: 'POST',
                                    url: myProvider.getReporte(),
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': token
                                    },
                                    data: {

                                        cedula: $scope.estu_mat[i].CEDULA


                                    }


                                }).then(function successCallback(response) {
                                    //console.log(response.data);

                                    if (response.data.length == 0) {



                                    } else {



                                        if (i == n) {

                                            aux1=aux1-1;
                                            console.log(aux1);
                                            if (aux1==0){
                                                console.log(aux1);
                                                console.log(b);
                                                console.log("verdad "+b);
                                                // objeto.listaSintomasAsociados[b]={nombre:aux.descripcion};

                                                var datos_mostrar = Object.assign({},{CELULARPA:response.data[0].TEL_PADRE},{CELULARMA:response.data[1].TEL_PADRE},{NOMBREPA:response.data[0].NOMBRE},{CEDULAPA:response.data[0].CI_PADRE},{DIRECCION_RE:response.data[0].DIRECCION_DOMICILIO},$scope.estu_mat[b]);
                                                console.log(datos_mostrar);
                                                $scope.listaReporte3.push(datos_mostrar);
                                                console.log($scope.listaReporte3);

                                                b++;

                                            }
                                            else {
                                                console.log(aux1);
                                                console.log(b);
                                                //siempre empieza aqui
                                                // objeto.listaSintomasAsociados[b]={nombre:aux.descripcion};
                                                var datos_mostrar = Object.assign({},{CELULARPA:response.data[0].TEL_PADRE},{CELULARMA:response.data[1].TEL_PADRE},{NOMBREPA:response.data[0].NOMBRE},{CEDULAPA:response.data[0].CI_PADRE},{DIRECCION_RE:response.data[0].DIRECCION_DOMICILIO},$scope.estu_mat[b]);
                                                console.log(datos_mostrar);
                                                $scope.listaReporte3.push(datos_mostrar);


                                                console.log("falso "+b);
                                                b++;
                                            }

                                        }








                                    }


                                }, function errorCallback(response) {

                                    alert('error al realizar la busqueda');

                                });




                            }
                            console.log($scope.datos_reporte);


                        }


                    }, function errorCallback(response) {

                        alert('error al realizar la busqueda');

                    });

                    //alert('Busqueda exitosa');

                }


            }, function errorCallback(response) {

                alert('error al realizar la busqueda');

            });


            $timeout(function(){


            }, 800, false);


        }

        if($scope.op_reporte == "Reporte 4")
        {
            $http({
                method: 'POST',
                url: myProvider.getParalelos_Nivel(),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                data: {

                    id_nivel: nivel,
                    id_periodo: $scope.id_perido_actual
                }


            }).then(function successCallback(response) {
                //console.log(response.data);

                if (response.data.length == 0) {

                    // alert('No existen paralelos para este nivel');
                    $scope.paralelos = {};
                } else {

                    $scope.paralelos = response.data;
                    console.log($scope.paralelos);

                    $http({
                        method: 'POST',
                        url: myProvider.getMat_Estu_Para(),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        },
                        data: {

                            id_nivel: nivel,
                            paralelo: $scope.paralelos[0].ID_PARALELO,
                            id_periodo: $scope.id_perido_actual

                        }


                    }).then(function successCallback(response) {
                        //console.log(response.data);

                        if (response.data.length == 0) {

                            //alert('No existen estudiantes');
                            $scope.estu_mat = {};
                            $scope.canactualestu = 0;

                        } else {

                            $scope.estu_mat = response.data;
                            console.log($scope.estu_mat);


                        }


                    }, function errorCallback(response) {

                        alert('error al realizar la busqueda');

                    });

                    //alert('Busqueda exitosa');

                }


            }, function errorCallback(response) {

                alert('error al realizar la busqueda');

            });
        }


        $timeout(function(){

            $('#datatable').dataTable({
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }


            });
        }, 1500, false);



    }

    $scope.select_reporte = function () {


            $scope.op_reporte = document.getElementById("seleccionar_reporte").value;
            if($scope.op_reporte == "Reporte 1")
            {
                $('#table1').show();
                $('#table2').hide();
                $('#table3').hide();
                $('#table4').hide();
            }
            if($scope.op_reporte == "Reporte 2")
            {
                $('#table1').hide();
                $('#table2').show();
                $('#table3').hide();
                $('#table4').hide();
            }
            if($scope.op_reporte == "Reporte 3")
            {
                $('#table1').hide();
                $('#table2').hide();
                $('#table3').show();
                $('#table4').hide();
            }
            if($scope.op_reporte == "Reporte 4")
            {
                $('#table1').hide();
                $('#table2').hide();
                $('#table3').hide();
                $('#table4').show();
            }





      


    }

}]);