const formatearDinero = (valor) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style:'currency',
        currency: 'USD'
    });
    return formatter.format(valor);
}

const calcularTotal = (cantidad, plazo) => {
    let total;

    // mientras mayor es la cantidad , menor es el interés
    if( cantidad < 5000){
       total = cantidad * 1.1
    }else if ( cantidad >= 5000 && cantidad < 10000) {
        total = cantidad * 1.08
    }else if ( cantidad >= 10000 && cantidad < 15000){
        total = cantidad * 1.05
    }else {
        total = cantidad * 1.03
    }

    // plazo : más plazo: mayor interes
    if( plazo === 6){
        total *= 1.02
    }else if ( plazo === 12){
        total *= 1.05
    }else {
        total *= 1.11
    }

    return total
   
}

export {
    formatearDinero,
    calcularTotal
}