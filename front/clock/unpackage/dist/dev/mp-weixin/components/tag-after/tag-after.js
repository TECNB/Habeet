"use strict";
const common_assets = require("../../common/assets.js");
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "tag-after",
  setup(__props) {
    common_vendor.useRouter();
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$17
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/uni-app/clock/components/tag-after/tag-after.vue"]]);
wx.createComponent(Component);
