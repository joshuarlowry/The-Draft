---
layout: layouts/base.njk
title: The Draft
---

# The Draft

The Draft is powered by a private, request-only research feed. I ask, the agent hunts, and the site records what matters—summarized, tagged, and linked back to the original sources.

Use the feed to jump into [[Sources]({{ '/sources/' | url }})] when you want every citation and summary in one place.

## Articles

<ul class="article-list">
{%- for article in collections.articles %}
  <li>
    <a href="{{ article.url | url }}">{{ article.data.title }}</a>
    {%- if article.data.summary %}
      <p class="article-summary">{{ article.data.summary }}</p>
    {%- endif %}
  </li>
{%- endfor %}
</ul>
