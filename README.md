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

## Formato de respuestas JSON (pretty-print)

El servidor está configurado para devolver JSON con sangría de 2 espacios (ajuste `app.set('json spaces', 2)` en `index.js`). Si preferís controlar el formateo por petición, podéis cambiar `res.json(...)` por:

```js
res.setHeader('Content-Type', 'application/json; charset=utf-8');
res.send(JSON.stringify(obj, null, 2));
```

También se puede implementar un query param `?pretty=true` si querés control por petición.

## Almacenamiento y problemas comunes

- El archivo de datos es `data/productos.json`. Si al hacer `GET /api/productos` recibís `[]`, comprobar:
  - Que el archivo exista y tenga contenido JSON válido.
  - Que la ruta en `models/producto.model.js` apunte correctamente a `path.join(__dirname, '..', 'data', 'productos.json')`.

- El modelo ahora normaliza valores: al leer asigna ids y `precio` por defecto si faltan. Esto permite búsquedas por id confiables.

## Debugging rápido

- Revisá la consola donde ejecutás Node para ver logs y errores.
- Para probar en Postman:
  - Hacer GET, POST, PUT, DELETE en `http://localhost:3000/api/productos`.
  - Asegurarse de enviar `Content-Type: application/json` en POST/PUT.

## Mejores ideas/Próximos pasos

- Agregar paginación (limit/offset) y ordenamiento.
- Soportar rangos numéricos (ej. `precio_min`/`precio_max`).
- Mover almacenamiento a una base de datos real (SQLite, PostgreSQL, MongoDB).
- Agregar tests unitarios e integración.

## Archivos modificados por la sesión

- `controllers/producto.controller.js` - se agregó filtrado por query params y algunas mejoras.
- `models/producto.model.js` - correcciones en la ruta del archivo y normalización de `id`/`precio`.
- `middlewares/productoValidator.js` - validador consolidado.
- `index.js` - habilitado JSON pretty globally con `app.set('json spaces', 2)`.

## Licencia



Si querés, puedo agregar ejemplos en Postman Collection (.json) o implementar paginación y rangos ahora.

## Postman Collection (ejemplos)

Incluí una colección de Postman lista para importar en `postman_collection.json`.

Cómo usarla:

1. Abrí Postman -> Import -> seleccioná `postman_collection.json`.
2. Asegurate de que la variable `baseUrl` esté en `http://localhost:3000` o ajustala según tu entorno.
3. Ejecutá las requests: GET, POST, PUT, DELETE ejemplos ya vienen configurados.

