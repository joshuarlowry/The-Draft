---
layout: layouts/base.njk
title: The Draft
---

# The Draft

A structured content system for assembling articles from reusable blocks.

## Articles

<ul class="article-list">
{%- for article in collections.articles %}
  <li><a href="{{ article.url | url }}">{{ article.data.title }}</a></li>
{%- endfor %}
</ul>
