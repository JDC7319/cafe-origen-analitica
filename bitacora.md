# Bitácora — Café Origen Analítica

**Proyecto:** `cafe-origen-analitica`  
**Objetivo:** desarrollar, probar y documentar un motor de análisis de ventas con JavaScript y Node.js.  
**Criterio de validez:** una venta es efectiva cuando `cantidad > 0`. La muestra original se conserva sin modificar.

---

## MiniReto 1 — Modelado y exploración

### Plan de trabajo

1. Crear el repositorio y los archivos `src/datos.js`, `src/analitica.js`, `src/explorar.js`, `README.md` y `bitacora.md`.
2. Representar los 12 registros como un arreglo de objetos, respetando los valores originales.
3. Exportar el arreglo desde `datos.js` con `module.exports` e importarlo en `explorar.js` con `require()`.
4. Explorar `length`, el primer y último registro, la propiedad `producto` del índice 4 y los datos completos con `console.table()`.
5. Registrar el diccionario y las decisiones sobre casos borde.

### Diccionario de datos

| Propiedad | Tipo JavaScript | Significado |
|---|---|---|
| `id` | `number` | Identificador del registro de venta. |
| `fecha` | `string` | Fecha de la venta en formato `AAAA-MM-DD`. |
| `cliente` | `string` | Identificador del cliente, por ejemplo `C01`. |
| `producto` | `string` | Nombre y presentación del artículo. |
| `ciudad` | `string` | Ciudad asociada a la venta. |
| `cantidad` | `number` | Unidades registradas en esa venta. |
| `precio` | `number` | Precio **unitario** en pesos colombianos (COP). |

### Casos borde detectados y decisiones

| Caso | Observación | Riesgo | Decisión |
|---|---|---|---|
| Ciudades inconsistentes | Existen `"Medellín"` y `"medellín"`; también podrían llegar cadenas con espacios sobrantes. | Contar una misma ciudad como dos grupos distintos. | Conservar `datos.js` intacto y comparar o agrupar con `trim().toLowerCase()`. |
| Cantidad cero | El registro ID 8 tiene `cantidad: 0`. | Contarlo como venta efectiva distorsiona indicadores como el ticket promedio. | Conservarlo en el historial y excluirlo de indicadores de ventas efectivas (`cantidad > 0`). |
| Clientes repetidos | `C01` aparece en los registros ID 1, 4 y 11. | Confundir el número de registros con el de clientes únicos. | Permitir múltiples compras por cliente; cuando se pidan clientes únicos, contar identificadores distintos. |

**Nota:** un cliente repetido no constituye por sí solo un error. Es un caso a considerar al diseñar métricas.

### Pruebas de exploración

- `ventas.length`: **12**.
- `ventas[0]`: primer registro, ID **1**.
- `ventas[ventas.length - 1]`: último registro, ID **12**.
- `ventas[4].producto`: **`Origen Sierra 500 g`** (se interpreta posición 4 como índice 4 de JavaScript).
- `console.table(ventas)`: muestra la tabla con los 12 registros.
- Comando de ejecución: `node src/explorar.js`.

---

## MiniReto 2 — Indicadores básicos con ciclos

### Reglas de negocio y patrones

- **Acumulador:** empieza en `0` y suma un importe o cantidad en cada iteración válida.
- **Contador:** empieza en `0` y aumenta en `1` por cada registro que cumple una condición.
- **Máximo:** empieza en `null` y conserva el registro válido de mayor valor encontrado.
- Las funciones reciben argumentos y devuelven resultados; no dependen del arreglo importado globalmente.
- En este reto se usan `for...of` y condicionales; no `map`, `filter` ni `reduce`.

### Planes en pseudocódigo

**1. `valorVenta(venta)` — valor de un registro**

```text
FUNCIÓN valorVenta(venta)
    DEVOLVER venta.cantidad * venta.precio
FIN FUNCIÓN
```

**2. `totalVendido(ventas)` — acumulador monetario**

```text
FUNCIÓN totalVendido(ventas)
    total = 0
    PARA CADA venta EN ventas
        SI venta.cantidad > 0
            total = total + valorVenta(venta)
        FIN SI
    FIN PARA
    DEVOLVER total
FIN FUNCIÓN
```


