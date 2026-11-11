<!--
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
-->

# Design system

The design system is the set of tokens, styles, scripts and template partials that pages on
airflow.apache.org are built from. The home page uses it today. The other pages still use the Docsy
theme; moving them over is the next step (see [Roadmap](#roadmap)).

The reference page at `/design/` renders the colour tokens and the components in both themes side by
side. It isn't in the menu or the sitemap. Locally, open `/design/` on the preview that
`./site.sh preview-landing-pages` starts.

## Two layers

- **The foundation** is the palette, the theme and the tokens. It is safe to import into any
  stylesheet, including the Docsy and Bootstrap ones: `_palette.scss` and `_theme.scss` emit no CSS,
  and `_tokens.scss` only emits `@font-face`, rules on `:root` and `[data-bs-theme]`, and the
  `.only-light`, `.only-dark` and `.a-*` classes.
- **The page kit** is the base styles, components, nav and footer. It is for standalone pages that
  don't load Bootstrap or Docsy, because some of its class names (`.btn`, `.nav`, `.toast`, `.hint`,
  `.tag`, `.gh`) are also Bootstrap's or Sphinx's.

## Where it lives

All paths are under `landing-pages/site/`.

| Path | What it holds |
| --- | --- |
| `assets/scss/design/_palette.scss` | Every colour value, as Sass maps (`$brand`, `$fixed`, `$light`, `$dark`) |
| `assets/scss/design/_theme.scss` | The `theme-light` and `theme-dark` mixins, and the `custom-properties`, `code-chip` and `label` mixins |
| `assets/scss/design/_tokens.scss` | The fonts, the palette as custom properties, theme switching, accent classes |
| `assets/scss/design/_base.scss` | Reset, type scale, 12-column grid, small utilities |
| `assets/scss/design/_components.scss` | Buttons, links, segmented control, copy button, hint, tag, window, code, terminal, toast |
| `assets/scss/design/_nav.scss`, `_footer.scss` | Site navigation and footer |
| `assets/scss/design/_kit.scss` | Imports all of the above; a page's SCSS entry imports this one file |
| `assets/js/design.js` | Copy buttons, tab lists, segmented controls, nav fitting, and `markReady()` |
| `layouts/partials/design/head.html` | The `<head>`: meta tags, theme script, fonts, the page's stylesheet and script |
| `layouts/partials/design/nav.html`, `footer.html` | Navigation (with the skip link) and footer (with the toast for copy buttons) |
| `layouts/partials/design/menu.html` | The main menu from the site config, shared by the nav and footer |
| `layouts/partials/design/highlight.html` | A highlighted code sample from a real file, with the options the code styles need |
| `layouts/partials/design/code-window.html` | A highlighted code sample in a window |
| `layouts/partials/design/copy-button.html`, `icon.html` | The copy button, and the inline icons |
| `static/external/fonts/` | Instrument Sans and JetBrains Mono, with their SIL Open Font License files |
| `layouts/design/list.html`, `assets/scss/design/reference.scss` | The `/design/` reference page |

## Build a page with it

A page built with the design system is a standalone template: it doesn't use `_default/baseof.html`,
Docsy or Bootstrap. The home page (`layouts/index.html`) is the full example. The skeleton is:

```go-html-template
<!doctype html>
<html lang="{{ .Site.Language.Lang }}">
<head>
{{ partial "design/head.html" (dict "page" . "css" "scss/my-page.scss" "js" "js/my-page.js") }}
</head>
<body>
{{ partial "design/nav.html" . }}
<main id="main">
  <!-- sections -->
</main>
{{ partial "design/footer.html" . }}
</body>
</html>
```

The page's SCSS entry imports the kit, then adds only what the page needs. The import path is
relative to the entry file; for `assets/scss/my-page.scss` it is:

```scss
@import "design/kit";
```

A page with its own theme-dependent values declares them with the theme mixins, as `home.scss` does
for its artwork:

```scss
@include theme-light { --runs: url("/home/img/runs-light.svg"); }
@include theme-dark { --runs: url("/home/img/runs-dark.svg"); }
```

The page's script imports what it uses from `design.js` and calls `markReady()` last. Hugo bundles
the two with `js.Build`:

```js
import { initCopyButtons, initNav, markReady } from "./design.js";

initCopyButtons();
initNav();
markReady();
```

## Themes

- Light is the default. Dark applies when `<html>` has `data-bs-theme="dark"`, or when nothing is
  stored and the OS asks for dark.
- The attribute and its `localStorage` key, `theme`, are the ones `assets/js/dark-mode.js` uses on
  the rest of the site, so a choice made on any page carries to every other page.
  `design/head.html` inlines `dark-mode.js`, so the theme is set before the first paint.
- `data-bs-theme` also works on any element, as it does in Bootstrap, to show one part of a page in
  one theme. That element has to set its own `color` and `background`, because the colour it
  inherits was computed at `body`.
- For an image with a version per theme, render both with `class="only-light"` and
  `class="only-dark"` and `loading="lazy"`. The hidden one is never fetched. These classes follow the
  page's theme only, not a `data-bs-theme` set on an inner element.

## Tokens

Colour values live in `_palette.scss`, and every colour on a page comes from them as a custom
property. The `/design/` page shows each colour token in both themes.

| Group | Tokens | Use |
| --- | --- | --- |
| Surfaces | `--bg`, `--bg-raise`, `--surface`, `--surface-2`, `--surface-3`, `--inset`, `--nav-bg`, `--code-bg` | Page, alternate bands, cards and windows, window bars, pressed controls, boxes inside windows, the sticky nav, code |
| Lines | `--line`, `--line-2`, `--line-3`, `--tint`, `--tint-2` | Hairlines, borders, strong borders, hover fills |
| Text | `--text`, `--soft`, `--dim`, `--link`, `--logo-ink` | Headings, body, captions, links, the logo's wordmark |
| Brand | `--blue`, `--blue-btn`, `--blue-btn-hover`, `--on-blue`, `--blue-2` | Airflow blue; the primary button and its hover; text on it; focus rings |
| Accents | `--green`, `--green-2`, `--teal-2`, `--red`, `--red-2`, `--amber`, `--amber-2`, `--accent-blue` | Status colours and section accents. The `-2` shades are the ones safe for text |
| Code | `--code-fg`, `--code-ln`, `--tok-kw`, `--tok-str`, `--tok-dec`, `--tok-fn`, `--tok-ty`, `--tok-cm`, `--tok-num` | Highlighted code, line numbers, syntax |
| Effects | `--shadow-win`, `--glow` | The window shadow, and how strong the accent glows are |
| Type | `--sans`, `--mono` | Instrument Sans for text, JetBrains Mono for code and labels |
| Layout | `--pad`, `--gutter`, `--side` | Section padding, grid gutter, page side margin |

`--acc` is the current accent. It defaults to `--blue`, and the `.a-blue`, `.a-green`, `.a-teal`,
`.a-amber` and `.a-red` classes set it for tabs, tags, windows and highlighted code lines.

The type scale is in `_base.scss`: `h1` 72/72, `h2` 52/58, `h3` 22/28, `.lead` 20/30, body 17/26, with
smaller sizes below 760 px. The `.h1`, `.h2` and `.h3` classes give other elements a heading's look.

## Rules

1. **Colours come from tokens.** A new colour is a new entry in `_palette.scss`, with a light and a
   dark value. Illustrations that depict something with its own colours, such as the Python file
   icon in the home page's editor, are the exception.
2. **Text contrast is at least 4.5:1 in both themes**, on every background the text sits on,
   including tags and highlighted code lines.
3. **Fonts are self-hosted.** The ASF privacy policy rules out third-party font services.
4. **Write Sass that LibSass compiles.** Hugo compiles the SCSS with LibSass, so use `rgba()` rather
   than `rgb(r g b / a)`, `max-width` and `min-width` media queries rather than range syntax, and wrap
   CSS `max()` and `min()` in `unquote()`. The repo's stylelint config turns the conflicting rules off.
5. **A page works without its script.** Style the scripted layout under `html.ready`, which
   `markReady()` adds, and keep a usable layout for `html:not(.ready)`.
6. **Everything works from the keyboard**, with a visible focus ring. Inside a clipped window the
   ring is drawn inward. Motion stops under `prefers-reduced-motion`.
7. **Code samples are real files** that Airflow parses, such as the home page's
   `assets/home/samples/`. `design/highlight.html` cuts the license header the repo requires on
   every source file.

## Brand

The palette is the Airflow pinwheel from the brand book delivered with
[AIP-11](https://cwiki.apache.org/confluence/spaces/AIRFLOW/pages/103088341/AIP-11+Create+a+Landing+Page+for+Apache+Airflow):
`#017cee`, `#0cb6ff`, `#00ad46`, `#04d659`, `#00c7d4`, `#11e1ee`, `#e43921` and `#ff7557`. It is the
`$brand` map in `_palette.scss`; `assets/scss/_colors.scss` has the same values for the rest of the
site. The nav inlines `assets/icons/airflow-logo.svg`, and its wordmark follows the theme through
`--logo-ink`.

## Roadmap

1. The home page, the design system and the `/design/` reference page.
2. Bring the rest of the Hugo site onto the system:
   - Import the foundation into `assets/scss/main-custom.scss`.
   - Point Bootstrap's and Docsy's Sass variables (`assets/scss/_variables.scss`, `_colors.scss`) at
     the `_palette.scss` maps. They need Sass values, not `var()`, because Bootstrap derives shades
     from them at compile time.
   - Declare the `--bs-*` bridge (`--bs-body-bg: var(--bg)` and so on) with the theme mixins, so it
     follows the theme the same way the tokens do.
   - Before the design nav and footer go on Bootstrap pages, prefix the page-kit classes that collide
     (`.btn`, `.nav`, `.toast`, `.hint`, `.tag`, `.gh`).
3. Release the Sphinx docs theme. `./site.sh prepare-theme` already copies the site's compiled
   `main.min.css` and `main-custom.min.css` into `sphinx_airflow_theme/`, so after step 2 a new
   theme release brings the docs in line. The fonts' `/external/fonts/` URLs then become part of each
   archived docs version, so they shouldn't move after that.
