var JSCONFIG = "jsconfig";
function __load__(path) {
  var src, fso = (this["$WSH"] || WScript).CreateObject("Scripting.FileSystemObject");
  try {
    var fp = fso.OpenTextFile(path, 1, false, -2);
    src = fp.ReadAll();
    fp.Close();
  } catch(e) {
    WScript.echo("load failed -- " + path);
    WScript.quit(1);
  };
  return src;
};
var _L = __load__, load = eval, require = eval;
load(__load__(JSCONFIG));

// main()
