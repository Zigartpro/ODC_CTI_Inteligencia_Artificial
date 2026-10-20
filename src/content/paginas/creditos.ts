import type { PaginaCreditos } from '../../lib/creditos';

export const paginaCreditos: PaginaCreditos = {
  titulo: 'Créditos y Licencia',
  roles: [
    { rol: 'Autoría y contenido académico', responsable: 'Duvan Federico Sarmiento Lugo, Frand Eldimer Casas López' },
    { rol: 'Diseño instruccional y desarrollo del ODC', responsable: 'Duvan Federico Sarmiento Lugo, Frand Eldimer Casas López' },
    { rol: 'Avatar guía «Frand» (personaje e imagen)', responsable: 'Imagen generada con inteligencia artificial a partir de indicaciones de los autores' },
    { rol: 'Síntesis de voz (avatar)', responsable: 'ElevenLabs' },
    { rol: 'Programa', responsable: 'Especialización en Inteligencia Artificial, Universidad de Cundinamarca' },
  ],
  notaRecursos:
    'Los diagramas de flujo se generan dinámicamente a partir de datos propios (React Flow) y los íconos de la interfaz son trazos SVG propios. Los recursos generados con herramientas externas se documentan a continuación con el esquema TASL (Título / Autor / Fuente / Licencia).',
  // PENDIENTE (autores): completar la herramienta con la que se generó la imagen de Frand
  // y verificar los términos de uso de ella y del plan de ElevenLabs usado.
  recursos: [
    {
      titulo: 'Avatar «Frand» (ilustración 3D)',
      autor: 'Duvan Federico Sarmiento Lugo y Frand Eldimer Casas López, mediante IA generativa',
      fuente: '[Herramienta de generación de imágenes — completar]',
      licencia: '[Según los términos de uso de la herramienta — completar]',
    },
    {
      titulo: 'Narraciones del avatar (voz sintética)',
      autor: 'Duvan Federico Sarmiento Lugo y Frand Eldimer Casas López, mediante ElevenLabs',
      fuente: 'https://elevenlabs.io',
      licencia: '[Según el plan de ElevenLabs usado — completar]',
    },
    // Videos de terceros: se insertan con el reproductor oficial de YouTube (el autor permite
    // la inserción); no se descargan ni se modifican. También están en Referencias (APA 7).
    { titulo: 'Plan de digitalización mipymes (video)', autor: 'Cámara de Comercio del Oriente Antioqueño', fuente: 'https://www.youtube.com/watch?v=l3rRdAOXBDk', licencia: 'Licencia estándar de YouTube, inserción permitida por el autor' },
    { titulo: 'Automatiza todo con n8n: Guía completa en español para principiantes (video)', autor: 'Código Espinoza - IA y Machine Learning', fuente: 'https://www.youtube.com/watch?v=kFxHfNSFpoc', licencia: 'Licencia estándar de YouTube, inserción permitida por el autor' },
    { titulo: 'Cómo instalar n8n gratis en local (Docker), AWS, Google Cloud (video)', autor: 'Nicolas Neira', fuente: 'https://www.youtube.com/watch?v=owKxpe9QcLM', licencia: 'Licencia estándar de YouTube, inserción permitida por el autor' },
    { titulo: 'En 5 minutos conecta tu WhatsApp a un agente AI (n8n + CRM) (video)', autor: 'Candela - IA para e-commerce y MercadoLibre', fuente: 'https://www.youtube.com/watch?v=12Jib6Hvz8E', licencia: 'Licencia estándar de YouTube, inserción permitida por el autor' },
  ],
  licenciaTexto:
    'Este Objeto Digital de Conocimiento se distribuye bajo licencia Creative Commons Atribución 4.0 Internacional (CC BY 4.0). Puedes compartir y adaptar este material para cualquier propósito, incluso comercial, siempre que le des crédito apropiado a los autores.',
  licenciaUrl: 'https://creativecommons.org/licenses/by/4.0/deed.es',
};
