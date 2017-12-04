---
title: Get a valid access token
description: Detailed information on using the CONNECT Android SDK for integration.
lunr: true
nav_sort: 3
nav_groups:
  - primary
tags:
  - sdk
  - android
  - guide
  - basic
  - usage
  - access
  - refresh
  - token
---

Once the user is signed in you can get a valid Access Token by calling `ConnectSdk.getValidAccessToken(…)`:

```java
ConnectSdk.getValidAccessToken(new AccessTokenCallback() {
    @Override
    public void onSuccess(String accessToken) {
        // app code
    }

    @Override
    public void onError(Object errorData) {
        // app code
    }
});
```

The above method will always return a valid access token, unless no user is signed in, in which
case you will get a `ConnectRefreshTokenMissingException`.

You can also manually check the expiration time of the stored access token and check if it is expired.

```java
Date expirationTime = ConnectSdk.getAccessTokenExpirationTime();

if (expirationTime == null) { // if no user is signed in
    goToLogin();
    return;
}

if (new Date().before(expirationTime)) {
    Toast.makeText(this, "Token has not expired yet. expirationTime=" + expirationTime, Toast.LENGTH_LONG).show();
    String validAccessToken = ConnectSdk.getAccessToken();
    // use the access token for something
} else {
    Toast.makeText(this, "Token has expired. expirationTime=" + expirationTime, Toast.LENGTH_LONG).show();
    ConnectSdk.updateTokens(new AccessTokenCallback() {
        @Override
        public void onSuccess(String accessToken) {
            Toast.makeText(SignedInActivity.this, "Got new access token and expiration time. New time: " + ConnectSdk.getAccessTokenExpirationTime(), Toast.LENGTH_LONG).show();
            String validAccessToken = ConnectSdk.getAccessToken();
        }

        @Override
        public void onError(Object errorData) {
            Toast.makeText(SignedInActivity.this, "Failed to refresh token.", Toast.LENGTH_LONG).show();
        }
    });
}
```
