module.exports = (sequelize, DataTypes, Model) => {

    class User extends Model { }

    User.init({
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING,
        }
    }, {
        // Other model options go here
        sequelize,
        tableName: 'users',
    })

    // `sequelize.define` also returns the model
    // console.log(User === sequelize.models.User); // true

    return User;
}
