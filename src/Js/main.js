import SimpleList from "../Structures/SimpleList.js";
import Client from "../Objects/Client.js";
import Node from "../Objects/Node.js";
import BinaryTree from "../Structures/BinaryTree.js";
import HashTable from "../Structures/HashTable.js";
import AVL from "../Structures/AVL.js";
//creo mi variable de local storge
const myStorage=window.localStorage;
//creo las instancias de las estructuras a utilizar
const clients=new SimpleList();
export {clients};
const actors=new BinaryTree();
export {actors};
const categorys=new HashTable(20);
export {categorys};
const movies=new AVL();
export {movies};

var user;
myStorage.setItem("clients",clients);

/*-------------------------------
    CREACIÓN DEL USER ADMIN
--------------------------------*/
const admin=new Client(2354168452525,"WIlfred Perez","EDD","wilfredP@gmail.com","123","+502 (123) 123-4567");
myStorage.setItem("admin",admin);

window.addEventListener('load',function(){
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
      if(username=="EDD" && pass=="123"){
          alert("Usuario Administrador Verificado")
          window.location.href="Views/Admin.html"
          //window.open("Views/Admin.html");
          //form.action="Views/Admin.html"

      }else{
          alert("Acceso administrador denegado")

      }
    }else{
      user=clients.search(username,pass);
      if(user!=null){
          alert("Bienvenido "+username)
      }else{
          alert("No se encontró un usuario válido, vuelve a intentarlo!")
      }
    }
    
    

  }

  









});


export default {myStorage};

