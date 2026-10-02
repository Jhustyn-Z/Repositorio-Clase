const express = require('express');
const app = express();
const PORT = 3000;

// Permite procesar datos JSON enviados al servidor
app.use(express.json());

// Catálogo base de JimsArt con IDs numéricos
let productos = [
  { id: 1, nombre: "Lámpara Rústica", precio: 25.00, desc: "Madera con acabado vintage" },
  { id: 2, nombre: "Lámpara Colgante", precio: 30.00, desc: "Base de madera y cuerda rústica" },
  { id: 3, nombre: "Lámpara Geométrica", precio: 22.50, desc: "Diseño moderno en madera tratada" },
  { id: 4, nombre: "Cascada de Cántaros", precio: 45.00, desc: "Fuente decorativa con bomba de agua" },
  { id: 5, nombre: "Macetero Geométrico", precio: 15.00, desc: "Macetero de cemento y madera" },
  { id: 6, nombre: "Mural Decorativo", precio: 35.00, desc: "Arte de pared rústico" }
];

// 1. Ruta principal de bienvenida / prueba
app.get("/", (req, res) => {
  res.send("<h1>Servidor JimsArt en Express funcionando correctamente</h1>");
});

// 2. Ruta GET - Ver todos los productos
app.get("/productos", (req, res) => {
  res.json(productos);
});

// 3. Ruta GET - Buscar un producto por su ID
app.get("/producto/:id", (req, res) => {
  const idProducto = Number(req.params.id);
  const productoEncontrado = productos.find(p => p.id === idProducto);

  if (productoEncontrado) {
    return res.json(productoEncontrado);
  }

  return res.status(404).json({ error: "Producto no encontrado" });
});

// 4. Ruta POST - Agregar un nuevo producto
app.post("/productos", (req, res) => {
  const nuevoProducto = {
    id: productos.length + 1,
    nombre: req.body.nombre,
    precio: req.body.precio || 0,
    desc: req.body.desc || "Sin descripción"
  };

  productos.push(nuevoProducto);
  return res.status(201).json({ mensaje: "Producto recibido", producto: nuevoProducto });
});

// 5. Ruta PUT - Actualizar un producto existente por su ID
app.put("/producto/:id", (req, res) => {
  const idProducto = Number(req.params.id);
  const indice = productos.findIndex(p => p.id === idProducto);

  if (indice === -1) {
    return res.status(404).json({ error: "Producto no encontrado para actualizar" });
  }

  // Actualizar solo los datos enviados en el body
  productos[indice] = {
    ...productos[indice],
    nombre: req.body.nombre || productos[indice].nombre,
    precio: req.body.precio !== undefined ? req.body.precio : productos[indice].precio,
    desc: req.body.desc || productos[indice].desc
  };

  return res.json({ mensaje: "Producto actualizado con éxito", producto: productos[indice] });
});

// 6. Ruta DELETE - Eliminar un producto por su ID
app.delete("/producto/:id", (req, res) => {
  const idProducto = Number(req.params.id);
  const indice = productos.findIndex(p => p.id === idProducto);

  if (indice === -1) {
    return res.status(404).json({ error: "Producto no encontrado para eliminar" });
  }

  const productoEliminado = productos.splice(indice, 1);
  return res.json({ mensaje: "Producto eliminado correctamente", producto: productoEliminado[0] });
});

// Encender el servidor
app.listen(PORT, () => {
  console.log(`Servidor de JimsArt corriendo en http://localhost:${PORT}`);
});