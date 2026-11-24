
const ventas = require("./datos");

function valorVenta(venta) {
    return venta.cantidad * venta.precio;
}


// Acumulador
function totalVendido (ventas){
    let total = 0;

    for  (const venta of ventas) {
        if (venta.cantidad > 0){
            total += valorVenta(venta)
        }
    }

    return total;
}

// Unidades Vendidas
function unidadesVendidas (ventas) {
    let unidades = 0 ;

    for(const venta of ventas){
        if (venta.cantidad >0) {
            unidades +=venta.cantidad
        } 
    }

    return unidades;
}



// La venta de mayor precio
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

// Ticket Promedio usando un contador

function ticketPromedio (ventas){
    let i = 0;

    for (const venta of ventas){
        if(venta.cantidad > 0){
            i++;
        }
        
        return i;
    }
    return i;

    

    return totalVendido / i

    
}


console.log("El ticket promedio es: ", ticketPromedio(ventas))




// console.log("El total vendido es: ", totalVendido(ventas));
// console.log("Unidades Vendidas: ", unidadesVendidas(ventas))
// console.log("Venta Mayor: ", ventaMayor(ventas))

// console.log("Una venta:", ventaMayor([ventas[0]]));

// console.log("Sin ventas:", ventaMayor([]));


