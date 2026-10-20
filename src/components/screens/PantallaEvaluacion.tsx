import { useState } from 'react';
import type { EvaluacionFinal, PreguntaEvaluacion } from '../../lib/evaluacion';
import { scorm } from '../../lib/scorm';
import { PANTALLAS, indicePantalla } from '../../lib/pantallas';
import { useRegistroActividades } from '../../lib/registro-actividades';

// Pantallas con actividad formativa: son las que cuentan para el criterio del REA.
const PANTALLAS_CON_ACTIVIDAD = [
  'modulo-1-introduccion',
  'modulo-2-que-es-n8n',
  'modulo-instalacion',
  'modulo-3-atencion-cliente',
  'modulo-4-marketing',
  'modulo-5-contabilidad',
  'modulo-6-inventario',
  'modulo-7-rrhh',
  'modulo-8-evidencia',
];

type Respuesta = number | boolean | null;

function esCorrecta(pregunta: PreguntaEvaluacion, respuesta: Respuesta): boolean {
  if (pregunta.tipo === 'seleccion-multiple') {
    return typeof respuesta === 'number' && pregunta.opciones[respuesta]?.correcta === true;
  }
  return typeof respuesta === 'boolean' && respuesta === pregunta.esVerdadero;
}

export default function PantallaEvaluacion({ evaluacion, onIrAPantalla }: { evaluacion: EvaluacionFinal; onIrAPantalla: (indice: number) => void }) {
  const { resultados } = useRegistroActividades();
  const actividadesBien = PANTALLAS_CON_ACTIVIDAD.filter((id) => resultados[id]).length;
  const porcentajeActividades = Math.round((actividadesBien / PANTALLAS_CON_ACTIVIDAD.length) * 100);
  const pendientes = PANTALLAS_CON_ACTIVIDAD.filter((id) => resultados[id] === undefined);
  const [respuestas, setRespuestas] = useState<Record<string, Respuesta>>({});
  const [enviado, setEnviado] = useState(false);

  const todasRespondidas = evaluacion.preguntas.every((p) => respuestas[p.id] !== undefined && respuestas[p.id] !== null);

  function enviar() {
    const correctas = evaluacion.preguntas.filter((p) => esCorrecta(p, respuestas[p.id] ?? null)).length;
    scorm.establecerNotaFinal(correctas, evaluacion.preguntas.length, evaluacion.umbralAprobacionPorcentaje);
    setEnviado(true);
  }

  function reintentar() {
    setRespuestas({});
    setEnviado(false);
  }

  const correctasTotal = evaluacion.preguntas.filter((p) => esCorrecta(p, respuestas[p.id] ?? null)).length;
  const porcentaje = Math.round((correctasTotal / evaluacion.preguntas.length) * 100);
  const aprobo = porcentaje >= evaluacion.umbralAprobacionPorcentaje;

  return (
    <section className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{evaluacion.titulo}</h1>
      <p className="text-slate-700 dark:text-slate-300">{evaluacion.instrucciones}</p>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm dark:border-slate-700 dark:bg-slate-800">
        <p className="font-semibold text-slate-900 dark:text-slate-100">
          Actividades de los módulos: {actividadesBien} de {PANTALLAS_CON_ACTIVIDAD.length} resueltas correctamente ({porcentajeActividades}%)
        </p>
        <p className="mt-1 text-slate-600 dark:text-slate-300">
          El REA pide al menos el 80% en las actividades y en esta evaluación. Se cuenta tu primer intento de cada actividad.
        </p>
        {pendientes.length > 0 && (
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Te faltan:{' '}
            {pendientes.map((id, i) => (
              <span key={id}>
                {i > 0 && ', '}
                <button
                  type="button"
                  onClick={() => onIrAPantalla(indicePantalla(id))}
                  className="font-medium text-cyan-700 underline-offset-2 hover:underline dark:text-cyan-400"
                >
                  {PANTALLAS[indicePantalla(id)].titulo}
                </button>
              </span>
            ))}
          </p>
        )}
      </div>

      {enviado && (
        <div className={`rounded-lg p-4 ${aprobo ? 'bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100' : 'bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100'}`} role="status">
          <p className="text-lg font-semibold">
            {aprobo ? '¡Aprobaste!' : 'Aún no aprobaste'}: {correctasTotal}/{evaluacion.preguntas.length} correctas ({porcentaje}%)
          </p>
          <p className="text-sm">Necesitabas al menos {evaluacion.umbralAprobacionPorcentaje}% para aprobar.</p>
        </div>
      )}

      <ol className="space-y-6">
        {evaluacion.preguntas.map((pregunta, indice) => (
          <li key={pregunta.id} className="rounded-lg border border-slate-200 p-4 dark:border-slate-700">
            <p className="mb-3 font-medium text-slate-800 dark:text-slate-200">
              {indice + 1}. {pregunta.tipo === 'seleccion-multiple' ? pregunta.pregunta : pregunta.enunciado}
            </p>

            {pregunta.tipo === 'seleccion-multiple' ? (
              <div className="space-y-2" role="radiogroup">
                {pregunta.opciones.map((opcion, iOpcion) => (
                  <label key={iOpcion} className="flex cursor-pointer items-start gap-2 rounded border border-slate-200 p-2 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
                    <input
                      type="radio"
                      name={pregunta.id}
                      disabled={enviado}
                      checked={respuestas[pregunta.id] === iOpcion}
                      onChange={() => setRespuestas((r) => ({ ...r, [pregunta.id]: iOpcion }))}
                    />
                    <span>{opcion.texto}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="flex gap-3">
                <button
                  type="button"
                  disabled={enviado}
                  onClick={() => setRespuestas((r) => ({ ...r, [pregunta.id]: true }))}
                  className={`rounded border px-4 py-2 text-sm font-medium ${respuestas[pregunta.id] === true ? 'border-slate-800 bg-slate-800 text-white dark:border-slate-200 dark:bg-slate-200 dark:text-slate-900' : 'border-slate-300 dark:border-slate-600 dark:text-slate-200'}`}
                >
                  Verdadero
                </button>
                <button
                  type="button"
                  disabled={enviado}
                  onClick={() => setRespuestas((r) => ({ ...r, [pregunta.id]: false }))}
                  className={`rounded border px-4 py-2 text-sm font-medium ${respuestas[pregunta.id] === false ? 'border-slate-800 bg-slate-800 text-white dark:border-slate-200 dark:bg-slate-200 dark:text-slate-900' : 'border-slate-300 dark:border-slate-600 dark:text-slate-200'}`}
                >
                  Falso
                </button>
              </div>
            )}

            {enviado && (
              <p className={`mt-3 rounded p-3 text-sm ${esCorrecta(pregunta, respuestas[pregunta.id] ?? null) ? 'bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-100' : 'bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-100'}`}>
                {esCorrecta(pregunta, respuestas[pregunta.id] ?? null) ? 'Correcto. ' : 'Incorrecto. '}
                {pregunta.retroalimentacion}
                {!esCorrecta(pregunta, respuestas[pregunta.id] ?? null) && (
                  <button
                    type="button"
                    onClick={() => onIrAPantalla(indicePantalla(pregunta.repasoPantallaId))}
                    className="mt-2 block font-semibold underline underline-offset-2"
                  >
                    Repasar: {PANTALLAS[indicePantalla(pregunta.repasoPantallaId)].titulo} →
                  </button>
                )}
              </p>
            )}
          </li>
        ))}
      </ol>

      {!enviado ? (
        <button
          type="button"
          disabled={!todasRespondidas}
          onClick={enviar}
          className="rounded bg-slate-800 px-6 py-2.5 font-medium text-white disabled:opacity-30 dark:bg-slate-200 dark:text-slate-900"
        >
          Enviar evaluación
        </button>
      ) : (
        <button type="button" onClick={reintentar} className="rounded border border-slate-300 px-6 py-2.5 font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800">
          Reintentar
        </button>
      )}
    </section>
  );
}
