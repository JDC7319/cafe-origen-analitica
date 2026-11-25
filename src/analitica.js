const ventas = require("./datos");

function valorVenta(venta) {
    return venta.cantidad * venta.precio;
}

function totalVendido (ventas){
    let total = 0;

    for  (const venta of ventas) {
        if (venta.cantidad > 0){
            total += valorVenta(venta)
        }
    }

    return total;
}

function unidadesVendidas (ventas) {
    let unidades = 0 ;

    for(const venta of ventas){
        if (venta.cantidad >0) {
            unidades +=venta.cantidad
        } 
    }

    return unidades;
}



function ventaMayor (ventas){
    let max = null;

    for (const venta of ventas ) {
        if(venta.cantidad > 0){
            if(max===null){
                max = venta;
            } else if (valorVenta(venta) > valorVenta(max)) {
                max = venta;
            }
            
        }
    }

    return max ;


}

function ticketPromedio (ventas) {
    let contador = 0

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            contador ++;
        }
    }
    if (contador === 0){
        return 0;
    }

    return totalVendido(ventas) / contador
}

function normC() {
    return String().trim().toLowerCase();
}


function ventasPorCiudad(ventas, ciudad) {
    let total = 0;

    const ciudadBuscada = ciudad.trim().toLowerCase();

    for (const venta of ventas) {
        const ciudadActual = venta.ciudad.trim().toLowerCase();

        if (ciudadActual === ciudadBuscada && venta.cantidad > 0) {
            total += valorVenta(venta);
        }
    }

    return total;
}

function totalVendidoM(ventas) {
    return ventas
        .filter(venta => venta.cantidad > 0)
        .map(venta => valorVenta(venta))
        .reduce((acumulador, valor) => {
            return acumulador + valor;
        }, 0);
}

function unidadesVendidasM(ventas) {
    return ventas
        .filter(venta => venta.cantidad > 0  )
        .map(venta =>  venta.cantidad)
        .reduce((acc, cantidad) =>  acc + cantidad, 0);
}


function ventasPorCiudadM(ventas, ciudad) {
    const ciudadBuscada = ciudad.trim().toLowerCase();

    return ventas
        .filter(venta => {
            const ciudadActual = venta.ciudad.trim().toLowerCase();;

            return ciudadActual===ciudadBuscada&&venta.cantidad > 0;
        })
        .map(venta => valorVenta(venta))
        .reduce((acc, valor) => acc + valor, 0);
}


function totalPorCiudad(ventas) {
    return ventas.reduce((acumulador, venta) => {
        if (venta.cantidad > 0) {
            const ciudad = venta.ciudad.trim().toLowerCase();

            if (acumulador[ciudad] === undefined) {
                acumulador[ciudad] = 0;
            }

            acumulador[ciudad] += valorVenta(venta);
        }

        return acumulador;
    }, {});
}
function unidadesPorProducto (ventas){
    
}
// console.log(totalPorCiudad(ventas));
// console.log(totalPorCiudad([]));

// console.log(
//     "Medellín con ciclo:",
//     ventasPorCiudad(ventas, "Medellín")
// );

// console.log(
//     "Medellín con métodos:",
//     ventasPorCiudadM(ventas, "Medellín")
// );

// console.log(
//     "¿Son iguales?",
//     ventasPorCiudad(ventas, "Medellín") ===
//     ventasPorCiudadM(ventas, "Medellín")
// );

// console.log("Con ciclo:", unidadesVendidas(ventas));
// console.log("Con métodos:", unidadesVendidasM(ventas));

// console.log(
//     "¿Son iguales?",
//     unidadesVendidas(ventas) === unidadesVendidasM(ventas)
// );

// console.log("Con ciclo:", totalVendido(ventas));
// console.log("Con métodos:", totalVendidoM(ventas));
// console.log(
//     "¿Son iguales?",
//     totalVendido(ventas) === totalVendidoM(ventas)
// );



// for (const [nombre, datos] of pruebas) {
//     console.log(`\n${nombre}`);

//     console.log("Total:", totalVendido(datos));
//     console.log("Unidades:", unidadesVendidas(datos));
//     console.log("Mayor:", ventaMayor(datos));
//     console.log("Ticket:", ticketPromedio(datos));
//     console.log("Medellín:", ventasPorCiudad(datos, "Medellín"));
// }


module.exports = {
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    ventasPorCiudad,
    totalVendidoM,
    unidadesVendidasM,
    ventasPorCiudadM,
    totalPorCiudad
};




