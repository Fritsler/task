const { Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.files = require('../models/file.js')(sequelize, Sequelize);
User = db.users = require('../models/user.js')(sequelize, Sequelize);

sequelize
  .sync()
  .then(() => {
    const salt = bcrypt.genSaltSync();

    User.findAll().then(user => {
      if (user.length === 0) {
        User.create({
          name: 'User One',
          login: 'user1',
          password: bcrypt.hashSync('asd', salt),
        });
        User.create({
          name: 'User Two',
          login: 'user2',
          password: bcrypt.hashSync('zxc', salt),
        });
        User.create({
          name: 'User Three',
          login: 'user3',
          password: bcrypt.hashSync('qwe', salt),
        });
      }
    })  
  }).catch(err => {
    console.log(err);
  });

module.exports = db;
