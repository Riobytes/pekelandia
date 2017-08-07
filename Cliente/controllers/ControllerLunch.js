app.controller('lunchController', ['$scope', '$http', '$location','myProvider','$localStorage',  function ($scope,$http,$location,myProvider,$localStorage) {
    var a    = JSON.parse(window.localStorage.getItem('usuario'));
    var token="Bearer "+ a.id_token;
    $scope.updateLunchInicio=function(){

       $scope.lunch = JSON.parse(window.localStorage.getItem('lunch'));
        //console.log($scope.updateuser);
       // $scope.updateuser = JSON.parse(window.localStorage.getItem('alluser'));


        
        //   console.log($scope.us);
    }
    $scope.LunchInicio=function(){

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

                swal({
                    title: "Mensaje de alerta!",
                    text: "No existe registros, Ingrese registros de refrigerios.",
                    timer: 3000,
                    showConfirmButton: false
                });
            } else {

                $scope.lunch= response.data;
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

    $scope.registrarLunch=function(){
        var descri_refri = $('#nombre_refri').val();
        var select_refri = $('#select_refri').val();
        console.log(select_refri);
        var costo = $('#costo_refri').val();

                $http({
                    method: 'POST',
                    url: myProvider.getSaveLunch(),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {

                      descripcion_refri:descri_refri,
                      estado_refri:select_refri,
                      precio:costo
                    }


                }).then(function successCallback(response) {
                    console.log(response.data);

                    if (response.data.length == 0) {

                        swal("Error!", "El refrigerio no se ingreso correctamente!", "error");
                    } else {

                        swal("Exito!", "El refrigerio se ingreso correctamente!", "success");
                        $scope.LunchInicio()
                        $scope.nom_refri = "";
                        $scope.cos_refri = "";
                    }


                }, function errorCallback(response) {

                    alert('error al realizar Ingreso');

                });
           
        

    }

    $scope.modificarLunch=function(lunch){

            var nom_lunch = lunch.DESCRIPCION_REFRI;
            var select_lunch = lunch.ESTADO_REFRI;
            var precio = lunch.PRECIO;
            
            var id_lunch = lunch.ID_REFRIGERIO;
            console.log(id_lunch);
          ;
               
                $http({
                    method: 'POST',
                    url: myProvider.updateLunch(),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {

                     descripcion_refri:nom_lunch,
                      estado_refri:select_lunch,
                      precio:precio,
                      id_refrigerio:id_lunch

                       
                    }


                }).then(function successCallback(response) {
                    console.log(response.data);

                    if (response.data.length == 0) {

                        swal("Error!", "El refrigerio no se modifico correctamente!", "error");
                    } else {

                        swal("Exito!", "El refrigerio se modifico correctamente!", "success");
                        $location.path("/ingresoLunch");

                    }


                }, function errorCallback(response) {

                    alert('error al realizar Ingreso');

                });



    }

    $scope.modiLunch=function(lunch){

        window.localStorage["lunch"]= JSON.stringify(lunch);
        $location.path("/updateLunch");
    }

    $scope.CancelarLunch=function(){


        $location.path('/ingresoLunch');
    }

    $scope.eliminarLunch=function(lunch){


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
                    url: myProvider.eliminarRefrigerio(),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {

                        id_refrigerio: lunch.ID_REFRIGERIO


                    }


                }).then(function successCallback(response) {
                    console.log(response.data);

                    if (response.data.length == 0) {

                        swal("Error!", "El refrigerio no fue eliminado.", "error");
                    } else {

                        swal("Exito!", "El refrigerio fue eliminado.", "success");

                        $scope.LunchInicio();

                    }


                }, function errorCallback(response) {

                    alert('error al realizar Ingreso');

                });
            });



    }



}]);