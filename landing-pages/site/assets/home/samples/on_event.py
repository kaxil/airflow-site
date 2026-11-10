# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.

from airflow.providers.common.messaging.triggers.msg_queue import (
    MessageQueueTrigger,
)
from airflow.sdk import Asset, AssetWatcher, dag, task

trigger = MessageQueueTrigger(scheme="kafka", topics=["orders"])
new_orders = Asset(
    "kafka://broker:9092/orders",
    watchers=[AssetWatcher(name="orders_watcher", trigger=trigger)],
)


@dag(schedule=[new_orders])
def process_order():
    @task
    def handle(**context):
        for event in context["triggering_asset_events"][new_orders]:
            print(event.extra)

    handle()


process_order()
