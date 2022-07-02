import SimpleList from "../Structures/SimpleList.js";

class Movie{
    constructor(_id,_name,_descripcion,_puntuacion,_precio){
        this.id=_id;
        this.name=_name;
        this.description=_descripcion;
        this.puntuacion=_puntuacion;
        this.precio=_precio;
        this.comments=new SimpleList();

    }
}

export default Movie;