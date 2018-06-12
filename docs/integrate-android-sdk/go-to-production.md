---
title: Go to production
description: How to set the CONNECT Android SDK to target the production environment
collection: integrate-android-sdk
order: 7
lunr: true
nav_sort: 7
nav_groups:
  - primary
tags:
  - sdk
  - android
  - guide
  - setup
  - production
  - staging
  - how to
---

## Target the production environment
To target the production environment initialize the SDK with the `useStagingEnvironment` parameter set to `false`:

```java
ConnectSdk.sdkInitialize(getApplicationContext(), false);
```

Reference & explanation: <a target="_blank" href="http://docs.telenordigital.com/connect/environments.html">Environments</a><i class="material-icons md-18">open_in_new</i>
