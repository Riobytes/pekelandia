app.controller('institutoController', ['$scope', '$http', '$location','myProvider','$localStorage',  function ($scope,$http,$location,myProvider,$localStorage) {
    console.log("aca estoy");
    var a    = JSON.parse(window.localStorage.getItem('usuario'));
    var token="Bearer "+ a.id_token;

    $scope.ConfiguracionInicio=function(){
        console.log("Hey");
        $http({
            method: 'POST',
            url: myProvider.getInstituto(),
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

                $scope.instituto = response.data;
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

    $scope.modiInstituto=function(datos){
       $scope.nombreCIE = datos.NOMBRE_INSTITUTO;
       $scope.NomPropietario = datos.NOMBRE_PROPIERTARIO;
       $scope.DireccionCEI = datos.DIRECCION_INSTITUTO;
       $scope.telf = datos.TELF_INSTITUTO;
       $scope.NumAutorizacion = datos.NUM_AUTORIZACION;
       $scope.Ruc = datos.RUC;
       $scope.No_fac_inicio = datos.NUM_FAC_INICIO;
        $scope.No_fac_actual = datos.NUM_ACTUAL;
       $scope.No_fac_final = datos.NUM_FINAL_FINAL;
        $scope.iva = datos.IVA;

    }

    $scope.modificarInstituto=function(){


        $http({
            method: 'POST',
            url: myProvider.getModificarInsti(),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {
                nombre: $scope.nombreCIE,
                nomb_pro: $scope.NomPropietario,
                direccion: $scope.DireccionCEI,
                telefono: $scope.telf,
                numautorizacion: $scope.NumAutorizacion,
                ruc: $scope.Ruc,
                nomfac_inicio: $scope.No_fac_inicio,
                no_actual : $scope.No_fac_actual,
                nomfac_final: $scope.No_fac_final,
                iva : $scope.iva

            }


        }).then(function successCallback(response) {
            //console.log(response.data);

            if (response.data.length == 0) {

                swal("Error!", "Error al modificar el registro", "error");
            } else {

                swal("Exito!", "Datos del instituto modificados correctamente.", "success");
                $scope.ConfiguracionInicio();
                //console.log($scope.user);
                //alert('Busqueda exitosa');
                $scope.nombreCIE = "";
                $scope.NomPropietario= "";
                $scope.DireccionCEI= "";
                $scope.telf= "";
                $scope.NumAutorizacion= "";
                $scope.Ruc= "";
                $scope.No_fac_inicio= "";
                $scope.No_fac_actual = "";
                $scope.No_fac_final = "";
                $scope.iva = "";

            }


        }, function errorCallback(response) {

            alert('error al realizar la busqueda');

        });

    }






}]);