const CLAVE = 'odc-audio-silenciado';

export function obtenerPreferenciaSilencio(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(CLAVE) === 'true';
  } catch {
    return false;
  }
}

export function establecerPreferenciaSilencio(silenciado: boolean) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CLAVE, String(silenciado));
  } catch {
    // localStorage puede fallar en navegación privada; el curso sigue funcionando sin recordar la preferencia.
  }
}
