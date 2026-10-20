import { useEffect, useId, useRef, useState } from 'react';
import type { GuionAvatar } from '../lib/casos-uso';
import { obtenerPreferenciaSilencio, establecerPreferenciaSilencio } from '../lib/preferenciasAudio';

interface Props {
  guion: GuionAvatar;
}

type Estado = 'listo' | 'reproduciendo' | 'pausado' | 'terminado' | 'sin-audio';

const RADIO = 45;
const CIRCUNFERENCIA = 2 * Math.PI * RADIO;

function formatearTiempo(segundos: number): string {
  if (!Number.isFinite(segundos) || segundos < 0) return '0:00';
  const m = Math.floor(segundos / 60);
  const s = Math.floor(segundos % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

const MENSAJES: Record<Estado, string> = {
  listo: 'Toca mi foto para escucharme.',
  reproduciendo: 'Te cuento lo más importante de esta pantalla…',
  pausado: 'En pausa. Toca mi foto para continuar.',
  terminado: '¿Quieres escucharme otra vez? Toca mi foto.',
  'sin-audio': 'Mi audio para esta pantalla está en preparación. Mientras tanto, lee lo que te cuento en la transcripción.',
};

// Frand, el avatar guía: su foto es el botón de play/pausa del audio de la pantalla.
// El mp3 vive en public/audio/ y se referencia con ruta relativa (requisito para que
// funcione dentro de un LMS). La transcripción siempre está disponible por accesibilidad.
export default function AvatarAudioPlayer({ guion }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [estado, setEstado] = useState<Estado>('listo');
  const [tiempoActual, setTiempoActual] = useState(0);
  const [duracion, setDuracion] = useState(0);
  const [transcripcionVisible, setTranscripcionVisible] = useState(false);
  const idTranscripcion = useId();

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = obtenerPreferenciaSilencio();
  }, []);

  function alternarReproduccion() {
    const audio = audioRef.current;
    if (!audio || estado === 'sin-audio') {
      setTranscripcionVisible(true);
      return;
    }
    if (audio.paused) {
      // Tocar a Frand es una petición explícita de escuchar: anula el silencio global.
      if (audio.muted) {
        audio.muted = false;
        establecerPreferenciaSilencio(false);
      }
      audio.play().catch(() => setEstado('sin-audio'));
    } else {
      audio.pause();
    }
  }

  const hablando = estado === 'reproduciendo';
  const progreso = estado === 'terminado' ? 1 : duracion > 0 ? tiempoActual / duracion : 0;
  const etiquetaBoton =
    estado === 'sin-audio'
      ? 'Frand: audio no disponible, ver transcripción'
      : hablando
        ? 'Pausar a Frand'
        : estado === 'pausado'
          ? 'Continuar escuchando a Frand'
          : 'Escuchar a Frand, tu guía en esta pantalla';

  return (
    <div className="flex items-start gap-4">
      <button
        type="button"
        onClick={alternarReproduccion}
        aria-label={etiquetaBoton}
        aria-pressed={hablando}
        className="avatar-boton relative size-20 shrink-0 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-500 sm:size-24"
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
          <circle cx="50" cy="50" r={RADIO} fill="none" strokeWidth="4" className="stroke-rose-100 dark:stroke-rose-950" />
          <circle
            cx="50"
            cy="50"
            r={RADIO}
            fill="none"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={CIRCUNFERENCIA}
            strokeDashoffset={CIRCUNFERENCIA * (1 - progreso)}
            className="avatar-anillo stroke-rose-400 dark:stroke-rose-400"
          />
        </svg>
        <span className="absolute inset-[7px] overflow-hidden rounded-full bg-gradient-to-b from-rose-50 to-rose-200 ring-1 ring-black/5 dark:from-rose-900/50 dark:to-slate-700 dark:ring-white/10">
          <img
            src="./avatar/frand-busto.webp"
            alt="Frand, el avatar guía del curso"
            width={320}
            height={320}
            draggable={false}
            className="avatar-cara size-full object-cover"
            data-hablando={hablando}
          />
        </span>
        <span
          className="absolute -right-0.5 -bottom-0.5 grid size-8 place-items-center rounded-full bg-white text-rose-500 shadow-md ring-1 ring-slate-200 dark:bg-slate-700 dark:text-rose-300 dark:ring-slate-600"
          aria-hidden="true"
        >
          {estado === 'sin-audio' ? (
            <svg viewBox="0 0 20 20" className="size-4" fill="currentColor"><path d="M4 4h12v2H4zm0 4h12v2H4zm0 4h8v2H4z" /></svg>
          ) : hablando ? (
            <svg viewBox="0 0 20 20" className="size-4" fill="currentColor"><path d="M5 4h3.5v12H5zm6.5 0H15v12h-3.5z" /></svg>
          ) : (
            <svg viewBox="0 0 20 20" className="ml-0.5 size-4" fill="currentColor"><path d="M6 4.2v11.6a.8.8 0 0 0 1.2.7l9.3-5.8a.8.8 0 0 0 0-1.4L7.2 3.5A.8.8 0 0 0 6 4.2z" /></svg>
          )}
        </span>
      </button>

      <div className="min-w-0 flex-1 rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Frand <span className="font-normal text-slate-500 dark:text-slate-400">· Tu guía</span>
          </p>
          {estado !== 'sin-audio' && duracion > 0 && (
            <span className="text-xs tabular-nums text-slate-500 dark:text-slate-400">
              {formatearTiempo(tiempoActual)} / {formatearTiempo(duracion)}
            </span>
          )}
        </div>

        <p className="mt-1 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300" aria-live="polite">
          {hablando && (
            <span className="avatar-ondas flex h-3.5 items-end gap-[3px]" aria-hidden="true">
              <span /><span /><span /><span />
            </span>
          )}
          {MENSAJES[estado]}
        </p>

        <button
          type="button"
          onClick={() => setTranscripcionVisible((v) => !v)}
          aria-expanded={transcripcionVisible}
          aria-controls={idTranscripcion}
          className="mt-2 text-sm font-medium text-cyan-700 underline-offset-2 hover:underline dark:text-cyan-400"
        >
          {transcripcionVisible ? 'Ocultar transcripción' : 'Ver transcripción'}
        </button>

        {transcripcionVisible && (
          <p id={idTranscripcion} className="mt-2 border-t border-slate-100 pt-2 text-sm leading-relaxed text-slate-700 dark:border-slate-700 dark:text-slate-300">
            {guion.texto}
          </p>
        )}
      </div>

      <audio
        ref={audioRef}
        src={`./audio/${guion.archivoAudio}`}
        preload="metadata"
        className="hidden"
        onLoadedMetadata={(e) => setDuracion(e.currentTarget.duration)}
        onTimeUpdate={(e) => setTiempoActual(e.currentTarget.currentTime)}
        onPlay={() => setEstado('reproduciendo')}
        onPause={(e) => setEstado(e.currentTarget.ended ? 'terminado' : 'pausado')}
        onEnded={() => setEstado('terminado')}
        onError={() => setEstado('sin-audio')}
      />
    </div>
  );
}
