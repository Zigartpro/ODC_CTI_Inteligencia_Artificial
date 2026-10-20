export interface Referencia {
  /** Texto APA 7. Lo que va entre asteriscos (*así*) se muestra en cursiva. */
  texto: string;
  url?: string;
}

export interface DiagramaPrisma {
  baseDatos: string;
  fechaBusqueda: string;
  filtros: string;
  identificados: number;
  excluidos: number;
  motivoExclusion: string;
  incluidos: number;
  citadosEnOdc: number;
}

export interface PaginaReferencias {
  titulo: string;
  introduccion: string;
  prisma: DiagramaPrisma;
  referencias: Referencia[];
}
