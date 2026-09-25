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

// Ruta principal
app.get("/", (req, res) => {
  res.send("<h1>Servidor JimsArt en Express funcionando correctamente</h1>");
});

// Ruta para ver todos los productos
app.get("/productos", (req, res) => {
  res.json(productos);
});

// Ruta para buscar un producto por su ID
app.get("/producto/:id", (req, res) => {
  const idProducto = Number(req.params.id);
  const productoEncontrado = productos.find(p => p.id === idProducto);

  if (productoEncontrado) {
    return res.json(productoEncontrado);
  }

  return res.status(404).json({ error: "Producto no encontrado" });
});

// Ruta para agregar un nuevo producto
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

// Encender el servidor
app.listen(PORT, () => {
  console.log(`Servidor de JimsArt corriendo en http://localhost:${PORT}`);
});