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

import {shuffleNodeChildren} from "./js/committersList";
import {showMore} from "./js/showMore";
import "./js/progressTracking";

// The blog's search box submits to /blog/?q=..., the only page that runs a search.
if (window.location.pathname === "/blog/" && (new URLSearchParams(window.location.search).get("q") || "").trim()) {
  import(/* webpackChunkName: "search" */ "./js/searchBlogPosts");
}

if (document.querySelector(".meetups")) {
  import("./js/meetupsList.js");
}

if (document.querySelector("details[data-tab]")) {
  import("./js/detailsTabs");
}

shuffleNodeChildren("#committers-container");
shuffleNodeChildren("#pmc-container");

showMore("#committers-container", "#show-more-committers", 12);
showMore("#pmc-container", "#show-more-pmcs", 12);
showMore("#testimonials-container", "#show-more-testimonials", 4);
