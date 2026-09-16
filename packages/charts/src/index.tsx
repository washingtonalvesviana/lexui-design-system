"use client"

import * as React from "react"

export type ChartTone = "categorical" | "positive" | "negative" | "warning" | "neutral"
export interface ChartDatum { label: string; value: number }
export interface BaseChartProps { data: ChartDatum[]; label: string; tone?: ChartTone; valueFormatter?: (value: number) => string }

export const CHART_SERIES_COUNT = 10
const chartColor = (tone: ChartTone, index = 0) => tone === "categorical" ? `var(--lex-chart-${(index % CHART_SERIES_COUNT) + 1})` : `var(--lex-chart-${tone})`
const pointsFor = (data: ChartDatum[], width: number, height: number, padX: number, padY: number) => {
  const values = data.map((item) => item.value)
  const max = Math.max(...values, 1)
  const min = Math.min(...values, 0)
  const range = Math.max(max - min, 1)
  return data.map((item, index) => ({ ...item, x: padX + (index * (width - padX * 2)) / Math.max(data.length - 1, 1), y: padY + ((max - item.value) / range) * (height - padY * 2) }))
}

export function BarChart({ data, label, tone = "categorical", valueFormatter = String }: BaseChartProps) {
  const max = Math.max(...data.map((item) => item.value), 1)
  return <figure className="lex-chart" aria-label={label}>
    <div className="lex-chart__plot" role="img" aria-label={label}>{data.map((item, index) => <div className="lex-chart__column" key={item.label} tabIndex={0} aria-label={`${item.label}: ${valueFormatter(item.value)}`}>
      <span className="lex-chart__value">{valueFormatter(item.value)}</span>
      <span className="lex-chart__bar" data-tone={tone} data-series={(index % CHART_SERIES_COUNT) + 1} style={{ height: `${Math.max((item.value / max) * 100, 4)}%` }} />
      <span className="lex-chart__label">{item.label}</span>
      <ChartTooltip label={item.label} value={valueFormatter(item.value)} />
    </div>)}</div>
    <ChartCaption label={label} data={data} valueFormatter={valueFormatter} />
  </figure>
}

export function HorizontalBarChart({ data, label, tone = "categorical", valueFormatter = String }: BaseChartProps) {
  const max = Math.max(...data.map((item) => item.value), 1)
  return <figure className="lex-hbar-chart" aria-label={label}>
    <div className="lex-hbar-chart__plot" role="img" aria-label={label}>{data.map((item, index) => <div className="lex-hbar-chart__row" key={item.label} tabIndex={0} aria-label={`${item.label}: ${valueFormatter(item.value)}`}>
      <span className="lex-hbar-chart__label">{item.label}</span><span className="lex-hbar-chart__track"><span className="lex-hbar-chart__bar" style={{ width: `${Math.max((item.value / max) * 100, 3)}%`, background: chartColor(tone, index) }} /></span><strong>{valueFormatter(item.value)}</strong>
      <ChartTooltip label={item.label} value={valueFormatter(item.value)} />
    </div>)}</div>
    <ChartCaption label={label} data={data} valueFormatter={valueFormatter} />
  </figure>
}

export function LineChart(props: BaseChartProps) { return <CartesianChart {...props} variant="line" /> }
export function AreaChart(props: BaseChartProps) { return <CartesianChart {...props} variant="area" /> }

