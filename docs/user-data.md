---
title: User data
description: User data
lunr: true
nav_sort: 32
nav_groups:
  - primary
nav_subgroup: true
tags:
  - user
  - user data
  - data
---
The user data in CONNECT ID can be accessed either by end users via the My CONNECT account client
or by clients via REST APIs.

## The My CONNECT account client

"My CONNECT account" is the account management client of CONNECT and is available at
[https://connect.telenordigital.com/gui/mypage](https://connect.telenordigital.com/gui/mypage). Guidelines on how to integrate with the My CONNECT
account client can be found under [My CONNECT account](http://docs.telenordigital.com/connect/myaccount/index.html).

## REST APIs

Clients can get access to user data in CONNECT ID through simple REST calls to API endpoints. We
support two different approaches for authentication for these API endpoints: Either using OAuth
access tokens obtained via the CONNECT authentication and authorization APIs or using simple
[HTTP Basic authentication](http://tools.ietf.org/html/rfc2617) with dedicated credentials. Some of
the endpoints support access tokens, some support HTTP Basic authentication, while others support
both.

### OAuth access token APIs

The preferred way to access the user data is using an OAuth access token as a bearer token in the
Authorization header of the HTTP request, according to the
[OAuth bearer token usage specification (RFC 6750)](https://tools.ietf.org/html/rfc6750).
The Authorization header will look like this: `Authorization: Bearer <access token>`

This can be done directly from the clients towards the endpoints. Below is a list of all such
endpoints, of which the first one is the preferred way of getting user data to a client. For more
detailed description of the scope values required for accessing these endpoints, see the
[scope page](authorization-and-authentication/scope.html).

-   Get basic user information (user ID, name, preferred email address, preferred phone number)
according to the OpenID Connect specification:
[Get UserInfo](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-user-information)
-   Get all email addresses for a user including metadata:
[Get list of emails](http://docs.telenordigital.com/apis/connect/id/emails.html#emails-email-collection-resource-get),
[Get email](http://docs.telenordigital.com/apis/connect/id/emails.html#emails-email-resource-get)
-   Get all phone numbers for a user including metadata:
[Get list of phones](http://docs.telenordigital.com/apis/connect/id/phones.html#phones-phone-collection-resource-get),
[Get phone](http://docs.telenordigital.com/apis/connect/id/phones.html#phones-phone-resource-get)
-   Get basic user information including metadata:
[Get user by ID](http://docs.telenordigital.com/apis/connect/id/users.html#users-user-resource)
-   Update basic user information:
<!-- TODO(ulf): Link to Update user API endpoint when it has been added -->
[Update user](http://docs.telenordigital.com/apis/connect/id/users.html)

### HTTP Basic authentication APIs

If a client requires the API endpoints which do not support OAuth access tokens, we will issue
dedicated HTTP Basic authentication credentials (username and password). Such credentials are
separate from the OAuth client credentials (OAuth client ID and client secret) used towards the
[/token](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-token) endpoint for confidential
clients. The Authorization header will look like this:
`Authorization: Basic <Base64 encoding of username:password>`

The credentials need to be kept secret, so only server side code may use those credentials to call
the API endpoints. All endpoints in the APIs linked below support HTTP Basic authentication:

-   [Users API](http://docs.telenordigital.com/apis/connect/id/users.html)
-   [Emails API](http://docs.telenordigital.com/apis/connect/id/emails.html)
-   [Phones API](http://docs.telenordigital.com/apis/connect/id/phones.html)
-   [Accounts API](http://docs.telenordigital.com/apis/connect/id/accounts.html)

## Useful links

[CONNECT UserInfo API documentation](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-user-information)

[CONNECT Users API documentation](http://docs.telenordigital.com/apis/connect/id/users.html)

[CONNECT Emails API documentation](http://docs.telenordigital.com/apis/connect/id/emails.html)

[CONNECT Phones API documentation](http://docs.telenordigital.com/apis/connect/id/phones.html)

[CONNECT Accounts API documentation](http://docs.telenordigital.com/apis/connect/id/accounts.html)
