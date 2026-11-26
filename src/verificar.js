const ventas = require("./datos");

const {
    totalVendido,
    totalVendidoM,
    unidadesVendidas,
    unidadesVendidasM,
    ventasPorCiudad,
    ventasPorCiudadM,
    topProductosPorValor,
    totalPorCiudad,
    unidadesPorProducto
} = require("./analitica");

function verificar(nombre, resultadoCiclo, resultadoMetodo) {
    const iguales = resultadoCiclo === resultadoMetodo;

    console.log(`${nombre}: ${iguales ? "OK" : "DIFERENTE"}`);
}

// 1. Con los datos reales
verificar(
    "Total Vendido",
    totalVendido(ventas),
    totalVendidoM(ventas)
);

verificar(
    "Unidades Vendidas",
    unidadesVendidas(ventas),
    unidadesVendidasM(ventas)
);

// 2. Ventas por ciudad (Medellín)
verificar(
    "Ventas por Ciudad (Medellín)",
    ventasPorCiudad(ventas, "Medellín"),
    ventasPorCiudadM(ventas, "Medellín")
);

// 3. Las mismas tres comparaciones con un arreglo vacío
console.log("\n--- Arreglo vacío ---");

const vacio = [];

verificar(
    "Total Vendido (vacío)",
    totalVendido(vacio),
    totalVendidoM(vacio)
);

verificar(
    "Unidades Vendidas (vacío)",
    unidadesVendidas(vacio),
    unidadesVendidasM(vacio)
);

verificar(
    "Ventas por Ciudad Medellín (vacío)",
    ventasPorCiudad(vacio, "Medellín"),
    ventasPorCiudadM(vacio, "Medellín")
);

console.log("\n--- Casos borde ---");

console.log(
    "Ranking vacío:",
    topProductosPorValor([], 3)
);

console.log(
    "Ranking con k = 0:",
    topProductosPorValor(ventas, 0)
);

console.log(
    "Ranking con k = 3:",
    topProductosPorValor(ventas, 3)
);

console.log(
    "Agrupación ciudades vacía:",
    totalPorCiudad([])
);

console.log(
    "Agrupación productos vacía:",
    unidadesPorProducto([])
);

console.log(
    "Una sola venta:",
    unidadesPorProducto([ventas[0]])
);

console.log("\n--- Inmutabilidad ---");

const ordenOriginal = ventas.map(venta => venta.id);

topProductosPorValor(ventas, 3);

const mismoOrden = ventas.every((venta, indice) => {
    return venta.id === ordenOriginal[indice];
});

console.log(
    "Orden original conservado:",
    mismoOrden ? "OK" : "DIFERENTE"
);