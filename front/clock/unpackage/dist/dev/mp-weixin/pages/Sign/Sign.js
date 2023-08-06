"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const store_user = require("../../store/user.js");
const store_time = require("../../store/time.js");
const store_tag = require("../../store/tag.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "Sign",
  setup(__props) {
    const url = common_vendor.inject("url");
    const state = common_vendor.reactive({
      userConfirm: "",
      flag: false,
      countdown: 0,
      showClearIcon1: false,
      showClearIcon2: false,
      password: "password",
      eye: "eye"
    });
    const user = store_user.useUserStore();
    const time = store_time.useTimeStore();
    const tag = store_tag.useTagStore();
    const toHome = () => {
      common_vendor.index.redirectTo({
        url: "../../pages/Home/Home"
      });
    };
    const clearInput1 = (event) => {
      state.inputClearValue1 = event.detail.value;
      if (event.detail.value.length > 0) {
        state.showClearIcon1 = true;
      } else {
        state.showClearIcon1 = false;
      }
    };
    const clearIcon1 = () => {
      user.data.userName = null;
      state.showClearIcon1 = false;
    };
    const clearInput2 = (event) => {
      state.inputClearValue2 = event.detail.value;
      if (event.detail.value.length > 0) {
        state.showClearIcon2 = true;
      } else {
        state.showClearIcon2 = false;
      }
    };
    const clearIcon2 = () => {
      user.data.userCode = null;
      state.showClearIcon2 = false;
    };
    const showEye = () => {
      if (state.password == "text") {
        state.password = "password";
      } else if (state.password == "password") {
        state.password = "text";
      }
      if (state.eye == "eye") {
        state.eye = "eye-slash";
      } else if (state.eye == "eye-slash") {
        state.eye = "eye";
      }
    };
    const sign = () => {
      if (state.userConfirm != user.data.userPassword) {
        common_vendor.index.showToast({
          icon: "none",
          title: "密码输入不一致"
        });
      } else if (user.data.userCode == "") {
        common_vendor.index.showToast({
          icon: "none",
          title: "请输入验证码"
        });
      } else {
        common_vendor.index.request({
          url: url + "/user/sign",
          method: "POST",
          data: {
            userEmail: user.data.userEmail,
            userName: user.data.userName,
            userPassword: user.data.userPassword,
            userCode: user.data.userCode,
            ifUpdate: user.data.ifUpdate
          },
          success: (res) => {
            console.log(res);
            if (res.data.code != null) {
              if (user.data.ifUpdate == 0) {
                common_vendor.index.redirectTo({
                  url: "../../pages/index/Time"
                });
              } else {
                common_vendor.index.redirectTo({
                  url: "../../pages/Home/Home"
                });
              }
            } else {
              common_vendor.index.showToast({
                icon: "none",
                title: "验证码错误"
              });
            }
            user.data.ifUpdate = 0;
          }
        });
        tag.data.tagHour = 1;
        tag.data.tagMinute = 30;
        time.data.remainingTime = tag.data.tagHour * 3600 + tag.data.tagMinute * 60 + tag.data.tagSecond;
      }
    };
    common_vendor.ref(0);
    const code = () => {
      if (state.countdown === 0) {
        state.flag = true;
        state.countdown = 60;
        const timer = setInterval(() => {
          state.countdown--;
          if (state.countdown == 0) {
            clearInterval(timer);
          }
        }, 1e3);
        common_vendor.index.request({
          url: url + "/user/code",
          method: "POST",
          data: {
            userEmail: user.data.userEmail,
            ifUpdate: user.data.ifUpdate
          },
          success: (res) => {
            console.log(res);
          }
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$2,
        b: common_vendor.o((...args) => _ctx.SignImageR && _ctx.SignImageR(...args)),
        c: !common_vendor.unref(user).data.ifUpdate
      }, !common_vendor.unref(user).data.ifUpdate ? {} : {}, {
        d: !common_vendor.unref(user).data.ifUpdate
      }, !common_vendor.unref(user).data.ifUpdate ? {
        e: common_vendor.t(common_vendor.unref(user).data.userEmail),
        f: common_vendor.o(toHome)
      } : {}, {
        g: !common_vendor.unref(user).data.ifUpdate
      }, !common_vendor.unref(user).data.ifUpdate ? {} : {}, {
        h: common_vendor.unref(user).data.ifUpdate
      }, common_vendor.unref(user).data.ifUpdate ? {} : {}, {
        i: common_vendor.unref(user).data.ifUpdate
      }, common_vendor.unref(user).data.ifUpdate ? {
        j: common_vendor.t(common_vendor.unref(user).data.userEmail),
        k: common_vendor.o(toHome)
      } : {}, {
        l: common_vendor.unref(user).data.ifUpdate
      }, common_vendor.unref(user).data.ifUpdate ? {} : {}, {
        m: !common_vendor.unref(user).data.ifUpdate
      }, !common_vendor.unref(user).data.ifUpdate ? common_vendor.e({
        n: common_vendor.o([($event) => common_vendor.unref(user).data.userName = $event.detail.value, clearInput1]),
        o: common_vendor.unref(user).data.userName,
        p: state.showClearIcon1
      }, state.showClearIcon1 ? {
        q: common_assets._imports_2$3,
        r: common_vendor.o(clearIcon1)
      } : {}) : {}, {
        s: state.password,
        t: common_vendor.unref(user).data.userPassword,
        v: common_vendor.o(($event) => common_vendor.unref(user).data.userPassword = $event.detail.value),
        w: common_vendor.o(showEye),
        x: common_vendor.p({
          type: state.eye,
          size: "25"
        }),
        y: state.password,
        z: state.userConfirm,
        A: common_vendor.o(($event) => state.userConfirm = $event.detail.value),
        B: common_vendor.o(showEye),
        C: common_vendor.p({
          type: state.eye,
          size: "25"
        }),
        D: common_vendor.o([($event) => common_vendor.unref(user).data.userCode = $event.detail.value, clearInput2]),
        E: common_vendor.unref(user).data.userCode,
        F: state.showClearIcon2
      }, state.showClearIcon2 ? {
        G: common_assets._imports_2$3,
        H: common_vendor.o(clearIcon2)
      } : {}, {
        I: common_assets._imports_2$2,
        J: state.countdown === 0
      }, state.countdown === 0 ? {} : {
        K: common_vendor.t(state.countdown)
      }, {
        L: common_vendor.o(code),
        M: state.countdown > 0,
        N: !common_vendor.unref(user).data.ifUpdate
      }, !common_vendor.unref(user).data.ifUpdate ? {
        O: common_vendor.o(sign)
      } : {}, {
        P: common_vendor.unref(user).data.ifUpdate
      }, common_vendor.unref(user).data.ifUpdate ? {
        Q: common_vendor.o(sign)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/uni-app/clock/pages/Sign/Sign.vue"]]);
wx.createPage(MiniProgramPage);
