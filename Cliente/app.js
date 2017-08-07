/**
 * Created by xaipo on 5/10/2017.
 */
'use strict';

// Declare app level module which depends on views, and components
var app = angular.module("myApp", ['ngStorage','ngRoute'])
var direccion = 'http://localhost:3000';
var url = 'http://localhost:3000/api/';

function ApiUrl(){

    //Usuarios
    this.getLogin=function(){
        return direccion+'/user/login';
    }
    this.getSaveUsuario=function(){
        return url+'saveUsuario';
    }

    this.ByIdUsuario=function(){
        return url+'getByIdUsuario';
    }
    this.updateUsuario=function(){
        return url+'updateUsuario';
    }
    this.buscaralluserUsuario=function(){
        return url+'getAllUsuario';
    }
    this.eliminarUsuario=function(){
        return url+'eliminarUsuario';
    }
    // Padres
     this.getSaveTipoPadres=function(){
        return url+'saveTipoPadres';
    }
     this.getAllTipoPadres=function(){
        return url+'getAllTipoPadre';
    }
     this.updateTipoPadres=function(){
        return url+'updateTipoPadres';
    }
     this.getSavePadre=function(){
        return url+'savePadres';
    }
    this.consultarpadres=function(){
        return url+'consultarpadres';
    }
    this.getUpdatePadre=function(){
        return url+'updatePadres';
    }
    this.getAllPadres=function(){
        return url+'getAllPadres';
    }
    this.geteliminarTipoPadre=function(){
        return url+'eliminarTipoPadre';
    }


    //Matricula
     this.getSaveEstadoMatricula=function(){
        return url+'saveEstadoMatricula';
    }
     this.getAllEstadoMatricula=function(){
        return url+'getAllEstadoMatricula';
    }
     this.updateEstadoMatricula=function(){
        return url+'updateEstadoMatricula';
    }
    this.consultarCedula=function(){
        return url+'consultarCedula';
    }
     this.getSaveMatricula=function(){
        return url+'saveMatricula';
    }
    this.updateMatricula=function(){
        return url+'updateMatricula';
    }
    this.getMat_Estu=function(){
        return url+'getMat_Estu';
    }
    this.getMat_Estu_Para=function(){
        return url+'getMat_Estu_Para';
    }
    this.getAsig_Estu_Para=function(){
        return url+'getAsig_Estu_Para';
    }
    this.getParaleloId=function(){
        return url+'getParaleloId';
    }
    this.getMatriculaCed_Idnivel=function(){
        return url+'getMatriculaCed_Idnivel';
    }
    this.getMatriculaxCedula=function(){
        return url+'getMatriculaxCedula';
    }
    this.getMatriculaxCedulaPeriodo=function(){
        return url+'getMatriculaxCedulaPeriodo';
    }
    this.getReporte=function(){
        return url+'getReporte';
    }


    //Niveles
     this.getSaveNivel=function(){
        return url+'saveNivel';
    }
     this.getAllNiveles=function(){
        return url+'getAllNivel';
    }
     this.updateNivel=function(){
        return url+'updateNivel';
    }
    this.getParalelos_Nivel=function(){
        return url+'getParalelos_Nivel';
    }
    this.getByIdNivel=function() {
        return url+'getByIdNivel';
    }
    this.geteliminarNivel=function() {
        return url+'getEliminarNivel';
    }
     //Paralelos

    this.getSaveParalelos=function(){
        return url+'getSaveParalelos';
    }
    this.updateParalelos=function(){
        return url+'updateParalelos';
    }
    this.geteliminarParalelo=function(){
        return url+'geteliminarParalelo';
    }

    //Jornadas
     this.getSaveJornada=function(){
        return url+'saveJornada';
    }
     this.getAllJornadas=function(){
        return url+'getAllJornada';
    }
     this.updateJornada=function(){
        return url+'updateJornada';
    }
    this.eliminarJornada=function(){
        return url+'eliminarJornada';
    }
    //lunch
     this.getSaveLunch=function(){
        return url+'saveRefrigerio';
    }
     this.getAllLunch=function(){
        return url+'getAllRefrigerio';
    }
     this.updateLunch=function(){
        return url+'updateRefrigerio';
    }
    this.eliminarRefrigerio=function(){
        return url+'eliminarRefrigerio';
    }
    this.getIdLunch=function(){
        return url+'getByIdRefrigerio';
    }
    //Noticias
      this.getSaveNoticias=function(){
        return url+'saveNoticia';
    }
     this.getAllNoticias=function(){
        return url+'getAllNoticias';
    }
     this.updateNoticias=function(){
        return url+'updateNoticias';
    }
    this.geteliminarNoticia=function(){
        return url+'geteliminarNoticia';
    }
    //Estudiante
    this.saveEstudiantes=function(){
        return url+'saveEstudiantes';
    }
    this.updateEstudiantes=function(){
        return url+'updateEstudiantes';
    }
    this.getAllEstudiantes=function(){
        return url+'getAllEstudiantes';
    }
    //Estu_padre
    this.saveEstu_padre=function(){
        return url+'saveEstuPadres';
    }
    this.getParentsBySon=function(){
        return url+'getParentsBySon';
    }
    //Factura
    this.insertardatosfac=function(){
        return url+'insertardatosfac';
    }
    this.getconsultadatosinstituto=function(){
        return url+'getconsultadatosinstituto';
    }
    this.aumentarNum_Actual=function(){
        return url+'aumentarNum_Actual';
    }
    this.insertardatosdetallefac=function(){
        return url+'insertardatosdetallefac';
    }
    //Periodo

    this.getSavePeriodo=function(){
        return url+'SavePeriodo';
    }

    this.getAllPeriodos=function(){
        return url+'getAllPeriodos';
    }

    this.getSavePeriodoActual=function(){
        return url+'updatePeriodoActual';
    }
    this.getIdPeriodo=function(){
        return url+'getIdPeriodo';
    }
    //Empresa  getInstituto
    this.getInstituto=function(){
        return url+'getInstituto';
    }
    this.getModificarInsti=function(){
        return url+'getModificarInsti';
    }
    //Personal
    this.getAllCargos=function(){
        return url+'getAllCargos';
    }
    this.getsaveCargo=function(){
        return url+'getsaveCargo';
    }
    this.updateCargo=function(){
        return url+'updateCargo';
    }
    this.geteliminarCargo=function(){
        return url+'geteliminarCargo';
    }
    this.getSavePersonal=function(){
        return url+'getSavePersonal';
    }
    this.consultarCedulaPer=function(){
        return url+'consultarCedulaPer';
    }
    this.getAllPersonal=function(){
        return url+'getAllPersonal';
    }
    this.getUpdatePersonal=function(){
        return url+'getUpdatePersonal';
    }
    this.getCargosDescripcion=function(){
        return url+'getCargosDescripcion';
    }
    this.geteliminarPersonal=function(){
        return url+'geteliminarPersonal';
    }
    this.getParalelos_Personal=function(){
        return url+'getParalelos_Personal';
    }
    this.getUpdateParalelos_Personal=function() {
        return url+'getUpdateParalelos_Personal';
    }
    this.getUpdateAportePersonal=function() {
        return url+'getUpdateAportePersonal';
    }
    this.getUpdatePatronal=function() {
        return url+'getUpdatePatronal';
    }
    this.getrolpagos=function() {
        return url+'getrolpagos';
    }
    this.getAdelantoPersonalCedula=function() {
        return url+'getAdelantoPersonalCedula';
    }
    this.getUpdateAdelanto=function() {
        return url+'getUpdateAdelanto';
    }
}

