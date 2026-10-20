// Instala un `window.API` de SCORM 1.2 falso para poder probar el curso en `astro dev`
// sin necesidad de subirlo a SCORM Cloud en cada iteración. Usa `scorm-again`, que aquí sí
// cumple su propósito real: implementar el lado del reproductor/LMS, no el del contenido.
// Nunca se importa en producción (solo se llama desde scorm.ts cuando import.meta.env.DEV).

import { Scorm12API } from 'scorm-again';

export function instalarMockLocal() {
  if ((window as unknown as { API?: unknown }).API) return;

  const api = new Scorm12API({
    logLevel: 'DEBUG',
  });

  (window as unknown as { API: Scorm12API }).API = api;

  console.info(
    '[SCORM] Modo desarrollo: no se detectó un LMS real, se instaló un mock local (scorm-again). ' +
      'Las llamadas a la API se registran en esta consola en vez de enviarse a un LMS.'
  );
}
