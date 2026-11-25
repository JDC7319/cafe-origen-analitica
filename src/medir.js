const analitica = require("/analitica.js")
const {generarVentas} = [];

const muestra = [100,1000,10000,100000]
const resultados = [];

for(const n of muestra){
    const lote = generarVentas(n);
    const c1={ops:0};
    const c2={ops:0};
    const c3={ops:0};
    const c4={ops:0};
    analitica.totalVendidoInstrumentada(lote,c1);
    analitica.ventaMayorInstrumentada(lote,c2);
    analitica.totalPorCiudadInstrumentada(lote,c3);
    analitica.primeraVentaInstrumentada(lote,c4);

    resultados.push({
        tamLote:n,
        totalVendido:c1.ops,
        ventaMayor:c2.ops,
    })
}