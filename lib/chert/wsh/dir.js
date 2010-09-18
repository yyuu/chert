////////////////////////////////////////////////////
/* $Id: dir.js 110 2009-03-14 16:39:30Z 9703767 $ */
////////////////////////////////////////////////////

require(_R("dir"));

var Dir = Class.create({
  _folder: null,

  initialize: function(folder) {
    this._folder = folder;
  }
});

Dir.open = function(name) {
  var folder   = $WSH.CreateObject("Scripting.FileSystemObject").GetFolder(name);
  var instance = new this(folder);

  return instance;
};

Dir.mkdir = function(name) {
  $WSH.CreateObject("Scripting.FileSystemObject").CreateFolder(name);
  return;
};

Dir.rmdir = function(name) {
  var entries = this.entries(name);
  if(entries.length == 0) {
    $WSH.CreateObject("Scripting.FileSystemObject").DeleteFolder(name);
  } else {
    throw "directory not empty - " + name;
  }
  return;
};
Dir.unlink = Dir.rmdir;

Dir.chdir = function(name) {
  $WSH.CreateObject("WScript.Shell").CurrentDirectory = name;
  return name;
};

Dir.getwd = function() {
  return $WSH.CreateObject("WScript.Shell").CurrentDirectory;
};
Dir.pwd = Dir.getwd;

Dir.entries = function(name) {
  var instance = this.open(name);
  var retval = new Array();

  Enumerator.foreach(instance._folder.Files, function(e) {
    retval.push(e.Name);
  });
  Enumerator.foreach(instance._folder.SubFolders, function(e) {
    retval.push(e.Name);
  });

  return retval;
};

Dir.glob = function(str) {
  throw "not implemented yet";
};
