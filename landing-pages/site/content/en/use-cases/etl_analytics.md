---
title: "ETL/ELT"
linkTitle: "ETL/ELT"
usecasedescription:
    text: "Airflow is the open source standard for orchestrating ETL/ELT data pipelines."
blocktype: use-case
---

# Use Airflow for ETL/ELT pipelines

Extract-Transform-Load (ETL) and Extract-Load-Transform (ELT) data pipelines are the most common use case for Apache Airflow. 90% of respondents in the 2023 Apache Airflow survey are using Airflow for ETL/ELT to power analytics use cases.

The video below shows a simple ETL/ELT pipeline in Airflow that extracts climate data from a CSV file, as well as weather data from an API, runs transformations and then loads the results into a database to power a dashboard.


{{< usecase-video id="ljBU_VyihVQ" placeholder="placeholder_etl_video.png" >}}

## Why use Airflow for ETL/ELT pipelines?

Airflow is the de-facto standard for defining ETL/ELT pipelines as Python code. Airflow is popular for this use case because it is:

- **Tool agnostic**: Airflow can be used to orchestrate ETL/ELT pipelines for any data source or destination.
- **Extensible**: There are many Airflow modules available to connect to any data source or destination, and you can write your own custom operators and hooks for specific use cases.
- **Dynamic**: In Airflow you can define [dynamic tasks](https://airflow.apache.org/docs/apache-airflow/stable/authoring-and-scheduling/dynamic-task-mapping.html), which serve as placeholders to adapt at runtime based on changing input.
- **Scalable**: Airflow can be scaled to handle infinite numbers of tasks and workflows, given enough computing power.


## Airflow features for ETL/ELT pipelines

Airflow has several key features that make it a great option for ETL/ELT:

- **[Datasets](https://airflow.apache.org/docs/apache-airflow/stable/authoring-and-scheduling/datasets.html)**: In Airflow you can schedule your DAGs in a data-driven way, based on updates to Datasets from any other task in your Airflow instance.
- **[Object Storage](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/objectstorage.html)**: The Airflow Object Storage is an abstraction over the [Path API](https://docs.python.org/3/library/pathlib.html) that simplifies interaction with object storage systems such as Amazon S3, Google Cloud Storage, and Azure Blob Storage.
- **[Airflow providers](https://airflow.apache.org/docs/apache-airflow-providers/index.html)**: Airflow providers extend core Airflow functionality with additional modules to simplify integration with popular data tools. You can find a list of active providers [here](https://airflow.apache.org/docs/#active-providers).
