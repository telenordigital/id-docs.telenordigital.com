---
title: Use Telenor ID as ID provider
description: Detailed information about switching between ID provider brands
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
  - ID provider
---


## Multiple ID providers

Starting from version 2.1, the SDK allows to choose between multiple ID providers. Currently supported providers are CONNECT ID and Telenor ID. If you are updating to version 2.1 from older versions without any code change - CONNECT ID will be used as a default ID provider.

## Selecting new ID provider

When initializing the SDK, you must select an ID provider that was decided for your country. You should use the `IdProvider` class for that purpose. 

##### Important note

You cannot use multiple ID providers at the same time. Our infrastructure allows only for one ID provider to be used in each country, which means that all clients in one country need to use the same provider. Currently supported providers are CONNECT ID and Telenor ID. During the fall, CONNECT ID will be disabled for all countries except Norway.

```java
ConnectSdk.sdkInitialize(getApplicationContext(), IdProvider.TELENOR_ID, true);
```

## Using Telenor ID as an ID provider

While using Telenor ID as an ID provider, we require you to follow a new style guideline. You have to use `@style/ConnectTheme.TelenorId` as a default style for `ConnectLoginButton`.

The full minimum code for the button will look like this:

```XML
<com.telenor.connect.ui.ConnectLoginButton
        android:id="@+id/login_button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:theme="@style/ConnectTheme.TelenorId"
        />
```

You can try it out in the example application.

## Adding "What is Telenor ID" page

`What is Telenor ID page`, is a link below the sign-in button on the client's sign-in page. Through user research, we have found that this link is important to include to explain to the users what Telenor ID is and why they need to use it to sign in to your app.

Starting from version 2.1, the SDK adds a new view component for displaying the description about Telenor ID. To enable it, use `com.telenor.connect.ui.ConnectAboutTextView` in your layout files.
