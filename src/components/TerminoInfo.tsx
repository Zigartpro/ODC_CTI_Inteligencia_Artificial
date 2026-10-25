import { useEffect, useId, useRef, useState } from 'react';
import type { TerminoGlosario } from '../lib/casos-uso';

type Props = Pick<TerminoGlosario, 'definicion' | 'enlace'> & { termino: string };

// Pop-up "+info": tarjeta con una definición, un dato o un enlace a una norma, ley o artículo.
// Se cierra con Escape o al hacer clic fuera; el botón anuncia su estado a lectores de pantalla.
export default function TerminoInfo({ termino, definicion, enlace }: Props) {
  const [abierto, setAbierto] = useState(false);
  const contenedorRef = useRef<HTMLSpanElement>(null);
  const idTarjeta = useId();

  useEffect(() => {
    if (!abierto) return;
    const alPresionarFuera = (e: PointerEvent) => {
      if (!contenedorRef.current?.contains(e.target as Node)) setAbierto(false);
    };
    const alPresionarTecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAbierto(false);
    };
    document.addEventListener('pointerdown', alPresionarFuera);
    document.addEventListener('keydown', alPresionarTecla);
    return () => {
      document.removeEventListener('pointerdown', alPresionarFuera);
      document.removeEventListener('keydown', alPresionarTecla);
    };
  }, [abierto]);

  return (
    <span ref={contenedorRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        aria-controls={idTarjeta}
        className="rounded bg-cyan-100 px-1 font-medium text-cyan-800 underline decoration-dotted dark:bg-cyan-900 dark:text-cyan-100"
      >
        {termino}
        <sup className="ml-0.5">+info</sup>
      </button>
      {abierto && (
        <span
          id={idTarjeta}
          role="note"
          className="absolute left-0 top-full z-10 mt-1 block w-72 max-w-[calc(100vw-3rem)] rounded-lg border border-slate-200 bg-white p-3 text-sm font-normal leading-snug text-slate-700 shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
        >
          {definicion}
          {enlace && (
            <a
              href={enlace.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block font-medium text-cyan-700 underline underline-offset-2 dark:text-cyan-400"
            >
              {enlace.texto} ↗
            </a>
          )}
        </span>
      )}
    </span>
  );
}
