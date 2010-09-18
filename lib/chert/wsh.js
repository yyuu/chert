/* utility functions for WSH environment */

// WSH object manager/cacher
var $WSH = {
  _object: {},

  CreateObject: function() {
    var val = this._object[key];
    if(!val || force_create)
      val = this.set(key, WScript.CreateObject(key));
    return val;
  },

  GetObject: function() {
    var val = this._object[key];
    if(!val || force_retry) // WScript.GetObject occurs exception
      val = this.set(key, GetObject(key));
    return val;
  },

  create: function(key, force_create) {
    return this.CreateObject.apply(this, arguments);
  },

  get: function(key, force_retry) {
    return this.GetObject.apply(this, arguments);
  },

  set: function(key, val) {
    this._object[key] = val;
    return val;
  },

  unset: function(key) {
    var val = this._object[key];
    delete this._object[key];
    return val;
  }
};

// calling some VBScript methods
$WSH.VBScript = {
  MsgBox: function(str) {
    var interp = $WSH.CreateObject("ScriptControl", true);
    var source = "MsgBox " + "Unescape(" + "\"" + escape(str) + "\"" + ")";

    interp.Language = "VBScript";
    return interp.ExecuteStatement(source);
  },
  InputBox: function(str) {
    var interp = $WSH.CreateObject("ScriptControl", true);
    var source = "function __InputBox__(prompt, title)"     + newline() +
                 "  __InputBox__ = InputBox(prompt, title)" + newline() +
                 "end function"                             + newline();

    interp.Language = "VBScript";
    interp.AddCode(source);
    return interp.Run("__InputBox__", str, WScript.Name);
  }
};

// foreach for Enumerator
Enumerator.foreach = function(objset, iterator, context) {
  for(var i=0, e=new Enumerator(objset); !e.atEnd(); i++, e.moveNext())
    iterator.call(context, e.item(), i);
};

// convert VBArray to JavaScript array
VBArray.toArray = function(vb_ary) {
  var js_ary = (new VBArray(vb_ary)).toArray();
  return js_ary;
};

// convert JavaScript array to VBArray
VBArray.fromArray = function(js_ary) {
  var dict = $WSH.CreateObject("Scripting.Dictionary", true);
  for(var i=0; i<js_ary.length; i++)
    dict.add(i, js_ary[i]);
  var vb_ary = dict.Items();
  return vb_ary;
};

if(!("newline" in this)) {
  function newline() {
    return "\r\n";
  };
};
