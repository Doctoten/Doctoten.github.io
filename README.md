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

Optional: add `image: /assets/images/your-image.jpg` and `image_alt: "Description of the image"` for a custom cover. Upload that image into `assets/images/`. Without an image, posts use a simple text listing.

## Edit the site

- `_config.yml`: title, description, timezone and site URL.
- `about.md`: biography.
- `projects.md`: projects; replace the existing placeholders with your actual work.
- `assets/css/style.css`: colours, spacing and responsive layout.
- Background: upload a real image into `assets/images/`, then set `background_image: "/assets/images/landscape.png"` in `_config.yml`. A blank value uses the plain background.
- Favicon: the site uses `assets/images/favicon.jpg`. Replace that file to change the browser icon.
- `_layouts/` and `_includes/`: page templates and shared elements.

Search, categories, tags and archives update automatically from published posts. The light/dark choice is stored in the visitor's browser. No analytics, paid services or backend are required.

The three-column layout takes inspiration from blog.lynxflow.co, with simple typography, solid surfaces and native scrolling. There are no backdrop blur effects, external font downloads or scroll animation scripts.
