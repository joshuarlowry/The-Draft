---
id: local-agent-control-needs-boundaries-and-feedback
title: 'Control local agents with execution boundaries and feedback loops'
date: '2026-10-18'
summary: 'Planning modes, sandbox policies, and executable checks control different parts of an agent workflow and should be configured separately.'
primary_domain: agentic
secondary_domains: [architecture]
perspective: architect
classification_rationale: 'The take focuses on supervising agent actions. Execution confinement and verification infrastructure provide the architectural controls.'
categories: [governance-guardrails, engineering-judgment]
topics: [agent-control, sandboxing, verification]
tags: [self-hosted-models, local-model-harnesses, ai-harnesses]
citations:
  - qwen_code_approval_modes_quote
  - qwen_code_sandbox_controls_quote
  - aider_lint_test_feedback_quote
---

Control a local agent through explicit execution boundaries and observable feedback, then decide how much autonomy the task warrants. The controls below are implemented harness mechanisms; their existence is not a measured success-rate improvement for every 30–36B model.

Qwen Code distinguishes read-only planning, manual approval, automatic edits, classifier-mediated approval, and approval of all calls. Asking for a plan does not itself select the read-only mode.[[cite:qwen_code_approval_modes_quote]] Set the intended mode explicitly and inspect it, especially because the reviewed documentation gives inconsistent descriptions of defaults.

Approval is separate from confinement. Qwen Code’s sandbox documentation says permission decisions do not widen filesystem or network policy.[[cite:qwen_code_sandbox_controls_quote]] Its Linux guarantees depend on the backend: Landlock cannot enforce closed networking, and documented read visibility and inherited descriptors limit isolation. A “sandbox enabled” label therefore needs a checked policy behind it.

Verification provides another control loop. Aider can run lint and test commands after edits and attempt repairs when commands fail.[[cite:aider_lint_test_feedback_quote]] This supplies executable feedback rather than relying solely on the model’s account of whether its change worked.

My proposed workflow combines those mechanisms as follows:

| Stage   | Operator decision                                   | Evidence to retain                              |
| ------- | --------------------------------------------------- | ----------------------------------------------- |
| Frame   | Define scope, allowed paths, and acceptance checks  | Task contract and initial failing case          |
| Plan    | Explore under an explicit read-only policy          | Proposed files and steps                        |
| Execute | Grant only the tools and network access required    | Diff and tool trace                             |
| Verify  | Run the agreed checks after a bounded change        | Exit status, test output, and observed behavior |
| Recover | Stop after a preset retry, time, or token budget    | Failure summary and resumable checkpoint        |
| Accept  | Review the result against the original requirements | Accepted diff and remaining limitations         |

The retry and acceptance policy here is an editorial recommendation, not a claimed default of these tools. For example, stop after two unsuccessful repair attempts and ask for diagnosis before granting another attempt. Keep the original acceptance criteria fixed so an agent cannot redefine success by weakening the checks. Connect this operating discipline to [harness permission design](/takes/harness-safety-is-permission-design/) and the [configuration evaluation procedure](/takes/local-agent-model-upgrades-need-harness-evaluations/).
