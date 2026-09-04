// Funcion del catalogo //
function filtrar(categoria, boton) {
  var botones = document.getElementsByClassName('btn-filtro');
  for (var i = 0; i < botones.length; i++) {
    botones[i].className = 'btn-filtro';
  }
  boton.className = 'btn-filtro activo';

  var tarjetas = document.getElementsByClassName('item-galeria');
  for (var j = 0; j < tarjetas.length; j++) {
    var cat = tarjetas[j].getAttribute('data-categoria');
    if (categoria === 'todos' || cat === categoria) {
      tarjetas[j].style.display = 'flex';
    } else {
      tarjetas[j].style.display = 'none';
    }
  }
}

// Control del boton volver arriba //
var botonArriba = document.getElementById('btnVolverArriba');

window.onscroll = function () {
  if (document.documentElement.scrollTop > 300 || document.body.scrollTop > 300) {
    botonArriba.style.display = 'block';
  } else {
    botonArriba.style.display = 'none';
  }
};

// Accion de scroll al inicio //
botonArriba.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};