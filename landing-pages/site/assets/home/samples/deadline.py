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

from datetime import timedelta

from airflow.providers.slack.notifications.slack_webhook import (
    SlackWebhookNotifier,
)
from airflow.sdk import (
    AsyncCallback,
    DeadlineAlert,
    DeadlineReference,
    dag,
    task,
)


@dag(
    schedule="@daily",
    deadline=DeadlineAlert(
        reference=DeadlineReference.DAGRUN_QUEUED_AT,
        interval=timedelta(hours=1),
        callback=AsyncCallback(
            SlackWebhookNotifier,
            kwargs={"text": "{{ dag_run.dag_id }} missed its deadline"},
        ),
    ),
)
def nightly_finance():
    @task
    def close_books(): ...

    close_books()


nightly_finance()
