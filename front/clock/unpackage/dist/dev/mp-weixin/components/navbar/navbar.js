"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const store_tag = require("../../store/tag.js");
const store_user = require("../../store/user.js");
const store_time = require("../../store/time.js");
const store_target = require("../../store/target.js");
if (!Array) {
  const _easycom_time_menu2 = common_vendor.resolveComponent("time-menu");
  const _easycom_uni_transition2 = common_vendor.resolveComponent("uni-transition");
  (_easycom_time_menu2 + _easycom_uni_transition2)();
}
const _easycom_time_menu = () => "../time-menu/time-menu.js";
const _easycom_uni_transition = () => "../../uni_modules/uni-transition/components/uni-transition/uni-transition.js";
if (!Math) {
  (_easycom_time_menu + _easycom_uni_transition)();
}
const _sfc_main = {
  __name: "navbar",
  props: {
    navbarTo: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const user = store_user.useUserStore();
    const tag = store_tag.useTagStore();
    const time = store_time.useTimeStore();
    const target = store_target.useTargetStore();
    const state = common_vendor.reactive({
      name: "专注",
      showPoints_Nav_userPic: true,
      showtagNavImg: false,
      showMenu: false,
      showNav_menu: true,
      showCover: false
    });
    const showTargetTaskPATDelete = () => {
      target.data.ifshowTargetTaskPATDelete = !target.data.ifshowTargetTaskPATDelete;
      target.data.ifshowTargetTaskPAT = !target.data.ifshowTargetTaskPAT;
      tag.data.ifshowTagDetailBDelete = !tag.data.ifshowTagDetailBDelete;
      tag.data.ifshowTagDetailB = !tag.data.ifshowTagDetailB;
    };
    const toStore = () => {
      common_vendor.index.redirectTo({
        url: "../../pages/Store/Store"
      });
    };
    const toWx = () => {
      user.data.ifUpdate = 3;
      common_vendor.index.redirectTo({
        url: "../../pages/Wx/Wx"
      });
    };
    const ifshowMenu = () => {
      state.showtargetMenuDetail = !state.showtargetMenuDetail;
      state.showtargetArrowUp = !state.showtargetArrowUp;
      state.showtargetArrowDown = !state.showtargetArrowDown;
      time.data.showNav_menu = false;
      state.showMenu = true;
      state.showPoints_Nav_userPic = false;
      state.showCover = true;
    };
    const back = () => {
      state.showMenu = false;
      state.showCover = false;
      time.data.showNav_menu = true;
      if (props.navbarTo == "/menu/2" || props.navbarTo == "/menu/3") {
        state.showtagNavImg = true;
        state.showPoints_Nav_userPic = false;
      } else if (props.navbarTo == "/menu/6" || props.navbarTo == "/menu/7") {
        state.showtagNavImg = false;
        state.showPoints_Nav_userPic = false;
      } else {
        state.showPoints_Nav_userPic = true;
      }
    };
    if (props.navbarTo == "/menu/1") {
      state.name = "专注";
      state.showPoints_Nav_userPic = true;
      state.showtagNavImg = false;
      state.showMenu = false;
      time.data.showNav_menu = true;
    } else if (props.navbarTo == "/menu/2") {
      time.data.showNav_menu = true;
      state.name = "目标";
      state.showtagNavImg = true;
      state.showPoints_Nav_userPic = false;
      target.data.ifshowTargetTaskPATDelete = false;
      target.data.ifshowTargetTaskPAT = true;
    } else if (props.navbarTo == "/menu/3") {
      time.data.showNav_menu = true;
      state.name = "标签";
      state.showtagNavImg = true;
      state.showPoints_Nav_userPic = false;
      tag.data.ifshowTagDetailBDelete = false;
      tag.data.ifshowTagDetailB = true;
    } else if (props.navbarTo == "/menu/4") {
      time.data.showNav_menu = true;
      state.name = "商店";
    } else if (props.navbarTo == "/menu/5") {
      time.data.showNav_menu = true;
      state.name = "我的";
    } else if (props.navbarTo == "/menu/6") {
      time.data.showNav_menu = true;
      state.name = "设置";
      state.showPoints_Nav_userPic = false;
    } else if (props.navbarTo == "/menu/7") {
      time.data.showNav_menu = true;
      state.name = "关于";
      state.showPoints_Nav_userPic = false;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          menuTo: props.navbarTo
        }),
        b: common_vendor.p({
          ["mode-class"]: "slide-left",
          show: state.showMenu,
          duration: "300"
        }),
        c: common_vendor.unref(time).data.showNav_menu
      }, common_vendor.unref(time).data.showNav_menu ? {
        d: common_assets._imports_0$9,
        e: common_vendor.o(ifshowMenu),
        f: common_vendor.t(common_vendor.unref(user).data.userName)
      } : {}, {
        g: state.showPoints_Nav_userPic
      }, state.showPoints_Nav_userPic ? {
        h: common_vendor.t(common_vendor.unref(user).data.point),
        i: common_assets._imports_1$5,
        j: common_vendor.o(($event) => toStore()),
        k: common_vendor.unref(user).data.picUrl,
        l: common_vendor.o(($event) => toWx())
      } : {}, {
        m: state.showtagNavImg
      }, state.showtagNavImg ? {
        n: common_assets._imports_2$5,
        o: common_vendor.o(showTargetTaskPATDelete)
      } : {}, {
        p: common_vendor.o(back),
        q: common_vendor.p({
          ["mode-class"]: "fade",
          show: state.showCover,
          duration: "100"
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/uni-app/clock/components/navbar/navbar.vue"]]);
wx.createComponent(Component);
