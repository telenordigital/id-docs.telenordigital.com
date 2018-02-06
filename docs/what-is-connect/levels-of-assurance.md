---
title: Various security levels (Levels of assurance)
description: Features of CONNECT
lunr: true
nav_sort: 3
nav_groups:
  - primary
nav_subgroup: false
tags:
  - features
---
CONNECT offers 2 main security levels for your service.

- Mobile phone authentication (LoA1)
- Password authentication (LoA2) Different levels can be used for different areas of your service - more about Security *All security levels work both on mobile data and on WiFi.*

**Mobile phone authentication**
With this security level the users get access when they are in possession of their phone. Depending on if the users phone is connected to the internet via mobile data or via WiFi, different flows apply.

- On mobile data (Telenor subscribers only)*
  1. Automatic detection of the phone number and automatic authentication of the user. No user interaction is required.
- On WiFi (or mobile data for non-Telenor subscribers)*
  1. The user has to provide the phone number.
  2. A one time verification code is sent via SMS.
  3. The user has to enter the verification code.

´* with the Android SDK, automatic detection of the phone number can also be made available when the user is both on mobile data and on WiFi (webview only)

**Password authentication**
For this authentication method the user needs to enter a password. As a user name both phone number and email address can be used. For this level of security the user flows on mobile data and on WiFi are very similar.

- On mobile data (Telenor network)
  1. Automatic detection of the phone number.
  2. Then the user has to provide only the password.
- On WiFi (or mobile data on non-Telenor network)
  1. The user has to first enter the phone number or email address.
  2. Then the user has to provide the password.
