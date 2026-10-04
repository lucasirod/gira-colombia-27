# Gira Colombia ’27

Página del viaje a Colombia (9 al 23 de enero de 2027): itinerario día por día, mapa, presupuesto por bloque (7, 10 y 15 días) y el proceso de decisión del grupo.

## Cómo está armado

| Archivo | Qué tiene |
|---|---|
| `index.html` | Toda la página: pestañas "El viaje" y "Decisiones" |
| `data/updates.js` | **Los updates del grupo** y quién está en el avión. Es lo que más se toca. |
| `js/app.js` | Selector de bloques, presupuesto, ilustraciones y pestañas |
| `js/decisiones.js` | El avión arrastrable (no guarda nada: se resetea al recargar) |
| `js/mapa.js` | Mapa con Leaflet + OpenStreetMap (paradas, tramos y puntos de vuelta) |
| `css/styles.css` | Estilos |
| `fotos/` | Fotos de las paradas y de las caras (ver `fotos/README.md`) |

## Cargar un update nuevo

En `data/updates.js`, agregar un objeto **al principio** de `UPDATES` con la fecha, el título, qué se decidió y el estado de cada persona (`adentro`, `pensando` o `afuera`, con `nota` para el blocker). La página muestra siempre el primero como "foto del día".

## Publicar con GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → Branch: `main` / `(root)` → Save. A los minutos queda en `https://lucasirod.github.io/gira-colombia-27/`.

Accesos directos: `#decisiones` abre el avión, `#mapa` abre el mapa.
