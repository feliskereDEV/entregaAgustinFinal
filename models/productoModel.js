const fs = require("fs");
const path = require("path");

//* Conexión al archivo productos.json.
const DB_PATH = path.join(__dirname, '..', 'data', 'productos.json');

function leerDatos() {
    try {
        
        const data = fs.readFileSync(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        //* Retorna un array vacío si el archivo no existe o no se encuentra.
        console.error("Error al leer la base de datos:", error);
        return [];
    }
}

function escribirDatos(productos) {
    try {
        //* El "null, 2" formatea el JSON para que sea legible
        fs.writeFileSync(DB_PATH, JSON.stringify(productos, null, 2), 'utf8');
    } catch (error) {
        console.error("Error al escribir en la base de datos:", error.message);
        throw new Error("No se pudo guardar la información de productos.");
    }
}



class ProductoModel {
    //*Trae Todos
    static obtenerTodos() {
        //* Llama a la función auxiliar que lee el archivo.
        return leerDatos();
    }

    //* Trae un solo producto por identificador
    static obtenerPorId(id) {
        const productos = leerDatos();
        const productoId = parseInt(id, 10); 
        return productos.find(p => p.id === productoId);
    }

    //* Modelo de crear un nuevo prod.
    static crear(nuevoProducto) {
        const productos = leerDatos();
        
        // Genera un nuevo ID (el máximo + 1)
        const newId = productos.length > 0
            ? Math.max(...productos.map(p => p.id)) + 1
            : 1;
            
        const productoConId = { id: newId, ...nuevoProducto };
        
        productos.push(productoConId);
        escribirDatos(productos); 
        
        return productoConId;
    }

    //* Actualizar un producto por ID
    static actualizar(id, datosActualizados) {
        const productos = leerDatos();
        const productoId = parseInt(id, 10);
        const index = productos.findIndex(p => p.id === productoId);

        if (index === -1) {
            return null; //* Producto no encontrado
        }

        //* Combina datos existentes y actualizados, asegurando que el ID no cambie
        const productoActualizado = { 
            ...productos[index], 
            ...datosActualizados, 
            id: productoId 
        };
        
        productos[index] = productoActualizado;
        escribirDatos(productos);
        
        return productoActualizado;
    }

    //* Eliminar un producto por ID
    static eliminar(id) {
        const productos = leerDatos();
        const productoId = parseInt(id, 10);
        const longitudInicial = productos.length;
        
        //* Buscar el producto que será eliminado
        const productoEliminado = productos.find(p => p.id === productoId) || null;

        //* Crea un nuevo array sin el producto que va a ser eliminado
        const productosFiltrados = productos.filter(p => p.id !== productoId);

        //* Si la longitud cambió, significa que se eliminó algo
        if (productosFiltrados.length !== longitudInicial) {
            escribirDatos(productosFiltrados);
            // Devolver el objeto eliminado para que el controlador pueda responder con JSON
            return productoEliminado;
        }

        return null; //* No se encontro el ID
    }
}

module.exports = ProductoModel;