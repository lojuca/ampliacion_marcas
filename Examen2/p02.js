function ArrayInvertido(mi_array) {
    let array_invertido = [];
    for (let i = mi_array.length - 1; i >=0; i--) {
        array_invertido.push(mi_array[i]);
    }
    return array_invertido;
}

let ajemplo = array_invertido(['a', 'b', 'c', 'd', 'e']);