export interface NodoFlujo {
  id: string;
  tipo: 'trigger' | 'accion' | 'ia' | 'condicion';
  etiqueta: string;
  nodoN8nReal: string;
  posicion: { x: number; y: number };
}

export interface ConexionFlujo {
  id: string;
  origen: string;
  destino: string;
  etiqueta?: string;
}

export interface OpcionSeleccionMultiple {
  texto: string;
  correcta: boolean;
  retroalimentacion: string;
}

export interface ActividadSeleccionMultiple {
  tipo: 'seleccion-multiple';
  pregunta: string;
  opciones: OpcionSeleccionMultiple[];
}

export interface ActividadVerdaderoFalso {
  tipo: 'verdadero-falso';
  enunciado: string;
  esVerdadero: boolean;
  retroalimentacionCorrecta: string;
  retroalimentacionIncorrecta: string;
}

export interface ActividadOrdenarPasos {
  tipo: 'ordenar-pasos';
  instruccion: string;
  pasosEnOrden: string[];
  retroalimentacion: string;
}

/** "Adivina la cifra": el usuario estima un dato con un deslizador y luego ve el valor real. */
export interface CifraEstimable {
  pregunta: string;
  valor: number;
  unidad: string;
  min: number;
  max: number;
  /** Margen (en las mismas unidades) dentro del cual la estimación cuenta como acertada. */
  tolerancia: number;
  explicacion: string;
  fuente: string;
}

export interface ActividadEstimarCifras {
  tipo: 'estimar-cifras';
  instruccion: string;
  cifras: CifraEstimable[];
}

/** Clasificar tarjetas en categorías (tocar tarjeta → tocar categoría, o arrastrar y soltar). */
export interface ActividadClasificar {
  tipo: 'clasificar';
  instruccion: string;
  categorias: { id: string; nombre: string; descripcion: string }[];
  elementos: { texto: string; categoria: string; explicacion: string }[];
}

/** Completar los espacios de un comando o texto. Cada línea mezcla texto fijo y espacios. */
export interface EspacioCompletar {
  id: string;
  respuestasAceptadas: string[];
  pista: string;
  explicacion: string;
}

export interface ActividadCompletar {
  tipo: 'completar';
  instruccion: string;
  lineas: (string | EspacioCompletar)[][];
  retroalimentacionFinal: string;
}

export type Actividad =
  | ActividadSeleccionMultiple
  | ActividadVerdaderoFalso
  | ActividadOrdenarPasos
  | ActividadEstimarCifras
  | ActividadClasificar
  | ActividadCompletar;

export interface GuionAvatar {
  texto: string;
  duracionEstimadaSegundos: number;
  archivoAudio: string;
}

/** Microvideo de YouTube (máximo uno por módulo, 1-2 min). `inicio`/`fin` en segundos recortan
 * un video largo al fragmento relevante. */
export interface MicroVideo {
  youtubeId: string;
  titulo: string;
  canal: string;
  anio: number;
  inicio?: number;
  fin?: number;
  descripcion: string;
}

export interface CasoUso {
  id: string;
  funcionNegocio: string;
  titulo: string;
  problema: string;
  microcontenido: string[];
  beneficioEsperado: string;
  nivelDificultad: 'Básico' | 'Intermedio' | 'Avanzado';
  nodosN8nReales: string[];
  flujo: { nodos: NodoFlujo[]; conexiones: ConexionFlujo[] };
  actividad: Actividad;
  guionAvatar: GuionAvatar;
  video?: MicroVideo;
  /** Estudio(s) de la revisión sistemática que respaldan este caso, en formato de cita APA. */
  respaldoEvidencia?: string;
}
