---
title: Access user information
description: Detailed information on using the CONNECT Android SDK for integration.
lunr: true
nav_sort: 4
nav_groups:
  - primary
tags:
  - sdk
  - android
  - guide
  - basic
  - usage
  - userinfo
---


The SDK allows for two ways of accessing user information. Either by requesting and accessing an `IdToken` or by making a network call using `getUserInfo(…)`.

Note: The presence of the fields depend on the **scope** and **claim** variables that were given at sign-in time. See http://docs.telenordigital.com/apis/connect/id/authentication.html for more details.

### Access User Information by IdToken

When authenticating the user make sure to request the `openid` scope:

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_sign_in);

    ConnectSdk.sdkInitialize(getApplicationContext());
    ConnectLoginButton loginButton = (ConnectLoginButton) findViewById(R.id.login_button);
    loginButton.setLoginScopeTokens("openid");
}
```

When the user has authenticated you call:
```java
IdToken idToken = ConnectSdk.getIdToken();
```

And access user information by calling for example:
```java
String email = idToken.getEmail();
```

### Access User Information by getUserInfo(…)

You can also access user information by making a network call using `getUserInfo(…)`:

```java
ConnectSdk.getUserInfo(new Callback<UserInfo>() {
    @Override
    public void success(UserInfo userInfo, Response response) {
        // app code
    }

    @Override
    public void failure(RetrofitError error) {
        // app code
    }
});
```

