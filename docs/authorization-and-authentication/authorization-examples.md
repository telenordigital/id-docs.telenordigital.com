---
title: Authorization code examples
description: authorization code examples
collection: authorization-and-authentication
order: 5
lunr: true
nav_sort: 5
nav_groups:
  - primary
tags:
  - authorization
  - oauth
  - code examples
---
This page contains some Java code snippets which can help in implementing an OAuth client. To
simplify the RESTful calls, the [Jersey library](https://jersey.java.net/) is used to perform the
HTTP requests in these examples, but any library can be used.

All endpoints called in this page are thoroughly documented on the corresponding
[API page](http://docs.telenordigital.com/apis/connect/id/authentication.html). Please refer to that page for an in-depth
explanation of the various parameters that are used. The following content assumes that you have
successfully registered as a client developer integrating with CONNECT and have received your
client ID (and client secret for confidential clients).

The example code does not utilize all available parameters for the authorization server, but a
bare-bones example. Extending the examples should be fairly straightforward if referring to the
[API page](http://docs.telenordigital.com/apis/connect/id/authentication.html).

NOTE: Most OAuth endpoints return [JSON](http://www.json.org) objects. For brevity, parsing these
objects is omitted from the examples. We strongly recommend using a JSON library for your
programming language in order to parse and extract attributes from the returned responses.

## Authorization initiation

When a user should be authenticated and enabled to authorize your client access to their protected
resources, their user-agent (usually a browser) should send a request to the
[/authorize](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-user-authorization)
endpoint. The following code constructs a URI to this endpoint.

    @GET
    @Path("/authorizeme")
    public Response getAuthorization() {
        final String state = Long.toHexString(UUID.randomUUID().getLeastSignificantBits());
        final NewCookie cookie = new NewCookie(
                "oauthState", // Key
                state,        // Value
                "/callback",  // Path where cookie is valid (see redirect_uri)
                "my-supplied-redirect-uri.com", // Domain where cookie is valid (see redirect_uri)
                null,         // Arbitrary comment
                7200,         // Time to live
                true);        // If true, cookie is never sent over unencrypted connection
        final URI authUri = UriBuilder.fromUri("https://connect.staging.telenordigital.com/oauth")
                .path("authorize")
                .queryParam("response_type", "code")
                .queryParam("client_id", "mycompany-myapp-clientplatform")
                .queryParam("redirect_uri", "https://my-supplied-redirect-uri.com/callback")
                .queryParam("scope", "openid profile email phone")
                .queryParam("state", state)
                .cookie(cookie);
                .build();
        return Response.seeOther(authUri);
    }

The way the user is redirected to the authorization endpoint depends on the client. If the client
is confidential (e.g. a server hosting a website), the user-agent is instructed to load the
authorize endpoint through a redirect as seen above. If the client is public,
the URI generated above can be directly loaded by the user's browser.

## Capturing an authorization code

When the user has authorized (or cancelled) the request for access to the end user's protected
resources, the authorization server redirects the user to the URI specified in the redirect_uri
shown in the code above. This can, once again, be an endpoint on your confidential client. The
following example represents the Jersey REST method that responds to HTTP requests on the URI
https<nolink>://my-supplied-redirect-uri.com/callback.

    @GET
    @Path("/callback")
    public Response finishAuthorization(
            @QueryParam("code") final String code,
            @QueryParam("state") final String state,
            @QueryParam("error") final String error,
            @QueryParam("error_description") final String error_description,
            @CookieParam("oauthState") final String storedState) {
        if (error != null && !error.isEmpty()) {
            // Authentication/authorization failed/cancelled. See error description.
            return someErrorPageOrRedirectToAuthorize;
        }
        if (!state.equals(storedState)) {
            // Possible session hijack. User should not be allowed to proceed.
            return someErrorPageOrRedirectToAuthorize;
        }
        final String tokenResponseJson = getTokens(code);
        // Store access token and refresh token in a secure database here.
        return successPage;
    }


The state can be stored any way you like, as long as it is checked before an authorization code is
exchanged for tokens. Its purpose is to mitigate certain security issues, and should therefore
always be unique for every call to /authorize.

## Trading an authorization code for an access and refresh token pair

The getTokens() method in the example above trades the authorization code for an access and
refresh token pair and optionally an [ID token](id-token.html) if the authorization endpoint
was accessed with the openid [scope](scope.html) value specified.

    public String getTokens(final String authorizationCode) {
        final Form form = new Form();
        form.param("grant_type", "authorization_code");
        form.param("client_id", "mycompany-myapp-clientplatform");
        form.param("redirect_uri", "https://my-supplied-redirect-uri.com/callback");
        form.param("code", authorizationCode);
        final Client httpClient = ClientBuilder
                .newClient()
                .register(HttpAuthenticationFeature.basic("mycompany-myapp-clientplatform", "myClientSecret"));
        final Response response = httpClient
                .target("https://connect.staging.telenordigital.com/oauth")
                .path("token")
                .request(MediaType.APPLICATION_JSON)
                .post(Entity.entity(form, MediaType.APPLICATION_FORM_URLENCODED_TYPE), String.class);
        final String result = response.readEntity(String.class);
        if (response.getStatusInfo().getFamily() != Response.Status.Family.SUCCESSFUL) {
            // Read status code and the JSON returned.
            // It probably has "error" and "error_description" attributes that explain the problem.
        }

        // Verify that the scope equals what was requested here.
        return returnedTokens;
    }

Once the tokens are obtained, they can be extracted from the returned JSON document with your
favorite JSON library. If an ID token was requested, the
[OpenID Connect specification](http://openid.net/specs/openid-connect-core-1_0.html#IDTokenValidation)
states that the token must be validated before it is accepted.

## Refreshing the token pair

Access tokens are short-lived, being invalidated after about an hour. For this reason, a refresh
token is provided. This token can be used to request a new access and refresh token pair. The old
refresh token should be disposed of when the new one is acquired. If the client gets 401 errors
when using the access token, the client should always try to refresh it. The code to do this is
quite similar to the one above:

    public String refreshTokens(final String refreshToken) {
        final Form form = new Form();
        form.param("grant_type", "refresh_token");
        form.param("refresh_token", refreshToken);
        final Client httpClient = ClientBuilder
                .newClient()
                .register(HttpAuthenticationFeature.basic("mycompany-myapp-clientplatform", "myClientSecret"));
        final Response response = httpClient
                .target("https://connect.staging.telenordigital.com/oauth")
                .path("token")
                .request(MediaType.APPLICATION_JSON)
                .post(Entity.entity(form, MediaType.APPLICATION_FORM_URLENCODED_TYPE));
        final String result = response.readEntity(String.class);
        if (response.getStatusInfo().getFamily() != Response.Status.Family.SUCCESSFUL) {
            // Read status code and the JSON returned.
            // It probably has "error" and "error_description" attributes that explain the problem.
            // The refresh token might have expired as well. Try getting the user to reauthorize access.
        }

        // Verify that the scope equals what was requested here.
        return returnedTokens;
    }

## Using an access token to call CONNECT resources

Many CONNECT resources can be accessed by using OAuth access tokens. See the [scope](scope.html)
for an exhaustive list of all the scope values to request at authorization initiation to get tokens
usable at our endpoints.

The following example shows how to access the ID user endpoint for basic user information using the\
access token. The scope value needed for this call is "id.user.read".

    public String getUserInfo(final String accessToken) {
        final Response response = ClientBuilder
                .newClient()
                .target("https://api.staging.telenor.io")
                .path("id/users/me")
                .request(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + accessToken);
        if (response.getStatusInfo().getFamily() != Response.Status.Family.SUCCESSFUL) {
            // Handle error. If HTTP response code is 401, the access token used is not valid anymore.
            // Client should attempt to refresh its token pair with the related refresh token.
        }
        return response.readEntity(String.class);
    }
