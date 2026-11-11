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

// Filters the meetup groups that layouts/meetups/list.html renders as the reader types in the
// search box, and shows them a page at a time behind the "Show more" button. Without this
// script every group shows.
const PAGE_SIZE = 8;

const runMeetups = () => {
  const root = document.querySelector(".meetups");
  if (!root) {
    return;
  }
  const items = Array.from(root.querySelectorAll(".list-items > li"));
  const searchBox = root.querySelector("[type='search']");
  const moreButton = root.querySelector(".more");
  const empty = root.querySelector(".mt-empty");
  let shown = PAGE_SIZE;

  const update = () => {
    const query = searchBox.value.trim().toLowerCase();
    const matching = items.filter((item) => item.dataset.search.includes(query));
    items.forEach((item) => {
      item.hidden = true;
    });
    matching.slice(0, shown).forEach((item) => {
      item.hidden = false;
    });
    moreButton.hidden = matching.length <= shown;
    empty.hidden = matching.length > 0;
  };

  searchBox.addEventListener("input", () => {
    shown = PAGE_SIZE;
    update();
  });
  moreButton.addEventListener("click", () => {
    shown += PAGE_SIZE;
    update();
  });
  update();
};

runMeetups();
