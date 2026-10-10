# Charlie's Tech Blog

A personal Jekyll blog hosted at https://doctoten.github.io/.

## Write a post

Create `_posts/YYYY-MM-DD-short-title.md` and start it with:

```yaml
---
layout: post
title: "Your article title"
date: 2026-10-11 09:00:00 +1000
categories: [Home Lab]
tags: [Proxmox, Networking]
description: "A short summary of your article."
---
```

Write the article below the front matter in Markdown. A future date will keep the article hidden until the next build after that date. Times use Australia/Brisbane.

Optional: add `image: /assets/images/your-image.jpg` and `image_alt: "Description of the image"` for a custom cover. Upload that image into `assets/images/`. Without an image, the blog displays its built-in illustrated cover.

## Edit the site

- `_config.yml`: title, description, timezone and site URL.
- `about.md`: biography.
- `projects.md`: projects; replace the existing placeholders with your actual work.
- `assets/css/style.css`: colours, spacing and responsive layout.
- `assets/images/landscape.svg`: original landscape background.
- `_layouts/` and `_includes/`: page templates and shared elements.

Search, categories, tags and archives update automatically from published posts. The light/dark choice is stored in the visitor's browser. No analytics, paid services or backend are required.

The layout takes inspiration from the three-column blog at blog.lynxflow.co. All code and background artwork in this repository are original; branding and articles belong to Charlie.
