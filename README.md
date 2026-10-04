# Gira Colombia ’27

Página del viaje a Colombia (9 al 23 de enero de 2027): itinerario día por día, mapa, presupuesto por bloque (7, 10 y 15 días) y el proceso de decisión del grupo.

## Cómo está armado

| Archivo | Qué tiene |
|---|---|
| `index.html` | Toda la página, en slides: Inicio, Día por día, Calendario, Mapa y Decisiones |
| `data/updates.js` | **Los updates del grupo** y quién está en el avión. Es lo que más se toca. |
| `js/app.js` | Navegación entre páginas, selector de bloques y nivel, presupuesto y calendario |
| `js/scenes.js` | Ilustraciones de cada parada (si hay foto en `fotos/`, se usa la foto) |
| `js/decisiones.js` | El avión arrastrable (no guarda nada: se resetea al recargar) |
| `js/mapa.js` | Mapa con Leaflet + OpenStreetMap (paradas, tramos y puntos de vuelta) |
| `css/styles.css` | Estilos |
| `fotos/` | Fotos de las paradas y de las caras (ver `fotos/README.md`) |

## Cargar un update nuevo

En `data/updates.js`, agregar un objeto **al principio** de `UPDATES` con la fecha, el título, qué se decidió y el estado de cada persona (`adentro`, `pensando` o `afuera`, con `nota` para el blocker). La página muestra siempre el primero como "foto del día".

## Publicar con GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → Branch: `main` / `(root)` → Save. A los minutos queda en `https://lucasirod.github.io/gira-colombia-27/`.

Accesos directos: `#inicio`, `#dias`, `#calendario`, `#mapa` y `#decisiones`.

> Después de cambiar un `.js` o el `.css`, subí el número `?v=` en `index.html` para que los navegadores no muestren la versión vieja.
