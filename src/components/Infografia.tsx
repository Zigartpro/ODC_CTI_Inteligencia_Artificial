import type { DatoInfografia } from '../lib/contenido-simple';

// Infografía de cifras clave: una tarjeta por dato, con la fuente visible en cada una.
export default function Infografia({ titulo, datos }: { titulo: string; datos: DatoInfografia[] }) {
  return (
    <figure className="rounded-2xl bg-gradient-to-br from-rose-50 via-white to-cyan-50 p-5 ring-1 ring-slate-200 dark:from-rose-950/60 dark:via-slate-900 dark:to-cyan-950/60 dark:ring-slate-700">
      <figcaption className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{titulo}</figcaption>
      <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {datos.map((dato, i) => (
          <div
            key={dato.etiqueta}
            className="entrada flex flex-col rounded-xl bg-white/90 p-4 shadow-sm ring-1 ring-slate-200/70 dark:bg-slate-800/90 dark:ring-slate-700"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <dt className="order-2 mt-1 text-sm leading-snug text-slate-700 dark:text-slate-200">{dato.etiqueta}</dt>
            <dd className="order-1 text-3xl font-bold tracking-tight tabular-nums text-rose-600 dark:text-rose-300">{dato.valor}</dd>
            <dd className="order-3 mt-auto pt-2 text-[0.7rem] text-slate-400">{dato.fuente}</dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
