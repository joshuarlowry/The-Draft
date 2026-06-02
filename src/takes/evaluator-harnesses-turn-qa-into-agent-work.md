---
id: evaluator-harnesses-turn-qa-into-agent-work
date: '2026-05-30'
title: 'Evaluator harnesses turn QA into agent work'
summary: 'The newest harness experiments separate generation from judgment, using evaluator agents and concrete criteria to catch product gaps that single-pass agents miss.'
primary_domain: agentic
secondary_domains:
  - ux
  - architecture
perspective: hybrid
overlap_angle: 'Evaluator loops combine agent orchestration with product-quality UX judgment and testable system contracts.'
classification_rationale: 'The take focuses on agent harness design. UX and architecture are secondary because the evaluator must inspect usable behavior and enforce system-level completion criteria.'
categories:
  - governance-guardrails
  - product-quality
topics:
  - evaluator-agents
  - quality-assurance
  - harness-design
tags:
  - planner-generator-evaluator
  - qa-agents
  - playtesting
citations:
  - anthropic_harness_three_agent_quote
---

Evaluator harnesses are turning QA from an after-the-fact human bottleneck into an explicit agent role inside the build loop.

Anthropic's recent harness work is the clearest example: the reported architecture separates planner, generator, and evaluator agents so the system can expand a vague product request, build against it, and then test the result through a distinct review persona.[[cite:anthropic_harness_three_agent_quote]] The important move is not merely “use another model to check the first model.” It is to make judgment concrete through criteria, sprint contracts, browser interaction, product-depth checks, and failure thresholds.

This matters because current agents are often plausible but incomplete. They can create interfaces that look finished while core interactions remain stubbed, shallow, or broken. An evaluator harness gives the generator something more useful than vague praise or a human's late-stage disappointment: specific bugs, violated criteria, and a next iteration target.

The pattern is especially relevant for UX-heavy and product-heavy work. Visual polish, interaction depth, and usability cannot always be reduced to unit tests, but they can be partially operationalized through rubrics, screenshots, Playwright flows, and adversarial review prompts. That is where harness design starts to look like product management and QA design, not just prompt engineering.
