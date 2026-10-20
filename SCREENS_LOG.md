# Registro de pantallas (para el storyboard institucional posterior)

Este archivo se actualiza a medida que cada pantalla pasa de placeholder a contenido real. Para cada una: número, nombre/propósito, contenido de texto usado, y descripción visual.

> Nota: el CLAUDE.md titula la sección "16 pantallas" pero la tabla original solo listaba 15. Se resolvió tratando la pantalla 2 ("REA + Población objetivo") como dos pantallas separadas (cada una con su propio bloque de audio, tal como ya las describía el documento), dando 16. Ajustar esta numeración si esa no era la intención.

## Estado general

**Las 16 pantallas ya tienen contenido real** (ninguna sigue como placeholder). Navegación (Atrás/Siguiente/Menú), reporte a SCORM (mock local con `scorm-again`, y validado en SCORM Cloud real: Initialize/SetValue/Commit sin errores, reanudación tras cierre confirmada) y empaquetado (`npm run build:scorm`) funcionan de punta a punta.

| # | Pantalla | Estado | Componente |
|---|---|---|---|
| 1 | Portada | **Real** | `PantallaPortada` (título, autores, Iniciar/Ayuda, control global de audio) |
| 2 | Resultado Esperado de Aprendizaje (REA) | **Real** | `PantallaIntroduccion` + `src/content/paginas/rea.ts` |
| 3 | Población objetivo | **Real** | `PantallaIntroduccion` + `src/content/paginas/poblacion-objetivo.ts` |
| 4 | Menú / Índice | **Real** (funcional) | `MenuPantallas` (dentro de `CourseShell.tsx`) |
| 5 | Módulo 1 — Introducción | **Real** | `PantallaIntroduccion` + `src/content/paginas/modulo-1-introduccion.ts` |
| 6 | Módulo 2 — ¿Qué es n8n? | **Real** | `PantallaConceptos` + `src/content/paginas/modulo-2-que-es-n8n.ts` |
| 7 | Módulo 3 — Caso: Atención al cliente | **Real** | `PantallaCasoUso` + `src/content/casos-uso/modulo-3-atencion-cliente.ts` |
| 8 | Módulo 4 — Caso: Marketing | **Real** | `PantallaCasoUso` + `src/content/casos-uso/modulo-4-marketing.ts` |
| 9 | Módulo 5 — Caso: Contabilidad/Facturación | **Real** | `PantallaCasoUso` + `src/content/casos-uso/modulo-5-contabilidad.ts` |
| 10 | Módulo 6 — Caso: Inventario/Logística | **Real** | `PantallaCasoUso` + `src/content/casos-uso/modulo-6-inventario.ts` |
| 11 | Módulo 7 — Caso: Recursos Humanos | **Real** | `PantallaCasoUso` + `src/content/casos-uso/modulo-7-rrhh.ts` |
| 12 | Módulo 8 — Evidencia científica | **Real** | `PantallaEvidencia` + `src/content/paginas/modulo-8-evidencia.ts` |
| 13 | Evaluación sumativa final | **Real** | `PantallaEvaluacion` + `src/content/paginas/evaluacion.ts` (8 preguntas, una por módulo) |
| 14 | Conclusión | **Real** | `PantallaIntroduccion` + `src/content/paginas/conclusion.ts` (con checklist práctica) |
| 15 | Referencias | **Real** | `PantallaReferencias` + `src/content/paginas/referencias.ts` (23 fuentes APA 7) |
| 16 | Créditos y Licencia | **Real** | `PantallaCreditos` + `src/content/paginas/creditos.ts` (CC BY 4.0) |

## Módulos 3, 4 y 5 — detalle de contenido

Cada uno sigue la misma estructura (componente `PantallaCasoUso.tsx`): badge de función de negocio + título, reproductor de audio con transcripción, "El problema", 2 bloques de microcontenido (80-120 palabras), diagrama de flujo (React Flow, `FlowDiagram.tsx`) con los nodos reales de n8n verificados contra plantillas publicadas oficiales, caja de "Beneficio esperado", y una actividad interactiva.

Los nodos de n8n citados en cada flujo (columna `nodosN8nReales` de cada archivo en `src/content/casos-uso/`) se verificaron contra flujos de ejemplo reales publicados en n8n.io, no se inventaron:

