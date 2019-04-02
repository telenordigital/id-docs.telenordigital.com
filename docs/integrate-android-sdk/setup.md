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
  - set
  - up
---

## Add dependencies

The binaries are included on JCenter, so the SDK can be added by including a line in your `build.gradle` file for your app.

```gradle
dependencies {
    // ...
    implementation 'com.telenor.connect:connect-android-sdk:<latest-version>' // add this line
}
```

Find latest version here: [github.com/telenordigital/connect-android-sdk/releases](https://github.com/telenordigital/connect-android-sdk/releases)


You may have to add JCenter as a repository on your top-level `build.gradle` file if this isn't done already:
```gradle
allprojects {
    repositories {
        jcenter()
    }
}
```

Before using the SDK some entries have to be added to `AndroidManifest.xml`. See instructions below. The example app also contains [a full example of a valid `AndroidManifest.xml`](https://github.com/telenordigital/connect-android-sdk/blob/master/connect-id-example/src/main/AndroidManifest.xml).

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


## Add networkSecurityConfig to application

```xml
<manifest ... >
  <application
    android:networkSecurityConfig="@xml/network_security_config_connect_id"
    // add this line ⬆️
    ... >
  </application>
</manifest>
```

*Your app's `AndroidManifest.xml` file.*

You can safely ignore the warning about unused tag in API levels lower than 24.

This is needed for the SDK to work as expected on Android Pie and newer.

If you have your own `networkSecurityConfig` make sure the entries from `network_security_config_connect_id` are included.

## (Optional) Enable SMS PIN autofill

You can optionally enable the feature for automatically filling in verification PIN codes received on SMS.

1.  [Calculate the app hash](https://developers.google.com/identity/sms-retriever/verify#computing_your_apps_hash_string).
1.  Send the 11 base64-encoded characters to us at integration-support<span style="display:none">nospamfiller</span>@telenordigital.com (**note** There will be one hash for the development version (staging) and one for the production version).
