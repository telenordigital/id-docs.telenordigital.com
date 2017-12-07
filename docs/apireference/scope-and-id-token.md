---
title: Scope & ID token
description: Scope & ID token reference docs
lunr: true
nav_sort: 1
nav_groups:
  - primary
tags:
  - API
  - authentication
  - authorization
---

## Scope

[docs.telenordigital.com/connect/id/scope.html](http://docs.telenordigital.com/connect/id/scope.html)

value | Description | Endpoint
 ---------- | ----------- | -------
openid      | Requesting this scope value results in an ID token being returned when exchanging your authorization code for an access/refresh token pair. | [POST /oauth/token](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-token-post)
profile     | Basic user information. Claims: __name__ and __locale__. Additional claims are not supported yet. | [GET /oauth/userinfo](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-user-information)
email       | The user's preferred email address. Claims: __email__ and __email_verified__. | [GET /oauth/userinfo](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-user-information)
address     | The user's known postal address. Claims: __address__. Not supported yet. | [GET /oauth/userinfo](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-user-information)
phone       | The user's preferred phone number. Claims: __phone_number__ and __phone_number_verified__. | [GET /oauth/userinfo](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-user-information)

## ID token

[docs.telenordigital.com/connect/id/id_token.html](http://docs.telenordigital.com/connect/id/id_token.html)

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
            See the description of the [single sign-on (SSO)](http://docs.telenordigital.com/connect/id/sso.html) functionality for details.
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
