# La página y el repo

Publicada con GitHub Pages en https://lucasirod.github.io/gira-colombia-27/ (rama `main`, raíz).

## Estructura
- `index.html`: 5 páginas en slides a pantalla completa (formato tomado de la plantilla de presentaciones de Minders: chips arriba a la izquierda, rombo con número de slide, pie "n / total"), con la paleta propia del viaje.
  - **Inicio:** portada, por qué Colombia, por qué ahora, por qué enero, ¿solo joda?, presupuesto, vuelos, próximos pasos, tips.
  - **Día por día:** una slide por parada, título centrado con su "vibe", ilustración o foto, costo según nivel, medidores (joda, naturaleza, gente en enero), ajustado vs con gustos, hostels y los días.
  - **Calendario:** grilla de enero 2027, colores por parada, vueltas marcadas.
  - **Mapa:** Leaflet + tiles de OpenStreetMap (CARTO pide API key, por eso no se usa), lista de paradas al costado.
  - **Decisiones:** escena de aeropuerto (Argentina / check-in / avión con bandera de Colombia). Las caras se arrastran en vivo sin guardar; los estados salen de `data/updates.js`.
- Selector compartido: bloque (7/10/15) y nivel (ajustado/medio/con gustos), guardado en el navegador de cada uno.
- `js/app.js` (navegación, selector, calendario), `js/scenes.js` (ilustraciones), `js/decisiones.js` (avión), `js/mapa.js` (mapa), `css/styles.css`.

## Cómo se trabaja
- **Update del grupo:** agregar un objeto al principio de `UPDATES` en `data/updates.js`.
- **Fotos:** ya están cargadas (las pasó Lucas el 4/10). `fotos/portada.jpg` es el fondo de la portada; `fotos/galeria/` + `data/galeria.js` son las fotos extra por parada (se abren en un visor). `fotos/<parada>.jpg` (medellin, minca, tayrona, palomino, cartagena, sanandres) reemplazan la ilustración; `fotos/personas/<id>.jpg` reemplazan las iniciales. Horizontales 16:8 y livianas (<500 KB); caras cuadradas.
- **Caché:** después de tocar un `.js` o el `.css`, subir el `?v=` en `index.html`.
- **Accesos directos:** `#inicio`, `#dias`, `#calendario`, `#mapa`, `#decisiones`.
- El repo es público: nada sensible (plata de cada uno) va acá.

## Pendientes
- Cargar precios reales de hostels cuando Lucas los pase.
- Sumar updates a medida que el grupo decida.
- Opcional: contraseña simple (sería solo cosmética en GitHub Pages).
