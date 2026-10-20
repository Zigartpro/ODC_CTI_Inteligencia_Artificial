import { createContext, useContext } from 'react';

/** Resultado de la actividad de cada pantalla (clave = id de la pantalla): true si la
 * resolvió bien. Se guarda en cmi.suspend_data junto con la pantalla actual, para que el
 * criterio del REA (80% de actividades y evaluación) sea verificable. */
export type ResultadosActividades = Record<string, boolean>;

interface RegistroActividades {
  resultados: ResultadosActividades;
  registrar: (pantallaId: string, correcta: boolean) => void;
}

export const ContextoRegistroActividades = createContext<RegistroActividades>({
  resultados: {},
  registrar: () => {},
});

export function useRegistroActividades() {
  return useContext(ContextoRegistroActividades);
}
