// Funcion que ejerce las veces de controlador para la region del html definida
// en index.html.

function ControladorReqs($scope) {
  
//   variables que sirven para hacer visible o no regiones especificas del html.
//   (parte del atributo style="display:<parte>")
  $scope.parte1="block";
  $scope.parte2="none";
  $scope.parte3="none";
  $scope.parte4="none";
  $scope.parte5="none";
  $scope.parte6="none";
  $scope.parte7="none";
  
//   Se llenaria con la lista de usuarios y claves de la bd
  $scope.usuarios=[{nombre:"carlos", clave:"hola"},{nombre:"pepe", clave:"hola2"},
                   {nombre:"kiwi", clave:"naranja"}];
  $scope.error_login="";
  //Proyectos que deberan ser cargados desde la bd
  $scope.proyectos=["proyecto1", "proyecto2", "proyecto3"];
  
  //Funcion que se encarga de validar a un usuario. Lo busca en un arreglo llamado
  //usuarios (este arreglo debe ser llenado al inicio, es decir siempre tenerlo llenado).
  //Si el login es correcto, pone a visualizar el div apropiado y si no, indica un
  //msj de error y reinicializa las variables usuario y clave del modelo y forulario
  $scope.login= function(){
    var encontre=0;
    var i;
    for (i=0; i< $scope.usuarios.length; i++){
      if (($scope.usuarios[i].nombre == $scope.usuario) && ($scope.usuarios[i].clave == $scope.clave)){
	encontre=1;
      }
    }
    if (encontre == 1){
      $scope.parte2="block";
      $scope.parte1="none";
      $scope.error_login="";
    }
    else{
      $scope.error_login="Clave/contrasena invalidos: intente de nuevo";
      $scope.usuario="";
      $scope.clave="";
    }
  };
  
  //Funcion que es llamada cuando se clickea sobre un proyecto para desplegar
  //los requerimientos del mismo. Simplemente hace visible y no visible la
  //parte deseada del html.En laa variable proyecto se almacena el nombre
  //del proyecto con el que se trabaja. Recibe el proyecto clickeado.
  
  //IMPORTANTE BD: Al momento de hacer esto, se debe traer de la base de datos
  //todos los requerimientos y tareas asociadas a dicho proyecto.
  $scope.abrirProyecto= function(a){
    $scope.parte2="none"
    $scope.parte3="block";
    $scope.proyecto=a;
    $scope.requerimientos=[{nombre: "Requerimiento 1", descr:"bla bla bla", proy:"proyecto1", categoria:"funcional"},
			 {nombre: "Requerimiento 2", descr:"bla bla bla", proy:"proyecto1", categoria:"funcional"},
			 {nombre: "Requerimiento 3", descr:"bla bla bla", proy:"proyecto1", categoria:"no funcional"},
			 {nombre: "Requerimiento 4", descr:"bla bla bla", proy:"proyecto1", categoria:"funcional"},
			 {nombre: "Requerimiento 5", descr:"bla bla bla", proy:"proyecto1", categoria:"no funcional"}];
  };
  
  //Funcion que es llamada cuando el usuario desea ver en detalle un
  //requerimiento. Analoga a la funcion anterior. Recibe el requerimiento
  //clickeado. La variable del scope requerimientoActual hace referencia
  //al requerimiento que se esta trabajandoo visualizando en detalle.
  $scope.abrirRequerimiento= function(a){
    $scope.parte5="block";
    $scope.parte3="none";
    $scope.requerimientoActual=a;
  };
  
  //Funcion para volver a la lista de requerimientos una vez se ha visto
  //en detalle el mismo. Aparte de volver, el requerimientoActual es puesto
  //como nulo pues ya no se esta visualizando en detalle ningun requerimiento.
  $scope.volver= function(){
    $scope.parte5="none";
    $scope.parte3="block";
    $scope.requerimientoActual="";
  };
  
  //Funcion que agrega un nuevo requerimiento al proyecto con el que se esta
  //trabajando.
  $scope.newreque= function(){
      $scope.requerimientos.push({nombre:$scope.nombrereq, descr:$scope.descrreq, categoria: $scope.categreq});
      $scope.descrreq="";
      $scope.nombrereq="";
      $scope.categreq="";   
  };
  
  //Par de funciones que hacen visible las secciones para la modificacion
  //de requisitos
  $scope.modificarDescripcion= function(){
    $scope.parte6="block";   
  };
  
  $scope.modificarCategoria= function(){
    $scope.parte7="block";   
  };
  
  
  //Funcion que es ejecutada para modificar la descripcion de un requerimiento.
  //Se modifica en el arreglo, luego debe hacerse persistente en la base de datos.
  $scope.newdescrreq= function(){
    $scope.parte6="none"; 
    //Busco el requerimiento en el arreglo, lo modifico y luego
    //se hace permanente el cambio en la bd.
    for (j=0; j< $scope.requerimientos.length; j++){
      if ($scope.requerimientos[j].nombre==$scope.requerimientoActual.nombre){
	$scope.requerimientos[j].descr=$scope.newdescr;
	$scope.requerimientoActual.descr=$scope.newdescr;
	$scope.newdescr="";
      }
    }
  };
  
   //Funcion analoga a la anterior, pero para la modificacion de la categoria.
   $scope.newcategreq= function(){
    $scope.parte7="none"; 
    //Busco el requerimiento en el arreglo, lo modifico y luego
    //se hace permanente el cambio en la bd.
    for (j=0; j< $scope.requerimientos.length; j++){
      if ($scope.requerimientos[j].nombre==$scope.requerimientoActual.nombre){
	$scope.requerimientos[j].categoria=$scope.newcateg;
	$scope.requerimientoActual.categoria=$scope.newcateg;
	$scope.newcateg="";
      }
    }
  };
  
  //Funcion a ser ejecutada para eliminar un requerimiento.
  //Se elimina del arreglo, luego debe hacerse persistente en la bd.
  $scope.eliminarReq= function(re){
    //Busco index en el arreglo del req a eliminar y luego uso splice
    for (w=0;w<$scope.requerimientos.length;w++){
      if ($scope.requerimientos[w].nombre == re.nombre){
	$scope.requerimientos.splice(w,1);
      }
    }
  };
  
  //Funcion que retorna a la pagina inicio, y reinicializa todo.
  $scope.volverHome= function(re){
    $scope.parte1="block";
    $scope.parte2="none";
    $scope.parte3="none";
    $scope.parte4="none";
    $scope.parte5="none";
    $scope.parte6="none";
    $scope.parte7="none";
    $scope.requerimientoActual="";
    $scope.requerimientos=[];
    $scope.usuario="";
    $scope.clave="";
    $scope.newcateg="";
    $scope.newdescr="";
    $scope.descrreq="";
    $scope.nombrereq="";
    $scope.categreq="";  
    $scope.error_login="";
  };
}