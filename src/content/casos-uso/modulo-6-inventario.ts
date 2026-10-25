import type { CasoUso } from '../../lib/casos-uso';

export const modulo6Inventario: CasoUso = {
  id: 'modulo-6-inventario',
  funcionNegocio: 'Inventario / Logística',
  titulo: 'Que un producto nunca se agote sin que te des cuenta',
  problema:
    'Un producto se agota y solo lo descubres cuando el cliente pregunta y ya no hay, perdiendo la venta y a veces al cliente. Revisar el inventario manualmente todos los días no es realista con decenas o cientos de referencias.',
  microcontenido: [
    'Cuando un producto se agota sin que te des cuenta, no solo pierdes esa venta: el cliente puede irse a comprarlo a la competencia y no volver. Revisar manualmente el inventario de cada producto, todos los días, no es realista si tienes decenas o cientos de referencias. Este flujo revisa tu inventario automáticamente y te avisa apenas un producto baja de la cantidad mínima que tú definas, para que puedas reabastecerlo a tiempo, antes de quedarte sin stock.',
    'El flujo corre solo, por ejemplo cada mañana. Revisa la cantidad disponible de cada producto (ya sea en tu hoja de inventario o directamente en tu tienda en línea) y la compara contra el mínimo que definiste para cada uno. Si algún producto está por debajo de ese mínimo, te envía una alerta con el nombre del producto y cuánto queda, y guarda un registro de que ya te avisó, para no mandarte el mismo aviso todos los días mientras lo repones.',
  ],
  beneficioEsperado: 'Te enteras de que un producto se está agotando antes de perder la venta, sin revisar el inventario manualmente cada día.',
  nivelDificultad: 'Básico',
  nodosN8nReales: ['Schedule Trigger', 'Shopify / Google Sheets (Read)', 'IF', 'Google Sheets (Append)', 'Slack / Gmail (Send)'],
  flujo: {
    nodos: [
      { id: 'n1', tipo: 'trigger', etiqueta: 'Se ejecuta todas las mañanas', nodoN8nReal: 'Schedule Trigger', posicion: { x: 0, y: 100 } },
      { id: 'n2', tipo: 'accion', etiqueta: 'Revisar cantidad disponible de cada producto', nodoN8nReal: 'Shopify / Google Sheets (Read)', posicion: { x: 260, y: 100 } },
      { id: 'n3', tipo: 'condicion', etiqueta: '¿Está bajo el mínimo definido?', nodoN8nReal: 'IF', posicion: { x: 560, y: 100 } },
      { id: 'n4', tipo: 'accion', etiqueta: 'Enviar alerta de stock bajo', nodoN8nReal: 'Slack / Gmail (Send)', posicion: { x: 860, y: 40 } },
      { id: 'n5', tipo: 'accion', etiqueta: 'Registrar que ya se avisó (evitar repetir)', nodoN8nReal: 'Google Sheets (Append)', posicion: { x: 860, y: 180 } },
    ],
    conexiones: [
      { id: 'e1', origen: 'n1', destino: 'n2' },
      { id: 'e2', origen: 'n2', destino: 'n3' },
      { id: 'e3', origen: 'n3', destino: 'n4', etiqueta: 'Sí' },
      { id: 'e4', origen: 'n4', destino: 'n5' },
    ],
  },
  actividad: {
    tipo: 'seleccion-multiple',
    pregunta:
      'Ya recibiste una alerta de que "Camisas talla M" están bajas en stock. Al día siguiente el flujo vuelve a correr y el producto sigue bajo el mínimo (aún no lo has repuesto). ¿Qué hace el flujo?',
    opciones: [
      {
        texto: 'Te envía la alerta de nuevo, tal como el primer día.',
        correcta: false,
        retroalimentacion: 'No. El flujo guarda un registro de qué productos ya notificó, precisamente para no enviarte el mismo aviso una y otra vez mientras no lo repones.',
      },
      {
        texto: 'No te vuelve a notificar ese producto porque ya quedó registrado como avisado, aunque siga bajo el mínimo.',
        correcta: true,
        retroalimentacion: 'Correcto. El registro de alertas ya enviadas evita que te bombardee con el mismo aviso todos los días; volverá a avisarte si el producto se repone y luego vuelve a bajar.',
      },
      {
        texto: 'Deja de revisar ese producto en el inventario de ahora en adelante.',
        correcta: false,
        retroalimentacion: 'No. El flujo sigue revisando todos los productos todos los días; solo evita repetir la notificación de uno que ya avisó.',
      },
    ],
  },
  respaldoEvidencia:
    'En un estudio con 400 pymes, la automatización logística y los sistemas de apoyo a la decisión con IA se relacionaron con una mayor eficiencia operativa (Inmor et al., 2025), y las pymes manufactureras muestran un fuerte interés en usar IA para optimizar sus recursos (Chiarini et al., 2026).',
  terminos: [
    {
      termino: 'referencias',
      definicion: 'En inventario, cada producto distinto que se maneja (por ejemplo, una camisa en talla M es una referencia).',
    },
    {
      termino: 'stock',
      definicion: 'Existencias: cantidad de unidades de un producto disponibles para vender.',
    },
    {
      termino: 'cantidad mínima',
      definicion: 'Nivel de existencias por debajo del cual conviene reponer el producto (punto de reorden). Se define para cada producto.',
    },
  ],
  guionAvatar: {
    texto:
      '¿Alguna vez un cliente te ha preguntado por un producto que ya se te acabó sin que lo notaras? Esta pantalla te muestra un flujo que revisa tu inventario por ti y te avisa a tiempo. Léelo y luego responde la pregunta de selección múltiple. La idea clave es que el flujo no te satura de avisos repetidos: te notifica una vez por producto y espera hasta que lo repongas para volver a avisarte si vuelve a bajar. Sigamos con el siguiente caso: cómo automatizar la bienvenida a un nuevo empleado.',
    duracionEstimadaSegundos: 70,
    archivoAudio: '10-modulo6-inventario.mp3',
  },
};
