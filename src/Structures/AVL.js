import Node from "../Objects/Node.js";
import Movie from "../Objects/Movie.js";
import { listaMovies } from "../Js/main.js";
class AVL{
    constructor(){
        this.root=null;
        this.left_son=null;
        this.right_son=null;
        this.levels=0
        
    }

    insertN(data){
        var nuevo= new Node(data);
        nuevo.id=data.id;
        nuevo.name=data.name;
        this.addNew(this,nuevo);

    }

    insertH(nuevo,actual,n,padre){
        //si la raíz es nula ingreso el nuevo nodo como raiz
        
        if(actual.root==null){
            actual.root=nuevo
            actual.left_son=new AVL()
            actual.right_son=new AVL()
            actual.level=n
            this.nodos++
        }
        //comparo si el valor de la llave del nuevo nodo es mayor  que la llave de la raíz recorro el sub-árbol derecho
        else if(nuevo.id>actual.root.id){
            n++
            
            if(n>this.levels){
                this.levels++   
            }
            
            
            return this.insertH(nuevo,actual.right_son,n,actual)

        }
        //comparo si el valor de la llave del nuevo nodo es igual  que la llave de la raíz no inserto el nodo porque está repetido
        else if(nuevo.id==actual.root.id){
           
            console.log("Repetido")
        }
        //comparo si el valor de la llave del nuevo nodo es menor que la llave de la raíz recorro el sub-árbol izquierdo
        else{
            n++
            
            if(n>this.levels){
                this.levels++
            
               
            }
           
            return this.insertH(nuevo,actual.left_son,n,actual)
        }

        


        return 0

    }

  
    addNew(temp,nuevo){
        
        //casos que pueden ocurrir en la inserción de un nuevo nodo
        //console.log(temp);
        //si el nodo actual es nulo
        if(temp.root==null){
            this.case1(temp,nuevo);
        }

        //si el hijo izquierdo y derecho no son nulos
        else if(temp.left_son.root != null && temp.right_son.root != null){
            this.case2(temp,nuevo);
        }

        //si los hijos izquierdo y derecho  son nulos
        else if(temp.left_son.root == null && temp.right_son.root == null){
            this.case3(temp,nuevo);
            

        }
            
        //si el hijo izquierdo no es nulo y el hijo derecho si es nulo
        else if(temp.left_son.root != null && temp.right_son.root == null){
            this.case4(temp,nuevo);
        }
            

        //si el hijo izquierdo es nulo y el hijo derecho no es nulo
        else if(temp.left_son.root == null && temp.right_son.root != null){
            this.case5(temp,nuevo);
        }
            
           

    }


    case1(actual,nuevo){
        //console.log("caso 1");
        //el nodo actual es nuevo
        actual.root=nuevo
        actual.left_son=new AVL()
        actual.right_son=new AVL()
        //console.log("Insertado "+nuevo.id);

        //listaMovies.addNewOrdered(nuevo.value);
        
    }

    case2(actual,nuevo){
        //console.log("caso 2");
        //si el valor es mayor que el nodo actual, me voy a da la derecha
        if(nuevo.id>actual.root.id){
            this.addNew(actual.right_son,nuevo);
        }

        //si el valor es menor que el nodo actual, me voy a la izquierda
        else if(nuevo.id<actual.root.id){
            this.addNew(actual.left_son,nuevo);
        }

        //si son iguales no lo inserto 
        else if(nuevo.id==actual.root.id){
            console.log("repetido");
        }

    }

    case3(actual,nuevo){
        //console.log("Caso 3")
        //si el valor ingresado es mayor que el actual, el hijo derecho es nuevo
        if(nuevo.id > actual.root.id){
            this.case1(actual.right_son,nuevo);
        }
        
        //si el valor ingresado es menor que el actual, el hijo izquierdo es nuevo
        else if(nuevo.id < actual.root.id){
            this.case1(actual.left_son,nuevo);
        }

    }
   

