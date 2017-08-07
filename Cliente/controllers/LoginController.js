/**
 * Created by xaipo on 5/10/2017.
 */
/**
 * Created by xaipo on 9/30/2015.
 */



app.controller('LoginController', ['$scope', '$http', '$location','myProvider','$localStorage',  function ($scope,$http,$location,myProvider,$localStorage) {

   // console.log(myProvider.getUser());

    $scope.estadoInicio=function(){

        $scope.us = JSON.parse(window.localStorage.getItem('se'));

        if($scope.us!=null){
            // window.location ='./error.html';

        }
        //   console.log($scope.us);
    }


    $scope.user={
        'name':'',
        'pass':''
    }

    $scope.token='';

    $scope.login=function(){

     //   console.log('entrar1');
//console.log($scope.user);
       // var ss= Date();
        //var vec= ss.split(' '



        if($scope.user.name!=undefined && $scope.user.name!=''&&$scope.user.pass!=undefined && $scope.user.pass!='')    {

            //console.log($scope.user);

            $scope.user.pass=SHA1($scope.user.pass);
            console.log($scope.user.pass);
//console.log($scope.user.pass);
console.log (myProvider.getLogin());

            $http({
                method: 'POST',
                url: myProvider.getLogin(),
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {

                    username: $scope.user.name,
                    password: $scope.user.pass

                }


            }).then(function successCallback(response) {
                console.log(response.data);
             //   console.log(JSON.stringify(response.data[0].user.username) );

                if(response.data==0){

                    alert('Error al ingresar');
                }else{

                    var obj= response.data;


                            window.localStorage.setItem("usuario", JSON.stringify(obj));

                           window.location ='./principal.html';


                    /*window.localStorage.setItem("se", JSON.stringify(obj.value.tk));
                     window.localStorage.setItem("usuario", JSON.stringify(resp));
                     window.location ='./principal.html';*/
                }


            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                // console.log(response);
                //$scope.mesaje = response.mensaje;
                alert('error al realizar Ingreso');

            });
        }else{

            alert('comuniquese con el amdministrador del sistema');
        }


    }



   

    //  console.log($rootScope.usuarioLogin);


$scope.listaCedulaNoValida=[];
$scope.listaTodos=[];
    $scope.validador=function(){

        $http({
            method: 'POST',
            url: 'http://localhost:3002/api/getAll',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {


            }


        }).then(function successCallback(response) {

            $scope.listaTodos=response.data;
            var n=$scope.listaTodos.length;
            var count1=0;
            var count2=0;
            for(var i =0; i<n;i++){

                var cedula = $scope.listaTodos[i].clicedula;

                //Preguntamos si la cedula consta de 10 digitos
                if(cedula.length == 10){

                    //Obtenemos el digito de la region que sonlos dos primeros digitos
                    var digito_region = cedula.substring(0,2);

                    //Pregunto si la region existe ecuador se divide en 24 regiones
                    if( digito_region >= 1 && digito_region <=24 ){

                        // Extraigo el ultimo digito
                        var ultimo_digito   = cedula.substring(9,10);

                        //Agrupo todos los pares y los sumo
                        var pares = parseInt(cedula.substring(1,2)) + parseInt(cedula.substring(3,4)) + parseInt(cedula.substring(5,6)) + parseInt(cedula.substring(7,8));

                        //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
                        var numero1 = cedula.substring(0,1);
                        var numero1 = (numero1 * 2);
                        if( numero1 > 9 ){ var numero1 = (numero1 - 9); }

                        var numero3 = cedula.substring(2,3);
                        var numero3 = (numero3 * 2);
                        if( numero3 > 9 ){ var numero3 = (numero3 - 9); }

                        var numero5 = cedula.substring(4,5);
                        var numero5 = (numero5 * 2);
                        if( numero5 > 9 ){ var numero5 = (numero5 - 9); }

                        var numero7 = cedula.substring(6,7);
                        var numero7 = (numero7 * 2);
                        if( numero7 > 9 ){ var numero7 = (numero7 - 9); }

                        var numero9 = cedula.substring(8,9);
                        var numero9 = (numero9 * 2);
                        if( numero9 > 9 ){ var numero9 = (numero9 - 9); }

                        var impares = numero1 + numero3 + numero5 + numero7 + numero9;

                        //Suma total
                        var suma_total = (pares + impares);

                        //extraemos el primero digito
                        var primer_digito_suma = String(suma_total).substring(0,1);

                        //Obtenemos la decena inmediata
                        var decena = (parseInt(primer_digito_suma) + 1)  * 10;

                        //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
                        var digito_validador = decena - suma_total;

                        //Si el digito validador es = a 10 toma el valor de 0
                        if(digito_validador == 10)
                            var digito_validador = 0;

                        //Validamos que el digito validador sea igual al de la cedula
                        if(digito_validador == ultimo_digito){
                            //console.log('la cedula:' + cedula + ' es correcta');
                            count1++;
                        }else{
                            $scope.listaCedulaNoValida.push($scope.listaTodos[i]);
                            count2++;
                        }

                    }else{
                        // imprimimos en consola si la region no pertenece
                        //console.log('Esta cedula no pertenece a ninguna region');
                        $scope.listaCedulaNoValida.push($scope.listaTodos[i]);
                        count2++
                    }
                }else{
                    //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
                   // console.log('Esta cedula tiene menos de 10 Digitos');
                    $scope.listaCedulaNoValida.push($scope.listaTodos[i]);
                    count2++;
                }
            }


            console.log($scope.listaCedulaNoValida);
            console.log(count1);
            console.log(count2);

            $http({
                method: 'POST',
                url: 'http://localhost:3002/api/getALlBad',
                headers: {
                    'Content-Type': 'application/json'
                },
                data:
                        $scope.listaCedulaNoValida



            }).then(function successCallback(response) {

            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                // console.log(response);
                //$scope.mesaje = response.mensaje;
                alert('error al realizar Ingreso');

            });
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            // console.log(response);
            //$scope.mesaje = response.mensaje;
            alert('error al realizar Ingreso');

        });





    }

}]);