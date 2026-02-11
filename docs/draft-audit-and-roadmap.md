# The Draft Audit and Forward Plan

_Date: 2026-02-10_

## 1) Current-state audit

This audit reviews content structure, coverage, and operational readiness in the current repository.

### Content inventory (as of this audit)

- **88 sources** in `src/_data/sources.yml`
- **88 source summaries** in `src/_data/source_summaries.yml`
- **41 citations** in `src/_data/citations.yml`
- **28 argument blocks** in `src/blocks/argument/`
- **8 articles** in `src/articles/`
- **1 concept** in `src/concepts/`

### Structural integrity and schema health

The structured content model is in good shape at a baseline level:

- Every source has a corresponding source summary.
- Every source summary points to a valid source.
- Every citation points to a valid source.
- Article/block/concept artifacts include required classification metadata.
- No broken citation placeholders were found in blocks.

### Coverage and editorial quality findings

The strongest opportunities are now at the **content strategy and composition** layer rather than the data integrity layer.

1. **Evidence density is uneven across blocks**
   - 15 blocks currently rely on fewer than two citations.
   - This increases risk that a claim reads as single-source opinion rather than synthesis.

2. **Block library is not fully reused yet**
   - 3 blocks are currently unreferenced by any article.
   - This means we have reusable ideas that are not yet connected into published narrative arcs.

3. **Source-to-claim conversion gap**
   - 54 sources currently have no extracted quote in `citations.yml`.
   - The project has strong source cataloging depth, but much of that evidence is not yet activated in blocks.

4. **Domain balance is lopsided**
   - 7 of 8 articles are currently `agentic` as primary domain.
   - Only 1 article is currently `ux`; there are no architecture- or IA-primary articles.

5. **Concept layer is thin**
   - Only one concept page exists.
   - This limits cross-article consistency for key terms and weakens internal linking potential.

## 2) What is working well

- **Foundational data discipline is strong**: source and summary parity is excellent.
- **Classification metadata has been adopted consistently** across core artifact types.
- **Reusable block model is present and functioning**, which is exactly the right long-term architecture.
- **Editorial direction is coherent**: planning, oversight, and guardrails are already clear recurring themes.

## 3) Improvement plan (next 90 days)

## Phase 1 (Weeks 1–2): Tighten the evidence pipeline

**Goal:** close the gap between source inventory and citation-backed argumentation.

1. Prioritize the 54 uncited sources by relevance to existing article themes.
2. Extract 1–2 high-value verbatim quotes per priority source into `citations.yml`.
3. Upgrade low-citation blocks to reach a target of **2+ citations for substantive claims**.
4. Add/refresh `notable_quotes` in `source_summaries.yml` to accelerate future extraction.

**Success metric:**
- Reduce uncited sources by at least 50%.
- Reduce blocks with fewer than 2 citations by at least 50%.

## Phase 2 (Weeks 3–6): Improve composition and reuse

**Goal:** make articles stronger by reusing and recombining existing argument blocks.

1. Connect the 3 unreferenced blocks into appropriate articles or merge them into stronger replacements.
2. Reorder block sequences in existing articles to improve argumentative flow
   (e.g., framing -> evidence -> implications -> operations).
3. Standardize article intro/outro language so it synthesizes rather than introduces new uncited claims.

**Success metric:**
- Zero orphan blocks (unless intentionally staged as backlog).
- Each article has a documented claim arc and rationale for block order.

## Phase 3 (Weeks 7–10): Rebalance domain coverage

**Goal:** reduce overconcentration in the `agentic` domain and strengthen cross-domain perspective.

1. Ship at least:
   - 1 architecture-primary article,
   - 1 IA-primary article,
   - 1 additional UX-primary article.
2. Reuse existing blocks where possible; only create new blocks when a claim gap is identified.
3. Ensure each new article has clear `overlap_angle` language to connect domains.

**Success metric:**
- No single domain represents more than ~60% of article primary-domain mix.

## Phase 4 (Weeks 11–12): Strengthen conceptual backbone

**Goal:** create reusable conceptual anchors for recurring ideas.

1. Add concept pages for recurring terms (for example: guardrails, oversight loops, spec-driven development, rapid prototyping).
2. Link articles and blocks to concept pages where relevant.
3. Use concept pages to normalize terminology and reduce repeated definitional prose.

**Success metric:**
- At least 4–6 total concept pages.
- Visible increase in internal conceptual linking across content.

## 4) Ongoing operating model

To guide work going forward, use this lightweight cadence:

### Weekly

- Triage new sources -> summaries -> quotes (in that order).
- Pick one article to strengthen for evidence density.
- Track source-to-citation conversion and low-citation blocks.

### Bi-weekly

- Run a domain-balance check on article primary domains.
- Review orphan blocks and either connect, merge, or retire them.

### Monthly

- Run a quality pass against `docs/article-quality-guide.md`.
- Choose one strategic theme and ship one improved article assembly.

## 5) Editorial guardrails for future contributors

1. **Claims first, process second**: avoid narrating drafting history in reader-facing copy.
2. **Citations before expansion**: add evidence before broadening claims.
3. **Blocks before bespoke prose**: prefer reusable arguments over one-off paragraphs.
4. **Synthesis over summary**: each article should combine multiple source voices into one clear position.
5. **Domain intentionality**: each new article should intentionally improve domain balance or cross-domain coverage.

## 6) Suggested next actions (immediate)

1. Build a shortlist of the top 20 uncited sources that map directly to existing article claims.
2. Select the 8 highest-impact low-citation blocks and add one supporting quote each.
3. Draft one architecture-primary and one IA-primary article outline from existing blocks.
4. Create three new concept pages (guardrails, oversight loop, spec-driven development) as shared anchors.
