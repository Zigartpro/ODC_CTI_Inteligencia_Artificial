# Proyecto: ODC — Automatización de flujos de trabajo con IA (n8n) para pymes y emprendimientos

## Contexto y propósito

Este proyecto es el producto digital de un trabajo de grado de la Especialización en Inteligencia Artificial (Universidad de Cundinamarca), bajo la modalidad **Objeto Digital de Conocimiento (ODC)**. Está fundamentado en una revisión sistemática de literatura (30 artículos científicos, 2010-2026, Scopus, 100% acceso abierto) que evidenció una brecha entre la disposición de las pymes colombianas a digitalizarse y su capacidad real de implementar automatización de procesos con IA — principalmente por falta de conocimiento técnico accesible, no por falta de interés.

**Pregunta de investigación:** ¿Qué evidencia reporta la literatura sobre la implementación de herramientas de automatización de procesos con inteligencia artificial en pequeñas empresas y emprendimientos?

**REA (Resultado Esperado de Aprendizaje) del ODC:**
> Al finalizar el ODC, el usuario (dueño o gerente de una pequeña empresa o emprendimiento) identificará y aplicará los principios básicos de automatización de procesos de negocio mediante flujos de trabajo con inteligencia artificial (n8n), en el contexto de su propia operación, a partir de casos de uso guiados, evidenciado por la resolución correcta de al menos el 80% de las actividades interactivas y de la evaluación final.

**Población objetivo:** dueños y gerentes de pequeñas empresas y emprendimientos en Colombia, sin conocimiento técnico previo en programación ni automatización. El contenido debe evitar jerga técnica innecesaria y explicar todo en términos de negocio.

## ⚠️ Requisito no negociable: el entregable final debe exportarse como paquete SCORM

Este ODC debe cumplir el instructivo institucional (Universidad de Cundinamarca, CAI CTI), que exige que la herramienta usada **"permita descarga de paquete SCORM"**, para poder subirse a un LMS institucional.

Esto significa que el sitio no puede ser solo un build estático normal — necesita además:
1. Un archivo `imsmanifest.xml` que describa la estructura del curso (organización, recursos, metadatos).
2. Una capa de comunicación JavaScript con la API SCORM (1.2 o 2004 — decide y justifica cuál) para reportar: inicio, progreso por pantalla, finalización, y la nota de la evaluación sumativa. Se recomienda evaluar la librería `pipwerks scorm-api-wrapper` u otra alternativa moderna equivalente, y justificar la elección.
3. Un script de empaquetado que comprima el build final (HTML/CSS/JS estático de Astro) junto con el manifiesto en un `.zip` listo para subir a un LMS.

**Verificación obligatoria:** una vez implementado, el paquete debe poder subirse y probarse en **SCORM Cloud** (scorm.com/scorm-cloud, tiene plan gratuito) para confirmar que la comunicación con el LMS funciona de verdad, no solo que "debería funcionar". No des esta pieza por terminada sin esa prueba.

Como Astro genera HTML estático por defecto (arquitectura de islas, sin servidor corriendo), es un buen punto de partida para esto — mejor que un framework con SSR obligatorio.

## Stack técnico aprobado

| Capa | Elección |
|---|---|
| Framework | Astro (arquitectura de islas — 90% contenido estático, 10% interactivo) |
| Contenido | Astro Content Collections (Markdown/MDX + esquema Zod) |
| Componente interactivo | React (isla de Astro) + `@xyflow/react` (React Flow) para el visualizador de flujos de n8n |
| Estilos | Tailwind CSS v4 |
| Hosting (para revisión durante desarrollo) | Vercel |
| **Empaquetado final** | Build estático de Astro + capa SCORM (ver sección anterior) → `.zip` |

## Skills de diseño instalados en Claude Code

Ya están instalados `emil-design-eng` y `animate` (github.com/emilkowalski/skills) en `~/.claude/skills/`. **Deben usarse explícitamente** (no confiar en activación automática) para todo trabajo de UI/interfaz — pídele a Claude Code que los invoque por nombre en cada tarea de diseño, para evitar que el resultado se vea genérico/plantilla de IA.

