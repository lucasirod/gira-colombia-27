/* Vista mapa con Leaflet + OpenStreetMap/CARTO (gratis, sin API key). */
(function(){
  if(!window.L) return;

  var PARADAS = [
    {slug:"medellin", inicio:1,  n:1, nombre:"Medellín",   ll:[6.2088,-75.5673],  dias:"sáb 9 → mar 12 · 3 noches", costo:"~USD 400",
     txt:"Noche en Provenza, Guatapé y parapente en San Félix. La parada más fuerte de noche."},
    {slug:"minca", inicio:4,     n:2, nombre:"Minca",      ll:[11.1427,-74.1191], dias:"mar 12 → jue 14 · 2 noches", costo:"~USD 250 con el vuelo",
     txt:"Pueblo en la Sierra Nevada: cascadas, café y hamacas mirando el valle."},
    {slug:"tayrona", inicio:6,   n:3, nombre:"Tayrona",    ll:[11.3290,-73.9264], dias:"jue 14 → vie 15 · 1 noche", costo:"~USD 90",
     txt:"Caminata por la selva hasta Cabo San Juan y noche en hamaca frente al mar."},
    {slug:"palomino", inicio:7,  n:4, nombre:"Palomino",   ll:[11.2457,-73.5617], dias:"vie 15 → dom 17 · 2 noches", costo:"~USD 175",
     txt:"Tubing por el río hasta el mar, playa salvaje y fiesta de hostel."},
    {slug:"cartagena", inicio:9, n:5, nombre:"Cartagena",  ll:[10.4199,-75.5470], dias:"dom 17 → mié 20 · 3 noches", costo:"~USD 480",
     txt:"Getsemaní de noche, barco a Cholón y ciudad amurallada."},
    {slug:"sanandres", inicio:13, n:6, nombre:"San Andrés", ll:[12.5847,-81.7006], dias:"mié 20 → sáb 23 · 3 noches", costo:"~USD 540 con el vuelo",
     txt:"Mar de siete colores: Johnny Cay, el Acuario y vuelta a la isla en carrito."}
  ];
  var EXTRAS = [
    {nombre:"Guatapé · Piedra del Peñol", ll:[6.2209,-75.1785], dia:2, txt:"Dom 10: excursión de día desde Medellín."},
    {nombre:"San Félix · parapente", ll:[6.3420,-75.6010], dia:3, txt:"Lun 11 (feriado): vuelo en tándem sobre el valle."},
    {nombre:"Cholón", ll:[10.1760,-75.7400], dia:10, txt:"Lun 18: barco de fiesta desde Cartagena."},
    {nombre:"Johnny Cay", ll:[12.6005,-81.6889], dia:13, txt:"Jue 21: primera lancha de la mañana."}
  ];
  var VUELTAS = [
    {b:"7",  nombre:"Aeropuerto de Santa Marta", ll:[11.1196,-74.2306], txt:"Sáb 16: vuelven los de 7 días."},
    {b:"10", nombre:"Aeropuerto de Cartagena",   ll:[10.4424,-75.5130], txt:"Mié 20: vuelven los de 10 días."},
    {b:"15", nombre:"Aeropuerto de San Andrés",  ll:[12.5836,-81.7112], txt:"Sáb 23: vuelven los de 15 días."}
  ];
  /* tramos: tipo "vuelo" o "tierra", y día en que se hacen */
  var TRAMOS = [
    {de:[6.1645,-75.4231], a:[11.1196,-74.2306], tipo:"vuelo", dia:4},          /* MDE → SMR */
    {de:[11.1196,-74.2306], a:[11.1427,-74.1191], tipo:"tierra", dia:4},
    {de:[11.1427,-74.1191], a:[11.2878,-73.9078], tipo:"tierra", dia:6},
    {de:[11.2878,-73.9078], a:[11.3290,-73.9264], tipo:"tierra", dia:6},
    {de:[11.3290,-73.9264], a:[11.2457,-73.5617], tipo:"tierra", dia:7},
    {de:[11.2457,-73.5617], a:[11.2408,-74.1990], tipo:"tierra", dia:9},        /* Palomino → Santa Marta */
    {de:[11.2408,-74.1990], a:[10.4199,-75.5470], tipo:"tierra", dia:9},        /* → Cartagena */
    {de:[10.4424,-75.5130], a:[12.5836,-81.7112], tipo:"vuelo", dia:13}         /* CTG → ADZ */
  ];
  var LAST = {"7":8, "10":12, "15":15};

  var map = null, capas = {pins:[], tramos:[], vueltas:[]};

  function css(v){ return getComputedStyle(document.documentElement).getPropertyValue(v).trim(); }
  function oscuro(){
    var t = document.documentElement.getAttribute("data-theme");
    if(t) return t === "dark";
    return window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function gmaps(ll, q){ return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q || (ll[0] + "," + ll[1])); }

  function iniciar(){
    if(map){ map.invalidateSize(); return; }
    map = L.map("map", {scrollWheelZoom:false, zoomControl:true});
    var url = oscuro()
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
    L.tileLayer(url, {
      maxZoom: 18, subdomains: "abcd",
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map);

    TRAMOS.forEach(function(t){
      var linea = t.tipo === "vuelo"
        ? L.polyline(curva(t.de, t.a), {color: css("--deep") || "#1D4E89", weight:3, dashArray:"8 8"})
        : L.polyline([t.de, t.a], {color: css("--coral") || "#E4553B", weight:4});
      linea.addTo(map); linea._dia = t.dia; capas.tramos.push(linea);
    });

    EXTRAS.forEach(function(x){
      var m = L.marker(x.ll, {icon: L.divIcon({className:"", html:'<div class="pin-side"></div>', iconSize:[12,12], iconAnchor:[6,6]})})
        .bindPopup('<div class="pop"><h4>' + x.nombre + '</h4><p>' + x.txt + '</p><div class="acts"><a href="' + gmaps(x.ll, x.nombre + ", Colombia") + '" target="_blank" rel="noopener">Abrir en Google Maps</a></div></div>')
        .addTo(map);
      m._dia = x.dia; capas.pins.push(m);
    });

    VUELTAS.forEach(function(v){
      var m = L.marker(v.ll, {icon: L.divIcon({className:"", html:'<div class="pin-ret"></div>', iconSize:[16,16], iconAnchor:[8,8]}), zIndexOffset:500})
        .bindPopup('<div class="pop"><h4>' + v.nombre + '</h4><p>' + v.txt + '</p></div>')
        .addTo(map);
      m._b = v.b; capas.vueltas.push(m);
    });

    PARADAS.forEach(function(p){
      var m = L.marker(p.ll, {icon: L.divIcon({className:"", html:'<div class="pin"><b>' + p.n + '</b></div>', iconSize:[30,30], iconAnchor:[15,30], popupAnchor:[0,-28]}), zIndexOffset:1000})
        .bindPopup(
          '<div class="pop"><h4>' + p.n + '. ' + p.nombre + '</h4>' +
          '<div class="meta">' + p.dias + ' · ' + p.costo + ' por persona</div>' +
          '<p>' + p.txt + '</p>' +
          '<div class="acts"><button type="button" data-ver="' + p.slug + '">Ver los días</button>' +
          '<a href="' + gmaps(p.ll, p.nombre + ", Colombia") + '" target="_blank" rel="noopener">Abrir en Google Maps</a></div></div>'
        )
        .addTo(map);
      m._dia = p.inicio; m._principal = true; capas.pins.push(m);
    });

    map.fitBounds(L.latLngBounds(PARADAS.map(function(p){ return p.ll; })).pad(0.15));
    map.on("popupopen", function(e){
      var b = e.popup.getElement().querySelector("[data-ver]");
      if(b) b.addEventListener("click", function(){ map.closePopup(); window.GIRA_VER_PARADA && window.GIRA_VER_PARADA(b.dataset.ver); });
    });
    aplicarBloque(window.GIRA_BLOQUE || "15");
  }

  /* arco suave para los vuelos */
  function curva(a, b){
    var pts = [], mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
    var dx = b[1] - a[1], dy = b[0] - a[0];
    var cx = mx + dx * 0.18, cy = my - dy * 0.18;
    for(var i = 0; i <= 24; i++){
      var t = i / 24;
      pts.push([(1-t)*(1-t)*a[0] + 2*(1-t)*t*cx + t*t*b[0], (1-t)*(1-t)*a[1] + 2*(1-t)*t*cy + t*t*b[1]]);
    }
    return pts;
  }

  function aplicarBloque(b){
    if(!map) return;
    var last = LAST[b] || 15;
    capas.tramos.forEach(function(l){ l.setStyle({opacity: l._dia <= last ? 0.9 : 0.15}); });
    capas.pins.forEach(function(m){
      var fuera = m._dia > last;
      var el = m.getElement(); if(el) el.style.opacity = fuera ? 0.35 : 1;
    });
    capas.vueltas.forEach(function(m){ var el = m.getElement(); if(el) el.style.opacity = m._b === b ? 1 : 0.35; });
  }

  document.addEventListener("mapa:show", function(){ setTimeout(iniciar, 30); });
  document.addEventListener("bloque:change", function(e){ aplicarBloque(e.detail.b); });
})();
