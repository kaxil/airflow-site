/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Behaviour for the home page (layouts/index.html). The page works without it:
// tab panels stack and the menu is a <details>. Styles for the scripted layout
// apply only once this file adds .ready, so a blocked script leaves that fallback.
// The theme toggle is the site's dark-mode.js, inlined in the page head.
(() => {
  "use strict";

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

  // Copy buttons
  const toastEl = document.getElementById("toast");
  let toastTimer;
  const toast = (msg) => {
    toastEl.textContent = msg;
    toastEl.classList.add("on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("on"), 1800);
  };
  const copy = async (text, btn) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      toast("Couldn't copy. Select the text instead.");
      return;
    }
    btn.classList.add("done");
    setTimeout(() => btn.classList.remove("done"), 1400);
    toast("Copied");
  };
  document.querySelectorAll("[data-copy]").forEach((b) => b.addEventListener("click", () => copy(b.dataset.copy, b)));
  document.querySelectorAll("[data-copy-el]").forEach((b) => b.addEventListener("click", () => copy(document.getElementById(b.dataset.copyEl).textContent, b)));
  // Highlighted code: copy the source lines without the line numbers.
  document.querySelectorAll("[data-copy-code]").forEach((b) => b.addEventListener("click", () => {
    const lines = document.getElementById(b.dataset.copyCode).querySelectorAll(".cl");
    copy([...lines].map((l) => l.textContent).join(""), b);
  }));

  // Tabs: ARIA tablist with arrow keys, Home and End. onShow(panel, on) only
  // writes to the DOM; after() runs once all writes are done, so layout is read once.
  const tablist = (list, onShow, after = () => {}) => {
    const tabs = [...list.querySelectorAll('[role="tab"]')];
    const select = (tab, byUser) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        onShow(document.getElementById(t.getAttribute("aria-controls")), on);
      });
      after();
      if (!byUser) return;
      tab.focus({ preventScroll: true });
      // Bring the chosen tab into view in a scrolling tab strip; on load, leave the page where it is.
      if (list.scrollWidth > list.clientWidth) {
        tab.scrollIntoView({ inline: "center", block: "nearest", behavior: reducedMotion.matches ? "auto" : "smooth" });
      }
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => select(t, true));
      t.addEventListener("keydown", (e) => {
        const k = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
        if (k === undefined) return;
        e.preventDefault();
        select(tabs[(k + tabs.length) % tabs.length], true);
      });
    });
    select(tabs.find((t) => t.getAttribute("aria-selected") === "true") || tabs[0], false);
  };

  // Use-case panels share one grid cell; the container follows the visible panel's height.
  // Watching the panels themselves also catches web-font and image reflow.
  const panels = document.querySelector(".panels");
  let current = null;
  const fit = () => { panels.style.height = `${current.offsetHeight}px`; };
  tablist(document.querySelector(".tabs"), (p, on) => {
    p.inert = !on;
    if (on) current = p;
  }, fit);
  const panelObserver = new ResizeObserver(fit);
  panels.querySelectorAll(".panel").forEach((p) => panelObserver.observe(p));
  // The editor's copy button copies the source, so it only shows with the source tab.
  const copySource = document.querySelector("[data-copy-code]");
  tablist(document.querySelector(".etl"), (p, on) => {
    p.hidden = !on;
    if (p.id === "ep-run") copySource.hidden = on;
  });

  // Install command: pip or uv
  const pm = [...document.querySelectorAll(".pmgr button")];
  pm.forEach((b) => b.addEventListener("click", () => {
    pm.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    document.getElementById("icmd").textContent = b.dataset.cmd;
  }));

  // Hero artwork: a pause button, and no animation while off screen
  const art = document.querySelectorAll(".art, .horizon");
  const ctl = document.querySelector(".artctl");
  ctl.addEventListener("click", () => {
    const stop = ctl.getAttribute("aria-pressed") !== "true";
    ctl.setAttribute("aria-pressed", String(stop));
    art.forEach((a) => a.classList.toggle("stopped", stop));
  });
  const io = new IntersectionObserver((entries) => entries.forEach((e) => e.target.classList.toggle("paused", !e.isIntersecting)));
  art.forEach((a) => io.observe(a));

  // Nav: the menu comes from the site config, so its width isn't known here.
  // Collapse to the menu button whenever the full menu doesn't fit.
  const nav = document.querySelector(".nav");
  const navRow = nav.querySelector(".wrap");
  const menu = nav.querySelector(".mnav");
  const fitNav = () => {
    nav.classList.remove("collapsed");
    nav.classList.toggle("collapsed", navRow.scrollWidth > navRow.clientWidth);
    if (menu.open && getComputedStyle(menu).display === "none") menu.open = false;
  };
  // The row's box doesn't change when the web font swaps in, but the menu's does.
  const navObserver = new ResizeObserver(fitNav);
  [navRow, nav.querySelector(".menu")].forEach((el) => navObserver.observe(el));
  // While the menu sheet covers the page, keep focus and scrolling inside it.
  const behindMenu = [document.querySelector("main"), document.querySelector("footer")];
  menu.addEventListener("toggle", () => {
    document.documentElement.style.setProperty("--nav-bottom", `${nav.getBoundingClientRect().bottom}px`);
    document.body.style.overflow = menu.open ? "hidden" : "";
    behindMenu.forEach((el) => { el.inert = menu.open; });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.open) { menu.open = false; menu.querySelector("summary").focus(); }
  });

  document.documentElement.classList.add("ready");
})();
