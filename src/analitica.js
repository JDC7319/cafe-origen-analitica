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

console.log("Medellín:", ventasPorCiudad(ventas, "Medellín"));

console.log("medellín:", ventasPorCiudad(ventas, "medellín"));

console.log("Con espacios:", ventasPorCiudad(ventas, "  MEDELLÍN  "));

console.log("Bogotá:", ventasPorCiudad(ventas, "Bogotá"));

console.log("Ciudad inexistente:", ventasPorCiudad(ventas, "Cartagena"));

console.log("Arreglo vacío:", ventasPorCiudad([], "Medellín"));


console.log("Ticket promedio:", ticketPromedio(ventas));

console.log("Ticket de una venta:", ticketPromedio([ventas[0]]));

console.log("Ticket sin ventas:", ticketPromedio([]));

console.log("Ticket con cantidad cero:", ticketPromedio([ventas[7]]));


console.log("El total vendido es: ", totalVendido(ventas));
console.log("Unidades Vendidas: ", unidadesVendidas(ventas))
console.log("Venta Mayor: ", ventaMayor(ventas))

console.log("Una venta:", ventaMayor([ventas[0]]));

console.log("Sin ventas:", ventaMayor([]));