---
title: Get a valid access token
description: Detailed information on using the CONNECT Android SDK for integration.
collection: integrate-android-sdk
order: 3
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

## Automatically get unexpired access token
Once the user is signed in you can get a valid *access token* by calling `ConnectSdk.getValidAccessToken(…)`:

```java
ConnectSdk.getValidAccessToken(new AccessTokenCallback() {
    @Override
    public void success(String accessToken) {
        Toast.makeText(SignedInActivity.this,
                "accessToken can now be used to access user sensitive resources",
                Toast.LENGTH_SHORT)
                .show();
    }

    @Override
    public void unsuccessfulResult(Response response, boolean userDataRemoved) {
        // a 4xx response will sign out any signed in user
        if (userDataRemoved) {
            goToLogin();
        }
        String text = response.body() != null
                ? response.body().toString()
                : "<empty response body>";
        Toast.makeText(SignedInActivity.this, text, Toast.LENGTH_SHORT).show();
    }

    @Override
    public void failure(Call<ConnectTokensTO> call, Throwable error) {
        Toast.makeText(SignedInActivity.this,
                "Failed to update token. Check connectivity and try again.",
                Toast.LENGTH_LONG)
                .show();
    }

    @Override
    public void noSignedInUser() {
        goToLogin();
    }
});
```

See [SignedInActivity.java in the example app](https://github.com/telenordigital/connect-android-sdk/blob/master/connect-id-example/src/main/java/com/telenor/connect/connectidexample/SignedInActivity.java) for a full example.

## Manually check expiration time
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
