---
id: graphs-make-agent-checkpoints-enforceable
title: Use graphs to make required agent checkpoints explicit
date: '2026-10-18'
summary: A graph can contain repair loops while moving stage transitions and acceptance rules into runtime control.
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
  - langgraph_graph_api_quote
  - pi_graph_runtime_quote
---

Use a workflow graph when required checkpoints must survive changes in what the model decides to do next. The practical value is an explicit execution contract that can be inspected and tested.

LangGraph describes state, node functions, and routing edges, including cyclic execution.[[cite:langgraph_graph_api_quote]] Pi Graph documents a separate YAML runner with per-node gates and recorded evidence. Its recovery claims have an explicit scope.[[cite:pi_graph_runtime_quote]] These are implementation contracts, not proof that a local model completes more tasks.

For a first 30–36B experiment, I would declare this graph:

1. Freeze the task contract and repository revision.
2. Let Pi produce one bounded implementation patch.
3. Run acceptance checks outside the model’s control.
4. On failure, return diagnostic evidence to implementation, with at most two repair attempts.
5. On passing checks, review the exact patch and produce a final evidence bundle; unresolved findings stop delivery or enter the same capped repair path.

The repair edge creates a cycle. Every change made after testing must return through tests; every changed patch must invalidate its previous review. Exhausted attempts, missing evidence, cancellation, and provider failure need explicit terminal outcomes. Completion should require the check results and reviewed patch to refer to the same revision.

This proposed design keeps the normal Pi tool loop inside the implementation stage. It does not require a different model or a separate agent for every node. A runtime-owned check can simply be a command with captured status and output.

Compare it against the same task and model in the existing loop-based baseline. Measure skipped checks, false completion, accepted patches, elapsed time, and intervention effort. If both configurations reliably enforce the same contract, the graph must justify its additional setup and maintenance through clearer inspection or recovery.
