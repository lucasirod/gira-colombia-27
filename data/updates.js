/*
  PROCESO DE DECISIÓN — acá se cargan los updates del grupo.

  Para sumar un update nuevo, agregá un objeto AL PRINCIPIO de la lista UPDATES
  (el primero es el más reciente y es el que la página muestra por defecto).

  Estados posibles de cada persona:
    "adentro"   → arriba del avión
    "pensando"  → en la escalera, le falta decidir (poné el blocker en "nota")
    "afuera"    → en la pista, por ahora no viene

  Fotos de las caras (opcional): fotos/personas/<id>.jpg  (ej: fotos/personas/mati.jpg).
  Si no hay foto, se muestran las iniciales.
*/

window.PERSONAS = [
  { id: "lucas",  nombre: "Lucas" },
  { id: "mati",   nombre: "Mati" },
  { id: "reja",   nombre: "Reja" },
  { id: "seba",   nombre: "Seba" },
  { id: "monti",  nombre: "Monti" },
  { id: "pancho", nombre: "Pancho" },
  { id: "ivan",   nombre: "Iván" },
  { id: "jose",   nombre: "José" }
];

window.UPDATES = [
  {
    fecha: "2026-10-04",
    titulo: "Presentación del plan",
    resumen: "Se presentó la propuesta completa: Colombia del 9 al 23 de enero, con bloques de 7, 10 y 15 días para que cada uno elija según su plata y sus vacaciones.",
    decisiones: [
      "Destino: Colombia (Medellín → Minca → Tayrona → Palomino → Cartagena → San Andrés)",
      "Fechas: llegada sáb 9 de enero a Medellín",
      "Tres bloques: vuelta el 16 (Santa Marta), el 20 (Cartagena) o el 23 (San Andrés)"
    ],
    estados: {
      lucas:  { estado: "adentro" },
      mati:   { estado: "adentro" },
      reja:   { estado: "adentro", nota: "Quiere evitar lugares explotados de gente" },
      seba:   { estado: "adentro" },
      monti:  { estado: "adentro" },
      pancho: { estado: "pensando", nota: "Le gusta el plan; quiere que no sea solo joda" },
      ivan:   { estado: "pensando", nota: "Todavía no está convencido" },
      jose:   { estado: "pensando", nota: "Fechas: le sirve más después de abril" }
    },
    proximo: "Cada uno elige su bloque y compramos la ida antes del 31 de octubre."
  },
  {
    fecha: "2026-10-03",
    titulo: "Primera charla",
    resumen: "Lucas tiró la idea de un viaje por Colombia en enero, tipo gira por varias ciudades y playas.",
    decisiones: [
      "Idea inicial: gira por Colombia en enero, con hostels y mix de naturaleza y noche"
    ],
    estados: {
      lucas:  { estado: "adentro" },
      mati:   { estado: "adentro" },
      reja:   { estado: "adentro" },
      seba:   { estado: "adentro" },
      monti:  { estado: "pensando" },
      pancho: { estado: "pensando", nota: "En diciembre está en Miami" },
      ivan:   { estado: "pensando" },
      jose:   { estado: "pensando" }
    },
    proximo: "Armar la propuesta con itinerario y presupuesto."
  }
];
