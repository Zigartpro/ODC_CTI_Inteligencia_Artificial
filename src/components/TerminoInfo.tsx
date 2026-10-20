import { useState } from 'react';

export default function TerminoInfo({ termino, definicion }: { termino: string; definicion: string }) {
  const [abierto, setAbierto] = useState(false);

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        className="rounded bg-cyan-100 px-1 font-medium text-cyan-800 underline decoration-dotted dark:bg-cyan-900 dark:text-cyan-100"
      >
        {termino}
        <sup className="ml-0.5">+info</sup>
      </button>
      {abierto && (
        <span
          role="tooltip"
          className="absolute left-0 top-full z-10 mt-1 w-64 rounded-lg border border-slate-200 bg-white p-3 text-sm font-normal text-slate-700 shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
        >
          {definicion}
        </span>
      )}
    </span>
  );
}
