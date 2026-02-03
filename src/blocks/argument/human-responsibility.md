---
id: human-responsibility
title: 'Plan mode keeps humans responsible for system design instead of reviewing it after the fact'
categories:
  - responsibility-oversight
topics:
  - design-review
  - accountability
  - human-in-the-loop
tags:
  - plan-mode
  - early-review
  - system-design
citations:
  - arxiv_human_centered_practices_quote
  - boehm_software_engineering_economics_quote
---

Good teams do not let junior developers redesign systems unreviewed. They ask for proposals, discuss tradeoffs, and align on scope before implementation begins.

AI deserves the same treatment.

Research on human–AI interaction consistently shows that outcomes degrade when problems and constraints are left implicit:

[[cite:arxiv_human_centered_practices_quote]]

Plan mode forces assumptions into the open before they are encoded in code. That visibility enables review. Without it, engineers are left evaluating architecture only after it exists—when change is harder and intent is harder to reconstruct.

This is not a new lesson. Software engineering has known for decades that earlier review is cheaper:

[[cite:boehm_software_engineering_economics_quote]]

AI accelerates implementation. That makes early design review more important, not less.
