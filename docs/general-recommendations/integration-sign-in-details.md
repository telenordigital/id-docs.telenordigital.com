---
title: Integration details for handling sign in
description: General recommendations
collection: general-recommendations
order: 1
lunr: true
nav_sort: 1
nav_groups:
  - primary
nav_subgroup: false
tags:
  - recommendations
---
**Native app**

**Entry point**


CONNECT sign in button
-   3 colour schemes (dark gray/light gray/blue)
-   Localised language with clear call to action
-   Assets available for Android, iOS and web (PNG, SVG, CSS)

Mockup


-   On startup

Mockup


-   Link
  To reauthenticate or to go from one security level to the next.

**HTML flow integration**

The recommended way of integrating CONNECT in a native app is to use an “in-app browser tab” like Chrome Custom Tabs on Android or Safari View Controller on iOS.

**In-app browser tab**


-   Single Sign On (SSO)
-   Autofilling of previously used phone number or email address
-   Use of Android/iOS/external password manager

Mockup *Android - Chrome Custom Tabs*

Mockup *iOS - Safari View Controller*

**Webview**


-   Automatic PIN code reading (Android, after user consent)
-   Automatic detection of phone number when device is both on WiFi and mobile data

Mockup

**Browser app**

**Entry point**


CONNECT sign in button
-   3 colour schemes (dark gray/light gray/blue)
-   Localised language with clear call to action
-   Assets available for Android, iOS and web (PNG, SVG, CSS)

Mockup


-   Link To reauthenticate or to go from one security level to the next.

**Mobile**

Redirect in same/new tab

Mockup

**Desktop**

Pop-up in new tab


-   User stays in the context of your service by keeping the entry point in the background
-   Note: This is how Google and Facebook does it for 3rd parties

Mockup

Redirect in same tab

Mockup
