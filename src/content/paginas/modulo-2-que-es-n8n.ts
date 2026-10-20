import type { PantallaConceptos } from '../../lib/contenido-simple';

export const modulo2QueEsN8n: PantallaConceptos = {
  id: 'modulo-2-que-es-n8n',
  titulo: '¿Qué es n8n?',
  microcontenido: [
    'n8n (se pronuncia "n-eit-n", de "nodemation") es una herramienta que te permite conectar las aplicaciones que ya usas (WhatsApp, Gmail, Google Sheets, tu tienda en línea) para que hagan tareas automáticamente, sin que tengas que copiar y pegar información entre una y otra. Piensa en n8n como un empleado invisible que se encarga de las tareas repetitivas: revisar el correo, actualizar una hoja de cálculo, enviar un mensaje de seguimiento. Tú decides las reglas una sola vez, y n8n las ejecuta todas las veces que haga falta, sin cansarse ni olvidarse.',
    'Un flujo de trabajo en n8n se arma conectando piezas llamadas nodos, como fichas de un rompecabezas: un nodo dispara el proceso (por ejemplo, "llegó un mensaje nuevo"), otros nodos hacen algo con esa información (leerla, guardarla, responderla), y así hasta terminar la tarea. Lo que hace especial a n8n es que es una herramienta low-code: no necesitas saber programar para construir estos flujos, se arman visualmente arrastrando y conectando nodos, aunque también permite escribir código para quien sí sabe y quiere personalizar algo más a fondo.',
  ],
  terminos: [
    {
      termino: 'nodo',
      definicion:
        'Un bloque individual dentro de un flujo de n8n que hace una sola cosa: recibir un mensaje, leer una hoja de cálculo, enviar un correo, preguntarle algo a una IA. Un flujo completo se arma conectando varios nodos, uno después del otro.',
    },
    {
      termino: 'flujo de trabajo',
      definicion:
        'La secuencia completa de nodos conectados que automatiza una tarea de principio a fin. Por ejemplo, todo el proceso de "recibir un mensaje de WhatsApp → generar una respuesta con IA → enviarla de vuelta" es un flujo de trabajo (workflow).',
    },
    {
      termino: 'low-code',
      definicion:
        'Significa "poco código". Son herramientas que te dejan construir algo funcional usando bloques visuales y configuraciones, en vez de escribir cientos de líneas de código de programación. n8n es low-code: casi todo se arma arrastrando y conectando, no escribiendo.',
    },
  ],
  video: {
    youtubeId: 'kFxHfNSFpoc',
    titulo: 'Automatiza todo con n8n: guía en español para principiantes',
    canal: 'Código Espinoza - IA y Machine Learning',
    anio: 2025,
    inicio: 0,
    fin: 120,
    descripcion: 'Los primeros dos minutos de esta guía presentan qué es n8n y para qué sirve.',
  },
  actividad: {
    tipo: 'clasificar',
    instruccion: 'Todo flujo se arma con tres tipos de piezas. Clasifica cada tarjeta en el tipo de nodo que le corresponde.',
    categorias: [
      { id: 'disparador', nombre: 'Disparador', descripcion: 'Lo que pone en marcha el flujo' },
      { id: 'condicion', nombre: 'Condición', descripcion: 'Una pregunta que decide el camino' },
      { id: 'accion', nombre: 'Acción', descripcion: 'Algo que el flujo hace' },
    ],
    elementos: [
      { texto: 'Llega un mensaje nuevo de WhatsApp', categoria: 'disparador', explicacion: 'Es un evento que pone en marcha el flujo: por eso es un disparador (trigger).' },
      { texto: 'Todos los días a las 8:00 a. m.', categoria: 'disparador', explicacion: 'Un horario también puede arrancar un flujo: es el nodo Schedule Trigger.' },
      { texto: '¿El pedido supera los $500.000?', categoria: 'condicion', explicacion: 'Es una pregunta de sí o no que decide qué camino sigue el flujo (nodo IF).' },
      { texto: '¿El cliente ya está en la hoja de cálculo?', categoria: 'condicion', explicacion: 'Compara un dato para decidir qué hacer después: es una condición.' },
      { texto: 'Enviar un correo de confirmación al cliente', categoria: 'accion', explicacion: 'Es una tarea que el flujo ejecuta: una acción.' },
      { texto: 'Guardar los datos en Google Sheets', categoria: 'accion', explicacion: 'Escribir en una hoja de cálculo es algo que el flujo hace: una acción.' },
    ],
  },
  guionAvatar: {
    texto:
      'Antes de ver casos concretos, necesitas entender qué es n8n en términos simples. En esta pantalla vas a encontrar palabras marcadas que puedes tocar para ver su definición corta, no te preocupes por memorizarlas, están ahí para consultarlas cuando las necesites. La idea clave es esta: n8n conecta las herramientas que ya usas en tu negocio para que se pasen información entre ellas automáticamente, sin que tú tengas que hacerlo a mano. No necesitas saber programar para construir esto. Al final, clasifica las piezas de un flujo en la actividad. En el siguiente módulo vas a instalar n8n y crear tu primer flujo.',
    duracionEstimadaSegundos: 70,
    archivoAudio: '06-modulo2-que-es-n8n.mp3',
  },
};
