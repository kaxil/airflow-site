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

import lunr from "lunr";

// Blog search on /blog/?q=...: finds the matching posts in the lunr index that
// create-index.js builds, and shows their rows from the server-rendered list, best match
// first. The index refers to each post by its title.
const MAX_RESULTS = 10;

const showMessage = (list, text) => {
  const item = document.createElement("li");
  item.className = "post-list-msg";
  item.textContent = text;
  list.replaceChildren(item);
};

const search = (index, query) => {
  try {
    return index.search(query);
  } catch (error) {
    if (!(error instanceof lunr.QueryParseError)) {
      throw error;
    }
    // lunr can't parse the query, for example one with a colon (its field separator):
    // search for the words.
    return index.search(query.replace(/[:^~+*-]/g, " "));
  }
};

const runSearch = () => {
  const searchBox = document.querySelector("#search");
  const list = document.querySelector(".list-items");
  if (!searchBox || !list) {
    return;
  }
  const query = new URLSearchParams(window.location.search).get("q");
  searchBox.value = query;

  const rowsByTitle = new Map(Array.from(list.children).map((row) => [
    row.querySelector(".box-event__blogpost--header").textContent.trim(),
    row,
  ]));

  fetch("/_gen/indexes/en/blog-index.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Blog search index: HTTP ${response.status}`);
      }
      return response.json();
    })
    .then((index) => {
      const rows = search(lunr.Index.load(index), query)
        .map((match) => rowsByTitle.get(match.ref))
        .filter(Boolean)
        .slice(0, MAX_RESULTS);
      if (rows.length > 0) {
        list.replaceChildren(...rows);
      } else {
        showMessage(list, "No search results found");
      }
    })
    .catch((error) => {
      showMessage(list, "Search isn't available right now.");
      throw error;
    });
};

runSearch();
