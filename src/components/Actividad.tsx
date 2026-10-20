import { useState, type DragEvent } from 'react';
import type {
  Actividad as ActividadTipo,
  ActividadClasificar,
  ActividadCompletar,
  ActividadEstimarCifras,
  EspacioCompletar,
} from '../lib/casos-uso';
import { useRegistroActividades } from '../lib/registro-actividades';

interface Props {
  actividad: ActividadTipo;
  /** Pantalla a la que pertenece la actividad: su resultado se registra con esta clave. */
  pantallaId: string;
}

type AlResolver = (correcta: boolean) => void;

const BOTON_PRIMARIO =
  'avatar-boton rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:pointer-events-none disabled:opacity-30 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white';
const BOTON_SECUNDARIO =
  'avatar-boton rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800';
const CAJA_BIEN = 'bg-green-50 text-green-900 ring-1 ring-green-200 dark:bg-green-950 dark:text-green-100 dark:ring-green-900';
const CAJA_MAL = 'bg-red-50 text-red-900 ring-1 ring-red-200 dark:bg-red-950 dark:text-red-100 dark:ring-red-900';
const CAJA_AVISO = 'bg-amber-50 text-amber-900 ring-1 ring-amber-200 dark:bg-amber-950 dark:text-amber-100 dark:ring-amber-900';

export default function Actividad({ actividad, pantallaId }: Props) {
  const { registrar } = useRegistroActividades();
  const alResolver: AlResolver = (correcta) => registrar(pantallaId, correcta);

  switch (actividad.tipo) {
    case 'seleccion-multiple':
      return <SeleccionMultiple actividad={actividad} alResolver={alResolver} />;
    case 'verdadero-falso':
      return <VerdaderoFalso actividad={actividad} alResolver={alResolver} />;
    case 'ordenar-pasos':
      return <OrdenarPasos actividad={actividad} alResolver={alResolver} />;
    case 'estimar-cifras':
      return <EstimarCifras actividad={actividad} alResolver={alResolver} />;
    case 'clasificar':
      return <Clasificar actividad={actividad} alResolver={alResolver} />;
    case 'completar':
      return <Completar actividad={actividad} alResolver={alResolver} />;
  }
}

