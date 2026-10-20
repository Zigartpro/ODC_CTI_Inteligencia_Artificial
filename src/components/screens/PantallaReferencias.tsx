import type { ReactNode } from 'react';
import type { DiagramaPrisma, PaginaReferencias } from '../../lib/referencias';

/** Convierte *texto* en cursiva (títulos de libros/informes, revistas y volúmenes en APA 7). */
function conCursivas(texto: string): ReactNode[] {
  return texto.split(/\*(.+?)\*/g).map((parte, i) => (i % 2 === 1 ? <em key={i}>{parte}</em> : parte));
}

function Caja({ etapa, titulo, n, detalle, tono = 'neutro' }: { etapa: string; titulo: string; n: number; detalle?: string; tono?: 'neutro' | 'excluido' | 'incluido' }) {
  const estilos = {
    neutro: 'bg-white ring-slate-200 dark:bg-slate-800 dark:ring-slate-700',
    excluido: 'bg-slate-50 ring-slate-200 dark:bg-slate-800/50 dark:ring-slate-700',
    incluido: 'bg-rose-50 ring-rose-200 dark:bg-rose-950/60 dark:ring-rose-900',
  }[tono];
  return (
    <div className={`rounded-xl p-4 ring-1 ${estilos}`}>
      <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-slate-400">{etapa}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-800 dark:text-slate-100">{titulo}</p>
      <p className="mt-1 text-2xl font-bold tabular-nums text-slate-900 dark:text-slate-50">n = {n}</p>
      {detalle && <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{detalle}</p>}
    </div>
  );
}

function Flecha() {
  return (
    <div className="flex justify-center py-1 text-slate-300 dark:text-slate-600" aria-hidden="true">
      <svg viewBox="0 0 20 28" className="h-7 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v22M4 18l6 6 6-6" />
      </svg>
    </div>
  );
}

function Prisma({ prisma }: { prisma: DiagramaPrisma }) {
  return (
    <figure className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 dark:border-slate-700 dark:bg-slate-900/40">
      <figcaption className="mb-4">
        <p className="font-semibold text-slate-900 dark:text-slate-100">Así se seleccionaron los estudios: diagrama de flujo PRISMA</p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Base de datos: {prisma.baseDatos} · Búsqueda: {prisma.fechaBusqueda}. {prisma.filtros}.
        </p>
      </figcaption>

      <div className="grid gap-x-4 sm:grid-cols-[1fr_0.9fr]">
        <div>
          <Caja etapa="Identificación" titulo="Registros encontrados en la búsqueda" n={prisma.identificados} detalle="Una sola base de datos: sin duplicados que eliminar." />
          <Flecha />
          <Caja etapa="Cribado" titulo="Registros revisados por título, resumen y palabras clave" n={prisma.identificados} />
        </div>
        <div className="mt-3 flex items-end sm:mt-0">
          <div className="w-full">
            <Caja etapa="Excluidos" titulo="Registros excluidos en el cribado" n={prisma.excluidos} detalle={prisma.motivoExclusion} tono="excluido" />
          </div>
        </div>
        <div>
          <Flecha />
          <Caja
            etapa="Inclusión"
            titulo="Estudios incluidos en la revisión"
            n={prisma.incluidos}
            detalle={`${prisma.citadosEnOdc} de ellos se citan directamente en este ODC.`}
            tono="incluido"
          />
        </div>
      </div>
    </figure>
  );
}

export default function PantallaReferencias({ pagina }: { pagina: PaginaReferencias }) {
  return (
    <section className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{pagina.titulo}</h1>
      <p className="text-slate-700 dark:text-slate-300">{pagina.introduccion}</p>

      <Prisma prisma={pagina.prisma} />

      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Referencias ({pagina.referencias.length})
        </h2>
        <ol className="space-y-3">
          {pagina.referencias.map((ref, indice) => (
            <li key={indice} className="pl-8 text-sm leading-relaxed text-slate-700 dark:text-slate-300" style={{ textIndent: '-2rem' }}>
              {conCursivas(ref.texto)}{' '}
              {ref.url && (
                <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-cyan-700 underline break-all dark:text-cyan-400">
                  {ref.url}
                </a>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
