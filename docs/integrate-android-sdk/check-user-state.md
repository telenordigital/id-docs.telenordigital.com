---
title: Check user state
description: Detailed information on using the CONNECT Android SDK for integration.
collection: integrate-android-sdk
order: 5
lunr: true
nav_sort: 5
nav_groups:
  - primary
tags:
  - sdk
  - android
  - guide
  - usage
  - user
  - state
---


## Check a user is signed in

```java
// in SignedInActivity.java
@Override
protected void onCreate(Bundle savedInstanceState) {
    //...

    // if there is no access token no user is signed in
    if (ConnectSdk.getAccessToken() == null) {
        goToLogin();
    }
}

private void goToLogin() {
    Intent intent = new Intent(this, SignInActivity.class);
    startActivity(intent);
    finish();
}

```


## Token state notifications

The `ConnectTokensStateTracker` class tracks the login state of the user. This is useful for handling UI changes in your app based on the login state of the user.

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    // ...

    new ConnectTokensStateTracker() {
        @Override
        protected void onTokenStateChanged(boolean hasTokens) {
            // App code
        }
	}
}
```

The `onTokenStateChanged(boolean hasTokens)` method will be called whenever the token state changes.

