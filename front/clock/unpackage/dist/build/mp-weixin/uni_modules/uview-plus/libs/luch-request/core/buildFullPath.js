"use strict";const e=require("../helpers/isAbsoluteURL.js"),s=require("../helpers/combineURLs.js");exports.buildFullPath=function(r,i){return r&&!e.isAbsoluteURL(i)?s.combineURLs(r,i):i};
