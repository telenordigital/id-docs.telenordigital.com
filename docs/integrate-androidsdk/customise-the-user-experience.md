---
title: Customise the user experience
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
  - customise
  - locale
  - language
  - loading screen
---

## UI locale

CONNECT ID will guess the language and set the appropriate locale for the user.

To explicitly set the locale the user sees in the flows, add the `ui_locales` parameter and set this in addLoginParameters.

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

## Loading screen

The native loading screen, which is shown before the WebView has finished loading CONNECT ID is customisable.


```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    // ...
    ConnectLoginButton loginButton = (ConnectLoginButton) findViewById(R.id.login_button);
    loginButton.setCustomLoadingLayout(R.layout.custom_loading_screen);
}
```

Where `R.layout.custom_loading_screen` can be any custom layout (.xml) file you have created.

Note, this is only relevant if the Chrome Custom Tab feature is deactived.

