
require(_R("dom"));
require(_R("prototype"));

String.prototype.toInteger = function() {
  var num;
  try {
    num = parseInt(this, 10);
  } catch(e) {
    num = 0;
  }
  return num;
};

String.prototype.toFloat = function() {
  var num;
  try {
    num = parseFloat(this);
  } catch(e) {
    num = 0.0;
  }
  return num;
};

String.prototype.chop  = function() {
  return this.slice(0, -1);  
};

String.prototype.chomp = function() {
  var str  = this;
  var chop = 0;
  if(this.charAt(this.length-1) == "\n") {
    chop += 1;
    if(this.charAt(this.length-2) == "\r") {
      chop += 2;
    }
    str = this.slice(0, 1-chop);
  }
  return str;
};

String.prototype.sprintf = function() {
  var str = "";
  var match;

  for(var arg_i=0, __self=this; 0<__self.length; ) {
    if(match = __self.match(/%(%|(-)?(0)?([1-9]*)([Xdfsx]))/)) {
      str += __self.slice(0, match.index);
      var f=match[1], l=match[2], z=match[3], n=match[4], c=match[5];
      if(f == "%") { // if "%%" given
        str += "%";
      } else {
        var s;
        switch(c) {
          case "d":
            s = arguments[arg_i].toString();
            break;
          case "s":
            s = arguments[arg_i].toString();
            break;
          default:
            raise("unsupported format string -- " + c);
        }
        if(n) {    // if format length given (e.g. "%2d")
          var n_i = parseInt(n);
          var p = z ? "0" : " ", pad = "";
          for(var i=s.length; i<n_i; i++) pad += p;
          s = (l && !z) ? (s + pad) : (pad + s);
        }
        str += s;
      }
      __self = __self.slice(match.index + match[0].length);
      arg_i++;
    } else {
      str   += __self;
      __self = "";
    }
  }
  return str;
};

function sprintf(str) {
  return str.sprintf.apply(str, $A(arguments).slice(1));
};
