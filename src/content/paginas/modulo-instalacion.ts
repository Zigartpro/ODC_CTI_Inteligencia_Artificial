import type { GuiaInstalacion } from '../../lib/guia';

// Comandos verificados contra la documentación oficial de n8n (docs.n8n.io, "Docker
// installation", consultada el 16-10-2026). Se escriben en una sola línea para que funcionen
// igual en PowerShell (Windows) y en la terminal de Mac/Linux.
export const moduloInstalacion: GuiaInstalacion = {
  id: 'modulo-instalacion',
  titulo: 'Manos a la obra: instala n8n y crea tu primer flujo',
  proposito:
    'Hasta aquí sabes qué es n8n. En este módulo lo pones a funcionar en tu propio computador y construyes un flujo muy sencillo de principio a fin, para perderle el miedo antes de ver los casos de negocio.',
  opciones: [
    {
      id: 'nube',
      nombre: 'n8n Cloud (sin instalar nada)',
      resumen:
        'Creas una cuenta en n8n.io y usas el editor directamente desde el navegador. Es la forma más rápida de probar, pero es un servicio de pago con un periodo de prueba gratuito; revisa los precios vigentes en n8n.io antes de decidir.',
      ventajas: ['No instalas nada', 'Funciona desde cualquier computador', 'Tus flujos siguen corriendo aunque apagues tu equipo'],
      limitaciones: ['Tiene costo mensual al terminar la prueba', 'Tus datos quedan en servidores de n8n'],
      pasos: [
        { titulo: 'Crea tu cuenta', detalle: 'Entra a n8n.io, elige "Get started" y regístrate con tu correo.' },
        { titulo: 'Abre el editor', detalle: 'Al confirmar tu cuenta entras directo al editor de flujos en el navegador.' },
      ],
    },
    {
      id: 'docker',
      nombre: 'En tu computador con Docker (gratis)',
      resumen:
        'Docker es un programa que "empaqueta" aplicaciones para que funcionen igual en cualquier computador. Con él puedes usar la versión comunitaria de n8n gratis, en tu propio equipo.',
      ventajas: ['Gratis y sin límite de flujos', 'Tus datos se quedan en tu computador', 'Ideal para aprender y experimentar'],
      limitaciones: ['Los flujos solo corren mientras tu computador esté encendido', 'Requiere instalar Docker Desktop (unos 10 minutos)'],
      pasos: [
        {
          titulo: 'Instala Docker Desktop',
          detalle:
            'Descárgalo gratis desde docker.com e instálalo como cualquier programa. En Windows, si te lo pide, acepta activar WSL 2 y reinicia el equipo. Luego abre Docker Desktop y déjalo abierto.',
        },
        {
          titulo: 'Crea un espacio para guardar tus flujos',
          detalle: 'Abre PowerShell (Windows) o la Terminal (Mac/Linux) y pega este comando. Crea un "volumen": la carpeta donde n8n guardará tus flujos aunque cierres el programa.',
          comando: 'docker volume create n8n_data',
        },
        {
          titulo: 'Inicia n8n',
          detalle: 'Pega este segundo comando. La primera vez tarda unos minutos mientras descarga n8n. Déjalo corriendo: si cierras esa ventana, n8n se detiene.',
          comando:
            'docker run -it --rm --name n8n -p 5678:5678 -e GENERIC_TIMEZONE="America/Bogota" -e TZ="America/Bogota" -v n8n_data:/home/node/.n8n n8nio/n8n',
        },
        {
          titulo: 'Ábrelo en el navegador',
          detalle: 'Entra a http://localhost:5678 y crea tu cuenta de propietario (owner). Esa cuenta solo existe en tu computador.',
        },
      ],
    },
  ],
  primerFlujo: {
    introduccion:
      'Tu primer flujo no necesita conectar nada externo: lo vas a disparar tú mismo con un botón y n8n va a crear un mensaje. Así ves cómo viaja la información de un nodo al siguiente. El editor está en inglés, por eso te indicamos el nombre exacto de cada botón.',
    pasos: [
      { titulo: 'Crea un flujo nuevo', detalle: 'En la pantalla principal haz clic en "Create Workflow" (crear flujo). Verás un lienzo vacío.' },
      { titulo: 'Agrega el disparador', detalle: 'Haz clic en el "+" del lienzo y elige "Trigger manually": el flujo arrancará cada vez que pulses un botón.' },
      {
        titulo: 'Agrega un nodo de acción',
        detalle: 'Pulsa el "+" que aparece a la derecha del disparador, busca "Edit Fields (Set)" y crea un campo llamado mensaje con el valor: ¡Hola! Mi primer flujo funciona.',
      },
      { titulo: 'Ejecútalo', detalle: 'Pulsa "Execute workflow". Cada nodo se marca en verde y, al abrir el último, verás tu mensaje en la salida (Output).' },
      { titulo: 'Guárdalo', detalle: 'Ponle un nombre arriba a la izquierda, por ejemplo "Mi primer flujo", y guárdalo. ¡Listo!' },
    ],
    flujo: {
      nodos: [
        { id: 'p1', tipo: 'trigger', etiqueta: 'Tú pulsas el botón', nodoN8nReal: 'Manual Trigger', posicion: { x: 0, y: 60 } },
        { id: 'p2', tipo: 'accion', etiqueta: 'Crear el mensaje', nodoN8nReal: 'Edit Fields (Set)', posicion: { x: 300, y: 60 } },
      ],
      conexiones: [{ id: 'pe1', origen: 'p1', destino: 'p2' }],
    },
  },
  aviso:
    'Cuando quieras conectar servicios como Gmail o WhatsApp, n8n te pedirá "credenciales" (permisos de acceso). Nunca compartas esas credenciales ni las pegues en lugares públicos.',
  video: {
    youtubeId: 'owKxpe9QcLM',
    titulo: 'Cómo instalar n8n gratis en local con Docker',
    canal: 'Nicolas Neira',
    anio: 2025,
    inicio: 51,
    fin: 168,
    descripcion: 'Fragmento del "Método 1: Docker local": requisitos, n8n corriendo en localhost:5678 y la configuración inicial.',
  },
  actividad: {
    tipo: 'completar',
    instruccion: 'Completa los espacios del comando y de la dirección para dejar n8n funcionando en tu computador.',
    lineas: [
      [
        'docker ',
        { id: 'c1', respuestasAceptadas: ['run'], pista: 'La palabra que le dice a Docker que ejecute (corra) un programa.', explicacion: '"docker run" arranca un contenedor, en este caso el de n8n.' },
        ' --name n8n -p ',
        { id: 'c2', respuestasAceptadas: ['5678'], pista: 'El puerto en el que n8n atiende por defecto.', explicacion: 'n8n escucha en el puerto 5678; "-p 5678:5678" lo conecta con tu computador.' },
        ':5678 -v n8n_data:/home/node/.n8n n8nio/n8n',
      ],
      [
        '# Luego abre en el navegador: http://',
        { id: 'c3', respuestasAceptadas: ['localhost'], pista: 'El nombre con el que tu computador se refiere a sí mismo.', explicacion: '"localhost" significa "este mismo computador".' },
        ':5678',
      ],
    ],
    retroalimentacionFinal: 'Con ese comando n8n queda corriendo en tu equipo, y con esa dirección abres el editor para empezar a crear flujos.',
  },
  guionAvatar: {
    texto:
      'Llegó el momento de pasar de la teoría a la práctica. En esta pantalla tienes dos caminos para empezar a usar n8n: la versión en la nube, que no requiere instalar nada, o la versión gratuita en tu propio computador con un programa llamado Docker. Sigue los pasos con calma: puedes copiar cada comando con un solo clic y, si prefieres verlo, abajo hay un microvideo con el proceso. Luego vas a crear tu primer flujo, un botón que genera un mensaje, para que veas cómo viaja la información de un nodo a otro. Al final, completa el comando de la actividad. En el siguiente módulo empiezan los casos de negocio.',
    duracionEstimadaSegundos: 75,
    archivoAudio: '06b-modulo-instalacion.mp3',
  },
};
