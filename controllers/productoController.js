const ProductoModel = require('../models/productoModel');

//*Función auxiliar para verificar si un objeto está vacío
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

const productoController = {
    //* Obtener todos los productos
    obtenerTodos: (req, res) => {
        try {
            let productos = ProductoModel.obtenerTodos();
            const filtros = req.query;

            //* Si hay parámetros de consulta, aplicar filtros
            if (!isEmpty(filtros)) {
                productos = productos.filter(producto => {
                    return Object.keys(filtros).every(key => {
                        //* Convertir tanto el valor del producto como el filtro a minúsculas para comparación
                        const valorProducto = String(producto[key]).toLowerCase();
                        const valorFiltro = String(filtros[key]).toLowerCase();
                        return valorProducto.includes(valorFiltro);
                    });
                });
            }

            res.json(productos);
        } catch (error) {
            console.error("Error al obtener productos:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    //* Obtener un producto por ID
    obtenerPorId: (req, res) => {
        try {
            const producto = ProductoModel.obtenerPorId(req.params.id);
            
            if (producto) {
                res.json(producto);
            } else {
                res.status(404).json({ error: "Producto no encontrado" });
            }
        } catch (error) {
            console.error("Error al obtener el producto:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    //* Crear un nuevo producto
    crear: (req, res) => {
        try {
            const nuevoProducto = ProductoModel.crear(req.body);
            res.status(201).json(nuevoProducto);
        } catch (error) {
            console.error("Error al crear el producto:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    //* Actualizar un producto completamente
    actualizar: (req, res) => {
        try {
            const productoActualizado = ProductoModel.actualizar(req.params.id, req.body);
            
            if (productoActualizado) {
                res.json(productoActualizado);
            } else {
                res.status(404).json({ error: "Producto no encontrado" });
            }
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    //* Actualizar un producto parcialmente
    actualizarParcial: (req, res) => {
        try {
            // Primero obtenemos el producto existente
            const productoExistente = ProductoModel.obtenerPorId(req.params.id);
            
            if (!productoExistente) {
                return res.status(404).json({ error: "Producto no encontrado" });
            }

            // Actualizamos solo los campos proporcionados
            const productoActualizado = ProductoModel.actualizar(
                req.params.id,
                { ...productoExistente, ...req.body }
            );

            res.json(productoActualizado);
        } catch (error) {
            console.error("Error al actualizar parcialmente el producto:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    // Eliminar un producto
    eliminar: (req, res) => {
        try {
            // obtener el producto antes de eliminar para devolverlo
            const productoExistente = ProductoModel.obtenerPorId(req.params.id);
            if (!productoExistente) {
                return res.status(404).json({ success: false, error: "Producto no encontrado" });
            }

            const eliminado = ProductoModel.eliminar(req.params.id);

            if (eliminado) {
                // eliminado es el objeto eliminado retornado por el modelo
                return res.json(eliminado);
            } else {
                return res.status(500).json({ error: 'No se pudo eliminar el producto' });
            }
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
};

module.exports = productoController;