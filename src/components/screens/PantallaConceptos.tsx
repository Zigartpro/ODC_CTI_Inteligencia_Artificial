import type { PantallaConceptos as PantallaConceptosTipo } from '../../lib/contenido-simple';
import AvatarAudioPlayer from '../AvatarAudioPlayer';
import Actividad from '../Actividad';
import MicroVideo from '../MicroVideo';
import { avisarTerminosHuerfanos, renderizarConTerminos } from '../TextoConInfo';

export default function PantallaConceptos({ pantalla }: { pantalla: PantallaConceptosTipo }) {
  const usados = new Set<string>();
  const bloques = pantalla.microcontenido.map((bloque) => renderizarConTerminos(bloque, pantalla.terminos, usados));
  avisarTerminosHuerfanos(pantalla.terminos, usados);

  return (
    <section className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{pantalla.titulo}</h1>
      <AvatarAudioPlayer guion={pantalla.guionAvatar} />
      {bloques.map((bloque, indice) => (
        <p key={indice} className="leading-relaxed text-slate-700 dark:text-slate-300">
          {bloque}
        </p>
      ))}
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
