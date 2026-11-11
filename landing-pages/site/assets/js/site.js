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

// Behaviour for every page except the home page (layouts/_default/baseof.html), bundled
// with design.js by js.Build. The section behaviour (lists, search, the tracked table of
// contents) comes from the webpack bundle in landing-pages/src, which the frame also loads.
import { initCopyButtons, initNav, markReady } from "./design.js";

initCopyButtons();
initNav();
markReady();
