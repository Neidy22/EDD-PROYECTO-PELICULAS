import SimpleList from "../Structures/SimpleList.js";
import Client from "../Objects/Client.js";
import Actor from "../Objects/Actor.js";
import Category from "../Objects/Category.js";
import Movie from "..//Objects/Movie.js";
import {clients,movies,actors,categorys,listaMovies} from "./main.js";

//const clients=myStorage.getItem("clients");
//const actors=myStorage.getItem("actors");
//const categorys=myStorage.getItem("categorys");
//const movies=myStorage.getItem("movies");

//window.addEventListener('load',function(){
    
    
    /*--------------------------------
       CARGAS MASIVAS
    --------------------------------*/

    //carga de películas
    document.getElementById('cmMovies').addEventListener('change', function() {
       
        //obtengo el archivo
        let fileAut = new FileReader();
        //cargo el archivo
        fileAut.onload = () => {
    
        //parseo el archivo para poder extraer los datos
        let moviesData=JSON.parse(fileAut.result)
        //mando a extraer los datos para mostrarlos en el html
        renderHTMLMovies(moviesData)
        }
  
        fileAut.readAsText(this.files[0]);
       

  
  
    });
  
    function renderHTMLMovies(data){
    
        let aux;
        for( let i=0; i<data.length; i++){
            //constructor(_id,_name,_descripcion,_puntuacion,_precio)
            aux=new Movie(data[i].id_pelicula,data[i].nombre_pelicula,data[i].descripcion,data[i].puntuacion_star,data[i].precio_Q);
            movies.insertN(aux);
            //listaMovies.addNewOrdered(aux);
            //console.log("insertado"+aux.dpi)
            
                
        }
       
        movies.graph();
        movies.createList(listaMovies);
    }







    //carga de clientes
    document.getElementById('cmClients').addEventListener('change', function() {
       
        //obtengo el archivo
        let fileAut = new FileReader();
        //cargo el archivo
        fileAut.onload = () => {
    
        //parseo el archivo para poder extraer los datos
        let clientsData=JSON.parse(fileAut.result)
        //mando a extraer los datos para mostrarlos en el html
        renderHTMLClientes(clientsData)
        }
  
        fileAut.readAsText(this.files[0]);
       

  
  
    });
  
    function renderHTMLClientes(data){
    
        let aux;
        for( let i=0; i<data.length; i++){
            //constructor(_dpi,_name,_user,_email,_password,_telephone)
            aux=new Client(data[i].dpi,data[i].nombre_completo,data[i].nombre_usuario,data[i].correo,data[i].contrasenia,data[i].telefono);
            clients.addNew(aux);
            //console.log("insertado"+aux.dpi)
            
                
        }
       
        clients.graph();
  
  
    }

    //carga de actores
    document.getElementById('cmActors').addEventListener('change', function() {
        
        //obtengo el archivo
        let fileAut = new FileReader();
        //cargo el archivo
        fileAut.onload = () => {
    
        //parseo el archivo para poder extraer los datos
        let actorsData=JSON.parse(fileAut.result)
        //mando a extraer los datos para mostrarlos en el html
        renderHTMLActors(actorsData)
        }
  
        fileAut.readAsText(this.files[0]);
        
  
  
    });
  
    function renderHTMLActors(data){  
    
        let aux;
        for( let i=0; i<data.length; i++){
            //constructor(_dni,_name,_email,_description)
            aux=new Actor(data[i].dni,data[i].nombre_actor,data[i].correo,data[i].descripcion);
            actors.insertN(aux);
            //console.log("insertado"+aux.dpi)
            
                
        }
       
        actors.graph();
  
  
    }

    //carga de categorías
    document.getElementById('cmCategory').addEventListener('change', function() {
        
        //obtengo el archivo
        let fileAut = new FileReader();
        //cargo el archivo
        fileAut.onload = () => {
    
        //parseo el archivo para poder extraer los datos
        let categorysData=JSON.parse(fileAut.result)
        //mando a extraer los datos para mostrarlos en el html
        renderHTMLCategory(categorysData)
        }
  
        fileAut.readAsText(this.files[0]);
       

  
  
    });
  
    function renderHTMLCategory(data){  
    
        let aux;
        for( let i=0; i<data.length; i++){
            //constructor(_id,_company)
            aux=new Category(data[i].id_categoria,data[i].company);
            categorys.insertValue(aux);
            //console.log("insertado"+aux.dpi)
            
                
        }
       
        categorys.graph();
  
  
    }


//});