## Estructura obligatoria: 16 pantallas (no navegación libre tipo blog)

| # | Pantalla | Contenido |
|---|---|---|
| 1 | **Portada** | Título (≤10 palabras), autores y roles, programa/institución, fecha/versión, botones Iniciar/Ayuda, control de audio |
| 2 | **REA + Población objetivo** | Dos bloques separados, cada uno con audio de avatar (REA: 30-40s, Población: 20-30s) |
| 3 | **Menú/Índice** | Navegación libre a todos los módulos, evaluación, conclusión, referencias, créditos. Flechas avanzar/retroceder/menú siempre visibles |
| 4 | **Módulo 1 — Introducción** | El problema: baja tecnificación en pymes colombianas, con evidencia real (cifras de BBVA Research/iNNpulsa/CIPE) |
| 5 | **Módulo 2 — ¿Qué es n8n?** | Definiciones y conceptos clave, sin tecnicismos. Pop-ups "+info" para términos como "nodo", "flujo de trabajo", "low-code" |
| 6 | **Módulo 3 — Caso: Atención al cliente** | Chatbots y respuestas automáticas. Propósito + microcontenido (80-120 palabras/bloque) + diagrama del flujo (React Flow) + actividad interactiva + avatar (60-90s) |
| 7 | **Módulo 4 — Caso: Marketing** | Seguimiento automático de leads y publicaciones. Misma estructura que módulo 3 |
| 8 | **Módulo 5 — Caso: Contabilidad/Facturación** | Automatización de reportes. Misma estructura |
| 9 | **Módulo 6 — Caso: Inventario/Logística** | Alertas de stock, seguimiento de pedidos. Misma estructura |
| 10 | **Módulo 7 — Caso: Recursos Humanos** | Onboarding y gestión de solicitudes. Misma estructura |
| 11 | **Módulo 8 — Evidencia científica** | Resumen accesible de los hallazgos de la revisión de literatura (por qué esto funciona, basado en los 30 artículos revisados) |
| 12 | **Evaluación sumativa final** | 6-10 ítems alineados al REA, con retroalimentación y sugerencia de repaso por tema |
| 13 | **Conclusión** | Síntesis + próximos pasos prácticos o checklist breve |
| 14 | **Referencias** | Mínimo 20 fuentes APA 7, orden alfabético (ver sección siguiente) |
| 15 | **Créditos y Licencia** | Roles (autoría, diseño, voz, edición, imágenes), esquema TASL (Título/Autor/Source/Licencia) por recurso visual/audio usado, licencia CC BY 4.0 o CC BY-SA 4.0 |

## Interactividad requerida por módulo (pantallas 6-11)

Cada módulo debe tener **al menos una actividad** con retroalimentación específica (por qué está bien/mal), alineada al REA. Variar el tipo entre módulos: selección múltiple, verdadero/falso, arrastrar y soltar, completar espacios, ordenar pasos, caso breve.

## Avatar con voz (≥70% de las pantallas, ≈12 de 16)

- Estructura del guion por pantalla: introducción clara → instrucción de interacción → idea clave (sin leer el texto tal cual) → cierre/transición. Ritmo 120-150 palabras/minuto, 30-90 segundos.
- **Los guiones se escriben primero como texto** (ese mismo texto sirve como transcripción obligatoria por accesibilidad — no es trabajo duplicado).
- El audio se genera con ElevenLabs (servicio externo, decisión ya tomada) y se sube manualmente a `public/audio/` con nomenclatura consistente (ej. `04-modulo1-introduccion.mp3`). Claude Code debe dejar el componente de reproductor de audio listo para recibir esos archivos por ruta, con controles play/pausa y transcripción visible/alternativa junto al reproductor.

## Accesibilidad (obligatoria)

Texto ALT en todas las imágenes/íconos, contraste de color adecuado (WCAG), navegación por teclado en menú y controles, subtítulos/transcripción en todos los audios.

## Referencias (ya disponibles, no partir de cero)

