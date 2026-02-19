# The Draft content guide

This repository uses structured content in `src/` with shared data in `src/_data`. Use the following conventions when adding or editing content.

## Data file structure (per-entry files)
Data for sources, source summaries, people, and citations is stored as **one YAML file per entry** inside dedicated directories. This prevents merge conflicts when multiple agents work in parallel.

- `src/_data/sources/{id}.yml` — one file per source, named by its `id` field
- `src/_data/source_summaries/{source_id}.yml` — one file per summary, named by its `source_id` field
- `src/_data/people/{id}.yml` — one file per person, named by its `id` field
- `src/_data/citations/{id}.yml` — one file per citation, named by its `id` field

**Important:** Always create a **new file** for a new entry. Never append to a shared YAML file. Each file contains a single YAML object (not a list). JS aggregator files (`sources.js`, `source_summaries.js`, `people.js`, `citations.js`) in `src/_data/` automatically combine the individual files into arrays at build time — do not edit the JS files.

## Research workflow
- Start by cataloging sources and summaries in `src/_data/sources/` and `src/_data/source_summaries/` (and any related notes) whenever research is performed or sources are added manually.
- Not all sources need to end up in a block or article; cataloging first is expected.
- When answering questions, search existing sources first, then perform new internet searches to find new or updated information as needed. Those findings trigger quotation blocks and/or articles.
- When adding a source, extract authors and any notable people mentioned so we can create people profiles that connect back to the source and related articles. Plan ahead for future profile photos on those people pages.

## Content guidance
- Keep blocks and articles claim-driven and evidence-backed; every factual claim should be supported by citations where possible.
- Preserve quoted source text verbatim; do not paraphrase inside quotes.
- Favor reusable blocks over repeated prose; articles should assemble blocks by ID instead of duplicating content.
- Keep intros/outros concise and focused on framing and synthesis rather than new claims.

## Before committing
**Always run lint and build** before committing changes:
- `npm run lint` — Prettier checks (CI will fail if this fails)
- `npm run build` — Eleventy build

## Sources (canonical reference records)
- **Location:** `src/_data/sources/{id}.yml` (one file per source)
- **Purpose:** Canonical source metadata used by both citations and reading bundles.
- **Required fields:** `id`, `title`, `url`
- **Optional fields:** `author`, `publisher`, `journal`, `repository`, `published`, `accessed`
- **ID format:** lowercase snake-case, scoped to the source (e.g., `google_cloud_best_practices`).
- **Filename:** must match the `id` field (e.g., `google_cloud_best_practices.yml`).

## Source summaries
- **Location:** `src/_data/source_summaries/{source_id}.yml` (one file per summary)
- **Purpose:** Structured summaries with key insights, relevance context, and notable quotes for each source.
- **Required fields:** `source_id`, `summary`, `long_summary`, `source_type`, `key_takeaways`, `relevance`
- **Optional fields:** `tags`, `topics`, `categories`, `notable_quotes`
- **Filename:** must match the `source_id` field (e.g., `google_cloud_best_practices.yml`).
- **Notes:** `source_id` must match a valid `id` in `sources/`.

### Source summary fields

**`source_type`** (required): Categorizes the source format. Use one of:
- `article` — blog posts, online articles, guides
- `book` — published books
- `paper` — academic papers, research reports, whitepapers
- `video` — YouTube videos, recorded talks
- `podcast` — podcast episodes, audio content
- `social_post` — LinkedIn posts, X/Twitter threads
- `documentation` — technical docs, API references
- `profile` — GitHub profiles, LinkedIn profiles, author pages

**`key_takeaways`** (required): A list of 3–5 bullet points capturing the main insights. Guidelines:
- Start each takeaway with an action verb or concrete claim
- Focus on what the reader should remember or apply
- Avoid generic statements; be specific to the source
- Example:
  ```yaml
  key_takeaways:
    - Upfront task framing reduces downstream rework in AI-assisted coding
    - Explicit constraints help AI generate code that matches system intent
    - Review loops catch drift before it compounds into technical debt
  ```

**`relevance`** (required): 1–2 sentences explaining why this source matters for The Draft's themes (planning, oversight, guardrails, engineering judgment, rapid prototyping). Connect the source to the site's perspective on AI-assisted development.

