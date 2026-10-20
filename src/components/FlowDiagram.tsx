import { ReactFlow, Background, Controls, ReactFlowProvider, Position, type Edge, type Node } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import type { CasoUso } from '../lib/casos-uso';
import { useTema } from '../lib/tema';

interface Props {
  flujo: CasoUso['flujo'];
  altura?: number;
}

const COLOR_POR_TIPO: Record<string, string> = {
  trigger: '#0891b2',
  ia: '#7c3aed',
  condicion: '#d97706',
  accion: '#16a34a',
};

export default function FlowDiagram({ flujo, altura = 340 }: Props) {
  const tema = useTema();
  const nodos: Node[] = flujo.nodos.map((n) => ({
    id: n.id,
    position: n.posicion,
    // Los flujos se leen de izquierda a derecha, como en el editor de n8n.
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: { label: `${n.etiqueta}\n(${n.nodoN8nReal})` },
    style: {
      borderColor: COLOR_POR_TIPO[n.tipo] ?? '#64748b',
      borderWidth: 2,
      borderRadius: 8,
      padding: 10,
      fontSize: 13,
      width: 220,
      whiteSpace: 'pre-line',
      textAlign: 'center',
    },
  }));

  const conexiones: Edge[] = flujo.conexiones.map((c) => ({
    id: c.id,
    source: c.origen,
    target: c.destino,
    label: c.etiqueta,
    animated: true,
  }));

  return (
    <div style={{ height: altura }} className="w-full rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodos}
          edges={conexiones}
          fitView
          nodesDraggable={false}
          nodesConnectable={false}
          edgesFocusable={false}
          colorMode={tema === 'oscuro' ? 'dark' : 'light'}
        >
          <Background />
          <Controls showInteractive={false} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
