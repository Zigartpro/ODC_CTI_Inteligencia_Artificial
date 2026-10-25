import type { PaginaCreditos } from '../../lib/creditos';

export const paginaCreditos: PaginaCreditos = {
  titulo: 'Créditos y Licencia',
  roles: [
    { rol: 'Autoría y contenido académico', responsable: 'Duvan Federico Sarmiento Lugo, Frand Eldimer Casas López' },
    { rol: 'Diseño instruccional y desarrollo del ODC', responsable: 'Duvan Federico Sarmiento Lugo, Frand Eldimer Casas López' },
    { rol: 'Edición, montaje y empaquetado SCORM', responsable: 'Duvan Federico Sarmiento Lugo, Frand Eldimer Casas López' },
    { rol: 'Imágenes: avatar guía «Frand»', responsable: 'Imagen generada con Meta AI a partir de indicaciones de los autores' },
    { rol: 'Imágenes: infografías y diagramas', responsable: 'Elaboración propia de los autores' },
    { rol: 'Voz (avatar)', responsable: 'Síntesis de voz con ElevenLabs' },
    { rol: 'Sonidos y música', responsable: 'No se emplean sonidos ni música de terceros; solo la narración sintetizada' },
    { rol: 'Programa', responsable: 'Especialización en Inteligencia Artificial, Universidad de Cundinamarca' },
  ],
  notaRecursos:
    'Los diagramas de flujo se generan dinámicamente a partir de datos propios (React Flow) y los íconos de la interfaz son trazos SVG propios. Los recursos generados con herramientas externas se documentan a continuación con el esquema TASL (Título / Autor / Fuente / Licencia).',
  // VERIFICAR (autores): las licencias de Meta AI y de ElevenLabs dependen de sus términos de uso
  // y del plan usado; aquí se declara la fuente y se remite a esos términos, sin inventar una licencia.
  recursos: [
    {
      titulo: 'Avatar «Frand» (ilustración 3D)',
      autor: 'Meta AI (Meta Platforms), a partir de indicaciones de Duvan Federico Sarmiento Lugo y Frand Eldimer Casas López',
      fuente: 'https://www.meta.ai',
      licencia: 'Imagen generada por IA; uso sujeto a los términos de servicio de Meta AI',
    },
    {
      titulo: 'Narraciones del avatar (voz sintética)',
      autor: 'ElevenLabs, a partir de los guiones de los autores',
      fuente: 'https://elevenlabs.io',
      licencia: 'Uso sujeto a los términos del plan de ElevenLabs contratado por los autores',
    },
    {
      titulo: 'Infografía de cifras (Módulo 1)',
      autor: 'Elaboración propia con datos de BBVA Research (2024) e iNNpulsa Colombia (2024)',
      fuente: 'Pantalla «Módulo 1: Introducción» de este ODC',
      licencia: 'CC BY 4.0 (la del ODC); los datos pertenecen a las fuentes citadas',
    },
    {
      titulo: 'Diagrama de flujo PRISMA (pantalla Referencias)',
      autor: 'Elaboración propia, siguiendo el esquema de Page et al. (2021)',
      fuente: 'https://doi.org/10.1136/bmj.n71',
      licencia: 'CC BY 4.0 (la del ODC)',
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
