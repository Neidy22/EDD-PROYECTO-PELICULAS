import Node from "../Objects/Node.js";


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
        nuevo.id=data.quantity
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
        console.log(doteCode)
        d3.select('#simple-list').graphviz()
            .width(600)
            .height(300)
            .renderDot(doteCode);


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