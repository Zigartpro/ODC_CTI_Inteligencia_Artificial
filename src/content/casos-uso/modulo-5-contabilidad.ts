import type { CasoUso } from '../../lib/casos-uso';

export const modulo5Contabilidad: CasoUso = {
  id: 'modulo-5-contabilidad',
  funcionNegocio: 'Contabilidad / Facturación',
  titulo: 'Que las facturas se registren solas, sin transcribirlas a mano',
  problema:
    'Cada factura de un proveedor llega por correo como PDF y hay que abrirla, leerla y copiar sus datos a mano en una hoja de cálculo o en el sistema contable: una tarea repetitiva y propensa a errores de digitación.',
  microcontenido: [
    'Cada factura que te llega por correo (de tu proveedor de insumos, del servicio de internet, del contador) significa abrir el PDF, leer los datos y transcribirlos a mano en tu hoja de gastos o en tu software contable. Es una tarea que no agrega valor a tu negocio, pero toma tiempo y, si te equivocas al digitar un número, puede desordenar tus cuentas del mes. Este flujo hace esa lectura y transcripción por ti: revisa tu correo, detecta las facturas que llegan como adjunto, extrae los datos importantes y los deja organizados en una hoja de cálculo lista para revisar.',
    'El flujo revisa tu bandeja de entrada buscando correos con un archivo PDF adjunto. Cuando encuentra uno, un asistente de inteligencia artificial "lee" el documento (igual que lo harías tú) e identifica el proveedor, el valor total, la fecha y el número de factura. Esos datos se agregan como una fila nueva en tu hoja de cálculo de gastos, y el flujo te envía una notificación por correo avisándote que hay una factura nueva registrada, por si quieres revisarla antes de pagar. Tú sigues teniendo la última palabra: el flujo solo hace el trabajo de digitación.',
  ],
  beneficioEsperado: 'Elimina la transcripción manual de datos de facturas y reduce errores de digitación en tus cuentas.',
  nivelDificultad: 'Intermedio',
  nodosN8nReales: ['Gmail Trigger', 'IF', 'Extract from File', 'AI Agent', 'Google Sheets (Append)', 'Gmail (Send)'],
  flujo: {
    nodos: [
      { id: 'n1', tipo: 'trigger', etiqueta: 'Llega un correo nuevo con adjunto', nodoN8nReal: 'Gmail Trigger', posicion: { x: 0, y: 100 } },
      { id: 'n2', tipo: 'condicion', etiqueta: '¿Trae un PDF adjunto?', nodoN8nReal: 'IF', posicion: { x: 260, y: 100 } },
      { id: 'n3', tipo: 'ia', etiqueta: 'Extraer proveedor, valor y fecha de la factura', nodoN8nReal: 'Extract from File + AI Agent', posicion: { x: 520, y: 100 } },
      { id: 'n4', tipo: 'accion', etiqueta: 'Guardar los datos en la hoja de gastos', nodoN8nReal: 'Google Sheets (Append)', posicion: { x: 800, y: 100 } },
      { id: 'n5', tipo: 'accion', etiqueta: 'Avisar por correo que hay una factura nueva', nodoN8nReal: 'Gmail (Send)', posicion: { x: 1060, y: 100 } },
    ],
    conexiones: [
      { id: 'e1', origen: 'n1', destino: 'n2' },
      { id: 'e2', origen: 'n2', destino: 'n3', etiqueta: 'Sí' },
      { id: 'e3', origen: 'n3', destino: 'n4' },
      { id: 'e4', origen: 'n4', destino: 'n5' },
    ],
  },
  actividad: {
    tipo: 'ordenar-pasos',
    instruccion: 'Ordena correctamente los pasos de este flujo, de principio a fin.',
    pasosEnOrden: [
      'Llega un correo con una factura en PDF adjunta',
      'El flujo revisa si el correo trae un archivo adjunto',
      'La IA lee el PDF y extrae proveedor, valor y fecha',
      'Los datos se guardan como fila nueva en la hoja de gastos',
      'Se envía un aviso por correo de que hay una factura nueva registrada',
    ],
    retroalimentacion:
      'Así fluye la información: primero llega la factura, luego se detecta el adjunto, después la IA la lee, se guarda el dato y por último se te notifica, en ese orden y no antes.',
  },
  respaldoEvidencia:
    'Kortesalmi (2025) propone, para firmas contables pequeñas, un modelo de madurez digital que les permite evaluar su nivel actual y trazar una ruta hacia una automatización más sofisticada. En pymes que ya usan IA, los efectos más fuertes se observan en la reducción de la carga de trabajo y la eficiencia de tiempo (Polasik et al., 2026).',
  guionAvatar: {
    texto:
      '¿Cuánto tiempo pasas cada semana copiando datos de facturas a una hoja de cálculo? En esta pantalla vas a ordenar los pasos de un flujo que hace esa transcripción por ti. Arrastra cada paso al orden correcto. Este flujo no decide nada por ti, solo lee y organiza: tú sigues revisando y aprobando cada factura antes de pagar, pero ya no tienes que digitarla desde cero. Con estos tres casos ya tienes una idea clara de cómo n8n puede aliviar tareas repetitivas en distintas áreas de tu negocio.',
    duracionEstimadaSegundos: 68,
    archivoAudio: '09-modulo5-contabilidad.mp3',
  },
};
