/* error.js */

Error.prototype.inspect = function() {
  return "#<" + this.name + ":" + this.number  +
                " message="     + this.message +
                " description=" + this.description + ">";
};
