# The Draft

A structured content system built with Eleventy for assembling articles from reusable content blocks.

## Content Model

This system uses five content types:

| Type | Format | Location | Purpose |
|------|--------|----------|---------|
| **Concept** | Markdown | `src/concepts/` | Reusable definitions and key terms |
| **ArgumentBlock** | Markdown | `src/blocks/argument/` | Self-contained arguments with citations |
| **Citation** | YAML | `src/_data/citations.yml` | Quoted statements stored once, referenced by ID |
| **ReadingBundle** | YAML | `src/_data/reading_bundles.yml` | Grouped references organized by theme |
| **Article** | Markdown | `src/articles/` | Assembly that references blocks in order |

## Repository Structure

```
/
├── package.json
├── eleventy.config.js
├── README.md
├── .github/
│   └── workflows/
│       └── pages.yml          # GitHub Pages deployment
└── src/
    ├── _data/
    │   ├── citations.yml      # Shared citations
    │   └── reading_bundles.yml # Reading list bundles
    ├── _includes/
    │   ├── layouts/
    │   │   ├── base.njk       # Base HTML template
    │   │   └── article.njk    # Article assembly template
    │   └── components/
    │       ├── block.njk      # Argument block renderer
    │       └── extended-reading.njk
    ├── blocks/
    │   └── argument/          # Argument block content
    ├── concepts/              # Concept definitions
    ├── articles/              # Article assemblies
    ├── styles/
    │   └── site.css
    └── index.md
```

## How to Run Locally

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm start

# Build for production
npm run build
```

The development server runs at `http://localhost:8080` by default.

## How Authoring Works

### Adding a New Citation

1. Open `src/_data/citations.yml`
2. Add a new entry with a unique ID:

```yaml
- id: your_citation_id
  quote: "The exact quote text, verbatim."
  attribution: "Author Name, Source Title"
```

### Adding a New Argument Block

1. Create a new file in `src/blocks/argument/`, e.g., `your-block.md`
2. Add front matter with ID, title, and citation references:

```markdown
---
id: your-block
title: "Your Block Heading"
citations:
  - your_citation_id
---
Your prose content here.

Use [[cite:your_citation_id]] to insert a citation as a blockquote.

More content after the citation.
```

### Adding a New Concept

1. Create a new file in `src/concepts/`, e.g., `your-concept.md`
2. Add front matter with ID and title:

```markdown
---
id: your-concept
title: Your Concept Name
---
The definition or explanation of the concept.
```

### Adding a New Reading Bundle

1. Open `src/_data/reading_bundles.yml`
2. Add a new bundle entry:

```yaml
- id: your-bundle-id
  intro: "Introductory text for the reading section."
  groups:
    - title: "Group Title"
      description: "Optional description of this group."
      sources:
        - author: "Author Name"
          title: "Source Title"
          description: "Brief description of the source."
```

### Creating a New Article

1. Create a new file in `src/articles/`, e.g., `your-article.md`
2. Define the assembly in front matter:

```markdown
---
layout: layouts/article.njk
id: your-article
title: "Your Article Title"
intro: |
  <p>Introductory paragraph(s) in HTML.</p>
blocks:
  - block-id-1
  - block-id-2
  - block-id-3
reading_bundle: your-bundle-id
outro: |
  <p>Concluding text after the reading section.</p>
---
```

The article will render:
1. Title
2. Intro content (if provided)
3. Each block in the specified order
4. Extended reading section (if bundle specified)
5. Outro content (if provided)

## Deployment

This repository is configured for GitHub Pages deployment via GitHub Actions.

### Setup

1. Go to your repository Settings > Pages
2. Under "Build and deployment", select "GitHub Actions" as the source
3. Push to the `main` branch to trigger deployment

The workflow in `.github/workflows/pages.yml` will:
1. Install Node.js 20
2. Install dependencies
3. Build with Eleventy
4. Deploy the `dist/` output to GitHub Pages

## Design Principles

- **Single source of truth**: Citations and reading sources are stored once
- **Assembly over duplication**: Articles reference blocks by ID, not copy content
- **Verbatim preservation**: Source text is never modified or "improved"
- **Minimal tooling**: No database, no CMS, just Markdown + YAML + Eleventy
