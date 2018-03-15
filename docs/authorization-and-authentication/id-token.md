---
title: ID token
description: Identity token
collection: authorization-and-authentication
order: 3
lunr: true
nav_sort: 3
nav_groups:
  - primary
tags:
  - tokens
  - id token
  - token
---
The ID token is the primary extension that OpenID Connect makes to OAuth 2.0 to enable users
to be authenticated.
It asserts the identity of a user in a signed and verifiable way, resembling the concept of
an identity card in a digital form, which can be verified by the client.

If a client requests the [scope](scope.html) value __openid__, an ID token will also
be returned when exchanging the authorization code for an access/refresh token pair.
The ID token is a signed
[JSON Web Token (JWT)](https://tools.ietf.org/html/rfc7519)
containing so-called claims, which are pieces of information about an entity represented as
key-value pairs.

The
[OpenID Connect Core spec, section 2](http://openid.net/specs/openid-connect-core-1_0.html#IDToken)
specifies a set of claims about the authentication that the ID token may contain.
Some of these claims are mandatory and some are optional.
The specification allows the ID token to contain other claims as well.
Depending on the scope or claims requested, the authorization server will include
standard user claims in the ID token, which are the same claims that are available via the
[/userinfo](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-user-information) endpoint.
This can save clients from making an additional request to the /userinfo endpoint to get these
claims.
In addition to the ID token claims mentioned in the specification and the standard user claims,
the Telenor Digital authorization server offers the following custom claims in the ID token:

<table class="table">
    <thead>
    <tr>
        <th>Claim</th><th>Type</th><th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>td_au</td>
        <td>string</td>
        <td>
            Telenor Digital: Authentication username.
            This claim contains the username used by the user for the current authentication,
            and may either be an email address or a phone number.
            The claim is only returned if both scope values __email__ and __phone__ have been
            requested by the client.
        </td>
    </tr>
    <tr>
        <td>td_sls</td>
        <td>boolean</td>
        <td>
            Telenor Digital: Short-lived session.
            This claim signals back to the client whether the end user has chosen that
            the session related to the authentication should be short-lived or not.
            When this claim value is *true*, any potential session set up by the client must be
            short-lived, which means that it should expire when the user can be considered
            to have left the service.
            Typically this means that the client session should not last longer than
            the browser session for web clients.
            This claim is relevant for clients that have opted in to having
            a "stay logged in" option for their users on login.
            See the description of the [single sign-on (SSO)](sso.html) functionality for details.
        </td>
    </tr>
    <tr>
        <td>amr</td>
        <td>string array</td>
        <td>
            Authentication Method References.
            While not a custom claim in itself, the values this claim can have is not standardized.
            In accordance with the
            [OpenID Connect Core spec, section 2](http://openid.net/specs/openid-connect-core-1_0.html#IDToken),
            the "amr" claim contains values identifying the authentication methods used in the
            authentication of the user. Most of the values are taken from the
            [CPAS5 Mobile Connect spec](https://github.com/GSMA-OneAPI/Mobile-Connect/blob/master/specifications/CPAS5%20OpenID%20Connect%20-%20Mobile%20Connect%20Profile%201.1.docx).
            The following values are currently defined:
            <ul>
                <li><em>OK</em>:
                    USSD message on the user's phone where he is prompted to simply click "OK".
                </li>
                <li><em>DEV_PIN (Not supported)</em>:
                    USSD message on the user's phone where he is prompted to input a PIN.
                </li>
                <li><em>SIM_PIN (Not supported)</em>:
                    SIM-based authentication with PIN code prompt.
                </li>
                <li><em>UID_PWD</em>:
                    Username and password-based authentication.
                </li>
                <li><em>BIOM (Not supported)</em>:
                    Biometric authentication, for instance using a fingerprint sensor.
                </li>
                <li><em>HDR</em>:
                    Authentication through header enrichment.
                </li>
                <li><em>OTP</em>:
                    SMS one-time-PIN-based authentication.
                </li>
                <li><em>SSO</em>:
                    Seamless login through an existing CONNECT session.
                </li>
            </ul>
        </td>
    </tr>
    </tbody>
</table>

## ID token validation

A client that receives an ID token is required to validate it according to the
[OpenID Connect Core spec, section 3.1.3.7](http://openid.net/specs/openid-connect-core-1_0.html#IDTokenValidation).
Since the ID token returned by the Telenor Digital authorization server is simply a signed JWT,
the steps involved for token validation are signature validation, decoding the ID token JWT
into JSON, and validation of the individual claims in the resulting JSON document.

### Validating signature and decoding the ID token

To validate the signature of an ID token and decode it while developing a client,
it can be passed to the
[/tokeninfo](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-token-information) endpoint.
Please note that this function is not supposed to be used in production code because of the extra
network call.

If the client got the ID token directly from the authorization server, it might not need
to validate the signature, ref the specification in the link above.
If the client needs to validate the signature, it should get and cache the public key for signing
from the
[JWK set endpoint](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-jwk-set-endpoint),
and use a JWT library (see e.g. [jwt.io](https://jwt.io/)) to validate the signature and decode
the ID token.

Even if the client does not need to validate the signature, a JWT library is still recommended
to be used to decode the ID token.
Some JWT libraries do not provide methods in their API to decode a signed JWT without also
validating the signature, that is, they require that the public signature key is provided
in order to decode the JWT.
If no JWT library allowing the ID token to be decoded without signature validation
can be found in the preferred programming language, client developers may have to implement
[decoding the JWT](https://tools.ietf.org/html/rfc7519) themselves.

### Validating claims in the ID token

The following checks need to be performed:

*   The issuer identifier used must match the *iss* claim.
*   The client ID for the client must be included in the *aud* (audiences) claim and the claim
should not contain additional audiences not trusted by the client.
*   If the *aud* claim contains multiple audiences, the client should verify that an *azp*
(authorized party) claim is present.
*   If an *azp* claim is present, the client should verify that its client ID is the claim value.
*   The current time must be before the time represented by the *exp* (expiration time) claim.
*   The *iat* (issued at) claim can be used to reject tokens that were issued too far away from the
current time, limiting the amount of time that nonces need to be stored to prevent replay attacks.
The acceptable range is client specific.
*   If a nonce value was sent in the
[authentication request](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-user-authorization),
the *nonce* claim must match the provided value.
The client should check the nonce value for replay attacks.
*   If the *acr* (Authentication Context Class Reference) claim was requested, the client should
check that the asserted claim is appropriate.
*   If the *auth_time* (authentication time) claim was requested using the max_age parameter,
the client should check that the asserted claim is appropriate.
*   If the client has opted in to having a "remember me"/"stay logged in" option for their users
on login, it needs to check the *td_sls* custom claim as described in the table above.

Note that the authoritative source for how to validate the non-custom claims is the OpenID Connect
specification and more specifically
[section 3.1.3.7](http://openid.net/specs/openid-connect-core-1_0.html#IDTokenValidation).
