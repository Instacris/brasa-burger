/* ============================================================
   BRASA BURGER · JS principal (todas las páginas)
   ============================================================ */
(function () {
  "use strict";

  /* Marca que hay JS: habilita los estados ocultos de .reveal (sin JS, todo visible) */
  document.documentElement.classList.add("js");

  /* ---------- Header con sombra al hacer scroll ---------- */
  const header = document.getElementById("header");
  if (header) {
    const alScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
    window.addEventListener("scroll", alScroll, { passive: true });
    alScroll();
  }

  /* ---------- Menú móvil ---------- */
  const burger = document.getElementById("navBurger");
  const links = document.getElementById("navLinks");
  if (burger && links) {
    burger.addEventListener("click", () => {
      const abierto = links.classList.toggle("is-abierto");
      burger.classList.toggle("is-abierto", abierto);
      burger.setAttribute("aria-expanded", abierto ? "true" : "false");
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        links.classList.remove("is-abierto");
        burger.classList.remove("is-abierto");
        burger.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---------- Hero: hamburguesa giratoria cada 3 segundos ---------- */
  const escenario = document.getElementById("heroBurgers");
  const nombreEl = document.getElementById("heroNombre");
  const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (escenario && !sinMovimiento) {
    const burgers = Array.from(escenario.querySelectorAll(".hero__burger"));
    let actual = 0;

    setInterval(() => {
      const sale = burgers[actual];
      actual = (actual + 1) % burgers.length;
      const entra = burgers[actual];

      sale.classList.remove("is-activa");
      sale.classList.add("is-saliendo");
      setTimeout(() => sale.classList.remove("is-saliendo"), 850);

      entra.classList.add("is-activa");

      if (nombreEl) {
        nombreEl.classList.add("is-cambiando");
        setTimeout(() => {
          nombreEl.innerHTML = entra.dataset.nombre;
          nombreEl.classList.remove("is-cambiando");
        }, 380);
      }
    }, 3000);
  }

  /* ---------- FAQ acordeón ---------- */
  document.querySelectorAll(".faq__item").forEach((item) => {
    const boton = item.querySelector(".faq__pregunta");
    const respuesta = item.querySelector(".faq__respuesta");
    if (!boton || !respuesta) return;

    boton.addEventListener("click", () => {
      const estabaAbierta = item.classList.contains("is-abierta");

      document.querySelectorAll(".faq__item.is-abierta").forEach((otro) => {
        otro.classList.remove("is-abierta");
        otro.querySelector(".faq__pregunta").setAttribute("aria-expanded", "false");
        otro.querySelector(".faq__respuesta").style.maxHeight = "0";
      });

      if (!estabaAbierta) {
        item.classList.add("is-abierta");
        boton.setAttribute("aria-expanded", "true");
        respuesta.style.maxHeight = respuesta.scrollHeight + "px";
      }
    });
  });

  /* ---------- Aparición al hacer scroll ---------- */
  const revelables = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revelables.length) {
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            observador.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revelables.forEach((el) => observador.observe(el));
  } else {
    revelables.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Chips de la carta: estado activo al navegar ---------- */
  const chips = document.querySelectorAll(".chip");
  if (chips.length) {
    const secciones = Array.from(chips)
      .map((c) => document.querySelector(c.getAttribute("href")))
      .filter(Boolean);

    const marcarChip = () => {
      let indice = 0;
      secciones.forEach((s, i) => {
        if (s.getBoundingClientRect().top < 180) indice = i;
      });
      chips.forEach((c, i) => c.classList.toggle("is-activa", i === indice));
    };
    window.addEventListener("scroll", marcarChip, { passive: true });
    marcarChip();
  }

  /* ---------- Año en el footer ---------- */
  const anio = document.getElementById("anio");
  if (anio) anio.textContent = new Date().getFullYear();
})();
