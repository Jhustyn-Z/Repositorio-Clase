// Funcion del catalogo //
function filtrar(categoria, boton) {
  var botones = document.querySelectorAll('.btn-filtro');
  for (var i = 0; i < botones.length; i++) {
    botones[i].classList.remove('activo');
  }
  if (boton) {
    boton.classList.add('activo');
  }

  var tarjetas = document.querySelectorAll('.item-galeria');
  for (var j = 0; j < tarjetas.length; j++) {
    var cat = tarjetas[j].getAttribute('data-categoria');
    if (categoria === 'todos' || cat === categoria) {
      tarjetas[j].classList.remove('oculto');
    } else {
      tarjetas[j].classList.add('oculto');
    }
  }
}

// Control del boton volver arriba //
var botonArriba = document.getElementById('btnVolverArriba');

window.onscroll = function () {
  if (botonArriba) {
    if (document.documentElement.scrollTop > 300 || document.body.scrollTop > 300) {
      botonArriba.style.display = 'block';
    } else {
      botonArriba.style.display = 'none';
    }
  }
};

// Accion de scroll al inicio //
if (botonArriba) {
  botonArriba.onclick = function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
}

// Modal de Zoom //
function abrirZoom(ruta, texto) {
  var modal = document.getElementById('modalZoom');
  var img = document.getElementById('imgZoom');
  var caption = document.getElementById('captionZoom');
  if (modal && img && caption) {
    img.src = ruta;
    caption.textContent = texto || '';
    modal.style.display = 'flex';
  }
}

function cerrarZoom() {
  var modal = document.getElementById('modalZoom');
  if (modal) {
    modal.style.display = 'none';
  }
}

// Eventos de apertura y cierre //
window.onload = function () {
  var imagenesGaleria = document.querySelectorAll('.contenedor-img img, .contenedor-img-proceso img');
  for (var i = 0; i < imagenesGaleria.length; i++) {
    imagenesGaleria[i].onclick = function (e) {
      e.stopPropagation();
      abrirZoom(this.src, this.alt);
    };
  }

  var btnCerrar = document.getElementById('btnCerrarZoom') || document.querySelector('.cerrar-zoom');
  if (btnCerrar) {
    btnCerrar.onclick = function (e) {
      e.stopPropagation();
      cerrarZoom();
    };
  }

  var modal = document.getElementById('modalZoom');
  if (modal) {
    modal.onclick = function (e) {
      if (e.target === modal) {
        cerrarZoom();
      }
    };
  }

  document.onkeydown = function (e) {
    if (e.key === "Escape" || e.keyCode === 27) {
      cerrarZoom();
    }
  };
};