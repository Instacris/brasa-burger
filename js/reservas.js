/* ============================================================
   BRASA BURGER · Agendamiento y pedidos a domicilio
   Los formularios arman un mensaje de WhatsApp pre-escrito.
   ============================================================ */
(function () {
  "use strict";

  const WHATSAPP = "56940443203";

  /* ---------- Tabs mesa / delivery ---------- */
  const tabMesa = document.getElementById("tabMesa");
  const tabDelivery = document.getElementById("tabDelivery");
  const formMesa = document.getElementById("formMesa");
  const formDelivery = document.getElementById("formDelivery");

  function activar(tab) {
    const esMesa = tab === "mesa";
    tabMesa.classList.toggle("is-activa", esMesa);
    tabDelivery.classList.toggle("is-activa", !esMesa);
    formMesa.classList.toggle("is-visible", esMesa);
    formDelivery.classList.toggle("is-visible", !esMesa);
  }

  tabMesa.addEventListener("click", () => activar("mesa"));
  tabDelivery.addEventListener("click", () => activar("delivery"));

  /* Si llegan con #delivery en la URL, abrir esa pestaña */
  if (window.location.hash === "#delivery") activar("delivery");
  else activar("mesa");

  /* ---------- Fecha mínima: hoy ---------- */
  const campoFecha = document.getElementById("mesaFecha");
  if (campoFecha) {
    const hoy = new Date();
    const mm = String(hoy.getMonth() + 1).padStart(2, "0");
    const dd = String(hoy.getDate()).padStart(2, "0");
    campoFecha.min = hoy.getFullYear() + "-" + mm + "-" + dd;
  }

  function abrirWhatsApp(mensaje) {
    const url = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(mensaje);
    window.open(url, "_blank", "noopener");
  }

  function fechaBonita(iso) {
    const [a, m, d] = iso.split("-").map(Number);
    const meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
    return d + " de " + meses[m - 1] + " de " + a;
  }

  /* ---------- Reserva de mesa ---------- */
  formMesa.addEventListener("submit", (e) => {
    e.preventDefault();
    const datos = new FormData(formMesa);
    const mensaje =
      "🍔 *RESERVA DE MESA · Brasa Burger*\n\n" +
      "👤 Nombre: " + datos.get("nombre") + "\n" +
      "📅 Fecha: " + fechaBonita(datos.get("fecha")) + "\n" +
      "🕐 Hora: " + datos.get("hora") + "\n" +
      "👥 Personas: " + datos.get("personas") + "\n" +
      (datos.get("comentario") ? "📝 Comentario: " + datos.get("comentario") + "\n" : "") +
      "\nQuedo atento(a) a la confirmación. ¡Gracias!";
    abrirWhatsApp(mensaje);
  });

  /* ---------- Pedido a domicilio ---------- */
  formDelivery.addEventListener("submit", (e) => {
    e.preventDefault();
    const datos = new FormData(formDelivery);
    const mensaje =
      "🛵 *PEDIDO A DOMICILIO · Brasa Burger*\n\n" +
      "👤 Nombre: " + datos.get("nombre") + "\n" +
      "📍 Dirección: " + datos.get("direccion") + ", " + datos.get("comuna") + "\n" +
      "🍔 Pedido:\n" + datos.get("pedido") + "\n" +
      "💳 Pago: " + datos.get("pago") + "\n" +
      (datos.get("nota") ? "📝 Nota: " + datos.get("nota") + "\n" : "") +
      "\n¿Me confirman total y tiempo de entrega? ¡Gracias!";
    abrirWhatsApp(mensaje);
  });
})();
