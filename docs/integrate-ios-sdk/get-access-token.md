---
title: Get access token
description: Using the CONNECT iOS SDK to get a valid access token
collection: integrate-ios-sdk
order: 3
lunr: true
nav_sort: 3
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
oauth2Module.requestAccess { (accessToken: AnyObject?, error: NSError?) in
    guard error == nil else {
        // handle error
        return
    }
    
    // use access token
    print("accessToken=\(String(describing: accessToken))")
}

```
