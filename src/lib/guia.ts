import type { Actividad, CasoUso, GuionAvatar, MicroVideo, TerminoGlosario } from './casos-uso';

export interface PasoGuia {
  titulo: string;
  detalle: string;
  /** Comando para copiar y pegar en la terminal (opcional). */
  comando?: string;
}

export interface OpcionInstalacion {
  id: string;
  nombre: string;
  resumen: string;
  ventajas: string[];
  limitaciones: string[];
  pasos: PasoGuia[];
}

export interface GuiaInstalacion {
  id: string;
  titulo: string;
  proposito: string;
  opciones: OpcionInstalacion[];
  primerFlujo: { introduccion: string; pasos: PasoGuia[]; flujo: CasoUso['flujo'] };
  aviso: string;
  video?: MicroVideo;
  actividad: Actividad;
  guionAvatar: GuionAvatar;
  terminos?: TerminoGlosario[];
}
