/* Gira Colombia '27 — navegación por páginas, slides, presupuesto (con modo mix), calendario. */
(function(){
  /* ---------- modelo de costos ----------
     Vuelos internacionales y seguro: según el nivel elegido arriba.
     Alojamiento y comida por noche/día: tabla "Cómo lo calculamos" de cada parada (index.html).
     Actividades y traslados de cada día: data-m (medio) en cada .day, menos lo que recorta "ajustado" y más lo que suma "con gustos". */
  var LV=["aj","medio","gustos"];
  var INTL={"7":{aj:670,medio:770,gustos:1150},"10":{aj:670,medio:770,gustos:1150},"15":{aj:670,medio:820,gustos:1200}};
  var SEG={"7":{aj:35,medio:50,gustos:80},"10":{aj:45,medio:65,gustos:100},"15":{aj:60,medio:85,gustos:130}};
  var NOCHES={"7":7,"10":11,"15":14};       /* última noche que se duerme en Colombia */
  var COMIDA={"7":8,"10":12,"15":14};       /* último día con comida y salidas */
  var LAST_DAY={"7":8,"10":12,"15":15};
  var NIVEL_TXT={aj:"ajustado",medio:"medio",gustos:"con gustos",mix:"mix"};
  function num(t){ var m=String(t||"").replace(/\./g,"").match(/\d+/); return m?+m[0]:0; }
  function fmt(n){ return "USD "+Math.round(n).toLocaleString("es-AR"); }

  var STOPS=[];
  document.querySelectorAll('.page[data-page="dias"] .slide.stopcard').forEach(function(sl){
    var cv=sl.querySelector("canvas.scene"); if(!cv) return;
    var st={slug:cv.dataset.scene, el:sl, aloj:{}, com:{}, days:[]};
    sl.querySelectorAll(".calc-t tbody tr[data-l]").forEach(function(tr){
      st.aloj[tr.dataset.l]=num(tr.querySelector(".c-aloj").textContent);
      st.com[tr.dataset.l]=num(tr.querySelector(".c-com").textContent);
    });
    sl.querySelectorAll(".day[data-n]").forEach(function(d){
      var m=+d.dataset.m||0, aj=d.querySelector(".day-aj:not(.empty) .amt"), gu=d.querySelector(".day-gu:not(.empty) .amt");
      st.days.push({n:+d.dataset.n, el:d, c:{medio:m, aj:aj?Math.max(0,m-num(aj.textContent)):m, gustos:gu?m+num(gu.textContent):m}});
    });
    STOPS.push(st);
  });

  var state={b:"15",l:"medio",mix:false,sel:{aloj:{},com:{},day:{}}};
  try{var sv=JSON.parse(localStorage.getItem("gira27")||"null"); if(sv&&INTL[sv.b]&&INTL[sv.b][sv.l]){state.b=sv.b;state.l=sv.l;state.mix=!!sv.mix;if(sv.sel&&sv.sel.day)state.sel=sv.sel;}}catch(e){}
  window.GIRA_BLOQUE=state.b;

  function selAll(l){
    STOPS.forEach(function(st){ state.sel.aloj[st.slug]=l; state.sel.com[st.slug]=l; st.days.forEach(function(d){ state.sel.day[d.n]=l; }); });
  }
  if(!state.sel.day[1]) selAll(state.l);
  function pick(kind,key){ return state.mix ? (state.sel[kind][key]||state.l) : state.l; }

  /* costo de una parada; lvl fuerza un nivel puro (para las tarjetas de bloque) */
  function stopCost(st,b,lvl){
    var t=0;
    st.days.forEach(function(d){
      var n=d.n;
      if(n<=NOCHES[b]) t+=st.aloj[lvl||pick("aloj",st.slug)]||0;
      if(n<=COMIDA[b]) t+=st.com[lvl||pick("com",st.slug)]||0;
      if(n<=LAST_DAY[b]){
        if(b==="10"&&n===12) t+=10;           /* los de 10 días: traslado al aeropuerto */
        else t+=d.c[lvl||pick("day",n)];
      }
    });
    return t;
  }
  function total(b,lvl){
    var l=lvl||state.l, local=SEG[b][l];
    STOPS.forEach(function(st){ local+=stopCost(st,b,lvl); });
    return {intl:INTL[b][l], local:local, sum:INTL[b][l]+local};
  }

  function render(){
    var tot=total(state.b);
    document.querySelectorAll(".total-out").forEach(function(o){o.textContent=fmt(tot.sum);});
    document.querySelectorAll(".seg-block button").forEach(function(x){x.setAttribute("aria-pressed",x.dataset.b===state.b);});
    document.querySelectorAll(".seg-level button").forEach(function(x){x.setAttribute("aria-pressed",!state.mix&&x.dataset.l===state.l);});
    var tg=document.getElementById("mixToggle"); if(tg) tg.checked=state.mix;
    document.body.dataset.mix=state.mix?"on":"off";
    document.querySelectorAll(".mix-hint").forEach(function(h){h.hidden=!state.mix;});
    ["7","10","15"].forEach(function(b){
      var w=total(b,state.l);
      var pe=document.querySelector('[data-price="'+b+'"]'); if(pe) pe.innerHTML=fmt(w.sum)+' <small>aprox.</small>';
      var bd=document.querySelector('[data-bd="'+b+'"]'); if(bd) bd.innerHTML='<div><span>Vuelos internacionales</span><span>'+fmt(w.intl)+'</span></div><div><span>En Colombia y seguro</span><span>'+fmt(w.local)+'</span></div>';
      var card=document.querySelector('[data-blk="'+b+'"]'); if(card) card.classList.toggle("on",b===state.b);
    });
    STOPS.forEach(function(st){
      var b=st.el.querySelector(".stopcost b"), n=st.el.querySelector(".lvl-name");
      if(b) b.textContent="~"+fmt(stopCost(st,"15"));
      if(n){ if(!n.dataset.orig) n.dataset.orig=n.textContent; n.textContent=n.dataset.orig.replace("medio",state.mix?"mix":NIVEL_TXT[state.l]); }
      var la=pick("aloj",st.slug), lc=pick("com",st.slug);
      st.el.querySelectorAll(".calc-t tbody tr[data-l]").forEach(function(tr){
        tr.querySelector(".c-aloj").classList.toggle("on",tr.dataset.l===la);
        tr.querySelector(".c-com").classList.toggle("on",tr.dataset.l===lc);
      });
      st.days.forEach(function(d){
        var l=pick("day",d.n);
        d.el.querySelectorAll(".day-aj,.day-me,.day-gu").forEach(function(c){c.classList.toggle("on",!c.classList.contains("empty")&&c.dataset.l===l);});
      });
    });
    document.querySelectorAll(".day").forEach(function(d){d.classList.toggle("out",+d.dataset.n>LAST_DAY[state.b]);});
    document.querySelectorAll(".cal-d[data-n]").forEach(function(d){d.classList.toggle("out",+d.dataset.n>LAST_DAY[state.b]);});
    try{localStorage.setItem("gira27",JSON.stringify(state));}catch(e){}
    window.GIRA_BLOQUE=state.b;
    document.dispatchEvent(new CustomEvent("bloque:change",{detail:{b:state.b,l:state.l,last:LAST_DAY[state.b]}}));
  }
  function enableMix(){ if(!state.mix){ state.mix=true; selAll(state.l); } }

  /* celdas clickeables */
  document.querySelectorAll(".day-aj:not(.empty),.day-me,.day-gu:not(.empty),.c-aloj,.c-com").forEach(function(c){
    c.setAttribute("role","button"); c.setAttribute("tabindex","0");
  });
  function clickCell(c){
    var day=c.closest(".day[data-n]");
    if(day && c.matches(".day-aj,.day-me,.day-gu")){ enableMix(); state.sel.day[+day.dataset.n]=c.dataset.l; render(); return true; }
    if(c.matches(".c-aloj,.c-com")){
      var sl=c.closest(".slide"), cv=sl&&sl.querySelector("canvas.scene"); if(!cv) return false;
      enableMix(); state.sel[c.matches(".c-aloj")?"aloj":"com"][cv.dataset.scene]=c.closest("tr").dataset.l; render(); return true;
    }
    return false;
  }
  document.addEventListener("click",function(e){
    var b=e.target.closest(".seg-block button"); if(b){state.b=b.dataset.b;render();return;}
    var l=e.target.closest(".seg-level button"); if(l){state.l=l.dataset.l; if(state.mix) selAll(state.l); render();return;}
    var card=e.target.closest(".blk[data-blk]"); if(card){state.b=card.dataset.blk;render();return;}
    var c=e.target.closest(".day-aj:not(.empty),.day-me,.day-gu:not(.empty),.c-aloj,.c-com"); if(c) clickCell(c);
  });
  document.addEventListener("keydown",function(e){
    if(e.key!=="Enter"&&e.key!==" ") return;
    var c=e.target.closest&&e.target.closest(".day-aj:not(.empty),.day-me,.day-gu:not(.empty),.c-aloj,.c-com");
    if(c){ e.preventDefault(); clickCell(c); }
  });
  var tg=document.getElementById("mixToggle");
  if(tg) tg.addEventListener("change",function(){ state.mix=tg.checked; if(state.mix&&!state.sel.day[1]) selAll(state.l); render(); });

  /* ---------- medidores ---------- */
  document.querySelectorAll(".pips").forEach(function(p){var v=+p.dataset.v;for(var i=0;i<5;i++){var e=document.createElement("i");if(i<v)e.className="f";p.appendChild(e);}});

  /* ---------- curva de joda / naturaleza ---------- */
  (function(){
    var g=document.getElementById("curveg"); if(!g) return; var ns="http://www.w3.org/2000/svg";
    var joda=[5,5,3,2,1,1,3,2,4,5,4,2,2,2,1];   /* nivel de salida esa noche, 0 a 5 */
    var nat =[0,3,3,3,4,5,5,3,1,3,0,2,5,4,1];   /* contacto con la naturaleza ese día, 0 a 5 */
    var X0=40,X1=620,Y0=24,Y1=150,n=joda.length,step=(X1-X0)/(n-1);
    function el(t,a){var e=document.createElementNS(ns,t);for(var k in a)e.setAttribute(k,a[k]);g.appendChild(e);return e;}
    function y(v){return Y1-(v/5)*(Y1-Y0);}
    /* curva suave (Catmull-Rom → Bézier) */
    function camino(vals){
      var P=vals.map(function(v,i){return [X0+i*step,y(v)];}), d="M"+P[0][0]+","+P[0][1];
      for(var i=0;i<P.length-1;i++){
        var p0=P[i-1]||P[i], p1=P[i], p2=P[i+1], p3=P[i+2]||p2;
        d+=" C"+(p1[0]+(p2[0]-p0[0])/6)+","+Math.min(Y1,Math.max(Y0,p1[1]+(p2[1]-p0[1])/6))+" "+(p2[0]-(p3[0]-p1[0])/6)+","+Math.min(Y1,Math.max(Y0,p2[1]-(p3[1]-p1[1])/6))+" "+p2[0]+","+p2[1];
      }
      return d;
    }
    [0,2.5,5].forEach(function(v){el("line",{class:"grid",x1:X0,x2:X1,y1:y(v),y2:y(v)});});
    el("text",{class:"ax",x:4,y:y(5)+4}).textContent="alto";
    el("text",{class:"ax",x:4,y:y(0)+4}).textContent="bajo";
    el("path",{class:"lineN",d:camino(nat)});
    el("path",{class:"lineA",d:camino(joda)});
    joda.forEach(function(v,i){el("text",{class:"ax",x:X0+i*step,y:Y1+16,"text-anchor":"middle"}).textContent=String(i+9);});
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
