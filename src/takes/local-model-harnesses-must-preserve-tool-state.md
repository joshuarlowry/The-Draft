---
id: local-model-harnesses-must-preserve-tool-state
title: 'Local model harnesses must preserve the tool protocol and work state'
date: '2026-10-18'
summary: 'Qwen-Agent and Occamy document concrete integration methods: deliberate parser ownership, structured tool exchanges, and retained execution context.'
primary_domain: agentic
secondary_domains: [architecture]
perspective: architect
classification_rationale: 'Agent orchestration is the main subject. Model-server interfaces and message contracts make architecture a necessary secondary domain.'
categories: [engineering-judgment, planning-and-structure]
topics: [harness-design, tool-calling]
tags: [self-hosted-models, local-model-harnesses, ai-harnesses]
citations:
  - qwen_agent_framework_quote
  - aider_architect_editor_method_quote
---

Treat the model’s tool protocol and retained work state as part of the deployment contract. A working chat endpoint should be the beginning of integration testing, not the acceptance criterion for a local agent.

Qwen-Agent documents local-server connections, tool registration, and structured history. Its recipes distinguish framework-side parsing from server-side parsing for different model paths; parallel calls are also explicitly supported.[[cite:qwen_agent_framework_quote]] The practical lesson I draw is to select one documented parser arrangement for the exact checkpoint, then test a complete tool-call/result/follow-up cycle before attempting repository work.

[Occamy’s model card](https://huggingface.co/Accio-Lab/occamy-1.0) names OpenClaw, Hermes Agent, and Accio Work as training and evaluation harnesses. It instructs operators to retain complete assistant messages, including reasoning content and tool calls, before appending tool results. That is a concrete integration requirement, not evidence that every compatible endpoint behaves identically.

Another implemented method is separating solution design from file editing. Aider’s architect/editor workflow makes that split explicit.[[cite:aider_architect_editor_method_quote]] Its original results concern older models; applying the pattern to this 30–36B shortlist is an experiment to run, not an established performance gain. A larger planner and local editor are one possible allocation, but using a hosted planner would make that workflow only partly self-hosted.

For an initial setup, I would keep one executor, a narrow tool set, and explicit acceptance criteria. Ask it to inspect the relevant files, propose a bounded change, edit, run checks, and report evidence. Add role separation only when traces reveal a repeated planning or edit-format failure. This is my operating recommendation: keep the orchestration simple enough that a failure can be attributed to the model, parser, tool, or task definition.
