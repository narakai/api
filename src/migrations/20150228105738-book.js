"use strict";

module.exports = {
  up: function (migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.createTable('book', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      sn: {
        type: DataTypes.STRING(256)
      },
      summary:{
        type: DataTypes.TEXT
      },
      userId:{
        type: DataTypes.INTEGER
      }
    });
    done();
  },

  down: function (migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.dropTable('book');
    done();
  }
};
