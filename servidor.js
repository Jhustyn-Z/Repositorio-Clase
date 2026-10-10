// Parte de importación de librerías del servidor
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Parte de procesamiento de JSON y archivos estáticos
app.use(express.json());
app.use(express.static('./'));

// Parte de conexión a la base de datos de MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/jimsart_db";
mongoose.connect(MONGO_URI)
  .then(() => console.log("Conectado exitosamente a MongoDB"))
  .catch(err => console.error("Error al conectar a MongoDB:", err));

// Parte del esquema y modelo de productos para la base de datos
const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  categoria: { type: String, required: true },
  desc: { type: String, required: true },
  disponible: { type: Boolean, default: true }
}, { timestamps: true });

const Producto = mongoose.model('Producto', productoSchema);

// Parte de rutas de la API CRUD
app.get("/api/productos", async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

app.get("/api/productos/:id", async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "ID inválido o error en el servidor" });
  }
});

app.post("/api/productos", async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    const guardado = await nuevoProducto.save();
    res.status(201).json({ mensaje: "Producto guardado con éxito", producto: guardado });
  } catch (error) {
    res.status(400).json({ error: "Faltan campos obligatorios" });
  }
});

app.put("/api/productos/:id", async (req, res) => {
  try {
    const actualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ error: "Producto no encontrado" });
    res.json({ mensaje: "Producto actualizado", producto: actualizado });
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar el producto" });
  }
});

app.delete("/api/productos/:id", async (req, res) => {
  try {
    const eliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ error: "Producto no encontrado" });
    res.json({ mensaje: "Producto eliminado correctamente", producto: eliminado });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
});

// Parte de encendido del servidor
app.listen(PORT, () => {
  console.log(`Servidor de JimsArt corriendo en http://localhost:${PORT}`);
});