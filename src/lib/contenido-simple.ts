import type { Actividad, GuionAvatar, MicroVideo, TerminoGlosario } from './casos-uso';

export type { TerminoGlosario };

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
  terminos?: TerminoGlosario[];
}

export interface PantallaConceptos extends PantallaTexto {
  terminos: TerminoGlosario[];
}
