"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const store_user = require("../../store/user.js");
const store_time = require("../../store/time.js");
const store_store = require("../../store/store.js");
if (!Array) {
  const _easycom_navbar2 = common_vendor.resolveComponent("navbar");
  _easycom_navbar2();
}
const _easycom_navbar = () => "../../components/navbar/navbar.js";
if (!Math) {
  _easycom_navbar();
}
const _sfc_main = {
  __name: "Store",
  setup(__props) {
    const url = common_vendor.inject("url");
    const user = store_user.useUserStore();
    store_time.useTimeStore();
    const store = store_store.useStoreStore();
    const state = common_vendor.reactive({
      storeWithTime: [],
      ifshowswiper: false,
      ifshowStoreDetailNull: false,
      currentswiper: 0
    });
    common_vendor.onMounted(() => {
      store.data.storeName = "";
      store.data.storeDescribe = "";
      store.data.storeHour = 0;
      store.data.storeMinute = 30;
      store.data.storePoint = 1;
      store.data.ifStoreUpdate = 0;
      common_vendor.index.request({
        url: url + "/store/get",
        method: "POST",
        data: user.data.userEmail,
        success: (res) => {
          console.log(res);
          for (let i = 0; i < res.data.data.length; i++) {
            state.storeWithTime.push({
              "storeName": res.data.data[i].storeName,
              "storeDescribe": res.data.data[i].storeDescribe,
              "storeHour": res.data.data[i].storeHour,
              "storeMinute": res.data.data[i].storeMinute,
              "storePoint": res.data.data[i].storePoint,
              "storeId": res.data.data[i].storeId
            });
          }
          if (res.data.data[0].ifStoreNull == 1) {
            state.ifshowStoreDetailNull = true;
            state.ifshowswiper = false;
          } else {
            state.ifshowStoreDetailNull = false;
            state.ifshowswiper = true;
          }
        }
      });
    });
    const tosaveStore = (index) => {
      store.data.storeName = state.storeWithTime[index].storeName;
      store.data.storeDescribe = state.storeWithTime[index].storeDescribe;
      store.data.storeHour = state.storeWithTime[index].storeHour;
      store.data.storeMinute = state.storeWithTime[index].storeMinute;
      store.data.storePoint = state.storeWithTime[index].storePoint;
      store.data.ifStoreUpdate = 1;
      store.data.storeId = state.storeWithTime[index].storeId;
      common_vendor.index.redirectTo({
        url: "../../pages/StoreCreat/StoreCreat"
      });
    };
    const storeWithTimeDelete = (index) => {
      common_vendor.index.request({
        url: url + "/store/delete",
        method: "POST",
        data: {
          storeName: state.storeWithTime[index].storeName
        },
        success: (res) => {
          console.log(res);
          if (res.data.data.ifEnough == 1) {
            common_vendor.index.showToast({
              icon: "none",
              title: "兑换成功"
            });
            state.storeWithTime.length--;
            if (state.storeWithTime.length == 0) {
              state.ifshowStoreDetailNull = true;
              state.ifshowswiper = false;
            }
            state.storeWithTime.splice(index, 1);
            user.data.point = res.data.data.storePoint;
          } else if (res.data.data.ifEnough == 0) {
            common_vendor.index.showToast({
              icon: "none",
              title: "分数不足"
            });
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          navbarTo: "/menu/4"
        }),
        b: state.ifshowswiper
      }, state.ifshowswiper ? {
        c: common_vendor.f(state.storeWithTime, (item, index, i0) => {
          return {
            a: common_vendor.o(($event) => tosaveStore(index), index),
            b: common_vendor.t(item.storeName),
            c: common_vendor.t(item.storeDescribe),
            d: common_vendor.t(item.storeHour),
            e: common_vendor.t(item.storeMinute),
            f: common_vendor.o(($event) => tosaveStore(index), index),
            g: common_vendor.t(item.storePoint),
            h: common_vendor.o(($event) => storeWithTimeDelete(index), index),
            i: index
          };
        }),
        d: common_assets._imports_0$4,
        e: common_assets._imports_4,
        f: common_vendor.o((...args) => _ctx.changeswiper && _ctx.changeswiper(...args)),
        g: state.currentswiper
      } : {}, {
        h: state.ifshowStoreDetailNull
      }, state.ifshowStoreDetailNull ? {
        i: common_assets._imports_0$4
      } : {}, {
        j: common_assets._imports_3$1
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/uni-app/clock/pages/Store/Store.vue"]]);
wx.createPage(MiniProgramPage);