**3. `unidadesVendidas(ventas)` — acumulador de unidades**
```text
FUNCIÓN unidadesVendidas(ventas)
    unidades = 0
    PARA CADA venta EN ventas
        SI venta.cantidad > 0
            unidades = unidades + venta.cantidad
        FIN SI
    FIN PARA
    DEVOLVER unidades
FIN FUNCIÓN
```

**4. `ventaMayor(ventas)` — patrón máximo**

```text
FUNCIÓN ventaMayor(ventas)
    max = null
    PARA CADA venta EN ventas
        SI venta.cantidad > 0
            SI max ES null
                max = venta
            SI NO, SI valorVenta(venta) > valorVenta(max)
                max = venta
            FIN SI
        FIN SI
    FIN PARA
    DEVOLVER max
FIN FUNCIÓN
```

**5. `ticketPromedio(ventas)` — contador y acumulador**

```text
FUNCIÓN ticketPromedio(ventas)
    contador = 0
    PARA CADA venta EN ventas
        SI venta.cantidad > 0
            contador = contador + 1
        FIN SI
    FIN PARA
    SI contador ES 0
        DEVOLVER 0
    FIN SI
    DEVOLVER totalVendido(ventas) / contador
FIN FUNCIÓN
```

**6. `ventasPorCiudad(ventas, ciudad)` — filtro manual y acumulador**

```text
FUNCIÓN ventasPorCiudad(ventas, ciudad)
    total = 0
    ciudadBuscada = trim(toLowerCase(ciudad))
    PARA CADA venta EN ventas
        ciudadActual = trim(toLowerCase(venta.ciudad))
        SI ciudadActual ES ciudadBuscada Y venta.cantidad > 0
            total = total + valorVenta(venta)
        FIN SI
    FIN PARA
    DEVOLVER total
FIN FUNCIÓN
```

### Trazas manuales

**Traza A — `totalVendido(ventas)`**

| ID | Valor de venta (COP) | Total acumulado (COP) |
|---:|---:|---:|
| 1 | 84.000 | 84.000 |
| 2 | 26.000 | 110.000 |
| 3 | 95.000 | 205.000 |
| 4 | 42.000 | 247.000 |
| 5 | 135.000 | 382.000 |
| 6 | 52.000 | 434.000 |
| 7 | 120.000 | 554.000 |
| 8 | 0 | 554.000 |
| 9 | 90.000 | 644.000 |
| 10 | 168.000 | 812.000 |
| 11 | 95.000 | 907.000 |
| 12 | 78.000 | **985.000** |

**Traza B — `ventaMayor(ventas)`**

| ID | Valor actual (COP) | ID del máximo tras comparar |
|---:|---:|---:|
| 1 | 84.000 | 1 |
| 2 | 26.000 | 1 |
| 3 | 95.000 | 3 |
| 4 | 42.000 | 3 |
| 5 | 135.000 | 5 |
| 6 | 52.000 | 5 |
| 7 | 120.000 | 5 |
| 8 | 0 (no válida) | 5 |
| 9 | 90.000 | 5 |
| 10 | 168.000 | **10** |
| 11 | 95.000 | 10 |
| 12 | 78.000 | 10 |

Resultado de la traza: se devuelve **el registro completo ID 10**, no solamente `168000`.

### Resultados observados

| Indicador / caso | Resultado |
|---|---|
| `totalVendido(ventas)` | `985000` |
| `unidadesVendidas(ventas)` | `21` |
| `ventaMayor(ventas)` | Registro ID `10` |
| `ticketPromedio(ventas)` | `89545.45454545454` |
| `ventasPorCiudad(ventas, "Medellín")` | `356000` |
| `ventasPorCiudad(ventas, "Bogotá")` | `276000` |
| `ventasPorCiudad(ventas, "  MEDELLÍN  ")` | `356000` |
| `ventasPorCiudad(ventas, "Cartagena")` | `0` |
| `ventaMayor([ventas[0]])` | Registro ID `1` |
| `ventaMayor([])` | `null` |
| `ticketPromedio([ventas[0]])` | `84000` |
| `ticketPromedio([])` | `0` |
| `ticketPromedio([ventas[7]])` | `0` |
| `ventasPorCiudad([], "Medellín")` | `0` |

