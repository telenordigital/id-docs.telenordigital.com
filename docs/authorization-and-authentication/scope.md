---
title: Scope
description: scopes
collection: authorization-and-authentication
order: 1
lunr: true
nav_sort: 1
nav_groups:
  - primary
tags:
  - scope
---
The scope of an access token is a list of space-delimited strings (scope values) associated with
the access token. Scope values can be viewed as permissions.
The scope attained affects which protected resources the client is allowed to get access to
using the access token. The protected resources are typically available on resource servers,
which are implemented according to the
[OAuth bearer token usage specification (RFC 6750)](https://tools.ietf.org/html/rfc6750).
For each request to a resource server, it verifies that the scope for the access token
is sufficient for accessing the protected resource.

When the client initiates an authorization request, it requests the scope it needs using
the scope parameter for the
[/authorize](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-user-authorization) endpoint.
The user will typically get the chance to allow or disallow that the client gets access to
the resources protected by the scope values in a separate user dialog.

The scope value __openid__ dictates the use of OpenID Connect over OAuth 2.0. When this
scope value is given, the return value from the call which generates tokens based on the
one-time authorization code also returns an [ID token](id-token.html). The ID token is a signed
[JSON Web Token (JWT)](https://tools.ietf.org/html/rfc7519) containing,
among other things, __iss__ (Issuer Identifier for the issuer of the response) and __sub__ (Subject
identifier, in this case the user's ID).
The user ID is a required part of the path for some of the resource server endpoints listed below.

The following tables constitute a comprehensive list of available scope values within CONNECT
and the resource server endpoints they belong to. Note that services that implement
custom resource servers can get additional custom scope values configured for their clients.

### OAuth resources

More details about these scope values can be found in the
[OpenID Connect Core specification](http://openid.net/specs/openid-connect-core-1_0.html)

Scope value | Description | Endpoint
 ---------- | ----------- | -------
openid      | Requesting this scope value results in an ID token being returned when exchanging your authorization code for an access/refresh token pair. | [POST /oauth/token](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-token-post)
profile     | Basic user information. Claims: __name__ and __locale__. Additional claims are not supported yet. | [GET /oauth/userinfo](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-user-information)
email       | The user's preferred email address. Claims: __email__ and __email_verified__. | [GET /oauth/userinfo](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-user-information)
address     | The user's known postal address. Claims: __address__. Not supported yet. | [GET /oauth/userinfo](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-user-information)
phone       | The user's preferred phone number. Claims: __phone_number__ and __phone_number_verified__. | [GET /oauth/userinfo](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-user-information)

### User and rights management resources

All requests requiring a user ID must contain the user ID that the bearer token is issued on behalf
of. This ID is provided in the ID token, or in the response of a __/userinfo__ or __/id/users/me__
request.

Scope value          | Description | Endpoint
 ------------------- | ----------- | -------
id.user.read         | Read access to basic user information. | [GET /id/users/me](http://docs.telenordigital.com/apis/connect/id/users.html#users-user-resource-get)<br />[GET /id/users/{userId}](http://docs.telenordigital.com/apis/connect/id/users.html#users-user-resource-get)
id.user.write        | Update/Write access to basic user information. Not available for public clients. | PUT /id/users/me<br />PUT /id/users/{userId}
id.user.email.read   | Read access to all registered user email addresses. | [GET /id/users/{userId}/mails](http://docs.telenordigital.com/apis/connect/id/emails.html#emails-email-collection-resource-get)<br />[GET /id/users/{userId}/mails/{mailId}](http://docs.telenordigital.com/apis/connect/id/emails.html#emails-email-resource-get)
id.user.phone.read   | Read access to all registered user phone numbers. | [GET /id/users/{userId}/phones](http://docs.telenordigital.com/apis/connect/id/phones.html#phones-phone-collection-resource-get)<br />[GET /id/users/{userId}/phones/{phoneId}](http://docs.telenordigital.com/apis/connect/id/phones.html#phones-phone-resource-get)
id.user.right.read   | Read access to all registered user rights. | [GET /id/users/{userId}/rights](http://docs.telenordigital.com/apis/connect/rights/rights.html#rights-right-list)<br />[GET /id/users/{userId}/rights/{rightId}](http://docs.telenordigital.com/apis/connect/rights/rights.html#rights-right-resource-get)
id.user.right.use    | Record usage on a right to indicate that the right is being consumed. Not available for public clients. | [POST /id/users/{userId}/rights/{rightId}/usage](http://docs.telenordigital.com/apis/connect/rights/rights.html#rights-record-usage)
id.user.sub.read     | Read access to all registered user subscriptions. | [GET /id/users/{userId}/subs](http://docs.telenordigital.com/apis/connect/rights/subscriptions.html#subscriptions-list-subscriptions)<br />[GET /id/users/{userId}/subs/{subId}](http://docs.telenordigital.com/apis/connect/rights/subscriptions.html#subscriptions-subscription-operations-get)
id.user.account.read | Read access to all registered user accounts. | [GET /id/users/{userId}/accounts](http://docs.telenordigital.com/apis/connect/id/accounts.html#accounts-account-collection-resource-get)<br />[GET /id/users/{userId}/accounts/{accountId}](http://docs.telenordigital.com/apis/connect/id/accounts.html#accounts-account-resource-get)
