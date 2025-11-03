
const express = require('express');
const app = express();
const PORT = 3000;

//* Devuelve JSON con formato legible (2 espacios)
app.set('json spaces', 2);

//* Middleware para parsear JSON en el body
app.use(express.json());

//* Importamos las rutas del módulo de productos
const productoRoutes = require('./views/view');

//* Montar las rutas de productos
app.use('/api/productos', productoRoutes);

//* Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor API REST http://localhost:${PORT}/api/productos`);
});

//* Loggers para ver que entra en los metodso PUT, PATCH y POST
app.use((req, res, next) => {
    console.log('Content-Type:', req.get('Content-Type'));
    console.log('Body después de express.json():', req.body);
    next();
});

//* Muestra en consola el método y la ruta de cada solicitud.
const logger = (req, res, next) => {
    const timestamp = new Date().toLocaleTimeString('es-AR'); 
    console.log(`[${req.method}] ${req.originalUrl} - ${timestamp}`);
    next(); 
};
app.use(logger);




app.use('/api/productos', productoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor API REST http://localhost:${PORT}/api/productos`);
});