/*
 * require.js: require for WSH
 *
 * this should be read first than all other
 *
 */

if(!("$LOAD_PATH" in this)) {
  WScript.echo("load path not initialized.");
  WScript.quit(1);
}
if(!("$LOADED_FEATURES" in this))
  var $LOADED_FEATURES = [];

function __require__(name) {
  var fso = (this["$WSH"] || WScript).CreateObject("Scripting.FileSystemObject");

// return "false" if already loaded
  var suffix = ["", ".js"];
  for(var i=0; i<$LOADED_FEATURES.length; i++)
    for(var j=0; j<suffix.length; j++)
      if($LOADED_FEATURES[i] == (name + suffix[j])) return "false";

// find file from $LOAD_PATH
  var path, src;
  for(var i=0; i<$LOAD_PATH.length; i++) {
    for(var j=0; j<suffix.length; j++) {
      path = $LOAD_PATH[i] + "/" + name + suffix[j];
      if(fso.FileExists(path)) {
        name += suffix[j];
        break;
      } else {
        path = null;
      }
    };
    if(path) break;
  };

  $LOADED_FEATURES.push(name);
  return __load__(path);
};
var _R = __require__;
