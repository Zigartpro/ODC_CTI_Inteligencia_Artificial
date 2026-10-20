import type { EvaluacionFinal } from '../../lib/evaluacion';

export const evaluacionFinal: EvaluacionFinal = {
  titulo: 'Evaluación final',
  instrucciones:
    'Responde las 9 preguntas (una por cada módulo que viste). Necesitas al menos el 80% de aciertos para aprobar, tal como se explicó en el módulo del REA. Al enviar, verás cuáles respondiste bien y cuáles no, con la explicación de cada una.',
  umbralAprobacionPorcentaje: 80,
  preguntas: [
    {
      id: 'p1-introduccion',
      repasoPantallaId: 'modulo-1-introduccion',
      tipo: 'seleccion-multiple',
      pregunta:
        'Según las cifras del módulo de introducción, ¿cuál es la principal razón por la que las pymes colombianas no han adoptado más la automatización con IA?',
      opciones: [
        { texto: 'Falta de interés de los dueños de los negocios.', correcta: false },
        { texto: 'Falta de acceso a conocimiento claro y aplicable sobre cómo empezar.', correcta: true },
        { texto: 'Está prohibido por ley en Colombia.', correcta: false },
      ],
      retroalimentacion:
        'El interés existe: el 52% de las pymes ya tiene a alguien a cargo de la tecnología (CIPE, 2024), pero solo el 30% automatiza procesos (iNNpulsa Colombia, 2024). Lo que falta es conocimiento claro y aplicable sobre cómo empezar, justo lo que este ODC busca resolver.',
    },
    {
      id: 'p2-que-es-n8n',
      repasoPantallaId: 'modulo-2-que-es-n8n',
      tipo: 'verdadero-falso',
      enunciado: 'n8n es una herramienta "low-code", lo que significa que necesitas saber programación avanzada para usarla.',
      esVerdadero: false,
      retroalimentacion:
        '"Low-code" significa justo lo contrario: puedes construir flujos completos arrastrando y conectando nodos visualmente, sin necesitar programación avanzada (aunque permite código para quien quiera personalizar más).',
    },
    {
      id: 'p-instalacion',
      repasoPantallaId: 'modulo-instalacion',
      tipo: 'verdadero-falso',
      enunciado: 'Si instalas n8n con Docker en tu computador, tus flujos siguen funcionando aunque apagues el equipo.',
      esVerdadero: false,
      retroalimentacion:
        'Con Docker, n8n corre en tu propio equipo: si lo apagas o cierras la ventana donde corre, los flujos se detienen. Si necesitas que funcionen todo el día, conviene n8n Cloud o un servidor.',
    },
    {
      id: 'p3-atencion-cliente',
      repasoPantallaId: 'modulo-3-atencion-cliente',
      tipo: 'seleccion-multiple',
      pregunta: 'En el flujo de atención al cliente por WhatsApp, ¿qué nodo decide si el asistente de IA responde solo o si avisa al dueño del negocio?',
      opciones: [
        { texto: 'El nodo WhatsApp Trigger (que recibe el mensaje).', correcta: false },
        { texto: 'El nodo IF, que evalúa si la IA puede resolverlo sola.', correcta: true },
        { texto: 'El nodo AI Agent, porque genera la respuesta.', correcta: false },
      ],
      retroalimentacion:
        'El AI Agent genera una respuesta candidata, pero es el nodo IF el que decide, según esa respuesta, si se envía directo al cliente o si se notifica al dueño.',
    },
    {
      id: 'p4-marketing',
      repasoPantallaId: 'modulo-4-marketing',
      tipo: 'verdadero-falso',
      enunciado: 'El flujo de seguimiento de leads del caso de marketing envía el correo de seguimiento en el mismo instante en que la persona llena el formulario.',
      esVerdadero: false,
      retroalimentacion:
        'Ese flujo usa un Schedule Trigger: corre a una hora fija (por ejemplo, una vez al día) y en esa corrida atiende a todos los leads pendientes, no reacciona en tiempo real al llenar el formulario.',
    },
    {
      id: 'p5-contabilidad',
      repasoPantallaId: 'modulo-5-contabilidad',
      tipo: 'seleccion-multiple',
      pregunta: '¿Qué hace exactamente la inteligencia artificial en el flujo de procesamiento de facturas del caso de contabilidad?',
      opciones: [
        { texto: 'Decide automáticamente si la factura se debe pagar o no.', correcta: false },
        { texto: 'Lee el PDF adjunto y extrae proveedor, valor y fecha.', correcta: true },
        { texto: 'Transfiere el dinero directamente al proveedor.', correcta: false },
      ],
      retroalimentacion:
        'La IA solo hace el trabajo de "lectura y transcripción" del documento; la decisión de pagar sigue siendo tuya, el flujo únicamente te notifica que hay una factura nueva registrada.',
    },
    {
      id: 'p6-inventario',
      repasoPantallaId: 'modulo-6-inventario',
      tipo: 'verdadero-falso',
      enunciado: 'El flujo de inventario te vuelve a notificar todos los días sobre el mismo producto con stock bajo, aunque ya te haya avisado antes.',
      esVerdadero: false,
      retroalimentacion:
        'El flujo guarda un registro de qué productos ya notificó, precisamente para no repetir la misma alerta cada día mientras no repongas el producto.',
    },
    {
      id: 'p7-rrhh',
      repasoPantallaId: 'modulo-7-rrhh',
      tipo: 'seleccion-multiple',
      pregunta: '¿Qué es lo que inicia (dispara) el flujo de bienvenida a un nuevo empleado en el caso de recursos humanos?',
      opciones: [
        { texto: 'Que el nuevo empleado escriba por WhatsApp.', correcta: false },
        { texto: 'Que alguien del equipo llene un formulario con los datos del nuevo empleado.', correcta: true },
        { texto: 'Que pasen 24 horas desde la fecha de contratación.', correcta: false },
      ],
      retroalimentacion:
        'Todo el proceso automático (guardar registro, avisar al equipo, enviar bienvenida) arranca cuando alguien llena ese formulario inicial: es el disparador de todo el flujo.',
    },
    {
      id: 'p8-evidencia',
      repasoPantallaId: 'modulo-8-evidencia',
      tipo: 'seleccion-multiple',
      pregunta: 'Según la revisión de los 30 estudios científicos presentada en el módulo de evidencia científica, ¿cuál es el patrón más consistente sobre cómo la IA afecta el trabajo en las pymes?',
      opciones: [
        { texto: 'La IA reemplaza por completo el trabajo humano en la mayoría de los casos.', correcta: false },
        { texto: 'La colaboración humano-IA, no la sustitución, es el patrón que más se repite en los casos exitosos.', correcta: true },
        { texto: 'La evidencia no muestra ningún impacto medible de la IA en pymes.', correcta: false },
      ],
      retroalimentacion:
        'Estudios como los de Knoblach et al. y Ortolano y Gallegos describen los casos más exitosos como colaboración humano-IA, no como sustitución del trabajo humano.',
    },
  ],
};
