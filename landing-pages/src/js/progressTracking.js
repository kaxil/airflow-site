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

import throttle from "lodash/throttle";

const runProgressTracking = () => {
  const sideNavRoot = document.querySelector(".wy-nav-side-toc");
  if (!sideNavRoot) {
    return;
  }

  // An entry for a heading level the page skips has no link of its own.
  const navTocElements = Array.from(sideNavRoot.querySelectorAll("li")).filter((li) => li.querySelector(":scope > a"));
  const targetOf = (hash) => {
    if (!hash) {
      return document.body;
    }
    try {
      return document.getElementById(decodeURIComponent(hash.substr(1)));
    } catch {
      // A hash with a "%" that isn't an escape.
      return document.getElementById(hash.substr(1));
    }
  };
  // Entries whose heading isn't on the page are left out.
  const navItems = navTocElements
    .map((element) => ({navElement: element, targetElement: targetOf(element.querySelector(":scope > a").hash)}))
    .filter((item) => item.targetElement);
  if (navItems.length === 0) {
    return;
  }

  // "header > nav" is the docs theme's navbar; header.nav is the website's.
  const navbar = document.querySelector("header > nav, header.nav");
  const navbarHeight = navbar ? navbar.offsetHeight : 0;

  const handleActiveSection = () => {
    // The current section is the last one whose top has scrolled up to just below the sticky
    // nav. Links scroll their target 80px from the top (the site's scroll-padding-top), hence
    // the 40px of room. Once scrolled to the bottom of the page, the last section.
    const line = navbarHeight + 40;
    const atBottom = window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    let currentActiveIndex = 0;
    navItems.forEach((item, index) => {
      if (item.targetElement.getBoundingClientRect().top <= line) {
        currentActiveIndex = index;
      }
    });
    if (atBottom) {
      currentActiveIndex = navItems.length - 1;
    }
    navItems.forEach((item) => item.navElement.classList.remove("current"));
    navItems[currentActiveIndex].navElement.classList.add("current");
  };

  window.addEventListener("scroll", throttle(handleActiveSection, 10));
  window.addEventListener("resize", throttle(handleActiveSection, 10));
  handleActiveSection();
};
runProgressTracking();
