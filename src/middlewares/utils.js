const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

encrypt = (str) => {
	return CryptoJS.AES.encrypt(str, process.env.SECRET).toString();
};

decrypt = (str) => {
	let bytes = CryptoJS.AES.decrypt(str, process.env.SECRET);	
	return bytes.toString(CryptoJS.enc.Utf8);
};

comparePass = (userPassword, databasePassword) => {
	return bcrypt.compareSync(userPassword, databasePassword);

};

accessToken = (user) => {
	let accessTokenUser = {};
	accessTokenUser.login = encrypt(user.login);
	accessTokenUser.id = encrypt(user.id+'');
	return jwt.sign(accessTokenUser, process.env.JWT_KEY, { expiresIn: 60 * 30 });
};

module.exports = {
    encrypt,
    decrypt,
    accessToken,
    comparePass,
};