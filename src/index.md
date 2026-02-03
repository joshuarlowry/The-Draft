---
layout: layouts/base.njk
title: The Draft
---

# The Draft

A structured content system for assembling articles from reusable blocks.

## Articles

<ul class="article-list">
{%- for article in collections.articles %}
  <li><a href="{{ article.url }}">{{ article.data.title }}</a></li>
{%- endfor %}
</ul>

## How It Works

This site demonstrates a modular content architecture where:

- **Concepts** define reusable terms and definitions
- **Argument Blocks** contain self-contained arguments with citations
- **Citations** are stored once and referenced by ID
- **Reading Bundles** group related sources by theme
- **Articles** assemble blocks in order without duplicating content
