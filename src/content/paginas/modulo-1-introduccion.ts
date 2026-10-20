import type { PantallaTexto } from '../../lib/contenido-simple';

export const modulo1Introduccion: PantallaTexto = {
  id: 'modulo-1-introduccion',
  titulo: 'El reto real de las pymes colombianas',
  infografia: {
    titulo: 'Las mipymes en Colombia, en cifras',
    datos: [
      { valor: '99,5%', etiqueta: 'de las empresas formales son mipymes', fuente: 'BBVA Research (2024)' },
      { valor: '79%', etiqueta: 'del empleo del país lo generan las mipymes', fuente: 'BBVA Research (2024)' },
      { valor: '42%', etiqueta: 'de las microempresas está en niveles avanzados de transformación digital', fuente: 'iNNpulsa Colombia (2024)' },
      { valor: '30%', etiqueta: 'de las mipymes formales ya automatiza procesos', fuente: 'iNNpulsa Colombia (2024)' },
    ],
  },
  microcontenido: [
    'En Colombia, la Ley 590 de 2000 y el Decreto 1074 de 2015 definen qué empresa es micro, pequeña o mediana según sus ingresos anuales (Congreso de la República de Colombia, 2000; Ministerio de Comercio, Industria y Turismo, 2015). Ese grupo, las mipymes, representa el 99,5% de las empresas formales del país y genera cerca del 79% del empleo (BBVA Research, 2024). Son negocios en su mayoría jóvenes y familiares: 6 de cada 10 llevan 10 años o menos operando.',
    'Ese peso económico contrasta con su nivel de digitalización. Un estudio del Centro Nacional de Consultoría, con el auspicio del CIPE y en alianza con iNNpulsa Colombia, aplicado a 4.107 mipymes, encontró que el 63% de las medianas empresas está en los niveles más avanzados de transformación digital, frente a solo el 42% de las microempresas, y que apenas el 30% de las mipymes formales implementa automatización de procesos (iNNpulsa Colombia, 2024). Aun así, el 52% de las pymes ya tiene a alguien responsable de los temas tecnológicos (CIPE, 2024).',
    'El reto no es que las pymes no quieran digitalizarse: es que muchas no saben por dónde empezar, ni tienen tiempo o presupuesto para armar un equipo de tecnología propio. Cuando reciben acompañamiento, los resultados aparecen: el programa ALDEA de iNNpulsa fortaleció a 1.049 emprendimientos innovadores (iNNpulsa Colombia, 2025). Este ODC busca llenar ese vacío de conocimiento: mostrarte con casos concretos, y sin tecnicismos, cómo n8n puede automatizar tareas repetitivas de tu negocio.',
  ],
  video: {
    youtubeId: 'l3rRdAOXBDk',
    titulo: 'Plan de Digitalización Mipymes',
    canal: 'Cámara de Comercio del Oriente Antioqueño',
    anio: 2020,
    descripcion: 'Cómo el Gobierno Nacional promueve la transformación digital de las pequeñas y medianas empresas en Colombia.',
  },
  actividad: {
    tipo: 'estimar-cifras',
    instruccion: '¿Recuerdas las cifras? Mueve el deslizador hasta tu estimación y revela el dato real.',
    cifras: [
      {
        pregunta: '¿Qué porcentaje del empleo de Colombia generan las mipymes?',
        valor: 79,
        unidad: '%',
        min: 0,
        max: 100,
        tolerancia: 10,
        explicacion: 'Casi 8 de cada 10 empleos dependen de las mipymes: por eso su productividad importa para todo el país.',
        fuente: 'BBVA Research (2024)',
      },
      {
        pregunta: '¿Qué porcentaje de las mipymes formales ya implementa automatización de procesos?',
        valor: 30,
        unidad: '%',
        min: 0,
        max: 100,
        tolerancia: 10,
        explicacion: 'Solo 3 de cada 10: la mayoría todavía hace a mano tareas que podrían automatizarse. Esa es la oportunidad de este curso.',
        fuente: 'iNNpulsa Colombia (2024)',
      },
      {
        pregunta: '¿Qué porcentaje de las pymes ya tiene a alguien responsable de los temas tecnológicos?',
        valor: 52,
        unidad: '%',
        min: 0,
        max: 100,
        tolerancia: 10,
        explicacion: 'Más de la mitad ya tiene a alguien a cargo de la tecnología: el interés existe, lo que falta es saber cómo dar el siguiente paso.',
        fuente: 'CIPE (2024)',
      },
    ],
  },
  guionAvatar: {
    texto:
      'Las micro y pequeñas empresas son casi todo el tejido empresarial de Colombia, pero muy pocas han dado el salto hacia la automatización con inteligencia artificial. En esta pantalla vas a ver por qué pasa esto, con cifras reales de estudios recientes sobre pymes colombianas. Presta atención a la idea principal: el problema no es falta de interés de los empresarios, es falta de acceso a conocimiento claro y aplicable. Ese es exactamente el vacío que este curso busca llenar. Al final, pon a prueba tu memoria con el reto de las cifras y luego sigue al siguiente módulo para conocer la herramienta que vamos a usar.',
    duracionEstimadaSegundos: 72,
    archivoAudio: '05-modulo1-introduccion.mp3',
  },
};
