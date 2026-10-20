import { useEffect, useRef, useState } from 'react';
import { PANTALLAS } from '../lib/pantallas';
import { scorm } from '../lib/scorm';
import MenuDesplegable from './MenuDesplegable';
import PantallaPlaceholder from './screens/PantallaPlaceholder';
import PantallaCasoUso from './screens/PantallaCasoUso';
import PantallaIntroduccion from './screens/PantallaIntroduccion';
import PantallaConceptos from './screens/PantallaConceptos';
import PantallaEvidencia from './screens/PantallaEvidencia';
import PantallaPortada from './screens/PantallaPortada';
import PantallaEvaluacion from './screens/PantallaEvaluacion';
import PantallaReferencias from './screens/PantallaReferencias';
import PantallaCreditos from './screens/PantallaCreditos';
import PantallaGuia from './screens/PantallaGuia';
import { moduloInstalacion } from '../content/paginas/modulo-instalacion';
import { ContextoRegistroActividades, type ResultadosActividades } from '../lib/registro-actividades';
import { paginaRea } from '../content/paginas/rea';
import { paginaPoblacionObjetivo } from '../content/paginas/poblacion-objetivo';
import { paginaConclusion } from '../content/paginas/conclusion';
import { paginaReferencias } from '../content/paginas/referencias';
import { paginaCreditos } from '../content/paginas/creditos';
import { evaluacionFinal } from '../content/paginas/evaluacion';
import { modulo3AtencionCliente } from '../content/casos-uso/modulo-3-atencion-cliente';
import { modulo4Marketing } from '../content/casos-uso/modulo-4-marketing';
import { modulo5Contabilidad } from '../content/casos-uso/modulo-5-contabilidad';
import { modulo6Inventario } from '../content/casos-uso/modulo-6-inventario';
import { modulo7Rrhh } from '../content/casos-uso/modulo-7-rrhh';
import { modulo1Introduccion } from '../content/paginas/modulo-1-introduccion';
import { modulo2QueEsN8n } from '../content/paginas/modulo-2-que-es-n8n';
import { modulo8Evidencia } from '../content/paginas/modulo-8-evidencia';
import type { CasoUso } from '../lib/casos-uso';

const CASOS_DE_USO: Record<string, CasoUso> = {
  'modulo-3-atencion-cliente': modulo3AtencionCliente,
  'modulo-4-marketing': modulo4Marketing,
  'modulo-5-contabilidad': modulo5Contabilidad,
  'modulo-6-inventario': modulo6Inventario,
  'modulo-7-rrhh': modulo7Rrhh,
};


