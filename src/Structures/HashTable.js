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
        var aux=this.vector.first;
        
        while(aux!=null){
            if(aux.id==key){
                return aux;
            }
            aux=aux.down;
        }
        return null;

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

