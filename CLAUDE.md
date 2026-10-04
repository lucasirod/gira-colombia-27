# Gira Colombia ’27

Página del viaje a Colombia de un grupo de amigos (9 al 23 de enero de 2027), publicada con GitHub Pages. El dueño es Lucas, que organiza el viaje.

**Antes de cambiar algo, leé `contexto/`**: ahí está todo lo hablado (grupo, itinerario, presupuesto, investigación y decisiones). Empezá por `contexto/01-el-viaje.md`.

## Reglas
- Escribí en español rioplatense, como habla el grupo.
- El repo es público y la página la ven todos, incluido Monty: no pongas plata ni situaciones personales de nadie. Lo sensible vive en el Project privado de claude.ai, no acá.
- Sitio estático, sin build: HTML, CSS y JS planos. Leaflet desde unpkg y tiles de OpenStreetMap (CARTO pide API key).
- Después de tocar un `.js` o el `.css`, subí el `?v=` de los `<link>` y `<script>` en `index.html`.
- Para un update del grupo, agregá un objeto al principio de `UPDATES` en `data/updates.js`.
- Mantené la paleta y el formato de slides (chips + rombo + pie "n / total").
