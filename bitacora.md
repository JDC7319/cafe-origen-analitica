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


## MiniReto 2: Funciones y Ciclo For / Indicadores básicos de negocio

Primero veremos el pseudo codigo de los algoritmos que despues trabajamos en analitica.js.

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

Aca vamos a utilizar un contador usando el ++, con un condicional para el ciclo venta of ventas y otro para el contador, luego devolvemos el promedio usando la funcion total vendido, totalVendido es el calculo de ventas.cantidad*ventas.producto, luego dividiendose por el contador para calcular el promedio

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



Con esta funcion podemos revisar las ventas por ciudad, usando esos dos como parametros, normalizar seria una funcion que usaria el trim y el toLowerCase esto ayuda a evitar tener una misma ciudad como una distinta

FUNCIÓN ventasPorCiudad(ventas, ciudad)

    INICIAR total EN 0

    NORMALIZAR ciudad buscada

    PARA CADA venta EN ventas

        NORMALIZAR ciudad de la venta

        SI las ciudades coinciden Y cantidad > 0

            SUMAR valorVenta(venta) AL total

        FIN SI

    FIN PARA

    DEVOLVER total

FIN FUNCIÓN





### 1. Plan de algoritmos

**valorVenta(venta)**

- Recibe un objeto que representa una venta.
- Multiplica la cantidad por el precio unitario.
- Devuelve el resultado.

**totalVendido(ventas)**

- Iniciar un acumulador en 0.
- Recorrer el arreglo de ventas.
- Verificar que la cantidad sea mayor que 0.
- Sumar el valor de cada venta válida.
- Devolver el acumulador.

**unidadesVendidas(ventas)**

- Iniciar un acumulador en 0.
- Recorrer las ventas.
- Verificar que la cantidad sea mayor que 0.
- Sumar las unidades vendidas.
- Devolver el total de unidades.

**ventaMayor(ventas)**

- Inicializar la variable `max` en `null`.
- Recorrer las ventas.
- Ignorar registros con cantidad igual a 0.
- Guardar la primera venta válida.
- Comparar cada venta posterior con la mayor encontrada.
- Actualizar `max` cuando se encuentre una venta de mayor valor.
- Devolver el objeto completo o `null` si no hay ventas válidas.

**ticketPromedio(ventas)**

- Inicializar un contador en 0.
- Recorrer las ventas.
- Incrementar el contador por cada venta con cantidad mayor que 0.
- Si el contador es 0, devolver 0 para evitar una división entre cero.
- Dividir el total vendido entre la cantidad de ventas válidas.
- Devolver el promedio.

**ventasPorCiudad(ventas, ciudad)**

- Inicializar un acumulador en 0.
- Normalizar la ciudad solicitada con `trim()` y `toLowerCase()`.
- Recorrer las ventas.
- Normalizar la ciudad de cada registro.
- Comprobar que las ciudades coincidan y que la cantidad sea mayor que 0.
- Acumular el valor de las ventas que cumplan ambas condiciones.
- Devolver el total.

### 2. Trazas manuales

#### Traza 1: totalVendido()

| ID | Valor de venta | Acumulado |
|---|---:|---:|
| 1 | 84000 | 84000 |
| 2 | 26000 | 110000 |
| 3 | 95000 | 205000 |
| 4 | 42000 | 247000 |
| 5 | 135000 | 382000 |
| 6 | 52000 | 434000 |
| 7 | 120000 | 554000 |
| 8 | 0 | 554000 |
| 9 | 90000 | 644000 |
| 10 | 168000 | 812000 |
| 11 | 95000 | 907000 |
| 12 | 78000 | 985000 |

Resultado: **985000 COP**.

#### Traza 2: ventaMayor()

| ID | Valor actual | Mayor encontrado |
|---|---:|---|
| 1 | 84000 | ID 1 |
| 2 | 26000 | ID 1 |
| 3 | 95000 | ID 3 |
| 4 | 42000 | ID 3 |
| 5 | 135000 | ID 5 |
| 6 | 52000 | ID 5 |
| 7 | 120000 | ID 5 |
| 8 | 0 | ID 5 |
| 9 | 90000 | ID 5 |
| 10 | 168000 | ID 10 |
| 11 | 95000 | ID 10 |
| 12 | 78000 | ID 10 |

Resultado: **venta ID 10, con un valor de 168000 COP**.

### 3. Decisiones sobre casos borde

- Las ventas con cantidad igual a 0 no se consideran ventas efectivas.
- Un arreglo vacío devuelve 0 en los indicadores numéricos.
- `ventaMayor([])` devuelve `null`.
- El ticket promedio devuelve 0 si no existen ventas válidas.
- Las ciudades se comparan sin distinguir mayúsculas ni espacios al comienzo o final.
- Si dos ventas tienen el mismo valor máximo, se conserva la primera encontrada.

### 4. Pruebas

Se ejecutó `node src/analitica.js` para verificar los indicadores.

Resultados con la muestra completa:

- Total vendido: 985000 COP.
- Unidades vendidas: 21.
- Venta mayor: ID 10.
- Ticket promedio: 89545.45454545454 COP.
- Ventas en Medellín: 356000 COP.
- Ventas en Bogotá: 276000 COP.

Los resultados coinciden con los cálculos manuales.



