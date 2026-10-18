---
id: pi-graph-engines-need-contract-comparisons
title: Compare Pi graph engines by their execution contracts
date: '2026-10-18'
summary: Pi graph projects differ in conversation reuse, gate defaults, recovery, and context boundaries.
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
  - pi_workflows_graph_engine_quote
  - pi_taskflow_dag_quote
---

Choose a Pi graph engine by its execution contract, then test that contract on the target model. The presence of nodes, edges, or a visual editor is too little information to choose a runtime.

The reviewed project documentation describes three candidates:

| Project                                                 | Documented approach                                                           | First question to test                                              |
| ------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [pi-workflows](https://github.com/osolmaz/pi-workflows) | TypeScript graph; interactive agent stages reuse the originating conversation | Does protected human input remain unavailable to model submissions? |
| [pi-graph](https://github.com/ali-abassi/pi-graph)      | External YAML runner with per-node evidence and gates                         | Can a missing or meaningless check reach completion?                |
| [pi-taskflow](https://github.com/gscode1/pi-taskflow)   | Dependency phases with isolated agent contexts and resumable results          | What happens to ambiguous verdicts and stale cached inputs?         |

Onur Solmaz’s pi-workflows defines explicit node outputs and routing.[[cite:pi_workflows_graph_engine_quote]] The pi-taskflow README also provides a consequential qualification about its model-based quality gate.[[cite:pi_taskflow_dag_quote]] It treats ambiguous output as PASS. That default needs changing or an independent blocking verifier before using it as a required acceptance boundary.

My proposed comparison starts with concurrency set to one. Use the same local model, task, repository snapshot, and acceptance suite across candidates. Only then test independent fan-out, recording peak memory and total time rather than assuming that additional branches improve throughput. Give parallel writers separate checkouts or serialize their edits.

Require every handoff to carry an artifact reference, revision, status, and unresolved questions. Try malformed structured output, missing files, contradictory reviews, and a dependency that changes after a cached result was produced. Treat a model-written PASS as a claim that needs supporting evidence.

These projects are research leads, not endorsed installations or measured winners. Their maintainer documentation was reviewed; their runtimes were not executed in this pass. Pin an exact revision before testing, especially where a gate default or cache key affects the outcome.
