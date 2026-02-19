---
layout: layouts/base.njk
title: The Draft
---

# The Draft

The Draft is powered by a private, request-only research feed. I ask, the agent hunts, and the site records what matters—summarized, tagged, and linked back to the original sources.

Use the feed to jump into [Sources]({{ '/sources/' | url }}) when you want every citation and summary in one place. Browse by [Domains]({{ '/domains/' | url }}), explore [People]({{ '/people/' | url }}), or [Search]({{ '/search/' | url }}) across the site.

## Recent

<ul class="article-list">
{%- set allItems = collections.articles.concat(collections.takes) %}
{%- for item in allItems | sortByDateDesc %}
  <li>
    <a href="{{ item.url | url }}">{{ item.data.title }}</a>
    <p class="article-date">{{ (item.data.date or item.date) | formatAuthorDate }}</p>
    {% if item.data.primary_domain or (item.data.secondary_domains and item.data.secondary_domains.length) %}
    <div class="domain-badges domain-badges--inline">
      {% if item.data.primary_domain %}
      {% set domain = item.data.primary_domain | getDomainById %}
      {% if domain %}
      <span class="domain-badge domain-badge--primary" title="{{ domain.label }}">
        <span class="domain-badge__symbol" aria-hidden="true">{{ domain.symbol }}</span>
        <span class="domain-badge__label">{{ domain.label }}</span>
      </span>
      {% endif %}
      {% endif %}
      {% if item.data.secondary_domains and item.data.secondary_domains.length %}
      {% for domainId in item.data.secondary_domains %}
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
    {%- if item.data.summary %}
      <p class="article-summary">{{ item.data.summary }}</p>
    {%- endif %}
  </li>
{%- endfor %}
</ul>
