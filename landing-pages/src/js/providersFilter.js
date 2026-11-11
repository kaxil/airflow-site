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

// The filter on /docs/: hides the providers whose names don't contain what the reader types.
// While it filters, each section (an h3 and what follows it up to the next h3) shows only if
// one of its providers matches, and the sections' text is hidden.
const filter = document.querySelector(".docs-filter");
const input = filter.querySelector("input");
const empty = document.querySelector(".docs-empty");
const items = Array.from(document.querySelectorAll(".list-providers li"));

const sections = [];
for (const element of document.querySelector(".docs-provider-lists").children) {
  if (element.tagName === "H3" || sections.length === 0) {
    sections.push([]);
  }
  sections[sections.length - 1].push(element);
}

input.addEventListener("input", () => {
  const query = input.value.trim().toLowerCase();
  items.forEach((item) => {
    item.hidden = !item.textContent.toLowerCase().includes(query);
  });
  let shown = 0;
  sections.forEach((elements) => {
    const matches = elements.some((element) => element.querySelector("li:not([hidden])"));
    shown += matches ? 1 : 0;
    elements.forEach((element) => {
      const isList = element.matches("ul.list-providers");
      element.hidden = Boolean(query) && (!matches || !(isList || element.tagName === "H3"));
    });
  });
  empty.hidden = shown > 0;
});
filter.hidden = false;