Seleccionar al menos 15 de los 30 artículos de la matriz de revisión de literatura del proyecto (`Matriz_Revision_Literatura_30_OpenAccess.xlsx`, ya en formato APA 7) + las 5 fuentes institucionales/legales del planteamiento del problema (BBVA Research, iNNpulsa, CIPE, Ley 590, Decreto 1074) para superar las 20 referencias mínimas. Las imágenes/iconos/audio usados se documentan aparte, con esquema TASL, en la página de Créditos — no mezclados con las referencias académicas.

## Documentación continua para el storyboard posterior (importante)

El autor va a construir el storyboard oficial (plantilla institucional) **después** de ver el producto ya montado, por decisión propia. Para que ese paso sea rápido, Claude Code debe mantener un archivo `SCREENS_LOG.md` actualizado a medida que construye cada pantalla, documentando: número de pantalla, nombre/propósito, contenido de texto usado, y descripción visual (o captura). Esto se usará para llenar el storyboard oficial sin tener que re-derivar todo desde el código.

## Fuera de alcance (por ahora)

Autenticación de usuarios/cuentas, backend con base de datos propia (más allá de lo que requiera el empaquetado SCORM), ejecución real de flujos de n8n desde el sitio (solo representación visual/educativa), multilenguaje.

## Próximos pasos para Claude Code

1. Proponer y justificar la implementación técnica del empaquetado SCORM (manifiesto, librería de comunicación, script de empaquetado) — presentar la propuesta antes de codificar.
2. Confirmar estructura de carpetas del proyecto (incluyendo dónde vive `SCREENS_LOG.md` y `public/audio/`).
3. Generar el esqueleto de las 16 pantallas.
4. Generar el contenido completo de los módulos 3, 4 y 5 (casos de uso) primero, como punto de partida para validar tono y formato antes de escalar al resto.
5. Prototipar el componente de visualización de flujos (React Flow) con un solo ejemplo.
6. Redactar los guiones de avatar para esas primeras pantallas (listos para pasar a ElevenLabs).

## Decisiones técnicas ya aprobadas (SCORM)

- **Versión SCORM:** 1.2 (máxima compatibilidad con LMS institucionales). Pendiente confirmar con el CAI CTI si el LMS de la universidad exige 2004; si es así, `scorm-again` soporta ambas sin reescribir la lógica.
- **Arquitectura: un solo SCO.** Las 16 pantallas NO son rutas Astro separadas — viven como componentes React dentro de un único `index.html` (un shell `CourseShell.tsx` que cambia de pantalla por estado interno, sin recargar el navegador). Esto es necesario porque SCORM rastrea una sesión continua (`Initialize` → ... → `Finish`); con páginas separadas se perdería la conexión con la API del LMS y el progreso en cada salto. Es el mismo patrón que usan Articulate/Captivate/iSpring.
- **Librería de comunicación SCORM:** `scorm-again` (no `pipwerks`, que ya no se mantiene). Activamente mantenida, soporta 1.2 y 2004, y tiene un modo "sin LMS" que simula la API localmente — útil para probar sin subir nada a SCORM Cloud en cada iteración.
- **Verificación obligatoria en SCORM Cloud** (cuenta gratuita, cloud.scorm.com) antes de dar por terminado el empaquetado: Course Sandbox con log de llamadas a la API, probando explícitamente reanudación tras cierre, aprobado y no-aprobado — no basta con que compile o cargue.

## Notas de entorno (Astro CLI)

Al iniciar el servidor de desarrollo, usar modo background:

```
astro dev --background
```

Gestionar el servidor con `astro dev stop`, `astro dev status`, y `astro dev logs`.

Documentación: https://docs.astro.build — guías relevantes: [rutas/páginas](https://docs.astro.build/en/guides/routing/), [componentes Astro](https://docs.astro.build/en/basics/astro-components/), [componentes React](https://docs.astro.build/en/guides/framework-components/), [content collections](https://docs.astro.build/en/guides/content-collections/), [estilos/Tailwind](https://docs.astro.build/en/guides/styling/).
