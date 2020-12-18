var getDataType = function(data) {
  return Object.prototype.toString.call(data).toLowerCase().slice(8,-1);
}
var firstUpper = function(data) {
  if(!data) return '';
  return data[0].toUpperCase() + data.slice(1)
}
module.exports = {
  getDataType,
  firstUpper
};