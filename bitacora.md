# Bitácora - Café Origen

## MiniReto 1: Modelado y exploración de datos

### Plan de trabajo

### Diccionario de datos

| Propiedad | Tipo de dato | Significado |
|---    |---    |---           |
| `id` | `number` | Identificador único del registro de venta |
| `fecha` | `string` | Fecha en que se realizó la venta |
| `cliente` | `string` | Código que identifica al cliente |
| `producto` | `string` | Nombre del producto vendido |
| `ciudad` | `string` | Ciudad asociada con la venta |
| `cantidad` | `number` | Número de unidades registradas |
| `precio` | `number` | Precio por unidad en pesos colombianos |

### Casos borde detectados
    Ciudades con minuscula y mayuscula
    con la propiedad ciudad y la diferencia entre los datos:
     medellin===Medellin // false

    Esto generaria un reporte incorrecto entendiendo medellin y Medellin como ciudades distintas

    Ventas con cantidad 0

    Esto nos pondria a preguntarnos si debemos considerar este registro como una venta valida, podria representar una operacion cancelada, error de registro o movimiento sin nada vendido.

    Clientes repetidos
    El cliente C01 aparece varias veces, lo que no esta mal en si, significa que tenemos 3 registros asociados al mismo cliente, siendo algo a considerar cuando necesitemos calcular metricas, 


## MiniReto 2: Funciones y Ciclo for 

En este pseudo codigo creamos una funcion total Vendido donde vamos a usar un ciclo for, primero declaramos nuestra variable acumuladora, la inicializamos en 0, for venta of ventas, recorremos cada venta en el array ventas, plural arrays, objetos singular, y como condicion la cantidad tiene que ser mayor que cero para poder realizar la operacion, multiplicamos para saber el valor y lugo lo sumamos al acumulador del total.

FUNCIÓN totalVendido(ventas)

    INICIAR total EN 0

    PARA CADA venta EN ventas
        SI cantidad ES MAYOR QUE 0
            calcular valor de la venta
            sumar ese valor al total
        FIN SI
    FIN PARA

    DEVOLVER total

FIN FUNCIÓN

Resultado 

El total vendido es:  985000

Ahora este codigo nos deberia arrojar las unidades vendidas, aca no necesitamos multiplioar si no solo revisar cuantas unidades se vendieron, misma logica que el anterior

FUNCIÓN unidadesVendidas(ventas)

    INICIAR unidades EN 0

    PARA CADA venta EN ventas
        SI cantidad ES MAYOR QUE 0
            SUMAR cantidad A unidades
        FIN SI
    FIN PARA

    DEVOLVER unidades

FIN FUNCIÓN


Venta Mayor

Aqui revisamos la venta de mayor valor en nuestro array, inicializamos en null en caso tengamos un arreglo vacio entonces el mayor valor sera null, usamos un ciclo for venta of ventas, usamos un condicional if comparando si nuestro max es mayor que 0 y dentro otro if en caso sea null guardarlo como la mayor, si no, lo actualizamos. AL usarse mayor y no mayor que, solo reemplazamos la variable al encontrar una de mayor valor.

FUNCIÓN ventaMayor(ventas)

    INICIAR mayor EN null

    PARA CADA venta EN ventas

        SI cantidad ES MAYOR QUE 0

            SI mayor ES null
                GUARDAR venta COMO mayor

            SI NO, SI valorVenta(venta) > valorVenta(mayor)
                ACTUALIZAR mayor CON venta

            FIN SI

        FIN SI

    FIN PARA

    DEVOLVER mayor

FIN FUNCIÓN


Contador 

FUNCIÓN ticketPromedio(ventas)

    INICIAR contador EN 0

    PARA CADA venta EN ventas
        SI cantidad ES MAYOR QUE 0
            INCREMENTAR contador EN 1
        FIN SI
    FIN PARA

    SI contador ES IGUAL A 0
        DEVOLVER 0
    FIN SI

    DEVOLVER totalVendido(ventas) / contador

FIN FUNCIÓN


### Pruebas realizadas

### Decisiones tomadas