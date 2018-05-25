---
title: Sign in user
description: Detailed information on using the CONNECT Android SDK for integration.
collection: integrate-android-sdk
order: 2
lunr: true
nav_sort: 2
nav_groups:
  - primary
tags:
  - sdk
  - android
  - guide
  - basic
  - usage
  - authenticating
  - authorizing
---

You can authenticate the user and authorize your application by using a `ConnectLoginButton`:


```java
public class SignInActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Initialize the SDK
        ConnectSdk.sdkInitialize(getApplicationContext());

        setContentView(R.layout.activity_sign_in);

        // Find the ConnectLoginButton present in activity_sign_in.xml
        ConnectLoginButton loginButton = (ConnectLoginButton) findViewById(R.id.login_button);
        // Set the scope. The user can click the button afterwords
        loginButton.setLoginScopeTokens("profile openid");

        // When users have clicked the loginButton and signed in, this method call will check
        // that, and run the success callback method.
        // It checks if the Activity was started by a valid call to the redirect uri with a
        // code and state, for example telenordigital-connectexample-android://oauth2callback?code=123&state=xyz .
        // It also takes a callback that has a onSuccess and onError function.
        // If it is a success we have stored tokens, and can go to SignedInActivity.
        // Not needed if not using Chrome Custom Tabs.
        ConnectSdk.handleRedirectUriCallIfPresent(getIntent(), new ConnectCallback() {
            @Override
            public void onSuccess(Object successData) {
                goToSignedInActivity();
            }

            @Override
            public void onError(Object errorData) {
                Log.e(ConnectUtils.LOG_TAG, errorData.toString());
            }
        });
    }

    private void goToSignedInActivity() {
        final Intent intent = new Intent(getApplicationContext(), SignedInActivity.class);
        startActivity(intent);
        finish();
    }

    // Overriding onActivityResult here serves the same purpose as
    // handleRedirectUriCallIfPresent further up. It is needed on older devices
    // that don't support Chrome Custom Tabs, or if the intent-filter for the redirect uri
    // to this activity is missing.
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == Activity.RESULT_OK) {
            goToSignedInActivity();
        }
    }

}
```

Where `activity_sign_in.xml` looks like this:
```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.telenor.connect.connectidexample.SignInActivity">

    <com.telenor.connect.ui.ConnectLoginButton
        android:layout_centerInParent="true"
        android:id="@+id/login_button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        style="@style/com_telenor_ConnectButton.Dark"/>

</RelativeLayout>

```

