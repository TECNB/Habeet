"use strict";
const common_vendor = require("../../common/vendor.js");
const store_user = require("../../store/user.js");
const _sfc_main = {
  __name: "time-avater",
  setup(__props) {
    const user = store_user.useUserStore();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(user).data.picUrl,
        b: common_vendor.t(common_vendor.unref(user).data.userName)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/uni-app/clock/components/time-avater/time-avater.vue"]]);
wx.createComponent(Component);
