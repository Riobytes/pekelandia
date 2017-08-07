app.controller('jornadasController', ['$scope', '$http', '$location','myProvider','$localStorage',  function ($scope,$http,$location,myProvider,$localStorage) {
    var a    = JSON.parse(window.localStorage.getItem('usuario'));
    var token="Bearer "+ a.id_token;
    $scope.updateJornadasInicio=function(){

       $scope.jornada = JSON.parse(window.localStorage.getItem('jornada'));
        //console.log($scope.updateuser);
       // $scope.updateuser = JSON.parse(window.localStorage.getItem('alluser'));


        
        //   console.log($scope.us);
    }
    $scope.JornadasInicio=function(){

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

                swal("Error!", "No existen jornadas, ingrese jornadas!", "error");
            } else {

                $scope.jornadas = response.data;
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

    $scope.registrarJornadas=function(){
        var nom_jornada = $scope.nombre_jornada;
        console.log(nom_jornada);
       
      
                $http({
                    method: 'POST',
                    url: myProvider.getSaveJornada(),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {

                      descripcion_jornada: nom_jornada
                   

                    }


                }).then(function successCallback(response) {
                    console.log(response.data);

                    if (response.data.length == 0) {

                        swal("Error!", "NO se puedo registrar la jornada.", "error");
                    } else {

                        swal("Exito!", "Datos de la jornada ingresados correctamente.", "success");
                        $scope.JornadasInicio();
                        $scope.nombre_jornada = "";


                    }


                }, function errorCallback(response) {

                    alert('error al realizar Ingreso');

                });
           
        

    }

    $scope.modificarJornadas=function(jornada){

           var nom_jornada = jornada.DESCRIPCION_JORNADA;
           var id_jornada = jornada.ID_JORNADA;
      
               
                $http({
                    method: 'POST',
                    url: myProvider.updateJornada(),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {

                        descripcion_jornada: nom_jornada,
                        id_jornada:id_jornada

                       
                    }


                }).then(function successCallback(response) {
                    console.log(response.data);

                    if (response.data.length == 0) {

                        swal("Error!", "NO se puedo modificar los datos de la jornada.", "error");
                    } else {

                        swal("Exito!", "Datos de la jornada modificados correctamente.", "success");
                        $location.path('/ingresoJornada');

                    }


                }, function errorCallback(response) {

                    alert('error al realizar Ingreso');

                });



    }
    $scope.modificarCacelar=function(){


        $location.path('/ingresoJornada');
    }


    $scope.modiJornada=function(jornada){

        window.localStorage["jornada"]= JSON.stringify(jornada);
        $location.path("/updateJornadas");
    }


    $scope.eliminarjornada=function(jornada){


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
                    url: myProvider.eliminarJornada(),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {

                        id_jornada: jornada.ID_JORNADA


                    }


                }).then(function successCallback(response) {
                    console.log(response.data);

                    if (response.data.length == 0) {

                        swal("Error!", "La jornada no fue eliminado.", "error");
                    } else {

                        swal("Exito!", "La jornada fue eliminado.", "success");

                        $scope.JornadasInicio();

                    }


                }, function errorCallback(response) {

                    alert('error al realizar Ingreso');

                });
            });



    }





}]);