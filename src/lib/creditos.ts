export interface RolCredito {
  rol: string;
  responsable: string;
}

export interface RecursoTasl {
  titulo: string;
  autor: string;
  fuente: string;
  licencia: string;
}

export interface PaginaCreditos {
  titulo: string;
  roles: RolCredito[];
  notaRecursos: string;
  recursos: RecursoTasl[];
  licenciaTexto: string;
  licenciaUrl: string;
}
