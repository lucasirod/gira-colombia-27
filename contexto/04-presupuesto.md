# Presupuesto por persona (USD) — enero 2027

Relevado el 4/10/2026. Vuelos: búsquedas de Lucas (datos chequeados). Tarifas oficiales: 2026 vigentes. Alojamiento: proyectado a temporada alta sobre tarifas actuales (las "desde" que se ven hoy son de temporada baja; por ejemplo, el dorm de Viajero Medellín ya cotiza USD 24–27 en octubre, y para enero se presupuesta ~USD 30). TRM usada: ~COP 3.300 por USD.

Se decidió mantener enero. Como referencia interna (no va en la página): ir en temporada media (sáb 6 de marzo) saldría ~16–25% menos, casi todo por vuelos y alojamiento; marzo igual no le sirve a Lucas.

## Totales por bloque (los calcula la página)
| Bloque | Ajustado | Medio | Con gustos |
|---|---|---|---|
| 7 días (vuelta sáb 16, SMR) | **1.440** | **1.970** | **3.130** |
| 10 días (vuelta mié 20, CTG) | **1.760** | **2.550** | **4.190** |
| Completo (vuelta sáb 23, ADZ) | **2.160** | **3.140** | **5.140** |

**Cómo se calcula (en `js/app.js`):** vuelos internacionales + seguro según el nivel elegido; alojamiento por noche y comida y salidas por día según la tabla "Cómo lo calculamos" de cada parada (en `index.html`); actividades y traslados de cada día según `data-m` de cada `.day` (nivel medio), menos lo que recorta "ajustado" y más lo que suma "con gustos". Los de 7 días duermen hasta la noche del 15; los de 10, hasta la del 19.

**Modo mix:** un switch en la barra de Día por día. Con el switch prendido, cada día se elige ajustado / medio / con gustos tocando la caja, y en cada parada se elige por separado el nivel de alojamiento y el de comida. El total se actualiza al instante. Tocar cualquier caja prende el modo mix solo.

Vuelos internacionales por nivel: ida BUE→MDE 270 (JetSMART directo sin valija) / 320 (con valija) / 600 (Avianca directo); vueltas SMR o CTG 400 / 450 / 550; ADZ 400 / 500 / 600. Seguro: 7 días 35/50/80, 10 días 45/65/100, 15 días 60/85/130.

## Medio de cada día (actividades y traslados, sin alojamiento ni comida)
Sáb 9: 86 · Dom 10: 62 · Lun 11: 130 · Mar 12: 114 (vuelo con valija) · Mié 13: 44 · Jue 14: 61 · Vie 15: 36 · Sáb 16: 10 · Dom 17: 31 · Lun 18: 96 · Mar 19: 21 · Mié 20: 162 (vuelo con valija + tarjeta) · Jue 21: 42 · Vie 22: 49 · Sáb 23: 31.

## Alojamiento por noche y comida por día (enero, por persona)
| Parada | Ajustado | Medio | Con gustos |
|---|---|---|---|
| Medellín | Dorm Viajero/Masaya ~30 · comida ~25 | Privada 4–6 en Los Patios/Viajero/Masaya ~45 · ~40 | Privada con baño o boutique ~75 · ~70 |
| Minca | Dorm ~28 · ~25 | Privada Casas Viejas/Mundo Nuevo ~40 · ~40 | Ecolodge o cabaña ~70 · ~65 |
| Tayrona | Hamaca ~21 · ~30 | Carpa ~33 · ~45 | Cabaña del mirador ~76 · ~70 |
| Palomino | Dorm Dreamer ~25 · ~25 | Privada Dreamer ~35 · ~40 | Hotel de playa ~80 · ~70 |
| Cartagena | Dorm Viajero Getsemaní ~30 · ~35 | Privada Viajero/KIM/Masaya ~50 · ~55 | Boutique con rooftop ~100 · ~90 |
| San Andrés | Dorm Viajero ~30 · ~35 | Privada Viajero/Dreamer ~45 · ~55 | Hotel con pileta ~90 · ~90 |

Cumpleaños del sáb 9 (cena + salida): sumar ~40 / 70 / 120.

