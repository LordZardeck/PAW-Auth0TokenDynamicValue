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
        sub: "auth0|" + this.userId,
        aud: this.clientId,
        exp: now + 60 * 60 * 24 * 7,
        iat: now
      };

    return (
      "Bearer " +
      jsrassign.jws.JWS.sign(null, headerInput, bodyInput, this.clientSecret)
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
  DynamicValueInput("issuer", "Issuer", "String"),
  DynamicValueInput("userId", "User Id", "String"),
  DynamicValueInput("email", "User Email", "String"),
  DynamicValueInput("clientId", "Client ID", "String"),
  DynamicValueInput("clientSecret", "Client Secret", "SecureValue")
];

registerDynamicValueClass(Auth0Token);
