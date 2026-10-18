---
id: local-model-trials-need-deployment-provenance
title: 'A local model trial is evidence about a deployment, not just a model'
date: '2026-10-18'
summary: 'Practitioner reports become useful when model version, quantization, runtime, harness, and task are preserved together.'
primary_domain: architecture
secondary_domains: [agentic]
perspective: technologist
classification_rationale: 'The take concerns reproducible deployment evidence, with agent harnesses as an essential part of the configuration.'
categories: [architecture, engineering-judgment]
topics: [local-inference, model-evaluation]
tags: [self-hosted-models, local-model-field-research, reproducibility]
citations:
  - willison_gemma4_local_notes_quote
  - ornith15_35b_model_card_quote
---

Treat a local model trial as evidence about a specific deployment. Preserve the checkpoint, quantization, runtime, harness, and task before deciding what the result says about the underlying model.

Simon Willison’s April 2 Gemma 4 notes identify the local delivery path.[[cite:willison_gemma4_local_notes_quote]] He reported repetitive output from the 31B GGUF in LM Studio while an API run produced a usable result. This is a dated first-hand observation, not proof of a current model-wide defect or an identified root cause.

His [June Ornith trial](https://simonwillison.net/2026/Jun/29/ornith/) is another useful lead: a 35B Q4_K_M build, LM Studio, Pi, and a linked Datasette navigation session. It concerns Ornith 1.0. The later Ornith 1.5 card reports repeated evaluations and describes template and harness adjustments.[[cite:ornith15_35b_model_card_quote]] Those details justify testing the newer checkpoint; they do not make the two reports directly comparable.

My recommendation is to keep a deployment record beside each result: artifact identifier and revision, quantization, runtime version, parser, context limit, hardware, task, and retained trace. On a failed run, vary one component at a time. On a successful run, repeat the task before promoting the setup into a daily workflow.

This is also how to read enthusiastic demonstrations fairly. They can reveal a promising configuration or a useful task. A repeatable acceptance set must establish how often that configuration succeeds, what it costs, and where supervision remains necessary. Use the [30–36B survey](/articles/self-hosted-models-30-36b-landscape/) as the shortlist, not as a substitute for that record.
