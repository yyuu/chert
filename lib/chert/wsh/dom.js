/**
 * dummy.js - dummy WebBrowser's objects for cscript.exe
 * 
 * VERSION:
 *  v0.2
 *
 * AUTHOR:
 *  dara-j (http://dara-j.asablo.jp/blog/)
 *
 * LICENSE:
 *  NYSL Version 0.9982 (http://http://www.kmonos.net/nysl/)
 *
 * HISTORY:
 *   2007/04/24 - v0.1    - first release
 *   2007/05/07 - v0.2    - prototype 1.5.0 & 1.5.1 support
 *   2009/03/14 - v0.3    - prototype 1.6.0 support by yyuu
 *
 * $Id: msie6.js 139 2009-03-15 09:48:09Z 9703767 $
 *
 */

require(_R("wsh"));

var location = {
  hash:     "",
  host:     "localhost",
  hostname: "localhost",
  href:     "",
  pathname: ".",
  port:     0,
  protocol: "file:",
  search:   "",

  reload:   function() { },
  replace:  function() { }
};

var navigator = {
  appCodeName:   WScript.Name,
  appName:       WScript.Name,
  appVersion:    WScript.Version,
  cookieEnabled: false,
  javaEnabled:   false,
  mimeTypes:     ["text/plain"],
  plugins:       [],
  platform:      "Win32",
  userAgent:     "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)"
};

var window = {
  HTMLElement:         { prototype: {} },
  HTMLFormElement:     { prototype: {} },
  HTMLInputElement:    { prototype: {} },
  HTMLTextAreaElement: { prototype: {} },
  HTMLSelectElement:   { prototype: {} },

  document: {
    body:            null,
    documentElement: null,

    createElement: function() {
      return Node;
    },
    write: function(str) {
      WScript.echo(str);
    },
    addEventListener:       function() { },
    getElementById:         function() { },
    getElementByName:       function() { },
    getElementsByTagName:   function() { },
    getElementsByTagNameNS: function() { },
    createTextNode:         function() { }
  },

  alert: function(str) {
    return $WSH.VBScript.MsgBox(str);
  },
  confirm: function(str) {
    var shell = $WSH.create("WScript.Shell");
    if(shell.Popup(str, 0, WScript.Name, 4) == 6) { // 6 means "Yes"
      return true;
    }
    return false;
  },
  prompt: function(str) {
    return $WSH.VBScript.InputBox(str);
  },
  attachEvent: function() { }
};
var document = window.document;

var Node = {
  ELEMENT_NODE:                1,  // Element
  ATTRIBUTE_NODE:              2,  // Attr
  TEXT_NODE:                   3,  // Text
  CDATA_SECTION_NODE:          4,  // CDATASection
  PROCESSING_INSTRUCTION_NODE: 7,  // ProcessingInstruction
  COMMENT_NODE:                8,  // Comment
  DOCUMENT_NODE:               9,  // Document
  DOCUMENT_TYPE_NODE:          10, // DocumentType
  DOCUMENT_FRAGMENT_NODE:      11, // DocumentFragment

  attributes:    [],
  childNodes:    [],
  firstChild:    null,
  lastChild:     null,
  nextSibling:   null,
  nodeName:      "",
  nodeType:      1,
  nodeValue:     "",
  ownerDocument: window.document,
  parentNode:    null,
  __proto__:     {},

  appendChild:   function() { },
  cloneNode:     function() { }
};

var Element             = {};

var HTMLElement         = window.HTMLElement;
var HTMLFormElement     = window.HTMLFormElement;
var HTMLInputElement    = window.HTMLInputElement;
var HTMLTextAreaElement = window.HTMLTextAreaElement;
var HTMLSelectElement   = window.SelectElement;
