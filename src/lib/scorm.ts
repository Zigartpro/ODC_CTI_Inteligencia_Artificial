// Cliente SCORM 1.2 para el lado del contenido (el SCO).
//
// Importante: esto NO usa `scorm-again` para hablar con el LMS real. `scorm-again` implementa
// el lado del REPRODUCTOR SCORM (lo que usaría un LMS o un player custom), no el lado del
// contenido. Un LMS real (SCORM Cloud, Moodle, etc.) ya expone su propio objeto `window.API`
// antes de cargar nuestro SCO, nuestro trabajo es *encontrarlo* (algoritmo de descubrimiento
// de la ADL) y llamar sus métodos directamente. `scorm-again` solo se usa en desarrollo local
// para simular ese `window.API` cuando no hay ningún LMS real presente (ver scorm-dev-mock.ts).

export interface Scorm12Api {
  LMSInitialize: (parametro?: string) => string;
  LMSFinish: (parametro?: string) => string;
  LMSGetValue: (elemento: string) => string;
  LMSSetValue: (elemento: string, valor: string) => string;
  LMSCommit: (parametro?: string) => string;
  LMSGetLastError: () => string;
  LMSGetErrorString: (codigo: string) => string;
  LMSGetDiagnostic: (codigo: string) => string;
}

export interface MarcadorCurso {
  pantalla: number;
  respuestas: Record<string, unknown>;
}

const LIMITE_BUSQUEDA = 500;
const LIMITE_SUSPEND_DATA = 4096;

function buscarApiEnCadenaDePadres(ventana: Window): Scorm12Api | null {
  let actual: Window | null = ventana;
  let intentos = 0;
  while (actual && intentos < LIMITE_BUSQUEDA) {
    const api = (actual as unknown as { API?: Scorm12Api }).API;
    if (api) return api;
    if (actual.parent && actual.parent !== actual) {
      actual = actual.parent;
    } else {
      break;
    }
    intentos++;
  }
  return null;
}

function buscarApiScorm12(ventana: Window): Scorm12Api | null {
  const enPadres = buscarApiEnCadenaDePadres(ventana);
  if (enPadres) return enPadres;

  // Si el curso se abrió en una ventana nueva (no en un iframe), la API puede vivir
  // en la cadena de "opener" en vez de en la de "parent".
  let actual: Window | null = ventana;
  let intentos = 0;
  while (actual?.opener && actual.opener !== actual && intentos < LIMITE_BUSQUEDA) {
    const siguiente: Window = actual.opener;
    const api = buscarApiEnCadenaDePadres(siguiente);
    if (api) return api;
    actual = siguiente;
    intentos++;
  }
  return null;
}

function aCmiTimespan(totalSegundos: number): string {
  const horas = Math.floor(totalSegundos / 3600);
  const minutos = Math.floor((totalSegundos % 3600) / 60);
  const segundos = Math.floor(totalSegundos % 60);
  const dosDigitos = (n: number) => String(n).padStart(2, '0');
  return `${String(horas).padStart(4, '0')}:${dosDigitos(minutos)}:${dosDigitos(segundos)}.00`;
}

class ClienteScorm {
  private api: Scorm12Api | null = null;
  private inicializado = false;
  private horaInicio = 0;

  /** Busca la API (instalando antes el mock de desarrollo si aplica) e inicializa la sesión SCORM. */
  async conectar(): Promise<boolean> {
    if (typeof window === 'undefined') return false;

    if (import.meta.env.DEV && !buscarApiScorm12(window)) {
      const { instalarMockLocal } = await import('./scorm-dev-mock');
      instalarMockLocal();
    }

    this.api = buscarApiScorm12(window);
    if (!this.api) {
      console.warn(
        '[SCORM] No se encontró la API del LMS. El curso funcionará, pero no se reportará progreso ni nota.'
      );
      return false;
    }

    const resultado = this.api.LMSInitialize('');
    this.inicializado = resultado === 'true';
    if (!this.inicializado) {
      console.error('[SCORM] LMSInitialize falló:', this.api.LMSGetLastError());
      return false;
    }

    this.horaInicio = Date.now();

    if (this.api.LMSGetValue('cmi.core.lesson_status') === 'not attempted') {
      this.api.LMSSetValue('cmi.core.lesson_status', 'incomplete');
    }

    return true;
  }

  /** Lee el marcador guardado (pantalla actual + respuestas) para reanudar el curso. */
  leerMarcador(): MarcadorCurso | null {
    if (!this.api) return null;
    const crudo = this.api.LMSGetValue('cmi.suspend_data');
    if (!crudo) return null;
    try {
      return JSON.parse(crudo) as MarcadorCurso;
    } catch {
      console.warn('[SCORM] cmi.suspend_data no contenía JSON válido, se ignora.');
      return null;
    }
  }

  /** Guarda en qué pantalla va el usuario y sus respuestas hasta ahora. */
  guardarMarcador(marcador: MarcadorCurso) {
    if (!this.api || !this.inicializado) return;
    const payload = JSON.stringify(marcador);
    if (payload.length > LIMITE_SUSPEND_DATA) {
      console.error(
        `[SCORM] El marcador ocupa ${payload.length} caracteres, supera el límite de ${LIMITE_SUSPEND_DATA} de SCORM 1.2. Se truncará y se perderán datos, conviene reducir lo que se guarda.`
      );
    }
    this.api.LMSSetValue('cmi.suspend_data', payload.slice(0, LIMITE_SUSPEND_DATA));
    this.api.LMSSetValue('cmi.core.lesson_location', String(marcador.pantalla));
    this.api.LMSCommit('');
  }

  /** Reporta la nota final de la evaluación sumativa y si aprobó según el umbral del REA. */
  establecerNotaFinal(puntajeCrudo: number, puntajeMaximo: number, porcentajeParaAprobar: number) {
    if (!this.api || !this.inicializado) return;
    this.api.LMSSetValue('cmi.core.score.raw', String(puntajeCrudo));
    this.api.LMSSetValue('cmi.core.score.max', String(puntajeMaximo));
    this.api.LMSSetValue('cmi.core.score.min', '0');
    const porcentajeObtenido = puntajeMaximo > 0 ? (puntajeCrudo / puntajeMaximo) * 100 : 0;
    const aprobo = porcentajeObtenido >= porcentajeParaAprobar;
    this.api.LMSSetValue('cmi.core.lesson_status', aprobo ? 'passed' : 'failed');
    this.api.LMSCommit('');
  }

  /** Cierra la sesión SCORM. Llamar una sola vez, al salir del curso. */
  finalizar() {
    if (!this.api || !this.inicializado) return;
    const segundosTranscurridos = Math.round((Date.now() - this.horaInicio) / 1000);
    this.api.LMSSetValue('cmi.core.session_time', aCmiTimespan(segundosTranscurridos));
    this.api.LMSSetValue('cmi.core.exit', 'suspend');
    this.api.LMSCommit('');
    this.api.LMSFinish('');
    this.inicializado = false;
  }
}

export const scorm = new ClienteScorm();
