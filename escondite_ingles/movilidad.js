const jugadores = {
    goku: {position:1, moving: false, heart: false},
    naruto: {position:1, moving: false, heart: false},
    luffy: {position:1, moving: false, heart: false},
};

let bolsa_dados = ['negro1','negro2','negro3','rojo'];
let dadosN_usados =[]; //para sumar o restar los movimientos
let movimientos = {};//selección de andar o pararse

//dados
const cara_dados = {
negro1: [1,1,1,1,2,2],
negro2: [1,1,1,1,0,0],
negro3: [1,1,0,0,0,0],
rojo:[1,1,1,1,1,0],
};

function eleccionMov (goku,avanzar_goku){
movimientosElegidos[goku]= avanzar_goku;
if(
    movimientosElegidos.goku &&
    movimientosElegidos.naruto &&
    movimientosElegidos.luffy
)
{
    realizarTurno();
}
};

function sacarDado(){
    let numero = Math.floor(Math.random()*bolsa_dados.length);
    let dado = bolsa_dados[numero];
    bolsa_dados.splice(numero,1); //saca los dados de la bolsa

    if (dado.startsWith("negro")){
        dadosN_usados.push(dado);
    }

    return dado;
    
};

function tirarDados(lista){
    let suma = 0;
    for (let i = 0; i < lista.length; i++){
        let dado = lista[i];
        let caras = caraDados[dado];
        let cara = caras[Math.floor(Math.random()*caras.length)];
        suma = suma + cara;

    }

    return suma;

}

function movimientos(personaje){
    let imagen = document.getElementById(personaje);
    let posicion = jugadores[goku].position;
    let posicionNueva = 500 - (posicion - 1)*50;
    imagen.style.top = nuevaPos + "px";
};

function turno(){
    let personajes = ["goku","naruto","luffy"];

    for (let i = 0; i < personajes.length; i++){
        let personaje = personajes [i];
        let accion = movimientosElegidos[personaje];
        let jugador = jugadores[personaje];

        let dado = sacarDado();

        if (accion === 'detenerse'){
            if (dado === 'rojo'){
                jugador.heart = true;
            }
        }
            
        
        }

}
