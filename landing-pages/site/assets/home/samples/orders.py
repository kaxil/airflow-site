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

from airflow.sdk import Asset, dag, task

orders = Asset("s3://shop/orders.parquet")


@dag(schedule="@daily")
def ingest_orders():
    @task(retries=3)
    def extract() -> list[dict]:
        return [{"id": 1}, {"id": 2}]

    @task(outlets=[orders])
    def load(rows: list[dict]) -> int:
        print(f"Loaded {len(rows)} orders")
        return len(rows)

    load(extract())


@dag(schedule=orders)
def orders_report():
    @task
    def report():
        print("Building the daily orders report")

    report()


ingest_orders()
orders_report()
