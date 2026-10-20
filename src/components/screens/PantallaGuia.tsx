import { useState } from 'react';
import type { GuiaInstalacion, PasoGuia } from '../../lib/guia';
import AvatarAudioPlayer from '../AvatarAudioPlayer';
import Actividad from '../Actividad';
import FlowDiagram from '../FlowDiagram';
import MicroVideo from '../MicroVideo';

function BloqueComando({ comando }: { comando: string }) {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(comando);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 1800);
    } catch {
      // Sin permiso de portapapeles (algunos LMS lo bloquean en iframes): el usuario puede seleccionarlo a mano.
    }
  }

  return (
    <div className="mt-2 flex items-stretch overflow-hidden rounded-lg bg-slate-950 ring-1 ring-slate-800">
      <code className="flex-1 overflow-x-auto px-3 py-2.5 font-mono text-xs leading-relaxed whitespace-pre text-cyan-300 select-all sm:text-sm">{comando}</code>
      <button
        type="button"
        onClick={copiar}
        className="shrink-0 border-l border-slate-800 px-3 text-xs font-semibold text-slate-300 transition-colors duration-150 hover:bg-slate-800 hover:text-white"
        aria-label="Copiar comando"
      >
        <span aria-live="polite">{copiado ? '¡Copiado!' : 'Copiar'}</span>
      </button>
    </div>
  );
}

function ListaPasos({ pasos }: { pasos: PasoGuia[] }) {
  return (
    <ol className="space-y-4">
      {pasos.map((paso, i) => (
        <li key={paso.titulo} className="flex gap-3">
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-rose-100 text-sm font-semibold text-rose-700 dark:bg-rose-950 dark:text-rose-200">{i + 1}</span>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-slate-900 dark:text-slate-100">{paso.titulo}</p>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{paso.detalle}</p>
            {paso.comando && <BloqueComando comando={paso.comando} />}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function PantallaGuia({ guia }: { guia: GuiaInstalacion }) {
  const [opcionId, setOpcionId] = useState(guia.opciones[guia.opciones.length - 1].id);
  const opcion = guia.opciones.find((o) => o.id === opcionId) ?? guia.opciones[0];

  return (
    <section className="mx-auto max-w-3xl space-y-8 p-6">
      <div>
        <span className="text-sm font-medium uppercase tracking-wide text-slate-400">Práctica guiada</span>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{guia.titulo}</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{guia.proposito}</p>
      </div>

      <AvatarAudioPlayer guion={guia.guionAvatar} />

      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Paso 1 · Elige cómo usar n8n</h2>
        <div role="tablist" aria-label="Formas de usar n8n" className="grid gap-2 sm:grid-cols-2">
          {guia.opciones.map((o) => (
            <button
              key={o.id}
              type="button"
              role="tab"
              aria-selected={o.id === opcionId}
              aria-controls={`panel-${o.id}`}
              onClick={() => setOpcionId(o.id)}
              className={`rounded-xl border p-4 text-left transition-colors duration-150 ${
                o.id === opcionId
                  ? 'border-rose-300 bg-rose-50 ring-2 ring-rose-200 dark:border-rose-700 dark:bg-rose-950/50 dark:ring-rose-900'
                  : 'border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700/60'
              }`}
            >
              <span className="block font-semibold text-slate-900 dark:text-slate-100">{o.nombre}</span>
              <span className="mt-1 block text-sm text-slate-600 dark:text-slate-300">{o.resumen}</span>
            </button>
          ))}
        </div>

        <div id={`panel-${opcion.id}`} role="tabpanel" className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
          <div className="mb-5 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <p className="mb-1 font-semibold text-green-700 dark:text-green-400">A favor</p>
              <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                {opcion.ventajas.map((v) => (
                  <li key={v}>+ {v}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-1 font-semibold text-amber-700 dark:text-amber-400">Ten en cuenta</p>
              <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                {opcion.limitaciones.map((l) => (
                  <li key={l}>− {l}</li>
                ))}
              </ul>
            </div>
          </div>
          <ListaPasos pasos={opcion.pasos} />
        </div>
      </div>

      {guia.video && <MicroVideo video={guia.video} />}

      <div>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Paso 2 · Tu primer flujo</h2>
        <p className="mb-4 text-slate-700 dark:text-slate-300">{guia.primerFlujo.introduccion}</p>
        <div className="mb-5">
          <FlowDiagram flujo={guia.primerFlujo.flujo} altura={200} />
        </div>
        <ListaPasos pasos={guia.primerFlujo.pasos} />
      </div>

      <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900 ring-1 ring-amber-200 dark:bg-amber-950 dark:text-amber-100 dark:ring-amber-900">
        <strong>Importante: </strong>
        {guia.aviso}
      </p>

      <div>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Pon a prueba lo que aprendiste</h2>
        <Actividad actividad={guia.actividad} pantallaId={guia.id} />
      </div>
    </section>
  );
}
