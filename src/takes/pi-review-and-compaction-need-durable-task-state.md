---
id: pi-review-and-compaction-need-durable-task-state
title: Keep durable task state across Pi review and compaction
date: '2026-10-18'
summary: File-backed tasks and isolated review contexts offer repeatable checkpoints when model context is limited.
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
  - ronacher_pi_workflow_quote
  - pi_compaction_reference_quote
---

Keep the task contract outside the conversation when experimenting with Pi review and compaction. This makes it possible to inspect what survives a context change.

Armin Ronacher describes branching into review and bringing findings back into implementation.[[cite:ronacher_pi_workflow_quote]] His [published extension package](https://github.com/mitsuhiko/agent-stuff) includes file-backed todos and review commands. This is a practitioner workflow with available implementation, not a controlled claim of improved local-model accuracy.

Pi documents compaction and branch summarization as separate mechanisms.[[cite:pi_compaction_reference_quote]] For reproduction, I would use a task record containing the goal, acceptance commands, prohibited changes, current patch revision, unresolved failures, and next action. Update it only after checking the relevant evidence. A completed checkbox should refer to a passing check or an explicit human decision.

Use three checkpoints. First, ask the implementation session to produce a bounded patch. Second, open a separate review context with the original task contract and the exact diff, and request findings with locations and reproduction steps. Third, return validated findings to implementation and rerun acceptance. Record false positives and missed seeded defects, not just whether the reviewer wrote a convincing response.

For the compaction condition, deliberately reach a task boundary, summarize, and ask the resumed session to identify the remaining requirements before editing. Compare its answer with the external task record. Reject a configuration that silently loses a prohibition or turns a known failing check into completed work.

Session branching should not be treated as a filesystem rollback. For this experiment, use separate disposable checkouts when comparing patches, and record the revision each reviewer saw. A fresh conversation also does not make a reviewer independent of the model’s own blind spots; retained executable checks remain the acceptance authority.
