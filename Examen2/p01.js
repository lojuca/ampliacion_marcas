function sumarPares(array) {
    let suma = 0;
    for (let index = 0; index < array.length; index++) {
        if (array[index] % 2 === 0) {
            suma += array[index ];
        }
    }
    return suma;
}

sumarPares([1, 2, 3, 4, 5, 6]); 