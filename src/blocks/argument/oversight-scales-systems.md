---
id: oversight-scales-systems
title: 'Oversight scales when it is designed into the system'
categories:
  - ai-production-scale
  - governance-guardrails
topics:
  - scale
  - accountability
  - process-design
tags:
  - scaling-oversight
  - verification
  - system-design
citations:
  - microsoft_ai_code_quote
  - dora_ai_amplifier_quote
---

The industry is already generating more AI-written code than any engineer can read line by line. Microsoft CEO Satya Nadella noted that as much as 30% of Microsoft’s code is now written by AI.[[cite:microsoft_ai_code_quote]] That reality does not erase accountability, but it does force a shift in how accountability is enforced.

The 2025 DORA State of AI-Assisted Software Development report frames the shift clearly: “AI is an amplifier of existing organizational capabilities—not a shortcut to bypass them.”[[cite:dora_ai_amplifier_quote]] If output scales faster than review, oversight must move upstream into process design and downstream into verification.

In practice, that means the rule is no longer “read every line.” The rule becomes “design the system so that any line can be proven safe to ship.”
