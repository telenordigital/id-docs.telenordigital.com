---
title: Client security measures
description: Client security measures
collection: authorization-and-authentication
order: 2
lunr: true
nav_sort: 2
nav_groups:
  - primary
tags:
  - authentication
  - authorization
---
In this document, we present a list of important security measures that need to be taken into
account when implementing clients that integrate towards the authentication and authorization APIs
for CONNECT ID.

## Store secrets securely

-   __Client ID__ - The client ID is considered public, and there are no requirements on how to store
it.
-   __Client secret__ - _Confidential clients_ (e.g. a web application or a native app with a
server-side component) will get a client secret issued by the authorization server to be used to
authenticate the client to the authorization server. The client secret must be stored in a way that
it is not available for third parties. For instance, a client that is configured to be confidential
that consists of a native app and a server-side component, must only store the client secret in the
server-side component, and not in the native app itself. _Public clients_
will not be issued a client secret by the authorization sever.
This makes it impossible to authenticate the client to the authorization server, and there will
therefore exist restrictions on the functionality available to public clients.
-   __Authorization code__ - This is a short-lived provisional token with one-time usage restriction
for fetching other tokens. The authorization code should not be stored at all, but rather exchanged
for access/refresh/[ID token](id-token.html) as soon as the client gets hold of it.
-   __Access/refresh/ID token__ - The access token must be stored securely, e.g. in the device's
secure storage for pure native apps (public clients).
However, since it is short-lived, it may be kept only in memory.
Refresh and ID tokens and potential service-specific session IDs must be stored securely,
e.g. in the device's secure storage for pure native apps (public clients).
For confidential clients, access, refresh, and ID tokens should only be stored server-side and
out of reach for third parties.
For example, none of these tokens should be stored in cookies.

## Encrypt all communication to and from clients

Encryption could be done e.g. using TLS/SSL (HTTPS). CONNECT only allows use of TLS/SSL (HTTPS) for
requests towards its authorization server and resource servers. Service providers need to make sure
that all other communication to and from the clients, e.g. with service-specific resource servers,
is encrypted appropriately.

## Protect client callback endpoint against CSRF attacks

Clients must protect the redirect URI client callback endpoint against cross-site request forgery
(CSRF) attacks, according to
[section 10.12 in the OAuth specification (RFC 6749)](https://tools.ietf.org/html/rfc6749#section-10.12).
The recommended way to avoid CSRF attacks is to supply a cryptographically random value
in the state parameter for the authorization request and verify it for the response in
the client callback endpoint, ref [client sample code](authorization-examples.html). Please see
[section 10.12](https://tools.ietf.org/html/rfc6749#section-10.12) in the OAuth specification
(RFC 6749) and [section 4.4.1.8](https://tools.ietf.org/html/rfc6819#section-4.4.1.8) in the
OAuth 2.0 Threat Model and Security Considerations specification (RFC 6819) for details.
Note that no confidential data should be passed in the state parameter.

## Validate access token for all access to protected resources

Clients must validate the access token for all access to protected resources,
including its own service-specific protected resources.
As mentioned in the [access token validation](../authorization-and-authentication.html#access-token-validation)
documentation, this should be done according to
[section 7 in the OAuth specification (RFC 6749)](https://tools.ietf.org/html/rfc6749#section-7)
and the [OAuth bearer token usage specification (RFC 6750)](https://tools.ietf.org/html/rfc6750).

## Validate ID token if the openid scope value is used

If the client is requesting an [ID token](id-token.html) by asking for the openid scope value,
the returned ID token must be validated. As mentioned in the
[ID token validation](id-token.html#id-token-validation)
documentation, this should be done according to the
[OpenID Connect Core spec, section 3.1.3.7](http://openid.net/specs/openid-connect-core-1_0.html#IDTokenValidation).

## Recommendation: Use an external browser for authorization request for native apps

Native apps typically have a number of different choices for what kind of browser to use for
redirects to the
[/authorize](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-user-authorization)
endpoint.
Typical choices are:
1.   An external browser (the system browser).
2.   A secure embedded browser that provides sandboxed integration with an external browser.
Examples:
[Safari View Controller](https://developer.apple.com/library/ios/documentation/SafariServices/Reference/SFSafariViewController_Ref/)
on iOS and [Chrome Custom Tabs](https://developer.chrome.com/multidevice/android/customtabs)
on Android.
3.   A less secure embedded browser. Example: WebView.

For native apps on platforms that we do not provide an SDK for, we recommend using an
external browser (i.e. not an embedded browser).
One main reason is that using an embedded browser defeats the purpose of OAuth, which is that
the end user should only supply their credentials directly to the authorization server,
and not to or via the client.

Despite the important security advantages of using an external browser, it is relatively common
to use embedded browsers for third party login in apps.
Apple does even require that a user should be able to log in without opening an external browser,
in order for an app to be accepted for the App Store.
Therefore, an embedded browser has to be used for iOS apps and may be used for apps on other
platforms as well.
If the SDK is not used for an iOS app, we recommend using Safari View Controller, available on
iOS 9 and onward.
If neither the SDK nor an external browser is used for an Android app, we recommend using
Chrome Custom Tabs, available with Chrome 45 on Android 4.1 and onward.

We discourage using WebViews for the following reasons:
*   __Security__ - The app has complete control of the WebView layer, opening up for the possibility
that the end user's credentials are captured by the app (phishing attacks).
When using an external or secure embedded browser, this is much harder to do, since the browser is
run in a process separate from the app which prevents it from getting access to user input.
*   __Trust__ - The amount of control the app has over the WebView layer will
typically result in a range of different client-specific adaptations, e.g. removing
the address bar and doing significant changes to layout and styling.
When using an external or secure embedded browser, this is not possible and users will
get consistent user experience, which is good for two reasons.
Firstly, well-known visual protections like the SSL lock and address bar will always be there,
which will contribute to end users trusting that they supply their credentials securely to the
right place.
Secondly, consistent user experience for all apps using CONNECT ID for login will train users
what to expect and will make it easier for them to detect potential phishing attacks.
*   __User convenience__ - For WebViews, cookies are sandboxed per application, which means
that cookies are not shared between applications.
The consequence is that the single sign-on (SSO) functionality, which is very convenient
for end users, will not work if WebViews are used.
If an external browser or a secure browser that integrates with an external browser is used instead,
features like password autofill will be available in addition to SSO.
In addition to increased user convenience, this will probably increase end user trust, as well as
conversion rates.
*   __Developer convenience__ - For the app developer, the clear separation between an external
or secure embedded browser and the app makes the integration with the browser simpler and less
prone to errors and unnecessary custom adaptations than when using a WebView.
