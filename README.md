## API REST - Electrodomésticos

Proyecto simple de API REST para manejar un inventario de productos (electrodomésticos). Está construido con Node.js y Express y usa un archivo JSON local (`data/productos.json`) como almacenamiento.

## Estructura principal

- `index.js` - punto de entrada / configuración del servidor y montaje de rutas.
- `controllers/` - lógica de controladores (ej. `producto.controller.js`).
- `models/` - acceso a datos y utilidades (ej. `producto.model.js`).
- `routes/` o `views/` - definición de routers (ej. `views/view.js` en este proyecto).
- `middlewares/` - middlewares (ej. `productoValidator.js`).
- `data/productos.json` - base de datos en JSON (archivo local).

## Requisitos

- Node.js 18+ (o versión compatible)
- npm

Dependencias principales (en `package.json`):
- express
- nodemon (dev)

## Instalación

1. Clonar o copiar el proyecto en tu máquina.
2. Instalar dependencias:

```powershell
npm install
```

## Ejecutar

- Modo desarrollo (con nodemon):

```powershell
npm run dev
```

- Modo producción / normal:

```powershell
node index.js
```

Por defecto el servidor arranca en el puerto `3000` y monta el router de productos en `/api/productos`.

## Endpoints disponibles

- Obtener todos los productos
  - GET /api/productos

- Obtener un producto por ID
  - GET /api/productos/:id

- Crear un producto
  - POST /api/productos
  - Body (application/json):

```json
{
  "nombreProducto": "Lavadora",
  "marca": "Samsung",
  "stock": 10,
  "tipo": "Electrodoméstico",
  "precio": 599.99,
  "caracteristicas": "Smart, 15kg",
  "modelo": "WF45T6000AW",
  "color": "Blanco",
  "habilitado": true
}
```

- Actualizar un producto
  - PUT /api/productos/:id
  - Body: campos a actualizar (no incluir `id`)

- Actualizar parcialmente un producto (PATCH)
  - PATCH /api/productos/:id
  - Body: solo los campos a modificar (no incluir `id`)
  - Nota: el proyecto soporta PATCH para actualizaciones parciales y PUT para reemplazo/parcial según cómo uses el endpoint.

- Eliminar un producto
  - DELETE /api/productos/:id

## Filtrado por query params

El endpoint `GET /api/productos` soporta filtros mediante query params. Ejemplos:

- Filtrar por color (case-insensitive, busca `includes`):
  - GET /api/productos?color=negro

- Filtrar por marca y color:
  - GET /api/productos?marca=VisionMax&color=negro

- Filtrar por booleanos:
  - GET /api/productos?habilitado=true

- Filtrar por números (igualdad exacta):
  - GET /api/productos?stock=10
  - GET /api/productos?precio=699.99

Comportamiento:
- Strings: comparación case-insensitive y por contains.
- Numbers: comparación numérica exacta.
- Boolean: acepta `true` o `false`.
- Múltiples query params se combinan con AND.

