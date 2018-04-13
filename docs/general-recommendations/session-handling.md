---
title: Session handling
description: General recommendations
collection: general-recommendations
order: 2
lunr: true
nav_sort: 2
nav_groups:
  - primary
nav_subgroup: false
tags:
  - recommendations
---
### On mobile

How long a user is logged in after having signed in via CONNECT is handled by your service. A common “stay signed in” duration is 90 days, after which the user has to sign in again. Depending on the sensitivity of your data, this period can be made shorter or longer. The mobile device is considered personal.

### On desktop

A desktop device is considered less personal. We therefore recommend to make use of our “Stay signed in” functionality. Signing in with the box unchecked will result in the user being signed out when the browser window is closed.
-   Your service can decide if it should be checked or unchecked by default.
-   The users can decide if they want to stay signed in.
*It is important that your service honours this decision.*

## Session handling without SSO

### Sign in

-   Stay signed in option visible AND not checked

*placeholder-image*

-   Stay signed in option not visible OR checked

*placeholder-image*

### Sign out

-   Stay signed in option status irrelevant

*placeholder-image*


## Session handling with SSO

Possible on standalone browsers or in-app browser tab

### Sign in

-   SSO active for both services | Stay signed in visible AND not checked

*placeholder-image*

-   SSO active for service 1, SSO not active for service 2 | Stay signed not visible OR checked

*placeholder-image*

-   SSO not active for service 1, SSO active for service 2 | Stay signed not visible OR checked

*placeholder-image*

-   SSO active for one or both services | Stay signed in visible AND not checked

*placeholder-image*


### Sign out

-   SSO active for both services | Stay signed in visible AND not checked

*placeholder-image*

-   SSO active for one or both services | Stay signed in visible AND not checked

*placeholder-image*
