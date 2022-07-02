import Node from "../Objects/Node.js";
//import {deleteContainerElements,showHideSeccion} from "../Js/main.js";

function viewMovie(pelicula){
    //var pelicula=movies.search(id);
    //console.log("ya busque"+id)

    const general = document.getElementById("specific-movie-info");
    deleteContainerElements(general);

    //creo el div con la información
    const peli = document.createElement("div");
    peli.id="info-pelicula";

    const titulo = document.createElement("h1");
    titulo.classList="title";
    titulo.textContent = pelicula.name;

    const desc = document.createElement("h2");
    desc.classList="subtitle";
    desc.textContent="Descripción:"

    const contenidoD = document.createElement("p");
    contenidoD.classList="text";
    contenidoD.textContent=pelicula.description;

    peli.appendChild(titulo);
    peli.appendChild(desc);
    peli.appendChild(contenidoD);

      //creo el div para editar la información


      //creo el div para los comentarios

    general.appendChild(peli);
      //muestro la sección con los datos encontrados
    showHideSeccion(document.getElementsByClassName("cliente-container"),'movies-client');


};

function deleteContainerElements(container){
    while(container.firstChild){
        container.removeChild(container.firstChild);
       }
};
  
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
};


class SimpleList{
   
    constructor(){
        this.first=null
        this.size=0
   

    }

    
    addNew(data){
        var nuevo=new Node(data)
        nuevo.id=this.size
        if(this.first==null){
            this.first=nuevo
        }else{
            var aux=this.first
            while(aux.next!=null){
                aux=aux.next
            }
            aux.next=nuevo
        }
        this.size++

    }

    addNewDown(data,id){
        var nuevo=new Node(data)
        nuevo.id=id
        if(this.first==null){
            this.first=nuevo
        }else{
            var aux=this.first
            while(aux.down!=null){
                aux=aux.down
            }
            aux.down=nuevo
        }
        this.size++

    }

    addNewOrdered(data){
        var nuevo=new Node(data)
        nuevo.id=data.id
        if(this.first==null){
            this.first=nuevo
        }else if (nuevo.id<this.first.id){
            nuevo.next=this.first
            this.first=nuevo
        }else{
            var aux=this.first
            var prev=this.first
            while(nuevo.id>aux.id && aux.next!=null){
                prev=aux
                aux=aux.next

            }
            if(nuevo.id>aux.id){
                prev=aux
            }
            nuevo.next=prev.next
            prev.next=nuevo
        }
        this.size++
        //console.log("pelicula insertada en lista");
    }


    search(user,pass){
        var aux=this.first
        while(aux!=null){
            if(aux.value.user==user && aux.value.password==pass){
                return aux
            }
            aux=aux.next
        }

        return null
    }


    graph(){
        var doteCode="digraph ListaSimple {\n";
        doteCode+="rankdir=LR;\n";
        doteCode+="label=\"Lista Simple\";\n"
        doteCode+="     fontname=\"Forte\";\n"
        doteCode+="     fontsize=30;\n"
        doteCode+="node[shape=box, fontsize=14];\n";
        
        var relas=""
        var labels=""
        var aux=this.first
        while(aux.next!=null){
            relas+="    node"+aux.id+" -> node"+aux.next.id+";\n"
            labels+="    node"+aux.id+" [label=\""+aux.value.name+"\"];\n"
            aux=aux.next
        }
        labels+="    node"+aux.id+" [label=\""+aux.value.name+"\"];\n"
        
        doteCode+=relas
        doteCode+=labels

        doteCode+="    }\n"
        //console.log(doteCode)
        d3.select('#simple-list').graphviz()
            .width(600)
            .height(300)
            .renderDot(doteCode);


    }



    ordenamientoAs(){
       
        var aux=this.first;
        while(aux!=null){
            this.createPeliculasCont(aux.value,aux.id);
            aux=aux.next;
        }
    }

    ordenamientoDes(){
        var n=this.size-1;
        var aux,j;
   
        while(n>=0){
            aux=this.first;
            j=0;
            while(aux!=null){
                if(j==n){
                    this.createPeliculasCont(aux.value,aux.id);
                    break;
                }
                aux=aux.next;
                j++;
            }
            
            n--;
        }
        
    }

   

    
    createPeliculasCont(pelicula,n){
        const general=document.getElementById("general-movies");
        //contenedor para cada pelicula
        const contenedor=document.createElement("div");
        contenedor.id="pelicula"+n;
        contenedor.classList="bloque-pelicula";
        
        //contenedor para los títulos de  películas
        const titulo=document.createElement("div");
        titulo.classList="titulos-container subtitle2";
        titulo.textContent=pelicula.name+" Id: "+pelicula.id;

        //contenedor para las descripciones
        const descripcion=document.createElement("div");
        descripcion.classList="descripcion-container text";
        descripcion.textContent=pelicula.description;
        

        //contenedor para los botones de información
        const info=document.createElement("div");
        info.classList="info-container";
        //boton para ver la información de una película
        const btnInfo=document.createElement("a");
        btnInfo.href="#";
        btnInfo.onclick=function(){
            viewMovie(pelicula);

            /*
            const general = document.getElementById("specific-movie-info");
            deleteContainerElements(general);
    
            //creo el div con la información
            const peli = document.createElement("div");
            peli.id="info-pelicula";
    
            const titulo = document.createElement("h1");
            titulo.classList="title";
            titulo.textContent = pelicula.name;
    
            const desc = document.createElement("h2");
            desc.classList="subtitle";
            desc.textContent="Descripción:"
    
            const contenidoD = document.createElement("p");
            contenidoD.classList="text";
            contenidoD.textContent=pelicula.description;
    
            peli.appendChild(titulo);
            peli.appendChild(desc);
            peli.appendChild(contenidoD);
    
            //creo el div para editar la información
    
    
            //creo el div para los comentarios
    
            general.appendChild(peli);
            //muestro la sección con los datos encontrados
            showHideSeccion(document.getElementsByClassName("cliente-container"),'movies-client');
            */
        };
        //span para el icono del INFO
        const icono1=document.createElement("span");
        icono1.classList="material-icons";
        icono1.textContent="INFO";
 
        btnInfo.appendChild(icono1);
        info.appendChild(btnInfo);


        //contenedor para los botones  de alquiler
        const alquilar=document.createElement("div");
        alquilar.classList="alquiler-container";
        //boton alquilar con una etiqueta a
        const btnAlqui=document.createElement("a");
        btnAlqui.href="#";
        
        //span para el icono del carrito
        const icono2=document.createElement("span");
        icono2.classList="material-icons subtitle";
        icono2.textContent="ALQUILAR";
        

        
        btnAlqui.appendChild(icono2);
        alquilar.appendChild(btnAlqui);



        const precio=document.createElement("div");
        precio.classList="precio-container subtitle2";
        precio.textContent="Q."+pelicula.precio;
        


        contenedor.appendChild(titulo);
        contenedor.appendChild(descripcion);
        contenedor.appendChild(info);
        contenedor.appendChild(alquilar);
        contenedor.appendChild(precio);

        general.appendChild(contenedor);
  
    }

    
   
    

}

export default SimpleList;

/*

var filas=new SimpleList()

var uno=20
var dos=2
var tres=3
var cuatro=4
var cinco=5
var seis=45
filas.addNewOrdered(uno)
filas.addNewOrdered(dos)
filas.addNewOrdered(tres)
filas.addNewOrdered(cuatro)
filas.addNewOrdered(cinco)
filas.addNewOrdered(seis)
filas.graph()*/