"use strict";exports.settle=function(t,s,e){const{validateStatus:o}=e.config,a=e.statusCode;!a||o&&!o(a)?s(e):t(e)};
