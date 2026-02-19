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
- Keep takes and articles claim-driven and evidence-backed; every factual claim should be supported by citations where possible.
- Preserve quoted source text verbatim; do not paraphrase inside quotes.
- Use takes for standalone insights and positions. Consider whether new content should be a standalone take or an article that assembles and synthesizes multiple takes.
- Keep intros/outros concise and focused on framing and synthesis rather than new claims.

## What makes a strong take?
A take should:
1. **Lead with a clear claim** — The title and first sentence communicate the core insight immediately
2. **Be evidence-backed** — Support claims with at least 1–3 citations to authoritative sources
3. **Be specific, not generic** — Avoid obvious statements; provide actionable perspective
4. **Fit within a domain** — Clear primary domain (architecture, ia, ux, agentic) with optional secondary domains
5. **Be discoverable** — Include categories, topics, and tags that help readers find it in search and domain pages
6. **Stand alone** — Readable without needing to read other content
7. **Have a perspective** — Written from a clear viewpoint (technologist, architect, UX practitioner, etc.)

## Discoverability checklist
Before publishing a take, article, or concept, ensure:
- [ ] `id`, `title`, and all required metadata are present
- [ ] `primary_domain` and `secondary_domains` are set (if applicable)
- [ ] `perspective` clearly identifies the author's viewpoint
- [ ] `classification_rationale` explains domain placement (1–2 sentences)
- [ ] `date` is explicit (for takes and articles, ensures correct RSS ordering)
- [ ] `summary` is present (optional but recommended for takes and articles)
- [ ] All `categories`, `topics`, `tags` are populated for search and domain discoverability
- [ ] All factual claims are cited (for takes and concepts)
- [ ] Spelling, grammar, and punctuation are correct (`npm run lint`)
- [ ] The site builds without errors (`npm run build`)

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
- **Citations section:** Takes and concepts should define a `citations` list in front matter with all quote IDs they embed. The template automatically renders a **Citations** section at the bottom listing unique sources in APA reference style.
- **APA reference format:** `Author. (Year). Title. Container. URL`
  - **Author fallback:** If no author is available, the publisher or repository is used.
  - **Year fallback:** If `published` is missing, `n.d.` is used.
  - **Container:** Uses `journal`, then `publisher`, then `repository` if present.
- **When to use citations:**
  - **Takes:** Must include citations; every factual claim should be backed by a quote
  - **Articles:** Can synthesize without direct quotes but should link to takes that cite their claims
  - **Concepts:** Should cite foundational definitions or frameworks where applicable

## Reading bundles (extended reading lists)
- **Location:** `src/_data/reading_bundles.yml`
- **Purpose:** Curated reading lists shown on article pages.
- **Structure:** Bundles contain `groups`, each group contains `sources` with `id` and optional `description`.
- **Notes:** Each `id` in a bundle must match a source in `sources/`.

## Artifact metadata (domain classification)
Every content artifact (article, take, concept) MUST declare:
- `primary_domain`: one of `[architecture, ia, ux, agentic]`
- `secondary_domains`: array (0+)
- `perspective`: short descriptor (e.g., architect, ux practitioner, technologist, hybrid)
- `overlap_angle`: optional string explaining cross-domain relevance
- `classification_rationale`: 1–2 sentence explanation of placement

Artifacts exist once; all domain views are derived from metadata. Meta content (e.g. takes about the site platform itself) may omit domain fields; such artifacts do not appear on domain pages.

## Articles
- **Location:** `src/articles/`
- **Purpose:** Long-form synthesis pages that assemble takes and research into cohesive narratives.
- **Required front matter:** `id`, `title`, `date`, `primary_domain`, `secondary_domains`, `perspective`, `classification_rationale`
- **Optional front matter:** `summary` (1–2 sentence overview for listings), `intro`, `outro`, `blocks` (array of take IDs), `reading_bundle` (reference to a bundle ID for extended reading)
- **ID format:** lowercase kebab-case, descriptive (e.g., `agent-driven-development-needs-operating-discipline`)
- **Filename:** must match the `id` field
- **Structure guidelines:**
  - Start with a brief `intro` that frames the topic and thesis
  - Use `blocks` to reference 3–8 takes that support your argument
  - Synthesize across takes; don't duplicate their content
  - Conclude with an `outro` that ties threads together and suggests implications
  - Include a `summary` for search results and homepage listing
  - Total length: 500–2000 words (including block assembly, excluding intro/outro)
