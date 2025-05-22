// Variables del juego
let jugadores = {
    goku: { posicion: 0, corazon: false, accion: null },
    naruto: { posicion: 0, corazon: false, accion: null },
    luffy: { posicion: 0, corazon: false, accion: null }
};

// Bolsa de dados
let bolsa = ['negro1', 'negro2', 'negro3', 'rojo'];
let dadosNegrosAcumulados = [];

// Definición de los dados según el documento
const dados = {
    negro1: [1, 1, 1, 1, 2, 2], // 4 unos, 2 doses
    negro2: [1, 1, 1, 1, 0, 0], // 4 unos, 2 ceros
    negro3: [1, 1, 0, 0, 0, 0], // 2 unos, 4 ceros
    rojo: [1, 1, 1, 1, 1, 0]    // 5 unos, 1 cero
};

let turnoActual = 0;
let accionesRecibidas = 0;
let juegoTerminado = false;

// Función que se llama cuando un jugador elige una acción
function movimientosElegidos(jugador, accion) {
    if (juegoTerminado) return;
    
    // Evitar que el mismo jugador elija dos veces
    if (jugadores[jugador].accion !== null) return;
    
    jugadores[jugador].accion = accion;
    accionesRecibidas++;
    
    // Deshabilitar los botones del jugador que ya eligió
    document.getElementById(`avanzar_${jugador}`).disabled = true;
    document.getElementById(`detenerse_${jugador}`).disabled = true;
    
    console.log(`${jugador} eligió: ${accion}`);
    
    // Cuando todos los jugadores han elegido, procesar el turno
    if (accionesRecibidas === 3) {
        setTimeout(procesarTurno, 1000);
    }
}

// Función para tirar un dado
function tirarDado(tipoDado) {
    const caras = dados[tipoDado];
    return caras[Math.floor(Math.random() * 6)];
}

// Función para sacar un dado de la bolsa
function sacarDadoDeBolsa() {
    if (bolsa.length === 0) {
        // Reponer la bolsa si está vacía
        bolsa = ['negro1', 'negro2', 'negro3', 'rojo'];
        dadosNegrosAcumulados = [];
        console.log("Bolsa repuesta");
    }
    
    const indice = Math.floor(Math.random() * bolsa.length);
    const dadoSacado = bolsa[indice];
    bolsa.splice(indice, 1);
    
    return dadoSacado;
}

// Función para mover un jugador visualmente
function moverJugador(jugador, nuevaPosicion) {
    const imagen = document.getElementById(jugador);
    const cells = document.querySelectorAll('.cell');
    
    // Asegurarse de que la posición esté en los límites
    nuevaPosicion = Math.max(0, Math.min(nuevaPosicion, 10));
    
    if (nuevaPosicion === 0) {
        // Posición inicial (fuera de las casillas)
        imagen.style.position = 'absolute';
        imagen.style.bottom = '-30px';
        imagen.style.left = '0px';
    } else if (nuevaPosicion >= 10) {
        // Posición final (casilla superior)
        const cellSuperior = cells[0];
        const rect = cellSuperior.getBoundingClientRect();
        imagen.style.position = 'absolute';
        imagen.style.bottom = '520px';
        imagen.style.left = '15px';
    } else {
        // Posiciones intermedias
        const cell = cells[10 - nuevaPosicion];
        imagen.style.position = 'absolute';
        imagen.style.bottom = `${(nuevaPosicion * 55) + 20}px`;
        imagen.style.left = '15px';
    }
}

// Función para actualizar el corazón del jugador
function actualizarCorazon(jugador, tieneCorazon) {
    const imagen = document.getElementById(jugador);
    if (tieneCorazon) {
        imagen.style.border = '3px solid red';
        imagen.style.boxShadow = '0 0 10px red';
    } else {
        imagen.style.border = 'none';
        imagen.style.boxShadow = 'none';
    }
}

