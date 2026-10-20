import type { ReactNode } from 'react';
import type { PantallaConceptos as PantallaConceptosTipo } from '../../lib/contenido-simple';
import AvatarAudioPlayer from '../AvatarAudioPlayer';
import TerminoInfo from '../TerminoInfo';
import Actividad from '../Actividad';
import MicroVideo from '../MicroVideo';

// Resalta, dentro de cada párrafo, la primera aparición de cada término del glosario
// como un botón "+info" clicable (solo la primera ocurrencia, para no saturar el texto).
function renderizarConTerminos(texto: string, terminos: PantallaConceptosTipo['terminos'], usados: Set<string>): ReactNode[] {
  let piezas: ReactNode[] = [texto];

  for (const t of terminos) {
    if (usados.has(t.termino)) continue;
    const regex = new RegExp(`(${t.termino.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'i');

    const siguientesPiezas: ReactNode[] = [];
    for (const pieza of piezas) {
      if (typeof pieza !== 'string') {
        siguientesPiezas.push(pieza);
        continue;
      }
      const partes = pieza.split(regex);
      if (partes.length === 1) {
        siguientesPiezas.push(pieza);
        continue;
      }
      usados.add(t.termino);
      partes.forEach((parte, i) => {
        siguientesPiezas.push(i === 1 ? <TerminoInfo key={t.termino} termino={parte} definicion={t.definicion} /> : parte);
      });
    }
    piezas = siguientesPiezas;
  }

  return piezas;
}

export default function PantallaConceptos({ pantalla }: { pantalla: PantallaConceptosTipo }) {
  const usados = new Set<string>();

  return (
    <section className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{pantalla.titulo}</h1>
      <AvatarAudioPlayer guion={pantalla.guionAvatar} />
      {pantalla.microcontenido.map((bloque, indice) => (
        <p key={indice} className="leading-relaxed text-slate-700 dark:text-slate-300">
          {renderizarConTerminos(bloque, pantalla.terminos, usados)}
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