export default function CourseShell() {
  const [indiceActual, setIndiceActual] = useState(0);
  const [resultados, setResultados] = useState<ResultadosActividades>({});
  const [listoParaMostrar, setListoParaMostrar] = useState(false);
  const resultadosRef = useRef(resultados);
  resultadosRef.current = resultados;
  const indiceRef = useRef(indiceActual);
  indiceRef.current = indiceActual;

  useEffect(() => {
    let activo = true;

    (async () => {
      await scorm.conectar();
      const marcador = scorm.leerMarcador();
      if (activo && marcador && marcador.pantalla >= 0 && marcador.pantalla < PANTALLAS.length) {
        setIndiceActual(marcador.pantalla);
        setResultados((marcador.respuestas ?? {}) as ResultadosActividades);
      }
      if (activo) setListoParaMostrar(true);
    })();

    const alSalir = () => scorm.finalizar();
    window.addEventListener('beforeunload', alSalir);

    return () => {
      activo = false;
      window.removeEventListener('beforeunload', alSalir);
      scorm.finalizar();
    };
  }, []);

  function irAPantalla(indice: number) {
    if (indice < 0 || indice >= PANTALLAS.length) return;
    setIndiceActual(indice);
    window.scrollTo({ top: 0 });
    scorm.guardarMarcador({ pantalla: indice, respuestas: resultadosRef.current });
  }

  // Solo cuenta el primer intento de cada actividad (los reintentos sirven para aprender,
  // pero no "inflan" el criterio del REA).
  function registrarActividad(pantallaId: string, correcta: boolean) {
    if (resultadosRef.current[pantallaId] !== undefined) return;
    const nuevos = { ...resultadosRef.current, [pantallaId]: correcta };
    resultadosRef.current = nuevos;
    setResultados(nuevos);
    scorm.guardarMarcador({ pantalla: indiceRef.current, respuestas: nuevos });
  }

  if (!listoParaMostrar) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-slate-400 dark:bg-slate-900 dark:text-slate-500">
        Cargando curso…
      </div>
    );
  }

  const pantalla = PANTALLAS[indiceActual];

  return (
    <ContextoRegistroActividades.Provider value={{ resultados, registrar: registrarActividad }}>
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
        <div
          className="h-1 bg-slate-100 dark:bg-slate-800"
          role="progressbar"
          aria-label="Avance en el curso"
          aria-valuemin={1}
          aria-valuemax={PANTALLAS.length}
          aria-valuenow={indiceActual + 1}
        >
          <div
            className="barra-progreso h-full bg-gradient-to-r from-rose-400 to-cyan-500"
            style={{ transform: `scaleX(${(indiceActual + 1) / PANTALLAS.length})` }}
          />
        </div>

        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5">
          <button
            type="button"
            onClick={() => irAPantalla(indiceActual - 1)}
            disabled={indiceActual === 0}
            className="avatar-boton rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-30 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label="Pantalla anterior"
          >
            ← Atrás
          </button>

          <p className="hidden min-w-0 flex-1 truncate text-center text-sm text-slate-500 sm:block dark:text-slate-400">
            <span className="font-semibold tabular-nums text-slate-800 dark:text-slate-200">
              {indiceActual + 1} / {PANTALLAS.length}
            </span>
            <span className="mx-2 text-slate-300 dark:text-slate-600" aria-hidden="true">·</span>
            {pantalla.titulo}
          </p>

          <div className="ml-auto flex items-center gap-2 sm:ml-0">
            <MenuDesplegable indiceActual={indiceActual} onSeleccionar={irAPantalla} />
            <button
              type="button"
              onClick={() => irAPantalla(indiceActual + 1)}
              disabled={indiceActual === PANTALLAS.length - 1}
              className="avatar-boton rounded-lg bg-slate-900 px-3.5 py-1.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:pointer-events-none disabled:opacity-30 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
              aria-label="Siguiente pantalla"
            >
              Siguiente →
            </button>
          </div>
        </div>
      </header>

      {/* key: al cambiar de pantalla se reinicia el estado local (p. ej. la actividad de un caso no "hereda" la del anterior). */}
      <main key={pantalla.id} className="flex-1">
        {pantalla.id === 'portada' ? (
          <PantallaPortada onIniciar={() => irAPantalla(indiceActual + 1)} />
        ) : pantalla.id === 'rea' ? (
          <PantallaIntroduccion pantalla={paginaRea} />
        ) : pantalla.id === 'poblacion-objetivo' ? (
          <PantallaIntroduccion pantalla={paginaPoblacionObjetivo} />
        ) : pantalla.id === 'menu' ? (
          <MenuPantallas onSeleccionar={irAPantalla} />
        ) : pantalla.id === 'modulo-1-introduccion' ? (
          <PantallaIntroduccion pantalla={modulo1Introduccion} />
        ) : pantalla.id === 'modulo-2-que-es-n8n' ? (
          <PantallaConceptos pantalla={modulo2QueEsN8n} />
        ) : pantalla.id === 'modulo-instalacion' ? (
          <PantallaGuia guia={moduloInstalacion} />
        ) : pantalla.id === 'modulo-8-evidencia' ? (
          <PantallaEvidencia evidencia={modulo8Evidencia} />
        ) : pantalla.id === 'evaluacion' ? (
          <PantallaEvaluacion evaluacion={evaluacionFinal} onIrAPantalla={irAPantalla} />
        ) : pantalla.id === 'conclusion' ? (
          <PantallaIntroduccion pantalla={paginaConclusion} />
        ) : pantalla.id === 'referencias' ? (
          <PantallaReferencias pagina={paginaReferencias} />
        ) : pantalla.id === 'creditos' ? (
          <PantallaCreditos pagina={paginaCreditos} />
        ) : CASOS_DE_USO[pantalla.id] ? (
          <PantallaCasoUso caso={CASOS_DE_USO[pantalla.id]} />
        ) : (
          <PantallaPlaceholder pantalla={pantalla} />
        )}
      </main>
    </div>
    </ContextoRegistroActividades.Provider>
  );
}

function MenuPantallas({ onSeleccionar }: { onSeleccionar: (indice: number) => void }) {
  return (
    <nav className="mx-auto max-w-2xl p-8">
      <h1 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">Índice</h1>
      <ul className="space-y-2">
        {PANTALLAS.map((p, indice) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => onSeleccionar(indice)}
              className="w-full rounded border border-slate-200 px-4 py-2 text-left hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <span className="text-slate-400">{p.numero}.</span> {p.titulo}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
