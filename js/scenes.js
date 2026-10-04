/* Ilustraciones de cada parada (se reemplazan solas si hay foto en fotos/<parada>.jpg) */
(function(){
  /* ---------- painted scenes ---------- */
  function rng(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
  function grad(c,x0,y0,x1,y1,stops){var g=c.createLinearGradient(x0,y0,x1,y1);stops.forEach(function(s){g.addColorStop(s[0],s[1]);});return g;}
  function ridge(c,w,h,base,amp,color,seed,fr){var r=rng(seed),p1=r()*6,p2=r()*6,p3=r()*6;c.beginPath();c.moveTo(0,h);for(var x=0;x<=w;x+=4){var t=x/w;var yy=base+amp*(Math.sin(t*fr*3+p1)*.5+Math.sin(t*fr*7+p2)*.3+Math.sin(t*fr*13+p3)*.2);c.lineTo(x,yy);}c.lineTo(w,h);c.closePath();c.fillStyle=color;c.fill();}
  function sun(c,x,y,r,col,glow){var g=c.createRadialGradient(x,y,r*.2,x,y,r*4);g.addColorStop(0,glow);g.addColorStop(1,"rgba(255,255,255,0)");c.fillStyle=g;c.fillRect(x-r*4,y-r*4,r*8,r*8);c.beginPath();c.arc(x,y,r,0,7);c.fillStyle=col;c.fill();}
  function palm(c,x,y,hgt,lean,col){c.strokeStyle=col;c.lineWidth=Math.max(2,hgt*.05);c.lineCap="round";var tx=x+lean,ty=y-hgt;c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(x+lean*.2,y-hgt*.6,tx,ty);c.stroke();c.lineWidth=Math.max(1.5,hgt*.035);for(var i=0;i<7;i++){var a=-Math.PI+i*(Math.PI/6)+.1,L=hgt*.45;c.beginPath();c.moveTo(tx,ty);c.quadraticCurveTo(tx+Math.cos(a)*L*.6,ty+Math.sin(a)*L*.6-L*.25,tx+Math.cos(a)*L,ty+Math.sin(a)*L*.4+L*.2);c.stroke();}}
  function mist(c,w,y,hh,alpha){var g=c.createLinearGradient(0,y-hh,0,y+hh);g.addColorStop(0,"rgba(255,255,255,0)");g.addColorStop(.5,"rgba(255,255,255,"+alpha+")");g.addColorStop(1,"rgba(255,255,255,0)");c.fillStyle=g;c.fillRect(0,y-hh,w,hh*2);}
  function birds(c,r,w,h,n,col){c.strokeStyle=col;c.lineWidth=1.5;for(var i=0;i<n;i++){var x=r()*w*.7+w*.15,y=r()*h*.25+h*.08,s=4+r()*5;c.beginPath();c.moveTo(x-s,y);c.quadraticCurveTo(x-s/2,y-s*.6,x,y);c.quadraticCurveTo(x+s/2,y-s*.6,x+s,y);c.stroke();}}

  var painters={
    medellin:function(c,w,h){var r=rng(7);
      c.fillStyle=grad(c,0,0,0,h,[[0,"#1B1F4B"],[.55,"#7A3E6E"],[.85,"#F08A5D"],[1,"#F6B26B"]]);c.fillRect(0,0,w,h);
      for(var i=0;i<60;i++){c.fillStyle="rgba(255,255,255,"+(r()*.7)+")";c.fillRect(r()*w,r()*h*.35,1.5,1.5);}
      ridge(c,w,h,h*.42,h*.12,"#3B2D5C",3,1.2);
      ridge(c,w,h,h*.55,h*.1,"#2A2448",11,1.6);
      ridge(c,w,h,h*.68,h*.06,"#1A1834",21,2.2);
      for(var k=0;k<520;k++){var x=r()*w,yy=h*.66+r()*h*.34;var col=r()<.7?"rgba(255,200,90,":"rgba(255,240,210,";c.fillStyle=col+(.45+r()*.55)+")";var s=r()*2+1;c.fillRect(x,yy,s,s);}
      c.strokeStyle="rgba(255,255,255,.55)";c.lineWidth=1.2;c.beginPath();c.moveTo(w*.62,h*.6);c.lineTo(w*.9,h*.38);c.stroke();
      [.68,.76,.84].forEach(function(t){var x=w*.62+(w*.28)*((t-.62)/.28),yy=h*.6-(h*.22)*((t-.62)/.28);c.fillStyle="#F2B705";c.fillRect(x-4,yy,8,6);});
    },
    minca:function(c,w,h){var r=rng(13);
      c.fillStyle=grad(c,0,0,0,h,[[0,"#F7C77E"],[.45,"#F3E3B5"],[1,"#CFE6D2"]]);c.fillRect(0,0,w,h);
      sun(c,w*.72,h*.32,h*.07,"#FFF4D6","rgba(255,214,140,.55)");
      ridge(c,w,h,h*.38,h*.1,"#8DB8A0",5,1.1);mist(c,w,h*.46,h*.06,.55);
      ridge(c,w,h,h*.5,h*.1,"#5E9A7A",9,1.5);mist(c,w,h*.58,h*.06,.45);
      ridge(c,w,h,h*.63,h*.09,"#3A7A5A",17,2);mist(c,w,h*.7,h*.05,.35);
      ridge(c,w,h,h*.78,h*.07,"#1F5640",23,2.8);
      for(var i=0;i<26;i++){var x=r()*w,yy=h*.8+r()*h*.18,s=6+r()*10;c.beginPath();c.arc(x,yy,s,0,7);c.fillStyle=r()<.5?"#174A35":"#246B48";c.fill();}
      c.strokeStyle="#7A4B2A";c.lineWidth=2;c.beginPath();c.moveTo(w*.12,h*.74);c.quadraticCurveTo(w*.2,h*.83,w*.28,h*.74);c.stroke();
      c.strokeStyle="#E4553B";c.lineWidth=5;c.beginPath();c.moveTo(w*.14,h*.765);c.quadraticCurveTo(w*.2,h*.83,w*.26,h*.765);c.stroke();
      birds(c,r,w,h,5,"rgba(40,60,50,.6)");
    },
    tayrona:function(c,w,h){var r=rng(19);
      c.fillStyle=grad(c,0,0,0,h*.5,[[0,"#8FD3F0"],[1,"#DDF3F7"]]);c.fillRect(0,0,w,h*.5);
      ridge(c,w,h,h*.3,h*.1,"#2E6B3F",4,1.4);ridge(c,w,h,h*.4,h*.08,"#1F5230",8,2.2);
      c.fillStyle=grad(c,0,h*.48,0,h*.8,[[0,"#0E8FA0"],[.6,"#25C1C0"],[1,"#7FE0D0"]]);c.fillRect(0,h*.48,w,h*.34);
      c.strokeStyle="rgba(255,255,255,.6)";c.lineWidth=1.5;for(var i=0;i<14;i++){var y=h*.55+r()*h*.22,x=r()*w;c.beginPath();c.moveTo(x,y);c.lineTo(x+20+r()*40,y);c.stroke();}
      c.fillStyle="#F2E2BC";c.beginPath();c.moveTo(0,h*.82);c.quadraticCurveTo(w*.5,h*.74,w,h*.84);c.lineTo(w,h);c.lineTo(0,h);c.fill();
      [[.78,.66,.16,.13],[.9,.6,.12,.16],[.68,.74,.09,.07],[.06,.7,.1,.1],[.97,.75,.08,.08]].forEach(function(b){c.beginPath();c.ellipse(w*b[0],h*b[1],w*b[2]*.5,h*b[3],0,0,7);c.fillStyle="#8A7A6C";c.fill();c.beginPath();c.ellipse(w*b[0]-w*b[2]*.12,h*b[1]-h*b[3]*.3,w*b[2]*.3,h*b[3]*.5,0,0,7);c.fillStyle="rgba(255,255,255,.12)";c.fill();});
      palm(c,w*.22,h*.86,h*.5,-h*.08,"#244A2C");palm(c,w*.3,h*.88,h*.42,h*.06,"#2E5A35");palm(c,w*.55,h*.86,h*.36,-h*.04,"#2E5A35");
    },
    palomino:function(c,w,h){var r=rng(29);
      c.fillStyle=grad(c,0,0,0,h*.55,[[0,"#F6A97A"],[.6,"#F9D9A8"],[1,"#F4EBD6"]]);c.fillRect(0,0,w,h*.55);
      ridge(c,w*.7,h,h*.28,h*.12,"#8C9DB8",31,1.2);
      c.fillStyle="#FFFFFF";c.beginPath();c.moveTo(w*.18,h*.2);c.lineTo(w*.24,h*.12);c.lineTo(w*.3,h*.2);c.closePath();c.fill();
      ridge(c,w*.75,h,h*.42,h*.08,"#4E7A5A",37,1.8);
      c.fillStyle=grad(c,w*.5,0,w,0,[[0,"#3FB5C0"],[1,"#127C9A"]]);c.beginPath();c.moveTo(w*.55,h*.5);c.lineTo(w,h*.45);c.lineTo(w,h);c.lineTo(w*.78,h);c.quadraticCurveTo(w*.66,h*.7,w*.55,h*.5);c.fill();
      c.fillStyle="#EED9AE";c.beginPath();c.moveTo(0,h*.55);c.lineTo(w*.55,h*.5);c.quadraticCurveTo(w*.66,h*.7,w*.78,h);c.lineTo(0,h);c.fill();
      c.strokeStyle="#6CC6D6";c.lineWidth=h*.06;c.lineCap="round";c.beginPath();c.moveTo(w*.2,h*.5);c.bezierCurveTo(w*.3,h*.62,w*.18,h*.74,w*.42,h*.8);c.quadraticCurveTo(w*.6,h*.86,w*.7,h*.8);c.stroke();
      c.fillStyle="#F2B705";[[.3,.66],[.4,.79]].forEach(function(p){c.beginPath();c.ellipse(w*p[0],h*p[1],10,6,0,0,7);c.fill();c.fillStyle="#E4553B";});
      palm(c,w*.06,h*.95,h*.55,h*.08,"#3B5A34");palm(c,w*.5,h*.96,h*.4,-h*.05,"#3B5A34");
    },
    cartagena:function(c,w,h){var r=rng(41);
      c.fillStyle=grad(c,0,0,0,h*.7,[[0,"#3C3A78"],[.45,"#C4547A"],[.8,"#F39A5E"],[1,"#FBD38D"]]);c.fillRect(0,0,w,h);
      sun(c,w*.82,h*.48,h*.08,"#FFE3A3","rgba(255,190,120,.6)");
      var cols=["#F2B705","#E4553B","#2B9C9A","#F6E6C8","#7DB6E8","#F08AA0","#9CCB6E","#F5A65B"];
      var x=0;while(x<w){var bw=w*(.07+r()*.06),bh=h*(.22+r()*.16),top=h*.7-bh;c.fillStyle=cols[Math.floor(r()*cols.length)];c.fillRect(x,top,bw+1,bh);
        c.fillStyle="#B0402F";c.fillRect(x-2,top-6,bw+5,7);
        c.fillStyle="rgba(30,30,50,.55)";for(var j=0;j<2;j++){c.fillRect(x+bw*.18+j*bw*.4,top+bh*.18,bw*.2,bh*.22);}
        c.fillStyle="#6B3E26";c.fillRect(x+bw*.1,top+bh*.48,bw*.8,4);for(var k=0;k<5;k++)c.fillRect(x+bw*.1+k*bw*.19,top+bh*.48,2,bh*.12);
        if(r()<.35){c.fillStyle="#3F8F3A";c.beginPath();c.arc(x+bw*.8,top+bh*.5,bw*.18,0,7);c.fill();c.fillStyle="#E85A9B";for(var q=0;q<6;q++){c.beginPath();c.arc(x+bw*.8+(r()-.5)*bw*.3,top+bh*.5+(r()-.5)*bw*.3,2.5,0,7);c.fill();}}
        x+=bw;}
      c.fillStyle="#B79A72";c.fillRect(0,h*.7,w,h*.3);
      c.fillStyle="#A5885F";for(var b=0;b<w;b+=w/18){c.fillRect(b,h*.66,w/36,h*.05);}
      c.strokeStyle="rgba(80,60,40,.35)";c.lineWidth=1;for(var yy=h*.74;yy<h;yy+=h*.06){c.beginPath();c.moveTo(0,yy);c.lineTo(w,yy);c.stroke();}
    },
    sanandres:function(c,w,h){var r=rng(53);
      c.fillStyle=grad(c,0,0,0,h*.4,[[0,"#6EC6F2"],[1,"#D7F1FB"]]);c.fillRect(0,0,w,h*.4);
      var bands=["#1B3F8F","#1F5FA8","#1E7FB8","#1BA1C2","#23BFC4","#5ED6C6","#A8EBD8"];
      bands.forEach(function(col,i){var y0=h*.38+i*h*.09;c.fillStyle=col;c.beginPath();c.moveTo(0,y0);for(var x=0;x<=w;x+=8){c.lineTo(x,y0+Math.sin(x/w*8+i)*h*.012);}c.lineTo(w,h);c.lineTo(0,h);c.fill();});
      c.fillStyle="rgba(255,255,255,.7)";[[.25,.18],[.6,.12],[.82,.22]].forEach(function(p){c.beginPath();c.ellipse(w*p[0],h*p[1],w*.06,h*.03,0,0,7);c.ellipse(w*p[0]+w*.04,h*p[1]-h*.015,w*.04,h*.03,0,0,7);c.fill();});
      c.fillStyle="#F6EBCF";c.beginPath();c.ellipse(w*.62,h*.5,w*.13,h*.05,0,0,7);c.fill();
      c.fillStyle="#2F7A3E";c.beginPath();c.ellipse(w*.62,h*.47,w*.08,h*.04,0,0,7);c.fill();
      palm(c,w*.58,h*.49,h*.2,-h*.03,"#21502A");palm(c,w*.64,h*.49,h*.24,h*.03,"#21502A");palm(c,w*.67,h*.5,h*.16,h*.04,"#2E6A38");
      c.fillStyle="#FFFFFF";c.beginPath();c.moveTo(w*.22,h*.7);c.lineTo(w*.3,h*.7);c.lineTo(w*.28,h*.73);c.lineTo(w*.235,h*.73);c.fill();c.fillStyle="#E4553B";c.fillRect(w*.235,h*.685,w*.03,h*.015);
      c.strokeStyle="rgba(255,255,255,.7)";c.lineWidth=1.5;for(var i=0;i<6;i++){var x=w*.15+r()*w*.25,y=h*.72+r()*h*.06;c.beginPath();c.moveTo(x,y);c.lineTo(x+25,y);c.stroke();}
    }
  };
  function paintAll(){
    document.querySelectorAll("canvas.scene").forEach(function(cv){
      var rect=cv.getBoundingClientRect();if(!rect.width)return;var dpr=Math.min(window.devicePixelRatio||1,2);
      cv.width=Math.round(rect.width*dpr);cv.height=Math.round(rect.height*dpr);
      var c=cv.getContext("2d");c.setTransform(dpr,0,0,dpr,0,0);
      var f=painters[cv.dataset.scene];if(f)f(c,rect.width,rect.height);
    });
  }
  window.GIRA_PAINT=paintAll;
})();
