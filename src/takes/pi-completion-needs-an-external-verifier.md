---
id: pi-completion-needs-an-external-verifier
title: Let an external verifier decide when a Pi run succeeds
date: '2026-10-18'
summary: Pi lifecycle events can drive bounded evaluation, but neither acknowledgement nor settlement establishes task correctness.
primary_domain: agentic
secondary_domains:
  - architecture
perspective: technologist
classification_rationale: The take turns agent harness behavior into an evaluable workflow, with context and execution boundaries as architectural concerns.
categories:
  - engineering-judgment
  - governance-guardrails
topics:
  - harness-design
  - agent-evaluation
  - local-inference
tags:
  - self-hosted-models
  - pi-repeatable-mechanics
citations:
  - pi_rpc_lifecycle_quote
  - pi_extension_contracts_quote
---

Let an external verifier decide whether a Pi task succeeded. The agent’s final message should be evidence to inspect, not the acceptance rule.

Pi’s RPC documentation distinguishes prompt acknowledgement from completed model work.[[cite:pi_rpc_lifecycle_quote]] For a started run, a controller should consume events through settlement; low-level run termination can precede automatic recovery or continuation. A handled prompt that starts no run needs a different completion path. Even settlement only describes execution state, not correctness.

A proposed repeatable controller would create a disposable checkout, send the task, retain events and the final diff, enforce a deadline, and run a separately maintained acceptance suite. Record provider errors, aborts, check failures, and timeouts as distinct outcomes. Keep the evaluator outside the agent’s writable workspace so repairing the application cannot accidentally rewrite the definition of success.

Pi extensions offer tool interception, durable state, and a boundary for final continuation. That makes a bounded repair loop plausible: return a specific failed check, permit a limited repair attempt, and then stop or escalate. The limit and test selection should come from the controller. An unconditional continuation rule is not a completion strategy.

Interception also has a boundary.[[cite:pi_extension_contracts_quote]] A protected-path hook should not be described as operating-system isolation. Test alternate write routes and use a separately configured execution boundary when the experiment requires restricting filesystem or network access.

Before comparing harness variants, verify the [documented local backend](https://pi.dev/docs/latest/llama-cpp) can perform a tool call and consume its result. Pin Pi, extension revisions, model file, quantization, chat template, server build, context allocation, and sampling settings. Repeat the same tasks with a minimal baseline and one intervention; compare accepted completions, elapsed time, peak memory, prompt and output tokens, and human repair effort.
