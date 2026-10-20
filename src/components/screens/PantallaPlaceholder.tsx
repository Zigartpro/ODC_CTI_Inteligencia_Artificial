import type { DefinicionPantalla } from '../../lib/pantallas';

interface Props {
  pantalla: DefinicionPantalla;
}

// Placeholder temporal: cada pantalla real reemplazará esta entrada en PANTALLAS
// (src/lib/pantallas.ts) por su propio componente, módulo a módulo.
export default function PantallaPlaceholder({ pantalla }: Props) {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-8 text-center">
      <span className="text-sm font-medium uppercase tracking-wide text-slate-400">
        Pantalla {pantalla.numero} de 16
      </span>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{pantalla.titulo}</h1>
      <p className="max-w-xl text-slate-600 dark:text-slate-400">{pantalla.descripcion}</p>
      {pantalla.tieneAudio && (
        <p className="text-sm italic text-slate-400">🔊 Esta pantalla llevará audio de avatar</p>
      )}
    </section>
  );
}
