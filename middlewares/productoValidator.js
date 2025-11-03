

const validarProducto = (req, res, next) => {
    const producto = req.body;


    const camposRequeridos = ['nombreProducto', 'marca', 'stock', 'tipo', 'precio', 'caracteristicas', 'modelo', 'color', 'habilitado'];
    const camposFaltantes = camposRequeridos.filter(campo => producto[campo] === undefined);

    if (camposFaltantes.length > 0) {
        return res.status(400).json({ 
            error: 'Campos faltantes', 
            mensaje: `Faltan los siguientes campos requeridos: ${camposFaltantes.join(', ')}` 
        });
    }

    if (typeof producto.nombreProducto !== 'string' || typeof producto.marca !== 'string') {
        return res.status(400).json({ error: 'Tipo de dato incorrecto', mensaje: 'Nombre y Marca deben ser strings.' });
    }

    if (typeof producto.stock !== 'number' || typeof producto.precio !== 'number') {
        return res.status(400).json({ error: 'Tipo de dato incorrecto', mensaje: 'Stock y Precio deben ser valores numéricos.' });
    }
    
    if (typeof producto.habilitado !== 'boolean') {
        return res.status(400).json({ error: 'Tipo de dato incorrecto', mensaje: 'Habilitado debe ser un valor booleano (true/false).' });
    }

  
    next(); 
};

module.exports = validarProducto;
