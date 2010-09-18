/*
 * configure-wsh.js: initial configuration script for WSH environment
 *
 */

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
//load(__load__(JSCONFIG));

// main()
var CHERT_VERSION  = "0.0.1";
var CHERT_PLATFORM = "i386-mswin32wsh";

var Config     = {};
var $LOAD_PATH = ["./lib", "./vendor/lib"];
load(_L("./lib/wsh/environ.js"));
require(_R("chert"));


// initializing Config
var prefix = Dir.pwd();

Config["prefix"]         = prefix;
Config["bindir"]         = File.join(prefix, "bin");
Config["datadir"]        = File.join(prefix, "share");
Config["sysconfdir"]     = File.join(prefix, "conf");
Config["localstatedir"]  = File.join(prefix);
Config["sharedstatedir"] = File.join(prefix);
Config["libdir"]         = File.join(prefix, "lib");
Config["logdir"]         = File.join(prefix, "logs");

var vendor = File.join(prefix, "vendor");
Config["vendordir"]      = vendor;
Config["vendorbindir"]   = File.join(vendor, "bin");
Config["vendorlibdir"]   = File.join(vendor, "lib");


// initializing $LOAD_PATH
var str_config    = Object.toJSON(Config);
var str_load_path = "[Config[\"libdir\"], Config[\"vendorlibdir\"]]";
var str_require   = "Config[\"libdir\"] + \"/wsh/environ.js\"";
var str_stdlib    = "\"chert\"";

try {
  File.open(JSCONFIG, "w", function(fp) {
    fp.puts("var CHERT_VERSION  = " + CHERT_VERSION.inspect());
    fp.puts("var CHERT_PLATFORM = " + CHERT_PLATFORM.inspect());
    fp.puts("var Config = "         + str_config    + ";");
    fp.puts("var $LOAD_PATH = "     + str_load_path + ";");

    fp.puts("load(_L("              + str_require   + "));");
    fp.puts("require(_R("           + str_stdlib    + "));");
  });
} catch(e) {
  STDERR.printf("error while attempt to write to %s -- %s", JSCONFIG, e);
};
