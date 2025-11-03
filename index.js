
const express = require('express');
const app = express();
const PORT = 3000;

//* Devuelve JSON con formato legible (2 espacios). Afecta a res.json()
app.set('json spaces', 2);

//* Importamos las rutas del módulo de productos
const productoRoutes = require('./views/view'); 



//* Muestra en consola el método y la ruta de cada solicitud.
const logger = (req, res, next) => {
    const timestamp = new Date().toLocaleTimeString('es-AR'); 
    console.log(`[${req.method}] ${req.originalUrl} - ${timestamp}`);
    next(); 
};
app.use(logger); 


app.use(express.json());




app.use('/api/productos', productoRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Servidor API REST http://localhost:${PORT}/api/productos`);
});