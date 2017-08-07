app.controller('periodoController', ['$scope', '$http', '$location','myProvider','$localStorage',  function ($scope,$http,$location,myProvider,$localStorage) {


    var a    = JSON.parse(window.localStorage.getItem('usuario'));
    var token="Bearer "+ a.id_token;


    $scope.initPeriodo=function() {
        console.log("aqui");
        $http({
            method: 'POST',
            url: myProvider.getAllPeriodos(),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {

            }


        }).then(function successCallback(response) {

            $scope.listPeriodos = response.data;



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


    }




    $scope.registrarPeriodo=function(){

        var nom_periodo = $scope.periodo;
        console.log("hola");
                $http({
                    method: 'POST',
                    url: myProvider.getSavePeriodo(),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {

                      descripcion: nom_periodo

                      

                    }


                }).then(function successCallback(response) {
                    console.log(response.data);

                    if (response.data.length == 0) {

                        swal("Error!", "Periodo no se agregado corectamente!", "error");
                    } else {

                        swal("Exito!", "Periodo agregado corectamente!", "success");
                        $scope.initPeriodo();

                    }


                }, function errorCallback(response) {

                    alert('error al realizar Ingreso');

                });




           
        

    }

    $scope.escogerPeriodo=function(){

        var periodo_actual = $scope.periodoselect;
        $http({
            method: 'POST',
            url: myProvider.getSavePeriodoActual(),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {

                id_periodo: periodo_actual


            }


        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Error!", "Ups hubo problemas al escoger el periodo!", "error");
            } else {

                swal("Exito!", "Periodo seleccionado correctamente!", "success");
                console.log($scope.periodoselect);

                $http({
                    method: 'POST',
                    url: myProvider.getIdPeriodo(),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {
                        id_periodo: periodo_actual
                    }


                }).then(function successCallback(response) {

                    $scope.peri_actual = response.data[0].DESCRIPCION_PERI;




                }, function errorCallback(response) {

                    alert('error al realizar Ingreso');

                });


            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });







    }











}]);