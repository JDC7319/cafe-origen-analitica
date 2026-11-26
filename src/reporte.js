const ventas = require ("./datos")

const {
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor,
    ventasDelDia,
    valorVenta
} = require("./analitica");


function formatoCOP(valor) {
    return `$${valor.toLocaleString("es-CO", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
}

console.log("========================================");
console.log("       CAFÉ ORIGEN — ANALÍTICA v0.1");
console.log("========================================");

console.log("\n--- RESUMEN GENERAL ---");

console.log("Total vendido:", formatoCOP(totalVendido(ventas)));

console.log("Unidades vendidas:", unidadesVendidas(ventas));

console.log("Ticket promedio:", formatoCOP(ticketPromedio(ventas)));

const mayor = ventaMayor(ventas);

if (mayor!==null) {
    console.log("Venta mayor ID:", mayor.id);
    console.log("Producto:", mayor.producto);
    console.log("Valor:", formatoCOP(valorVenta(mayor)));
} else {
    console.log("No hay ventas válidas.");
}

console.log("\n--- VENTAS POR CIUDAD ---");

const ciudades = Object.entries(totalPorCiudad(ventas))
    .map(([ciudad, total]) => ({
        Ciudad: ciudad,
        Total: formatoCOP(total)
    }));

console.table(ciudades);

console.log("\n--- UNIDADES POR PRODUCTO ---");

const productos = Object.entries(unidadesPorProducto(ventas))
    .map(([producto, unidades]) => ({
        Producto: producto,
        Unidades: unidades
    }));

console.table(productos);

console.log("\n--- TOP 3 PRODUCTOS POR INGRESOS ---");

const top3 = topProductosPorValor(ventas, 3)
    .map(({ producto, valor }) => ({
        Producto: producto,
        Ingresos: formatoCOP(valor)
    }));

console.table(top3);

function mostrarResumenDia(fecha) {
    const ventasDia = ventasDelDia(ventas, fecha);

    console.log(`\n--- RESUMEN DEL DÍA ${fecha} ---`);

    console.log("Registros:", ventasDia.length);
    console.log("Total vendido:", formatoCOP(totalVendido(ventasDia)));
    console.log("Unidades vendidas:", unidadesVendidas(ventasDia));
    console.log("Ticket promedio:", formatoCOP(ticketPromedio(ventasDia)));
}

mostrarResumenDia("2026-09-01");
mostrarResumenDia("2026-09-10");

