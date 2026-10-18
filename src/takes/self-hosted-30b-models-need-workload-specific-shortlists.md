---
id: self-hosted-30b-models-need-workload-specific-shortlists
title: 'The 30–36B model class needs a workload-specific shortlist'
date: '2026-10-18'
summary: 'A research snapshot of dense, sparse, coding, and workflow-specialized models, with a nearby 27B comparison.'
primary_domain: architecture
secondary_domains: [agentic]
perspective: architect
classification_rationale: 'Model selection determines deployment architecture. Agentic workflows provide the tasks against which the choices should be evaluated.'
categories: [architecture, engineering-judgment]
topics: [model-selection, local-inference]
tags: [self-hosted-models, open-weights, mixture-of-experts]
citations:
  - qwen36_35b_model_card_quote
  - google_gemma4_launch_quote
  - accio_occamy1_model_card_quote
---

Build a workload-specific shortlist before choosing a self-hosted model in the 30–36B range. This is my recommendation from the official sources reviewed on October 18, 2026, not a ranking from local testing.

The [official Qwen history](https://github.com/QwenLM/Qwen3.8) tracks a February Qwen3.5 35B release, April's Qwen3.6 35B update, and August's Qwen3.8 27B release. A newer family name does not establish a newer 35B checkpoint. Qwen3.6's parameter description also makes the total/active distinction explicit.[[cite:qwen36_35b_model_card_quote]]

These are the candidates I would separate by purpose. Each linked model card supports its row; the evaluation roles are editorial recommendations.

| Candidate                                                                                | Architecture / scale                            | Suggested evaluation role                                     |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------- |
| [Qwen3.6-35B-A3B](https://huggingface.co/Qwen/Qwen3.6-35B-A3B)                           | 35B total, 3B active; vision                    | General coding and tool-use starting point                    |
| [Gemma 4 31B](https://huggingface.co/google/gemma-4-31B-it)                              | Dense; 30.7B language model plus vision encoder | Multimodal dense comparison                                   |
| [GLM-4.7-Flash](https://huggingface.co/zai-org/GLM-4.7-Flash)                            | 30B-A3B MoE; text                               | Alternative tool-use candidate                                |
| [Nemotron 3 Nano](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-BF16)     | 30B total, 3.5B active; hybrid Mamba/attention  | Long-context text experiments                                 |
| [Olmo 3.1 32B Think](https://huggingface.co/allenai/Olmo-3.1-32B-Think)                  | 32B reasoning model                             | Training-provenance and research comparison                   |
| [Qwen3-Coder-30B-A3B-Instruct](https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct) | 30.5B total, 3.3B active; non-thinking          | Coding baseline                                               |
| [Occamy-1.0](https://huggingface.co/Accio-Lab/occamy-1.0)                                | 35B Qwen3.6 derivative                          | Sustained workflow and recovery experiments                   |
| [Ornith-1.5-35B-A3B](https://huggingface.co/ornith-ai/Ornith-1.5-35B-A3B)                | About 35B total, 3B active; MoE                 | Additional agentic coding candidate from the author follow-up |
| [Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)                                   | Dense 27B; vision; **outside the strict band**  | Nearby newer-generation comparison                            |

Google’s April launch adds another family to evaluate; its positioning remains a provider claim.[[cite:google_gemma4_launch_quote]] Occamy illustrates specialization within an existing architecture, with an explicit limit on its intended scope.[[cite:accio_occamy1_model_card_quote]] Neither observation establishes a universal winner.

For a first evaluation, I would compare Qwen3.6, Gemma 4, and the existing coding baseline on the same repository tasks, then add Occamy if long sessions matter. Include Qwen3.8-27B if the size band expresses a hardware budget rather than a hard parameter requirement. Keep Olmo on the list when inspecting training provenance is part of the goal.