- **Módulo 3 (Atención al cliente):** WhatsApp Trigger → AI Agent → IF → WhatsApp (Send) / notificación al dueño. Actividad: selección múltiple.
- **Módulo 4 (Marketing):** Schedule Trigger → Google Sheets (Read) → Filter → Gmail (Send) → Google Sheets (Update). Actividad: verdadero/falso.
- **Módulo 5 (Contabilidad):** Gmail Trigger → IF (adjunto PDF) → Extract from File + AI Agent → Google Sheets (Append) → Gmail (Send). Actividad: ordenar pasos (con botones ▲▼ accesibles por teclado, no solo arrastrar).

Los guiones de avatar de estas 3 pantallas ya están escritos como texto (ver campo `guionAvatar.texto` en cada archivo) y sirven de transcripción visible en el reproductor — los audios (`07-modulo3-atencion-cliente.mp3`, `08-modulo4-marketing.mp3`, `09-modulo5-contabilidad.mp3`) faltan por generar en ElevenLabs y subir a `public/audio/`; mientras tanto el reproductor muestra "audio pendiente de cargar" en vez de un audio roto.

## Módulos 1, 2, 6, 7 y 8 — detalle de contenido

- **Módulo 1 (Introducción):** sin diagrama ni actividad (fuera del rango "pantallas 6-11" que exige interactividad obligatoria según el CLAUDE.md). Contenido basado en 3 fuentes citadas explícitamente en el CLAUDE.md: BBVA Research (2024, "Una mirada a las mipymes en Colombia"), iNNpulsa Colombia (resultados del programa ALDEA), y CIPE/Center for International Private Enterprise (encuesta "Characterization of SMEs in Colombia and Their Digital Adoption", +4.000 empresarios). Cifras verificadas por búsqueda web, no inventadas.
- **Módulo 2 (¿Qué es n8n?):** implementa los pop-ups "+info" que pedía el CLAUDE.md — construí `TerminoInfo.tsx` (botón con `aria-expanded`) y `PantallaConceptos.tsx`, que resalta automáticamente la primera aparición de cada término del glosario ("nodo", "flujo de trabajo", "low-code") dentro del texto y la convierte en un botón clicable con su definición.
- **Módulo 6 (Inventario):** Schedule Trigger → Shopify/Google Sheets (Read) → IF → Slack/Gmail (Send) + Google Sheets (Append, evita duplicar alertas). Actividad: selección múltiple.
- **Módulo 7 (RRHH):** Google Forms Trigger → Google Sheets (Append) + Slack (Send) → Gmail (Send) de bienvenida. Actividad: verdadero/falso.
- **Módulo 8 (Evidencia científica):** construí un tipo de pantalla nuevo (`PantallaEvidencia.tsx`, sin diagrama de flujo — no aplica aquí) que sintetiza 5 hallazgos reales extraídos de la matriz de revisión de literatura actual del proyecto (`DOCUMENTOS/MATRIZ DE REVISION DE LITERATURA_2026-2.xlsx`, 30 artículos 2022-2026: adopción desigual, barreras humanas/organizacionales más que técnicas, peso del liderazgo, y colaboración humano-IA en vez de sustitución). Actividad: selección múltiple.
  - **Aviso:** la fila #6 de esa matriz (Knoblach et al., sobre un curso de capacitación) tiene los datos de revista marcados como "pendientes" en la propia matriz — no se usó como referencia citable (no se inventaron los datos faltantes). Si el equipo completa esa fila más adelante, se puede reincorporar como hallazgo/referencia adicional.

Todos los guiones de avatar de estos 5 módulos están escritos (audios pendientes: `05-modulo1-introduccion.mp3` a `12-modulo8-evidencia.mp3`).

## Módulos finales: Evaluación, Conclusión, Referencias y Créditos

