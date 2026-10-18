---
layout: layouts/article.njk
id: self-hosted-models-30-36b-landscape
title: 'Self-hosted models around 30–36B: an October 2026 research update'
date: '2026-10-18'
summary: 'A practical shortlist covering Qwen, Gemma, GLM, Nemotron, Olmo, and Occamy, with memory planning, harness methods, context control, and verification workflows.'
primary_domain: architecture
secondary_domains: [agentic]
perspective: architect
classification_rationale: 'The article synthesizes model selection and inference capacity planning, with agent evaluation as the secondary concern.'
categories: [architecture, engineering-judgment]
topics: [model-selection, local-inference, agent-evaluation]
tags: [self-hosted-models, open-weights, quantization]
intro: |
  <p>This research snapshot asks what deserves evaluation when returning to self-hosted models around 30–36 billion total parameters. It covers official model cards, release history, harness documentation, and research papers reviewed on October 18, 2026; it is a curated survey, not an exhaustive release registry or a local benchmark.</p>
  <p>The recommendation is to choose a workload first, establish the actual memory budget, and compare complete agent configurations. The shortlist includes one explicitly marked 27B neighbor because hardware budgets do not necessarily follow parameter-count boundaries.</p>
blocks:
  - self-hosted-30b-models-need-workload-specific-shortlists
  - active-parameters-do-not-size-local-model-memory
  - local-model-harnesses-must-preserve-tool-state
  - local-agents-need-deliberate-context-compaction
  - local-agent-control-needs-boundaries-and-feedback
  - local-agent-model-upgrades-need-harness-evaluations
reading_tags:
  - self-hosted-models
  - local-model-harnesses
reading_intro: 'Model cards, runtime documentation, implemented harness workflows, and context-compaction studies. Performance claims are provider- or paper-reported; no local throughput or quality measurements were conducted for this update. Undated sources are living documentation, and their access date is not a release date.'
outro: |
  <p>For practitioner trials, author perspectives, and a harness-cost counterpoint, continue with <a href="/articles/local-model-field-notes-and-harness-evidence/">Beyond model cards: field notes and evidence for local agent work</a>.</p>
  <p>Start with a small comparison that reflects the work you actually want to delegate. Keep the configuration and evaluation artifacts so the next checkpoint can be judged against accepted work, memory use, and time spent supervising.</p>
---
