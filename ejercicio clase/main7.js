let palabro = prompt ('carta más(c) o plantarse(p)');
console.log(palabro);


//numero aleatorio entre 1 y 13 y que la cartas salgan 10 y 11

let numero_aleatorio = Math.floor(Math.random()*13) + 1;

if(numero_aleatorio > 10)
    {
        numero_aleatorio=10;
    }

let numero_aleatorio2 = Math.floor(Math.random()*13) + 1;
console.log('tus cartas son' + numero_aleatorio + ','+ numero_aleatorio2);

if(numero_aleatorio2 > 10)
{
    numero_aleatorio2=10;
}


//si pone p el jugador se planta, si pone c el jugador continúa 
if(palabro =='p')
{
    console.log(' El jugador se planta');
}
else if(palabro=='c')
{
    console.log('el jugador continúa');
}
else
{
    console.log('por favor, introduce : Carta más (c) o se planta (p)');
}


