module.exports = (sequelize, DataTypes, Model) => {

    class List extends Model { }

    List.init({
        // Model attributes are defined here
        listName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        // Other model options go here
        sequelize,
        tableName: 'lists',
    })

    return List;
}
