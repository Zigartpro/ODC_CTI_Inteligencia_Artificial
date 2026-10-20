import type { GuionAvatar } from '../../lib/casos-uso';

// Borrador del guion de bienvenida: los autores deben reescribirlo con sus palabras
// para el storyboard (Turnitin IA) antes de generar el audio en ElevenLabs.
export const guionPortada: GuionAvatar = {
  texto:
    '¡Hola! Soy Frand y voy a acompañarte en este recorrido. Aquí vas a descubrir cómo una herramienta llamada n8n puede encargarse de las tareas repetitivas de tu negocio, como responder mensajes, hacer seguimiento a tus clientes o registrar facturas, sin que necesites saber programar. Me vas a encontrar en casi todas las pantallas: cada vez que quieras escucharme, toca mi foto. Usa las flechas de arriba para avanzar o regresar, y el menú para saltar a cualquier módulo. Cuando estés listo, presiona Iniciar.',
  duracionEstimadaSegundos: 40,
  archivoAudio: '01-portada.mp3',
};
