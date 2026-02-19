---
id: ai-usefulness-depends-on-maintenance-work
title: 'AI usefulness should be judged against maintenance-heavy developer work'
primary_domain: agentic
secondary_domains:
  - architecture
perspective: technologist
overlap_angle: 'Most engineering effort is spent sustaining systems, so AI value depends on reducing maintenance and operational drag—not just accelerating greenfield coding.'
classification_rationale: 'Primary domain is agentic because it evaluates where AI tools create practical delivery value. Architecture is secondary because maintenance and operations are system-level concerns tied to reliability and change management.'
categories:
  - engineering-judgment
  - ai-production-scale
topics:
  - developer-productivity
  - maintenance-vs-greenfield
  - ai-value-assessment
tags:
  - survey-signals
  - maintenance-reality
  - operational-workload
citations:
  - sonarsource_maintain_test_secure_more_than_new_code_quote
  - sonarsource_less_than_one_third_new_or_improving_code_quote
  - infoworld_idc_more_time_operational_than_coding_quote
  - infoworld_idc_application_development_16_percent_quote
---

If you want to estimate the real usefulness of AI for software teams, start with the work developers actually do most of the time, not the idealized greenfield scenario.

SonarSource’s survey framing is direct: developers report spending more time maintaining, testing, and securing existing code than writing or improving code.[[cite:sonarsource_maintain_test_secure_more_than_new_code_quote]] The same dataset says respondents spend less than one-third of time on new-or-improving code work.[[cite:sonarsource_less_than_one_third_new_or_improving_code_quote]]

IDC data reported by InfoWorld points in the same direction. Developers spend more time on operational and background tasks than coding, with application development at 16% of time in 2024.[[cite:infoworld_idc_more_time_operational_than_coding_quote]][[cite:infoworld_idc_application_development_16_percent_quote]]

This suggests a practical evaluation rule: AI outcomes should be measured by whether they reduce maintenance burden, operational toil, and reliability risk in existing systems—not just by how quickly they scaffold a brand-new prototype.
