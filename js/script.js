document.addEventListener('DOMContentLoaded', () => {

  // 1. Sistema de filtros de categorías
  const botonesFiltro = document.querySelectorAll('.btn-filtro');
  const itemsGaleria = document.querySelectorAll('.item-categoria');

  botonesFiltro.forEach((boton) => {
    boton.addEventListener('click', () => {
      botonesFiltro.forEach((btn) => btn.classList.remove('activo'));
      boton.classList.add('activo');

      const categoriaSeleccionada = boton.getAttribute('data-filtro');

      itemsGaleria.forEach((item) => {
        if (categoriaSeleccionada === 'todos' || item.getAttribute('data-categoria') === categoriaSeleccionada) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 2. Acordeón interactivo para Preguntas Frecuentes (FAQ)
  const itemsFAQ = document.querySelectorAll('.item-faq');

  itemsFAQ.forEach((item) => {
    const botonPregunta = item.querySelector('.pregunta-faq');

    botonPregunta.addEventListener('click', () => {
      const estaAbierto = item.classList.contains('abierto');

      // Cerrar otros acordeones abiertos para mantener orden
      itemsFAQ.forEach((otroItem) => {
        otroItem.classList.remove('abierto');
      });

      // Alternar el actual
      if (!estaAbierto) {
        item.classList.add('abierto');
      }
    });
  });

  // 3. Modal Lightbox (Ampliación de imagen al hacer clic)
  const modal = document.getElementById('modal-imagen');
  const modalImg = document.getElementById('img01');
  const captionText = document.getElementById('caption-modal');
  const spanCerrar = document.querySelector('.cerrar-modal');

  const todasLasImgs = document.querySelectorAll('.card-modelo img, .card-proceso img');

  todasLasImgs.forEach((img) => {
    img.addEventListener('click', () => {
      modal.style.display = 'block';
      modalImg.src = img.src;

      const tituloCard = img.closest('.card-modelo, .card-proceso').querySelector('h3, h4');
      captionText.innerHTML = tituloCard ? tituloCard.innerText : img.alt;
    });
  });

  if (spanCerrar) {
    spanCerrar.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  window.addEventListener('click', (evento) => {
    if (evento.target === modal) {
      modal.style.display = 'none';
    }
  });

  // 4. Desplazamiento suave para enlaces internos (#)
  const enlacesInternos = document.querySelectorAll('a[href^="#"]');

  enlacesInternos.forEach((enlace) => {
    enlace.addEventListener('click', (evento) => {
      const destinoId = enlace.getAttribute('href');
      const seccionDestino = document.querySelector(destinoId);

      if (seccionDestino) {
        evento.preventDefault();
        seccionDestino.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

});