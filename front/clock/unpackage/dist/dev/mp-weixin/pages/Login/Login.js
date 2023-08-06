"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const store_tag = require("../../store/tag.js");
const store_user = require("../../store/user.js");
const store_time = require("../../store/time.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "Login",
  setup(__props) {
    const url = common_vendor.inject("url");
    const user = store_user.useUserStore();
    const tag = store_tag.useTagStore();
    const time = store_time.useTimeStore();
    const state = common_vendor.reactive({
      password: "password",
      eye: "eye"
    });
    const toHome = () => {
      common_vendor.index.redirectTo({
        url: "../../pages/Home/Home"
      });
    };
    const toSign = () => {
      common_vendor.index.redirectTo({
        url: "../../pages/Sign/Sign"
      });
      user.data.userPassword = "";
      user.data.ifUpdate = 1;
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
    const login = () => {
      common_vendor.index.request({
        url: url + "/user/login",
        method: "POST",
        data: {
          userEmail: user.data.userEmail,
          userPassword: user.data.userPassword
        },
        success: (res) => {
          console.log(res);
          user.data.userPassword = "";
          if (res.data.code != null) {
            user.data.point = res.data.data.point;
            user.data.completeTarget = res.data.data.completeTarget;
            user.data.userName = res.data.data.userName;
            user.data.picUrl = res.data.data.picUrl;
            common_vendor.index.redirectTo({
              url: "../../pages/index/Time"
            });
          } else {
            common_vendor.index.showToast({
              icon: "none",
              title: "密码错误"
            });
          }
        }
      });
    };
    time.data.remainingTime = tag.data.tagHour * 3600 + tag.data.tagMinute * 60 + tag.data.tagSecond;
    common_vendor.onMounted(() => {
    });
    console.log(user.data.userEmail);
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$2,
        b: common_vendor.t(common_vendor.unref(user).data.userEmail),
        c: common_vendor.o(toHome),
        d: state.password,
        e: common_vendor.unref(user).data.userPassword,
        f: common_vendor.o(($event) => common_vendor.unref(user).data.userPassword = $event.detail.value),
        g: common_vendor.o(showEye),
        h: common_vendor.p({
          type: state.eye,
          size: "25"
        }),
        i: common_vendor.o(toSign),
        j: common_vendor.o(login)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/uni-app/clock/pages/Login/Login.vue"]]);
wx.createPage(MiniProgramPage);
