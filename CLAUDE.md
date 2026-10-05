# Gira Colombia ’27

Página del viaje a Colombia de un grupo de amigos (9 al 23 de enero de 2027), publicada con GitHub Pages. El dueño es Lucas, que organiza el viaje.

**Antes de cambiar algo, leé `contexto/`**: ahí está todo lo hablado (grupo, itinerario, presupuesto, investigación y decisiones). Empezá por `contexto/01-el-viaje.md`.

## Reglas
- Escribí en español rioplatense, como habla el grupo.
- El repo es público y la página la ven todos, incluido Monti: no pongas plata ni situaciones personales de nadie. Lo sensible vive en el Project privado de claude.ai, no acá.
- Sitio estático, sin build: HTML, CSS y JS planos. Leaflet desde unpkg y tiles de OpenStreetMap (CARTO pide API key).
- Después de tocar un `.js` o el `.css`, subí el `?v=` de los `<link>` y `<script>` en `index.html`.
- Los costos salen de un modelo en `js/app.js` que lee la tabla "Cómo lo calculamos" de cada parada y el `data-m` y los montos de ajustado/con gustos de cada día en `index.html`. Para cambiar un precio, cambiá esos datos, no los totales.
- Para un update del grupo, agregá un objeto al principio de `UPDATES` en `data/updates.js`.
- Mantené la paleta y el formato de slides (chips + rombo + pie "n / total").
