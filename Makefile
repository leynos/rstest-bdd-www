NODE := node
NPM := npm
CADDY := caddy

# `make fmt` and `make check-fmt` call mdtablefix directly. `--git` selects the
# Markdown files Git tracks and `--include-untracked` adds the untracked files
# Git does not ignore, so a new document is formatted before it is staged.
# Both modes need mdtablefix 0.6.0 or later.
MDLINT ?= markdownlint-cli2
MDTABLEFIX ?= mdtablefix
MDTABLEFIX_SELECT = --git --include-untracked
MDTABLEFIX_RULES = --wrap --renumber --breaks --ellipsis --fences

.PHONY: dev check-fmt lint test fmt

dev:
	$(CADDY) file-server --browse --listen :2016

check-fmt:
	$(NODE) scripts/check-format.mjs
	$(MDTABLEFIX) --check $(MDTABLEFIX_SELECT) $(MDTABLEFIX_RULES)

lint:
	$(NODE) scripts/lint-site.mjs
	$(NODE) --check scripts/build-site.mjs
	$(NODE) --check scripts/check-format.mjs
	$(NODE) --check scripts/lint-site.mjs
	$(NODE) --check scripts/test-build.mjs

test:
	$(NPM) run build
	$(NODE) scripts/test-build.mjs

fmt: ## Format Markdown sources
	$(MDTABLEFIX) --in-place $(MDTABLEFIX_SELECT) $(MDTABLEFIX_RULES)
	$(MDLINT) --fix "**/*.md"