function SeleccionMultiple({ actividad, alResolver }: { actividad: Extract<ActividadTipo, { tipo: 'seleccion-multiple' }>; alResolver: AlResolver }) {
  const [seleccionada, setSeleccionada] = useState<number | null>(null);
  const [comprobado, setComprobado] = useState(false);

  return (
    <div>
      <p className="mb-3 font-medium text-slate-800 dark:text-slate-200">{actividad.pregunta}</p>
      <div className="space-y-2" role="radiogroup">
        {actividad.opciones.map((opcion, indice) => (
          <label
            key={indice}
            className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors duration-150 dark:text-slate-200 ${
              seleccionada === indice
                ? 'border-slate-800 bg-slate-50 dark:border-slate-300 dark:bg-slate-700'
                : 'border-slate-200 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700'
            }`}
          >
            <input
              type="radio"
              name="seleccion-multiple"
              className="mt-1"
              checked={seleccionada === indice}
              onChange={() => {
                setSeleccionada(indice);
                setComprobado(false);
              }}
            />
            <span>{opcion.texto}</span>
          </label>
        ))}
      </div>

      <button
        type="button"
        disabled={seleccionada === null}
        onClick={() => {
          setComprobado(true);
          if (seleccionada !== null) alResolver(actividad.opciones[seleccionada].correcta);
        }}
        className={`mt-3 ${BOTON_PRIMARIO}`}
      >
        Comprobar respuesta
      </button>

      {comprobado && seleccionada !== null && (
        <p className={`mt-3 rounded-lg p-3 text-sm ${actividad.opciones[seleccionada].correcta ? CAJA_BIEN : CAJA_MAL}`} role="status">
          {actividad.opciones[seleccionada].retroalimentacion}
        </p>
      )}
    </div>
  );
}

function VerdaderoFalso({ actividad, alResolver }: { actividad: Extract<ActividadTipo, { tipo: 'verdadero-falso' }>; alResolver: AlResolver }) {
  const [respuesta, setRespuesta] = useState<boolean | null>(null);

  function responder(valor: boolean) {
    setRespuesta(valor);
    alResolver(valor === actividad.esVerdadero);
  }

  return (
    <div>
      <p className="mb-3 font-medium text-slate-800 dark:text-slate-200">{actividad.enunciado}</p>
      <div className="flex gap-3">
        {[true, false].map((valor) => (
          <button
            key={String(valor)}
            type="button"
            onClick={() => responder(valor)}
            aria-pressed={respuesta === valor}
            className={respuesta === valor ? BOTON_PRIMARIO : BOTON_SECUNDARIO}
          >
            {valor ? 'Verdadero' : 'Falso'}
          </button>
        ))}
      </div>

      {respuesta !== null && (
        <p className={`mt-3 rounded-lg p-3 text-sm ${respuesta === actividad.esVerdadero ? CAJA_BIEN : CAJA_MAL}`} role="status">
          {respuesta === actividad.esVerdadero ? actividad.retroalimentacionCorrecta : actividad.retroalimentacionIncorrecta}
        </p>
      )}
    </div>
  );
}

function barajar<T>(items: T[]): T[] {
  const copia = [...items];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function OrdenarPasos({ actividad, alResolver }: { actividad: Extract<ActividadTipo, { tipo: 'ordenar-pasos' }>; alResolver: AlResolver }) {
  const [pasos, setPasos] = useState(() => barajar(actividad.pasosEnOrden));
  const [comprobado, setComprobado] = useState(false);

  function mover(indice: number, direccion: -1 | 1) {
    const destino = indice + direccion;
    if (destino < 0 || destino >= pasos.length) return;
    const copia = [...pasos];
    [copia[indice], copia[destino]] = [copia[destino], copia[indice]];
    setPasos(copia);
    setComprobado(false);
  }

  const esCorrecto = pasos.every((paso, i) => paso === actividad.pasosEnOrden[i]);

  return (
    <div>
      <p className="mb-3 font-medium text-slate-800 dark:text-slate-200">{actividad.instruccion}</p>
      <ol className="space-y-2">
        {pasos.map((paso, indice) => (
          <li key={paso} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
            <span className="flex flex-col">
              <button type="button" aria-label={`Mover "${paso}" hacia arriba`} disabled={indice === 0} onClick={() => mover(indice, -1)} className="text-xs disabled:opacity-20">
                ▲
              </button>
              <button type="button" aria-label={`Mover "${paso}" hacia abajo`} disabled={indice === pasos.length - 1} onClick={() => mover(indice, 1)} className="text-xs disabled:opacity-20">
                ▼
              </button>
            </span>
            <span className="grid size-6 shrink-0 place-items-center rounded-md bg-slate-100 text-xs tabular-nums text-slate-500 dark:bg-slate-700 dark:text-slate-400">{indice + 1}</span>
            <span>{paso}</span>
          </li>
        ))}
      </ol>

      <button
        type="button"
        onClick={() => {
          setComprobado(true);
          alResolver(esCorrecto);
        }}
        className={`mt-3 ${BOTON_PRIMARIO}`}
      >
        Comprobar orden
      </button>

      {comprobado && (
        <div className={`mt-3 rounded-lg p-3 text-sm ${esCorrecto ? CAJA_BIEN : CAJA_AVISO}`} role="status">
          <p className="font-medium">{esCorrecto ? '¡Correcto!' : 'Todavía no está en el orden correcto.'}</p>
          <p className="mt-1">{actividad.retroalimentacion}</p>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Adivina la cifra                                                     */
/* ------------------------------------------------------------------ */

function EstimarCifras({ actividad, alResolver }: { actividad: ActividadEstimarCifras; alResolver: AlResolver }) {
  const [paso, setPaso] = useState(0);
  const [estimaciones, setEstimaciones] = useState(() => actividad.cifras.map((c) => Math.round((c.min + c.max) / 2)));
  const [revelada, setRevelada] = useState(false);
  const [aciertos, setAciertos] = useState<boolean[]>([]);

  const terminado = paso >= actividad.cifras.length;
  const cifra = actividad.cifras[Math.min(paso, actividad.cifras.length - 1)];
  const estimacion = estimaciones[Math.min(paso, actividad.cifras.length - 1)];
  const diferencia = Math.abs(estimacion - cifra.valor);
  const acerto = diferencia <= cifra.tolerancia;
  const posicion = (v: number) => `${((v - cifra.min) / (cifra.max - cifra.min)) * 100}%`;

  function revelar() {
    setRevelada(true);
    const nuevos = [...aciertos, acerto];
    setAciertos(nuevos);
    if (nuevos.length === actividad.cifras.length) {
      alResolver(nuevos.filter(Boolean).length >= Math.ceil(actividad.cifras.length * 0.6));
    }
  }

  function siguiente() {
    setRevelada(false);
    setPaso((p) => p + 1);
  }

  function reiniciar() {
    setPaso(0);
    setRevelada(false);
    setAciertos([]);
    setEstimaciones(actividad.cifras.map((c) => Math.round((c.min + c.max) / 2)));
  }

  if (terminado) {
    const total = aciertos.filter(Boolean).length;
    return (
      <div className={`rounded-xl p-5 ${total >= Math.ceil(actividad.cifras.length * 0.6) ? CAJA_BIEN : CAJA_AVISO}`} role="status">
        <p className="text-lg font-semibold">
          Acertaste {total} de {actividad.cifras.length} cifras
        </p>
        <p className="mt-1 text-sm">
          {total === actividad.cifras.length
            ? 'Tienes muy claro el panorama de las pymes en Colombia.'
            : 'Estas cifras son el punto de partida de todo el curso: vale la pena repasarlas en la infografía de arriba.'}
        </p>
        <button type="button" onClick={reiniciar} className={`mt-4 ${BOTON_SECUNDARIO}`}>
          Volver a intentarlo
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-slate-600 dark:text-slate-300">{actividad.instruccion}</p>
        <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold tabular-nums text-slate-600 dark:bg-slate-700 dark:text-slate-300">
          {paso + 1} / {actividad.cifras.length}
        </span>
      </div>

      <p className="font-medium text-slate-900 dark:text-slate-100">{cifra.pregunta}</p>

      <p className="my-4 text-center text-5xl font-bold tracking-tight tabular-nums text-slate-900 dark:text-slate-50" aria-live="polite">
        {estimacion}
        <span className="ml-1 text-2xl font-semibold text-slate-400">{cifra.unidad}</span>
      </p>

      <div className="relative">
        <input
          type="range"
          min={cifra.min}
          max={cifra.max}
          step={0.5}
          value={estimacion}
          disabled={revelada}
          onChange={(e) => setEstimaciones((prev) => prev.map((v, i) => (i === paso ? Number(e.target.value) : v)))}
          aria-label={`Tu estimación: ${cifra.pregunta}`}
          className="w-full accent-rose-500"
        />
        {revelada && (
          <span
            className="pointer-events-none absolute -top-7 -translate-x-1/2 rounded-md bg-cyan-600 px-2 py-0.5 text-xs font-semibold whitespace-nowrap text-white shadow"
            style={{ left: posicion(cifra.valor) }}
          >
            Real: {cifra.valor}
            {cifra.unidad}
          </span>
        )}
        <div className="mt-1 flex justify-between text-xs text-slate-400 tabular-nums">
          <span>
            {cifra.min}
            {cifra.unidad}
          </span>
          <span>
            {cifra.max}
            {cifra.unidad}
          </span>
        </div>
      </div>

      {revelada ? (
        <div className={`mt-4 rounded-lg p-3 text-sm ${acerto ? CAJA_BIEN : CAJA_MAL}`} role="status">
          <p className="font-semibold">
            {acerto ? '¡Muy cerca! ' : `Te alejaste ${diferencia.toLocaleString('es-CO')} puntos. `}
            La cifra real es {cifra.valor.toLocaleString('es-CO')}
            {cifra.unidad}.
          </p>
          <p className="mt-1">{cifra.explicacion}</p>
          <p className="mt-1 text-xs opacity-80">Fuente: {cifra.fuente}</p>
        </div>
      ) : null}

      <div className="mt-4 flex justify-end">
        {revelada ? (
          <button type="button" onClick={siguiente} className={BOTON_PRIMARIO}>
            {paso + 1 < actividad.cifras.length ? 'Siguiente cifra →' : 'Ver mi resultado'}
          </button>
        ) : (
          <button type="button" onClick={revelar} className={BOTON_PRIMARIO}>
            Revelar la cifra real
          </button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Clasificar tarjetas                                                  */
/* ------------------------------------------------------------------ */

function Clasificar({ actividad, alResolver }: { actividad: ActividadClasificar; alResolver: AlResolver }) {
  const [orden] = useState(() => barajar(actividad.elementos.map((_, i) => i)));
  const [ubicacion, setUbicacion] = useState<Record<number, string | undefined>>({});
  const [seleccionado, setSeleccionado] = useState<number | null>(null);
  const [comprobado, setComprobado] = useState(false);

  const sinUbicar = orden.filter((i) => !ubicacion[i]);
  const correctos = actividad.elementos.filter((el, i) => ubicacion[i] === el.categoria).length;

  function colocar(indice: number, categoria: string | undefined) {
    setUbicacion((u) => ({ ...u, [indice]: categoria }));
    setSeleccionado(null);
    setComprobado(false);
  }

  function alSoltar(e: DragEvent, categoria: string | undefined) {
    e.preventDefault();
    const indice = Number(e.dataTransfer.getData('text/plain'));
    if (!Number.isNaN(indice)) colocar(indice, categoria);
  }

  function comprobar() {
    setComprobado(true);
    alResolver(correctos / actividad.elementos.length >= 0.8);
  }

  const tarjeta = (indice: number) => {
    const el = actividad.elementos[indice];
    const estado = comprobado && ubicacion[indice] ? (ubicacion[indice] === el.categoria ? 'bien' : 'mal') : null;
    return (
      <button
        key={indice}
        type="button"
        draggable
        onDragStart={(e) => e.dataTransfer.setData('text/plain', String(indice))}
        onClick={() => setSeleccionado((s) => (s === indice ? null : indice))}
        aria-pressed={seleccionado === indice}
        className={`avatar-boton w-full cursor-grab rounded-lg border px-3 py-2 text-left text-sm shadow-sm active:cursor-grabbing ${
          seleccionado === indice
            ? 'border-rose-400 bg-rose-50 ring-2 ring-rose-300 dark:border-rose-400 dark:bg-rose-950 dark:ring-rose-800'
            : estado === 'bien'
              ? 'border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-950'
              : estado === 'mal'
                ? 'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950'
                : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-600 dark:bg-slate-800'
        } text-slate-800 dark:text-slate-100`}
      >
        {estado === 'bien' && <span className="mr-1.5 text-green-600" aria-label="Correcto">✓</span>}
        {estado === 'mal' && <span className="mr-1.5 text-red-600" aria-label="Incorrecto">✗</span>}
        {el.texto}
      </button>
    );
  }

  return (
    <div>
      <p className="mb-1 font-medium text-slate-800 dark:text-slate-200">{actividad.instruccion}</p>
      <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
        Toca una tarjeta y luego la categoría donde va (o arrástrala). Toca una tarjeta ya ubicada para moverla.
      </p>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => alSoltar(e, undefined)}
        className="mb-4 flex min-h-14 flex-wrap gap-2 rounded-xl border-2 border-dashed border-slate-200 p-3 dark:border-slate-700"
        aria-label="Tarjetas por clasificar"
      >
        {sinUbicar.length === 0 ? (
          <p className="m-auto text-sm text-slate-400">¡Ubicaste todas las tarjetas!</p>
        ) : (
          sinUbicar.map((i) => (
            <div key={i} className="w-full sm:w-[calc(50%-0.25rem)]">
              {tarjeta(i)}
            </div>
          ))
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {actividad.categorias.map((cat) => (
          <div
            key={cat.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => alSoltar(e, cat.id)}
            className="flex flex-col rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200 dark:bg-slate-800/60 dark:ring-slate-700"
          >
            <button
              type="button"
              onClick={() => seleccionado !== null && colocar(seleccionado, cat.id)}
              disabled={seleccionado === null}
              className="mb-2 rounded-lg px-2 py-1.5 text-left transition-colors duration-150 enabled:bg-white enabled:ring-2 enabled:ring-rose-300 enabled:hover:bg-rose-50 dark:enabled:bg-slate-700 dark:enabled:ring-rose-700"
            >
              <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">{cat.nombre}</span>
              <span className="block text-xs text-slate-500 dark:text-slate-400">{seleccionado !== null ? 'Toca aquí para ubicarla' : cat.descripcion}</span>
            </button>
            <div className="flex flex-1 flex-col gap-2">
              {orden
                .filter((i) => ubicacion[i] === cat.id)
                .map((i) => tarjeta(i))}
            </div>
          </div>
        ))}
      </div>

      <button type="button" disabled={sinUbicar.length > 0} onClick={comprobar} className={`mt-4 ${BOTON_PRIMARIO}`}>
        Comprobar clasificación
      </button>

      {comprobado && (
        <div className={`mt-3 rounded-lg p-3 text-sm ${correctos === actividad.elementos.length ? CAJA_BIEN : CAJA_AVISO}`} role="status">
          <p className="font-semibold">
            {correctos === actividad.elementos.length ? '¡Perfecto! ' : ''}Clasificaste bien {correctos} de {actividad.elementos.length} piezas.
          </p>
          <ul className="mt-2 space-y-1">
            {actividad.elementos.map((el, i) =>
              ubicacion[i] !== el.categoria ? (
                <li key={i}>
                  <strong>«{el.texto}»</strong>: {el.explicacion}
                </li>
              ) : null
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Completar el comando                                                 */
/* ------------------------------------------------------------------ */

const normalizar = (t: string) => t.trim().toLowerCase().replace(/\s+/g, ' ');

function Completar({ actividad, alResolver }: { actividad: ActividadCompletar; alResolver: AlResolver }) {
  const espacios = actividad.lineas.flat().filter((p): p is EspacioCompletar => typeof p !== 'string');
  const [valores, setValores] = useState<Record<string, string>>({});
  const [comprobado, setComprobado] = useState(false);
  const [pistas, setPistas] = useState(false);

  const esCorrecto = (e: EspacioCompletar) => e.respuestasAceptadas.some((r) => normalizar(r) === normalizar(valores[e.id] ?? ''));
  const correctos = espacios.filter(esCorrecto).length;
  const completo = espacios.every((e) => (valores[e.id] ?? '').trim() !== '');

  return (
    <div>
      <p className="mb-3 font-medium text-slate-800 dark:text-slate-200">{actividad.instruccion}</p>

      <div className="overflow-x-auto rounded-xl bg-slate-950 p-4 font-mono text-sm leading-9 text-slate-200 shadow-inner ring-1 ring-slate-800">
        <div className="mb-2 flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-red-400/80" />
          <span className="size-2.5 rounded-full bg-amber-400/80" />
          <span className="size-2.5 rounded-full bg-green-400/80" />
        </div>
        {actividad.lineas.map((linea, il) => (
          <div key={il} className="whitespace-nowrap">
            {linea.map((pieza, ip) =>
              typeof pieza === 'string' ? (
                <span key={ip} className="whitespace-pre">
                  {pieza}
                </span>
              ) : (
                <input
                  key={pieza.id}
                  value={valores[pieza.id] ?? ''}
                  onChange={(e) => {
                    setValores((v) => ({ ...v, [pieza.id]: e.target.value }));
                    setComprobado(false);
                  }}
                  aria-label={`Espacio en blanco: ${pieza.pista}`}
                  placeholder="…"
                  spellCheck={false}
                  autoComplete="off"
                  size={Math.max(4, ...pieza.respuestasAceptadas.map((r) => r.length)) + 1}
                  className={`mx-0.5 rounded-md border-b-2 bg-slate-800 px-1.5 py-0.5 text-center font-mono text-cyan-300 outline-none placeholder:text-slate-600 focus:bg-slate-700 ${
                    comprobado ? (esCorrecto(pieza) ? 'border-green-400' : 'border-red-400') : 'border-slate-500 focus:border-rose-400'
                  }`}
                />
              )
            )}
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={!completo}
          onClick={() => {
            setComprobado(true);
            alResolver(espacios.every(esCorrecto));
          }}
          className={BOTON_PRIMARIO}
        >
          Comprobar
        </button>
        <button type="button" onClick={() => setPistas((p) => !p)} aria-expanded={pistas} className={BOTON_SECUNDARIO}>
          {pistas ? 'Ocultar pistas' : 'Ver pistas'}
        </button>
      </div>

      {pistas && (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">
          {espacios.map((e, i) => (
            <li key={e.id}>
              Espacio {i + 1}: {e.pista}
            </li>
          ))}
        </ul>
      )}

      {comprobado && (
        <div className={`mt-3 rounded-lg p-3 text-sm ${correctos === espacios.length ? CAJA_BIEN : CAJA_AVISO}`} role="status">
          <p className="font-semibold">
            {correctos === espacios.length ? '¡Comando completo! ' : ''}
            {correctos} de {espacios.length} espacios correctos.
          </p>
          <ul className="mt-2 space-y-1">
            {espacios.map((e, i) => (
              <li key={e.id}>
                {esCorrecto(e) ? '✓' : '✗'} Espacio {i + 1} ({e.respuestasAceptadas[0]}): {e.explicacion}
              </li>
            ))}
          </ul>
          {correctos === espacios.length && <p className="mt-2">{actividad.retroalimentacionFinal}</p>}
        </div>
      )}
    </div>
  );
}
