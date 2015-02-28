module.exports = function (seq, DataTypes) {
  return seq.define("Book", {
    id: { type: DataTypes.INTEGER, autoIncrement: true },
    name: DataTypes.STRING(256),
    sn: DataTypes.STRING(256),
    summary: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  });
};