# rstest-bdd Website Agent Guidance

## Scope

This repository holds the static marketing site for rstest-bdd v0.6.0. The site
source is `index.html` and `assets/` at the repository root;
`scripts/build-site.mjs` copies them into `dist/` for deployment.

## Source of Truth

- `index.html` and `assets/` are the source of truth for content,
  structure, imagery, and CSS.
- `dist/` is generated output; never edit it by hand.
- Raw image generations live in `image_out/` (gitignored); serve
  optimized WebP/JPEG copies from `assets/img/`.

## Makefile Targets

Use the `Makefile` as the primary entry point for repository checks.

- `make dev`
  - Runs `caddy file-server --browse --listen :2016`.
  - Do not invoke it unless the user explicitly requests starting the
    preview server; the normal workflow is for the user to run Caddy.
- `make check-fmt`
  - Verifies whitespace, trailing-newline, and related formatting
    hygiene for the checked-in site files.
- `make lint`
  - Verifies site links and fragments across the HTML source, and runs
    `node --check` against the build and check scripts.
- `make test`
  - Runs `npm run build` to regenerate `dist/`, then a smoke test over
    the generated output.

For commit gating, run `git diff --check`, `make check-fmt`, `make lint`, and
`make test`.

## Deployment

`.github/workflows/publish-pages.yml` builds `dist/` and deploys it to GitHub
Pages on every push to `main`. The production URL is
<https://leynos.github.io/rstest-bdd-www/>; the `og:url` and `og:image`
metadata in `index.html` reference it absolutely.

## Preview Workflow

- The user starts a `caddy file-server` on port `2016` when a live
  preview is needed; point Playwright or agent-browser at that server.

## Design Conventions

- Direction: "allotment modernism" – palette tokens live at the top of
  `assets/style.css`; every colour pair must hold WCAG 2.2 AA contrast.
- Copy follows the df12-copy voice skill (en-GB-oxendict).
- Illustrations star Marrow, a needle-felted crab, generated with the
  gpt-image-2 MCP using the existing images as identity references.
