---
name: morphora-codegen-local
description: >-
  Morphora local codegen hygiene: .codegen is never committed or pushed;
  re-copy from zero-apps-codegen-scaffold when missing. Use when cloning,
  setting up Morphora, running zero-codegen, or when .codegen is absent.
---

# Morphora — local `.codegen` only

## Hard rule

**Never commit or push `.codegen/`.** It is listed in `.gitignore` and must stay local.

## Setup when missing

```bash
rsync -a --exclude node_modules \
  /Users/nrahal/@code/zero-apps/zero-apps-codegen-scaffold/.codegen/ \
  .codegen/
pnpm codegen:paths
```

## Routine commands

```bash
pnpm lint:openapi && pnpm bundle:openapi
pnpm codegen:core          # Mode B — core only after YAML edits
# Mode A — new domain only:
PYTHONPATH=.codegen/codegen/src python3 -m zero_codegen.cli.main generate \
  --domain <name> --config .codegen/.zero-codegen-merged.json --skip-build
```

Package scope: `@morphora`.
