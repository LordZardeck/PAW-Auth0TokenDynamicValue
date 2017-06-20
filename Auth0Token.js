var jsrassign = require("./jsrassign");

// Extensions are implemented as JavaScript classes
var Auth0Token = function() {
  // implement the evaluate() method to generate the dynamic value
  this.evaluate = function() {
    var now = Math.floor(new Date().getTime() / 1000),
      headerInput = {
        typ: "JWT",
        alg: "HS256"
      },
      bodyInput = {
        email: this.email,
        iss: this.issuer,
        sub: this.userId,
        aud: this.clientId,
        exp: now + 60 * 60 * 24 * 7,
        iat: now
      };
    secret = this.base64encoded
      ? { b64: jsrassign.b64utob64(this.clientSecret) }
      : this.clientSecret;

    // provider should be included in userId, but assume auth0 if not
    if (bodyInput.sub.split("|").length === 1) {
      bodyInput.sub = "auth0|" + bodyInput.sub;
    }

    return (
      "Bearer " + jsrassign.jws.JWS.sign(null, headerInput, bodyInput, secret)
    );
  };
};

// set the Extension Identifier (must be same as the directory name)
Auth0Token.identifier = "io.blackcode.Auth0Token";

// give a display name to your Dynamic Value
Auth0Token.title = "Auth0 Authorization Token";

// link to the Dynamic Value documentation
Auth0Token.help = "https://github.com/LordZardeck/PAW-Auth0TokenDynamicValue";

Auth0Token.inputs = [
  InputField("issuer", "Issuer", "String"),
  InputField("userId", "User Id", "String"),
  InputField("email", "User Email", "String"),
  InputField("clientId", "Client ID", "String"),
  InputField("clientSecret", "Client Secret", "SecureValue"),
  InputField("base64encoded", "Secret Base64 Encoded?", "Checkbox")
];

registerDynamicValueClass(Auth0Token);
