import type { PantallaTexto } from '../../lib/contenido-simple';
import AvatarAudioPlayer from '../AvatarAudioPlayer';
import Actividad from '../Actividad';
import Infografia from '../Infografia';
import MicroVideo from '../MicroVideo';
import { avisarTerminosHuerfanos, renderizarConTerminos } from '../TextoConInfo';

export default function PantallaIntroduccion({ pantalla }: { pantalla: PantallaTexto }) {
  const usados = new Set<string>();
  const bloques = pantalla.microcontenido.map((bloque) => renderizarConTerminos(bloque, pantalla.terminos, usados));
  avisarTerminosHuerfanos(pantalla.terminos, usados);

  return (
    <section className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{pantalla.titulo}</h1>
      <AvatarAudioPlayer guion={pantalla.guionAvatar} />
      {pantalla.infografia && <Infografia titulo={pantalla.infografia.titulo} datos={pantalla.infografia.datos} />}
      {bloques.map((bloque, indice) => (
        <p key={indice} className="leading-relaxed text-slate-700 dark:text-slate-300">
          {bloque}
        </p>
      ))}
      {pantalla.checklist && (
        <ul className="space-y-2 rounded-lg bg-cyan-50 p-4 dark:bg-cyan-950">
          {pantalla.checklist.map((item, indice) => (
            <li key={indice} className="flex gap-2 text-cyan-900 dark:text-cyan-100">
              <span aria-hidden="true">☐</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
      {pantalla.video && <MicroVideo video={pantalla.video} />}
      {pantalla.actividad && (
        <div>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Pon a prueba lo que aprendiste</h2>
          <Actividad actividad={pantalla.actividad} pantallaId={pantalla.id} />
        </div>
      )}
    </section>
  );
}
