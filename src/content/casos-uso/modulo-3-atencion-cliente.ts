import type { CasoUso } from '../../lib/casos-uso';

export const modulo3AtencionCliente: CasoUso = {
  id: 'modulo-3-atencion-cliente',
  funcionNegocio: 'Atención al cliente',
  titulo: 'Un asistente que responde tu WhatsApp cuando tú no puedes',
  problema:
    'Los clientes escriben por WhatsApp a cualquier hora preguntando por horarios, precios o disponibilidad. Cada minuto de demora en responder es una venta que se puede perder, pero contestar manualmente las 24 horas no es viable para un negocio pequeño.',
  microcontenido: [
    'Cuando un cliente te escribe por WhatsApp a las 9 de la noche preguntando si tienes stock de un producto, cada minuto que tarda tu respuesta es una posibilidad de que compre en otro lado. Este flujo conecta tu WhatsApp de negocio con un asistente de inteligencia artificial que responde automáticamente preguntas frecuentes (horarios, precios, disponibilidad, ubicación) las 24 horas, y solo te avisa a ti cuando el cliente necesita algo que la IA no puede resolver sola, como negociar un descuento o resolver una queja. No reemplaza tu atención personal: la libera para lo que de verdad la necesita.',
    'El flujo arranca cuando llega un mensaje nuevo a tu WhatsApp de negocio. n8n se lo pasa a un asistente de IA (el mismo tipo de tecnología detrás de ChatGPT) que ya conoce la información de tu negocio: catálogo, horarios, políticas. Si la pregunta es sencilla, el cliente recibe una respuesta natural en segundos, no un menú robótico de opciones. Si el asistente detecta que el tema requiere tu criterio, un reclamo o una cotización especial, el flujo se detiene y te notifica a ti para que tomes el control de la conversación.',
  ],
  beneficioEsperado: 'Reduce el tiempo de primera respuesta de horas a segundos, sin contratar personal adicional para el chat.',
  nivelDificultad: 'Intermedio',
  nodosN8nReales: ['WhatsApp Trigger', 'AI Agent', 'Memory Buffer Window', 'IF', 'WhatsApp (Send Message)'],
  flujo: {
    nodos: [
      { id: 'n1', tipo: 'trigger', etiqueta: 'Mensaje de WhatsApp recibido', nodoN8nReal: 'WhatsApp Trigger', posicion: { x: 0, y: 100 } },
      { id: 'n2', tipo: 'ia', etiqueta: 'Asistente de IA genera respuesta', nodoN8nReal: 'AI Agent', posicion: { x: 260, y: 100 } },
      { id: 'n3', tipo: 'condicion', etiqueta: '¿La IA puede resolverlo sola?', nodoN8nReal: 'IF', posicion: { x: 520, y: 100 } },
      { id: 'n4', tipo: 'accion', etiqueta: 'Enviar respuesta por WhatsApp', nodoN8nReal: 'WhatsApp (Send Message)', posicion: { x: 800, y: 20 } },
      { id: 'n5', tipo: 'accion', etiqueta: 'Notificar al dueño del negocio', nodoN8nReal: 'Gmail / Slack (Send)', posicion: { x: 800, y: 200 } },
    ],
    conexiones: [
      { id: 'e1', origen: 'n1', destino: 'n2' },
      { id: 'e2', origen: 'n2', destino: 'n3' },
      { id: 'e3', origen: 'n3', destino: 'n4', etiqueta: 'Sí' },
      { id: 'e4', origen: 'n3', destino: 'n5', etiqueta: 'No' },
    ],
  },
  actividad: {
    tipo: 'seleccion-multiple',
    pregunta: 'Un cliente escribe: "¿Tienen envíos a Medellín?" ¿Qué pasa en el flujo?',
    opciones: [
      {
        texto: 'El mensaje se ignora hasta que el dueño lo revise manualmente.',
        correcta: false,
        retroalimentacion: 'No. El flujo está diseñado justamente para que la IA responda esas preguntas frecuentes sin esperar a que el dueño esté disponible.',
      },
      {
        texto: 'El asistente de IA responde automáticamente con la información de envíos, sin intervención humana.',
        correcta: true,
        retroalimentacion: 'Correcto. Como es una pregunta frecuente que la IA ya conoce (la política de envíos), puede resolverla sola y responder en segundos.',
      },
      {
        texto: 'El sistema cobra automáticamente el envío sin confirmar con el cliente.',
        correcta: false,
        retroalimentacion: 'No. Este flujo solo responde preguntas; no procesa pagos ni cobros, eso requeriría una integración adicional que no está en este flujo básico.',
      },
    ],
  },
  respaldoEvidencia:
    'Una revisión sobre IA conversacional en pymes concluye que los chatbots permiten automatizar la atención al cliente, pero funcionan mejor como complemento y no como reemplazo del equipo humano (Ridho, 2023). Ese es el diseño de este flujo: la IA resuelve lo repetitivo y te pasa a ti lo que requiere criterio, el patrón de colaboración humano-IA que la revisión asocia con los casos más exitosos (Ortolano y Gallegos, 2026).',
  video: {
    youtubeId: '12Jib6Hvz8E',
    titulo: 'Conecta tu WhatsApp a un agente de IA con n8n',
    canal: 'Candela - IA para e-commerce y MercadoLibre',
    anio: 2025,
    inicio: 640,
    fin: 720,
    descripcion: 'Demostración de un asistente de IA, orquestado con n8n, respondiendo mensajes de clientes en tiempo real (en el video se usa además la plataforma Superchat).',
  },
  terminos: [
    {
      termino: 'asistente de inteligencia artificial',
      definicion: 'Programa que conversa en lenguaje natural. Funciona con un modelo de lenguaje de gran tamaño (LLM): un tipo de red neuronal de aprendizaje profundo (deep learning) entrenada con enormes cantidades de texto.',
    },
    {
      termino: 'preguntas frecuentes',
      definicion: 'Preguntas que los clientes repiten una y otra vez (horarios, precios, ubicación). Por ser repetitivas, son las primeras candidatas a automatizar.',
    },
    {
      termino: 'ChatGPT',
      definicion: 'Asistente conversacional de OpenAI basado en un modelo de lenguaje de gran tamaño (LLM). El nodo AI Agent de n8n puede conectarse a modelos de este tipo.',
    },
  ],
  guionAvatar: {
    texto:
      'Imagina que tu negocio pudiera responder WhatsApp las 24 horas, sin que tú tengas que estar pegado al celular. En esta pantalla vas a ver cómo un flujo de automatización conecta tu WhatsApp con un asistente de inteligencia artificial. Léelo con calma y luego resuelve la actividad para comprobar que entendiste cómo decide cuándo responder solo y cuándo avisarte a ti. Lo importante no es que la IA reemplace tu atención al cliente, sino que se encargue de las preguntas repetitivas horario, precio, disponibilidad para que tú te concentres en las conversaciones que sí necesitan tu criterio, como un reclamo o una negociación. Cuando termines la actividad, sigue al siguiente caso: cómo automatizar el seguimiento de tus clientes potenciales en marketing.',
    duracionEstimadaSegundos: 78,
    archivoAudio: '07-modulo3-atencion-cliente.mp3',
  },
};
