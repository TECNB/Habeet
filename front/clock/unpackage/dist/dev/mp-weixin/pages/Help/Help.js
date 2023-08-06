"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_navbar2 = common_vendor.resolveComponent("navbar");
  _easycom_navbar2();
}
const _easycom_navbar = () => "../../components/navbar/navbar.js";
if (!Math) {
  _easycom_navbar();
}
const _sfc_main = {
  __name: "Help",
  setup(__props) {
    common_vendor.useRoute();
    common_vendor.useRouter();
    common_vendor.reactive({});
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          navbarTo: "/menu/7"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/uni-app/clock/pages/Help/Help.vue"]]);
wx.createPage(MiniProgramPage);
