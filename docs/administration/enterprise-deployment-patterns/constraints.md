---
title: Octopus constraints
description: Details on the constraints on an Octopus instance that impact how Octopus can scale
position: 1
---

Octopus is subject to constraints that factor into determining how it is scaled within an enterprise.

## Task Caps

Every task run by an Octopus node is placed within a shared task queue. This queue is shared between all projects, runbooks, and spaces.

Octopus has no built-in functionality to prioritize, weight, or reorder the task queue.

This means that teams sharing an Octopus instance or HA cluster are all competing for use of the shared task queue. It is possible for one team to schedule many tasks, which means subsequent tasks can take some time to process. This is the "noisy neighbor" problem.

## Database Latency

Each Octopus installation requires a low latency connection to the database. This means Octopus nodes must be collocated in a single region or location.

Geographically disperse teams that require Octopus to be physically close to their users or targets are therefore required to manage multiple Octopus installations.

## Import/Export

The import/export feature facilitate teams moving to cloud or other on-premises Octopus installations, or between spaces.

[The import/export process is not designed for promoting changes between Octopus installations or spaces](https://www.octopus.com/docs/projects/export-import#scenarios). Notably, a project is not imported if it already exists.

The import/export tool also does not affect many Octopus resources. For example, it will not create targets, workers, triggers, general Octopus settings, insights dashboards etc.

This means the import/export feature is not a suitable solution for maintaining shared resources across Octopus spaces r installations.

## Terraform Provider

The Terraform Provider allows an Octopus installation to be configured via Terraform. It enables an Infrastructure as Code (IaC) approach to managing Octopus.

[As noted on the Unsupported Configuration as Code Scenarios documentation](https://www.octopus.com/docs/projects/version-control/unsupported-config-as-code-scenarios#syncing-multiple-instances), the provider is the recommended solution for keeping multiple Octopus installations in sync.

## Step Templates

Step templates provide a way to share a preconfigured step across multiple projects. They have versioning built in, the ability to selectively update projects that use old versions, and can be easily shared via the community step template library.

However, step templates are limited to single steps, and so have no ability to coordinate multiple related steps to perform more complex operations.

## Config as code

Config-as-Code allows deployments to persist their configuration in a Git repository. This allows changes to be managed in branches and enables a pull-request workflow for implementing changes.

[Config-as-Code does not allow multiple projects to reference the same directory in a Git repository](https://octopus.com/docs/projects/version-control/unsupported-config-as-code-scenarios#syncing-multiple-instances). This means Config-as-Code has no intrinsic functionality to share configuration between projects.

## Octopus DSC

[Octopus provides a desired state configuration module](https://octopus.com/docs/administration/managing-infrastructure/octopus-dsc) to manage the installation of an Octopus server and tentacles. It can also manage spaces and certificates.

However, it does not manage resources like projects, runbooks, tenants etc. Nor does it manage the Linux Octopus installation.

## Helm chart

Octopus provides a Helm chart to install an Octopus instance in a Kubernetes cluster. The Helm chart exposes variables to configure the initial administrator credentials, master key, an API key, volume mounts, and define the license key.

The Helm chart does not expose the ability to configure any other Octopus resources, and so does not provide a solution for configuring Octopus beyond what is required to have the instance start and connect to a database.
