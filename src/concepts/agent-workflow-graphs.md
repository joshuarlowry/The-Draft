---
layout: layouts/concept.njk
id: agent-workflow-graphs
title: Agent workflow graphs
date: '2026-10-18'
summary: Workflow graphs describe execution dependencies and transitions; reasoning and knowledge graphs organize different things.
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
  - graph_of_thoughts_paper_quote
---

An agent workflow graph represents work as nodes and permitted execution relationships as directed edges. A node can run ordinary code, invoke a model, or operate an agent. LangGraph makes this distinction explicit.[[cite:langgraph_graph_api_quote]]

A loop is compatible with a graph: an edge can return to an earlier stage. A directed acyclic graph, or DAG, excludes cycles in the represented dependency structure. An outer DAG can still contain a node whose implementation performs a bounded repair loop. Always ask which layer a diagram represents.

| Graph meaning           | What it organizes                            | Example question                          |
| ----------------------- | -------------------------------------------- | ----------------------------------------- |
| Workflow or state graph | Execution and state transitions              | Which check must pass before review?      |
| Task dependency DAG     | Prerequisites between work items             | Which analyses can begin after discovery? |
| Reasoning graph         | Generated candidates and their relationships | Which partial answers should be combined? |
| Knowledge graph         | Entities and relationships in evidence       | Which sources connect two organizations?  |

The Graph of Thoughts paper uses vertices for generated information.[[cite:graph_of_thoughts_paper_quote]] [Microsoft GraphRAG](https://microsoft.github.io/graphrag/) instead extracts corpus relationships and community summaries to support retrieval. Neither label alone establishes an execution controller.

For The Draft’s local-model research, the useful starting question is which decisions should belong to the runtime. I would make required checks, retry limits, and completion transitions explicit while allowing a model to choose implementation details inside a bounded stage. A graph is worth adding when those boundaries need inspection or recovery.

Use the [Pi graph comparison](/takes/pi-graph-engines-need-contract-comparisons/) to select an experiment. Treat a rendered graph as a description to verify against run evidence: drawing a test node does not establish that its test is meaningful or that every route actually reaches it.
