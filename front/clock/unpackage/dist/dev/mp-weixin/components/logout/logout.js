"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const store_user = require("../../store/user.js");
const store_time = require("../../store/time.js");
const store_tag = require("../../store/tag.js");
const _sfc_main = {
  __name: "logout",
  setup(__props) {
    common_vendor.inject("url");
    const user = store_user.useUserStore();
    store_time.useTimeStore();
    store_tag.useTagStore();
    const toNav = () => {
      user.data.ifUpdate = "";
      user.data.userInfo = [];
      common_vendor.index.setStorage({
        key: "userInfo",
        data: user.data.userInfo,
        success: () => {
          console.log("success");
        }
      });
      common_vendor.index.redirectTo({
        url: "../../pages/Nav/Nav"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$26,
        b: common_vendor.o(toNav)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/uni-app/clock/components/logout/logout.vue"]]);
wx.createComponent(Component);
