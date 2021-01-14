module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
        },
        name: Sequelize.STRING,
        login: { type: Sequelize.STRING, allowNull: false, unique: true },
        password: { type: Sequelize.STRING, allowNull: false }
    });
    return User;
}