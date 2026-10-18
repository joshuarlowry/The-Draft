---
id: local-agents-need-deliberate-context-compaction
title: 'Local agents need a policy for when and how to compress context'
date: '2026-10-18'
summary: 'SelfCompact offers an inference-time rubric, while CompactionRL reports training gains on GLM-4.7-Flash. They address different intervention points.'
primary_domain: agentic
secondary_domains: [architecture, ia]
perspective: technologist
classification_rationale: 'The take concerns agent continuity. Memory limits and the organization of retained evidence connect it to architecture and information architecture.'
categories: [planning-and-structure, engineering-judgment]
topics: [context-management, harness-design]
tags: [self-hosted-models, local-model-harnesses, context-compaction]
citations:
  - selfcompact_agent_scaffold_quote
  - compactionrl_glm47_flash_quote
---

Give a long-running local agent an explicit compaction policy: when to compress its history, what evidence to retain, and how to resume. The useful distinction is between changing the runtime scaffold and training a model to work across compressed histories.

SelfCompact implements the first approach, with GLM-4.7-Flash serving examples. Its controller checks whether a work unit is complete, the state is summarizable, progress has occurred, and the agent is not stuck. It then replaces the history with a resumable summary.[[cite:selfcompact_agent_scaffold_quote]] The associated [paper](https://arxiv.org/abs/2606.23525v2) studies this tool-plus-rubric approach without fine-tuning. Its aggregate results are not a guarantee for every model or workload.

CompactionRL addresses training.[[cite:compactionrl_glm47_flash_quote]] In the October 1 revision, the authors report GLM-4.7-Flash reaching 56.0% on SWE-bench Verified and 20.2% on Terminal-Bench 2.0, gains of 5.5 and 6.7 percentage points against their baseline. These are paper-reported results for a trained system. They do not follow automatically from adding a summarization prompt to stock GLM-4.7-Flash, and should not be compared directly with unrelated model-card scores.

For a deployment trial, I would preserve the goal, constraints, completed steps, changed files, unresolved failures, source references, and next action in each checkpoint. Keep the original trace separately so the summary can be audited. Validate that resumption actually recovers the pending work; do not count a shorter prompt as success by itself.

Use a fixed-policy baseline before adding adaptive decisions. The SelfCompact repository includes no-compaction and periodic-compaction alternatives and records tokens and traces. Its web tools and default judge involve external services, so reproduce it as an explicitly mixed system or substitute those dependencies before calling the experiment fully offline.
