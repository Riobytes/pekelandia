app.controller('usuariosController', ['$scope', '$http', '$location','myProvider','$localStorage',  function ($scope,$http,$location,myProvider,$localStorage) {
    var a    = JSON.parse(window.localStorage.getItem('usuario'));
    var token="Bearer "+ a.id_token;
    $scope.updateInicio=function(){

        $scope.updateuser = JSON.parse(window.localStorage.getItem('user'));
        console.log($scope.updateuser);
       // $scope.updateuser = JSON.parse(window.localStorage.getItem('alluser'));


        
        //   console.log($scope.us);
    }
    
    $scope.allusersInicio=function(){

        $http({
            method: 'POST',
            url: myProvider.buscaralluserUsuario(),
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

                $scope.user = response.data;
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

    $scope.registrarUser=function(){

        var user = $scope.name_user;
        var pass = $scope.user_pass;
        var repass = $scope.repass;
        console.log(user);
        console.log(pass);
        console.log(repass);



        if(user != undefined && user !='' && pass !=undefined && pass!='') {
            if (pass == repass) {
                pass = SHA1(pass);
                console.log('encriptado');


                $http({
                    method: 'POST',
                    url: myProvider.getSaveUsuario(),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {

                        user: user,
                        password: pass

                    }


                }).then(function successCallback(response) {
                    console.log(response.data);

                    if (response.data.length == 0) {

                        swal("Error!", "No se ingreso el usuario!", "error");
                    } else {

                        swal("Exito!", "Usuario ingresado correctamente!", "success");
                        $scope.allusersInicio();
                        $scope.name_user = "";
                        $scope.user_pass = "";
                        $scope.repass ="";

                    }


                }, function errorCallback(response) {

                    alert('error al realizar Ingreso');

                });
            }else {

                alert('Llene todos los campos');
            }
        }


    }

    $scope.modificarUser=function(usuario){

        var user = $('#user').val();
        var pass = $('#pass').val();
        var codigo = usuario.ID_USER;
                pass = SHA1(pass);
                console.log('encriptado');


                $http({
                    method: 'POST',
                    url: myProvider.updateUsuario(),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {

                        user: user,
                        password: pass,
                        codigo: codigo

                    }


                }).then(function successCallback(response) {
                    console.log(response.data);

                    if (response.data.length == 0) {
                        
                        swal("Error!", "El usuario no se modifico correctamente!", "error");
                    } else {
                        swal("Exito!", "El usuario se modifico correctamente!", "success");
                        $location.path("/ingresoUsuarios");


                    }


                }, function errorCallback(response) {

                    alert('error al realizar Ingreso');

                });



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
                        alert('Busqueda exitosa');

                    }


                }, function errorCallback(response) {

                    alert('error al realizar la busqueda');

                });
            } else {

                alert('LLene el campo de busqueda');
            }
        }

    $scope.modialluser=function(usuario){

        window.localStorage["user"]= JSON.stringify(usuario);
        $location.path("/updateUsuarios");
    }

    $scope.eliminaruser=function(usuario){
        console.log(usuario);

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
                    url: myProvider.eliminarUsuario(),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {

                        id_user: usuario.ID_USER


                    }


                }).then(function successCallback(response) {
                    console.log(response.data);

                    if (response.data.length == 0) {

                        swal("Error!", "El usuario no fue eliminado.", "error");
                    } else {

                        swal("Exito!", "El usuario fue eliminado.", "success");

                        $scope.allusersInicio();

                    }


                }, function errorCallback(response) {

                    alert('error al realizar Ingreso');

                });
            });



    }





}]);