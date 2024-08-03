module.exports = (sequelize, DataTypes, Model) => {

    class Task extends Model { }

    Task.init({
        // Model attributes are defined here
        taskName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isCompleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        list_id: DataTypes.INTEGER
    }, {
        // Other model options go here
        sequelize,
        tableName: 'tasks',
    })

    return Task;
}
