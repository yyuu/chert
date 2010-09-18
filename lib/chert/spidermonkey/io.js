////////////////////////////////////////////////////
/* $Id: io.js 215 2009-03-20 00:26:35Z 9703767 $ */
////////////////////////////////////////////////////

require(_R("io"));

STDOUT  = new IO(WScript.StdOut, "w");
STDERR  = new IO(WScript.StdErr, "w");
STDIN   = new IO(WScript.StdIn,  "r");
$defout = STDOUT;

Object.extend(IO.prototype, {
  _close: function(fp) {
    return fp.Close();
  },
  _feof: function(fp) {
    return fp.AtEndOfStream;
  },
  _read: function(fp, len) {
    var str = (len == null) ? fp.ReadAll()
                            : fp.Read(len);
    return str;
  },
  _readline: function(fp) {
    var str = fp.ReadLine() + newline();
    return str;
  },
  _write: function(fp, str) {
    return fp.Write(str);
  },
  _writeline: function(fp, str) {
    return fp.WriteLine(str.chomp() + newline());
  }
});

IO.popen = function(cmd, str_mode, lambda) {
  var shell = $WSH.create("WScript.Shell");
  var sh_ex = shell.Exec(cmd);

  var fp;
  var int_mode = this._mode_str2int(str_mode);
  if((int_mode & IO.RDWR) == 0) {
    if((int_mode & IO.WRONLY) == 0) {
//    fp = new IO(sh_ex.StdIn,  int_mode); // "r"
      fp = new IO(sh_ex.StdOut,  int_mode); // "r"
    } else {
//    fp = new IO(sh_ex.StdOut, int_mode); // "w" or "a"
      fp = new IO(sh_ex.StdIn, int_mode); // "w" or "a"
    }
  } else { // opened for both read and write
//  fp = new IO(sh_ex.StdIn, sh_ex.StdOut, int_mode); // "r+" or "w+"
    fp = new IO(sh_ex.StdOut, sh_ex.StdIn, int_mode); // "r+" or "w+"
  }

  if(lambda) {
    try {
      lambda.call(fp, fp);
    } catch(e) {
      throw e;
    } finally {
      try {
        fp.close();
      } catch(e) {
        // nop
      }
    }
  }
  return fp;
};