// Función principal para procesar un turno
function procesarTurno() {
    console.log('\n--- PROCESANDO TURNO ---');
    
    const dadoSacado = sacarDadoDeBolsa();
    console.log(`Dado sacado: ${dadoSacado}`);
    
    // Si es un dado negro, añadirlo a los acumulados
    if (dadoSacado.includes('negro')) {
        dadosNegrosAcumulados.push(dadoSacado);
    }
    
    // Procesar cada jugador
    Object.keys(jugadores).forEach(nombreJugador => {
        const jugador = jugadores[nombreJugador];
        const accion = jugador.accion;
        
        console.log(`Procesando ${nombreJugador}: ${accion}, posición: ${jugador.posicion}, corazón: ${jugador.corazon}`);
        
        if (accion === 'detenerse') {
            if (dadoSacado === 'rojo') {
                // Si está parado y sale dado rojo, gana corazón
                if (!jugador.corazon) {
                    jugador.corazon = true;
                    actualizarCorazon(nombreJugador, true);
                    console.log(`${nombreJugador} gana un corazón`);
                }
            }
            // Si está parado y sale dado negro, no pasa nada
        } else if (accion === 'avanzar') {
            if (dadoSacado.includes('negro')) {
                // Tirar todos los dados negros acumulados
                let suma = 0;
                dadosNegrosAcumulados.forEach(dadoNegro => {
                    const resultado = tirarDado(dadoNegro);
                    suma += resultado;
                    console.log(`${dadoNegro}: ${resultado}`);
                });
                
                jugador.posicion += suma;
                console.log(`${nombreJugador} avanza ${suma} posiciones`);
                moverJugador(nombreJugador, jugador.posicion);
                
            } else if (dadoSacado === 'rojo') {
                if (jugador.corazon) {
                    // Pierde el corazón pero no pasa nada más
                    jugador.corazon = false;
                    actualizarCorazon(nombreJugador, false);
                    console.log(`${nombreJugador} pierde su corazón`);
                } else {
                    // Tirar dados negros + rojo y restar
                    let suma = 0;
                    dadosNegrosAcumulados.forEach(dadoNegro => {
                        const resultado = tirarDado(dadoNegro);
                        suma += resultado;
                        console.log(`${dadoNegro}: ${resultado}`);
                    });
                    
                    const resultadoRojo = tirarDado('rojo');
                    suma += resultadoRojo;
                    console.log(`rojo: ${resultadoRojo}`);
                    
                    jugador.posicion -= suma;
                    jugador.posicion = Math.max(0, jugador.posicion); // No puede bajar de 0
                    console.log(`${nombreJugador} retrocede ${suma} posiciones`);
                    moverJugador(nombreJugador, jugador.posicion);
                }
            }
        }
    });
    
    // Verificar si hay ganadores
    const ganadores = Object.keys(jugadores).filter(nombre => jugadores[nombre].posicion >= 10);
    
    if (ganadores.length > 0) {
        console.log('\n¡JUEGO TERMINADO!');
        console.log('Ganadores:', ganadores);
        juegoTerminado = true;
        
        // Mostrar mensaje de victoria
        setTimeout(() => {
            alert(`¡${ganadores.join(', ')} ${ganadores.length > 1 ? 'han' : 'ha'} ganado!`);
        }, 1000);
        
        return;
    }
    
    // Verificar si se debe reponer la bolsa
    if (dadosNegrosAcumulados.length === 3 || dadoSacado === 'rojo') {
        bolsa = ['negro1', 'negro2', 'negro3', 'rojo'];
        dadosNegrosAcumulados = [];
        console.log('Bolsa repuesta');
    }
    
    // Preparar siguiente turno
    prepararSiguienteTurno();
}

// Función para preparar el siguiente turno
function prepararSiguienteTurno() {
    // Resetear acciones y habilitar botones
    Object.keys(jugadores).forEach(nombre => {
        jugadores[nombre].accion = null;
        document.getElementById(`avanzar_${nombre}`).disabled = false;
        document.getElementById(`detenerse_${nombre}`).disabled = false;
    });
    
    accionesRecibidas = 0;
    turnoActual++;
    
    console.log(`\n--- TURNO ${turnoActual + 1} ---`);
    console.log('Estado actual:');
    Object.keys(jugadores).forEach(nombre => {
        console.log(`${nombre}: posición ${jugadores[nombre].posicion}, corazón: ${jugadores[nombre].corazon}`);
    });
}

// Función para inicializar el juego
function inicializarJuego() {
    console.log('¡Comenzando El Escondite Inglés Regular!');
    console.log('--- TURNO 1 ---');
    
    // Posicionar jugadores en la posición inicial
    Object.keys(jugadores).forEach(nombre => {
        moverJugador(nombre, 0);
        actualizarCorazon(nombre, false);
    });
}

// Función para reiniciar el juego
function reiniciarJuego() {
    // Resetear todas las variables
    jugadores = {
        goku: { posicion: 0, corazon: false, accion: null },
        naruto: { posicion: 0, corazon: false, accion: null },
        luffy: { posicion: 0, corazon: false, accion: null }
    };
    
    bolsa = ['negro1', 'negro2', 'negro3', 'rojo'];
    dadosNegrosAcumulados = [];
    turnoActual = 0;
    accionesRecibidas = 0;
    juegoTerminado = false;
    
    inicializarJuego();
}

// Inicializar el juego cuando se carga la página
window.addEventListener('load', inicializarJuego);

// Añadir botón de reinicio (opcional)
document.addEventListener('DOMContentLoaded', function() {
    // Crear botón de reinicio
    const botonReinicio = document.createElement('button');
    botonReinicio.textContent = 'Reiniciar Juego';
    botonReinicio.onclick = reiniciarJuego;
    botonReinicio.style.position = 'fixed';
    botonReinicio.style.top = '10px';
    botonReinicio.style.right = '10px';
    botonReinicio.style.zIndex = '1000';
    document.body.appendChild(botonReinicio);
});