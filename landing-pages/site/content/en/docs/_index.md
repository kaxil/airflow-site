---
title: "Documentation"
linkTitle: "Documentation"
description: "Guides and reference for Airflow, the tools around it, and its provider packages."
weight: 20
menu:
    main:
        name: "Docs"
        weight: 10
# Each documentation set is a row on /docs/; the id keeps the anchor other sites link to.
# The body lists the providers: add one under "Active providers" when it is first released.
# The lead above the list counts it (partials/site/provider-count.html).
groups:
  - title: "Airflow"
    docs:
      - id: "apache-airflow"
        title: "Apache Airflow®"
        url: "/docs/apache-airflow/stable/index.html"
        description: "Install and run Airflow, write Dags, and operate the scheduler, API server, triggerer and workers. Includes the UI, CLI and REST API reference."
      - id: "task-sdk"
        title: "Task SDK"
        url: "/docs/task-sdk/stable/index.html"
        description: "The `airflow.sdk` interfaces that Dags and tasks are written against, and that tasks use at runtime for Connections, Variables and XComs. Built to stay stable across Airflow versions."
  - title: "Deployment"
    docs:
      - id: "docker-stack"
        title: "Docker image"
        url: "/docs/docker-stack/index.html"
        description: "The official image on Docker Hub, and how to extend or customize it for your deployment."
      - id: "helm-chart"
        title: "Helm chart"
        url: "/docs/helm-chart/stable/index.html"
        description: "The official chart for running Airflow on Kubernetes, in any cloud or on premises."
  - title: "Tools and clients"
    docs:
      - id: "apache-airflow-ctl-airflowctl"
        title: "airflowctl"
        url: "/docs/apache-airflow-ctl/stable/index.html"
        description: "A command-line client that manages Airflow through its REST API, with no direct access to the metadata database."
      - id: "python-api-client"
        title: "Python API client"
        url: "https://github.com/apache/airflow-client-python"
        description: "A Python client for the Airflow REST API."
      - id: "apache-airflow-mypy-plugins"
        title: "Mypy plugins"
        url: "/docs/apache-airflow-mypy/stable/index.html"
        description: "Optional plugins that teach mypy about Dags, custom operators, hooks, typed decorators and task outputs."
---

### Active providers

{{< rawhtml >}}

