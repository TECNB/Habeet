"use strict";const e=require("../../common/vendor.js"),r=require("../../store/user.js"),t={__name:"time-avater",setup(t){const s=r.useUserStore();return(r,t)=>({a:e.unref(s).data.picUrl,b:e.t(e.unref(s).data.userName)})}};wx.createComponent(t);
