# Implementation rules

Import from public package entry points only. Compose existing variants before adding CSS. Application CSS may arrange page-level layout, but visual decisions must come from LexUI tokens.

Use controlled state when the application owns the value and `defaultValue` for isolated examples. Keep server components by default in Next.js; add `"use client"` only at the smallest interactive boundary.

Every control needs an accessible name. Preserve logical DOM order across breakpoints. Do not rely on color alone for state. Provide empty, loading, error, disabled, and success states where the flow permits them.

Charts require `label`, a contextual `valueFormatter`, responsive width, keyboard-reachable data marks, and an interaction that exposes exact values. Tables require meaningful headings and an explicit empty state.
