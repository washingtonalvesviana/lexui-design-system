"use client"

import * as React from "react"
import {
  Background,
  BackgroundVariant,
  BaseEdge,
  Controls,
  Handle,
  MiniMap,
  Position,
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  getBezierPath,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react"
import type {
  Connection,
  Edge,
  EdgeProps,
  Node,
  NodeProps,
  NodeTypes,
  OnConnect,
  ReactFlowProps,
} from "@xyflow/react"
import { cx } from "./lib/cx.js"

export type FlowNodeTone = "default" | "primary" | "accent" | "success" | "warning" | "danger"
export type FlowNodeActivity = "idle" | "active"

export interface FlowNodeData extends Record<string, unknown> {
  title: string
  description?: string
  meta?: string
  tone?: FlowNodeTone
  /** `active` marca o nó que está executando ou recebendo atividade agora. */
  activity?: FlowNodeActivity
}

export type FlowProps = ReactFlowProps

export function Flow({ className, fitView = true, minZoom = 0.2, maxZoom = 2, ...props }: FlowProps) {
  return <ReactFlow
    className={cx("lex-flow", className)}
    fitView={fitView}
    minZoom={minZoom}
    maxZoom={maxZoom}
    nodesFocusable
    edgesFocusable
    {...props}
  />
}

export function FlowProvider(props: React.ComponentProps<typeof ReactFlowProvider>) {
  return <ReactFlowProvider {...props} />
}

export function FlowBackground({ variant = BackgroundVariant.Dots, gap = 20, size = 1, ...props }: React.ComponentProps<typeof Background>) {
  return <Background variant={variant} gap={gap} size={size} {...props} />
}

export function FlowControls({ showInteractive = false, ...props }: React.ComponentProps<typeof Controls>) {
  return <Controls showInteractive={showInteractive} {...props} />
}

export function FlowMiniMap({ pannable = true, zoomable = true, ariaLabel = "Mapa do fluxo", ...props }: React.ComponentProps<typeof MiniMap>) {
  return <MiniMap pannable={pannable} zoomable={zoomable} ariaLabel={ariaLabel} {...props} />
}

export function FlowNode({ data, selected }: NodeProps) {
  const { title, description, meta, tone = "default", activity = "idle" } = data as FlowNodeData
  return <article className="lex-flow-node" data-tone={tone} data-activity={activity} data-selected={selected || undefined}>
    <Handle type="target" position={Position.Left} className="lex-flow-node__handle" />
    <div className="lex-flow-node__body">
      <span className="lex-flow-node__header">
        <strong className="lex-flow-node__title">{title}</strong>
        {activity === "active" ? <><span className="lex-flow-node__pulse" aria-hidden="true" /><span className="lex-flow-node__activity">Em execução</span></> : null}
      </span>
      {description ? <span className="lex-flow-node__description">{description}</span> : null}
      {meta ? <span className="lex-flow-node__meta">{meta}</span> : null}
    </div>
    <Handle type="source" position={Position.Right} className="lex-flow-node__handle" />
  </article>
}

export const flowNodeTypes: NodeTypes = { lex: FlowNode }

export function FlowEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, markerEnd, style }: EdgeProps) {
  const [path] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition })
  return <BaseEdge id={id} path={path} markerEnd={markerEnd} style={style} />
}

export {
  BackgroundVariant,
  Handle,
  MarkerType,
  Position,
  addEdge,
  getBezierPath,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react"

export type { Connection, Edge, EdgeProps, Node, NodeProps, NodeTypes, OnConnect, ReactFlowProps }