app.factory("myProvider",function(){
    // console.log("factory function");
    return new ApiUrl();

});

app.config (function($routeProvider ,$provide){
    //$locationProvider.html5Mode(true);
    $routeProvider.when("/",{templateUrl:"Paginas/inicio.html", controller:''});
    //Estudiante
    $routeProvider.when("/ingresoEstudiante",{templateUrl:"Paginas/ingresarEstudiantes.html", controller:'estudianteController'});
    $routeProvider.when("/updateEstudiante",{templateUrl:"Paginas/updateEstudiante.html", controller:'estudianteController'});
    //Usuarios
    $routeProvider.when("/ingresoUsuarios",{templateUrl:"Paginas/ingresoUsuarios.html", controller:'usuariosController'});
    $routeProvider.when("/modificarUsuarios",{templateUrl:"Paginas/modificarUsuario.html", controller:'usuariosController'});
    $routeProvider.when("/buscarallUsuarios",{templateUrl:"Paginas/buscarUsuario.html", controller:'usuariosController'});
    $routeProvider.when("/updateUsuarios",{templateUrl:"Paginas/updateUsuarios.html", controller:'usuariosController'});
    //Padres
    $routeProvider.when("/ingresoTipoPadre",{templateUrl:"Paginas/ingresoTipoPadres.html", controller:'padresController'});
    $routeProvider.when("/listarTipoPadres",{templateUrl:"Paginas/listaTipoPadres.html", controller:'padresController'});
    $routeProvider.when("/updateTipoPadres",{templateUrl:"Paginas/updateTipoPadres.html", controller:'padresController'});
    $routeProvider.when("/listarPadres",{templateUrl:"Paginas/listarPadres.html", controller:'padresController'});
    $routeProvider.when("/updatePadre",{templateUrl:"Paginas/updatePadre.html", controller:'padresController'});
    //Matricula
    $routeProvider.when("/ingresoEstadoMatricula",{templateUrl:"Paginas/ingresoEstadoMatricula.html", controller:'matriculaController'});
    $routeProvider.when("/listarEstadoMatricula",{templateUrl:"Paginas/listarEstadoMatricula", controller:'matriculaController'});
    $routeProvider.when("/modificarTipoPadres",{templateUrl:"Paginas/modificarTipoPadres", controller:'matriculaController'});
    $routeProvider.when("/establecerEstadoMatricula",{templateUrl:"Paginas/establecerEstadoMatricula.html", controller:'matriculaController'});
    $routeProvider.when("/pre-Matricula",{templateUrl:"Paginas/agregarpre-Matricula.html", controller:'matriculaController'});
    $routeProvider.when("/Cursos",{templateUrl:"Paginas/admin_niveles.html", controller:'matriculaController'});
    $routeProvider.when("/reportes",{templateUrl:"Paginas/reporteEstudiantes.html", controller:'matriculaController'});
     //Niveles
    $routeProvider.when("/ingresoNivel",{templateUrl:"Paginas/ingresoNivel.html", controller:'nivelesController'});
    $routeProvider.when("/listarNiveles",{templateUrl:"Paginas/listarNiveles.html", controller:'nivelesController'});
    $routeProvider.when("/updateNiveles",{templateUrl:"Paginas/updateNiveles.html", controller:'nivelesController'});
    //jornadas
    $routeProvider.when("/ingresoJornada",{templateUrl:"Paginas/ingresoJornada.html", controller:'jornadasController'});
    $routeProvider.when("/listarJornadas",{templateUrl:"Paginas/listarJornadas.html", controller:'jornadasController'});
    $routeProvider.when("/updateJornadas",{templateUrl:"Paginas/updateJornadas.html", controller:'jornadasController'});
    //lunch
    $routeProvider.when("/ingresoLunch",{templateUrl:"Paginas/ingresoLunch.html", controller:'lunchController'});
    $routeProvider.when("/listarLunch",{templateUrl:"Paginas/listarLunch.html", controller:'lunchController'});
    $routeProvider.when("/updateLunch",{templateUrl:"Paginas/updatelunch.html", controller:'lunchController'});
    //Noticias
    $routeProvider.when("/ingresoNoticias",{templateUrl:"Paginas/ingresoNoticias.html", controller:'noticiasController'});
    $routeProvider.when("/listarNoticias",{templateUrl:"Paginas/listarNoticias.html", controller:'noticiasController'});
    $routeProvider.when("/updateNoticias",{templateUrl:"Paginas/updateNoticias.html", controller:'noticiasController'});
    //Factura
    $routeProvider.when("/datosFactura",{templateUrl:"Paginas/datosFactura.html", controller:'facturaController'});
    $routeProvider.when("/Mensualidad",{templateUrl:"Paginas/mensualidad.html", controller:'facturaController'});
    //Paralelos
    $routeProvider.when("/ingresoParalelos",{templateUrl:"Paginas/ingresoParalelos.html", controller:'nivelesController'});
    $routeProvider.when("/listarParalelos",{templateUrl:"Paginas/listarParalelos.html", controller:'nivelesController'});
    $routeProvider.when("/updateParalelos",{templateUrl:"Paginas/updateParalelos.html", controller:'nivelesController'});
    //Periodo
    $routeProvider.when("/AdminPeriodo",{templateUrl:"Paginas/AdminPeriodo.html", controller:'periodoController'});
    //Empresa
    $routeProvider.when("/DatosInstituto",{templateUrl:"Paginas/configurar_Datos_instituto.html", controller:'institutoController'});
    //Personal
    $routeProvider.when("/listarCargos",{templateUrl:"Paginas/Cargos.html", controller:'personalController'});
    $routeProvider.when("/listarPersonal",{templateUrl:"Paginas/listaPersonal.html", controller:'personalController'});
    $routeProvider.when("/updateCargos",{templateUrl:"Paginas/updateCargos.html", controller:'personalController'});
    $routeProvider.when("/ingresarPersonal",{templateUrl:"Paginas/ingresarPersonal.html", controller:'personalController'});
    $routeProvider.when("/updatePersonal",{templateUrl:"Paginas/updatePersonal.html", controller:'personalController'});
    $routeProvider.when("/rolPagos",{templateUrl:"Paginas/rol_de_pagos.html", controller:'personalController'});
    $routeProvider.when("/adelantoSueldo",{templateUrl:"Paginas/adelantoSueldo.html", controller:'personalController'});





    
    /*$provide.factory("ApiUrl", function () {
     return {
     urlUsuarios: 'http://localhost:3000/api/usuarios'
     };
     })*/

    //$provide.value('urlUsuarios', 'http://localhost:3000/api/usuarios');




});



//('urlUsuarios', 'http://localhost:3000/api/usuarios');



/*app.config(['$routeProvider', function ($routeProvider) {
 $routeProvider.when('/newEmpresa', { templateUrl: '/tesisSaludOcupacional/Client/Administrator/newEmpresa.html', controller: 'EmpresaController' });
 $routeProvider.when('/', { templateUrl: '/indexAdmin.html' });
 $routeProvider.otherwise({ redirectTo: '/error' });
 }]);*/
app.controller('navegacion', ['$scope', '$http', '$location','myProvider','$localStorage',  function ($scope,$http,$location,myProvider,$localStorage) {

    $scope.navegacion = function (url) {
        $location.path(url);

    }
    $scope.inicializarPage=function(){

  var a    = JSON.parse(window.localStorage.getItem('usuario'));

        $scope.us=a.user;
        console.log(a);
    }

    $scope.logout=function(){

        console.log("voy a salir");
        localStorage.clear();
        window.location ='index.html';


    }








}]);