## Precios unitarios (2026)
| Ítem | Precio |
|---|---|
| Entrada Tayrona extranjero, temporada alta | COP 96.500 (~USD 29) + seguro COP 7.000 por día |
| Hamaca Cabo San Juan | COP 40.000–85.000 según la fuente (confirmar por WhatsApp); carpa ~COP 110.000; cabaña mirador COP 330.000–500.000 (2 personas) |
| Piedra del Peñol | COP 35.000 (tarifa única 2026) |
| Bus Medellín–Guatapé | COP 18.000–25.000 por tramo |
| Parapente San Félix 15 / 20 / 30 min | COP 220.000 / 290.000 / 440.000; traslado COP 120.000–150.000 por auto |
| Cholón | Party boat compartido USD 59–70; premium USD 110–128; pasadía COP 320.000; lancha privada ~COP 1,5 M para 10 |
| Marsol Santa Marta–Cartagena | COP 90.000 (bus desde COP 54.000) |
| Tarjeta de turismo San Andrés | COP 153.000 (~USD 46) |
| Johnny Cay + Acuario | COP 65.000–132.000 + impuesto Johnny Cay COP 15.000 + portuario 5.000 |
| Mulita / carrito de golf por día | COP 290.000 (2 personas) a 410.000 (6) |
| Bautismo de buceo | COP 140.000–250.000 |
| 4x4 Minca → Casas Viejas | ~COP 140.000 entre dos |

## Vuelos (búsquedas de Lucas, oct 2026)
- BUE → MDE sáb 9: ~USD 300 con escala o ~600 directo Avianca. JetSMART directo EZE–MDE desde el 12/11/2026, promo desde USD 219.
- MDE → SMR mar 12: ~USD 63 + valija. CTG → ADZ mié 20: ~USD 90 + valija.
- Vueltas: SMR → BUE 400–500; CTG → BUE 400–500 (Aerolíneas directo a Aeroparque, ida y vuelta desde USD 520–577); ADZ → BUE 400–600.
- Confirmar que JetSMART opere el sábado y Aerolíneas el miércoles (vuelan 5 días por semana).
- Colombia exige pasaje de salida para entrar.

## Qué se ajusta o se suma cada día (USD por persona, aprox.)
| Día | Ajustado (−) | Con gustos (+) |
|---|---|---|
| Sáb 9 | Previa y bares sin cover (−20) | Cena de cumple en restaurante y mesa en boliche (+60) |
| Dom 10 | Guatapé en bus (−25) | Lancha privada y almuerzo en restaurante (+20) |
| Lun 11 | Sin parapente (−76) | Parapente de 30 min (+65) |
| Mar 12 | Colectivo a Minca, solo mochila (−30) | Transfer privado a Minca (+15) |
| Mié 13 | Cascadas a pie (−10) | Moto con guía y tour de café (+30) |
| Jue 14 | Hamaca abajo y comida llevada (−20) | Hamaca del mirador o cabaña, restaurante (+40) |
| Vie 15 | Tubing por cuenta propia, previa (−15) | Pub crawl y barra (+30) |
| Sáb 16 | Playa sin gastos (−10) | Cena de mariscos (+30) |
| Dom 17 | Menú del día y previa (−15) | Transfer privado a Cartagena (+40) |
| Lun 18 | Lancha barata a Cholón o saltearlo (−65) | Party boat premium o lancha privada (+40) |
| Mar 19 | Free tour y salsa en la plaza (−20) | Cena en la ciudad amurallada y Café del Mar (+60) |
| Mié 20 | Solo mochila en el vuelo (−20) | Hotel con pileta (+40 por noche) |
| Jue 21 | Tour compartido básico (−10) | Lancha privada a los cayos (+40) |
| Vie 22 | Bus de la isla (−25) | Bautismo de buceo (+55) |

## Pendiente de confirmar
Hostels con las fechas exactas (Hostelworld/Booking, para 4–6); tarifas 2027 de Tayrona (~+5%) y tarjeta de San Andrés (~COP 158.000–162.000); calendario de cierres 2027 de Tayrona; precios de Cabo San Juan; días de operación de JetSMART y Aerolíneas; tipo de cambio la semana del viaje.
