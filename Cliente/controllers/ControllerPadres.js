app.controller('padresController', ['$scope', '$http', '$location','myProvider','$localStorage','$timeout',  function ($scope,$http,$location,myProvider,$localStorage,$timeout) {
    var a    = JSON.parse(window.localStorage.getItem('usuario'));
    var token="Bearer "+ a.id_token;
    $scope.initPadres=function () {
        console.log("sacoto");
        $http({
            method: 'POST',
            url: myProvider.getAllPadres(),
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

                $scope.padres = response.data;
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

            $('#datatable').dataTable({
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }


            });
        }, 1000, false);


    }

    $scope.modiEstudiante=function(estudiante){

        window.localStorage["estudiante"]= JSON.stringify(estudiante);
        $location.path("/updateEstudiante");
    }




    $scope.updateTipoPadreInicio=function(){

       $scope.tipopadre = JSON.parse(window.localStorage.getItem('tipopadre'));
        //console.log($scope.updateuser);
       // $scope.updateuser = JSON.parse(window.localStorage.getItem('alluser'));


        
        //   console.log($scope.us);
    }
    $scope.TipoPadresInicio=function(){

        $http({
            method: 'POST',
            url: myProvider.getAllTipoPadres(),
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

                $scope.tipopadre = response.data;
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

    $scope.registrarTipoPadres=function(){
        console.log("Hola");

        var descri_padres = $('#descripcion_pa').val();

        if(descri_padres != undefined && descri_padres !='') {
           
                $http({
                    method: 'POST',
                    url: myProvider.getSaveTipoPadres(),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {

                        descripcion_tipo: descri_padres

                    }


                }).then(function successCallback(response) {
                    console.log(response.data);

                    if (response.data.length == 0) {

                        swal("Error!", "El tipo de padre no se agregado!", "error");
                    } else {

                        swal("Exito!", "El tipo de padre se agregado!", "success");
                        $scope.TipoPadresInicio();

                    }


                }, function errorCallback(response) {

                    alert('error al realizar Ingreso');

                });
            } else {

                alert('Llene todos los campos');
            }
        

    }

    $scope.modificarTipoPadre=function(tipopadre){

             var id_tipo = tipopadre.ID_TIPO;
             var descripcion = tipopadre.DESCRIPCION_TIPO;
               
                $http({
                    method: 'POST',
                    url: myProvider.updateTipoPadres(),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {

                        id_tipo: id_tipo,
                        descripcion_tipo: descripcion
                       
                    }


                }).then(function successCallback(response) {
                    console.log(response.data);

                    if (response.data.length == 0) {

                        swal("Exito!", "El tipo de padre no se modifico!", "success");
                    } else {

                        swal("Exito!", "El tipo de padre se modifico!", "success");
                        $location.path('/ingresoTipoPadre');

                    }


                }, function errorCallback(response) {

                    alert('error al realizar Ingreso');

                });



    }

    $scope.cancelarTipoPadre=function(tipopadre){

        $location.path('/ingresoTipoPadre');



    }

    $scope.Bucar_User_Id=function(){

        var id_user = $('#id_user').val();
        //console.log(id_user);



        if(id_user != undefined && id_user !='') {

                $http({
                    method: 'POST',
                    url: myProvider.ByIdUsuario(),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {

                        id_user: id_user

                    }


                }).then(function successCallback(response) {
                    //console.log(response.data);

                    if (response.data.length == 0) {

                        alert('El usuario no existe en la BD');
                    } else {
                        $scope.user = response.data;
                       console.log($scope.user);
                        window.localStorage.setItem("user", JSON.stringify(response.data));
                        alert('Busqueda exitosa');

                    }


                }, function errorCallback(response) {

                    alert('error al realizar la busqueda');

                });
            } else {

                alert('LLene el campo de busqueda');
            }
        }

    $scope.modiTipoPadre=function(tipopadre){

        window.localStorage["tipopadre"]= JSON.stringify(tipopadre);
        $location.path("/updateCargos");
    }
    $scope.eliminarTipoPadre=function(tipopadre){

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
                    url: myProvider.geteliminarTipoPadre(),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {

                        id_tipo: tipopadre.ID_TIPO


                    }


                }).then(function successCallback(response) {
                    console.log(response.data);

                    if (response.data.length == 0) {

                        swal("Error!", "El tipo de padre no fue eliminado.", "error");
                    } else {

                        swal("Exito!", "El tipo de padre fue eliminado.", "success");

                        $scope.TipoPadresInicio();

                    }


                }, function errorCallback(response) {

                    alert('error al realizar Ingreso');

                });
            });



    }


    $scope.modiPadres=function(padre){

        window.localStorage["padre"]= JSON.stringify(padre);
        $location.path("/updatePadre");
    }


    $scope.initModPadre=function(){

        $scope.padre = JSON.parse(window.localStorage.getItem('padre'));
        console.log($scope.padre);
        // $scope.updateuser = JSON.parse(window.localStorage.getItem('alluser'));
        $scope.selectvivienda = $scope.padre.TIPO_VIVIENDA;



    }
    $scope.cancelarPadres=function(){
        $location.path("/listarPadres");
    }

    $scope.modificarPadres = function () {

        var cedulapa = $('#textcedulapa').val();
        var nombrepa = $('#textnombrepa').val();
        var lugartrapa = $('#textlugar_trapa').val();
        var  direccion_trapa= $('#textdir_trapa').val();
        var telefonopa = $('#texttel_pa').val();
        var emailpa = $('#textemail_pa').val();
        var domiciliopa = $('#textdir_do_pa').val();
        var tipo_vipa = document.getElementById("viviendapa").value;
        var teauxpa = $('#texttel_aux_pa').val();

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

            }


        }).then(function successCallback(response) {
            console.log(response.data);

            if (response.data.length == 0) {

                swal("Error!", "Los datos del padre no se modifico correctamente!", "error");
            } else {

                swal("Exito!", "Los datos del padre se modifico correctamente!", "success");
                $location.path("/listarPadres");


            }

        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });



    }




}]);