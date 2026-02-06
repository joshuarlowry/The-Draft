# Article Quality Guide (for humans and agents)

This guide defines what counts as a **good** versus **bad** article in The Draft, especially when updating existing pieces after source expansion.

## Why this guide exists

A recurring failure mode is that an article starts narrating the editorial process ("we broadened beyond X") instead of delivering a durable, reader-first argument. This guide helps prevent that drift.

## Good article criteria

A good article in this repo should:

1. **Lead with durable claims, not revision history**
   - Focus on what remains true over time.
   - Keep process notes (what changed in this draft) out of the article body.

2. **Synthesize across a broad source mix**
   - Combine strategy-level, method-level, and practice-level sources where possible.
   - Avoid over-weighting one publisher unless the scope explicitly requires it.

3. **Stay evidence-backed through reusable blocks**
   - Use argument blocks with explicit citations rather than ad hoc article prose.
   - Ensure factual claims are anchored to quotes/sources already cataloged in `_data`.

4. **Triangulate major claims with more than one source voice**
   - For substantive argument blocks, prefer 2+ supporting sources when available.
   - Avoid blocks that merely restate one source's wording without added synthesis.

5. **Keep framing concise and non-defensive**
   - Intro/outro should orient the reader and synthesize implications.
   - Avoid awkward language that apologizes for prior drafts or calls out internal process.

6. **Preserve separation of concerns**
   - Source cataloging happens first (`sources.yml`, `source_summaries.yml`).
   - Articles then assemble validated blocks and reading context.

## Bad article signals

Treat an article as needing revision if you see any of the following:

- **Meta-editorial narration in reader copy**
  - Example pattern: "The earlier draft was too focused on..."
- **Novel claims in intro/outro without supporting blocks/citations**
- **Single-source perspective presented as broad consensus**
- **Single-quote blocks that paraphrase one source without triangulation**
- **Time-window framing ('recent signals') that weakens evergreen value** unless recency is the core thesis
- **Repeated prose where a reusable block should be used**

## Pre-merge checklist for article edits

Use this checklist before committing article changes:

- [ ] Title and summary describe the substantive thesis, not the editing process
- [ ] Intro/outro contain synthesis only, not uncited factual expansion
- [ ] Block order supports a clear argument arc (strategy -> measures -> methods -> structure)
- [ ] Major argument blocks use multiple supporting sources when available
- [ ] Sources reflect reasonable diversity for the claim scope
- [ ] Citations and reading references resolve to canonical source IDs
- [ ] `npm run lint` passes
- [ ] `npm run build` passes

## Notes for future agent prompts

When asked to "broaden sources," interpret that as:

- expand evidence diversity,
- improve synthesis quality,
- and keep article language timeless and reader-facing.

Do **not** interpret it as a request to narrate the correction inside the article itself.
