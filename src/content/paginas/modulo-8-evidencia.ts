import type { Evidencia } from '../../lib/evidencia';

export const modulo8Evidencia: Evidencia = {
  id: 'modulo-8-evidencia',
  titulo: 'Qué dice la evidencia científica sobre la IA en las pymes',
  introduccion:
    'Este ODC no se inventó los beneficios de automatizar procesos con IA: se basa en una revisión sistemática con metodología PRISMA (ver el diagrama en la pantalla de Referencias) que incluyó 30 estudios científicos sobre pymes de distintos países que han adoptado inteligencia artificial en áreas como marketing, manufactura, logística, contabilidad, atención al cliente y gestión del talento humano. Aquí tienes un resumen honesto de lo que esa evidencia realmente muestra: lo bueno, y también las dificultades reales que otros negocios han enfrentado.',
  hallazgos: [
    {
      texto:
        'Cuando se implementa bien, la automatización con IA muestra beneficios medibles: menos carga de trabajo y más eficiencia de tiempo, especialmente en negocios de servicios (Polasik et al., 2026); mejoras reales en productividad de líneas de producción (Kang y Kim, 2024); y mayor eficiencia operativa al automatizar tareas logísticas repetitivas (Inmor et al., 2025).',
    },
    {
      texto:
        'La adopción sigue siendo desigual: existe una brecha de preparación significativa entre pequeñas empresas y grandes compañías (Dwivedy et al., 2025), y en muchos casos la adopción de IA en pymes avanza de forma cautelosa e incremental, no masiva (Aiudi et al., 2026; Taherizadeh y Beaudry, 2023).',
    },
    {
      texto:
        'Las barreras más citadas no son tecnológicas, son humanas y organizacionales: falta de habilidades, costos altos y resistencia cultural (Cevallos et al., 2026); riesgo económico percibido (Zarea et al., 2026); y falta de sistemas de gestión del talento humano que acompañen la adopción (Arias Montoya et al., 2026).',
    },
    {
      texto:
        'El liderazgo importa tanto como la tecnología misma: el compromiso del liderazgo y los beneficios percibidos explican más del 65% de la variación en qué tan madura es la adopción de IA de una empresa (Jaciow et al., 2026). El equipo directivo es clave para vencer la inercia organizacional (Peñarroya-Farell et al., 2025), y rasgos del dueño como la autoconfianza y la disposición al riesgo pesan tanto como la tecnología en la decisión de adoptar (Zulkiffli et al., 2026). Además, el retorno de la IA generativa depende más de la capacidad de reorganizar el modelo de negocio que del simple acceso a la herramienta (Wishah et al., 2026).',
    },
    {
      texto:
        'El patrón que más se repite no es que la IA reemplace personas, sino que colabore con ellas: los casos más exitosos se describen como colaboración humano-IA, no como sustitución del trabajo humano (Knoblach et al., 2026; Ortolano y Gallegos, 2026).',
    },
  ],
  cierre:
    'Esa combinación, beneficios reales pero condicionados a resolver primero las barreras humanas y de conocimiento y no las técnicas, es exactamente el punto de partida de este ODC. Por eso los módulos anteriores no solo te mostraron flujos técnicos, sino que buscaron traducir esta evidencia científica en ejemplos concretos que puedas aplicar en tu propio negocio, sin necesitar un equipo de programadores.',
  actividad: {
    tipo: 'seleccion-multiple',
    pregunta: 'Según la evidencia revisada, ¿cuál de estas afirmaciones describe mejor las barreras más comunes para adoptar IA en pymes?',
    opciones: [
      {
        texto: 'Son principalmente técnicas: los sistemas de IA son demasiado complejos de instalar.',
        correcta: false,
        retroalimentacion: 'No es lo que más se repite en los estudios. Las barreras más citadas son de habilidades, costos y cultura organizacional, no la dificultad técnica en sí.',
      },
      {
        texto: 'Son principalmente humanas y organizacionales: falta de habilidades, costos percibidos y resistencia cultural, más que la tecnología en sí misma.',
        correcta: true,
        retroalimentacion: 'Correcto. Varios estudios de la revisión (por ejemplo Cevallos et al. y Zarea et al.) coinciden en que las barreras dominantes son de habilidades, costos y cultura, no limitaciones técnicas de las herramientas.',
      },
      {
        texto: 'No existen barreras relevantes; las pymes que quieren adoptar IA ya lo han hecho sin dificultad.',
        correcta: false,
        retroalimentacion: 'No. La evidencia muestra justamente lo contrario: persisten brechas de preparación entre pymes y grandes empresas, y la adopción avanza de forma cautelosa, no automática.',
      },
    ],
  },
  guionAvatar: {
    texto:
      'Todo lo que has visto en los módulos anteriores no es una promesa vacía: está respaldado por una revisión de 30 estudios científicos sobre pymes que ya están usando inteligencia artificial en el mundo real. En esta pantalla vas a ver un resumen honesto de esa evidencia, los beneficios reales, pero también las dificultades que otros negocios han enfrentado. Lo más importante que vas a encontrar es esto: la principal barrera no es la tecnología en sí, es el acceso a conocimiento claro sobre cómo empezar. Y ese es exactamente el problema que este ODC busca resolver contigo. Cuando termines de leer, responde la actividad y sigue a la evaluación final.',
    duracionEstimadaSegundos: 85,
    archivoAudio: '12-modulo8-evidencia.mp3',
  },
};
