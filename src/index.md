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
    {% if article.data.primary_domain or (article.data.secondary_domains and article.data.secondary_domains.length) %}
    <div class="domain-badges domain-badges--inline">
      {% if article.data.primary_domain %}
      {% set domain = article.data.primary_domain | getDomainById %}
      {% if domain %}
      <span class="domain-badge domain-badge--primary" title="{{ domain.label }}">
        <span class="domain-badge__symbol" aria-hidden="true">{{ domain.symbol }}</span>
        <span class="domain-badge__label">{{ domain.label }}</span>
      </span>
      {% endif %}
      {% endif %}
      {% if article.data.secondary_domains and article.data.secondary_domains.length %}
      {% for domainId in article.data.secondary_domains %}
      {% set domain = domainId | getDomainById %}
      {% if domain %}
      <span class="domain-badge domain-badge--secondary" title="{{ domain.label }}">
        <span class="domain-badge__symbol" aria-hidden="true">{{ domain.symbol }}</span>
        <span class="domain-badge__label">{{ domain.label }}</span>
      </span>
      {% endif %}
      {% endfor %}
      {% endif %}
    </div>
    {% endif %}
    {%- if article.data.summary %}
      <p class="article-summary">{{ article.data.summary }}</p>
    {%- endif %}
  </li>
{%- endfor %}
</ul>
