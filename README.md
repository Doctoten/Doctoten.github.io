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

To choose an image for social link previews without adding an article cover, use `share_image: /assets/images/your-image.png` and `share_image_alt: "Description of the image"` in the post front matter. Previews use `share_image`, then `image`, then the site-wide `share_image` from `_config.yml`. Platforms may cache previews; existing messages may keep their old preview.

## Edit the site

- `_config.yml`: title, description, timezone and site URL.
- `about.md`: biography.
- `projects.md`: projects; replace the existing placeholders with your actual work.
- `assets/css/style.css`: colours, spacing and responsive layout.
- Background: upload a real image into `assets/images/`, then set `background_image: "/assets/images/landscape.png"` in `_config.yml`. The current background is `landscape.webp`, an optimized copy of the uploaded `landscape.png`. To use a newly uploaded PNG directly, change `background_image` to its path. A blank value uses the plain background.
- Favicon: the browser uses the C icon in `assets/images/favicon.svg`.
- Sidebar avatar: replace `assets/images/favicon.jpg`, or set `avatar_image` in `_config.yml` to another uploaded image. This is separate from article cover images.
- `_layouts/` and `_includes/`: page templates and shared elements.

Search, categories, tags and archives update automatically from published posts. The light/dark choice is stored in the visitor's browser. No analytics, paid services or backend are required.

The interface follows the English three-column layout at blog.lynxflow.co/en/: left navigation, central article cards, and right search/archive/tag widgets. It uses the user’s background, Lato fonts hosted locally under their SIL Open Font License, translucent surfaces and native scrolling. No backdrop blur or scroll animation scripts are used.