function CartesianChart({ data, label, tone = "categorical", valueFormatter = String, variant }: BaseChartProps & { variant: "line" | "area" }) {
  const width = 640, height = 260, padX = 42, padY = 28
  const [active, setActive] = React.useState<number | null>(null)
  const points = pointsFor(data, width, height, padX, padY)
  const pointString = points.map((point) => `${point.x},${point.y}`).join(" ")
  const areaString = `${padX},${height - padY} ${pointString} ${width - padX},${height - padY}`
  const color = chartColor(tone)
  const selected = active === null ? null : points[active]
  return <figure className="lex-cartesian-chart" aria-label={label}>
    <div className="lex-cartesian-chart__viewport">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet" role="group" aria-label={label}>
        <g className="lex-cartesian-chart__grid">{[0, 1, 2, 3, 4].map((line) => <line key={line} x1={padX} x2={width - padX} y1={padY + line * ((height - padY * 2) / 4)} y2={padY + line * ((height - padY * 2) / 4)} />)}</g>
        {selected && <line className="lex-cartesian-chart__crosshair" x1={selected.x} x2={selected.x} y1={padY} y2={height - padY} />}
        {variant === "area" && <polygon className="lex-cartesian-chart__area" points={areaString} style={{ fill: color }} />}
        <polyline className="lex-cartesian-chart__line" points={pointString} style={{ stroke: color }} />
        {points.map((point, index) => <circle className="lex-cartesian-chart__point" data-active={active === index || undefined} key={point.label} cx={point.x} cy={point.y} r={active === index ? 7 : 5} style={{ fill: color }} tabIndex={0} aria-label={`${point.label}: ${valueFormatter(point.value)}`} onPointerEnter={() => setActive(index)} onPointerLeave={() => setActive(null)} onFocus={() => setActive(index)} onBlur={() => setActive(null)} onClick={() => setActive((current) => current === index ? null : index)} />)}
      </svg>
      {selected && <ChartTooltip label={selected.label} value={valueFormatter(selected.value)} floating style={{ left: `clamp(4rem, ${(selected.x / width) * 100}%, calc(100% - 4rem))`, top: `clamp(3rem, ${(selected.y / height) * 100}%, calc(100% - 2rem))` }} />}
      <div className="lex-cartesian-chart__labels">{data.map((item) => <span key={item.label}>{item.label}</span>)}</div>
    </div>
    <ChartCaption label={label} data={data} valueFormatter={valueFormatter} />
  </figure>
}

export function PieChart(props: BaseChartProps) { return <RadialChart {...props} innerRadius={0} /> }
export function DonutChart(props: BaseChartProps & { centerLabel?: string; centerValue?: string }) { return <RadialChart {...props} innerRadius={54} /> }

function RadialChart({ data, label, valueFormatter = String, innerRadius, centerLabel, centerValue }: BaseChartProps & { innerRadius: number; centerLabel?: string; centerValue?: string }) {
  const [active, setActive] = React.useState<number | null>(null)
  const total = Math.max(data.reduce((sum, item) => sum + Math.max(item.value, 0), 0), 1)
  let cursor = -Math.PI / 2
  const slices = data.map((item, index) => {
    const start = cursor
    const end = cursor + (Math.max(item.value, 0) / total) * Math.PI * 2
    cursor = end
    const tooltip = polar(120, 120, innerRadius ? 73 : 58, start + (end - start) / 2)
    return { ...item, index, path: arcPath(120, 120, 92, innerRadius, start, end), tooltip }
  })
  const selected = active === null ? null : slices[active]
  return <figure className="lex-radial-chart" aria-label={label}>
    <div className="lex-radial-chart__visual" data-active={active !== null || undefined}>
      <svg viewBox="0 0 240 240" role="group" aria-label={label}>{slices.map((slice, index) => <path key={slice.label} d={slice.path} fill={chartColor("categorical", slice.index)} fillRule="evenodd" data-active={active === index || undefined} tabIndex={0} aria-label={`${slice.label}: ${valueFormatter(slice.value)}`} onPointerEnter={() => setActive(index)} onPointerLeave={() => setActive(null)} onFocus={() => setActive(index)} onBlur={() => setActive(null)} onClick={() => setActive((current) => current === index ? null : index)} />)}{innerRadius > 0 && <g className="lex-radial-chart__center"><text x="120" y="116">{centerValue ?? valueFormatter(total)}</text><text x="120" y="138" data-label="true">{centerLabel ?? "Total"}</text></g>}</svg>
      {selected && <ChartTooltip label={selected.label} value={valueFormatter(selected.value)} floating style={{ left: `${(selected.tooltip.x / 240) * 100}%`, top: `${(selected.tooltip.y / 240) * 100}%` }} />}
    </div>
    <ul className="lex-chart-legend">{data.map((item, index) => <li key={item.label} data-active={active === index || undefined} onPointerEnter={() => setActive(index)} onPointerLeave={() => setActive(null)}><span style={{ background: chartColor("categorical", index) }} /><span>{item.label}</span><strong>{valueFormatter(item.value)}</strong></li>)}</ul>
    <ChartCaption label={label} data={data} valueFormatter={valueFormatter} />
  </figure>
}

