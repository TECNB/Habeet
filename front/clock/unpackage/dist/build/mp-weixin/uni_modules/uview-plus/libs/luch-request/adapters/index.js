"use strict";const e=require("../../../../../common/vendor.js"),t=require("../helpers/buildURL.js"),a=require("../core/buildFullPath.js"),r=require("../core/settle.js"),s=require("../utils.js"),d=(e,t)=>{const a={};return e.forEach((e=>{s.isUndefined(t[e])||(a[e]=t[e])})),a};exports.adapter=s=>new Promise(((l,o)=>{const i=t.buildURL(a.buildFullPath(s.baseURL,s.url),s.params),n={url:i,header:s.header,complete:e=>{s.fullPath=i,e.config=s;try{"string"==typeof e.data&&(e.data=JSON.parse(e.data))}catch(t){}r.settle(l,o,e)}};let u;if("UPLOAD"===s.method){delete n.header["content-type"],delete n.header["Content-Type"];const t={filePath:s.filePath,name:s.name},a=["formData"];u=e.index.uploadFile({...n,...t,...d(a,s)})}else if("DOWNLOAD"===s.method)u=e.index.downloadFile(n);else{const t=["data","method","timeout","dataType","responseType"];u=e.index.request({...n,...d(t,s)})}s.getTask&&s.getTask(u,s)}));