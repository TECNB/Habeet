"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const store_tag = require("../../store/tag.js");
const store_user = require("../../store/user.js");
const store_time = require("../../store/time.js");
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_tag_menu2 = common_vendor.resolveComponent("tag-menu");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_tag_menu2)();
}
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_tag_menu = () => "../tag-menu/tag-menu.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_tag_menu)();
}
const _sfc_main = {
  __name: "time-timer",
  setup(__props) {
    const url = common_vendor.inject("url");
    const user = store_user.useUserStore();
    const tag = store_tag.useTagStore();
    const time = store_time.useTimeStore();
    const state = common_vendor.reactive({
      remainingTime: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      formattedTime: "",
      content: ""
    });
    let countdownInterval = null;
    let popup1 = common_vendor.ref(null);
    let popup2 = common_vendor.ref(null);
    common_vendor.onMounted(() => {
    });
    time.data.remainingTime = tag.data.tagHour * 3600 + tag.data.tagMinute * 60 + tag.data.tagSecond;
    const formatTime = (time2) => {
      return String(time2).padStart(2, "0");
    };
    time.data.formattedTime = common_vendor.computed(() => {
      state.hours = Math.floor(time.data.remainingTime / 3600);
      state.minutes = Math.floor(time.data.remainingTime % 3600 / 60);
      state.seconds = Math.floor(time.data.remainingTime % 60);
      return `${formatTime(state.hours)}:${formatTime(state.minutes)}:${formatTime(state.seconds)}`;
    });
    const timeup = () => {
      common_vendor.index.request({
        url: url + "/tag/finish",
        method: "POST",
        data: {
          tagName: tag.data.tagName
        },
        success: (res) => {
          console.log(res);
          user.data.point = res.data.data.tagPoint;
        }
      });
      clearInterval(countdownInterval);
      countdownInterval = null;
      time.data.remainingTime = tag.data.tagHour * 3600 + tag.data.tagMinute * 60 + tag.data.tagSecond;
      time.data.ifbegin = !time.data.ifbegin;
      time.data.ifend = !time.data.ifend;
      state.content = "本次计时获得 " + tag.data.tagPoint + "points";
      popup2.value.open();
    };
    const timeBegin = () => {
      if (tag.data.tagName == null) {
        common_vendor.index.showToast({
          icon: "none",
          title: "没有标签，快去建立吧"
        });
      } else {
        time.data.showNav_menu = false;
        countdownInterval = setInterval(() => {
          time.data.remainingTime--;
          if (time.data.remainingTime <= 0) {
            clearInterval(countdownInterval);
            countdownInterval = null;
            timeup();
          }
        }, 1e3);
        time.data.ifbegin = !time.data.ifbegin;
        time.data.ifend = !time.data.ifend;
      }
    };
    const timeEnd = () => {
      popup1.value.open();
    };
    const confirm1 = () => {
      time.data.showNav_menu = true;
      clearInterval(countdownInterval);
      countdownInterval = null;
      time.data.remainingTime = tag.data.tagHour * 3600 + tag.data.tagMinute * 60 + tag.data.tagSecond;
      time.data.ifbegin = !time.data.ifbegin;
      time.data.ifend = !time.data.ifend;
      popup1.value.close();
    };
    const close1 = () => {
      time.data.showNav_menu = true;
      popup1.value.close();
    };
    const confirm2 = () => {
      time.data.showNav_menu = true;
      popup2.value.close();
    };
    const close2 = () => {
      time.data.showNav_menu = true;
      popup2.value.close();
    };
    const showTagMenu = () => {
      tag.data.ifshowTagMenu = !tag.data.ifshowTagMenu;
    };
    common_vendor.onBeforeUnmount(() => {
      clearInterval(countdownInterval);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$7,
        b: common_vendor.t(common_vendor.unref(tag).data.tagName),
        c: common_vendor.o(showTagMenu),
        d: common_vendor.t(common_vendor.unref(time).data.formattedTime),
        e: common_vendor.unref(time).data.ifbegin
      }, common_vendor.unref(time).data.ifbegin ? {
        f: common_vendor.o(timeBegin)
      } : {}, {
        g: common_vendor.unref(time).data.ifend
      }, common_vendor.unref(time).data.ifend ? {
        h: common_vendor.o(timeEnd)
      } : {}, {
        i: common_vendor.o(close1),
        j: common_vendor.o(confirm1),
        k: common_vendor.p({
          type: "error",
          mode: "base",
          title: "确定要放弃吗?",
          content: "本次计时将不会得到任何分数",
          duration: 2e3,
          ["before-close"]: "true"
        }),
        l: common_vendor.sr(popup1, "4eec1b59-0", {
          "k": "popup1"
        }),
        m: common_vendor.p({
          type: "dialog"
        }),
        n: common_vendor.o(close2),
        o: common_vendor.o(confirm2),
        p: common_vendor.p({
          type: "info",
          mode: "base",
          title: "计时结束",
          content: state.content,
          duration: 2e3,
          ["before-close"]: "true"
        }),
        q: common_vendor.sr(popup2, "4eec1b59-2", {
          "k": "popup2"
        }),
        r: common_vendor.p({
          type: "dialog"
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/uni-app/clock/components/time-timer/time-timer.vue"]]);
wx.createComponent(Component);
