import type { PaginaCreditos } from '../../lib/creditos';

export default function PantallaCreditos({ pagina }: { pagina: PaginaCreditos }) {
  return (
    <section className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{pagina.titulo}</h1>

      <div>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Roles</h2>
        <table className="w-full border-collapse text-sm">
          <tbody>
            {pagina.roles.map((r, i) => (
              <tr key={i} className="border-b border-slate-200 dark:border-slate-700">
                <td className="py-2 pr-4 font-medium text-slate-700 dark:text-slate-200">{r.rol}</td>
                <td className="py-2 text-slate-600 dark:text-slate-400">{r.responsable}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Recursos visuales y de audio</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">{pagina.notaRecursos}</p>
        {pagina.recursos.length > 0 && (
          <ul className="mt-3 space-y-2">
            {pagina.recursos.map((r, i) => (
              <li key={i} className="rounded border border-slate-200 p-3 text-sm dark:border-slate-700 dark:text-slate-300">
                <strong>{r.titulo}</strong>, {r.autor} · {r.fuente} · {r.licencia}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
        <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Licencia</h2>
        <p className="text-slate-700 dark:text-slate-300">{pagina.licenciaTexto}</p>
        <a href={pagina.licenciaUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-700 underline dark:text-cyan-400">
          {pagina.licenciaUrl}
        </a>
      </div>
    </section>
  );
}
