
switch(CHERT_PLATFORM.split("-")[1]) {
  case "mswin32wsh":
    require(_R("wsh"));
    require(_R("wsh/dom"));
    break;
  case "linux":
    require(_R("spidermonkey"));
    require(_R("spidermonkey/dom"));
    break;
  default:
    throw "unknown platform -- " + CHERT_PLATFORM;
};
