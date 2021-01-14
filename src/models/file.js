module.exports = (sequelize, Sequelize) => {
    const File = sequelize.define('File', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
        },
        name: { type: Sequelize.STRING, allowNull: false },
        user_id: { type: Sequelize.INTEGER, allowNull: false },
        content_type: { type: Sequelize.STRING, allowNull: false },
        data: { type: Sequelize.BLOB('long'), allowNull: false }
    });    
    return File;
}