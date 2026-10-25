import type { Actividad, GuionAvatar, TerminoGlosario } from './casos-uso';

export interface HallazgoEvidencia {
  texto: string;
}

export interface Evidencia {
  id: string;
  titulo: string;
  introduccion: string;
  hallazgos: HallazgoEvidencia[];
  cierre: string;
  actividad: Actividad;
  guionAvatar: GuionAvatar;
  terminos?: TerminoGlosario[];
}
