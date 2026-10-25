import { useState } from 'react';
import { obtenerPreferenciaSilencio, establecerPreferenciaSilencio } from '../../lib/preferenciasAudio';
import { guionPortada } from '../../content/paginas/portada';
import AvatarAudioPlayer from '../AvatarAudioPlayer';

interface Props {
  onIniciar: () => void;
}

const retraso = (ms: number) => ({ animationDelay: `${ms}ms` });

export default function PantallaPortada({ onIniciar }: Props) {
  const [ayudaVisible, setAyudaVisible] = useState(false);
  const [silenciado, setSilenciado] = useState(() => obtenerPreferenciaSilencio());

  function alternarSilencio() {
    const nuevoValor = !silenciado;
    setSilenciado(nuevoValor);
    establecerPreferenciaSilencio(nuevoValor);
  }

  return (
    <section className="mx-auto grid max-w-5xl items-center gap-8 px-6 py-8 md:grid-cols-[1.2fr_0.8fr] md:gap-12 md:py-14">
      <div className="order-2 space-y-6 md:order-1">
        <div className="entrada space-y-4" style={retraso(0)}>
          <span className="inline-block rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-rose-700 ring-1 ring-rose-200 dark:bg-rose-950 dark:text-rose-200 dark:ring-rose-900">
            Objeto Digital de Conocimiento
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-balance text-slate-900 sm:text-4xl md:text-5xl dark:text-slate-50">
            Automatiza los procesos de tu pyme con inteligencia artificial
          </h1>
          <p className="max-w-xl text-lg text-pretty text-slate-600 dark:text-slate-300">
            Aprende con casos de uso guiados, y sin saber programar, cómo los flujos de trabajo con IA en n8n automatizan las tareas repetitivas de una organización.
          </p>
        </div>

        <dl className="entrada grid gap-3 text-sm sm:grid-cols-2" style={retraso(80)}>
          <div>
            <dt className="font-medium text-slate-500 dark:text-slate-400">Autores · autoría, diseño instruccional y desarrollo</dt>
            <dd className="text-slate-800 dark:text-slate-200">Duvan Federico Sarmiento Lugo<br />Frand Eldimer Casas López</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-500 dark:text-slate-400">Programa</dt>
            <dd className="text-slate-800 dark:text-slate-200">Especialización en Inteligencia Artificial<br />Universidad de Cundinamarca</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="sr-only">Fecha y versión</dt>
            <dd className="text-slate-500 dark:text-slate-400">Octubre de 2026 · Versión 1.1</dd>
          </div>
        </dl>

        <div className="entrada flex flex-wrap items-center gap-3" style={retraso(160)}>
          <button
            type="button"
            onClick={onIniciar}
            className="avatar-boton rounded-lg bg-slate-900 px-7 py-3 font-semibold text-white shadow-sm hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
          >
            Iniciar
          </button>
          <button
            type="button"
            onClick={() => setAyudaVisible((v) => !v)}
            aria-expanded={ayudaVisible}
            className="avatar-boton rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Ayuda
          </button>
          <button
            type="button"
            onClick={alternarSilencio}
            aria-pressed={silenciado}
            aria-label={silenciado ? 'Activar audio de las narraciones' : 'Silenciar audio de las narraciones'}
            title={silenciado ? 'Audio silenciado' : 'Audio activado'}
            className="avatar-boton grid size-12 place-items-center rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M11 5 6 9H3v6h3l5 4V5z" />
              {silenciado ? <path d="m22 9-6 6m0-6 6 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />}
            </svg>
          </button>
        </div>

        {ayudaVisible && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <p className="mb-2 font-semibold">Cómo navegar el curso:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Usa <strong>← Atrás</strong> y <strong>Siguiente →</strong> en la barra superior para avanzar pantalla por pantalla.</li>
              <li>Usa <strong>☰ Menú</strong> para saltar directamente a cualquier módulo.</li>
              <li>Toca la foto de <strong>Frand</strong>, tu guía, para escuchar la narración de cada pantalla; debajo de su mensaje está la transcripción completa.</li>
              <li>El botón de altavoz silencia o activa las narraciones de todas las pantallas.</li>
              <li>Tu progreso se guarda automáticamente; puedes cerrar y volver a entrar donde ibas.</li>
            </ul>
          </div>
        )}

        <div className="entrada" style={retraso(240)}>
          <AvatarAudioPlayer guion={guionPortada} />
        </div>
      </div>

      <div className="entrada relative order-1 flex justify-center md:order-2" style={retraso(120)}>
        <div
          className="absolute inset-x-6 top-10 bottom-4 rounded-[2.5rem] bg-gradient-to-b from-rose-100 via-rose-50 to-cyan-50 dark:from-rose-950 dark:via-slate-800 dark:to-cyan-950"
          aria-hidden="true"
        />
        <img
          src="./avatar/frand.webp"
          alt="Frand, el avatar guía del curso: un joven sonriente de cabello rizado con suéter rosado"
          width={522}
          height={960}
          draggable={false}
          className="relative h-64 w-auto drop-shadow-[0_18px_24px_rgba(15,23,42,0.18)] sm:h-80 md:h-[28rem]"
        />
        <p className="absolute top-2 left-0 max-w-[11rem] rounded-2xl rounded-br-sm bg-white px-4 py-2.5 text-sm font-medium text-slate-800 shadow-lg ring-1 ring-slate-200 sm:left-2 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700">
          ¡Hola! Soy <span className="text-rose-600 dark:text-rose-300">Frand</span>, tu guía en este curso.
        </p>
      </div>
    </section>
  );
}
