"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_tag_creat_menu2 = common_vendor.resolveComponent("tag-creat-menu");
  _easycom_tag_creat_menu2();
}
const _easycom_tag_creat_menu = () => "../../components/tag-creat-menu/tag-creat-menu.js";
if (!Math) {
  _easycom_tag_creat_menu();
}
const _sfc_main = {
  __name: "TagCreat",
  setup(__props) {
    return (_ctx, _cache) => {
      return {};
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/uni-app/clock/pages/TagCreat/TagCreat.vue"]]);
wx.createPage(MiniProgramPage);
