---
name: lexui
description: Build, review, or refactor React and Next.js interfaces that use the LexUI design system. Use whenever a project contains `.design-system-lex-ui`, imports `@lexui/react`, `@lexui/charts` or `@lexui/flow`, or the user asks for LexUI screens, components, dashboards, CRUD, forms, charts, chat, theming, accessibility, responsive UI, or design-system compliance.
---

# LexUI

Use LexUI as the single UI vocabulary for the project. Discover the installed configuration before writing interface code, reuse public components and patterns, and verify compliance before finishing.

## Required workflow

1. Locate the project root and read `.design-system-lex-ui/manifest.json` plus `.design-system-lex-ui/ai/instructions.md` completely.
2. Run `npx @lexui/cli info --json` and use its package, theme, framework, documentation, and installed-component data.
3. Search before creating: run `npx @lexui/cli search <need>` and inspect candidates with `npx @lexui/cli view <component>`.
4. Read only the relevant project references. Use `references/component-selection.md` for selection rules, `references/implementation.md` for code rules, and `references/verification.md` before handoff.
5. Prefer patterns already indexed in `.design-system-lex-ui/examples/index.json`. Preserve current project conventions and user changes.
6. Implement with public exports from `@lexui/react`, charts from `@lexui/charts`, flows and diagrams from `@lexui/flow`, tokens from `@lexui/tokens`, and icons from `lucide-react`.
7. Run `npx @lexui/cli check` and the project typecheck/tests. Resolve violations before completion.

## Non-negotiable rules

- Never recreate a primitive already present in LexUI.
- Never hardcode colors, spacing, radii, shadows, or z-index values in application code.
- Never import `@base-ui/react` outside the LexUI package.
- Keep light and dark themes, responsive layouts, keyboard navigation, visible focus, semantic labels, reduced motion, and touch targets intact.
- Use icon-only actions only when the icon is conventional and always provide `aria-label` or an accessible tooltip.
- Use `Avatar` for people, `DataTable` for operational lists, `Field` for form controls, `Dialog` or `Sheet` for focused contextual work, and `AlertDialog` for destructive confirmation.
- Treat graphs as interactive data views: provide accessible labels, value formatting, keyboard focus, and hover/focus tooltips.
- If no component fits, record the gap and add the reusable abstraction to LexUI itself instead of hiding it in one application.

## Output expectations

State which LexUI primitives and patterns were reused. Mention any new reusable component and why it belonged in the design system. Report the results of `lexui check`, typecheck, tests, and relevant responsive/interaction checks.
