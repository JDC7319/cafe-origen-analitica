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



### Pruebas realizadas

### Decisiones tomadas