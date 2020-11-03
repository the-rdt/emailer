const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const creds = {
	clientId:
		"963941015106-ikdosd5a7pcfeskgo45dm3dkh0lqqm4p.apps.googleusercontent.com",
	clientSecret: "KNO2DKJKitzvEdELA4HaCXJ8",
	refreshToken:
		"1//04Hl2PqQmtk8hCgYIARAAGAQSNwF-L9Ir2WsE3xT9zDsyrwoOf2NQPH1rHsw7OWkD2ktRowYe1W0wtonbShHX0RUw64KD-uUHVi8",
	myGmail: "rdtiwari.social@gmail.com",
};

const oauth2Client = new OAuth2(
	creds.clientId, // ClientID
	creds.clientSecret, // Client Secret
	"https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
	refresh_token: creds.refreshToken,
});

const accessToken = oauth2Client.getAccessToken();
const smtpTransport = nodemailer.createTransport({
	service: "gmail",
	auth: {
		type: "OAuth2",
		user: creds.myGmail,
		clientId: creds.clientId,
		clientSecret: creds.clientSecret,
		refreshToken: creds.refreshToken,
		accessToken: accessToken,
	},
	tls: {
		rejectUnauthorized: false,
	},
});

const mailOptions = {
	from: creds.myGmail,
	to: "rdtiwari.official@gmail.com",
	subject: "Node.js Email with Secure OAuth",
	generateTextFromHTML: true,
	html: "<b>test again sdvasd</b>",
};

smtpTransport.sendMail(mailOptions, (error, response) => {
	error ? console.log(error) : console.log(response);
	smtpTransport.close();
});
