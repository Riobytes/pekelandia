app.controller('noticiasController', ['$scope', '$http', '$location','myProvider','$localStorage',  function ($scope,$http,$location,myProvider,$localStorage) {

    var a    = JSON.parse(window.localStorage.getItem('usuario'));
    var token="Bearer "+ a.id_token;
    
    $scope.updateNoticiasInicio=function(){

       $scope.noticias = JSON.parse(window.localStorage.getItem('noticias'));
        console.log($scope.noticias);
       // $scope.updateuser = JSON.parse(window.localStorage.getItem('alluser'));

        $('#fecha_ou').datepicker({
            autoclose: true,
            changeMonth: true,
            changeYear: true,
            format: 'dd-mm-yyyy', //Se especifica como deseamos representarla
            firstDay: 1

        });


        
        //   console.log($scope.us);
    }
    $scope.NoticiasInicio=function(){

      

        $http({
            method: 'POST',
            url: myProvider.getAllNoticias(),
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

                $scope.noticias= response.data;
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



    $scope.InitNoticia=function(){

        $('#fecha_noti').datepicker({
            autoclose: true,
            changeMonth: true,
            changeYear: true,
            format: 'dd-mm-yyyy', //Se especifica como deseamos representarla
            firstDay: 1

        });
    }


    $scope.registrarNoticias=function(){
        var titulo_noticias = $('#titulo_noti').val();
        var resumen = $('#resumen_noti').val();
    
        var textnoticia = $('#noti').val();
        var fecha_noti = $('#fecha_noti').val();

                $http({
                    method: 'POST',
                    url: myProvider.getSaveNoticias(),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {

                     titulo:titulo_noticias,
                     resumen:resumen,
                     noti:textnoticia,
                     fecha_noti:fecha_noti
                    }


                }).then(function successCallback(response) {
                    console.log(response.data);

                    if (response.data.length == 0) {

                        swal("Error!", "La noticia no se registro exitosamente!", "error");
                    } else {

                        swal("Exito!", "La noticia se registro exitosamente!", "success");
                        $location.path("/listarNoticias");

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

    $scope.modificarNoticias=function(x){
        console.log(x);

            var titulo = x.TITULO;
            var resumen = x.RESUMEN;
            var noti = x.NOTICIA;
            var fecha = $('#fecha_ou').val();
            var id_noti = x.ID_NOTICIA;
            console.log(id_noti);
               
                $http({
                    method: 'POST',
                    url: myProvider.updateNoticias(),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {


                        titulo:titulo,
                        resumen:resumen,
                        noti:noti,
                        fecha:fecha,
                        id_noti:id_noti

                       
                    }


                }).then(function successCallback(response) {
                    console.log(response.data);

                    if (response.data.length == 0) {

                        swal("Error!", "La noticia no se modifico exitosamente!", "error");
                    } else {

                        swal("Exito!", "La noticia se modifico exitosamente!", "success");
                        $location.path("/listarNoticias");

                    }


                }, function errorCallback(response) {

                    alert('error al realizar Ingreso');

                });




    }


    $scope.modiNoticias=function(noticias){

        window.localStorage["noticias"]= JSON.stringify(noticias);
        $location.path("/updateNoticias");
    }
    $scope.eliminarNoticias=function(noticias){

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
                    url: myProvider.geteliminarNoticia(),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {

                        id_noti: noticias.ID_NOTICIA


                    }


                }).then(function successCallback(response) {
                    console.log(response.data);

                    if (response.data.length == 0) {

                        swal("Error!", "El tipo de padre no fue eliminado.", "error");
                    } else {

                        swal("Exito!", "El tipo de padre fue eliminado.", "success");

                        $scope.NoticiasInicio();

                    }


                }, function errorCallback(response) {

                    alert('error al realizar Ingreso');

                });
            });
    }






}]);