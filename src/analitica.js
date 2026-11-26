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

// Responde a Cuantas unidades vendimos de cada producto?
function unidadesPorProducto (ventas){
    return ventas.reduce((acumulador,venta) => {
        if (venta.cantidad>0){
            const producto = venta.producto;
            if(!(producto in acumulador)){
                acumulador [producto] = 0;
            }
            acumulador[producto] += venta.cantidad;
        }


        return acumulador;
    }, {})
}


function valorPorProducto(ventas){
    return ventas.reduce((acumulador,venta) => {
        if(venta.cantidad > 0) {
            const producto = venta.producto;
            if(!(producto in acumulador)) {
                acumulador[producto] = 0;
            }
            acumulador[producto] += valorVenta(venta);
            
        }

        return acumulador
    },{})
}


// Responde a Que productos generaron mas dinero?
function topProductosPorValor(ventas, k) {
    const totales = valorPorProducto(ventas)

    return Object.entries(totales)
        .map(([producto,valor]) => ({producto,valor}))
        .sort((a,b) => b.valor - a.valor)
        .slice(0,k)
    
}

function ventasDelDia(ventas, fecha) {
    return ventas.filter(venta => {
        return venta.fecha===fecha;
    });
}





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
    totalPorCiudad,
    unidadesPorProducto,
    valorPorProducto,
    topProductosPorValor,
    ventasDelDia
};

