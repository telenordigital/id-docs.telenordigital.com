---
title: Advanced usage
description: Detailed information on using the CONNECT Android SDK for integration.
lunr: true
nav_sort: 5
nav_groups:
  - primary
tags:
  - sdk
  - android
  - guide
  - advanced
  - detailed
  - usage
---

* [Add a ConnectLoginButton](#add-a-connectloginbutton)
* [Add claims](#add-claims)
* [Example: set the UI locale](#example-set-the-ui-locale)
* [Customise native loading screen](#customise-native-loading-screen)
* [Keep track of the login state](keep-track-of-the-login-state)
* [Retrieve information about the logged in user](#retrieve-information-about-the-logged-in-user)

## Add a ConnectLoginButton

To let the SDK handle CONNECT ID login, a `ConnectLoginButton` can be added to your layout. This is
a custom `Button` implementation that has the standard CONNECT button look-and-feel.

Firstly add a button to your layout XML files using the class name
`com.telenor.connect.ConnectLoginButton`:

```xml
<com.telenor.connect.ConnectLoginButton
    android:id="@+id/login_button"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content" />
```

Then add the required [scope tokens](http://docs.telenordigital.com/connect/id/scope.html) for your
application to the button in the `onCreate()` method of your `Activity` class.

```java
@Override
public void onCreate(Bundle savedInstanceState) {
    ...
    ConnectLoginButton button = (ConnectLoginButton) findViewById(R.id.login_button);
    button.setLoginScopeTokens("profile");
}
```

The `onActivityResult()` method of your `Activity` will be called with `Activity.RESULT_OK` as
`resultCode` if the login was successful or `Activity.RESULT_CANCELED` when there was an error.

```java
@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);

    if (resultCode == Activity.RESULT_OK) {
        // App code
    } else if (resultCode == Activity.RESULT_CANCELED) {
        // App code
    }
}

```

Or if the Chrome Custom Tab feature is used, in a `ConnectCallback` in the Activity that has the `intent-filter` with `connect_client_id` in your AndroidManifest:
```java
ConnectSdk.handleRedirectUriCallIfPresent(getIntent(), new ConnectCallback() {
    @Override
    public void onSuccess(Object successData) {
        // App code
    }

    @Override
    public void onError(Object errorData) {
        // App code
    }
});

```

## Add claims

To add additional [claims to your Connect request](http://docs.telenordigital.com/apis/connect/id/authentication.html#authorization-server-user-authorization), you can use the `setClaims` method on the `ConnectLoginButton`.

```java
@Override
public void onCreate(Bundle savedInstanceState) {
    ...
    ConnectLoginButton button = (ConnectLoginButton) findViewById(R.id.login_button);
    button.setLoginScopeTokens("profile");
    button.setClaims(new Claims(Claims.PHONE_NUMBER, Claims.EMAIL));
}
```

## Example: set the UI locale

The locale the user sees in the flows can be set as shown in the following example:

```java
@Override
public void onCreate(Bundle savedInstanceState) {
    // ...
    ConnectLoginButton button = (ConnectLoginButton) findViewById(R.id.login_button);
    button.setLoginScopeTokens("profile");

    Map<String, String> additionalLoginParams = new HashMap<>();
    additionalLoginParams.put("ui_locales", "bn en");
    button.addLoginParameters(additionalLoginParams)
}
```

## Customise native loading screen

The native loading screen, which is shown before the WebView has finished loading, can be customised when the Chrome Custom Tab feature isn't used in the following way:

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    // ...
    ConnectLoginButton loginButton = (ConnectLoginButton) findViewById(R.id.login_button);
    loginButton.setCustomLoadingLayout(R.layout.custom_loading_screen);
}
```

Where `R.layout.custom_loading_screen` can be any custom layout (.xml) file you have created.

## Keep track of the login state

The CONNECT SDK contains the `ConnectTokensStateTracker` class that tracks the login
state of the user. This is useful for handling UI changes in your app based on the login state of the user.

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    ...
    new ConnectTokensStateTracker() {
        @Override
        protected void onTokenStateChanged(boolean hasTokens) {
            // App code
        }
};
```

The `onTokenStateChanged(boolean hasTokens)` method will be called whenever the token state changes.

## Retrieve information about the logged in user

If you request user claims like email, phone, and name, using either scope tokens or the claims parameter, you can access these fields on the user from `ConnectSdk.getIdToken()` after an authorize request, without having to do any further requests. Set the scope to access these fields and set the claims to make sure that the user has something in these fields, if the authorize successfully completes. If both email and phone claims have been requested, we will also provide the username used for the authentication in the ID token.

See [http://docs.telenordigital.com/apis/connect/id/authentication.html](http://docs.telenordigital.com/apis/connect/id/authentication.html) for more details.
