// Funcion que ejerce las veces de controlador para la region del html definida
// en index.html.
function ControladorReqs($scope,$http) {
  
//   variables que sirven para hacer visible o no regiones especificas del html.
//   (parte del atributo style="display:<parte>")
  $scope.parte1="block";
  $scope.parte2="none";
  $scope.parte3="none";
  $scope.parte4="none";
  $scope.parte5="none";
  $scope.parte6="none";
  $scope.parte7="none";
  $scope.parte8="none";
  
//   Se llenaria con la lista de usuarios y claves de la bd
  $scope.usuarios=[];
  $scope.error_login="";
  //Proyectos que deberan ser cargados desde la bd
  $scope.proyectos=[];
  
  //Funcion que se encarga de validar a un usuario. Lo busca en un arreglo llamado
  //usuarios (este arreglo debe ser llenado al inicio, es decir siempre tenerlo llenado).
  //Si el login es correcto, pone a visualizar el div apropiado y si no, indica un
  //msj de error y reinicializa las variables usuario y clave del modelo y forulario
  $scope.login= function(){
    var encontre=0;
    var i;



    $http.post('/login',{ usuario : $scope.usuario, clave : $scope.clave})

    .success(function(data){
      
      if(data.usuario == "Usuario no autorizado"){
        $scope.error_login = "Usuario no autorizado";
      }else{
        $scope.usuario = data.usuario;
        $scope.proyectos = data.proyectos;
        $scope.parte2="block";
        $scope.parte1="none";
        $scope.error_login="";
      }

    })

    .error(function(){
      $scope.usuario = "Usrizado";


    });
  };



  //Funcion que es llamada cuando se clickea sobre un proyecto para desplegar
  //los requerimientos del mismo. Simplemente hace visible y no visible la
  //parte deseada del html.En laa variable proyecto se almacena el nombre
  //del proyecto con el que se trabaja. Recibe el proyecto clickeado.
  
  //IMPORTANTE BD: Al momento de hacer esto, se debe traer de la base de datos
  //todos los requerimientos y tareas asociadas a dicho proyecto.
  $scope.abrirProyecto= function(a){
    

    $http.get('/requirements',{params :{usuario : $scope.usuario, proyecto : a}}).success(function(data){
      $scope.proyecto = data.proyecto;
      $scope.parte2="none"
      $scope.parte3="block";
      
      $scope.requerimientos=data.requerimientos;

    })

    .error(function(){
      $scope.proyecto = "Error";

    })
    
  };
  
  //Funcion que es llamada cuando el usuario desea ver en detalle un
  //requerimiento. Analoga a la funcion anterior. Recibe el requerimiento
  //clickeado. La variable del scope requerimientoActual hace referencia
  //al requerimiento que se esta trabajandoo visualizando en detalle.
  $scope.abrirRequerimiento= function(a){
    $http.get('/tasks', {params:{usuario : $scope.usuario,
                                  proyecto : $scope.proyecto,
                                  requerimiento : a}})
    .success(function(data){
      $scope.parte5="block";
      $scope.parte3="none";
      $scope.nombreReq = data.requerimiento;
      $scope.descrReq = data.descripcion;
      $scope.categoriaReq = data.categoria;
      $scope.tareasReq = data.tareas;

    });
    
  };
  
  //Funcion para volver a la lista de requerimientos una vez se ha visto
  //en detalle el mismo. Aparte de volver, el requerimientoActual es puesto
  //como nulo pues ya no se esta visualizando en detalle ningun requerimiento.
  $scope.volver= function(){
    $scope.parte5="none";
    $scope.parte3="block";
    $scope.abrirProyecto($scope.proyecto);
  };
  
  //Funcion que agrega un nuevo requerimiento al proyecto con el que se esta
  //trabajando.
  $scope.newreque= function(){

    $http.post('/addrequirement',{
      requerimiento : $scope.nombrereq,
      descripcion : $scope.descrreq,
      clasificacion : $scope.categreq,
      usuario : $scope.usuario,
      proyecto : $scope.proyecto
    }).success(function(){
      $scope.abrirProyecto($scope.proyecto);
      $scope.descrreq="";
      $scope.nombrereq="";
      $scope.categreq="";   
  

    });
      
  };

  
  
  //Par de funciones que hacen visible las secciones para la modificacion
  //de requisitos
  $scope.modificarRequerimiento= function(){
    $scope.parte6="block";
    $scope.newnomb = $scope.nombreReq;
    $scope.newdescr = $scope.descrReq;
    $scope.newcateg = $scope.categoriaReq;   
  };
  
  $scope.actualizarRequerimiento=function(nombReq){
    $scope.parte6="none";
    
    $http.put('/updaterequirement',{
      requerimientoViejo : nombReq,
      requerimientoNuevo : $scope.newnomb,
      descripcionNueva : $scope.newdescr,
      clasificacionNueva : $scope.newcateg,
      proyecto : $scope.proyecto,
      usuario : $scope.usuario
    }).success(function(){
      if(nombReq != $scope.newnomb){
        nombReq = $scope.newnomb;
      }
      $scope.abrirRequerimiento(nombReq);
    });

  }

  //Funcion que es ejecutada para modificar la descripcion de un requerimiento.
  //Se modifica en el arreglo, luego debe hacerse persistente en la base de datos.
  $scope.newdescrreq= function(){
    $scope.parte6="none"; 
    
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
    
    $http({method: 'DELETE', url: '/deleterequirement',params:{
      requerimiento : re,
      proyecto : $scope.proyecto,
      usuario : $scope.usuario
    }}).
    success(function(data, status, headers, config) {
      $scope.abrirProyecto($scope.proyecto);
    
    }).
    error(function(data, status, headers, config) {
      
    });

  };

  $scope.agregarTarea= function(a){
    $http.post('/addtask',{
        tarea : $scope.nombretask,
        descripcion : $scope.descrtask,
        requerimiento : a,
        proyecto : $scope.proyecto,
        usuario : $scope.usuario
    }).success(function(){
        $scope.nombretask="";
        $scope.descrtask="";
        $scope.abrirRequerimiento(a); 
    });
  };

  $scope.eliminarTarea= function(nTarea,nombreReq){
    $http({method: 'DELETE', url: '/deletetask',params:{
      requerimiento : nombreReq,
      proyecto : $scope.proyecto,
      usuario : $scope.usuario,
      tarea : nTarea
    }}).
    success(function(data, status, headers, config) {
      $scope.abrirRequerimiento(nombreReq);
    
    }).
    error(function(data, status, headers, config) {
      
    });
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
    $scope.parte8="none";
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