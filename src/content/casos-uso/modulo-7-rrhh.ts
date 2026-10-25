import type { CasoUso } from '../../lib/casos-uso';

export const modulo7Rrhh: CasoUso = {
  id: 'modulo-7-rrhh',
  funcionNegocio: 'Recursos Humanos',
  titulo: 'Que ningún empleado nuevo empiece su primer día sin nada listo',
  problema:
    'Cuando entra un nuevo empleado hay tareas repetitivas que cumplir (registrar sus datos, avisar al equipo, enviarle la información de bienvenida) y si dependen de que alguien se acuerde de hacerlas una por una, es fácil que se olvide algo.',
  microcontenido: [
    'Contratar a alguien nuevo es una buena noticia, pero también trae una lista de tareas de "papeleo" que hay que hacer el primer día: registrar sus datos, darle acceso a las herramientas del equipo, avisarle a los demás que llegó alguien nuevo, enviarle la información de bienvenida. Si esas tareas dependen de que alguien se acuerde de hacerlas una por una, es fácil que se te pase alguna, y el nuevo empleado empieza su primer día sin saber a quién escribirle o sin acceso a lo que necesita.',
    'Este flujo arranca cuando alguien de tu equipo llena un formulario sencillo con los datos del nuevo empleado (nombre, correo, área). A partir de ahí, todo pasa solo: se guarda el registro en tu hoja de control de personal, se envía una invitación al canal de comunicación del equipo para que todos sepan que llegó alguien nuevo, y se le manda al nuevo empleado un correo de bienvenida con la información que necesita para su primer día. Tú solo llenas el formulario una vez; el resto del proceso de bienvenida ocurre automáticamente.',
  ],
  beneficioEsperado: 'Ningún nuevo empleado empieza su primer día sin acceso o sin información, sin que el equipo tenga que acordarse de hacerlo manualmente paso por paso.',
  nivelDificultad: 'Básico',
  nodosN8nReales: ['Google Forms Trigger', 'Google Sheets (Append)', 'Slack (Send/Invite)', 'Gmail (Send)'],
  flujo: {
    nodos: [
      { id: 'n1', tipo: 'trigger', etiqueta: 'Se llena el formulario de nuevo empleado', nodoN8nReal: 'Google Forms Trigger', posicion: { x: 0, y: 100 } },
      { id: 'n2', tipo: 'accion', etiqueta: 'Guardar el registro en la hoja de personal', nodoN8nReal: 'Google Sheets (Append)', posicion: { x: 280, y: 40 } },
      { id: 'n3', tipo: 'accion', etiqueta: 'Avisar en el canal del equipo', nodoN8nReal: 'Slack (Send)', posicion: { x: 280, y: 160 } },
      { id: 'n4', tipo: 'accion', etiqueta: 'Enviar correo de bienvenida al nuevo empleado', nodoN8nReal: 'Gmail (Send)', posicion: { x: 580, y: 100 } },
    ],
    conexiones: [
      { id: 'e1', origen: 'n1', destino: 'n2' },
      { id: 'e2', origen: 'n1', destino: 'n3' },
      { id: 'e3', origen: 'n2', destino: 'n4' },
      { id: 'e4', origen: 'n3', destino: 'n4' },
    ],
  },
  actividad: {
    tipo: 'verdadero-falso',
    enunciado:
      'Para que este flujo funcione, cada vez que entra alguien nuevo, alguien del equipo tiene que escribirle manualmente al canal de Slack avisando que llegó un nuevo compañero.',
    esVerdadero: false,
    retroalimentacionCorrecta:
      'Correcto. Ese aviso en el canal del equipo lo envía el flujo automáticamente en cuanto se llena el formulario del nuevo empleado, nadie tiene que escribirlo a mano.',
    retroalimentacionIncorrecta:
      'No. Precisamente uno de los pasos automáticos del flujo es enviar ese aviso al canal del equipo; no depende de que alguien se acuerde de escribirlo.',
  },
  respaldoEvidencia:
    'Arias Montoya et al. (2026) encontraron que muchas micro y pequeñas empresas carecen de sistemas estructurados de gestión del talento humano que acompañen la adopción de IA, y que la IA fortalece esa gestión solo cuando se desarrollan las capacidades organizacionales adecuadas.',
  terminos: [
    {
      termino: 'papeleo',
      definicion: 'Trámites administrativos de ingreso de una persona: registrar sus datos, darle accesos y enviarle la información de bienvenida.',
    },
    {
      termino: 'formulario sencillo',
      definicion: 'En este flujo es el disparador: al enviarse, n8n inicia el proceso (por ejemplo, con un formulario de Google Forms).',
    },
    {
      termino: 'canal de comunicación del equipo',
      definicion: 'Espacio de mensajería compartido por el equipo, como Slack o Microsoft Teams. n8n puede enviar mensajes a un canal.',
    },
  ],
  guionAvatar: {
    texto:
      '¿Se te ha olvidado avisarle al equipo que llega alguien nuevo, o que el nuevo empleado se quede sin la información básica su primer día? Esta pantalla te muestra un flujo que se encarga de ese proceso de bienvenida por ti. Revísalo y responde la actividad de verdadero o falso. La idea clave es que tú solo llenas un formulario una vez, y el flujo hace el resto: guarda el registro, avisa al equipo y le da la bienvenida al nuevo empleado, todo sin que nadie tenga que acordarse de hacerlo paso por paso. Ya con estos seis casos conociste ejemplos de automatización en distintas áreas de un negocio ahora vamos a ver qué dice la evidencia científica sobre todo esto.',
    duracionEstimadaSegundos: 76,
    archivoAudio: '11-modulo7-rrhh.mp3',
  },
};
