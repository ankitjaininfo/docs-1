---
title: Enterprise deployment patterns
description: Patterns supporting complex enterprise use cases
position: 55
hideInThisSectionHeader: true
---

Octopus has evolved over the years to support ever growing teams and to accommodate more complex environments. Many enterprise customers find their team structures and external customer access requirements are best served when Octopus instances are partitioned into many spaces or with many Octopus instances.

This raises the question of how spaces and separate Octopus instances can be used independently while also allowing the centralized management of shared configuration. The patterns described in this documentation provide examples and practical guidance on how to scale Octopus across multiple spaces and instances while maintaining centralized control.