---
title: Check user is signed in
description: Using the CONNECT iOS SDK to check if a user is signed in
collection: integrate-ios-sdk
order: 2
lunr: true
nav_sort: 2
nav_groups:
  - primary
tags:
  - sdk
  - ios
  - guide
  - basic
  - usage
  - access
  - refresh
  - token
---

```swift
// Check if user is signed in
let userIsSignedIn = oauth2Module.oauth2Session.refreshTokenIsNotExpired()

```
