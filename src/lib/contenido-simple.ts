import type { Actividad, GuionAvatar, MicroVideo } from './casos-uso';

export interface DatoInfografia {
  valor: string;
  etiqueta: string;
  fuente: string;
}

export interface PantallaTexto {
  id: string;
  titulo: string;
  microcontenido: string[];
  guionAvatar: GuionAvatar;
  checklist?: string[];
  infografia?: { titulo: string; datos: DatoInfografia[] };
  video?: MicroVideo;
  actividad?: Actividad;
}

export interface TerminoGlosario {
  termino: string;
  definicion: string;
}

export interface PantallaConceptos extends PantallaTexto {
  terminos: TerminoGlosario[];
}
