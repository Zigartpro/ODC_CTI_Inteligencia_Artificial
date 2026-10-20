import type { Evidencia } from '../../lib/evidencia';
import AvatarAudioPlayer from '../AvatarAudioPlayer';
import Actividad from '../Actividad';

export default function PantallaEvidencia({ evidencia }: { evidencia: Evidencia }) {
  return (
    <section className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{evidencia.titulo}</h1>
      <AvatarAudioPlayer guion={evidencia.guionAvatar} />
      <p className="leading-relaxed text-slate-700 dark:text-slate-300">{evidencia.introduccion}</p>

      <ul className="space-y-3">
        {evidencia.hallazgos.map((hallazgo, indice) => (
          <li key={indice} className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            {hallazgo.texto}
          </li>
        ))}
      </ul>

      <div className="rounded-lg bg-cyan-50 p-4 dark:bg-cyan-950">
        <p className="text-cyan-900 dark:text-cyan-100">{evidencia.cierre}</p>
      </div>

      <div>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Pon a prueba lo que aprendiste</h2>
        <Actividad actividad={evidencia.actividad} pantallaId={evidencia.id} />
      </div>
    </section>
  );
}
