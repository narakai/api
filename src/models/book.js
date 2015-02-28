module.exports = function (seq, DataTypes) {
  return seq.define("user", {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING(256),
    sn: DataTypes.STRING(256),
    summary: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  });
};