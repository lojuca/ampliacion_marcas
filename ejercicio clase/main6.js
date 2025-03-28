var nNum = 30;
console.log("el valor del nNum es" + nNum);

nNum = nNum +1;
console.log("el valor del nNum es" + nNum);

nNum = nNum + 5;
console.log("el valor del nNum es" + nNum);

nNum++; //es lo mismo exactamente nNum = nNum + 1
console.log("el valor del nNum es" + nNum);

nNum = nNum -1;
console.log("el valor del nNum es" + nNum);

nNum--; // es lo mismo que nNum = nNum -1
console.log("el valor del nNum es" + nNum);

//objeto o registro 

let objetoAlumno = {
    nombre: 'bego',
    cod_alumno: 4528

};

console.log(objetoAlumno);
console.log('el nombre del alumno es'+ objetoAlumno.nombre);
console.log('el código del alumno es' + objetoAlumno.cod_alumno);

//objeto aula

let objetoAula={
    numeroMesas :32,
    nombre : 'Asir1' ,
    numero_perchas : 15 
};

// sumar en una variable las mesas mas las perchas 

var mo = objetoAula.numero_mesas + objetoAula.numero_mesas;
console.log('no es '+ mo)



