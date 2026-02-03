# The Draft content guide

This repository uses structured content in `src/` with shared data in `src/_data`. Use the following conventions when adding or editing content.

## Before committing
**Always run lint and build** before committing changes:
- `npm run lint` — Prettier checks (CI will fail if this fails)
- `npm run build` — Eleventy build

## Sources (canonical reference records)
- **Location:** `src/_data/sources.yml`
- **Purpose:** Canonical source metadata used by both citations and reading bundles.
- **Required fields:** `id`, `title`, `url`
- **Optional fields:** `author`, `publisher`, `journal`, `repository`, `published`, `accessed`
- **ID format:** lowercase snake-case, scoped to the source (e.g., `google_cloud_best_practices`).

## Quotations (inline citations)
- **Location:** `src/_data/citations.yml`
- **Purpose:** Store quoted text and link it to a canonical source.
- **Required fields:** `id`, `quote`, `source_id`
- **ID format:** lowercase snake-case ending in `_quote` (e.g., `google_cloud_best_practices_quote`).
- **Notes:** `source_id` must point to a valid `id` in `sources.yml`.

## Reading bundles (extended reading lists)
- **Location:** `src/_data/reading_bundles.yml`
- **Purpose:** Curated reading lists shown on article pages.
- **Structure:** Bundles contain `groups`, each group contains `sources` with `id` and optional `description`.
- **Notes:** Each `id` in a bundle must match a source in `sources.yml`.

## Articles
- **Location:** `src/articles/`
- **Purpose:** Long-form content pages.
- **Front matter:** Use `reading_bundle` to reference a bundle by id when needed.

## Blocks
- **Location:** `src/blocks/`
- **Purpose:** Reusable argument blocks used within articles.
- **Citations:** Use `[[cite:your_quote_id]]` placeholders to embed quotes from `citations.yml`.

## Concepts
- **Location:** `src/concepts/`
- **Purpose:** Definitions or conceptual reference pages.
