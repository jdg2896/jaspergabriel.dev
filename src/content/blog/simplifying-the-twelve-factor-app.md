---
title: "A Developer's Journal: Simplifying the Twelve-Factor App"
description: "A simplified breakdown of the 12-factor app methodology — codebase, config, processes, and deployment best practices."
pubDate: 2023-12-03
tags: ["tech"]
originalUrl: "https://dev.to/jdg2896/a-developers-journal-simplifying-the-twelve-factor-app-25o"
---


## Introduction

In my journey of constantly learning, while going through week 7 of the [AWS Build Accelerator 2023](https://aws.amazon.com/startups/accelerators/build) on software engineering best practices, I encountered the concept of the [Twelve-Factor App](https://12factor.net/). Naturally, I was curious and read the document to learn about the best practices derived from the authors' experiences in building, deploying, and scaling production applications. 

If you're a developer looking for a quick read on what the Twelve-Factor app is, then you've come to the right place.

In this article, I try to simplify the concepts that I've read from the Twelve-Factor App. I've also included high-level illustrations that use practical examples and AWS services.

Then, let's define what a Twelve-Factor App is.

## What is the Twelve-Factor App?

The [Twelve-Factor App](https://12factor.net/) is a collection of best practices for building scalable applications. These were documented from the experiences and observations of contributors from [Heroku](https://www.heroku.com/). 

According to them, **Twelve-Factor Apps**:
- **automate setup processes** to minimize friction when onboarding new developers
- are **portable** between different execution environments
- can be deployed on **modern cloud providers** such as AWS, GCP, and Azure.
- **minimize differences** between development and production environments and **use CI/CD**.
- can **scale out** without significant changes to the architecture.

To make our applications compliant with the definition of Twelve-Factor Apps, there are twelve guidelines to consider.

## 1. Codebase

### *One codebase tracked in revision control, many deploys*

#### A Twelve-Factor App is:
- tracked in a [version control system (VCS)](https://en.wikipedia.org/wiki/Version_control).
    - [Git](https://git-scm.com/)
    - [Mercurial](https://www.mercurial-scm.org/)
    - [Subversion](https://subversion.apache.org/)
- correlated to **one codebase**.
- deployed to different environments using the same codebase.
    - Production
    - Staging
    - Local development

![Twelve-Factor App Codebase](https://res.cloudinary.com/dlieqpdfd/image/upload/v1701611347/Twelve-Factor%20App/codebase-1_twhsl2.png)

#### A Twelve-Factor App **does not**:
- have **multiple codebases**.
    - Multiple codebases are **distributed systems**.
    - Each **component** of the distributed system is an **app**.
- share the **same code** with **different apps**.
    - Use shared libraries for sharing code to multiple apps.

![Twelve-Factor App Distributed System](https://res.cloudinary.com/dlieqpdfd/image/upload/v1701611347/Twelve-Factor%20App/codebase-2_dnrdkl.png)

## 2. Dependencies

### *Explicitly declare and isolate dependencies*

#### A Twelve-Factor App:
- explicitly declare dependencies.
- uses package managers.
  - [npm](https://www.npmjs.com/) (JavaScript)
  - [pip](https://pypi.org/project/pip/) (Python)
- doesn't rely on system-wide packages.

> Not relying on system-wide packages means that you should declare all dependencies needed to run your application. 
>
> An alternative here is using [Docker](https://www.docker.com/) to build your application, then you can be sure that your app has access to packages in the operating system.

By following the guidelines on app dependencies, developers can run the app locally with only the language runtime and dependency manager (JavaScript and npm, Python and pip).

![Twelve-Factor App Dependencies](https://res.cloudinary.com/dlieqpdfd/image/upload/v1701611347/Twelve-Factor%20App/dependencies_lonrj8.png)

## 3. Config

### *Store config in the environment*

#### A Twelve-Factor App:
- stores configs in the environment (`.env` file).
- has **different configs** for each deployment. 
- has **no hard-coded configs** in the codebase.
  - A codebase doesn't have hard-coded configs if you can **open-source** it without leaking credentials.

![Twelve-Factor App Config](https://res.cloudinary.com/dlieqpdfd/image/upload/v1701611347/Twelve-Factor%20App/config_fnvchg.png)

## 4. Backing services

### *Treat backing services as attached resources*

#### A Twelve-Factor App can:
- use **local** and **third-party services**.
  - The app can use a local [PostgreSQL](https://www.postgresql.org/) and has no issues using a cloud service like [Amazon RDS](https://aws.amazon.com/rds/).
- add, remove, or replace backing services as needed.
  - If there is a database issue, you can spin up a new database restored from a recent backup.
  - There should be no code changes needed.

Backing services are used by the app over the network.

#### Examples of backing services are:
- **Data Stores** ([Amazon RDS](https://aws.amazon.com/rds/), [MySQL](https://www.mysql.com/), [PostgreSQL](https://www.postgresql.org/))
- **Messaging/Queueing Systems** ([Amazon SQS](https://aws.amazon.com/sqs/), [RabbitMQ](https://www.rabbitmq.com/), [Beanstalkd](https://beanstalkd.github.io/))
- **SMTP** ([Amazon SES](https://aws.amazon.com/ses/))
- **Caching Systems** ([Amazon ElastiCache](https://aws.amazon.com/elasticache/), [Memcached](https://memcached.org/), [Redis](https://redis.io/))

![Twelve-Factor App Backing Services](https://res.cloudinary.com/dlieqpdfd/image/upload/v1701611346/Twelve-Factor%20App/backing-services_xw0yy6.png)

## 5. Build, release, run

### *Strictly separate build and run stages*

The **Build stage** converts code into an executable bundle, fetches dependencies, and compiles binaries and assets.
- A build is triggered by developers when **new code is deployed**.
- The build stage allows **complex workflows** such as adding **unit and integration tests**.

The **Release stage** combines the build with deployment configs.
- A release should have a **unique release ID**, with a timestamp, or an incrementing number.
- Deployment tools have **release management tools**, where you can roll back to a previous release.

The **Runtime stage** runs the app in the execution environment.

![Twelve-Factor App Build, Release, Run](https://res.cloudinary.com/dlieqpdfd/image/upload/v1701611347/Twelve-Factor%20App/build-release-run_vxjhht.png)

## 6. Processes

### *Execute the app as one or more stateless processes*

#### A Twelve-Factor App:
- is **stateless**.
- never assumes that anything cached will be available for a future request.
- **stores data** that needs to be persisted in a **stateful backing service** like a database.
- **stores session state** in a **session store** like [Memcached](https://memcached.org/) or [Redis](https://redis.io/).

> The memory or filesystem can be used as cache for a single transaction. 

![Twelve-Factor App Processes](https://res.cloudinary.com/dlieqpdfd/image/upload/v1701611346/Twelve-Factor%20App/processes_fvfvzh.png)

## 7. Port binding

### *Export services via port binding*

#### A Twelve-Factor App:
- exposes HTTP endpoints by port binding.
- listens to incoming requests from the port.

With port binding, an app can be the backing service for another app by providing the backing service URL. For example, a frontend app using a backend app. 

![Twelve-Factor App Port Binding](https://res.cloudinary.com/dlieqpdfd/image/upload/v1701611346/Twelve-Factor%20App/port-binding_vxdlrk.png)

## 8. Concurrency

### *Scale out via the process model*

#### A Twelve-Factor App:
- scales out (horizontal scaling) when needing more capacity.
- handles diverse workloads.
    - HTTP requests are handled by a web process.
    - Long-running tasks are handled by a worker process.

**Scaling out (horizontal scaling)** is the preferred scaling solution since if you follow the guidelines of the Twelve-Factor App, your application can support more requests by **adding more instances**.

**Scaling up (Vertical scaling)** is limited in scalability since it only **upgrades the instance configuration** (memory, CPU, GPU), not to mention you also need to stop that instance to perform the upgrade. 

When building scalable applications, a **mix of scaling up and scaling out** is ideal. 

![Twelve-Factor App Concurrency](https://res.cloudinary.com/dlieqpdfd/image/upload/v1701611348/Twelve-Factor%20App/concurrency_pxpo5u.png)

## 9. Disposability

### *Maximize robustness with fast startup and graceful shutdown*

#### A Twelve-Factor App:
- can be started or stopped quickly.
- minimizes startup time.
- shuts down gracefully.
- can handle unexpected, non-graceful terminations.

For shutting down gracefully:
  - process current requests before shutting down.
  - worker process should return unprocessed jobs to the queue.
  - jobs should be [reentrant](https://en.wikipedia.org/wiki/Reentrancy_(computing)) and workers should be [idempotent](https://en.wikipedia.org/wiki/Idempotence).

![Twelve-Factor App Disposability](https://res.cloudinary.com/dlieqpdfd/image/upload/v1701611348/Twelve-Factor%20App/disposability_wwmk6w.png)

## 10. Dev/prod parity

### *Keep development, staging, and production as similar as possible*

#### A Twelve-Factor App:
- supports **continuous deployment**.
- minimizes time gaps, personnel gaps, and tools gaps.
- has **similar backing services** for development and production.

> Backing services like database, queue, and cache should have dev/prod parity.


#### Types of development process gaps:
- **Time gap** - A developer works on a feature or bug fix, which takes time.
- **Personnel gap** - A developer writes code, while another developer deploys it.
- **Tools gap** - Different tools are used in development and production.

#### To **minimize development process gaps** and **support continuous deployment**:
- Developers should be able to **write code** and **deploy** it after a **few minutes** or a **few hours**.
- Developers are closely involved in **deploying** and **observing their code** in **production**
- Development and production should be **as similar as possible**.

> Tools like [Docker](https://www.docker.com/) and [Vagrant](https://www.vagrantup.com/) can be used to allow local environments to mimic production environments.

![Twelve-Factor App Dev/Prod Parity](https://res.cloudinary.com/dlieqpdfd/image/upload/v1701611348/Twelve-Factor%20App/dev-prod-parity_r7gwow.png)

## 11. Logs

### *Treat logs as event streams*

#### A Twelve-Factor App:
- doesn't route or store it's output logs.
- doesn't write or manage log files.
- **stream** logs to different services for **analysis** and **monitoring**.

![Twelve-Factor App Logs](https://res.cloudinary.com/dlieqpdfd/image/upload/v1701611348/Twelve-Factor%20App/logs_htc9r8.png)

## 12. Admin processes

### *Run admin/management tasks as one-off processes*

#### A Twelve-Factor App:
- runs admin processes in identical environments.
- deploys admin process code along with the application code.

#### Admin processes can include:
- running database migrations.
- running console commands via SSH.
- running one-time scripts (like fixing bad records).

![Twelve-Factor App Admin Processes](https://res.cloudinary.com/dlieqpdfd/image/upload/v1701611346/Twelve-Factor%20App/admin-processes_finn2c.png)

## Conclusion

To recap, we've learned how we can make our applications more secure and scalable by following the [Twelve-Factor App](https://12factor.net/) guidelines.

The Twelve-Factor App consists of:
1. **Codebase** – One codebase tracked in revision control, many deploys
2. **Dependencies** – Explicitly declare and isolate dependencies
3. **Configuration** – Store configuration in the environment
4. **Backing services** – Treat backing services as attached resources
5. **Build, release, run** – Strictly separate build and run stages
6. **Processes** – Execute the app as one or more stateless processes
7. **Port binding** – Export services via port binding
8. **Concurrency** – Scale-out via the process model
9. **Disposability** – Maximize robustness with fast start-up and graceful shutdown
10. **Dev/prod parity** – Keep development, staging, and production as similar as possible
11. **Logs** – Treat logs as event streams
12. **Admin processes** – Run admin/management tasks as one-off processes

I recommend reading through the [Twelve-Factor App](https://12factor.net/) since it's always a good thing to read through the source material. It should take you about an hour or two to finish reading the entire document. 

Thank you for reading and if you have any questions or feedback, feel free to comment or connect with me [here](https://linktr.ee/jdg2896).

## Further reading
- [The Twelve-Factor App](https://12factor.net/)
- [Applying the Twelve-Factor App Methodology to Serverless Applications](https://aws.amazon.com/blogs/compute/applying-the-twelve-factor-app-methodology-to-serverless-applications/)
- [AWS and the 12 Factor App Methodology: Maximizing Efficiency and Scalability](https://repost.aws/articles/ARYSH2AsjKRnaXhRHrn0HDgA/aws-and-the-12-factor-app-methodology-maximizing-efficiency-and-scalability)
- [Twelve-factor app development on Google Cloud](https://cloud.google.com/architecture/twelve-factor-app-development-on-gcp)
- [Creating cloud-native applications: 12-factor applications](https://developer.ibm.com/articles/creating-a-12-factor-application-with-open-liberty/)
