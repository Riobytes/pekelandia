/**
 * Created by xaipo on 5/11/2017.
 */
app.controller('facturaController', ['$scope', '$http', '$location','myProvider','$localStorage',  function ($scope,$http,$location,myProvider,$localStorage) {
    var a    = JSON.parse(window.localStorage.getItem('usuario'));
    var token="Bearer "+ a.id_token;
    $scope.initfac = function () {

        $('#buttonimprimirfac').hide();
        $('#group').hide();

        $('#fac_mensual').hide();
        $('#fac_matricula').hide();
        $('#btnreset').hide();


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

            }


        }, function errorCallback(response) {

            alert('error al realizar la busqueda');

        });

    }


    $scope.datosfactura = JSON.parse(window.localStorage.getItem('datosfactura'));
    var cedula = $scope.datosfactura.CEDULA;
    $scope.padres = [];


    $http({
        method: 'POST',
        url: myProvider.getByIdNivel(),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        data: {

            id_nivel: $scope.datosfactura.nivel

        }


    }).then(function successCallback(response) {
        console.log(response.data);

        if (response.data.length == 0) {

            alert('Error al ingresar');
        } else {

            $scope.nivel = response.data[0];



        }


    }, function errorCallback(response) {

        alert('error al realizar Ingreso');

    });

    $http({
        method: 'POST',
        url: myProvider.getMatriculaCed_Idnivel(),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        data: {
            cedula:cedula,
            id_nivel: $scope.datosfactura.nivel

        }


    }).then(function successCallback(response) {
        console.log(response.data);

        if (response.data.length == 0) {

            alert('Error al ingresar');
        } else {

            $scope.datosmatricula = response.data[0];



        }


    }, function errorCallback(response) {

        alert('error al realizar Ingreso');

    });
    
    
    $http({
        method: 'POST',
        url: myProvider.getParentsBySon(),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        data: {

            cedula: cedula,

        }


    }).then(function successCallback(response) {
        console.log(response.data);

        if(response.data.length==0){

            swal("Error!", "No hay datos de representantes para la factura!", "error");

        }else{

            var padres = response.data;
            console.log(padres);
            var cedulapadre = padres[0].CI_PADRE;
            console.log("obtengo las cedulas de los padres");
            console.log("padre:"+cedulapadre);
            if(padres[1]!=undefined)
            {
                var cedulamadre = padres[1].CI_PADRE;

                console.log("madre:"+cedulamadre);
            }


            $http({
                method: 'POST',
                url: myProvider.consultarpadres(),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                data: {

                    cedula: cedulapadre

                }


            }).then(function successCallback(response) {
                console.log(response.data);

                if (response.data.length == 0) {

                    alert('Error al ingresar');
                } else {

                    $scope.padre = response.data;
                    $scope.padres.push(response.data[0]);


                }


            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });

            $http({
                method: 'POST',
                url: myProvider.consultarpadres(),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                data: {

                    cedula: cedulamadre

                }


            }).then(function successCallback(response) {
                console.log(response.data);

                if (response.data.length == 0) {

                    alert('Error al ingresar');
                } else {

                    $scope.madre = response.data;
                    $scope.padres.push(response.data[0]);


                }


            }, function errorCallback(response) {

                alert('error al realizar Ingreso');

            });




        }


    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        // console.log(response);
        //$scope.mesaje = response.mensaje;
        alert('error al realizar Ingreso');

    });

    $scope.factura = {};
    $scope.factura.DETALLE = {};
    $scope.padrefactura={};
    var id_facingresada = 0;

    $http({
        method: 'POST',
        url: myProvider.getconsultadatosinstituto(),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        data: {



        }


    }).then(function successCallback(response) {
        console.log(response.data);

        if (response.data.length == 0) {

            alert('Error al ingresar');
        } else {

            $scope.instituto = response.data[0];



        }


    }, function errorCallback(response) {

        alert('error al realizar Ingreso');

    });


    $scope.llenarfac1 = function () {

        console.log($scope.instituto);
        $('#group').show();


        $('#buttonimprimirfac').show();
        $scope.factura.CI_PADRE = $scope.padrefactura.CI_PADRE ;
        $scope.factura.CLIENTE = $scope.padrefactura.NOMBRE;
        $scope.factura.TEL_CLIENTE = $scope.padrefactura.TEL_PADRE ;   //AGREGAR
        $scope.factura.DIR_CLIENTE = $scope.padrefactura.DIRECCION_DOMICILIO ;   //AGREGAR
        $scope.factura.RUC = $scope.instituto.RUC;
        $scope.factura.NUM_AUTORIZACION = $scope.instituto.NUM_AUTORIZACION;
        $scope.factura.NOMBRE_EMPRESA = $scope.instituto.NOMBRE_INSTITUTO;
        $scope.factura.PROPIETARIO = $scope.instituto.NOMBRE_PROPIERTARIO;
        $scope.factura.DIRECCION_EMPRE = $scope.instituto.DIRECCION_INSTITUTO;
        $scope.factura.TEL_EMPRESA = $scope.instituto.TELF_INSTITUTO;
        $scope.factura.NUM_FAC = $scope.instituto.NUM_ACTUAL;
        $scope.factura.DETALLE.CANTIDAD = 1;
        $scope.factura.DETALLE.DESCRIPCION = "Matricula: "+$scope.nivel.DESCRIPCION_NIVEL;
        $scope.factura.DETALLE.VALOR_UNITARIO = $scope.nivel.PRECIO;
        $scope.factura.DETALLE.VALOR_TOTAL = $scope.nivel.PRECIO;
        valsubtotal= $scope.nivel.PRECIO + valsubtotal;
        $scope.factura.SUB_TOTAL = valsubtotal.toFixed(2);
        valiva = valiva + $scope.factura.SUB_TOTAL*$scope.instituto.IVA/100;
        $scope.factura.IVA = valiva.toFixed(2);
        total= total + valsubtotal + valiva;
        $scope.factura.TOTAL = total.toFixed(2);


    }

    $scope.llenarfac2 = function () {

        console.log($scope.instituto);
        $('#group').show();


        $('#buttonimprimirfac').show();
        $scope.factura.CI_PADRE = $scope.padrefactura.CI_PADRE ;
        $scope.factura.CLIENTE = $scope.padrefactura.NOMBRE;
        $scope.factura.TEL_CLIENTE = $scope.padrefactura.TEL_PADRE ;   //AGREGAR
        $scope.factura.DIR_CLIENTE = $scope.padrefactura.DIRECCION_DOMICILIO ;   //AGREGAR
        $scope.factura.RUC = $scope.instituto.RUC;
        $scope.factura.NUM_AUTORIZACION = $scope.instituto.NUM_AUTORIZACION;
        $scope.factura.NOMBRE_EMPRESA = $scope.instituto.NOMBRE_INSTITUTO;
        $scope.factura.PROPIETARIO = $scope.instituto.NOMBRE_PROPIERTARIO;
        $scope.factura.DIRECCION_EMPRE = $scope.instituto.DIRECCION_INSTITUTO;
        $scope.factura.TEL_EMPRESA = $scope.instituto.TELF_INSTITUTO;
        $scope.factura.NUM_FAC = $scope.instituto.NUM_ACTUAL;
        $scope.factura.DETALLE.CANTIDAD = 1;
        $scope.factura.DETALLE.DESCRIPCION = "Mensualidad: "+$scope.nivel.DESCRIPCION_NIVEL;
        $scope.factura.DETALLE.VALOR_UNITARIO = $scope.nivel.MENSUALIDAD;
        $scope.factura.DETALLE.VALOR_TOTAL = $scope.nivel.MENSUALIDAD;
        valsubtotal= $scope.nivel.MENSUALIDAD + valsubtotal;
        $scope.factura.SUB_TOTAL = valsubtotal.toFixed(2);
        valiva = valiva + $scope.factura.SUB_TOTAL*$scope.instituto.IVA/100;
        $scope.factura.IVA = valiva.toFixed(2);
        total= total + valsubtotal + valiva;
        $scope.factura.TOTAL = total.toFixed(2);


    }

    var valsubtotal= 0;
    var valiva = 0;
    var total = 0;


    $scope.SelectDatos = function () {

        console.log($scope.lunchselect);
        console.log($scope.instituto.IVA);

        $http({
            method: 'POST',
            url: myProvider.getIdLunch(),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {

                id_refrigerio : $scope.lunchselect

            }


        }).then(function successCallback(response) {
            
            if (response.data.length == 0) {

                alert('Error al ingresar');
            } else {

                $scope.refrigerio = response.data[0];
                console.log($scope.refrigerio);
                $scope.CANTIDAD = 1;
                valsubtotal= $scope.refrigerio.PRECIO + valsubtotal;
                $scope.factura.SUB_TOTAL = valsubtotal.toFixed(2);
                valiva = valiva + $scope.refrigerio.PRECIO*($scope.instituto.IVA/100);
                $scope.factura.IVA = valiva.toFixed(2);
                total= valsubtotal + valiva;
                $scope.factura.TOTAL = total.toFixed(2);
                



            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });
    }

    $scope.QuitarDatos = function () {

        $http({
            method: 'POST',
            url: myProvider.getIdLunch(),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {

                id_refrigerio : $scope.lunchselect

            }


        }).then(function successCallback(response) {

            if (response.data.length == 0) {

                alert('Error al ingresar');
            } else {

                $scope.refrigerio = response.data[0];
                console.log($scope.refrigerio);
                $scope.CANTIDAD = "";
                valsubtotal=  valsubtotal - $scope.refrigerio.PRECIO ;
                $scope.factura.SUB_TOTAL = valsubtotal.toFixed(2);
                valiva = valiva - $scope.refrigerio.PRECIO*($scope.instituto.IVA/100);
                $scope.factura.IVA = valiva.toFixed(2);
                total= valsubtotal + valiva;
                $scope.factura.TOTAL = total.toFixed(2);
                $scope.refrigerio = {
                    PRECIO : "",
                    DESCRIPCION_REFRI : ""
                };



            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });







    }

    function printData1()
    {
        var divToPrint=document.getElementById("printTable");
        newWin= window.open("");
        newWin.document.write(divToPrint.outerHTML);
        newWin.print();
        newWin.close();
    }

    $scope.FacMatricula= function () {


        $('#fac_mensual').show();
        $('#btnmat').hide();
        $('#btnmen').hide();
        $('#btnreset').show();

    }
    $scope.FacMensualidad= function () {

        $('#fac_mensual').hide();
        $('#fac_matricula').show();
        $('#btnmat').hide();
        $('#btnmen').hide();
        $('#btnreset').show();

    }
    $scope.reiniciar= function () {

        location.reload();

    }

    var f = new Date();

    $scope.printData = function (){



        $http({
            method: 'POST',
            url: myProvider.insertardatosfac(),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {

                cedula: $scope.factura.CI_PADRE,
                ruc: $scope.factura.RUC,
                num_autorizacion: $scope.factura.NUM_AUTORIZACION,
                nombre_empresa: $scope.factura.NOMBRE_EMPRESA,
                direccion_empresa: $scope.factura.DIRECCION_EMPRE,
                telf_empresa: $scope.factura.TEL_EMPRESA,
                num_fac:  $scope.factura.NUM_FAC


            }


        }).then(function successCallback(response) {
            console.log(response.data);
             $scope.id_facingresada = response.data.insertId;
            console.log($scope.id_facingresada);
            if (response.data.length == 0) {

                alert('Error al ingresar');
            } else {

               alert("Ingreso de datos de factura correctos");
                var num_actual = $scope.factura.NUM_FAC + 1;
                console.log(num_actual);

                $http({
                    method: 'POST',
                    url: myProvider.aumentarNum_Actual(),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: {

                        num_actual: num_actual



                    }


                }).then(function successCallback(response) {
                    console.log(response.data);

                    if (response.data.length == 0) {

                        alert('Error al ingresar');
                    } else {

                        alert("Aumento de numero actual correcto");
                        ///Permite el ingreso de los detalles factura
                        $http({
                            method: 'POST',
                            url: myProvider.insertardatosdetallefac(),
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': token
                            },
                            data: {
                                id_refrigerio: $scope.lunchselect,
                                id_factura: $scope.id_facingresada,
                                id_matricula: $scope.datosmatricula.ID_MATRICULA,
                                fecha: f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear(),
                                cantidad:$scope.factura.DETALLE.CANTIDAD,
                                valor_unitario: $scope.factura.SUB_TOTAL,
                                iva:$scope.factura.IVA,
                                hora:f.getHours()+":"+f.getMinutes(),
                                v_total:$scope.factura.IVA,
                                total_factura:$scope.factura.TOTAL


                            }


                        }).then(function successCallback(response) {
                            console.log(response.data);

                            if (response.data.length == 0) {

                                alert('Error al ingresar');
                            } else {

                                alert("Ingreso de datos de DEtalles factura correctos");



                            }


                        }, function errorCallback(response) {

                            alert('error al realizar Ingreso');

                        });


                    }


                }, function errorCallback(response) {

                    alert('error al realizar Ingreso');

                });


            }


        }, function errorCallback(response) {

            alert('error al realizar Ingreso');

        });



        var doc = new jsPDF('p', 'mm', [154, 107]);

        var x=0;
        var y=5;
        doc.setFontSize(12);
        doc.setFontType("bold");
        doc.text( $scope.factura.PROPIETARIO,x+23, y+5);//numfac
        doc.setFontSize(12);
        doc.setFontType("bold");
        doc.text( $scope.factura.NOMBRE_EMPRESA,x+14, y+10);
        doc.setFontSize(10);
        doc.setFontType("normal");
        doc.text( "Direccion: "+$scope.factura.DIRECCION_EMPRE+" Telf."+$scope.factura.TEL_EMPRESA ,x+10, y+15);
        doc.text( "Riobamba-Ecuador" ,x+40, y+20);
        doc.setFontSize(7);
        doc.setFontType("normal");
        doc.text( "RUC:"+$scope.factura.RUC ,x+10, y+23.5);
        doc.text( "AUT. SRI:"+$scope.factura.NUM_AUTORIZACION ,x+10, y+26);
        doc.setFontSize(11);
        doc.setFontType("bold");
        doc.text( "FACTURA" ,x+36, y+25.5);
        doc.setFontSize(10);
        doc.setFontType("bold");
        doc.text( "S:001-001-000 "+$scope.factura.NUM_FAC  ,x+58, y+25.5);
        doc.rect(x+10, y+27, 88,20, 'S')
        doc.line(x+10, y+32, x+98,y+32)
        doc.line(x+10, y+37, x+98,y+37)
        doc.line(x+10, y+42, x+98,y+42)
        doc.line(x+70, y+37, x+70,y+42)
        doc.setFontSize(8);
        doc.setFontType("normal");
        doc.text( "Fecha: "+f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear() ,x+11, y+31);
        doc.text( "Cliente: "+$scope.factura.CLIENTE ,x+11, y+36);
        doc.text( "CI. o RUC.: "+$scope.factura.CI_PADRE ,x+11, y+41);
        doc.text( "Telf. "+$scope.factura.TEL_CLIENTE ,x+71, y+41);
        doc.text( "Dirección: "+$scope.factura.DIR_CLIENTE ,x+11, y+46);

        doc.rect(x+10, y+47.5, 88,60, 'S')
        doc.line(x+10, y+52.5, x+98,y+52.5)
        doc.line(x+10, y+57.5, x+98,y+57.5)
        doc.line(x+10, y+62.5, x+98,y+62.5)
        doc.line(x+10, y+67.5, x+98,y+67.5)
        doc.line(x+10, y+72.5, x+98,y+72.5)
        doc.line(x+10, y+77.5, x+98,y+77.5)
        doc.line(x+10, y+82.5, x+98,y+82.5)
        doc.line(x+10, y+87.5, x+98,y+87.5)
        doc.line(x+10, y+92.5, x+98,y+92.5)
        doc.line(x+10, y+97.5, x+98,y+97.5)
        doc.line(x+10, y+102.5, x+98,y+102.5)
        //verticales
        doc.line(x+20, y+47.5, x+20,y+107.5)
        doc.line(x+68, y+47.5, x+68,y+133)
        doc.line(x+83, y+47.5, x+83,y+133)
        doc.setFontSize(8);
        doc.setFontType("bold");
        doc.text( "CANT." ,x+11, y+51.5);
        doc.text( "DETALLE" ,x+36, y+51.5);
        doc.text( "V. UNIT." ,x+69, y+51.5);
        doc.text( "V. TOTAL." ,x+84, y+51.5);
        doc.setFontType("normal");
        doc.text( $scope.factura.DETALLE.CANTIDAD.toString() ,x+13.5, y+56.5);
        doc.text( $scope.factura.DETALLE.DESCRIPCION,x+21, y+56.5);
        doc.text( $scope.factura.DETALLE.VALOR_UNITARIO.toString(),x+69, y+56.5);
        doc.text( $scope.factura.DETALLE.VALOR_TOTAL.toString(),x+84, y+56.5);

        if($scope.CANTIDAD == 1) {

            doc.text($scope.CANTIDAD.toString(), x + 13.5, y + 61.5);
            doc.text($scope.refrigerio.DESCRIPCION_REFRI, x + 21, y + 61.5);
            doc.text($scope.refrigerio.PRECIO.toString(), x + 69, y + 61.5);
            doc.text($scope.refrigerio.PRECIO.toString(), x + 84, y + 61.5);
        }

        doc.rect(x+10, y+108, 88,25, 'S')
        doc.line(x+68, y+113, x+98,y+113)
        doc.line(x+68, y+118, x+98,y+118)
        doc.line(x+68, y+123, x+98,y+123)
        doc.line(x+68, y+128, x+98,y+128)

        doc.rect(x+11, y+111, 20,20, 'S')
        doc.line(x+11, y+116.5, x+31,y+116.5)
        doc.line(x+11, y+121.5, x+31,y+121.5)
        doc.line(x+11, y+126.5, x+31,y+126.5)
        doc.line(x+32, y+116.5, x+67,y+116.5)
        doc.line(x+32, y+127.5, x+67,y+127.5)
        //VERTICAL
        doc.line(x+24, y+111, x+24,y+131)





        doc.setFontSize(6);
        doc.setFontType("bold");
        doc.text( "FORMA DE PAGO" ,x+12, y+110.5);
        doc.setFontSize(5);
        doc.text( "EFECTIVO" ,x+12, y+115.5);
        doc.text( "TARJETA DE" ,x+11.5, y+118.5);
        doc.text( "CRED / DEB" ,x+11.5, y+121);
        doc.text( "DINERO" ,x+11.5, y+124);
        doc.text( "ELECTRO." ,x+11.5, y+126);
        doc.text( "OTROS" ,x+12, y+130.5);

        doc.text( "FIRMA AUTORIZADA" ,x+39, y+118.5);
        doc.text( "FIRMA CLIENTE" ,x+41, y+129);

        doc.setFontSize(6);
        doc.setFontType("bold");
        doc.text( "SUB-TOTAL" ,x+69, y+112); doc.text( $scope.factura.SUB_TOTAL.toString() ,x+85, y+112);
        doc.text( "IVA Tarifa 0%" ,x+69, y+117);
        doc.text( "IVA Tarifa %" ,x+69, y+122);  doc.text($scope.factura.IVA.toString(),x+85, y+122);
        doc.text( "Importe del" ,x+69, y+125);
        doc.text( "IVA" ,x+69, y+127);
        doc.text( "Total Factura" ,x+69, y+132); doc.text($scope.factura.TOTAL.toString() ,x+85, y+132);




        doc.save('Test.pdf');
        
        $location.path('/datosFactura');

    }





}]);