---
id: local-agent-model-upgrades-need-harness-evaluations
title: 'Evaluate local model upgrades as complete agent configurations'
date: '2026-10-18'
summary: 'Choose local agent models using reproducible task completion, parser compatibility, and recovery tests rather than disconnected leaderboard scores.'
primary_domain: agentic
secondary_domains: [architecture]
perspective: technologist
classification_rationale: 'The take concerns agent evaluation and supervision. Runtime configuration connects those results to deployment architecture.'
categories: [engineering-judgment, governance-guardrails]
topics: [agent-evaluation, model-selection]
tags: [self-hosted-models, ai-harnesses, tool-calling]
citations:
  - accio_occamy1_model_card_quote
  - zai_glm47_flash_model_card_quote
---

Evaluate a local model upgrade as a complete agent configuration: weights, quantization, runtime, chat template, tool parser, reasoning settings, and task environment.

The model cards give concrete reasons for this approach. [Qwen3.6's evaluation notes](https://huggingface.co/Qwen/Qwen3.6-35B-A3B) identify an internal coding scaffold and modifications to a public benchmark. [GLM-4.7-Flash](https://huggingface.co/zai-org/GLM-4.7-Flash) discloses interaction-prompt changes and recommends preserved thinking for particular agent tests. Its compact scale alone does not settle deployment behavior.[[cite:zai_glm47_flash_model_card_quote]]

Occamy's declared specialization is another reason to test the intended work.[[cite:accio_occamy1_model_card_quote]] I would compare it on interrupted sessions, recovery after failed tools, and accurate handoffs rather than assume a good short answer predicts a successful work session.

Use a small, repeatable acceptance set: fix a failing test, change a feature across files, extract structured data, and resume after a controlled tool failure. Define success before running the models. Repeat tasks to expose variance, and retain the prompts, outputs, tool traces, runtime version, and checkpoint revision.

Measure successful completion, invalid tool calls, human corrections, total elapsed time, generated tokens, and peak memory. Test reasoning settings explicitly; keep the task and tool permissions fixed. These are proposed measurements, not results obtained in this research pass.

For adoption, my threshold would be improved accepted work within the same resource and oversight budget. A higher vendor score is a reason to investigate an upgrade, not sufficient evidence to replace a working configuration. This connects directly to the site's broader argument about [harnesses as the application layer](/takes/ai-harnesses-are-becoming-the-application-layer/).
