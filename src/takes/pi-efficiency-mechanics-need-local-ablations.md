---
id: pi-efficiency-mechanics-need-local-ablations
title: Test Pi efficiency mechanics one at a time on local models
date: '2026-10-18'
summary: SoL-Pi supplies concrete mechanisms to reproduce, but hosted-model efficiency results do not establish local-model gains.
primary_domain: agentic
secondary_domains:
  - architecture
perspective: technologist
classification_rationale: The take turns agent harness behavior into an evaluable workflow, with context and execution boundaries as architectural concerns.
categories:
  - engineering-judgment
  - governance-guardrails
topics:
  - harness-design
  - agent-evaluation
  - local-inference
tags:
  - self-hosted-models
  - pi-repeatable-mechanics
citations:
  - sol_pi_extension_quote
  - sol_pi_paper_quote
---

Pi efficiency extensions should enter a local deployment as individually measured interventions. SoL-Pi supplies an implementation designed for that approach.[[cite:sol_pi_extension_quote]]

| Mechanic                    | Implemented behavior                                       | Proposed local test                                     |
| --------------------------- | ---------------------------------------------------------- | ------------------------------------------------------- |
| Action Fusion               | Pair an edit with a validation command                     | Compare separate versus combined edit/check requests    |
| ObservationPack             | Archive large results with exact paged recall              | Require recovery of an older diagnostic line            |
| Evidence-Preserving Reducer | Verify extracted log evidence; retain originals on failure | Include misleading, malformed, and incomplete summaries |
| Online Context Compact      | Reconsider compaction at completed plan steps              | Check unresolved requirements after each handoff        |

The paper explicitly excludes dependent actions from fusion.[[cite:sol_pi_paper_quote]] Its GPT-5.6 Sol EdgeBench full-stack result reduces token traffic by 49.0%, while mean score falls from 44.8 to 42.0. That tradeoff matters. The reported hosted-model setup does not establish benefits for self-hosted 30–36B checkpoints.

For a local experiment, I would start with fusion because its effect is easy to inspect: fewer requests should still produce the same patch and check result. Fix the validation command in the task configuration, retain its exit status, and prevent a failed edit from being reported as a successful edit/check pair. Keep dependent commands separate when their arguments require reading the previous result.

Then test output retention on tasks with long diagnostics. Record retrieval failures as well as token counts. Try the reducer last: an auxiliary model can add latency, memory pressure, or model-switching overhead on the same machine. A quote that matches an original log can still omit the decisive error; include acceptance cases that expose that omission.

These are proposed replication tests, not results obtained here. Keep a mechanism only if repeated trials preserve the chosen acceptance standard and improve a resource measure that matters locally.
