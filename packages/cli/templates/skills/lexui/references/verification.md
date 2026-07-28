# Verification checklist

Before handoff:

1. Run `npx @lexui/cli check` and `npx @lexui/cli doctor`.
2. Run typecheck and relevant tests/build.
3. Inspect the changed flow in light and dark themes.
4. Inspect at mobile, tablet, and desktop widths.
5. Use keyboard only through every interactive control and verify focus is visible.
6. Exercise hover, click, open/close, validation, loading, empty, and destructive states that apply.
7. Check that long text, large chart labels, tables, dialogs, and chat messages wrap or scroll inside their containers without expanding the page unexpectedly.
