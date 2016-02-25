loadScript('crypto-core.js');
loadScript('crypto-hmac.js');
loadScript('crypto-sha256.js');
loadScript('crypto-base64.js');

function getBase64Encoded(rawStr) {
	var wordArray = CryptoJS.enc.Utf8.parse(rawStr);
	var result = CryptoJS.enc.Base64.stringify(wordArray);
	return result;
}

// Extensions are implemented as JavaScript classes
var Auth0Token = function() {

  // implement the evaluate() method to generate the dynamic value
  this.evaluate = function() {
    var now = Math.floor((new Date()).getTime() / 1000),
    	headerInput = JSON.stringify({
			'typ': 'JWT',
			'alg': 'HS256'
		}),
    	bodyInput = JSON.stringify({
			'name': this.name,
			'email': this.email,
			'email_verified': false,
			'iss': this.issuer,
			'sub': "auth0|" + this.userId,
			'aud': this.clientId,
			'exp': now + (60 * 60 * 24 * 7),
			'iat': now
		});
		
    var base64Header = getBase64Encoded(headerInput);
    var base64Payload = getBase64Encoded(bodyInput);

    var signature = CryptoJS.HmacSHA256(base64Header + "." + base64Payload, this.clientSecret);
    var base64Sign = CryptoJS.enc.Base64.stringify(signature);

    return 'Bearer ' + base64Header + "." + base64Payload + "." + base64Sign;
  }
}

// set the Extension Identifier (must be same as the directory name)
Auth0Token.identifier = "io.blackcode.Auth0Token";

// give a display name to your Dynamic Value
Auth0Token.title = "Auth0 Authorization Token Generator";

// link to the Dynamic Value documentation
Auth0Token.help = "https://Auth0.com";

Auth0Token.inputs = [
	DynamicValueInput("issuer", "Issuer", "String"),
	DynamicValueInput("name", "Name", "String"),
	DynamicValueInput("userId", "User Id", "String"),
	DynamicValueInput("email", "User Email", "String"),
	DynamicValueInput("clientId", "Client ID", "String"),
	DynamicValueInput("clientSecret", "Client Secret", "String")
]

registerDynamicValueClass(Auth0Token);