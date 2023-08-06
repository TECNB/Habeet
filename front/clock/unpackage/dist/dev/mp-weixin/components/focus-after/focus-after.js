"use strict";
const common_assets = require("../../common/assets.js");
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "focus-after",
  setup(__props) {
    common_vendor.useRouter();
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$12
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/uni-app/clock/components/focus-after/focus-after.vue"]]);
wx.createComponent(Component);
