import { useState } from 'react';
import type { MicroVideo as MicroVideoTipo } from '../lib/casos-uso';

function formatear(segundos: number): string {
  const m = Math.floor(segundos / 60);
  const s = Math.floor(segundos % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

// Fachada "clic para cargar": hasta que el usuario pulsa play solo se muestra la miniatura,
// así la pantalla no descarga el reproductor de YouTube (más rápido y sin cookies previas).
// El iframe usa youtube-nocookie y fuerza subtítulos en español (accesibilidad).
export default function MicroVideo({ video }: { video: MicroVideoTipo }) {
  const [cargado, setCargado] = useState(false);
  const inicio = video.inicio ?? 0;

  const parametros = new URLSearchParams({
    autoplay: '1',
    start: String(inicio),
    cc_load_policy: '1',
    cc_lang_pref: 'es',
    hl: 'es',
    rel: '0',
  });
  if (video.fin) parametros.set('end', String(video.fin));

  const urlYoutube = `https://www.youtube.com/watch?v=${video.youtubeId}${inicio ? `&t=${inicio}s` : ''}`;
  const fragmento = video.fin ? `Fragmento ${formatear(inicio)}–${formatear(video.fin)} · ${formatear(video.fin - inicio)} min` : null;

  return (
    <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="relative aspect-video bg-slate-900">
        {cargado ? (
          <iframe
            className="absolute inset-0 size-full"
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?${parametros}`}
            title={video.titulo}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setCargado(true)}
            aria-label={`Reproducir video: ${video.titulo}`}
            className="group absolute inset-0 size-full focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-rose-400"
          >
            <img
              src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="size-full object-cover opacity-90 transition-opacity duration-200 group-hover:opacity-100"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" aria-hidden="true" />
            <span className="avatar-boton absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-rose-500 shadow-xl" aria-hidden="true">
              <svg viewBox="0 0 20 20" className="ml-1 size-7" fill="currentColor"><path d="M6 4.2v11.6a.8.8 0 0 0 1.2.7l9.3-5.8a.8.8 0 0 0 0-1.4L7.2 3.5A.8.8 0 0 0 6 4.2z" /></svg>
            </span>
            {fragmento && (
              <span className="absolute bottom-3 left-3 rounded-md bg-slate-950/80 px-2 py-1 text-xs font-medium tabular-nums text-white">{fragmento}</span>
            )}
          </button>
        )}
      </div>
      <figcaption className="space-y-1 px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-300">Microvideo</p>
        <p className="font-semibold text-slate-900 dark:text-slate-100">{video.titulo}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300">{video.descripcion}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {video.canal} ({video.anio}), YouTube · Con subtítulos en español ·{' '}
          <a href={urlYoutube} target="_blank" rel="noopener noreferrer" className="text-cyan-700 underline-offset-2 hover:underline dark:text-cyan-400">
            Ver en YouTube
          </a>
        </p>
      </figcaption>
    </figure>
  );
}
