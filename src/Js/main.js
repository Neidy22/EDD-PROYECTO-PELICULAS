import SimpleList from "../Structures/SimpleList.js";
import Client from "../Objects/Client.js";
import Node from "../Objects/Node.js";
import BinaryTree from "../Structures/BinaryTree.js";
import HashTable from "../Structures/HashTable.js";
import AVL from "../Structures/AVL.js";

const clients=new SimpleList();

const actors=new BinaryTree();
//export {actors};
const categorys=new HashTable(20);
//export {categorys};
const movies=new AVL();
//export {movies};
const listaMovies=new SimpleList();
//export {listaMovies};

var user;



/*-------------------------------
    CREACIÓN DEL USER ADMIN
--------------------------------*/
const admin=new Client(2354168452525,"WIlfred Perez","EDD","wilfredP@gmail.com","123","+502 (123) 123-4567");


//window.addEventListener('load',function(){
  /*--------------------------------
        VERIFICAR LOGIN
  --------------------------------*/

  const form=document.getElementById("formulario");



  form.onsubmit = function(e){
   
    e.preventDefault();
    const username = document.getElementById("username").value;
    const pass=document.getElementById("pass").value;
    const isAdmin=document.getElementById("rol").checked;
    form.reset();
    //console.log(username);
    //console.log(pass);
    //console.log(isAdmin);
    
    if(isAdmin){
      if(username==admin.user && pass==admin.password){
          alert("Usuario Administrador Verificado")
          showHide('none',document.getElementsByClassName("menuPrincipal"));
          showHide('block',document.getElementsByClassName("menuAdmin"));
          showHide('none',document.getElementsByClassName("menuCliente"));

          //window.location.href="Views/Admin.html"
          //window.open("Views/Admin.html");
          //form.action="Views/Admin.html"

      }else{
          alert("Acceso administrador denegado")

      }
    }else{
      user=clients.search(username,pass);
      if(user!=null){
        showHide('none',document.getElementsByClassName("menuPrincipal"));
        showHide('none',document.getElementsByClassName("menuAdmin"));
        showHide('block',document.getElementsByClassName("menuCliente"));
        showHideSeccion(document.getElementsByClassName("cliente-container"),'home-client');

        alert("Bienvenido "+username)

      }else{
          alert("No se encontró un usuario válido, vuelve a intentarlo!")
      }
    }
    
    

  }

 
  /*-------------------------------------------------------
    Codigo para  cerrar sesión en admin
  --------------------------------------------------------*/
  const btnHome=document.getElementById("logoutAdmin");
  btnHome.addEventListener("click",(e) => {
    e.preventDefault()
    showHide('block',document.getElementsByClassName("menuPrincipal"));
    showHide('none',document.getElementsByClassName("menuAdmin"));
    showHide('none',document.getElementsByClassName("menuCliente"));
    
  });

   /*-------------------------------------------------------
    Codigo para  cerrar sesión en cliente
  --------------------------------------------------------*/
  const btnLog=document.getElementById("logoutCliente");
  btnLog.addEventListener("click",(e) => {
    e.preventDefault()
    showHide('block',document.getElementsByClassName("menuPrincipal"));
    showHide('none',document.getElementsByClassName("menuCliente"));
    showHide('none',document.getElementsByClassName("menuAdmin"));
    
  });


  /*-------------------------------------------------------
    Codigo para activar vista home de cliente
  --------------------------------------------------------*/
  const btnHomeClient=document.getElementById("btn-home");
  btnHomeClient.addEventListener("click",(e) => {
    e.preventDefault()
    showHideSeccion(document.getElementsByClassName("cliente-container"),'home-client');
    deleteContainerElements(document.getElementById('general-movies'));
  });

  //codigo para elegir el ordenamiento de la lista de películas
  var orden=document.getElementById("ordenamiento");
  orden.onclick = function (e){
    e.preventDefault();
    
    if(orden.value==1){
      //console.log("el ordenamiento seleccionado es ascendente")
      deleteContainerElements(document.getElementById('general-movies'));
      listaMovies.ordenamientoAs();
    }else if(orden.value==2){
      //console.log("el ordenamiento seleccionado es descendente")
      deleteContainerElements(document.getElementById('general-movies'));
      listaMovies.ordenamientoDes();
    }
  }


   /*-------------------------------------------------------
    Codigo para activar vista movies de cliente
  --------------------------------------------------------*/
  const btnMovies=document.getElementById("btn-movies");
  btnMovies.addEventListener("click",(e) => {
    e.preventDefault()
    showHideSeccion(document.getElementsByClassName("cliente-container"),'movies-client');
    
  });


  /*-------------------------------------------------------
    Codigo para activar vista categorias
  --------------------------------------------------------*/
  const btnCategorias=document.getElementById("btn-categorias");
  btnCategorias.addEventListener("click",(e) => {
    e.preventDefault()
    showHideSeccion(document.getElementsByClassName("cliente-container"),'categorias-client');
    categorys.show();
    
  });

  /*-------------------------------------------------------
    Codigo para activar vista actores
  --------------------------------------------------------*/
  
  const btnActores=document.getElementById("btn-actores");
  btnActores.addEventListener("click",(e) => {
    e.preventDefault()
    showHideSeccion(document.getElementsByClassName("cliente-container"),'actores-client');
    //recorrido in orden
    var inorder=document.getElementById("inorder");
    inorder.addEventListener("click",(e)=>{
      //si el contenedor de actores está lleno, lo vacío
      deleteContainerElements(document.getElementById('general-actors'));
      actors.showInorder();
    });

    //recorrido pre orden
    var preorder=document.getElementById("preorder");
    preorder.addEventListener("click",(e)=>{
      //si el contenedor de actores está lleno, lo vacío
      deleteContainerElements(document.getElementById('general-actors'));
      actors.showPreorder();
    });

    //recorrido post orden
    var postorder=document.getElementById("postorder");
    postorder.addEventListener("click",(e)=>{
      //si el contenedor de actores está lleno, lo vacío
      deleteContainerElements(document.getElementById('general-actors'));
      actors.showPostorder();
    });

    
    
  });


 /*-------------------------------------------------------
    Codigo para activar vista pelicula especifica
  --------------------------------------------------------*/
  


  






//});



  
    //función para mostrar u ocultar los elementos de una clase
    function showHide(estado,elementos){
      var i;
      for(i=0; i<elementos.length; i++){
        elementos[i].style.display=estado;
      }

    }

    //funcion para activar una seccion especifica de un menu 
    function showHideSeccion(clase,id){
      var i;
      for(i=0; i<clase.length; i++){
        //console.log(clase[i].getAttribute('id'));
        //console.log(id);
        if(clase[i].getAttribute('id')==id){
          clase[i].style.display='block';
        }else{
          clase[i].style.display='none';
        }
      }
    }

    //función para eliminar todo los elementos del contenedor de actores

    function deleteContainerElements(container){
  
     while(container.firstChild){
      container.removeChild(container.firstChild);
     }
    }

    
export {clients,actors,categorys,movies,listaMovies,deleteContainerElements,showHideSeccion,showHide}