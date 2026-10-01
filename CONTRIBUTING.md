# Contributing

Thanks for helping improve Dev Toolbox Desktop.

## Local setup

1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Start the web UI with `npm run dev`.
4. Install the Tauri platform prerequisites before running `npm run tauri dev`.

Before opening a pull request, run:

```bash
npm run format:check
npm run lint
npm test
npm run build
```

Keep tools independent under `src/tools/<tool-name>`, put reusable transformation logic outside React components, and register tools once in `src/tools/registry.ts`.

Use Conventional Commits and keep unrelated changes in separate commits.