- **Evaluación sumativa (pantalla 13):** 8 preguntas (una por cada módulo 1-8), tipos selección-múltiple y verdadero/falso, todas visibles en una sola pantalla con un botón "Enviar evaluación" al final — no una por pantalla, para no complicar la navegación de un solo SCO. Al enviar, calcula el puntaje y llama `scorm.establecerNotaFinal(correctas, total, 80)`, que reporta `cmi.core.score.raw/max` y `cmi.core.lesson_status` ("passed"/"failed") real a SCORM. Botón "Reintentar" permite recalcular y reenviar.
- **Conclusión (pantalla 14):** síntesis + checklist práctica de 5 pasos para que el usuario empiece a aplicar lo aprendido esta misma semana. Se agregó soporte de `checklist` opcional a `PantallaTexto`/`PantallaIntroduccion` para esto.
- **Referencias (pantalla 15):** 23 fuentes en total — 18 de la matriz de 30 artículos (más del mínimo de 15 que pide el CLAUDE.md) + las 5 institucionales/legales (BBVA Research, iNNpulsa Colombia, CIPE, Ley 590 de 2000 y Decreto 1074 de 2015 — verifiqué ambas normas por búsqueda antes de citarlas, son reales). Orden alfabético, con sangría francesa.
- **Créditos y Licencia (pantalla 16):** tabla de roles (autoría/diseño: ambos autores; voz: ElevenLabs, pendiente). Actualmente el ODC no usa fotografías/íconos/audio de terceros (solo emojis Unicode y diagramas generados por código), así que la tabla de recursos TASL queda vacía con una nota explicando por qué — se debe completar si más adelante se agregan imágenes o audio externos.
  - **Decisión pendiente de confirmar contigo:** elegí licencia **CC BY 4.0** (permite cualquier reuso, incluso comercial, con solo dar crédito) en vez de CC BY-SA 4.0 (que obligaría a compartir derivados bajo la misma licencia). Es un cambio de una línea en `src/content/paginas/creditos.ts` si prefieres la otra.

## Empaquetado SCORM — implementado y validado localmente

`npm run build:scorm` ejecuta `scripts/package-scorm.mjs`, que: compila el sitio, genera `imsmanifest.xml` (listando automáticamente cada archivo de `dist/`, para no mantener esa lista a mano), copia los esquemas oficiales ADL/Rustici (`scorm/schemas/`) y comprime todo en `course-scorm.zip` con el manifiesto en la raíz.

**Validación real hecha:**
- El manifiesto generado se validó con `lxml` contra un esquema combinado (imscp_rootv1p1p2 + adlcp_rootv1p2 + imsmd_rootv1p2p1, los 3 esquemas oficiales juntos, no solo uno) → **válido**.
- En el camino corregí un error real: había puesto `adlcp:masteryscore` como atributo de `<item>`; el esquema oficial lo define como **elemento hijo** (`<adlcp:masteryscore>80</adlcp:masteryscore>`), no como atributo. Ya corregido y revalidado.
- `adlcp:scormtype="sco"` en `<resource>` sí es correcto como atributo (confirmado contra el esquema).

**Pendiente (requiere tu cuenta, no la tengo):** subir `course-scorm.zip` a SCORM Cloud (cuenta gratuita en cloud.scorm.com) y probarlo en el Course Sandbox — confirmar que `Initialize`/`SetValue`/`Commit`/`Finish` no marcan ningún error en el log, y probar los 3 escenarios acordados: reanudación tras cerrar a medias, aprobado y no aprobado. Ver la sección "Verificación obligatoria" del CLAUDE.md para el detalle paso a paso.

### Bug real encontrado en la primera prueba en SCORM Cloud (ya corregido)

La primera subida a SCORM Cloud falló: pantalla en blanco, consola con 404 en todos los `_astro/*.js`/`.css`. Causa: Astro genera por defecto rutas de assets **absolutas desde la raíz** (`/_astro/...`), pero un LMS sirve el curso en una ruta anidada e impredecible (ej. `cloud.scorm.com/sandbox/content/courses/XXXX/course-scorm.../0/`), así que `/_astro/...` apuntaba a la raíz del dominio del LMS en vez de a la carpeta del curso.

