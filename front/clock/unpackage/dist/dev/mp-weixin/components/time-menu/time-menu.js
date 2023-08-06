"use strict";
const common_vendor = require("../../common/vendor.js");
const store_tag = require("../../store/tag.js");
const store_user = require("../../store/user.js");
const store_time = require("../../store/time.js");
if (!Array) {
  const _easycom_time_avater2 = common_vendor.resolveComponent("time-avater");
  const _easycom_focus_before2 = common_vendor.resolveComponent("focus-before");
  const _easycom_focus_after2 = common_vendor.resolveComponent("focus-after");
  const _easycom_target_before2 = common_vendor.resolveComponent("target-before");
  const _easycom_target_after2 = common_vendor.resolveComponent("target-after");
  const _easycom_tag_before2 = common_vendor.resolveComponent("tag-before");
  const _easycom_tag_after2 = common_vendor.resolveComponent("tag-after");
  const _easycom_store_before2 = common_vendor.resolveComponent("store-before");
  const _easycom_store_after2 = common_vendor.resolveComponent("store-after");
  const _easycom_user_before2 = common_vendor.resolveComponent("user-before");
  const _easycom_user_after2 = common_vendor.resolveComponent("user-after");
  const _easycom_setting_before2 = common_vendor.resolveComponent("setting-before");
  const _easycom_setting_after2 = common_vendor.resolveComponent("setting-after");
  const _easycom_help_before2 = common_vendor.resolveComponent("help-before");
  const _easycom_help_after2 = common_vendor.resolveComponent("help-after");
  const _easycom_logout2 = common_vendor.resolveComponent("logout");
  (_easycom_time_avater2 + _easycom_focus_before2 + _easycom_focus_after2 + _easycom_target_before2 + _easycom_target_after2 + _easycom_tag_before2 + _easycom_tag_after2 + _easycom_store_before2 + _easycom_store_after2 + _easycom_user_before2 + _easycom_user_after2 + _easycom_setting_before2 + _easycom_setting_after2 + _easycom_help_before2 + _easycom_help_after2 + _easycom_logout2)();
}
const _easycom_time_avater = () => "../time-avater/time-avater.js";
const _easycom_focus_before = () => "../focus-before/focus-before.js";
const _easycom_focus_after = () => "../focus-after/focus-after.js";
const _easycom_target_before = () => "../target-before/target-before.js";
const _easycom_target_after = () => "../target-after/target-after.js";
const _easycom_tag_before = () => "../tag-before/tag-before.js";
const _easycom_tag_after = () => "../tag-after/tag-after.js";
const _easycom_store_before = () => "../store-before/store-before.js";
const _easycom_store_after = () => "../store-after/store-after.js";
const _easycom_user_before = () => "../user-before/user-before.js";
const _easycom_user_after = () => "../user-after/user-after.js";
const _easycom_setting_before = () => "../setting-before/setting-before.js";
const _easycom_setting_after = () => "../setting-after/setting-after.js";
const _easycom_help_before = () => "../help-before/help-before.js";
const _easycom_help_after = () => "../help-after/help-after.js";
const _easycom_logout = () => "../logout/logout.js";
if (!Math) {
  (_easycom_time_avater + _easycom_focus_before + _easycom_focus_after + _easycom_target_before + _easycom_target_after + _easycom_tag_before + _easycom_tag_after + _easycom_store_before + _easycom_store_after + _easycom_user_before + _easycom_user_after + _easycom_setting_before + _easycom_setting_after + _easycom_help_before + _easycom_help_after + _easycom_logout)();
}
const _sfc_main = {
  __name: "time-menu",
  props: {
    menuTo: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    store_user.useUserStore();
    store_tag.useTagStore();
    store_time.useTimeStore();
    const state = common_vendor.reactive({
      showFocusBefore: true,
      showTargetBefore: true,
      showTagBefore: true,
      showStoreBefore: true,
      showUserBefore: true,
      showSettingBefore: true,
      showHelpBefore: true,
      showFocusAfter: false,
      showTargetAfter: false,
      showTagAfter: false,
      showStoreAfter: false,
      showUserAfter: false,
      showSettingAfter: false,
      showHelpAfter: false
    });
    if (props.menuTo == "/menu/1") {
      state.showFocusAfter = true;
      state.showFocusBefore = false;
    } else if (props.menuTo == "/menu/2") {
      state.showTargetBefore = false;
      state.showTargetAfter = true;
    } else if (props.menuTo == "/menu/3") {
      state.showTagBefore = false;
      state.showTagAfter = true;
    } else if (props.menuTo == "/menu/4") {
      state.showStoreBefore = false;
      state.showStoreAfter = true;
    } else if (props.menuTo == "/menu/5") {
      state.showUserBefore = false;
      state.showUserAfter = true;
    } else if (props.menuTo == "/menu/6") {
      state.showSettingBefore = false;
      state.showSettingAfter = true;
    } else if (props.menuTo == "/menu/7") {
      state.showHelpBefore = false;
      state.showHelpAfter = true;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: state.showFocusBefore
      }, state.showFocusBefore ? {} : {}, {
        b: state.showFocusAfter
      }, state.showFocusAfter ? {} : {}, {
        c: state.showTargetBefore
      }, state.showTargetBefore ? {} : {}, {
        d: state.showTargetAfter
      }, state.showTargetAfter ? {} : {}, {
        e: state.showTagBefore
      }, state.showTagBefore ? {} : {}, {
        f: state.showTagAfter
      }, state.showTagAfter ? {} : {}, {
        g: state.showStoreBefore
      }, state.showStoreBefore ? {} : {}, {
        h: state.showStoreAfter
      }, state.showStoreAfter ? {} : {}, {
        i: state.showUserBefore
      }, state.showUserBefore ? {} : {}, {
        j: state.showUserAfter
      }, state.showUserAfter ? {} : {}, {
        k: state.showSettingBefore
      }, state.showSettingBefore ? {} : {}, {
        l: state.showSettingAfter
      }, state.showSettingAfter ? {} : {}, {
        m: state.showHelpBefore
      }, state.showHelpBefore ? {} : {}, {
        n: state.showHelpAfter
      }, state.showHelpAfter ? {} : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/uni-app/clock/components/time-menu/time-menu.vue"]]);
wx.createComponent(Component);
