/* Esconder montos: cambia cada monto en dólares de la página por "XXX" (ej. "USD 3.140" → "USD XXX").
   Arranca escondido en cada carga, para el suspenso; el switch de arriba los muestra.
   Las fechas y otros números quedan visibles: solo se tapan los que vienen con USD o $. */
(function(){
  var RE = /((?:USD|US\$|U\$S|\$)\s?)(\d+(?:[.,]\d+)*(?:\s?[–-]\s?\d+(?:[.,]\d+)*)?)/g;
  var toggle = document.getElementById("maskToggle");
  var on = true;
  var tocados = [];

  function tapar(t){ return t.replace(RE, function(_, pre, nro){ return pre + nro.replace(/\d+(?:[.,]\d+)*/g, "XXX"); }); }

  function taparNodo(n){
    var v = n.nodeValue;
    if(!v || !RE.test(v)){ RE.lastIndex = 0; return; }
    RE.lastIndex = 0;
    var nuevo = tapar(v);
    if(nuevo === v) return;
    n.__orig = v; n.__tapado = nuevo;
    n.nodeValue = nuevo;
    tocados.push(n);
  }
  function recorrer(raiz){
    if(raiz.nodeType === 3){ taparNodo(raiz); return; }
    if(raiz.nodeType !== 1 || /^(SCRIPT|STYLE)$/.test(raiz.nodeName)) return;
    var w = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT), n, lista = [];
    while((n = w.nextNode())) lista.push(n);
    lista.forEach(taparNodo);
  }
  function destapar(){
    tocados.forEach(function(n){ if(n.nodeValue === n.__tapado) n.nodeValue = n.__orig; });
    tocados = [];
  }

  /* lo que cambia después (totales, mapa, tooltips) se tapa al aparecer */
  var obs = new MutationObserver(function(muts){
    if(!on) return;
    muts.forEach(function(m){
      if(m.type === "characterData") taparNodo(m.target);
      else m.addedNodes.forEach(recorrer);
    });
  });

  function aplicar(v){
    on = v;
    document.documentElement.classList.toggle("masked", on);
    if(on){ recorrer(document.body); obs.observe(document.body, {childList:true, subtree:true, characterData:true}); }
    else{
      obs.disconnect(); destapar();
      document.body.classList.add("reveal-flash");
      setTimeout(function(){ document.body.classList.remove("reveal-flash"); }, 1000);
    }
  }

  if(toggle){
    toggle.checked = true;
    toggle.addEventListener("change", function(){ aplicar(toggle.checked); });
  }
  aplicar(true);
})();