### Decisiones sobre casos borde

- Sin ventas válidas, los totales y el ticket promedio devuelven `0` para evitar divisiones entre cero y `NaN`.
- `ventaMayor([])` devuelve `null` porque no existe un registro máximo.
- Los registros con `cantidad <= 0` no se consideran efectivos con los datos y reglas de este proyecto.
- Si hay empate en el valor máximo, `ventaMayor` conserva la primera venta encontrada (`>` en lugar de `>=`).
- Las ciudades se normalizan solo para la comparación, no para alterar los registros originales.

**Prueba de cobertura pendiente por confirmar:** registrar también los resultados de `totalVendido([])`, `unidadesVendidas([])`, `totalVendido([ventas[0]])` y `unidadesVendidas([ventas[0]])` si todavía no se ejecutaron individualmente.

---

## MiniReto 3 — Métodos de arreglo, agrupaciones y rankings

### Objetivo y decisión de diseño

Reescribir los cálculos de ciclo con `filter`, `map` y `reduce` sin cambiar sus resultados; después, agrupar por ciudad y producto, y producir un ranking monetario. Se conservan las funciones anteriores para poder comparar ambas versiones.

`filter()` selecciona; `map()` transforma; `reduce()` acumula. Para agrupar, el acumulador de `reduce()` es un objeto `{}`; para sumar es un número `0`.

### Las cinco preguntas sobre colecciones

| Función | ¿Qué recorro? | ¿Qué filtro? | ¿Qué transformo? | ¿Qué acumulo? | ¿Cómo agrupo? |
|---|---|---|---|---|---|
| `totalVendidoM` | Registros de `ventas` | `cantidad > 0` | Cada venta en `valorVenta(venta)` | Ingresos en número inicial `0` | No agrupa: produce un total |
| `unidadesVendidasM` | Registros de `ventas` | `cantidad > 0` | Cada venta en `venta.cantidad` | Unidades desde `0` | No agrupa: produce un total |
| `ventasPorCiudadM` | Registros de `ventas` | Ciudad normalizada coincidente y `cantidad > 0` | Cada venta válida en su valor monetario | Ingresos de la ciudad desde `0` | No agrupa todas las ciudades: selecciona una |
| `totalPorCiudad` | Registros de `ventas` | `cantidad > 0` | `ciudad.trim().toLowerCase()` y valor monetario | Dinero en un objeto `{}` | Clave = ciudad normalizada |
| `unidadesPorProducto` | Registros de `ventas` | `cantidad > 0` | Extrae el nombre del producto | `venta.cantidad` en `{}` | Clave = nombre del producto |
| `valorPorProducto` | Registros de `ventas` | `cantidad > 0` | Producto y `valorVenta(venta)` | Ingresos por producto en `{}` | Clave = nombre del producto |
| `topProductosPorValor` | Totales del diccionario de productos | No filtra registros adicionales; `slice(0, k)` limita el resultado | `Object.entries()` y `map()` convierten pares en `{producto, valor}` | Reutiliza los totales previamente acumulados | Reutiliza `valorPorProducto`; ordena con `sort((a,b) => b.valor - a.valor)` |

### Pseudocódigo de agrupaciones y ranking

**`totalPorCiudad(ventas)`**

```text
CREAR objeto vacío totales
PARA CADA venta válida
    ciudad = normalizar(venta.ciudad)
    SI ciudad no existe en totales: totales[ciudad] = 0
    totales[ciudad] = totales[ciudad] + valorVenta(venta)
FIN PARA
DEVOLVER totales
```

**`unidadesPorProducto(ventas)`**

```text
CREAR objeto vacío unidades
PARA CADA venta válida
    producto = venta.producto
    SI producto no existe: unidades[producto] = 0
    unidades[producto] = unidades[producto] + venta.cantidad
FIN PARA
DEVOLVER unidades
```

**`valorPorProducto(ventas)`**