<ul class="list-providers">

  <li><a href="/docs/apache-airflow-providers-airbyte/stable/index.html"><code>Airbyte</code></a></li>

  <li><a href="/docs/apache-airflow-providers-akeyless/stable/index.html"><code>Akeyless</code></a></li>

  <li><a href="/docs/apache-airflow-providers-alibaba/stable/index.html"><code>Alibaba</code></a></li>

  <li><a href="/docs/apache-airflow-providers-amazon/stable/index.html"><code>Amazon</code></a></li>

  <li><a href="/docs/apache-airflow-providers-anthropic/stable/index.html"><code>Anthropic</code></a></li>

  <li><a href="/docs/apache-airflow-providers-apache-arrow/stable/index.html"><code>Apache Arrow</code></a></li>

  <li><a href="/docs/apache-airflow-providers-apache-beam/stable/index.html"><code>Apache Beam</code></a></li>

  <li><a href="/docs/apache-airflow-providers-apache-cassandra/stable/index.html"><code>Apache Cassandra</code></a></li>

  <li><a href="/docs/apache-airflow-providers-apache-drill/stable/index.html"><code>Apache Drill</code></a></li>

  <li><a href="/docs/apache-airflow-providers-apache-druid/stable/index.html"><code>Apache Druid</code></a></li>

  <li><a href="/docs/apache-airflow-providers-apache-flink/stable/index.html"><code>Apache Flink</code></a></li>

  <li><a href="/docs/apache-airflow-providers-apache-hdfs/stable/index.html"><code>Apache HDFS</code></a></li>

  <li><a href="/docs/apache-airflow-providers-apache-hive/stable/index.html"><code>Apache Hive</code></a></li>

  <li><a href="/docs/apache-airflow-providers-apache-iceberg/stable/index.html"><code>Apache Iceberg</code></a></li>

  <li><a href="/docs/apache-airflow-providers-apache-impala/stable/index.html"><code>Apache Impala</code></a></li>

  <li><a href="/docs/apache-airflow-providers-apache-kafka/stable/index.html"><code>Apache Kafka</code></a></li>

  <li><a href="/docs/apache-airflow-providers-apache-kylin/stable/index.html"><code>Apache Kylin</code></a></li>

  <li><a href="/docs/apache-airflow-providers-apache-livy/stable/index.html"><code>Apache Livy</code></a></li>

  <li><a href="/docs/apache-airflow-providers-apache-pig/stable/index.html"><code>Apache Pig</code></a></li>

  <li><a href="/docs/apache-airflow-providers-apache-pinot/stable/index.html"><code>Apache Pinot</code></a></li>

  <li><a href="/docs/apache-airflow-providers-apache-spark/stable/index.html"><code>Apache Spark</code></a></li>

  <li><a href="/docs/apache-airflow-providers-apache-tinkerpop/stable/index.html"><code>Apache Tinkerpop</code></a></li>

  <li><a href="/docs/apache-airflow-providers-apprise/stable/index.html"><code>Apprise</code></a></li>

  <li><a href="/docs/apache-airflow-providers-arangodb/stable/index.html"><code>ArangoDB</code></a></li>

  <li><a href="/docs/apache-airflow-providers-asana/stable/index.html"><code>Asana</code></a></li>

  <li><a href="/docs/apache-airflow-providers-atlassian-jira/stable/index.html"><code>Atlassian Jira</code></a></li>

  <li><a href="/docs/apache-airflow-providers-celery/stable/index.html"><code>Celery</code></a></li>

  <li><a href="/docs/apache-airflow-providers-clickhousedb/stable/index.html"><code>ClickHouse</code></a></li>

  <li><a href="/docs/apache-airflow-providers-cloudant/stable/index.html"><code>Cloudant</code></a></li>

  <li><a href="/docs/apache-airflow-providers-cncf-kubernetes/stable/index.html"><code>CNCF Kubernetes</code></a></li>

  <li><a href="/docs/apache-airflow-providers-cohere/stable/index.html"><code>Cohere</code></a></li>

  <li><a href="/docs/apache-airflow-providers-common-ai/stable/index.html"><code>Common AI</code></a></li>

  <li><a href="/docs/apache-airflow-providers-common-compat/stable/index.html"><code>Common Compat</code></a></li>

  <li><a href="/docs/apache-airflow-providers-common-io/stable/index.html"><code>Common IO</code></a></li>

  <li><a href="/docs/apache-airflow-providers-common-messaging/stable/index.html"><code>Common Messaging</code></a></li>

  <li><a href="/docs/apache-airflow-providers-common-sql/stable/index.html"><code>Common SQL</code></a></li>

  <li><a href="/docs/apache-airflow-providers-databricks/stable/index.html"><code>Databricks</code></a></li>

  <li><a href="/docs/apache-airflow-providers-datadog/stable/index.html"><code>Datadog</code></a></li>

  <li><a href="/docs/apache-airflow-providers-dbt-cloud/stable/index.html"><code>dbt Cloud</code></a></li>

  <li><a href="/docs/apache-airflow-providers-dingding/stable/index.html"><code>Dingding</code></a></li>

  <li><a href="/docs/apache-airflow-providers-discord/stable/index.html"><code>Discord</code></a></li>

  <li><a href="/docs/apache-airflow-providers-docker/stable/index.html"><code>Docker</code></a></li>

  <li><a href="/docs/apache-airflow-providers-duckdb/stable/index.html"><code>DuckDB</code></a></li>

  <li><a href="/docs/apache-airflow-providers-edge3/stable/index.html"><code>Edge3</code></a></li>

  <li><a href="/docs/apache-airflow-providers-elasticsearch/stable/index.html"><code>Elasticsearch</code></a></li>

  <li><a href="/docs/apache-airflow-providers-exasol/stable/index.html"><code>Exasol</code></a></li>

  <li><a href="/docs/apache-airflow-providers-fab/stable/index.html"><code>FAB (Flask-AppBuilder)</code></a></li>

  <li><a href="/docs/apache-airflow-providers-facebook/stable/index.html"><code>Facebook</code></a></li>

  <li><a href="/docs/apache-airflow-providers-ftp/stable/index.html"><code>File Transfer Protocol (FTP)</code></a></li>

  <li><a href="/docs/apache-airflow-providers-git/stable/index.html"><code>Git</code></a></li>

  <li><a href="/docs/apache-airflow-providers-github/stable/index.html"><code>GitHub</code></a></li>

  <li><a href="/docs/apache-airflow-providers-google/stable/index.html"><code>Google</code></a></li>

  <li><a href="/docs/apache-airflow-providers-grpc/stable/index.html"><code>gRPC</code></a></li>

  <li><a href="/docs/apache-airflow-providers-hashicorp/stable/index.html"><code>Hashicorp</code></a></li>

  <li><a href="/docs/apache-airflow-providers-http/stable/index.html"><code>Hypertext Transfer Protocol (HTTP)</code></a></li>

  <li><a href="/docs/apache-airflow-providers-cloudant/stable/index.html"><code>IBM Cloudant</code></a></li>

  <li><a href="/docs/apache-airflow-providers-ibm-db2/stable/index.html"><code>IBM Db2</code></a></li>

  <li><a href="/docs/apache-airflow-providers-ibm-mq/stable/index.html"><code>IBM MQ</code></a></li>

  <li><a href="/docs/apache-airflow-providers-influxdb/stable/index.html"><code>Influx DB</code></a></li>

  <li><a href="/docs/apache-airflow-providers-informatica/stable/index.html"><code>Informatica</code></a></li>

  <li><a href="/docs/apache-airflow-providers-imap/stable/index.html"><code>Internet Message Access Protocol (IMAP)</code></a></li>

  <li><a href="/docs/apache-airflow-providers-jdbc/stable/index.html"><code>Java Database Connectivity (JDBC)</code></a></li>

  <li><a href="/docs/apache-airflow-providers-jenkins/stable/index.html"><code>Jenkins</code></a></li>

  <li><a href="/docs/apache-airflow-providers-keycloak/stable/index.html"><code>Keycloak</code></a></li>

  <li><a href="/docs/apache-airflow-providers-microsoft-azure/stable/index.html"><code>Microsoft Azure</code></a></li>

  <li><a href="/docs/apache-airflow-providers-microsoft-mssql/stable/index.html"><code>Microsoft SQL Server (MSSQL)</code></a></li>

  <li><a href="/docs/apache-airflow-providers-microsoft-psrp/stable/index.html"><code>Microsoft PowerShell Remoting Protocol (PSRP)</code></a></li>

  <li><a href="/docs/apache-airflow-providers-microsoft-winrm/stable/index.html"><code>Microsoft Windows Remote Management (WinRM)</code></a></li>

  <li><a href="/docs/apache-airflow-providers-modal/stable/index.html"><code>Modal</code></a></li>

  <li><a href="/docs/apache-airflow-providers-mongo/stable/index.html"><code>MongoDB</code></a></li>

  <li><a href="/docs/apache-airflow-providers-mysql/stable/index.html"><code>MySQL</code></a></li>

  <li><a href="/docs/apache-airflow-providers-neo4j/stable/index.html"><code>Neo4j</code></a></li>

  <li><a href="/docs/apache-airflow-providers-odbc/stable/index.html"><code>ODBC</code></a></li>

  <li><a href="/docs/apache-airflow-providers-openai/stable/index.html"><code>OpenAI</code></a></li>

  <li><a href="/docs/apache-airflow-providers-openfaas/stable/index.html"><code>OpenFaaS</code></a></li>

  <li><a href="/docs/apache-airflow-providers-openlineage/stable/index.html"><code>OpenLineage</code></a></li>

  <li><a href="/docs/apache-airflow-providers-opensearch/stable/index.html"><code>Open Search</code></a></li>

  <li><a href="/docs/apache-airflow-providers-opsgenie/stable/index.html"><code>Opsgenie</code></a></li>

  <li><a href="/docs/apache-airflow-providers-oracle/stable/index.html"><code>Oracle</code></a></li>

  <li><a href="/docs/apache-airflow-providers-pagerduty/stable/index.html"><code>Pagerduty</code></a></li>

  <li><a href="/docs/apache-airflow-providers-papermill/stable/index.html"><code>Papermill</code></a></li>

  <li><a href="/docs/apache-airflow-providers-pgvector/stable/index.html"><code>PgVector</code></a></li>

  <li><a href="/docs/apache-airflow-providers-pinecone/stable/index.html"><code>Pinecone</code></a></li>

  <li><a href="/docs/apache-airflow-providers-postgres/stable/index.html"><code>PostgreSQL</code></a></li>

  <li><a href="/docs/apache-airflow-providers-presto/stable/index.html"><code>Presto</code></a></li>

  <li><a href="/docs/apache-airflow-providers-qdrant/stable/index.html"><code>Qdrant</code></a></li>

  <li><a href="/docs/apache-airflow-providers-redis/stable/index.html"><code>Redis</code></a></li>

  <li><a href="/docs/apache-airflow-providers-salesforce/stable/index.html"><code>Salesforce</code></a></li>

  <li><a href="/docs/apache-airflow-providers-samba/stable/index.html"><code>Samba</code></a></li>

  <li><a href="/docs/apache-airflow-providers-segment/stable/index.html"><code>Segment</code></a></li>

  <li><a href="/docs/apache-airflow-providers-sendgrid/stable/index.html"><code>Sendgrid</code></a></li>

  <li><a href="/docs/apache-airflow-providers-sftp/stable/index.html"><code>SFTP</code></a></li>

  <li><a href="/docs/apache-airflow-providers-singularity/stable/index.html"><code>Singularity</code></a></li>

  <li><a href="/docs/apache-airflow-providers-slack/stable/index.html"><code>Slack</code></a></li>

  <li><a href="/docs/apache-airflow-providers-smtp/stable/index.html"><code>SMTP</code></a></li>

  <li><a href="/docs/apache-airflow-providers-snowflake/stable/index.html"><code>Snowflake</code></a></li>

  <li><a href="/docs/apache-airflow-providers-sqlite/stable/index.html"><code>SQLite</code></a></li>

  <li><a href="/docs/apache-airflow-providers-ssh/stable/index.html"><code>SSH</code></a></li>

  <li><a href="/docs/apache-airflow-providers-standard/stable/index.html"><code>Standard</code></a></li>

  <li><a href="/docs/apache-airflow-providers-tableau/stable/index.html"><code>Tableau</code></a></li>

  <li><a href="/docs/apache-airflow-providers-telegram/stable/index.html"><code>Telegram</code></a></li>

  <li><a href="/docs/apache-airflow-providers-teradata/stable/index.html"><code>Teradata</code></a></li>

  <li><a href="/docs/apache-airflow-providers-trino/stable/index.html"><code>Trino</code></a></li>

  <li><a href="/docs/apache-airflow-providers-vertica/stable/index.html"><code>Vertica</code></a></li>

  <li><a href="/docs/apache-airflow-providers-vespa/stable/index.html"><code>Vespa</code></a></li>

  <li><a href="/docs/apache-airflow-providers-weaviate/stable/index.html"><code>Weaviate</code></a></li>

  <li><a href="/docs/apache-airflow-providers-yandex/stable/index.html"><code>Yandex</code></a></li>

  <li><a href="/docs/apache-airflow-providers-ydb/stable/index.html"><code>YDB</code></a></li>

  <li><a href="/docs/apache-airflow-providers-zendesk/stable/index.html"><code>Zendesk</code></a></li>

