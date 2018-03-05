---
title: Required registration details
description: What we need for you to register with us
lunr: true
nav_sort: 2
nav_groups:
  - primary
nav_subgroup: false
tags:
  - client
  - register
  - registration
---

To get access to the CONNECT APIs, you need your client to be registered with the authorization
server. After the client has been registered and configured in the authorization server, we will
send you a client ID to be used to identify the client when doing requests towards the
[authentication and authorization API](http://docs.telenordigital.com/apis/connect/id/authentication.html). If the client is
confidential, you will get a client secret in addition, so that the client can be authenticated
properly. The information we need to get about your client is listed below.

Mandatory:

-   Company/organization name.
-   Product/service name.
-   Descriptive user-facing name for the product/service.
This will be used in communication with end users, e.g. on the OAuth consent page or when
the end user is managing permission in the [My CONNECT account](http://docs.telenordigital.com/myaccount/index.html) client.
Different clients should not have the same descriptive name.
-   Detailed description of the product/service.
-   Email address for technical contact.
-   Technology/platform/device/OS used for the client
(e.g. web/Android/iOS/Windows Phone/Windows desktop/Mac OS X desktop/JavaScript).
-   Application type: Web application (i.e. an application stored on a remote server and accessed
through a web browser) or native application (i.e. an application developed for and installed on
one particular platform or device).
-   OAuth client type: Confidential (The client is able to keep credentials confidential, e.g. a client running on a web server. Please see
[section 2.1 in the OAuth specification (RFC 6749)](https://tools.ietf.org/html/rfc6749#section-2.1)
for general information.
-   [Scope values](../authorization-and-authentication/scope.html) to be requested by the client.
-   Client callback redirect URI to be redirected to after login. See the description of the
redirect_uri parameter for the
[/authorize](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-user-authorization)
endpoint. Also, see the section below on [choosing a redirect URI](#choosing-a-redirect-uri).

Optional:

-   Whether to use the [single sign-on (SSO)](../authorization-and-authentication/sso.html) solution in the authorization server.
SSO should be used at least for web clients to increase user convenience, since users will
typically not need to authenticate explicitly for every client.
SSO might also be useful for native clients using browsers that are sharing cookies
between invocation, like Safari View Controller on iOS, Chrome Custom Tabs on Android,
or an external browser (the system browser).
SSO has limited applicability when using WebViews because cookies are sandboxed per application.
When SSO is enabled for a web client, a post logout redirect URI to be redirected to after logout
must be defined.
See the description of the post_logout_redirect_uri parameter for the
[/logout](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-user-logout) endpoint.
When SSO is enabled for a native client, a post logout redirect URI is not needed because it is
preferable to use the API for
[logout using an access token](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-user-logout-post)
rather than redirecting a browser to the logout endpoint.
The reason is that there are user experience issues with directing a browser to the logout endpoint
from a native application:
Because there is no user interaction before getting redirected back to the client for this flow,
the user will typically notice that something happened in the browser, but not exactly what.
-   Whether to use the [back-channel logout notification](../authorization-and-authentication.html#back-channel-logout)
functionality provided by the authorization server.
If so, a back-channel logout URI for the client needs to be defined.
The authorization server will send logout token requests to this URI when users are considered
logged out.
The URI will typically be in the form of a URL using TLS/SSL (HTTPS).
Example: `https://<client-specific-host>/connect/backchannellogout`.

It is of course possible to update the information later on if there are any changes.

## Choosing a redirect URI

After successful authentication and authorization, the authorization server needs a way to
[deliver the resulting authorization code](../authorization-and-authentication.html) (or a potential error) to the
client. The authorization code can be delivered in several different ways, depending on the type of
redirect URI used:

-   A __custom URI scheme__ - for example `<client-specific-scheme>://connect/oauth2callback`. The
client must be registered to listen on the custom URI scheme in the operating system (OS) in order
for a redirect to the client to work.
-   A __URL__ - for example `https://<client-specific-host>/connect/oauth2callback`.
Note that HTTPS should be used for non-localhost URLs, ref the
[Client security measures document](../authorization-and-authentication/client-security-measures.html).
This should be the preferred approach for web clients.
Also, native clients that do not support custom URI schemes but can set up a web server
without considerable configuration in the OS may use this approach.
For native clients, the HTTP scheme with `localhost` as hostname must be used if the redirect URI
is a URL.
-   A __URN__ - either `urn:ietf:wg:oauth:2.0:oob` or `urn:ietf:wg:oauth:2.0:oob:auto`. For
`urn:ietf:wg:oauth:2.0:oob:auto`, the authorization code and state is supplied in the title of an
HTML page and is thus available for automatic extraction from the title bar of the browser. This
can for instance be done by checking window titles on the desktop. For `urn:ietf:wg:oauth:2.0:oob`,
the HTML page contains the authorization code and state in the body as well, including instructions
to the end user on how to copy the data into the client, in case the client is unable to
automatically extract the data from the title bar of the browser. This should be the preferred
approach for native clients that do not support custom URI schemes and cannot set up a web server
without considerable configuration in the OS (e.g. Windows desktop clients).

If a redirect URI is not chosen, we will set up one of the following default values, depending on
the technology used in the client:

-   Native Android/iOS/Windows Phone/Mac OS X clients: `<client-id>://connect/oauth2callback` (May be
used in production)
-   Web clients: `http://localhost:8081/connect/oauth2callback` (Please note that this is just for
testing. In production, a non-localhost redirect URI with HTTPS scheme should be used)
-   Windows desktop clients: `urn:ietf:wg:oauth:2.0:oob` and `urn:ietf:wg:oauth:2.0:oob:auto` (May be
used in production)
