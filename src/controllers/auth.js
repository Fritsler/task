const express = require('express');
const router = new express.Router();
const utils = require('../middlewares/utils')
const User = require('../config/db.config').users;

router.post('/', (req, res) => {
    User.findAll({
        where: {
            login: req.body.username
        }
    }).then(users => {
        if (users.length === 0 || users.length > 1) {
            const respJson = { error: 'wrongUserName' };
            return res.status(403).json(respJson);
        } else {
            const user = users.shift().dataValues;
            if (utils.comparePass(req.body.password, user.password)) {
                const accessToken = utils.accessToken(user);
                const respJson = { accessToken };
                return res.status(200).json(respJson);
            } else {
                const respJson = { error: 'wrongPassword' };
                return res.status(403).json(respJson);    
            }    
        }        
    }).catch(err => {
        const respJson = { error: err.stack };
        return res.status(500).json(respJson);
    })
});

module.exports = router;