---
id: eleventy-3-feature-opportunities
title: 'Eleventy 3 features worth considering for The Draft'
categories:
  - platform-tooling
topics:
  - eleventy
  - performance
tags:
  - eleventy-plugins
  - asset-pipeline
  - build-workflow
citations:
  - eleventy_image_processing_quote
  - eleventy_fetch_caching_quote
  - eleventy_dev_server_hot_reload_quote
---

Eleventy 3 keeps the core lean, but there are a few optional capabilities we can still adopt to improve performance and authoring workflow. For images, the Eleventy Image plugin can automatically process every <img> or <picture> element, which would give us responsive assets without hand-managed transforms.[[cite:eleventy_image_processing_quote]]

If we ever ingest remote data (research feeds, API lookups, or external summaries), Eleventy Fetch can cache those resources locally on a schedule so we do not hammer APIs on every build.[[cite:eleventy_fetch_caching_quote]]

Finally, the built-in Eleventy Dev Server already includes hot reload, which means we could streamline local preview if we are still using external tooling for live reload.[[cite:eleventy_dev_server_hot_reload_quote]]