**Corregido con dos cambios:**
1. Integración [`astro-relative-links`](https://www.npmjs.com/package/astro-relative-links) en `astro.config.mjs` — reescribe automáticamente las rutas que Astro genera (JS, CSS, favicons) a relativas (`./_astro/...`). Verificado en `dist/index.html` tras el build: `component-url`/`renderer-url` del astro-island y los `<link>` de favicon ya son `./...`.
2. `AvatarAudioPlayer.tsx` tenía `/audio/${archivo}` escrito a mano — esa integración NO toca strings construidos en runtime dentro del código React, solo el HTML/rutas que Astro genera en build. Se corrigió manualmente a `./audio/${archivo}`.

**Regla para todo código nuevo:** cualquier referencia a un archivo estático (imagen, audio, ícono) debe escribirse con ruta relativa (`./algo`), nunca absoluta (`/algo`) — de lo contrario se romperá otra vez al cargar dentro de un LMS.

## Decisiones técnicas relevantes para el storyboard

- El curso es **un solo SCO** (una sola página `index.html`), no 16 páginas separadas — necesario para que SCORM rastree una sesión continua. Ver CLAUDE.md, sección "Decisiones técnicas ya aprobadas (SCORM)".
- El progreso (pantalla actual + respuestas) se guarda en `cmi.suspend_data` como JSON, límite 4096 caracteres (límite del propio estándar SCORM 1.2) — cuidado con acumular demasiado estado de actividades ahí.
- El modelo de contenido (`src/lib/casos-uso.ts` + `src/content/casos-uso/*.ts`) se implementó como módulos TypeScript tipados en vez de Astro Content Collections/MDX (que era la elección original en CLAUDE.md). Motivo: los datos son estructuras anidadas (nodos/conexiones del diagrama, opciones de actividad con retroalimentación) que se vuelven incómodas como frontmatter YAML; TS da el mismo nivel de seguridad de tipos sin esa fricción. Si más adelante se prefiere que el contenido sea editable sin tocar código (p. ej. para que Frand edite texto sin gestionar TypeScript), esto se puede migrar a Content Collections con esquema Zod sin cambiar los componentes que lo consumen.

## Avatar «Frand» (2026-10-16)

- El avatar guía se llama **Frand**. Imagen fuente: `avatar.jpg` (raíz del proyecto); versiones web sin fondo en `public/avatar/frand.webp` (cuerpo entero, portada) y `public/avatar/frand-busto.webp` (botón circular).
- `AvatarAudioPlayer.tsx`: la foto de Frand es el botón de play/pausa; anillo de progreso alrededor, burbuja con nombre, estado, tiempo y transcripción. Si falta el mp3, la burbuja lo indica y abre la transcripción.
- Portada rediseñada: Frand de cuerpo entero con saludo, descripción del recurso, autores con roles, fecha/versión y audio de bienvenida (`01-portada.mp3`, **pendiente de grabar**). Con esto, 12 de 16 pantallas tienen avatar (75 %).
- Créditos: se agregaron Frand y las voces de ElevenLabs en TASL, con campos `[completar]` (herramienta y licencia).

## Ampliación de contenido (2026-10-16)

- **17 pantallas / 9 módulos.** Nuevo *Módulo 3: Instala n8n y crea tu primer flujo* (`PantallaGuia.tsx` + `content/paginas/modulo-instalacion.ts`): n8n Cloud vs. Docker (comandos verificados en docs.n8n.io), primer flujo Manual Trigger → Edit Fields, aviso de credenciales. Los casos pasan a ser Módulos 4-8 y la evidencia el Módulo 9. La numeración se calcula sola en `lib/pantallas.ts`.
- **Actividades nuevas:** Módulo 1 «¿Recuerdas las cifras?» (deslizador de estimación), Módulo 2 «Clasifica las piezas» (tocar o arrastrar a Disparador/Condición/Acción), Módulo 3 «Completa el comando» (terminal con espacios en blanco). Todas con retroalimentación por ítem.
- **Registro de actividades:** el primer intento de cada actividad se guarda en `cmi.suspend_data`; la evaluación muestra «X de 9 actividades correctas» y enlaces a las pendientes (criterio del REA verificable).
- **Evaluación:** 9 preguntas; cada respuesta incorrecta trae «Repasar: <pantalla>». Se quitó el «93%» sin fuente.
- **Microvideos (YouTube, con subtítulos en español, se cargan al hacer clic):** M1 Cámara de Comercio del Oriente Antioqueño (1:50 completo); M2 Código Espinoza (0:00-2:00, **verificar contenido**); M3 Nicolas Neira (0:51-2:48, capítulo «Docker local»); M4 Candela (10:40-12:00, capítulo «Demo»). Fragmentos elegidos por los capítulos publicados por cada autor; nadie los ha visto completos todavía.
- **Evidencia en cada caso:** sección «Qué dice la evidencia» citando estudios de la matriz (Ridho 2023, Ortolano y Gallegos 2026, Zeng et al. 2022, Susanto et al. 2025, Kortesalmi 2025, Polasik et al. 2026, Inmor et al. 2025, Chiarini et al. 2026, Arias Montoya et al. 2026).
- **Referencias:** 33 (20 artículos de la matriz con DOI tomado del export de Scopus, cursivas APA 7, videos, n8n, ElevenLabs, iNNpulsa 2024). Todas citadas en alguna pantalla. **Diagrama PRISMA** (64 → 34 excluidos → 30 incluidos) al inicio de la pantalla de Referencias.
- **Módulo 1:** infografía de 4 cifras; ahora cita Ley 590/2000 y Decreto 1074/2015; cifra del 30% de automatización verificada en iNNpulsa (2024, encuesta a 4.107 mipymes).
