app.controller('nivelesController', ['$scope', '$http', '$location','myProvider','$localStorage',  function ($scope,$http,$location,myProvider,$localStorage) {
    var a    = JSON.parse(window.localStorage.getItem('usuario'));
    var token="Bearer "+ a.id_token;
    $scope.updateNivelesInicio=function(){

       $scope.nivel = JSON.parse(window.localStorage.getItem('nivel'));
        //console.log($scope.updateuser);
       // $scope.updateuser = JSON.parse(window.localStorage.getItem('alluser'));


        
        //   console.log($scope.us);
    }

    $scope.updateParalelosInicio=function(){

        $scope.paraleloini = JSON.parse(window.localStorage.getItem('paralelo'));
        console.log($scope.paraleloini);

        //console.log($scope.updateuser);
        // $scope.updateuser = JSON.parse(window.localStorage.getItem('alluser'));
        $scope.nameparalelo = $scope.paraleloini.DESCRIPCION_PARA;
        $scope.num_estudiantes = $scope.paraleloini.CANTIDAD_ESTU;
        $scope.personalselect = $scope.paraleloini.CEDULA;
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




        //   console.log($scope.us);
    }

    $scope.NivelesInicio=function(){

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

                swal({
                    title: "Mensaje de alerta!",
                    text: "No existe registros, Ingrese registros de niveles.",
                    timer: 3000,
                    showConfirmButton: false
                });
            } else {

                $scope.niveles = response.data;
                //console.log($scope.user);
                //alert('Busqueda exitosa');

            }


        }, function errorCallback(response) {

            alert('error al realizar la busqueda');

        });

        $('#panel').hide();

        //   console.log($scope.us);


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

                $scope.peri_actual = response.data[0].DESCRIPCION_PERI;
                console.log($scope.peri_actual);



            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });


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

    $scope.registrarNiveles=function(){

        var nom_nivel = $('#nombre_nivel').val();
        console.log("hola");
                $http({
                    method: 'POST',
                    url: myProvider.getSaveNivel(),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {

                      descripcion_nivel: nom_nivel,
                      precio:$scope.precio_curso
                      

                    }


                }).then(function successCallback(response) {
                    console.log(response.data);

                    if (response.data.length == 0) {

                        swal("Error!", "El nivel no se ingreso correctamente!", "error");
                    } else {

                        swal("Exito!", "El nivel se ingreso correctamente!", "success");
                        $location.path('/ingresoParalelos');


                    }


                }, function errorCallback(response) {

                    alert('error al realizar Ingreso');

                });




           
        

    }

    $scope.modificarNiveles=function(){

               
                $http({
                    method: 'POST',
                    url: myProvider.updateNivel(),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {

                        descripcion_nivel: $scope.nivel.DESCRIPCION_NIVEL,
                        precio:$scope.nivel.PRECIO,
                        id_nivel:$scope.nivel.ID_NIVEL

                       
                    }


                }).then(function successCallback(response) {
                    console.log(response.data);

                    if (response.data.length == 0) {

                        swal("Error!", "El nivel se modifico correctamente!", "error");
                    } else {

                        swal("Exito!", "El nivel se modifico correctamente!", "success");
                        $location.path("/ingresoNivel");

                    }


                }, function errorCallback(response) {

                    alert('error al realizar Ingreso');

                });



    }

    $scope.cancelarmodificarNiveles=function(){

        $location.path("/ingresoNivel");




    }


    $scope.modiNivel=function(nivel){

        window.localStorage["nivel"]= JSON.stringify(nivel);
        $location.path("/updateNiveles");
    }

    $scope.eliminarNivel=function(nivel){

        swal({
                title: "Estas seguro?",
                text: "Una vez borrado ya no podras recuperar el registro!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si, borrar!",
                closeOnConfirm: false
            },
            function(){

                $http({
                    method: 'POST',
                    url: myProvider.geteliminarNivel(),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {

                        id_nivel: nivel.ID_NIVEL


                    }


                }).then(function successCallback(response) {
                    console.log(response.data);

                    if (response.data.length == 0) {

                        swal("Error!", "El tipo de padre no fue eliminado.", "error");
                    } else {

                        swal("Exito!", "El tipo de padre fue eliminado.", "success");

                        $scope.NivelesInicio();

                    }


                }, function errorCallback(response) {

                    alert('error al realizar Ingreso');

                });
            });

    }