- **Best practices:**
  - Every factual claim must be citation-backed (via referenced takes or direct citations)
  - Favor linking to existing takes over writing new long-form content
  - Use takes to explore depth; use articles to build synthesis and connection across domains

## Blocks (deprecated — migrated to Takes)
- **Previous location:** `src/blocks/argument/`
- **Previous purpose:** Reusable argument blocks used within articles.
- **Migration note:** All argument blocks have been migrated to `src/takes/` and are now published as standalone, first-class content. See the **Takes** section below.
- **Future use:** The `src/blocks/` directory may be used for other types of reusable content if needed.

## Concepts
- **Location:** `src/concepts/`
- **Purpose:** Definitional or foundational reference pages explaining core terms, frameworks, or patterns used across The Draft.
- **Required front matter:** `id`, `title`, `primary_domain`, `secondary_domains`, `perspective`, `classification_rationale`
- **Optional front matter:** `date`, `summary`, `categories`, `topics`, `tags`, `citations`
- **ID format:** lowercase kebab-case, descriptive term (e.g., `specification-driven-development`)
- **Filename:** must match the `id` field
- **Structure guidelines:**
  - **Length:** 200–800 words (definition + context + examples)
  - **Define the concept:** Start by stating what the term means
  - **Explain relevance:** Why does this concept matter for The Draft's themes?
  - **Provide examples:** Ground the concept in concrete scenarios or applications
  - **Include citations:** Support with evidence where applicable
  - **Cross-link:** Reference related takes, articles, and concepts
- **Best practices:**
  - Use concepts to establish shared vocabulary across the site
  - Avoid duplication; a concept should be referenced (not redefined) in takes and articles
  - Keep definitions current; revisit as the site's understanding evolves
  - Include metadata for discoverability alongside takes and articles

## Takes
- **Location:** `src/takes/`
- **Purpose:** Standalone, first-class insights and positions on key topics. Takes are discoverable content published individually at `/takes/{id}/`, included in the unified homepage "Recent" feed, searchable, and available via RSS feed.
- **Required front matter:** `id`, `title`, `primary_domain`, `secondary_domains`, `perspective`, `classification_rationale`
- **Optional front matter:** `date` (explicit creation date for accurate RSS ordering), `summary` (1–2 sentence blurb for listings/feeds), `categories`, `topics`, `tags`, `citations` (array of quote IDs)
- **ID format:** lowercase kebab-case, descriptive claim (e.g., `ai-prototyping-weeks-to-days`)
- **Filename:** must match the `id` field
- **Structure guidelines:**
  - **Length:** 150–600 words (concise, claim-driven)
  - **Lead with the claim:** First sentence should state the core insight clearly
  - **Support with evidence:** Use 1–3 citations with `[[cite:quote_id]]` placeholders to back claims
  - **One main idea:** A take is not an article; focus on a single position or insight
  - **Include metadata:** Always populate `categories`, `topics`, and `tags` for discoverability
- **Citations:** Use `[[cite:your_quote_id]]` placeholders to embed quotes. Include a `citations` list in front matter with all quoted citation IDs. The take layout automatically renders a **Citations** section at the bottom with APA references.
- **Best practices:**
  - Every claim must be evidence-backed; a take without citations is assertion, not insight
  - Write from a clear perspective (technologist, architect, UX practitioner, hybrid)
  - Be specific and opinionated; avoid generic statements
  - Link domains intentionally; secondary_domains should have clear relevance
  - Add a `summary` so the take appears with context in RSS feeds and search results
  - Use `date` field to ensure accurate chronological ordering in feeds (populated automatically from git history on migration)
- **How takes differ from articles:** Takes are standalone, discoverable pages (not embedded within articles). They appear on domain pages in a dedicated "Takes" section, in search results, in the takes RSS feed at `/feeds/takes.xml`, and in the homepage "Recent" feed alongside articles. Articles synthesize and link multiple takes; takes present single, focused insights.
