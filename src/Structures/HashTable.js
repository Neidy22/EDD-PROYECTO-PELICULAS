import Node from "../Objects/Node.js";
import Category from "../Objects/Category.js";
import SimpleList from "./SimpleList.js"

class HashTable{
    constructor(_size){
        this.size=_size
        this.vector=new SimpleList();
        this.ocupation=0;
        this.init();
    }

    init(){
        //creo el vector
        var n=this.size-1;
        while(n>=0){
            var data=new SimpleList();
            this.vector.addNewDown(data,n);
            n--
        }
    }

    insertValue(data){
        //calculo el modulo
        var dataKey=data.id % this.size;
        console.log("Llave "+dataKey+" Para"+data.id);
        //calculo y verifico el porcentaje de ocupación 
        this.ocupation=this.ocupation+(1/this.size);
       
        if(this.ocupation<=0.75){
            //obtengo el nodo en la posición de la llave
            var nodo=this.getNode(dataKey);
            //inserto el valor de la data en el nodo 
            nodo.value.addNew(data);
            
           
            
        }
        

    }

    getNode(key){

        var iden=this.positionCalc(key);
        var aux=this.vector.first;
        
        while(aux!=null){
            if(aux.id==iden){
                return aux;
            }
            aux=aux.down;
        }
        return null;

    }

    positionCalc(key){
        var pos;
        var aux=key-this.size;
        while(true){
            if(key<this.size){
                pos=key;
                break;
            }else if(aux<this.size){
                pos=aux;
                break;
            }else{
                aux=aux-this.size;
            }
        }

        return pos

    }


    show(){
        var aux=this.vector.first;
        var pos=0;
        while(aux!=null){
            pos++;
            var aux2=aux.value.first;
            if(aux2!=null){
                while(aux2!=null){
                    this.createCategoryCont(aux2.value,pos)
                    aux2=aux2.next;
                }
            }


            aux=aux.down;
        }

    }

    createCategoryCont(category,n){
        const general=document.getElementById("general-categorys");

        const contenedor=document.createElement("div");
        contenedor.id="category"+n;
        contenedor.classList="bloque-category";
  
        const company=document.createElement("h1");
        company.classList="subtitle";
        company.textContent=category.company;
        
        const iden=document.createElement("h2");
        iden.classList="subtitle2";
        iden.textContent="id: "+category.id;

    
        contenedor.appendChild(company);
        contenedor.appendChild(iden);
     
        general.appendChild(contenedor);
  
    }


    graph(){
        var text="digraph TablaHash{\n"
        text+="rankdir=LR;\n"
        //text+="ranksep=0;\n"
        text+="nodesep=0;\n"
        text+="node [shape=record, height=0.1];\n"
        var relas=""
        var ranks=""
        var colisiones=""
        var aux=this.vector.first

        if(aux!=null){
            
           
            //grafico la lista de valores este vector
           
            while(aux!=null){
              
                text+="node"+aux.id+"[label = \"<f1>"+aux.id+"|<f2>\" , group="+aux.id+" , weight="+aux.id+"];\n";
               
                //si la llave tiene valores ingresados los grafico
                if(aux.value.first!=null){
                   
                    var aux2=aux.value.first;
                    colisiones+="   node"+aux.id+" -> node"+aux.id+"nodeN"+aux2.id+";\n";
                    while(aux2.next!=null){
                        colisiones+="   node"+aux.id+"nodeN"+aux2.id+" -> node"+aux.id+"nodeN"+aux2.next.id+";\n";
                        colisiones+="   node"+aux.id+"nodeN"+aux2.id+"[label=\""+aux2.value.id+"\" , group="+aux2.id+" , weight="+aux2.id+"];\n"
                        aux2=aux2.next;

                    }
                    colisiones+="   node"+aux.id+"nodeN"+aux2.id+"[label=\""+aux2.value.id+"\" , group="+aux2.id+" , weight="+aux2.id+"];\n"

                }

                aux=aux.down
                
            }
            
    
            

        }

        text+=colisiones;
        text+="}\n"
        
        //console.log(text)

        d3.select('#hashtable').graphviz()
            .width(600)
            .height(300)
            .renderDot(text);
    }

    
    
}
export default HashTable;

