import type { CasoUso } from '../../lib/casos-uso';
import FlowDiagram from '../FlowDiagram';
import Actividad from '../Actividad';
import AvatarAudioPlayer from '../AvatarAudioPlayer';
import MicroVideo from '../MicroVideo';
import { avisarTerminosHuerfanos, renderizarConTerminos } from '../TextoConInfo';

const COLOR_DIFICULTAD: Record<CasoUso['nivelDificultad'], string> = {
  Básico: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  Intermedio: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100',
  Avanzado: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
};

export default function PantallaCasoUso({ caso }: { caso: CasoUso }) {
  const usados = new Set<string>();
  const problema = renderizarConTerminos(caso.problema, caso.terminos, usados);
  const bloques = caso.microcontenido.map((bloque) => renderizarConTerminos(bloque, caso.terminos, usados));
  avisarTerminosHuerfanos(caso.terminos, usados);

  return (
    <section className="mx-auto max-w-3xl space-y-6 p-6">
      <div>
        <span className="text-sm font-medium uppercase tracking-wide text-slate-400">{caso.funcionNegocio}</span>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{caso.titulo}</h1>
        <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${COLOR_DIFICULTAD[caso.nivelDificultad]}`}>
          Dificultad: {caso.nivelDificultad}
        </span>
      </div>

      <AvatarAudioPlayer guion={caso.guionAvatar} />

      <div>
        <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">El problema</h2>
        <p className="text-slate-700 dark:text-slate-300">{problema}</p>
      </div>

      {bloques.map((bloque, indice) => (
        <p key={indice} className="leading-relaxed text-slate-700 dark:text-slate-300">
          {bloque}
        </p>
      ))}

      <div>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Así se ve el flujo en n8n</h2>
        <FlowDiagram flujo={caso.flujo} />
      </div>

      <div className="rounded-lg bg-cyan-50 p-4 dark:bg-cyan-950">
        <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-400">Beneficio esperado</h2>
        <p className="text-cyan-900 dark:text-cyan-100">{caso.beneficioEsperado}</p>
      </div>

      {caso.respaldoEvidencia && (
        <p className="border-l-4 border-rose-300 pl-4 text-sm text-slate-600 dark:border-rose-700 dark:text-slate-300">
          <span className="font-semibold text-slate-800 dark:text-slate-100">Qué dice la evidencia: </span>
          {caso.respaldoEvidencia}
        </p>
      )}

      {caso.video && <MicroVideo video={caso.video} />}

      <div>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Pon a prueba lo que aprendiste</h2>
        <Actividad actividad={caso.actividad} pantallaId={caso.id} />
      </div>
    </section>
  );
}
