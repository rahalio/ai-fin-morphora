# Morphora

Dual-speed CIO operating system for FS shapeshifter roles. OpenAPI-first DDD monorepo based on the zero-apps codegen scaffold.

**Scope:** `@morphora/*`

## Specs

- [PRODUCT.md](./PRODUCT.md) — product brief & BRs
- [WEBAPP.md](./WEBAPP.md) — IA, screens, design system
- [USER_STORIES.md](./USER_STORIES.md) — role stories

## Quick start

```bash
# If .codegen is missing (gitignored), copy from the scaffold:
# rsync -a --exclude node_modules /path/to/zero-apps-codegen-scaffold/.codegen/ .codegen/

pnpm install
pnpm lint:openapi && pnpm bundle:openapi
pnpm codegen:paths
pnpm build
pnpm dev:api
# Health: curl http://127.0.0.1:4000/health
# Demo key: X-API-Key: morphora_demo_local_dev_key
```

## Codegen rules

1. **New domain** → full multi-layer generate once (Mode A).
2. **YAML edit on existing domain** → regenerate **core only**, handwrite below (Mode B).
3. **Never commit or push `.codegen/`** — local tool copy only.

See `.cursor/skills/` and `docs/CODEGEN.md`.
