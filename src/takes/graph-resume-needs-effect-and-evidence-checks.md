---
id: graph-resume-needs-effect-and-evidence-checks
title: Test graph recovery against effects and stale evidence
date: '2026-10-18'
summary: Checkpointing needs durable storage, replay-safe effects, and invalidation rules for evidence.
primary_domain: agentic
secondary_domains:
  - architecture
perspective: technologist
classification_rationale: The content examines how explicit workflow structure governs agent execution, state, and verification.
categories:
  - engineering-judgment
  - governance-guardrails
topics:
  - harness-design
  - agent-evaluation
  - workflow-orchestration
tags:
  - agent-workflow-graphs
  - self-hosted-models
citations:
  - langgraph_persistence_quote
  - langgraph_interrupts_quote
---

Test graph recovery by inspecting what repeats and what becomes stale. A successful resume command is not enough to establish that the recovered workflow is correct.

LangGraph distinguishes persisted thread state from cross-thread stores. Its in-memory checkpoint example has a specific restart limitation.[[cite:langgraph_persistence_quote]] Durable storage must therefore be part of a crash-recovery experiment.

Interrupts create another boundary: the interrupted node executes again on resume. The documentation explicitly calls out repeated side effects.[[cite:langgraph_interrupts_quote]] Moving an effect after a human pause avoids that particular pre-pause replay; it does not establish exactly-once delivery across every possible crash window.

For a Pi-backed graph, I would retain a run ID, frozen workflow version, task and artifact hashes, node input identity, attempts, and effect receipts. Before reusing an output, compare the dependencies that made it valid. If implementation changes the patch, invalidate tests and review for the old revision. If the workflow changes, require an explicit migration or a new run rather than assuming old state means the same thing.

A useful fault-injection sequence is concrete. Kill the controller after a file is written but before completion is recorded. Resume twice. Change an input file between attempts. Return malformed approval data. Fail a test after an earlier attempt passed. Confirm that the workflow neither duplicates an effect nor reuses a passing result for a different artifact.

For effects that cannot be repeated safely, require reconciliation against an external receipt or a deliberate operator decision. For local file operations, use a disposable checkout and inspect the resulting diff. Keep delivery outside the experiment.

Measure duplicate effects, stale evidence reuse, lost work, and human recovery time alongside task acceptance. These are proposed checks; this research has not established that any of the reviewed Pi graph projects passes them. They extend the [external verification approach](/takes/pi-completion-needs-an-external-verifier/) into recovery behavior.