**`notable_quotes`** (optional): A list of verbatim quotes worth extracting. These can seed citation entries in `src/_data/citations/`. Guidelines:
- Copy text exactly as it appears in the source
- Include enough context to stand alone
- Aim for 1–3 quotes per source (skip if none are compelling)
- Example:
  ```yaml
  notable_quotes:
    - 'The AI should be treated like a collaborator that needs context, examples, and clear acceptance criteria.'
    - 'Planning and oversight are not optional add-ons—they are the inputs that keep AI output aligned with real system goals.'
  ```

## Quotations (inline citations)
- **Location:** `src/_data/citations/{id}.yml` (one file per citation)
- **Purpose:** Store quoted text and link it to a canonical source.
- **Required fields:** `id`, `quote`, `source_id`
- **ID format:** lowercase snake-case ending in `_quote` (e.g., `google_cloud_best_practices_quote`).
- **Filename:** must match the `id` field (e.g., `google_cloud_best_practices_quote.yml`).
- **Notes:** `source_id` must point to a valid `id` in `sources/`.

## Citation mechanism (APA)
- **Inline citations:** Use `[[cite:your_quote_id]]` in content. The renderer outputs the quote plus an APA-style parenthetical reference, e.g., `(Author, 2024)` or `(Publisher, n.d.)`.
- **Citations section:** Blocks should define a `citations` list in front matter with the quote IDs they use. The template renders a **Citations** section that lists unique sources in APA reference style.
- **APA reference format:** `Author. (Year). Title. Container. URL`
  - **Author fallback:** If no author is available, the publisher or repository is used.
  - **Year fallback:** If `published` is missing, `n.d.` is used.
  - **Container:** Uses `journal`, then `publisher`, then `repository` if present.

## Reading bundles (extended reading lists)
- **Location:** `src/_data/reading_bundles.yml`
- **Purpose:** Curated reading lists shown on article pages.
- **Structure:** Bundles contain `groups`, each group contains `sources` with `id` and optional `description`.
- **Notes:** Each `id` in a bundle must match a source in `sources/`.

## Artifact metadata (domain classification)
Every content artifact (article, block, concept) MUST declare:
- `primary_domain`: one of `[architecture, ia, ux, agentic]`
- `secondary_domains`: array (0+)
- `perspective`: short descriptor (e.g., architect, ux practitioner, technologist, hybrid)
- `overlap_angle`: optional string explaining cross-domain relevance
- `classification_rationale`: 1–2 sentence explanation of placement

Artifacts exist once; all domain views are derived from metadata. Meta content (e.g. blocks about the site platform itself) may omit domain fields; such artifacts do not appear on domain pages.

## Articles
- **Location:** `src/articles/`
- **Purpose:** Long-form content pages.
- **Front matter:** Use `reading_bundle` to reference a bundle by id when needed. Include artifact metadata.

## Blocks
- **Location:** `src/blocks/`
- **Purpose:** Reusable argument blocks used within articles.
- **Citations:** Use `[[cite:your_quote_id]]` placeholders to embed quotes from `citations/`. Include artifact metadata.

## Concepts
- **Location:** `src/concepts/`
- **Purpose:** Definitions or conceptual reference pages. Include artifact metadata.

## Takes
- **Location:** `src/takes/`
- **Purpose:** Standalone, first-class insights and positions on key topics. Takes are discoverable content published individually at `/takes/{id}/`, included in the unified homepage "Recent" feed, searchable, and available via RSS feed.
- **Front matter:** Required fields are `id`, `title`, plus artifact metadata (`primary_domain`, `secondary_domains`, `perspective`, `classification_rationale`). Optional: `date`, `summary`, `categories`, `topics`, `tags`, `citations`.
- **Citations:** Use `[[cite:your_quote_id]]` placeholders to embed quotes. Include a `citations` list in front matter with all quoted citation IDs. The take layout automatically renders a **Citations** section at the bottom.
- **Date:** Defaults to `2026-01-01` via directory data file; individual takes should specify explicit dates for accurate RSS ordering.
- **Summary:** Optional field for blurb text shown in listings and feed descriptions. Degrades gracefully if omitted.
- **How takes differ from blocks:** Takes are published as independent pages and content type (not embedded within articles). They appear on domain pages as a dedicated "Takes" section, in search results, and in the takes RSS feed. Blocks are reusable content assembled into articles and do not generate standalone pages.
