---
title: Single sign on
description: Features of CONNECT
collection: connect-features
order: 1
lunr: true
nav_sort: 2
nav_groups:
  - primary
tags:
  - features
---
To get the best cross-service experience and conversion rate, we recommend enabling Single Sign On (SSO).

**Benefits**

For the user:

-   Instant access to all follow-up services on the same device, after having signed in to one service
-   Instant access to CONNECT’s account management (My CONNECT account)

For the service:

-   Increase in conversions — no more bounces for follow-up services
-   Less issues with keeping user sessions, when pushing app updates

For the Business Units:

-   Increase in conversions among all services
-   Faster uptake for e-channels
-   Faster uptake for new services

**Requirements**

For Single Sign On to work you have to do the following:

-   General Activate Single Sign On for your service
-   On mobile Integrate CONNECT by using an in-app browser tab like
    -   Android - Chrome Custom Tabs
    -   iOS - Safari View Controller
-   On desktop User has to check “Stay signed in”

**Example scenarios**

SSO - Scenario 1

-   Services on LoA1 and no additional claims
-   First on mobile data
-   Follow up on Wifi or mobile data
-   SSO session not older than a specific age, set by follow up service
-   Existing CONNECT user
(placeholder-image)

*First service on device (SSO session created)*

*placeholder-image*

*Follow up services on same device (SSO session used)*
SSO - Scenario 2

-   Services on LoA2 and no additional claims
-   First on Wifi
-   Follow up on Wifi or mobile data
-   SSO session not older than a specific age, set by follow up service
-   Existing CONNECT user
(placeholder-image)

*First service on device (SSO session created)*

*placeholder-image*

 *Follow up services on same device (SSO session used)*
Re-authentication

-   Follow up service on different LoA level, additional claims or with user prompt
-   First on Wifi
-   Follow up on Wifi or mobile data
-   SSO session not older than a specific age, set by follow up service
-   Existing CONNECT user
*placeholder-image*

 *First service on device (SSO session created)*

 *placeholder-image*

 *Follow up services on same device (SSO session used)*
