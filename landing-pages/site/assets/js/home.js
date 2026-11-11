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

// Behaviour for the home page (layouts/index.html), bundled with design.js by js.Build.
// The page works without it: tab panels stack and the menu is a <details>.
import { initCopyButtons, initNav, initSeg, markReady, tablist } from "./design.js";

initCopyButtons();
initNav();

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
initSeg(document.querySelector(".pmgr"), (b) => { document.getElementById("icmd").textContent = b.dataset.cmd; });

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

markReady();