</ul>

{{< /rawhtml >}}


### Suspended providers

Suspended providers get no new releases and aren't tested against new Airflow versions, though
their released versions still work. A community member can resume one by fixing the reason it was
suspended, and one that stays suspended for long may be removed. The
[provider lifecycle](https://github.com/apache/airflow/blob/main/PROVIDERS.rst#community-providers-lifecycle)
has the details.

No providers are suspended right now.

### Removed providers

These providers are no longer in the codebase. Their released versions still work. The
[provider lifecycle](https://github.com/apache/airflow/blob/main/PROVIDERS.rst#community-providers-lifecycle)
has the details.

{{< rawhtml >}}

<ul class="list-providers removed">

  <li><a href="/docs/apache-airflow-providers-apache-sqoop/stable/index.html"><code>Apache Sqoop</code></a></li>

  <li><a href="/docs/apache-airflow-providers-daskexecutor/stable/index.html"><code>Dask Executor</code></a></li>

  <li><a href="/docs/apache-airflow-providers-plexus/stable/index.html"><code>Plexus</code></a></li>

  <li><a href="/docs/apache-airflow-providers-qubole/stable/index.html"><code>Qubole</code></a></li>

  <li><a href="/docs/apache-airflow-providers-tabular/stable/index.html"><code>Tabular</code></a></li>

</ul>

{{< /rawhtml >}}
