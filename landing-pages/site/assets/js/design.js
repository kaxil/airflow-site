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

// Behaviour for the design system's shared components (see landing-pages/DESIGN.md).
// A page's entry script imports what it uses, then calls markReady(): styles for the
// scripted layout apply only after that, so a page whose script fails keeps its fallback.
// The theme toggle is the site's dark-mode.js, inlined in each page's head.

export const markReady = () => document.documentElement.classList.add("ready");

// Copy buttons: data-copy holds the text, data-copy-el names an element whose text to
// copy, and data-copy-code names a highlighted code block (copied without line numbers).
export const initCopyButtons = () => {
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
  document.querySelectorAll("[data-copy-code]").forEach((b) => b.addEventListener("click", () => {
    const lines = document.getElementById(b.dataset.copyCode).querySelectorAll(".cl");
    copy([...lines].map((l) => l.textContent).join(""), b);
  }));
};

// ARIA tablist with arrow keys, Home and End. onShow(panel, on) only writes to the DOM;
// after() runs once all writes are done, so layout is read once per selection.
export const tablist = (list, onShow, after = () => {}) => {
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
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      tab.scrollIntoView({ inline: "center", block: "nearest", behavior: reduced ? "auto" : "smooth" });
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

// Segmented control (.seg): one button pressed at a time. onPick(button) runs after each
// pick. The nav's theme toggle is a .seg too, but dark-mode.js drives it.
export const initSeg = (group, onPick = () => {}) => {
  const buttons = [...group.querySelectorAll("button")];
  buttons.forEach((b) => b.addEventListener("click", () => {
    buttons.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    onPick(b);
  }));
};

// Nav: the menu comes from the site config, so its width isn't known here. Collapse to
// the menu button whenever the full menu doesn't fit. While the menu sheet covers the
// page, keep focus and scrolling inside it.
export const initNav = () => {
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
  const behindMenu = [document.querySelector("main"), document.querySelector("footer")];
  menu.addEventListener("toggle", () => {
    document.documentElement.style.setProperty("--nav-bottom", `${nav.getBoundingClientRect().bottom}px`);
    document.body.style.overflow = menu.open ? "hidden" : "";
    behindMenu.forEach((el) => { el.inert = menu.open; });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.open) { menu.open = false; menu.querySelector("summary").focus(); }
  });
};
