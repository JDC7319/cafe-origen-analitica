// const catalogo = [
//  {},
//  {},
//  {}
// ]

// const ciudades = ["Medellin","Cali","Pereira","Bogota"]


// function azarEntre (min,max) {
//     return Math.floor(Math.random()*(max-min+1)) + min;
// }


// function generarVenta(n){
//     const ventas = []
//     const maxCliente=Math.max(1,Math.floor(n/3));
//     for(i=1;1<=n;i++) {
//         const item = CATALOGO[azarEntre(0, CATALOGO.length - 1)];
//         const ciudad = CIUDADES [azarEntre(0, CIUDADES.length - 1)];
//         const numClientes = azarEntre (1, maxCliente);
//         const dia=String(azarEnter(1,30)).padStart(2,"0");
//         const mes=String(azarEnter(9,12)).padStart(2,"0");

//         ventas.push({
//             id:i,
//             fecha:  `2026-${mes}-${dia}`  ``  
//             cliente:`C${String(numClientes).padStart(2,"0")()}` 
//             producto: item.producto,
//             ciudad: ciudad,
//             cantidad: azarEntre(1,5)
//             precio: item.precio

//         });
//     }
//     return ventas;
// }