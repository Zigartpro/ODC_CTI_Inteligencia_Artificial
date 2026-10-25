import type { CasoUso } from '../../lib/casos-uso';

export const modulo4Marketing: CasoUso = {
  id: 'modulo-4-marketing',
  funcionNegocio: 'Marketing',
  titulo: 'Que ningún cliente potencial se enfríe por falta de seguimiento',
  problema:
    'Llegan interesados nuevos (alguien llenó un formulario, dejó su correo, preguntó por un servicio) pero entre el día a día se olvida hacerles seguimiento a tiempo, y muchos se enfrían sin llegar a comprar.',
  microcontenido: [
    'Cada semana llegan nuevos interesados a tu negocio, pero entre atender el día a día ese contacto se queda esperando en una hoja de cálculo o en la bandeja de entrada. La mayoría de las ventas no se pierden porque el cliente dijera que no, sino porque nadie volvió a escribirle a tiempo. Este flujo revisa automáticamente tu lista de contactos nuevos y le envía un correo de seguimiento personalizado a quien todavía no ha recibido respuesta, sin que tengas que acordarte de hacerlo tú.',
    'El flujo se ejecuta solo, por ejemplo una vez al día. Primero revisa tu hoja de cálculo de leads (la misma que ya usas, o una simple en Google Sheets) y filtra quiénes son contactos nuevos que aún no han sido contactados. A cada uno le envía un correo con su nombre y la información del servicio que preguntó, usando una plantilla que tú defines una sola vez. Cuando el correo se envía, el flujo actualiza la hoja para marcar ese contacto como "contactado", así nunca se le escribe dos veces ni se le olvida a nadie.',
  ],
  beneficioEsperado: 'Ningún interesado se queda sin respuesta por olvido, sin revisar manualmente la lista cada día.',
  nivelDificultad: 'Básico',
  nodosN8nReales: ['Schedule Trigger', 'Google Sheets (Read)', 'Filter', 'Gmail (Send Email)', 'Google Sheets (Update)'],
  flujo: {
    nodos: [
      { id: 'n1', tipo: 'trigger', etiqueta: "Se ejecuta todos los días a las 9 a. m.", nodoN8nReal: 'Schedule Trigger', posicion: { x: 0, y: 100 } },
      { id: 'n2', tipo: 'accion', etiqueta: 'Leer la hoja de leads', nodoN8nReal: 'Google Sheets (Read)', posicion: { x: 260, y: 100 } },
      { id: 'n3', tipo: 'condicion', etiqueta: '¿Es un lead nuevo sin contactar?', nodoN8nReal: 'Filter', posicion: { x: 520, y: 100 } },
      { id: 'n4', tipo: 'accion', etiqueta: 'Enviar correo de seguimiento personalizado', nodoN8nReal: 'Gmail (Send Email)', posicion: { x: 780, y: 100 } },
      { id: 'n5', tipo: 'accion', etiqueta: "Marcar el lead como 'contactado'", nodoN8nReal: 'Google Sheets (Update)', posicion: { x: 1040, y: 100 } },
    ],
    conexiones: [
      { id: 'e1', origen: 'n1', destino: 'n2' },
      { id: 'e2', origen: 'n2', destino: 'n3' },
      { id: 'e3', origen: 'n3', destino: 'n4', etiqueta: 'Sí' },
      { id: 'e4', origen: 'n4', destino: 'n5' },
    ],
  },
  actividad: {
    tipo: 'verdadero-falso',
    enunciado:
      'Si dos leads distintos preguntan por el mismo servicio el mismo día, el flujo les envía el correo exactamente a la hora en que se ejecuta el flujo, no en el momento en que llenaron el formulario.',
    esVerdadero: true,
    retroalimentacionCorrecta:
      'Correcto. El flujo no reacciona al instante en que alguien deja sus datos: se ejecuta en un horario fijo (por ejemplo, una vez al día) y en esa corrida atiende a todos los leads pendientes que encuentre.',
    retroalimentacionIncorrecta:
      'No exactamente. Este flujo usa un "disparador programado" (Schedule Trigger): corre a una hora fija cada día y ahí procesa a todos los leads pendientes que encuentre en ese momento, sin importar a qué hora llenaron el formulario.',
  },
  respaldoEvidencia:
    'Zeng et al. (2022) encontraron que las pymes que optimizan su contenido en redes sociales con apoyo de IA logran más visibilidad que con contenido genérico, y Susanto et al. (2025) muestran que el análisis automático de los comentarios de los clientes es viable para pymes con recursos limitados.',
  terminos: [
    {
      termino: 'leads',
      definicion: 'Contactos de posibles clientes que mostraron interés (llenaron un formulario, escribieron o dejaron su correo) pero todavía no han comprado.',
    },
    {
      termino: 'Google Sheets',
      definicion: 'Hoja de cálculo en línea de Google. n8n puede leerla y escribir en ella con su nodo de Google Sheets.',
    },
    {
      termino: 'plantilla',
      definicion: 'Mensaje base reutilizable, con campos variables (nombre, servicio) que el flujo completa para cada contacto.',
    },
  ],
  guionAvatar: {
    texto:
      '¿Cuántos clientes potenciales se te han enfriado porque se te olvidó escribirles a tiempo? Esta pantalla te muestra un flujo que hace ese seguimiento por ti. Revísalo y luego responde la actividad de verdadero o falso. La clave de este flujo no es la velocidad, es la constancia: se ejecuta todos los días sin falta, revisa quién no ha sido contactado y le escribe, así tú nunca dependes de acordarte. Ahora sigamos con el tercer caso: cómo automatizar el papeleo de tus facturas.',
    duracionEstimadaSegundos: 62,
    archivoAudio: '08-modulo4-marketing.mp3',
  },
};
