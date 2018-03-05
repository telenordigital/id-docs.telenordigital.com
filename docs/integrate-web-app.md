---
title: Web application integration
description: Detail information for web application integration.
collection: integrate-web-app
lunr: true
nav_sort: 23
nav_groups:
  - primary
nav_subgroup: true
tags:
  - sdk
  - ios
  - guide
---

## Integrating towards the OAuth server.

1.  To begin, we need you to register client details with us so that we can use these details to
manage how CONNECT will interact with your client. The list of details required can be found on
the [client registration details page](get-started/client-registration-details.html).

2.  You will have to decide on a redirect URI to be used to redirect users back to your client
after authentication has been completed in CONNECT, see
[choosing a redirect URI](get-started/client-registration-details.html#choosing-a-redirect-uri) for details.

3.  Once the client details are finalised, you will receive a client_id, client_secret, and a
series of cURL commands from Telenor Digital, which can be used to test responses from the
[authorization server](authorization-and-authentication.html) and to get
[CONNECT ID user data](user-data.html) via the OAuth access token APIs.

4.  The client_id and client_secret are required to perform HTTP Basic authentication for
confidential clients towards the authorization server
([/oauth/token](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-token-post) and
[/oauth/revoke](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-revoke-token)
endpoints only).
Public clients will only receive a client_id.

5.  When the user wishes to access the specific page that requires them to be logged in, they must
be redirected via the authorization server's user authorization endpoint
[/oauth/authorize](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-user-authorization).
The parameters you send will contain the scope that will be used by you, as well as the redirect
URI, where the user will end up after finishing the login process. A state field is also present
that must contain a cryptographically random string, which you must use to
[validate](http://docs.telenordigital.com/connect/id/client_security_measures.html#protect-client-callback-endpoint-against-csrf-attacks)
that the response matches the original request.

6.  A list of scope values can be found at the [scope page](authorization-and-authentication/scope.html).

7.  Once the user has logged in with CONNECT they will be redirected to the redirect URI you have
specified, and an authorization code parameter will be included.

8.  If there is an error, the redirect to the redirect URI will include an error parameter instead.

9.  The authorization code must be exchanged for tokens by sending a request to the token endpoint
[/oauth/token](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-token-post).
In return, you will get an access and a refresh token, and potentially an ID token if
the [openid](authorization-and-authentication/scope.html#oauth-resources) scope was requested.

10. The access token can be used to access the user's protected resources on resource servers and
needs to be [validated](authorization-and-authentication.html#access-token-validation) in the process.
Access tokens have a short life and when they expire, refresh tokens can be used to
[get a new access and refresh token](authorization-and-authentication.html#refresh-token-flow).
To do this, follow the refresh token instructions towards the token endpoint
[/oauth/token](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-token-post).

11. The [ID token](authorization-and-authentication/id-token.html) can be used to validate the authentication
and verify the identity of the user.

12. How to log a user out is depending on whether the client has been configured with
[single sign-on (SSO)](authorization-and-authentication/sso.html) functionality.
Logging out might involve sending a request to the revoke token endpoint
[/oauth/revoke](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-revoke-token)
and potentially also accessing the logout endpoint
[/oauth/logout](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-user-logout).
See the [description of logout](authorization-and-authentication/sso.html#logout) on the SSO page for details.

13. Example code for a client can be found at the
[authorization examples page](authorization-and-authentication/authorization-examples.html).
