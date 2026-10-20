import type { PantallaTexto } from '../../lib/contenido-simple';

export const paginaConclusion: PantallaTexto = {
  id: 'conclusion',
  titulo: 'Para cerrar',
  microcontenido: [
    'A lo largo de este curso instalaste n8n, creaste tu primer flujo y recorriste cinco casos de uso de automatización (atención al cliente, marketing, contabilidad, inventario y recursos humanos), construidos con nodos que la herramienta realmente ofrece. También viste que esto no es una moda pasajera: está respaldado por una revisión de 30 estudios científicos sobre pymes que ya lo están haciendo en el mundo real.',
    'La idea más importante para llevarte es esta: la brecha entre tu negocio y la automatización no es de interés ni de presupuesto imposible, es de conocimiento accesible sobre por dónde empezar. Ya diste ese primer paso.',
  ],
  checklist: [
    'Elige un solo proceso repetitivo de tu negocio para automatizar primero, no intentes automatizar todo a la vez.',
    'Crea una cuenta en n8n (n8n.io o una instancia propia) y explora el editor visual sin miedo a experimentar.',
    'Vuelve al caso de uso más parecido a tu proceso elegido y úsalo como plantilla de partida.',
    'Identifica qué herramientas necesitas conectar (WhatsApp, correo, hoja de cálculo) y prepara esas cuentas/accesos.',
    'Arma primero una versión simple del flujo y pruébala antes de automatizar el proceso completo.',
  ],
  guionAvatar: {
    texto:
      'Llegaste al final de este recorrido. Instalaste n8n, creaste tu primer flujo y recorriste cinco casos de uso respaldados por evidencia científica, no por promesas vacías. Lo más importante que te llevas no es memorizar cada flujo, sino entender que puedes empezar por uno solo, sencillo, y crecer desde ahí. En esta pantalla te dejamos una checklist práctica para dar el primer paso esta misma semana. Gracias por completar este ODC.',
    duracionEstimadaSegundos: 65,
    archivoAudio: '14-conclusion.mp3',
  },
};