```text
CREAR objeto vacío ingresos
PARA CADA venta válida
    producto = venta.producto
    SI producto no existe: ingresos[producto] = 0
    ingresos[producto] = ingresos[producto] + valorVenta(venta)
FIN PARA
DEVOLVER ingresos
```

**`topProductosPorValor(ventas, k)`**

```text
OBTENER los ingresos agrupados con valorPorProducto(ventas)
CONVERTIR el objeto en pares mediante Object.entries
TRANSFORMAR cada par en un objeto {producto, valor}
ORDENAR por valor de mayor a menor
TOMAR los primeros k elementos con slice(0, k)
DEVOLVER el arreglo resultante
```

### Resultados de agrupación y ranking

**Ingresos por ciudad:**

| Ciudad normalizada | Ingresos (COP) |
|---|---:|
| `medellín` | 356.000 |
| `bogotá` | 276.000 |
| `cali` | 185.000 |
| `pereira` | 168.000 |
| **Total** | **985.000** |

**Unidades e ingresos por producto:**

| Producto | Unidades | Ingresos (COP) |
|---|---:|---:|
| Origen Huila 500 g | 7 | 294.000 |
| Origen Nariño 250 g | 6 | 156.000 |
| Prensa francesa | 2 | 190.000 |
| Origen Sierra 500 g | 5 | 225.000 |
| Molino manual | 1 | 120.000 |
| **Total** | **21** | **985.000** |

**Top 3 esperado de `topProductosPorValor(ventas, 3)`:**

1. Origen Huila 500 g — 294.000 COP.
2. Origen Sierra 500 g — 225.000 COP.
3. Prensa francesa — 190.000 COP.

**Inmutabilidad:** `Object.entries()` y `map()` crean arreglos nuevos. La implementación mostrada de `topProductosPorValor` ordena el arreglo nuevo, no el arreglo de ventas. Falta registrar la prueba explícita que verifica que el orden original de `ventas` no cambió.

### Pruebas de equivalencia: `node src/verificar.js`

Salida compartida de la ejecución:

```text
Total Vendido: OK
Unidades Vendidas: OK
Ventas por Ciudad (Medellín): OK

--- Arreglo vacío ---
Total Vendido (vacío): OK
Unidades Vendidas (vacío): OK
Ventas por Ciudad Medellín (vacío): OK
```

Las tres parejas de funciones coinciden con el arreglo completo y con el arreglo vacío. **Nota:** `OK` confirma equivalencia entre implementaciones, pero por sí solo no comprueba que ambas den un valor esperado; para ello se contrastaron los resultados con las trazas y valores de la muestra.

### Casos borde y pruebas 

- `totalPorCiudad([])` y `unidadesPorProducto([])` deben devolver `{}`.
- `topProductosPorValor([], 3)` y `topProductosPorValor(ventas, 0)` deben devolver `[]`.
- `topProductosPorValor(ventas, 3)` debe devolver exactamente tres objetos, en orden descendente.
- Conviene comprobar que la lista `ventas` mantiene sus IDs en el mismo orden después de calcular el ranking.
- `sort()` modifica el arreglo sobre el que opera; aquí ordenamos un arreglo nuevo. Una copia con `[...arreglo]` sería necesaria si se ordenara un arreglo que se necesita preservar.
- En las claves de productos, `producto in acumulador` funciona con la muestra, pero `Object.hasOwn(acumulador, producto)` es una opción más estricta para evitar propiedades heredadas.

### Pruebas adicionales y casos borde

Se ejecutó `node src/verificar.js` para comprobar la equivalencia entre algoritmos con ciclos y métodos de arreglo, así como el comportamiento de las funciones ante entradas especiales.

**Resultados obtenidos:**

| Prueba | Resultado | Estado |
|---|---|---|
| Total vendido: ciclo vs. método | OK | Correcto |
| Unidades vendidas: ciclo vs. método | OK | Correcto |
| Ventas por Medellín: ciclo vs. método | OK | Correcto |
| Tres comparaciones con arreglo vacío | OK | Correcto |
| Ranking con arreglo vacío | `[]` | Correcto |
| Ranking con k = 0 | `[]` | Correcto |
| Ranking con k = 3 | Tres productos | Correcto |
| Agrupación de ciudades vacía | `{}` | Correcto |
| Agrupación de productos vacía | `{}` | Correcto |
| Agrupación de una venta | Origen Huila: 2 unidades | Correcto |
| Conservación del orden original | OK | Correcto |

