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
        var n=30;
        while(n>0){
            var data=new SimpleList();
            this.vector.addNewDown(data,n);
            n--
        }
    }

    insertValue(data){
        //calculo el modulo
        var dataKey=data.id % this.size;
        
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
        
        console.log(text)

        d3.select('#lienzo').graphviz()
            .width(600)
            .height(600)
            .renderDot(text);
    }

    
    
}


var tabla=new HashTable(30);

var a=new Category(15,"a");
var b=new Category(35,"a");
var c=new Category(68,"a");
var d=new Category(54,"a");
var e=new Category(21,"a");
var f=new Category(85,"a");
var g=new Category(35,"a");
var h=new Category(36,"a");
var i=new Category(32,"a");
var j=new Category(10,"a");
var k=new Category(25,"a");
var l=new Category(35,"a");
var m=new Category(68,"a");
var n=new Category(68,"a");
var o=new Category(9,"a");
var p=new Category(54,"a");
var q=new Category(87,"a");

tabla.insertValue(a);
tabla.insertValue(b);
tabla.insertValue(c);
tabla.insertValue(d);
tabla.insertValue(e);
tabla.insertValue(f);
tabla.insertValue(g);
tabla.insertValue(h);
tabla.insertValue(i);
tabla.insertValue(j);
tabla.insertValue(k);
tabla.insertValue(l);
tabla.insertValue(m);
tabla.insertValue(n);
tabla.insertValue(o);
tabla.insertValue(p);
tabla.insertValue(q);


tabla.graph();
/*
var tabla=new HashTable(10);
var a=new Category(5,"a");
var b=new Category(10,"a");
var c=new Category(15,"a");
var d=new Category(20,"a");
var e=new Category(25,"a");
var f=new Category(30,"a");
var g=new Category(35,"a");
var h=new Category(40,"a");
var i=new Category(45,"a");
var j=new Category(50,"a");


tabla.insertValue(a);
tabla.insertValue(b);
tabla.insertValue(c);
tabla.insertValue(d);
tabla.insertValue(e);
tabla.insertValue(f);
tabla.insertValue(g);
tabla.insertValue(h);
tabla.insertValue(i);
tabla.insertValue(j);

*/