const jwt = require('jsonwebtoken');
const utils = require('./utils');

module.exports = function (req, res, next) {
	try {
		const accessToken = req.headers.authorization.split(' ')[1];
		let user = jwt.verify(accessToken, process.env.JWT_KEY);
		user.login = utils.decrypt(user.login);
		user.id = utils.decrypt(user.id);
		req.userData = user;
		next();
	} catch (err) {
		res.status(401).json({
			message: 'unauthorized'
		})
	}
};