// Parte de importacion de librerias y conexion
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Parte de middlewares
app.use(express.json());
app.use(express.static('./'));

// Parte de conexion a MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log("Conectado exitosamente a MongoDB - JimsArt"))
  .catch(err => console.error("Error al conectar a MongoDB:", err));

// Parte de esquema y modelo de productos
const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  categoria: { type: String, required: true },
  desc: { type: String, required: true },
  precio: { type: Number, required: true },
  disponible: { type: Boolean, default: true }
}, { timestamps: true });

const Producto = mongoose.model('Producto', productoSchema);

// Parte de rutas de la API CRUD
app.get("/api/productos", async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

app.post("/api/productos", async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    const guardado = await nuevoProducto.save();
    res.status(201).json({ mensaje: "Producto guardado con exito", producto: guardado });
  } catch (error) {
    res.status(400).json({ error: "Faltan campos obligatorios" });
  }
});

// RUTA PARA CARGAR PRODUCTOS INICIALES (Configurada como GET para abrirla directo en el navegador)
app.get("/api/productos/cargar-iniciales", async (req, res) => {
  try {
    const productosIniciales = [
      { nombre: "Lampara Rustica de Madera y LED", categoria: "Iluminacion", desc: "Lampara de mesa elaborada artesanalmente con madera reciclada y luz calida.", precio: 45.00, disponible: true },
      { nombre: "Fuente de Agua de Cemento Zen", categoria: "Fuentes", desc: "Fuente ornamental para interiores y exteriores con efecto relajante de cascada.", precio: 85.50, disponible: true },
      { nombre: "Portarretratos Tallado en Madera", categoria: "Artesanias", desc: "Marco decorativo rustico tallado a mano con detalles geometricos.", precio: 20.00, disponible: true },
      { nombre: "Aplique de Pared Industrial de Madera", categoria: "Iluminacion", desc: "Base de madera tratada con bombilla estilo Edison vintage.", precio: 35.00, disponible: true },
      { nombre: "Macetero Geometrico de Cemento", categoria: "Decoracion", desc: "Maceta de cemento de diseño moderno minimalista para plantas de interior.", precio: 18.00, disponible: true }
    ];

    // Limpia los anteriores y carga los nuevos para evitar duplicados
    await Producto.deleteMany({});
    const insertados = await Producto.insertMany(productosIniciales);

    res.status(201).json({
      mensaje: "¡Lista de productos de JimsArt cargada con éxito en MongoDB!",
      total: insertados.length,
      productos: insertados
    });
  } catch (error) {
    res.status(500).json({ error: "Error al cargar los productos iniciales" });
  }
});

// Parte de inicializacion del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});