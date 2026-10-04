/* Gira Colombia '27 — navegación por páginas, slides, presupuesto, calendario. */
(function(){
  /* ---------- precios por bloque y nivel: [vuelos internacionales, en Colombia] ---------- */
  var P={
    "7":{aj:[670,800],medio:[770,1190],gustos:[1150,2010]},
    "10":{aj:[670,1130],medio:[770,1730],gustos:[1150,3050]},
    "15":{aj:[670,1560],medio:[820,2360],gustos:[1200,4030]}
  };
  var LAST_DAY={"7":8,"10":12,"15":15};
  var NIVEL_TXT={aj:"ajustado",medio:"medio",gustos:"con gustos"};
  var state={b:"15",l:"medio"};
  try{var s=JSON.parse(localStorage.getItem("gira27")||"null");if(s&&P[s.b]&&P[s.b][s.l])state=s;}catch(e){}
  function fmt(n){return "USD "+n.toLocaleString("es-AR");}
  window.GIRA_BLOQUE=state.b;

  function render(){
    var v=P[state.b][state.l];
    document.querySelectorAll(".total-out").forEach(function(o){o.textContent=fmt(v[0]+v[1]);});
    document.querySelectorAll(".seg-block button").forEach(function(x){x.setAttribute("aria-pressed",x.dataset.b===state.b);});
    document.querySelectorAll(".seg-level button").forEach(function(x){x.setAttribute("aria-pressed",x.dataset.l===state.l);});
    Object.keys(P).forEach(function(b){
      var w=P[b][state.l];
      var pe=document.querySelector('[data-price="'+b+'"]'); if(pe) pe.innerHTML=fmt(w[0]+w[1])+' <small>aprox.</small>';
      var bd=document.querySelector('[data-bd="'+b+'"]'); if(bd) bd.innerHTML='<div><span>Vuelos internacionales</span><span>'+fmt(w[0])+'</span></div><div><span>En Colombia y seguro</span><span>'+fmt(w[1])+'</span></div>';
      var card=document.querySelector('[data-blk="'+b+'"]'); if(card) card.classList.toggle("on",b===state.b);
    });
    document.querySelectorAll(".day").forEach(function(d){d.classList.toggle("out",+d.dataset.n>LAST_DAY[state.b]);});
    document.querySelectorAll(".cal-d[data-n]").forEach(function(d){d.classList.toggle("out",+d.dataset.n>LAST_DAY[state.b]);});
    /* costo de cada parada según el nivel */
    document.querySelectorAll(".stopcost").forEach(function(sc){
      var b=sc.querySelector("b[data-costs]"), n=sc.querySelector(".lvl-name"); if(!b||!n) return;
      if(!n.dataset.orig) n.dataset.orig=n.textContent;
      b.textContent="~USD "+JSON.parse(b.dataset.costs)[state.l].toLocaleString("es-AR");
      n.textContent=n.dataset.orig.replace("medio",NIVEL_TXT[state.l]);
    });
    document.querySelectorAll(".day-aj,.day-gu,.calc-t tr[data-l]").forEach(function(x){x.classList.toggle("on",x.dataset.l===state.l);});
    document.body.dataset.nivel=state.l;
    try{localStorage.setItem("gira27",JSON.stringify(state));}catch(e){}
    window.GIRA_BLOQUE=state.b;
    document.dispatchEvent(new CustomEvent("bloque:change",{detail:{b:state.b,l:state.l,last:LAST_DAY[state.b]}}));
  }
  document.addEventListener("click",function(e){
    var b=e.target.closest(".seg-block button"); if(b){state.b=b.dataset.b;render();return;}
    var l=e.target.closest(".seg-level button"); if(l){state.l=l.dataset.l;render();return;}
    var c=e.target.closest(".blk[data-blk]"); if(c){state.b=c.dataset.blk;render();}
  });

  /* ---------- medidores ---------- */
  document.querySelectorAll(".pips").forEach(function(p){var v=+p.dataset.v;for(var i=0;i<5;i++){var e=document.createElement("i");if(i<v)e.className="f";p.appendChild(e);}});

  /* ---------- curva de joda / naturaleza ---------- */
  (function(){
    var g=document.getElementById("curveg"); if(!g) return; var ns="http://www.w3.org/2000/svg";
    var vals=[5,5,3,2,1,1,3,2,4,5,4,2,2,2,1];
    var nat=[0,1,1,1,1,1,1,1,0,1,0,0,1,1,0];
    var X0=40,X1=620,Y0=24,Y1=150,n=vals.length,step=(X1-X0)/(n-1);
    function el(t,a){var e=document.createElementNS(ns,t);for(var k in a)e.setAttribute(k,a[k]);g.appendChild(e);return e;}
    function y(v){return Y1-(v/5)*(Y1-Y0);}
    for(var i=0;i<n;i++){if(nat[i])el("rect",{class:"band",x:X0+i*step-step/2,y:Y0-6,width:step,height:Y1-Y0+6});}
    [0,2.5,5].forEach(function(v){el("line",{class:"grid",x1:X0,x2:X1,y1:y(v),y2:y(v)});});
    el("text",{class:"ax",x:4,y:y(5)+4}).textContent="alto";
    el("text",{class:"ax",x:4,y:y(0)+4}).textContent="bajo";
    var pts=vals.map(function(v,i){return (X0+i*step)+","+y(v);}).join(" ");
    el("polygon",{class:"areaA",points:X0+","+Y1+" "+pts+" "+X1+","+Y1});
    el("polyline",{class:"lineA",points:pts});
    vals.forEach(function(v,i){el("circle",{class:"dot",cx:X0+i*step,cy:y(v),r:3});el("text",{class:"ax",x:X0+i*step,y:Y1+16,"text-anchor":"middle"}).textContent=String(i+9);});
    [["Medellín",0,2],["Minca",3,4],["Tayrona",5,5],["Palomino",6,7],["Cartagena",8,11],["San Andrés",12,14]].forEach(function(s){
      el("text",{class:"stop",x:X0+((s[1]+s[2])/2)*step,y:Y1+40,"text-anchor":"middle"}).textContent=s[0];
    });
  })();

  /* ---------- ids de paradas + fotos reales desde fotos/ ---------- */
  document.querySelectorAll("canvas.scene").forEach(function(cv){
    var slug=cv.dataset.scene, card=cv.closest(".slide");
    if(card) card.id="parada-"+slug;
    var img=new Image();
    img.className="scene-photo";
    img.alt=(cv.getAttribute("aria-label")||"").replace("Ilustración: ","Foto: ");
    img.onload=function(){cv.parentNode.insertBefore(img,cv);cv.hidden=true;};
    img.src="fotos/"+slug+".jpg";
  });

  /* ---------- calendario ---------- */
  (function(){
    var cal=document.getElementById("cal"); if(!cal) return;
    var COLOR={medellin:"var(--coral)",minca:"var(--sea)",tayrona:"#2E7D4F",palomino:"var(--sun)",cartagena:"#C4547A",sanandres:"var(--deep)"};
    var NOMBRE={medellin:"Medellín",minca:"Minca",tayrona:"Tayrona",palomino:"Palomino",cartagena:"Cartagena",sanandres:"San Andrés"};
    var dias={};
    document.querySelectorAll(".day").forEach(function(d){
      var card=d.closest(".slide"), cv=card&&card.querySelector("canvas.scene");
      dias[+d.dataset.n]={slug:cv?cv.dataset.scene:"",titulo:(d.querySelector("h3")||{}).textContent||""};
    });
    var VUELTA={8:"7",12:"10",15:"15"};
    var html=["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"].map(function(x){return '<div class="cal-h">'+x+'</div>';}).join("");
    for(var fecha=4; fecha<=24; fecha++){
      var n=fecha-8, d=dias[n];
      if(!d){ html+='<div class="cal-d cal-empty"><span class="cal-num">'+fecha+'</span></div>'; continue; }
      html+='<button type="button" class="cal-d" data-n="'+n+'" style="--c:'+COLOR[d.slug]+'">'+
        '<span class="cal-num">'+fecha+(fecha===11?' <em>feriado</em>':'')+'</span>'+
        (fecha===9?'<span class="cal-bday">cumple de Pancho</span>':'')+
        '<span class="cal-stop">'+NOMBRE[d.slug]+'</span>'+
        '<span class="cal-t">'+d.titulo+'</span>'+
        (VUELTA[n]?'<span class="cal-ret">✈ <span class="long">vuelven los de </span>'+VUELTA[n]+'<span class="long"> días</span></span>':'')+
      '</button>';
    }
    cal.innerHTML=html;
    cal.addEventListener("click",function(e){var b=e.target.closest(".cal-d[data-n]"); if(b) window.GIRA_VER_DIA(+b.dataset.n);});
    document.getElementById("calLegend").innerHTML=Object.keys(NOMBRE).map(function(k){return '<span><i style="background:'+COLOR[k]+'"></i>'+NOMBRE[k]+'</span>';}).join("");
  })();

  /* ---------- numeración de slides (rombo + n / total) ---------- */
  document.querySelectorAll(".page").forEach(function(pg){
    var sl=pg.querySelectorAll(".slide");
    sl.forEach(function(s,i){
      var r=s.querySelector(".rombo-n"); if(r) r.textContent=i+1;
      var c=s.querySelector(".slide-count"); if(c) c.textContent=(i+1)+" / "+sl.length;
    });
  });

  /* ---------- páginas ---------- */
  var PAGES=["inicio","dias","calendario","mapa","decisiones"];
  var ALIAS={viaje:"inicio",itinerario:"dias"};
  var actual="inicio";
  function showPage(p,opts){
    opts=opts||{};
    if(PAGES.indexOf(p)<0) p="inicio";
    actual=p;
    document.querySelectorAll(".page").forEach(function(m){m.hidden=m.dataset.page!==p;});
    document.querySelectorAll(".tabs button").forEach(function(b){b.setAttribute("aria-selected",b.dataset.page===p);});
    document.getElementById("subbar").hidden=["dias","calendario","mapa"].indexOf(p)<0;
    document.body.dataset.page=p; document.documentElement.dataset.page=p;
    if(p==="dias" && window.GIRA_PAINT) setTimeout(window.GIRA_PAINT,0);
    if(p==="mapa") document.dispatchEvent(new CustomEvent("mapa:show"));
    if(!opts.keepScroll) window.scrollTo(0,0);
    var sel=document.querySelector('.tabs [data-page="'+p+'"]'); if(sel&&sel.scrollIntoView) sel.scrollIntoView({block:"nearest",inline:"center"});
  }
  function fromHash(){
    var h=(location.hash||"").replace("#","");
    h=ALIAS[h]||h;
    if(h.indexOf("parada-")===0){ showPage("dias"); setTimeout(function(){var el=document.getElementById(h); if(el) el.scrollIntoView();},50); return; }
    showPage(PAGES.indexOf(h)>=0?h:"inicio");
  }
  document.querySelector(".tabs").addEventListener("click",function(e){
    var b=e.target.closest("button"); if(!b) return;
    if(location.hash==="#"+b.dataset.page) showPage(b.dataset.page); else location.hash=b.dataset.page;
  });
  window.addEventListener("hashchange",fromHash);

  window.GIRA_VER_DIA=function(n){
    showPage("dias");
    try{history.replaceState(null,"","#dias");}catch(err){}
    setTimeout(function(){
      var el=document.querySelector('.day[data-n="'+n+'"]'); if(!el) return;
      el.scrollIntoView({block:"center"});
      el.classList.add("flash"); setTimeout(function(){el.classList.remove("flash");},1600);
    },60);
  };
  window.GIRA_VER_PARADA=function(slug){
    showPage("dias");
    try{history.replaceState(null,"","#dias");}catch(err){}
    setTimeout(function(){var el=document.getElementById("parada-"+slug); if(el) el.scrollIntoView();},60);
  };

  /* ---------- flechas para pasar de slide ---------- */
  document.addEventListener("keydown",function(e){
    if(e.target.closest("input,textarea,select,[contenteditable]")||e.altKey||e.ctrlKey||e.metaKey) return;
    if(actual==="mapa") return;
    var dir=0;
    if(e.key==="ArrowDown"||e.key==="PageDown"||e.key==="ArrowRight") dir=1;
    if(e.key==="ArrowUp"||e.key==="PageUp"||e.key==="ArrowLeft") dir=-1;
    if(!dir) return;
    if(e.target.closest(".pax")) return;
    var sl=[].slice.call(document.querySelectorAll('.page[data-page="'+actual+'"] .slide'));
    if(!sl.length) return;
    var top=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h"))||60;
    var i=0;
    sl.forEach(function(s,k){ if(s.getBoundingClientRect().top - top <= 4) i=k; });
    var cur=sl[i].getBoundingClientRect();
    var target = dir>0 ? sl[Math.min(i+1,sl.length-1)] : (cur.top - top < -4 ? sl[i] : sl[Math.max(i-1,0)]);
    e.preventDefault();
    target.scrollIntoView({behavior:"smooth",block:"start"});
  });

  /* ---------- galería de fotos por parada + visor ---------- */
  (function(){
    var box=document.createElement("div");
    box.className="lightbox"; box.hidden=true;
    box.innerHTML='<button type="button" class="lb-close" aria-label="Cerrar">×</button><figure><img alt=""><figcaption></figcaption></figure>';
    document.body.appendChild(box);
    var bImg=box.querySelector("img"), bCap=box.querySelector("figcaption");
    function abrir(src,cap){ bImg.src=src; bImg.alt=cap; bCap.textContent=cap; box.hidden=false; box.querySelector(".lb-close").focus(); }
    function cerrar(){ box.hidden=true; bImg.removeAttribute("src"); }
    box.addEventListener("click",function(e){ if(e.target===box||e.target.closest(".lb-close")) cerrar(); });
    document.addEventListener("keydown",function(e){ if(e.key==="Escape"&&!box.hidden) cerrar(); });
    document.addEventListener("click",function(e){
      var ph=e.target.closest(".scene-photo, .day-photos img"); if(ph) abrir(ph.src,ph.alt.replace("Foto: ",""));
    });
  })();

  render();
  fromHash();
  if(window.GIRA_PAINT){ window.GIRA_PAINT(); var t; window.addEventListener("resize",function(){clearTimeout(t);t=setTimeout(window.GIRA_PAINT,150);}); }
})();