export function Sparkline({ data, label, tone = "positive", valueFormatter = String }: BaseChartProps) {
  const [active, setActive] = React.useState<number | null>(null)
  const points = pointsFor(data, 180, 56, 3, 5)
  const pointString = points.map((point) => `${point.x},${point.y}`).join(" ")
  const selected = active === null ? null : points[active]
  return <figure className="lex-sparkline" aria-label={label}>
    <svg viewBox="0 0 180 56" preserveAspectRatio="none" role="group" aria-label={label}><polyline points={pointString} style={{ stroke: chartColor(tone) }} />{points.map((point, index) => <circle key={point.label} cx={point.x} cy={point.y} r={active === index ? 4 : 2.5} style={{ fill: chartColor(tone) }} tabIndex={0} aria-label={`${point.label}: ${valueFormatter(point.value)}`} onPointerEnter={() => setActive(index)} onPointerLeave={() => setActive(null)} onFocus={() => setActive(index)} onBlur={() => setActive(null)} />)}</svg>
    {selected && <ChartTooltip label={selected.label} value={valueFormatter(selected.value)} floating style={{ left: `${(selected.x / 180) * 100}%`, top: `${(selected.y / 56) * 100}%` }} />}
    <span className="lex-visually-hidden">{label}. {data.map((item) => `${item.label}: ${valueFormatter(item.value)}`).join(", ")}.</span>
  </figure>
}

function ChartTooltip({ label, value, floating, style }: { label: string; value: string; floating?: boolean; style?: React.CSSProperties }) { return <span className="lex-chart-tooltip" data-floating={floating || undefined} role="tooltip" aria-hidden="true" style={style}><span>{label}</span><strong>{value}</strong></span> }
function ChartCaption({ label, data, valueFormatter }: { label: string; data: ChartDatum[]; valueFormatter: (value: number) => string }) { return <figcaption className="lex-visually-hidden">{label}. {data.map((item) => `${item.label}: ${valueFormatter(item.value)}`).join(", ")}.</figcaption> }
function polar(cx: number, cy: number, radius: number, angle: number) { return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) } }
function arcPath(cx: number, cy: number, radius: number, innerRadius: number, start: number, end: number) { const span = Math.min(end - start, Math.PI * 2 - 0.0001); const adjustedEnd = start + span; const outerStart = polar(cx, cy, radius, start), outerEnd = polar(cx, cy, radius, adjustedEnd); const large = span > Math.PI ? 1 : 0; if (!innerRadius) return `M ${cx} ${cy} L ${outerStart.x} ${outerStart.y} A ${radius} ${radius} 0 ${large} 1 ${outerEnd.x} ${outerEnd.y} Z`; const innerEnd = polar(cx, cy, innerRadius, adjustedEnd), innerStart = polar(cx, cy, innerRadius, start); return `M ${outerStart.x} ${outerStart.y} A ${radius} ${radius} 0 ${large} 1 ${outerEnd.x} ${outerEnd.y} L ${innerEnd.x} ${innerEnd.y} A ${innerRadius} ${innerRadius} 0 ${large} 0 ${innerStart.x} ${innerStart.y} Z` }
