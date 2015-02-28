module.exports = function (seq, DataTypes) {
  return seq.define("user", {
    id: DataTypes.UUIDV4,
    isbn: DataTypes.STRING(256),
    name: DataTypes.STRING(256),
    summary: DataTypes.TEXT,
    userId: DataTypes.UUIDV4
  });
};