/////funciones de paralelos

    $scope.registrarParalelos=function() {
        console.log($scope.seleccionar_nivel);
        $http({
            method: 'POST',
            url: myProvider.getSaveParalelos(),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {

                descripcion_paralelo: $scope.nameparalelo,
                cantidad: $scope.num_estudiantes,
                id_nivel: $scope.seleccionar_nivel,
                id_periodo: $scope.id_perido_actual


            }


        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Error!", "No se pudo ingresar el paralelo!", "error");
            } else {

                swal("Exito!", "Ingreso de paralelo se realizo de forma correcta!", "success");
                $scope.nameparalelo = "";
                $scope.num_estudiantes = "";
                $scope.id_paralelo_ingre = response.data.insertId;
                console.log($scope.id_paralelo_ingre);


// Permite el registro en la tabla paralelos_personal
                $http({
                    method: 'POST',
                    url: myProvider.getParalelos_Personal(),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {

                        cedula: $scope.personalselect,
                        id_paralelo: $scope.id_paralelo_ingre


                    }


                }).then(function successCallback(response) {
                    console.log(response.data);

                    if (response.data.length == 0) {
                        $scope.listaParalelos = [];
                        $('#panel').show();

                    } else {

                        $scope.mostrarparalelos();
                        
                        $('#panel').show();


                    }


                }, function errorCallback(response) {

                    alert('error al realizar Ingreso');

                });


            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });
    }

        $scope.mostrarparalelos=function() {

            $http({
                method: 'POST',
                url: myProvider.getParalelos_Nivel(),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                data: {

                    id_nivel: $scope.seleccionar_nivel,
                    id_periodo: $scope.id_perido_actual


                }


            }).then(function successCallback(response) {
                console.log(response.data);

                if (response.data.length == 0) {
                    $scope.listaParalelos = [];
                    $('#panel').show();

                } else {


                    $scope.listaParalelos = response.data;
                    console.log($scope.listaParalelos);
                    $('#panel').show();


                }


            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });

        }


    $scope.modiParalelos=function(paralelo){

        window.localStorage["paralelo"]= JSON.stringify(paralelo);
        $location.path("/updateParalelos");
    }
    $scope.cancelarParalelos=function(){

        $location.path("/ingresoParalelos");
    }
    $scope.eliminarParalelos=function(paralelo){

        swal({
                title: "Estas seguro?",
                text: "Una vez borrado ya no podras recuperar el registro!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si, borrar!",
                closeOnConfirm: false
            },
            function(){

                $http({
                    method: 'POST',
                    url: myProvider.geteliminarParalelo(),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {

                        id_paralelo: paralelo.ID_PARALELO


                    }


                }).then(function successCallback(response) {
                    console.log(response.data);

                    if (response.data.length == 0) {

                        swal("Error!", "El tipo de padre no fue eliminado.", "error");
                    } else {

                        swal("Exito!", "El tipo de padre fue eliminado.", "success");

                        $scope.mostrarparalelos();

                    }


                }, function errorCallback(response) {

                    alert('error al realizar Ingreso');

                });
            });

    }



    $scope.modificarParalelos=function(){

        $scope.para = JSON.parse(window.localStorage.getItem('paralelo'));

        $http({
            method: 'POST',
            url: myProvider.updateParalelos(),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {

                nom_para: $scope.nameparalelo,
                cantidad:$scope.num_estudiantes,
                id_paralelo:$scope.para.ID_PARALELO,
                id_periodo:$scope.para.ID_PERIODO


            }


        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Error!", "No se modifico de manera correcta el paralelo!", "error");
            } else {

                $http({
                    method: 'POST',
                    url: myProvider.getUpdateParalelos_Personal(),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {

                        cedula: $scope.personalselect,
                        id_paralelo: $scope.para.ID_PARALELO


                    }


                }).then(function successCallback(response) {
                    console.log(response.data);

                    if (response.data.length == 0) {
                        $scope.listaParalelos = [];
                        $('#panel').show();

                    } else {

                        $scope.mostrarparalelos();

                        $('#panel').show();


                    }


                }, function errorCallback(response) {

                    alert('error al realizar Ingreso');

                });



                swal("Exito!", "madificacion de paralelo se realizo de forma correcta!", "success");




                $location.path("/ingresoParalelos");

            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });



    }


    $scope.limpiarCampo=function(){

        $scope.busquedaPersonal = "";
        console.log($scope.personalselect);


    }


}]);