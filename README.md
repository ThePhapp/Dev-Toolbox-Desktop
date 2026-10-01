# Dev Toolbox Desktop

A fast, private collection of everyday developer utilities. Dev Toolbox runs locally, keeps your data on your device, and is designed for Windows, macOS, and Linux.

## Included tools

- JSON formatter, validator, and minifier
- Base64 and URL encoders/decoders
- JWT decoder
- UUID and SHA hash generators
- Timestamp converter and regex tester
- Line-based text diff and case converter
- QR code generator

The app also includes command-palette search, favorites, recent tools, persistent themes, and clipboard actions.

## Development

Requirements: Node.js 20+ and, for the desktop build, the [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/) including Rust.

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run format:check
npm run lint
npm test
npm run build
```

Run the desktop shell after installing Rust and platform prerequisites:

```bash
npm run tauri dev
```

## Privacy

All transformations happen locally. Dev Toolbox does not upload tool input or output.

## License

[MIT](LICENSE)
