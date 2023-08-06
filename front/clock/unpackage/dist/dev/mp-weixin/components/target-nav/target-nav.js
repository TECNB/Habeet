"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const store_target = require("../../store/target.js");
const store_user = require("../../store/user.js");
const _sfc_main = {
  __name: "target-nav",
  setup(__props) {
    common_vendor.inject("url");
    store_user.useUserStore();
    const target = store_target.useTargetStore();
    common_vendor.reactive({
      targetNoTime: [],
      targetWithTime: [],
      targetCompleted: [],
      targetExpire: [],
      ifshowButton: true,
      ifshowTargetTaskNull0: false,
      ifshowTargetTaskNull1: false,
      ifshowTargetTaskPAT: false,
      ifshowTargetTaskPATDelete: true,
      index: 0
    });
    common_vendor.onMounted(() => {
      target.data.targetName = "";
      target.data.targetDescribe = "";
      target.data.targetHour = "";
      target.data.deadline = "";
      target.data.targetPoint = 0;
      target.data.ifTargetUpdate = 0;
    });
    const ifDoing = () => {
      target.data.Doing = true;
      target.data.ifDoing = false;
      target.data.ifDone = true;
      target.data.Done = false;
      target.data.ifExpire = true;
      target.data.Expire = false;
      target.data.ifshowTargetTaskNull2 = false;
      target.data.ifshowTargetTaskNull3 = false;
      if (target.data.targetNoTimeLength == 0) {
        target.data.ifshowTargetTaskNull0 = true;
      }
      if (target.data.targetWithTimeLength == 0) {
        target.data.ifshowTargetTaskNull1 = true;
      }
    };
    const ifDone = () => {
      target.data.ifDoing = true;
      target.data.Doing = false;
      target.data.Done = true;
      target.data.ifDone = false;
      target.data.ifExpire = true;
      target.data.Expire = false;
      target.data.ifshowTargetTaskNull0 = false;
      target.data.ifshowTargetTaskNull1 = false;
      target.data.ifshowTargetTaskNull3 = false;
      if (target.data.targetCompletedLength == 0) {
        target.data.ifshowTargetTaskNull2 = true;
      }
    };
    const ifExpire = () => {
      target.data.ifDoing = true;
      target.data.Doing = false;
      target.data.Done = false;
      target.data.ifDone = true;
      target.data.ifExpire = false;
      target.data.Expire = true;
      target.data.ifshowTargetTaskNull0 = false;
      target.data.ifshowTargetTaskNull1 = false;
      target.data.ifshowTargetTaskNull2 = false;
      if (target.data.targetExpireLength == 0) {
        target.data.ifshowTargetTaskNull3 = true;
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(target).data.Doing
      }, common_vendor.unref(target).data.Doing ? {} : {}, {
        b: common_vendor.unref(target).data.ifDoing
      }, common_vendor.unref(target).data.ifDoing ? {
        c: common_vendor.o(ifDoing)
      } : {}, {
        d: common_vendor.unref(target).data.Done
      }, common_vendor.unref(target).data.Done ? {} : {}, {
        e: common_vendor.unref(target).data.ifDone
      }, common_vendor.unref(target).data.ifDone ? {
        f: common_vendor.o(ifDone)
      } : {}, {
        g: common_vendor.unref(target).data.Expire
      }, common_vendor.unref(target).data.Expire ? {} : {}, {
        h: common_vendor.unref(target).data.ifExpire
      }, common_vendor.unref(target).data.ifExpire ? {
        i: common_vendor.o(ifExpire)
      } : {}, {
        j: common_assets._imports_0$10
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/uni-app/clock/components/target-nav/target-nav.vue"]]);
wx.createComponent(Component);
