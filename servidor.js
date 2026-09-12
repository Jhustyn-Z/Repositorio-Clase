const http = require('http');

// 1. Array de productos de JimsArt
const productos = [
  { nombre: "Lámpara Rústica", precio: "$25.00", desc: "Madera con acabado vintage" },
  { nombre: "Lámpara Colgante", precio: "$30.00", desc: "Base de madera y cuerda rústica" },
  { nombre: "Lámpara Geométrica", precio: "$22.50", desc: "Diseño moderno en madera tratada" }
];

// 2. Función que transforma el array a HTML usando .map()
function generarCatalogo() {
  const lista = productos.map(p => `
    <div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
      <h2>${p.nombre}</h2>
      <p><b>Precio:</b> ${p.precio}</p>
      <p>${p.desc}</p>
    </div>
  `).join('');

  return `
    <h1>Catálogo JimsArt</h1>
    ${lista}
  `;
}

// 3. Servidor y rutas
const servidor = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

  if (req.url === "/") {
    res.end("<h1>Inicio - Servidor JimsArt</h1>");
  } else if (req.url === "/catalogo") {
    res.end(generarCatalogo());
  } else {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h1>404 - Ruta no encontrada</h1>");
  }
});

// 4. Encender en el puerto 3000
servidor.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});