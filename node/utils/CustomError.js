/*
 This helper modules allows us to create different type of errors we can throw
 */
function CustomError(message, errorName) {
  this.name = errorName || "Error";
  this.message = message;

  var stackParts = new Error().stack.split("\n");
  stackParts.splice(0, 2);
  stackParts.unshift(this.name + ": " + message);

  this.stack = stackParts.join("\n");
}
CustomError.prototype = Error.prototype;

module.exports = CustomError;
