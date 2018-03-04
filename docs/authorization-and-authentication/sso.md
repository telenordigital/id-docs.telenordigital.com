---
title: Single sign-on
description: Single sign-on
collection: authorization-and-authentication
order: 4
lunr: true
nav_sort: 4
nav_groups:
  - primary
tags:
  - SSO
  - Single sign-on
---

CONNECT ID (or more specifically the authorization server) has a notion of an end user being logged
in with a given user agent (browser). The functionality is based on establishing a session between
the authorization server and the browser by storing session data on the server and a session
identifier in an HTTP cookie. The session facilitates so-called single sign-on (SSO) functionality,
which means that the user does not need to supply credentials (authenticate) with the authorization
server if a valid SSO session exists between the authorization server and the browser he uses. The
SSO session might e.g. have been created earlier when the user authenticated for another client
using the same browser.

Note that native apps need to use a browser that is sharing cookies between invocations to get
benefit from the SSO functionality. Examples of such browsers are external browsers
(the system browser) or embedded browsers like Safari View Controller on iOS or
Chrome Custom Tabs on Android. If the app uses a simple WebView, SSO will not work.

Using the SSO session can be enabled per client, which means that clients that have not enabled SSO
will not use any SSO session for authentication. Note that the SSO session for the authorization
server is different from and unrelated to any potential mechanisms implemented by clients to manage
sessions with the end user.

If the client has enabled SSO functionality, and wants to specify the maximum allowed time in
seconds since the last time the end user actively authenticated, it may do so using the max_age
query parameter for the
[/authorize](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-user-authorization) endpoint.
Since there is a small possibility that the max_age parameter was changed en route to the
authorization server, the client should check the age of the authentication by validating the
"auth_time" claim in the [ID token](id-token.html).

If the client needs to check for existing authentication (SSO session) and/or consent, it may set
the value "none" for the prompt parameter in the request to the
[/authorize](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-user-authorization) endpoint.
If no user interaction (prompt) is necessary, an authorization code will be delivered to the client
callback redirect URI, otherwise an error will be delivered.

## "Remember me"/"stay logged in" functionality

Clients can opt in to having a "remember me"/"stay logged in" option for their users on login.
Enabling this option will result in a "remember me"/"stay logged in" checkbox to appear in the
end user login dialog.
When this option is enabled for a client and the user has chosen not to have their login
remembered, their SSO session will expire when their browser window is closed.

This is useful for clients with sensitive functionality that want the end user to be able to
limit the duration of sessions created, e.g. when accessing the client on a public computer.
The public computer case is only relevant for web applications, so we do only allow the
"remember me"/"stay logged in" functionality to be enabled for web applications.
For web applications that want to get SSO with Levels of Assurance (LoAs) higher than LoA 1,
having the "remember me"/"stay logged in" option enabled is a requirement.
Note that in case a public computer is used and the user fails to uncheck the
"remember me"/"stay logged in" checkbox at login, they will still have a chance to expire/invalidate
the SSO session by accessing the logout functionality provided by the client, see the next section.

Clients that choose to enable this functionality are expected to ensure that no cookies nor
sessions held towards the user on the client side last longer than the browser session if the user
chooses not to be remembered. This choice is propagated to the clients through a custom claim named
"td_sls" in the [ID token](id-token.html).

The "td_sls" claim is an abbreviation of "Telenor Digital: Short-lived session". If this claim
exists in the ID token and has the value "true", the user has chosen to be remembered only for this
browser session. When this is the case, any cookies set by the client to the user agent should not
have an "expires" attribute. If cookies are not used to maintain the session between a user and the
client, the client is expected to implement a fitting equivalent mechanism that expires the session
when the user can be considered to have exited the service.

## Logout

There are two different kinds of logout in CONNECT ID. The user may either log out from a service,
or from a service and CONNECT ID. The latter option is useful if the client has SSO enabled,
as users that have only logged out from the service might be automatically logged in afterwards
because they are still logged in to CONNECT.

Logging out an end user from the service is a matter of deleting the access and refresh tokens
stored locally on the client. The client should make sure that the access and refresh tokens
cannot be used by anyone after logout as well. Therefore, tokens should be revoked as well via the
[/revoke](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-revoke-token-post) endpoint.

Clients that have enabled the SSO functionality, and want to log the user out of CONNECT ID
as well, should redirect the user to the
[/logout](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-user-logout-get) endpoint.
Alternatively, the client may perform an HTTP POST to the
[same endpoint](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-user-logout-post)
with a valid access token.
The former approach is most suitable for web applications accessed via a browser, while the latter
is most suitable for native applications.
Note that after the logout is completed, some or all of the access tokens
and refresh tokens the client has received on behalf of this user may be unusable.
