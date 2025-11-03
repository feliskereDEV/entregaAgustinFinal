// app.js o server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Devuelve JSON con formato legible (2 espacios). Afecta a res.json()
app.set('json spaces', 2);

// Importamos las rutas del módulo de productos
const productoRoutes = require('./views/view'); 

// --- MIDDLEWARES GLOBALES ---

// 1. Logger: Muestra en consola el método y la ruta de cada solicitud.
const logger = (req, res, next) => {
    const timestamp = new Date().toLocaleTimeString('es-AR'); 
    console.log(`[${req.method}] ${req.originalUrl} - ${timestamp}`);
    next(); 
};
app.use(logger); 

// Middleware para parsear el cuerpo de las peticiones como JSON (esencial para POST y PUT)
app.use(express.json());

// --- MONTAJE DE RUTAS ---

// Montamos el router de productos en el prefijo /api/productos
app.use('/api/productos', productoRoutes);

// --- INICIO DEL SERVIDOR ---

app.listen(PORT, () => {
    console.log(`🚀 Servidor API REST http://localhost:${PORT}/api/productos`);
});