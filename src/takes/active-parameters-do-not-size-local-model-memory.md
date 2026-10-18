---
id: active-parameters-do-not-size-local-model-memory
title: 'Active parameters do not size a local model’s memory budget'
date: '2026-10-18'
summary: 'Budget total weights, runtime state, context, and concurrency before treating a 30–36B model as a hardware fit.'
primary_domain: architecture
secondary_domains: [agentic]
perspective: architect
classification_rationale: 'The core issue is inference capacity planning. Agentic sessions add context and concurrency requirements to that architecture.'
categories: [architecture, planning-and-structure]
topics: [local-inference, capacity-planning]
tags: [self-hosted-models, quantization, mixture-of-experts]
citations:
  - nvidia_nemotron3_nano_model_card_quote
  - llamacpp_local_inference_quote
---

Size a self-hosted model by its total resident weights and working state, not by its active-parameter suffix. NVIDIA's Nano card illustrates why: its active and total counts differ substantially.[[cite:nvidia_nemotron3_nano_model_card_quote]]

For planning, calculate an idealized weight-only floor as **parameter count × bits per parameter ÷ 8**. Across 30–36 billion parameters, that yields:

| Weight representation | Idealized weight storage, decimal GB |
| --------------------- | ------------------------------------ |
| 16-bit                | 60–72 GB                             |
| 8-bit                 | 30–36 GB                             |
| 4-bit                 | 15–18 GB                             |

These are arithmetic estimates, not measured checkpoint sizes or GPU recommendations. They exclude quantization metadata, higher-precision tensors, vision components, attention caches, recurrent state, runtime workspaces, and concurrent requests. A mixed-precision quantization need not average exactly four bits per parameter. The active count describes the selected computation; it does not make the remaining experts disappear from the checkpoint.

Context is another separate budget. [Nemotron's card](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-BF16) advertises support up to one million tokens while explaining its 256K default through VRAM requirements. Treat the larger number as an architecture capability to validate, not a promise for a desktop.

A model can also span CPU and GPU memory. llama.cpp explicitly documents that option.[[cite:llamacpp_local_inference_quote]] I would evaluate offloading as a different deployment configuration, measuring both prompt processing and generation instead of assuming the performance of full GPU residency.

My acceptance rule would be simple: the exact checkpoint must complete representative sessions at the intended context and concurrency without exhausting memory. Record peak allocation and latency under that load. Only then decide whether a 24GB GPU, larger accelerator, or shared-memory machine is an adequate fit. This is a proposed evaluation procedure, not hardware benchmark evidence.
