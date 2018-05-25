---
title: Setup
description: Detailed information on using the CONNECT Android SDK for integration.
collection: integrate-android-sdk
order: 1
lunr: true
nav_sort: 1
nav_groups:
  - primary
tags:
  - sdk
  - android
  - guide
  - setup
---

## Add dependencies

The binaries are included on JCenter, so the SDK can be added by including a line in your `build.gradle` file for your app.

```gradle
dependencies {
    // ...
    implementation 'com.telenor.connect:connect-android-sdk:1.6.1' // add this line
}
```

You may have to add JCenter as a repository on your top-level `build.gradle` file if this isn't done already:
```gradle
allprojects {
    repositories {
        jcenter()
    }
}
```

Before using the SDK some entries have to be added to `AndroidManifest.xml`. See instructions below. The example app also contains [a full example of a valid `AndroidManifest.xml`](https://github.com/telenordigital/connect-android-sdk/blob/master/connect-id-example/src/main/AndroidManifest.xml).

## Set Staging or Production Environment

CONNECT ID has two [environments](http://docs.telenordigital.com/connect/environments.html)
that can be used, `staging` and `production`. The environment can be selected using the
`com.telenor.connect.USE_STAGING` meta-data property in your AndroidManifest.xml

```xml
<meta-data
        android:name="com.telenor.connect.USE_STAGING"
        android:value="true" />
```

Set this to `false` if you want to use the production environment.

## Add client ID and redirect URI

The CONNECT ID integration requires a client ID and a redirect URI to work. You should receive these when registering your application. See [Required registration details](../get-started/client-registration-details.md).

Add the client ID, and redirect URI and scheme to your `strings.xml` file:
```xml
<string name="connect_client_id">telenordigital-connectexample-android</string>
<string name="connect_redirect_uri">telenordigital-connectexample-android://oauth2callback</string>
<string name="connect_redirect_uri_scheme">telenordigital-connectexample-android</string>
```

Add `meta-data` entries to the `application` section of the manifest.

```xml
<application>
        ...
        <meta-data
                android:name="com.telenor.connect.CLIENT_ID"
                android:value="@string/connect_client_id" />
        <meta-data
                android:name="com.telenor.connect.REDIRECT_URI"
                android:value="@string/connect_redirect_uri" />
        ...
</application>
```

## Register and handle redirect URI


### Register redirect URI in Android
**Note**: If you do not wish to use the Chrome Custom Tabs feature do not add this to the manifest.

For your app to respond to calls to the redirect URI you need to add an `intent-filter` to your
`Activity` to register this in the Android system. This will allow the
[Chrome Custom Tab](https://developer.chrome.com/multidevice/android/customtabs) used by `ConnectLoginButton` and external browsers to get back to your app.


```xml
<activity android:name=".SignInActivity" >
	<intent-filter>
		<data android:scheme="@string/connect_redirect_uri_scheme" />
		<action android:name="android.intent.action.VIEW" />
		<category android:name="android.intent.category.DEFAULT" />
		<category android:name="android.intent.category.BROWSABLE" />
	</intent-filter>
</activity>
```

### Handle redirect URI

You need an `Activity` that calls `ConnectSdk.handleRedirectUriCallIfPresent`, as in the [sign in example](./sign-in-user.md).

If the app is not using the Chrome Custom Tab feature you only need to override the
`onActivityResult(…)`, also as in the
[sign in example](./sign-in-user.md).


## Add permissions

Open your application's `AndroidManifest.xml` file and add the permission required to allow your application to access the internet.

```xml
<uses-permission android:name="android.permission.CHANGE_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.INTERNET"/>
```

Optionally you can enable the feature that automatically fills in verification PIN codes received on SMS by adding the following permissions, when you are not using the Chrome Custom Tab feature.

```xml
<uses-permission android:name="android.permission.RECEIVE_SMS" />
<uses-permission android:name="android.permission.READ_SMS" />
```

Note: You should be conscious about the security implications of using this feature. When using this feature your application will load received SMS into memory for up to 60 seconds. Upon finding an SMS with the word `CONNECT` and a PIN-code, the PIN code will be parsed and passed back to a callback JavaScript function. More discussion can be found on Github in issue [#15](https://github.com/telenordigital/connect-android-sdk/issues/15).


## Add ConnectActivity for sign in

The `ConnectActivity` needs to be added to the manifest in order for the SDK to work on devices not using the Chrome Custom Tab feature. Also if the `intent-filter` is missing the SDK will fall back to use this `Activity`. Add it to the `application` section.

```xml
<application>
...
    <activity
        android:name="com.telenor.connect.ui.ConnectActivity"
        android:configChanges="keyboard|keyboardHidden|screenLayout|screenSize|orientation"
        android:label="@string/app_name"
        android:theme="@android:style/Theme.Holo.Light.NoActionBar" />
...
</application>
```

