
const ventas = require("./datos");

function valorVenta(venta) {
    return venta.cantidad * venta.precio;
}


function totalVendido(ventas) {
    let total = 0;

    for (const venta of ventas) {
        if (total>0) {
            total += total *venta
        }
    }

    return total;
}