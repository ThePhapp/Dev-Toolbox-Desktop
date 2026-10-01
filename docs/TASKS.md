# Task Tracker

| ID       | Title                  | Dependencies | Acceptance criteria                             | Tests       | Status                     |
| -------- | ---------------------- | ------------ | ----------------------------------------------- | ----------- | -------------------------- |
| DEV-001  | Project foundation     | —            | Strict TS, lint, format, build and test scripts | Full checks | Done                       |
| DEV-002  | App shell and registry | DEV-001      | Searchable registry, navigation, theme          | Build       | Done                       |
| TOOL-001 | JSON tools             | DEV-002      | Format, minify, validate, errors, Unicode       | Unit        | Done                       |
| TOOL-002 | Text codecs            | DEV-002      | Base64 and URL encode/decode                    | Unit        | Done                       |
| TOOL-003 | Token and ID tools     | DEV-002      | JWT decode and UUID generation                  | Unit        | Done                       |
| TOOL-004 | Hash generator         | DEV-002      | SHA family using Web Crypto                     | Unit        | Done                       |
| TOOL-005 | Timestamp converter    | DEV-002      | Unix/ISO/local conversion                       | Unit        | Done                       |
| TOOL-006 | Regex tester           | DEV-002      | Flags, matches and invalid-pattern errors       | Unit        | Done                       |
| TOOL-007 | Text diff              | DEV-002      | Line-oriented comparison                        | Unit        | Done                       |
| TOOL-008 | Case converter         | DEV-002      | Common developer casing conventions             | Unit        | Done                       |
| TOOL-009 | QR generator           | DEV-002      | Configurable downloadable QR image              | Build       | Done                       |
| DESK-001 | Desktop integration    | DEV-002      | Tauri shell and browser fallback                | Full checks | Blocked: Rust/MSVC missing |
| TOOL-010 | Advanced data tools    | TOOL-001     | YAML, CSV and SQL transformations               | Unit/build  | Done                       |
| TOOL-011 | Advanced utility tools | DEV-002      | Cron, Markdown and color utilities              | Unit/build  | Done                       |
| PIPE-001 | Tool pipeline          | TOOL-001/002 | Ordered reusable transformations                | Unit        | Done                       |
