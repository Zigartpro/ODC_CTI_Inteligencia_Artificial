import type { ReactNode } from 'react';
import type { TerminoGlosario } from '../lib/casos-uso';
import TerminoInfo from './TerminoInfo';

const escapar = (t: string) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Resalta, dentro de un texto, la primera aparición de cada término del glosario como un
 * botón "+info". `usados` se comparte entre los bloques de una misma pantalla para que cada
 * término se resalte una sola vez (no se satura el texto). Si un término no aparece, no se
 * muestra nada; en desarrollo se avisa por consola para detectar contenido que cambió.
 */
export function renderizarConTerminos(texto: string, terminos: TerminoGlosario[] | undefined, usados: Set<string>): ReactNode[] {
  let piezas: ReactNode[] = [texto];

  for (const t of terminos ?? []) {
    if (usados.has(t.termino)) continue;
    // Límites de palabra con soporte de tildes (\b no los entiende): evita resaltar "CIPE" dentro de otra palabra.
    const regex = new RegExp(`(?<![\\p{L}\\p{N}])(${escapar(t.termino)})(?![\\p{L}\\p{N}])`, 'iu');

    const siguientes: ReactNode[] = [];
    for (const pieza of piezas) {
      if (typeof pieza !== 'string' || usados.has(t.termino)) {
        siguientes.push(pieza);
        continue;
      }
      const partes = pieza.split(regex);
      if (partes.length === 1) {
        siguientes.push(pieza);
        continue;
      }
      usados.add(t.termino);
      partes.forEach((parte, i) => {
        siguientes.push(i === 1 ? <TerminoInfo key={t.termino} termino={parte} definicion={t.definicion} enlace={t.enlace} /> : parte);
      });
    }
    piezas = siguientes;
  }

  return piezas;
}

/** Avisa en desarrollo si algún término del glosario no aparece en los textos de la pantalla. */
export function avisarTerminosHuerfanos(terminos: TerminoGlosario[] | undefined, usados: Set<string>) {
  if (!import.meta.env.DEV) return;
  for (const t of terminos ?? []) {
    if (!usados.has(t.termino)) console.warn(`[+info] El término «${t.termino}» no aparece en el texto de esta pantalla.`);
  }
}
