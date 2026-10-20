import { useEffect, useState } from 'react';

export type Tema = 'claro' | 'oscuro';

const CLAVE_TEMA = 'odc-tema';
const EVENTO_CAMBIO = 'odc-tema-cambio';

export function obtenerTemaGuardado(): Tema | null {
  if (typeof window === 'undefined') return null;
  try {
    const valor = window.localStorage.getItem(CLAVE_TEMA);
    return valor === 'claro' || valor === 'oscuro' ? valor : null;
  } catch {
    return null;
  }
}

function obtenerTemaPreferidoSistema(): Tema {
  if (typeof window === 'undefined') return 'claro';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oscuro' : 'claro';
}

export function obtenerTemaActual(): Tema {
  return obtenerTemaGuardado() ?? obtenerTemaPreferidoSistema();
}

export function establecerTema(tema: Tema) {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('dark', tema === 'oscuro');
  try {
    window.localStorage.setItem(CLAVE_TEMA, tema);
  } catch {
    // localStorage no disponible; el tema se aplica igual, solo no persiste entre sesiones.
  }
  window.dispatchEvent(new CustomEvent<Tema>(EVENTO_CAMBIO, { detail: tema }));
}

/** Se suscribe a cambios de tema hechos con establecerTema(), para componentes
 * que no pueden depender solo de las variantes `dark:` de Tailwind (ej. React Flow,
 * que necesita el prop `colorMode` en JS, no solo CSS). */
export function useTema(): Tema {
  const [tema, setTema] = useState<Tema>('claro');

  useEffect(() => {
    setTema(obtenerTemaActual());
    const alCambiar = (e: Event) => setTema((e as CustomEvent<Tema>).detail);
    window.addEventListener(EVENTO_CAMBIO, alCambiar);
    return () => window.removeEventListener(EVENTO_CAMBIO, alCambiar);
  }, []);

  return tema;
}
