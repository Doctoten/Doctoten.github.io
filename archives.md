---
layout: page
title: Archives
permalink: /archives/
description: Every note, one chapter at a time.
---
{% assign years = site.posts | group_by_exp: 'post', "post.date | date: '%Y'" %}
{% for year in years %}
<section class="archive-group" id="year-{{ year.name }}"><h2>{{ year.name }} <small>{{ year.items | size }} {% if year.items.size == 1 %}post{% else %}posts{% endif %}</small></h2>
{% for post in year.items %}<a class="archive-row" href="{{ post.url | relative_url }}"><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: '%d %b' }}</time><span>{{ post.title | escape }}</span>{% include icon.html name='arrow' %}</a>{% endfor %}</section>
{% endfor %}
{% if site.posts.size == 0 %}No published posts yet.{% endif %}
