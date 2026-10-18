---
id: harness-overhead-needs-an-acceptance-baseline
title: 'Judge harness overhead against an independent acceptance baseline'
date: '2026-10-18'
summary: 'A recent controlled experiment supports measuring harness value per model and task, while keeping development feedback separate from final acceptance.'
primary_domain: agentic
secondary_domains: [architecture]
perspective: technologist
classification_rationale: 'The take concerns evaluating agent workflows, with runtime cost and verification boundaries as architectural considerations.'
categories: [engineering-judgment, governance-guardrails]
topics: [agent-evaluation, harness-design]
tags: [self-hosted-models, local-model-field-research, acceptance-testing]
citations:
  - jain_harness_cost_experiment_quote
---

Judge a harness by the accepted outcomes it adds relative to its overhead. The comparison needs an independent acceptance baseline, not just the checks the agent sees while building.

Naresh Jain’s October experiment compared one API-service task with and without a behavioral harness. GPT-6 Luna passed 3 of 10 unharnessed runs and 10 of 10 harnessed runs; GPT-6 Sol passed all ten in both conditions, with extra harness overhead.[[cite:jain_harness_cost_experiment_quote]] The study kept the final 178-check evaluation separate from development feedback. These are hosted-model results from one task, not evidence of the same gains on Qwen, Gemma, or Ornith.

For a local replication, I would hold the task, model artifact, hardware, and acceptance suite fixed. Compare a minimal working configuration against one targeted harness addition. Preserve a separate evaluator’s expectations, so the implementation agent cannot quietly weaken the definition of success. Repeat each condition and record failures as carefully as successes.

Measure accepted completions, total runtime, generated tokens, and operator repair time. Include setup and maintenance effort when deciding whether to keep a custom harness. A smaller model may become useful with stronger feedback, but a larger pile of controls is not itself evidence of improvement.

This is a refinement of the [configuration evaluation procedure](/takes/local-agent-model-upgrades-need-harness-evaluations/): test the proposed control as an intervention. Keep it when the measured benefit matters for the actual workload, and revisit it when changing either the model or the task.
