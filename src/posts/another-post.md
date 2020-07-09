---
title: 'a bew post thing in the thing'
date: '2020-01-20'
description: 'Donec non varius nulla, a mollis ante. Fusce massa ligula, efficitur in blandit vitae, commodo non augue. Nulla ut erat varius, vulputate nibh ac, lacinia odio. Nullam pulvinar vulputate turpis, ut malesuada ante pulvinar sed. Sed mollis est sit amet enim consectetur dictum.'
---

We recommend using **Static Generation** (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.

You can use Static Generation for many types of pages, including:

- Marketing pages
- Blog posts
- E-commerce product listings
- Help and documentation

You should ask yourself: "Can I pre-render this page **ahead** of a user's request?" If the answer is yes, then you should choose Static Generation.

On the other hand, Static Generation is **not** a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.

In that case, you can use **Server-Side Rendering**. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate data.