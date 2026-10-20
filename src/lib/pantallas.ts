export interface DefinicionPantalla {
  id: string;
  numero: number;
  titulo: string;
  descripcion: string;
  tieneAudio: boolean;
}

// 17 pantallas (rango 12-20 del instructivo) y 9 módulos (rango 8-10). REA y Población
// objetivo son pantallas separadas, cada una con su audio. El número se calcula a partir
// del orden de la lista, así que insertar o mover pantallas no exige renumerar a mano.
const DEFINICIONES: Omit<DefinicionPantalla, 'numero'>[] = [
  { id: 'portada', titulo: 'Portada', descripcion: 'Título, autores y roles, programa/institución, fecha/versión, botones Iniciar/Ayuda, control de audio, bienvenida del avatar Frand.', tieneAudio: true },
  { id: 'rea', titulo: 'Resultado Esperado de Aprendizaje (REA)', descripcion: 'Qué logrará el usuario al finalizar el ODC.', tieneAudio: true },
  { id: 'poblacion-objetivo', titulo: 'Población objetivo', descripcion: 'A quién está dirigido este ODC.', tieneAudio: true },
  { id: 'menu', titulo: 'Menú / Índice', descripcion: 'Navegación libre a todos los módulos, evaluación, conclusión, referencias y créditos.', tieneAudio: false },
  { id: 'modulo-1-introduccion', titulo: 'Módulo 1: Introducción', descripcion: 'El problema: baja tecnificación en pymes colombianas, con infografía de cifras reales.', tieneAudio: true },
  { id: 'modulo-2-que-es-n8n', titulo: 'Módulo 2: ¿Qué es n8n?', descripcion: 'Definiciones y conceptos clave, sin tecnicismos, con pop-ups "+info".', tieneAudio: true },
  { id: 'modulo-instalacion', titulo: 'Módulo 3: Instala n8n y crea tu primer flujo', descripcion: 'Práctica guiada: n8n Cloud o Docker, y un primer flujo de dos nodos.', tieneAudio: true },
  { id: 'modulo-3-atencion-cliente', titulo: 'Módulo 4, Caso: Atención al cliente', descripcion: 'Chatbots y respuestas automáticas: propósito, diagrama del flujo, actividad interactiva.', tieneAudio: true },
  { id: 'modulo-4-marketing', titulo: 'Módulo 5, Caso: Marketing', descripcion: 'Seguimiento automático de leads y publicaciones.', tieneAudio: true },
  { id: 'modulo-5-contabilidad', titulo: 'Módulo 6, Caso: Contabilidad/Facturación', descripcion: 'Automatización de reportes.', tieneAudio: true },
  { id: 'modulo-6-inventario', titulo: 'Módulo 7, Caso: Inventario/Logística', descripcion: 'Alertas de stock, seguimiento de pedidos.', tieneAudio: true },
  { id: 'modulo-7-rrhh', titulo: 'Módulo 8, Caso: Recursos Humanos', descripcion: 'Onboarding y gestión de solicitudes.', tieneAudio: true },
  { id: 'modulo-8-evidencia', titulo: 'Módulo 9: Evidencia científica', descripcion: 'Resumen accesible de los hallazgos de la revisión de literatura.', tieneAudio: true },
  { id: 'evaluacion', titulo: 'Evaluación sumativa final', descripcion: '9 ítems alineados al REA, con retroalimentación y enlace de repaso por tema.', tieneAudio: false },
  { id: 'conclusion', titulo: 'Conclusión', descripcion: 'Síntesis y próximos pasos prácticos.', tieneAudio: true },
  { id: 'referencias', titulo: 'Referencias', descripcion: 'Fuentes APA 7 en orden alfabético y diagrama PRISMA de la revisión sistemática.', tieneAudio: false },
  { id: 'creditos', titulo: 'Créditos y Licencia', descripcion: 'Roles, esquema TASL por recurso, licencia CC BY 4.0.', tieneAudio: false },
];

export const PANTALLAS: DefinicionPantalla[] = DEFINICIONES.map((p, i) => ({ ...p, numero: i + 1 }));

export function indicePantalla(id: string): number {
  return PANTALLAS.findIndex((p) => p.id === id);
}
