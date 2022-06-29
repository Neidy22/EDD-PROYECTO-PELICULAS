import SimpleList from "../Structures/SimpleList.js";
import Client from "../Objects/Client.js";
import myStorage from "./main.js";



window.addEventListener('load',function(){
    const clients=myStorage.getItem('clients')

    /*--------------------------------
       CARGAS MASIVAS
    --------------------------------*/
    document.getElementById('cmClientes').addEventListener('change', function() {
        
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
            clients.addNew(aux)
            
                
        }
       
        clients.graph()
  
  
    }


});




