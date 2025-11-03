// src/routes/productos.routes.js
const express = require('express');
const router = express.Router();

// Importamos el Controlador con la lógica de negocio
const ProductoController = require('../controllers/productoController');

// Importamos el Middleware Validador para garantizar la calidad de los datos
const validarProducto = require('../middlewares/productoValidator'); 


// --- Definición de las Rutas (Endpoints REST) ---

// 1. OBTENER TODOS: GET /api/productos
router.get('/', ProductoController.obtenerTodos); 


// 2. OBTENER POR ID: GET /api/productos/:id
router.get('/:id', ProductoController.obtenerPorId);


// 3. CREAR: POST /api/productos
// Aplicamos el middleware 'validarProducto' antes de llamar al controlador 'crear'.
router.post('/', validarProducto, ProductoController.crear); 

// 4. ACTUALIZAR: PUT /api/productos/:id
// Aplicamos el middleware 'validarProducto' antes de llamar al controlador 'actualizar'.
router.put('/:id', validarProducto, ProductoController.actualizar);


// 5. ELIMINAR: DELETE /api/productos/:id
router.delete('/:id', ProductoController.eliminar); 

module.exports = router;