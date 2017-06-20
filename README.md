# PAW-Auth0TokenDynamicValue

This project was created to help simplify testing our API with paw, authenticating with Auth0.

> Please note: We have specific requirements on our API to require the `email` field in the token. If this causes problems for you, create an issue and I'll make it optional

## Usage

You will need your app's `clientId` and `clientSecret` in order to sign the token properly. You can get these from your dashboard.

You will also need your account's issuer, typically, `https://<accountName>.auth0.com/`.

> The trailing slash `/` in the issuer may be required, depending on your setup

Finally, to login as a specific user, you will need their `userId` (`email` is optional).

To utilize the token, create a header, and as the value, use `Auth0 Authorization Token`
