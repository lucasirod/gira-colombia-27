/* Proceso de decisión: el avión arrastrable + la lista de updates.
   Los datos vienen de data/updates.js. Lo que se arrastra NO se guarda:
   al recargar (o con "Volver a la foto del día") vuelve al update elegido. */
(function(){
  var PERSONAS = window.PERSONAS || [];
  var UPDATES = window.UPDATES || [];
  if(!UPDATES.length) return;

  var COLORES = ["#F2B705","#3CC2BE","#F07A62","#7FA9E0","#9CCB6E","#F08AA0","#F5A65B","#B9A3E8"];
  var MESES = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
  var stage = document.getElementById("stage");
  var zones = {};
  stage.querySelectorAll(".zone").forEach(function(z){ zones[z.dataset.zone] = z.querySelector(".slots"); });
  var tokens = {};
  var actual = 0;

  function fechaLarga(iso){
    var p = iso.split("-");
    return parseInt(p[2],10) + " " + MESES[parseInt(p[1],10)-1] + " " + p[0];
  }
  function iniciales(n){ return n.normalize("NFD").replace(/[̀-ͯ]/g,"").slice(0,2).toUpperCase(); }

  /* fichas de cada persona */
  PERSONAS.forEach(function(p, i){
    var el = document.createElement("div");
    el.className = "pax";
    el.dataset.id = p.id;
    el.setAttribute("role","button");
    el.setAttribute("tabindex","0");
    el.setAttribute("aria-label", p.nombre + ": arrastrar para cambiar de lugar");
    el.innerHTML = '<span class="face"></span><span class="nm"></span><span class="pax-note"></span>';
    var face = el.querySelector(".face");
    face.style.background = COLORES[i % COLORES.length];
    face.textContent = iniciales(p.nombre);
    el.querySelector(".nm").textContent = p.nombre;
    var img = new Image();
    img.onload = function(){ face.textContent = ""; face.style.backgroundImage = "url('" + img.src + "')"; };
    img.src = "fotos/personas/" + p.id + ".jpg";
    tokens[p.id] = el;
  });

  function contar(){
    var c = {adentro:0, pensando:0, afuera:0};
    Object.keys(zones).forEach(function(k){ c[k] = zones[k].children.length; });
    document.getElementById("snapCount").textContent =
      c.adentro + " adentro · " + c.pensando + " pensando · " + c.afuera + " afuera";
  }

  function cargarFoto(idx){
    actual = idx;
    var u = UPDATES[idx];
    PERSONAS.forEach(function(p){
      var info = (u.estados && u.estados[p.id]) || {estado:"pensando"};
      var el = tokens[p.id];
      el.classList.remove("moved");
      el.querySelector(".pax-note").textContent = info.nota || "";
      el.title = info.nota ? p.nombre + ": " + info.nota : p.nombre;
      el.dataset.orig = info.estado;
      (zones[info.estado] || zones.pensando).appendChild(el);
    });
    document.getElementById("snapLabel").textContent = "Foto del " + fechaLarga(u.fecha) + " · " + u.titulo;
    document.querySelectorAll(".upd").forEach(function(b, i){ b.classList.toggle("on", i === idx); });
    contar();
  }

  /* lista de updates */
  var cont = document.getElementById("updates");
  UPDATES.forEach(function(u, i){
    var b = document.createElement("button");
    b.type = "button";
    b.className = "upd";
    var who = PERSONAS.map(function(p){
      var info = (u.estados && u.estados[p.id]) || {estado:"pensando"};
      return '<span class="st st-' + info.estado + '" title="' + (info.nota || "").replace(/"/g,"&quot;") + '">' + p.nombre + ' · ' + info.estado + '</span>';
    }).join("");
    var dec = (u.decisiones || []).map(function(d){ return "<li>" + d + "</li>"; }).join("");
    b.innerHTML =
      '<span class="when">' + fechaLarga(u.fecha) + (i === 0 ? " · último" : "") + '</span>' +
      '<h3>' + u.titulo + '</h3>' +
      (u.resumen ? '<p>' + u.resumen + '</p>' : '') +
      (dec ? '<ul>' + dec + '</ul>' : '') +
      '<div class="who">' + who + '</div>' +
      (u.proximo ? '<div class="next"><strong>Próximo paso:</strong> ' + u.proximo + '</div>' : '');
    b.addEventListener("click", function(){ cargarFoto(i); stage.scrollIntoView({behavior:"smooth", block:"center"}); });
    cont.appendChild(b);
  });

  document.getElementById("resetSnap").addEventListener("click", function(){ cargarFoto(actual); });

  /* arrastrar (mouse y touch) */
  var drag = null;
  function zonaEn(x, y){
    var el = document.elementFromPoint(x, y);
    var z = el && el.closest(".zone");
    return z ? z.dataset.zone : null;
  }
  function marcar(zn){
    stage.querySelectorAll(".zone").forEach(function(z){ z.classList.toggle("over", z.dataset.zone === zn); });
  }
  stage.addEventListener("pointerdown", function(e){
    var el = e.target.closest(".pax");
    if(!el || e.button > 0) return;
    e.preventDefault();
    var g = el.cloneNode(true);
    g.classList.add("ghost");
    g.style.left = e.clientX + "px"; g.style.top = e.clientY + "px";
    document.body.appendChild(g);
    el.classList.add("dragging");
    drag = {el:el, ghost:g, id:e.pointerId};
    try{ stage.setPointerCapture(e.pointerId); }catch(err){}
  });
  stage.addEventListener("pointermove", function(e){
    if(!drag) return;
    drag.ghost.style.left = e.clientX + "px"; drag.ghost.style.top = e.clientY + "px";
    marcar(zonaEn(e.clientX, e.clientY));
  });
  function soltar(e){
    if(!drag) return;
    var zn = zonaEn(e.clientX, e.clientY);
    drag.ghost.remove();
    drag.el.classList.remove("dragging");
    if(zn && zones[zn]){
      zones[zn].appendChild(drag.el);
      drag.el.classList.toggle("moved", zn !== drag.el.dataset.orig);
    }
    marcar(null);
    drag = null;
    contar();
  }
  stage.addEventListener("pointerup", soltar);
  stage.addEventListener("pointercancel", function(e){ if(drag){ drag.ghost.remove(); drag.el.classList.remove("dragging"); marcar(null); drag = null; } });

  /* teclado: Enter/espacio mueve a la zona siguiente */
  stage.addEventListener("keydown", function(e){
    var el = e.target.closest(".pax");
    if(!el || (e.key !== "Enter" && e.key !== " ")) return;
    e.preventDefault();
    var orden = ["adentro","pensando","afuera"];
    var cur = el.closest(".zone").dataset.zone;
    var next = orden[(orden.indexOf(cur) + 1) % 3];
    zones[next].appendChild(el);
    el.classList.toggle("moved", next !== el.dataset.orig);
    el.focus();
    contar();
  });

  cargarFoto(0);
})();
