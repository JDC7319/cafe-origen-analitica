# ☕ Café Origen — Motor de Analítica v0.1

Motor de analítica desarrollado en JavaScript y Node.js para procesar el historial de ventas de Café Origen, una tostadora de café de especialidad de Medellín.

## Objetivo

Construir una solución que permita analizar datos de ventas y responder preguntas de negocio mediante algoritmos, métodos de arreglos y agrupaciones.

## Tecnologías

- JavaScript
- Node.js
- Git y GitHub

## Estructura del proyecto

```text
cafe-origen-analitica/
├── src/
│   ├── datos.js
│   ├── analitica.js
│   ├── explorar.js
│   ├── verificar.js
│   └── reporte.js
├── bitacora.md
└── README.md
```

## Instalación y ejecución

**Requisitos:** Node.js LTS y Git.

Clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
cd cafe-origen-analitica
```

Ejecutar el reporte principal:

```bash
node src/reporte.js
```

Explorar los datos:

```bash
node src/explorar.js
```

Verificar las implementaciones:

```bash
node src/verificar.js
```

## Funcionalidades

El motor permite responder:

- ¿Cuánto dinero se vendió en total?
- ¿Cuántas unidades se vendieron?
- ¿Cuál fue la venta de mayor valor?
- ¿Cuál es el ticket promedio?
- ¿Cuánto se vendió por ciudad?
- ¿Cuántas unidades se vendieron por producto?
- ¿Cuáles son los tres productos que más ingresos generaron?
- ¿Cuáles fueron los resultados de un día específico?

## Conceptos implementados

**MiniReto 1 — Modelado de datos**

Arreglos, objetos, índices, módulos y exploración de registros.

**MiniReto 2 — Algoritmos con ciclos**

Funciones, `for...of`, condicionales, contadores, acumuladores y máximos.

**MiniReto 3 — Métodos y agrupaciones**

`map()`, `filter()`, `reduce()`, `Object.entries()`, `sort()` y `slice()`.

**MiniReto 4 — Integración y depuración**

Reporte por consola, funciones reutilizables, formato monetario y manejo de casos borde.

## Calidad de datos

El historial original se conserva sin modificaciones. Durante el análisis se aplican reglas para normalizar ciudades, excluir registros con cantidad cero de las ventas efectivas y evitar divisiones entre cero.

## Documentación

El archivo `bitacora.md` contiene el diccionario de datos, los pseudocódigos, las trazas manuales, las decisiones técnicas y las pruebas realizadas.

## Versión

**v0.1 — Motor inicial de analítica por consola.**
