// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import relativeLinks from 'astro-relative-links';

// https://astro.build/config
export default defineConfig({
  // Necesario para SCORM: el LMS sirve el curso en una ruta anidada e impredecible
  // (ej. cloud.scorm.com/sandbox/content/courses/XXXX/course-scorm.../0/), así que
  // los assets no pueden usar rutas absolutas "/..." (se romperían apuntando a la
  // raíz del dominio del LMS). Esta integración las reescribe como relativas.
  integrations: [react(), relativeLinks()],

  vite: {
    plugins: [tailwindcss()]
  }
});