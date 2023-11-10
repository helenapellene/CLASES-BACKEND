class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    static especie = "Humano";

    hablar(texto) {
        console.log(`${this.nombre}:${texto}`);
    }

    datos(){
        console.log(`${this.nombre} - ${this.edad}`);
    }
}

//instancias

const lautaro=new Persona("Lautaro",23)

const helena=new Persona("Helena",21)


lautaro.datos()
helena.datos()