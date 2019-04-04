module.exports = function(sequelize, DataTypes) {
    // Parents.associate = function(models) {
    //     // Associating Author with Posts
    //     // When an Author is deleted, also delete any associated Posts
    //     Parents.hasMany(models.Student, {
    //         onDelete: "cascade"
    //     });
    //
    //     Parents.hasMany(models.Grades, {
    //         onDelete: "cascade"
    //     });
    // };

    return sequelize.define("testUserTable", {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true

            // defaultValue: "A"
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [1, 40]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};