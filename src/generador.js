const ciudades = ["Medellín", "Cali", "Pereira", "Bogotá"];

const productos = [
    { producto: "Origen Huila 500g", precio: 42000 },
    { producto: "Origen Nariño 250g", precio: 26000 },
    { producto: "Origen Sierra 500g", precio: 45000 },
    { producto: "Prensa francesa", precio: 95000 },
    { producto: "Molino manual", precio: 120000 },
];

function azarEntre(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generarVentas(n) {
    const ventas = [];

    const maxCliente = Math.max(1, Math.floor(n / 3));

    for (let i = 1; i <= n; i++) {
        const item = productos[azarEntre(0, productos.length - 1)];
        const ciudad = ciudades[azarEntre(0, ciudades.length - 1)];
        const numCliente = azarEntre(1, maxCliente);

        const dia = String(azarEntre(1, 30)).padStart(2, "0");
        const mes = String(azarEntre(9, 12)).padStart(2, "0");

        ventas.push({
            id: i,
            fecha: `2026-${mes}-${dia}`,
            cliente: `C${String(numCliente).padStart(2, "0")}`,
            producto: item.producto,
            ciudad: ciudad,
            cantidad: azarEntre(1, 5),
            precio: item.precio
        });
    }

    return ventas;
}

function totalVendidoInstrumentada(ventas, contador) {
    let total = 0;

    for (const v of ventas) {
        contador.ops++;
        total += v.cantidad * v.precio;
    }

    return total;
}

function ventaMayorInstrumentada(ventas, contador) {
    if (ventas.length === 0) {
        return null;
    }

    let mayor = ventas[0];

    for (let i = 1; i < ventas.length; i++) {
        contador.ops++;
        contador.ops++;

        const valorActual = ventas[i].cantidad * ventas[i].precio;
        const valorMayor = mayor.cantidad * mayor.precio;

        if (valorActual > valorMayor) {
            mayor = ventas[i];
        }
    }

    return mayor;
}

function totalPorCiudadInstrumentada(ventas, contador) {
    const totales = {};

    for (const venta of ventas) {
        contador.ops++;
        contador.ops++;

        if (!totales[venta.ciudad]) {
            totales[venta.ciudad] = 0;
        }

        totales[venta.ciudad] += venta.cantidad * venta.precio;
    }

    return totales;
}




// function primeraVentaInstrumentada (){

// }



module.exports = {
    azarEntre,
    generarVentas,
    totalVendidoInstrumentada,
    ventaMayorInstrumentada,
    totalPorCiudadInstrumentada
};