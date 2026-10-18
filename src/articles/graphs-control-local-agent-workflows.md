---
layout: layouts/article.njk
id: graphs-control-local-agent-workflows
title: Graphs make local agent workflows inspectable
date: '2026-10-18'
summary: How workflow graphs contain loops, what Pi graph projects actually promise, and which control and recovery mechanics to test on local models.
primary_domain: agentic
secondary_domains:
  - architecture
perspective: technologist
classification_rationale: The article synthesizes explicit agent control, dependency management, and durable runtime design.
categories:
  - engineering-judgment
  - governance-guardrails
topics:
  - harness-design
  - workflow-orchestration
  - agent-evaluation
tags:
  - agent-workflow-graphs
  - self-hosted-models
intro: <p>The <a href="/articles/repeatable-pi-mechanics-for-local-models/">Pi mechanics research</a> focused on improving loops. This follow-up examines how explicit graph structure can organize those loops around required checks, handoffs, and recovery. Start with the <a href="/concepts/agent-workflow-graphs/">graph vocabulary</a> to distinguish workflow control from reasoning graphs and knowledge graphs.</p>
blocks:
  - graphs-make-agent-checkpoints-enforceable
  - pi-graph-engines-need-contract-comparisons
  - graph-resume-needs-effect-and-evidence-checks
reading_tags:
  - agent-workflow-graphs
reading_intro: Official documentation, primary project descriptions, and foundational research, accessed October 18, 2026. Capabilities described by maintainers remain unverified here; no graph runtime or local-model benchmark was executed.
outro: <p>The next experiment should keep one model and one task set fixed, add explicit checks and bounded repair, then test interruption and invalidation. Keep the graph only if its measured outcomes or operational clarity justify the added machinery.</p>
---
