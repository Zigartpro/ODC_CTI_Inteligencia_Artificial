import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { PANTALLAS, type DefinicionPantalla } from '../lib/pantallas';
import { establecerTema, useTema, type Tema } from '../lib/tema';

interface Props {
  indiceActual: number;
  onSeleccionar: (indice: number) => void;
}

const ID_INICIO = new Set(['portada', 'rea', 'poblacion-objetivo', 'menu']);

const GRUPOS: { titulo: string; filtro: (p: DefinicionPantalla) => boolean }[] = [
  { titulo: 'Inicio', filtro: (p) => ID_INICIO.has(p.id) },
  { titulo: 'Módulos', filtro: (p) => p.id.startsWith('modulo-') },
  { titulo: 'Cierre', filtro: (p) => !ID_INICIO.has(p.id) && !p.id.startsWith('modulo-') },
];

const INDICE_INDICE = PANTALLAS.findIndex((p) => p.id === 'menu');

// Menú de navegación desplegable (patrón "disclosure"): se abre desde la barra superior,
// se cierra con Escape, clic fuera o al elegir una pantalla. Incluye el selector de tema.
export default function MenuDesplegable({ indiceActual, onSeleccionar }: Props) {
  const [abierto, setAbierto] = useState(false);
  const contenedorRef = useRef<HTMLDivElement>(null);
  const botonRef = useRef<HTMLButtonElement>(null);
  const idPanel = useId();
  const tema = useTema();

  useEffect(() => {
    if (!abierto) return;

    function alPresionarFuera(e: PointerEvent) {
      if (!contenedorRef.current?.contains(e.target as Node)) setAbierto(false);
    }
    function alPresionarTecla(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setAbierto(false);
        botonRef.current?.focus();
      }
    }

    document.addEventListener('pointerdown', alPresionarFuera);
    document.addEventListener('keydown', alPresionarTecla);
    return () => {
      document.removeEventListener('pointerdown', alPresionarFuera);
      document.removeEventListener('keydown', alPresionarTecla);
    };
  }, [abierto]);

  function seleccionar(indice: number) {
    setAbierto(false);
    onSeleccionar(indice);
  }

  return (
    <div ref={contenedorRef} className="relative">
      <button
        ref={botonRef}
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        aria-controls={idPanel}
        className="avatar-boton flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
      >
        <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M3.5 5.5h13M3.5 10h13M3.5 14.5h13" />
        </svg>
        Menú
        <svg viewBox="0 0 20 20" className="menu-flecha size-3.5 text-slate-400" data-abierto={abierto} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m5.5 8 4.5 4.5L14.5 8" />
        </svg>
      </button>

      <div
        id={idPanel}
        data-abierto={abierto}
        className="menu-panel absolute top-[calc(100%+0.5rem)] right-0 z-50 flex max-h-[min(36rem,calc(100vh-5rem))] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/40"
      >
        <nav aria-label="Pantallas del curso" className="flex-1 overflow-y-auto overscroll-contain p-2">
          {GRUPOS.map((grupo) => (
            <div key={grupo.titulo} className="py-1">
              <p className="px-3 pt-2 pb-1 text-[0.7rem] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">{grupo.titulo}</p>
              <ul>
                {PANTALLAS.map((p, indice) =>
                  grupo.filtro(p) ? (
                    <li key={p.id}>
                      <button
                        type="button"
                        onClick={() => seleccionar(indice)}
                        aria-current={indice === indiceActual ? 'page' : undefined}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors duration-150 ${
                          indice === indiceActual
                            ? 'bg-rose-50 font-semibold text-rose-900 dark:bg-rose-950/60 dark:text-rose-100'
                            : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700/60'
                        }`}
                      >
                        <span
                          className={`grid size-6 shrink-0 place-items-center rounded-md text-xs tabular-nums ${
                            indice === indiceActual
                              ? 'bg-rose-400 font-semibold text-white'
                              : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                          }`}
                        >
                          {p.numero}
                        </span>
                        <span className="min-w-0 flex-1 truncate">{p.titulo}</span>
                      </button>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          ))}
        </nav>

        <div className="flex items-center justify-between gap-3 border-t border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-slate-700 dark:bg-slate-900/40">
          <button
            type="button"
            onClick={() => seleccionar(INDICE_INDICE)}
            className="text-sm font-medium text-cyan-700 underline-offset-2 hover:underline dark:text-cyan-400"
          >
            Ver índice completo
          </button>
          <SelectorApariencia tema={tema} />
        </div>
      </div>
    </div>
  );
}

const OPCIONES_TEMA: { valor: Tema; etiqueta: string; icono: ReactNode }[] = [
  {
    valor: 'claro',
    etiqueta: 'Claro',
    icono: (
      <svg viewBox="0 0 20 20" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <circle cx="10" cy="10" r="3.2" />
        <path d="M10 2.5v1.8M10 15.7v1.8M2.5 10h1.8M15.7 10h1.8M4.7 4.7l1.3 1.3M14 14l1.3 1.3M4.7 15.3 6 14M14 6l1.3-1.3" />
      </svg>
    ),
  },
  {
    valor: 'oscuro',
    etiqueta: 'Oscuro',
    icono: (
      <svg viewBox="0 0 20 20" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
        <path d="M16.5 12.2A6.8 6.8 0 0 1 7.8 3.5a6.8 6.8 0 1 0 8.7 8.7z" />
      </svg>
    ),
  },
];

function SelectorApariencia({ tema }: { tema: Tema }) {
  return (
    <div role="radiogroup" aria-label="Apariencia" className="flex rounded-lg bg-slate-200/70 p-0.5 dark:bg-slate-700/70">
      {OPCIONES_TEMA.map((opcion) => {
        const activo = tema === opcion.valor;
        return (
          <button
            key={opcion.valor}
            type="button"
            role="radio"
            aria-checked={activo}
            onClick={() => establecerTema(opcion.valor)}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors duration-150 ${
              activo
                ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-100'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100'
            }`}
          >
            {opcion.icono}
            {opcion.etiqueta}
          </button>
        );
      })}
    </div>
  );
}
