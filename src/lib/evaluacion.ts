export interface OpcionEvaluacion {
  texto: string;
  correcta: boolean;
}

export interface PreguntaSeleccionMultiple {
  id: string;
  tipo: 'seleccion-multiple';
  pregunta: string;
  opciones: OpcionEvaluacion[];
  retroalimentacion: string;
  /** Pantalla a la que se sugiere volver si la respuesta es incorrecta. */
  repasoPantallaId: string;
}

export interface PreguntaVerdaderoFalso {
  id: string;
  tipo: 'verdadero-falso';
  enunciado: string;
  esVerdadero: boolean;
  retroalimentacion: string;
  /** Pantalla a la que se sugiere volver si la respuesta es incorrecta. */
  repasoPantallaId: string;
}

export type PreguntaEvaluacion = PreguntaSeleccionMultiple | PreguntaVerdaderoFalso;

export interface EvaluacionFinal {
  titulo: string;
  instrucciones: string;
  umbralAprobacionPorcentaje: number;
  preguntas: PreguntaEvaluacion[];
}
