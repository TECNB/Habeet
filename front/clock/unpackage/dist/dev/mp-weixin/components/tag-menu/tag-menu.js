"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const store_target = require("../../store/target.js");
const store_user = require("../../store/user.js");
const store_time = require("../../store/time.js");
const store_tag = require("../../store/tag.js");
if (!Array) {
  const _easycom_uni_transition2 = common_vendor.resolveComponent("uni-transition");
  _easycom_uni_transition2();
}
const _easycom_uni_transition = () => "../../uni_modules/uni-transition/components/uni-transition/uni-transition.js";
if (!Math) {
  _easycom_uni_transition();
}
const _sfc_main = {
  __name: "tag-menu",
  setup(__props) {
    const url = common_vendor.inject("url");
    const user = store_user.useUserStore();
    store_target.useTargetStore();
    const time = store_time.useTimeStore();
    const tag = store_tag.useTagStore();
    const state = common_vendor.reactive({
      tagWithTime: [],
      hours: 0,
      minutes: 0,
      seconds: 0
    });
    common_vendor.onMounted(
      common_vendor.index.request({
        url: url + "/tag/get",
        method: "POST",
        data: user.data.userEmail,
        success: (res) => {
          console.log(res);
          tag.data.tagName = res.data.data[0].tagName;
          tag.data.tagDescribe = res.data.data[0].tagDescribe;
          tag.data.tagPoint = res.data.data[0].tagPoint;
          tag.data.tagHour = res.data.data[0].tagHour;
          tag.data.tagMinute = res.data.data[0].tagMinute;
          for (let i = 0; i < res.data.data.length; i++) {
            if (i == 0) {
              state.tagWithTime.push({
                "tagName": res.data.data[i].tagName,
                "tagDescribe": res.data.data[i].tagDescribe,
                "tagHour": res.data.data[i].tagHour,
                "tagMinute": res.data.data[i].tagMinute,
                "tagPoint": res.data.data[i].tagPoint,
                "className": "tagMenuListD1"
              });
            } else {
              state.tagWithTime.push({
                "tagName": res.data.data[i].tagName,
                "tagDescribe": res.data.data[i].tagDescribe,
                "tagHour": res.data.data[i].tagHour,
                "tagMinute": res.data.data[i].tagMinute,
                "tagPoint": res.data.data[i].tagPoint,
                "className": "tagMenuListD"
              });
            }
          }
        }
      })
    );
    const formatTime = (time2) => {
      return String(time2).padStart(2, "0");
    };
    const classChange = (index) => {
      state.tagWithTime.forEach((item) => {
        item.className = "tagMenuListD";
      });
      state.tagWithTime[index].className = "tagMenuListD1";
      time.data.ifstart = false;
      tag.data.tagName = state.tagWithTime[index].tagName;
      tag.data.tagDescribe = state.tagWithTime[index].tagDescribe;
      tag.data.tagPoint = state.tagWithTime[index].tagPoint;
      tag.data.tagHour = state.tagWithTime[index].tagHour;
      tag.data.tagMinute = state.tagWithTime[index].tagMinute;
      time.data.formattedTime = common_vendor.computed(() => {
        state.hours = Math.floor(time.data.remainingTime / 3600);
        state.minutes = Math.floor(time.data.remainingTime % 3600 / 60);
        state.seconds = Math.floor(time.data.remainingTime % 60);
        return `${formatTime(tag.data.tagHour)}:${formatTime(tag.data.tagMinute)}:${formatTime(0)}`;
      });
    };
    const timeBegin = () => {
      tag.data.ifshowTagMenu = !tag.data.ifshowTagMenu;
      time.data.remainingTime = tag.data.tagHour * 3600 + tag.data.tagMinute * 60 + tag.data.tagSecond;
      time.data.formattedTime = common_vendor.computed(() => {
        state.hours = Math.floor(time.data.remainingTime / 3600);
        state.minutes = Math.floor(time.data.remainingTime % 3600 / 60);
        state.seconds = Math.floor(time.data.remainingTime % 60);
        return `${formatTime(state.hours)}:${formatTime(state.minutes)}:${formatTime(state.seconds)}`;
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(state.tagWithTime, (item, index, i0) => {
          return {
            a: common_vendor.t(item.tagName),
            b: common_vendor.n(item.className),
            c: index,
            d: common_vendor.o(($event) => classChange(index), index)
          };
        }),
        b: common_assets._imports_0$12,
        c: common_vendor.t(common_vendor.unref(tag).data.tagHour),
        d: common_vendor.t(common_vendor.unref(tag).data.tagMinute),
        e: common_vendor.t(common_vendor.unref(tag).data.tagDescribe),
        f: common_vendor.o(timeBegin),
        g: common_vendor.p({
          ["mode-class"]: "fade",
          show: common_vendor.unref(tag).data.ifshowTagMenu,
          duration: "300"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/uni-app/clock/components/tag-menu/tag-menu.vue"]]);
wx.createComponent(Component);
