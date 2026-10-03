const express = require('express');
const app = express();
const PORT = 3000;

// Permite procesar datos JSON enviados al servidor
app.use(express.json());

// Catálogo base de JimsArt con IDs numéricos
let productos = [
  { id: 1, nombre: "Cascada de Cántaros en Pared Interior", categoria: "fuentes", desc: "Circuito de caída continua con platos y cántaros de barro" },
  { id: 2, nombre: "Cascada Escalonada de Mesa", categoria: "fuentes", desc: "Fuente compacta para centros de mesa o recibidores" },
  { id: 3, nombre: "Modelo Tronco Colgante con Luz Cálida", categoria: "lamparas", desc: "Tronco natural curado con bombillos colgantes" },
  { id: 4, nombre: "Modelo Viga Rústica con Soga y Vegetación", categoria: "lamparas", desc: "Viga suspendida con cuerda y follaje decorativo" },
  { id: 5, nombre: "Modelo #01: Bicicleta con Canasta", categoria: "artesanias", desc: "Bicicleta artesanal con canastilla para flores" },
  { id: 6, nombre: "Modelo #06: Triciclo Carreta para Flores", categoria: "artesanias", desc: "Triciclo con ruedas de madera y cajón amplio" },
  { id: 7, nombre: "Modelo #10: Lapicero Artesanal de Escritorio", categoria: "artesanias", desc: "Organizador portalápices en madera y cuerda" },
  { id: 8, nombre: "Mural Cántaros con Árbol de Soga", categoria: "murales", desc: "Cuadro de pared con árbol de cuerda y vasijas en relieve" },
  { id: 9, nombre: "Dúo de Maceteros Esferas Doradas", categoria: "maceteros", desc: "Vasijas esféricas en cemento con acabado dorado" }
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
    categoria: req.body.categoria || "artesanias",
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
    categoria: req.body.categoria || productos[indice].categoria,
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