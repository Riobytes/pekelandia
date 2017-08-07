/**
 * Created by xaipo on 5/11/2017.
 */
app.controller('estudianteController', ['$scope', '$http', '$location','myProvider','$localStorage','$timeout',  function ($scope,$http,$location,myProvider,$localStorage,$timeout) {
    var a    = JSON.parse(window.localStorage.getItem('usuario'));
    var token="Bearer "+ a.id_token;

    $scope.initEstudiante=function () {
       console.log("sacoto");
       $http({
           method: 'POST',
           url: myProvider.getAllEstudiantes(),
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

               $scope.estudiantes = response.data;
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
       }, 1500, false);


   }

    $scope.modiEstudiante=function(estudiante){

        window.localStorage["estudiante"]= JSON.stringify(estudiante);
        $location.path("/updateEstudiante");
    }

    $scope.initModEstu=function(){

        $scope.estudiante = JSON.parse(window.localStorage.getItem('estudiante'));
        console.log($scope.estudiante);
        // $scope.updateuser = JSON.parse(window.localStorage.getItem('alluser'));



        //   console.log($scope.us);
        $('#textfecha_naci').daterangepicker({
            singleDatePicker: true,
            calender_style: "picker_4"
        }, function(start, end, label) {
            console.log(start.toISOString(), end.toISOString(), label);
        });

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

                $scope.niveles = response.data;

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
                $scope.jornadaselect = $scope.estudiante.ID_JORNADA;

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
                $scope.lunchselect = $scope.estudiante.ID_REFRIGERIO;

            }


        }, function errorCallback(response) {

            alert('error al realizar la busqueda');

        });


        $http({
            method: 'POST',
            url: myProvider.getMatriculaxCedula(),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {

                cedula: $scope.estudiante.CEDULA

            }


        }).then(function successCallback(response) {
            console.log(response.data);

            $scope.nivelselect = response.data[0].ID_NIVEL; //


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

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
                años: años,
                meses: meses,
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

                swal("Error!", "No se pudo modificar los datos del estudiante.", "error");
            }else{
                swal("Exito!", "Datos del estudiante se modificados correctamente.", "success");
                $location.path("/ingresoEstudiante");

            }


        }, function errorCallback(response) {

            alert('error al realizar la busqueda');

        });

    }



}]);