**Conclusión:** las versiones con ciclos y métodos producen los mismos resultados en los escenarios comprobados. Los rankings y agrupaciones manejan correctamente los casos borde evaluados, y la ejecución del ranking conserva el orden original de los registros de ventas.

**Decisión:** mantener el arreglo original sin ordenar directamente y trabajar con arreglos derivados para generar los rankings.


---

## MiniReto 4 — Integración del reporte y depuración

### Objetivo

Integrar las funciones del motor de analítica en un reporte ejecutable desde Node.js, comprobar sus resultados y verificar el manejo de casos borde.

### 1. Integración del reporte

Se creó `src/reporte.js`, que importa los datos desde `datos.js` y las funciones desde `analitica.js`.

El reporte contiene:

- Resumen general de ventas.
- Totales vendidos por ciudad.
- Unidades vendidas por producto.
- Ranking de los tres productos con mayores ingresos.
- Resumen de un día con ventas y otro sin ventas.

Se utilizó `toLocaleString("es-CO")` para presentar los valores en pesos colombianos con dos decimales.

### 2. Depuración — Error de ciudades duplicadas

**Síntoma:** la gerente reportó que Bogotá aparecía dos veces en el reporte.

**Entrada que produce el problema:** dos registros con las ciudades `"Bogotá"` y `"Bogotá "`.

**Hipótesis:** JavaScript considera distintos los strings que contienen espacios adicionales, lo que ocasiona agrupaciones separadas.

**Prueba realizada:** se creó un arreglo con dos registros para Bogotá, uno con un espacio al final. Se ejecutó `totalPorCiudad()`.

**Resultado obtenido:**

```javascript
{ 'bogotá': 30000 }
```

**Causa:** la ausencia de normalización puede provocar que diferentes representaciones de una misma ciudad se utilicen como claves independientes.

**Corrección:** la función utiliza `trim()` para eliminar espacios sobrantes y `toLowerCase()` para unificar mayúsculas y minúsculas.

**Conclusión:** la implementación actual agrupa correctamente ambas variantes en una sola ciudad.

### 3. Depuración — Error NaN en ticket promedio

**Síntoma:** al seleccionar un día sin ventas, el ticket promedio podía mostrar `NaN`.

**Entrada que produce el problema:** un arreglo vacío `[]`, obtenido al consultar una fecha sin registros.

**Hipótesis:** el algoritmo intenta dividir el total vendido entre cero ventas válidas.

**Prueba realizada:** se ejecutó el reporte para el 10 de septiembre de 2026, una fecha sin ventas registradas.

**Resultado obtenido:**

```text
Registros: 0
Total vendido: $0,00
Unidades vendidas: 0
Ticket promedio: $0,00
```

**Causa:** dividir `0 / 0` en JavaScript devuelve `NaN`.

**Corrección:** en `ticketPromedio()` se comprueba si el contador de ventas válidas es cero y, en ese caso, se devuelve `0` antes de realizar la división.

**Conclusión:** la implementación actual evita `NaN` cuando se consultan días sin ventas.

### 4. Resultados finales

| Indicador | Resultado |
|---|---:|
| Total vendido | $985.000 |
| Unidades vendidas | 21 |
| Ticket promedio | $89.545,45 |
| Venta de mayor valor | ID 10 |
| Valor de venta mayor | $168.000 |
| Ciudades agrupadas | 4 |
| Productos diferentes | 5 |

Se verificó que el reporte mostrado no contiene valores `NaN`, `undefined` ni ciudades duplicadas.

### 5. Decisiones técnicas

- Mantener los datos originales sin modificar.
- Separar la información, las funciones analíticas y la presentación en archivos independientes.
- Reutilizar funciones para evitar repetir operaciones.
- Utilizar normalización de strings al agrupar ciudades.
- Devolver cero cuando no existen ventas válidas para calcular el ticket promedio.
- Formatear los valores monetarios únicamente en la capa de presentación.
