---
id: agent-failures-should-improve-guides-and-sensors
title: 'Turn repeated agent failures into guidance and executable checks'
date: '2026-10-18'
summary: 'Hashimoto’s workflow account and Böckeler’s maintainability experiments suggest a disciplined way to improve the environment around an agent.'
primary_domain: agentic
secondary_domains: [architecture]
perspective: architect
classification_rationale: 'The take focuses on feedback-driven agent supervision. Repository tooling and maintainability checks connect the argument to architecture.'
categories: [engineering-judgment, governance-guardrails]
topics: [harness-design, maintainability]
tags: [self-hosted-models, local-model-field-research, feedback-loops]
citations:
  - hashimoto_ai_adoption_journey_quote
  - bockeler_maintainability_sensors_quote
---

Use repeated agent failures to improve the working environment, then test whether the change prevents recurrence. My recommendation is to add a specific guide or executable check for an observed problem, rather than accumulate instructions without evidence of their value.

Mitchell Hashimoto describes learning through reproducing his own work with agents, decomposing sessions, and adding instructions or tools after failures.[[cite:hashimoto_ai_adoption_journey_quote]] This is a practitioner’s experience with coding agents, not a controlled result for local 35B models. It nevertheless offers a concrete process to reproduce on a local deployment.

Birgitta Böckeler’s maintainability experiments add a useful distinction. She found deterministic checks particularly effective at smaller code scopes.[[cite:bockeler_maintainability_sensors_quote]] Cross-file coupling needed interpretation, and ensuring an unattended agent actually invoked her sensor CLI remained unfinished work. The existence of a check and its enforcement are separate concerns.

For a local coding workflow, I would classify each recurring failure before changing the harness. A wrong command suggests concise repository guidance. A prohibited dependency direction suggests a structural rule. Missing behavior suggests an acceptance test. A poor architectural tradeoff calls for review and a better problem statement; another formatting rule would not address it.

Keep the failing example, make the smallest relevant intervention, and rerun it alongside previously successful tasks. Track human corrections and elapsed time as well as pass rates. These proposed measurements help determine whether the intervention improves work or merely adds overhead. For the execution controls around this loop, see [local agent boundaries and feedback](/takes/local-agent-control-needs-boundaries-and-feedback/).
