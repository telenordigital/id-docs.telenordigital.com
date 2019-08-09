---
title: Use Telenor ID as id provider
description: Detailed information about switching between id provider brands
collection: integrate-android-sdk
order: 8
lunr: true
nav_sort: 8
nav_groups:
  - primary
tags:
  - sdk
  - android
  - guide
  - usage
  - user
  - state
  - how to
  - Telenor ID
  - id provider
---


## Multiple ID providers

The SDK starting from version 2.1 allows to choose between multiple ID providers. Currently supported providers are CONNECT ID and Telenor ID. If you are updating to version 2.1 from older versions without any code change - CONNECT ID will be used as a default id provider.

## Selecting new ID provider

When initializing SDK you can select an ID provider that you want to use from `IdProvider` class. Note, that you cannot use multiple ID providers at the same time.

```java
ConnectSdk.sdkInitialize(getApplicationContext(), IdProvider.TELENOR_ID, true);
```

## Using Telenor ID as an ID provider

While using Telenor ID as an ID provider we require to follow new style guidelines. You have to use `@style/ConnectTheme.TelenorId` as a default style for `ConnectLoginButton`.

The full minimum code for the button will look next way:

```XML
<com.telenor.connect.ui.ConnectLoginButton
        android:id="@+id/login_button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:theme="@style/ConnectTheme.TelenorId"
        />
```

You can try it out in example application.

## Adding "What is Telenor ID" page

The SDK starting from version 2.1 also adds a new view component, for displaying the description about Telenor ID. To enable it, use `com.telenor.connect.ui.ConnectAboutTextView` in your layout files.
