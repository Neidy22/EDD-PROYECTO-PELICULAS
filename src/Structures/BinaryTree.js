import Node from "../Objects/Node.js";
import Actor from "../Objects/Actor.js";
class BinaryTree{
    constructor(){
        this.root=null;
        this.left_son=null;
        this.right_son=null;
        this.level=0
        this.levels=0
        this.nodos=0
    }

    insertN(data){
        var nuevo=new Node(data)
        nuevo.id=data.dni
        nuevo.name=data.name
        if(this.root==null){
            this.root=nuevo
            this.left_son=new BinaryTree();
            this.right_son=new BinaryTree();
            this.level=0
            this.levels++
            this.nodos++
            //console.log("insertado en la raíz")

        }else{
            this.insertH(nuevo,this,0)
        }

    }

    insertH(nuevo,actual,n){
        //si la raíz es nula ingreso el nuevo nodo como raiz
        
        
        if(actual.root==null){
            actual.root=nuevo
            actual.left_son=new BinaryTree()
            actual.right_son=new BinaryTree()
            actual.level=n
            this.nodos++
            //console.log("insertado")
        }
        //comparo si el valor de la llave del nuevo nodo es mayor  que la llave de la raíz 
        //recorro el sub-árbol derecho
        else if(nuevo.id>actual.root.id){
            n++
            if(n>this.levels){
                this.levels++
            }
            //console.log(" a la derecha el nombre de "+nuevo.name +" es mayor que "+actual.root.name)
            return this.insertH(nuevo,actual.right_son,n)

        }
        //comparo si el valor de la llave del nuevo nodo es igual  que la llave de la raíz 
        //no inserto el nodo porque está repetido
        else if(nuevo.id==actual.root.id){
            console.log("nuevo"+nuevo.id+" actual"+actual.root.id)
            console.log("Repetido")
        }
        //comparo si el valor de la llave del nuevo nodo es menor que la llave de la raíz 
        //recorro el sub-árbol izquierdo
        else{
            n++
            if(n>this.levels){
                this.levels++
            }
            //console.log(" a la izquierda el nombre de "+nuevo.name +" es menor que "+actual.root.name)
            return this.insertH(nuevo,actual.left_son,n)
        }
        return 0

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


    showInorder(){
        
        this.Inorder(this,0);
    }

    Inorder(actual,n){
        if(actual.root!=null){
            n++;
            this.Inorder(actual.left_son,n);
            this.createActorCont(actual.root.value,n);
           
            this.Inorder(actual.right_son,n);
        }

    }

    
    showPreorder(){
       
        this.Preorder(this,0);
    }

    Preorder(actual,n){
        if(actual.root!=null){
            n++;
            this.createActorCont(actual.root.value,n);
          
            this.Preorder(actual.left_son,n);
            this.Preorder(actual.right_son,n);
 
        }

    }


    showPostorder(){
    
        this.Postorder(this,0);
    }

    Postorder(actual,n){
        if(actual.root!=null){
            n++;
            
            this.Postorder(actual.left_son,n);
            this.Postorder(actual.right_son,n); 
            this.createActorCont(actual.root.value,n); 
            
        }

    }

    createActorCont(actor,n){
        const general=document.getElementById("general-actors");

        const contenedor=document.createElement("div");
        contenedor.id="actor"+n;
        contenedor.classList="bloque-actor";
  
        const nombre=document.createElement("h1");
        nombre.classList="subtitle";
        nombre.textContent=actor.name;
        
        const dni=document.createElement("h2");
        dni.classList="subtitle2";
        dni.textContent="Dni: "+actor.dni;

        const desc=document.createElement("b");
        desc.textContent="Descripción";
  
        const descripcion=document.createElement("p");
        descripcion.classList="text";

        descripcion.appendChild(desc);
        descripcion.textContent=actor.description;
  
        contenedor.appendChild(nombre);
        contenedor.appendChild(dni);
        contenedor.appendChild(descripcion);

        general.appendChild(contenedor);
  
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
       
        d3.select('#abb').graphviz()
            .width(600)
            .height(300)
            .renderDot(text);

            
         
            
            
        
    }




    
}
export default BinaryTree;