    case4(actual,nuevo){
        //console.log("Caso 4")
        //si el valor ingresado es mayor que actual, hijo derecho es nuevo
        if(nuevo.id > actual.root.id){
            this.case1(actual.right_son,nuevo);
        }

        //si el valor ingresado es menor que actual y mayor que hijo izquierdo, hijo derecho de hijo izquierdo es nuevo, rotación doble izq-derecha
        else if(nuevo.id < actual.root.id && nuevo.id > actual.left_son.root.id){
            this.case1(actual.left_son.right_son,nuevo);
            //console.log("rotacion doble izq-der")
            this.rotacionDobleIzqDer(actual);
        }
        //si el valor ingresado es menor que actual y menor que hijo izquierdo, hijo izquierdo de hijo izquierdo es nuevo, rotación simple derecha
        else if(nuevo.id < actual.root.id && nuevo.id < actual.left_son.root.id){
            this.case1(actual.left_son.left_son,nuevo);
            //console.log("rotacion simple der")
            this.rotacionSimpleDer(actual);

        }
    }

    case5(actual,nuevo){
        //console.log("Caso 5")
        //si el valor es menor que actual, hijo izquierdo es nuevo
        if(nuevo.id < actual.root.id){
            this.case1(actual.left_son,nuevo);
        }

        //si el valor es mayor que actual y menor que hijo derecho, hijo izquierdo de hijo derecho es nuevo, rotacion doble derecha - izq
        else if(nuevo.id > actual.root.id && nuevo.id < actual.right_son.root.id){
            //console.log(actual.right_son.left_son);
            this.case1(actual.right_son.left_son,nuevo);
            //console.log("rotacion doble der-izq")
            this.rotacionDobleDerIzq(actual)
        }
        //si el valor es mayor que actual y mayor que hijo derecho, hijo derecho de hijo derecho es nuevo, rotación simple izquierda
        else if(nuevo.id > actual.root.id && nuevo.id > actual.right_son.root.id){
            this.case1(actual.right_son.right_son,nuevo);
            //console.log("rotacion simple izq")
            this.rotacionSimpleIzq(actual);
        }
    }



    rotacionSimpleDer(actual){
        var a=actual.root;
        var b=actual.left_son.root;
        var c=actual.left_son.left_son.root;

        actual.root=b;
        actual.left_son.root=c;
        this.case1(actual.right_son,a);

        actual.left_son.left_son.root=null;

        

    }

    rotacionSimpleIzq(actual){
        var a=actual.root;
        var b=actual.right_son.root;
        var c=actual.right_son.right_son.root;

        actual.root=b;
        this.case1(actual.left_son,a);
        actual.right_son.root=c;

        actual.right_son.right_son.root=null;
    }

    rotacionDobleDerIzq(actual){
        var a=actual.root;
        var b=actual.right_son.root;
        var c=actual.right_son.left_son.root;

    
        actual.root=c;
        this.case1(actual.left_son,a);

        actual.right_son.left_son.root=null;
   
     

    }

    rotacionDobleIzqDer(actual){
        var a=actual.root;
        var b=actual.left_son.root;
        var c=actual.left_son.right_son.root;

        actual.root=c;
        actual.left_son.root=b;
        this.case1(actual.right_son,a);

        actual.left_son.right_son.root=null;

    }


    preorderGraph(actual,nodes){
        if(actual.root!=null){
            
            nodes[1]+="    node"+actual.root.id+"[label=\""+actual.root.name+"\n"+actual.root.id+"\", style=filled, fillcolor=\"#c7f6d4\"];\n";
           
            if(actual.left_son.root!=null){
                nodes[0]+="    node"+actual.root.id+" -> node"+actual.left_son.root.id+";\n";
                
            }

            this.preorderGraph(actual.left_son,nodes);
            
            if(actual.right_son.root!=null){
                nodes[0]+="    node"+actual.root.id+" -> node"+actual.right_son.root.id+";\n";
                
            }
            this.preorderGraph(actual.right_son,nodes);
          
        }
    
    }


    preorder(actual){
        
        if(actual.root != null){
            console.log(actual.root.id);
            this.preorder(actual.left_son);
            this.preorder(actual.right_son);
        }
    }


    createList(lista){
        this.crearLista(this,lista);
    }
       

    crearLista(actual,lista){
        if(actual.root!=null){
            listaMovies.addNewOrdered(actual.root.value);
            this.crearLista(actual.left_son,lista);
            this.crearLista(actual.right_son,lista);
        }

    }
    

    
    graph(){
        var text="digraph Actores{\n";
        text+="    rankdir=TB;\n";
        
        
        let n = ["",""] 
       
        this.preorderGraph(this,n);
        text+=n[0];
        text+=n[1];
        
        text+="}";
        //console.log(text)
       
        d3.select('#avl').graphviz()
            .width(600)
            .height(300)
            .renderDot(text);
    }
}
export default AVL;

