---
layout: layouts/article.njk
id: local-model-field-notes-and-harness-evidence
title: 'Beyond model cards: field notes and evidence for local agent work'
date: '2026-10-18'
summary: 'A follow-up reading trail through Simon Willison, Mitchell Hashimoto, Birgitta Böckeler, Naresh Jain, and Sebastian Raschka, connecting local trials to harness evaluation.'
primary_domain: agentic
secondary_domains: [architecture]
perspective: technologist
classification_rationale: 'The article synthesizes evidence about agent workflows and their controls, grounded in local deployment and verification architecture.'
categories: [engineering-judgment, architecture]
topics: [harness-design, model-evaluation, local-inference]
tags: [self-hosted-models, local-model-field-research]
intro: |
  <p>This companion to the <a href="/articles/self-hosted-models-30-36b-landscape/">30–36B model survey</a> follows the first research pass into practitioner writing, implementation guides, and experiments. The aim is to understand what each kind of evidence can support.</p>
  <p>Read local trials as configuration-specific observations, workflow essays as methods to test, and controlled experiments within their stated scope. Architecture references and vendor guides remain valuable reading even when they do not establish a task-quality gain.</p>
blocks:
  - local-model-trials-need-deployment-provenance
  - agent-failures-should-improve-guides-and-sensors
  - harness-overhead-needs-an-acceptance-baseline
reading_tags:
  - local-model-field-research
reading_intro: 'The full second-pass catalog includes sources used above and additional architecture, training, and implementation references. Summaries distinguish first-hand trials, provider claims, historical background, and controlled experiments. No local model benchmarks were run for this article.'
outro: |
  <p>The <a href="/articles/repeatable-pi-mechanics-for-local-models/">Pi follow-up</a> turns this reading trail into concrete replication candidates and an evaluation procedure for local models.</p>
  <p>Choose one task and one deployment, preserve the evidence, and add controls in response to a specific failure. The useful follow-up question for every new article or release is what it lets us test more precisely.</p>
---
