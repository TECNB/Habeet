"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const store_store = require("../../store/store.js");
const store_user = require("../../store/user.js");
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  _easycom_uni_section2();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  _easycom_uni_section();
}
const _sfc_main = {
  __name: "store-creat-menu",
  setup(__props) {
    const url = common_vendor.inject("url");
    const user = store_user.useUserStore();
    const store = store_store.useStoreStore();
    const array = [
      " ",
      "1 Point",
      "2 Points",
      "3 Points",
      "4 Points",
      "5 Points",
      "6 Points",
      "7 Points",
      "8 Points",
      "9 Points",
      "10 Points"
    ];
    const arrayTime = [
      [0, 1, 2, 3, 4],
      [0, 10, 20, 30, 40, 50]
    ];
    const state = common_vendor.reactive({
      single: "",
      showPicker: false,
      index: 0,
      ifshowstoreCreatDay: true,
      inputClearValue1: "",
      inputClearValue2: "",
      showClearIcon1: false,
      showClearIcon2: false,
      indexTime1: 0,
      indexTime2: 0,
      ifshowstoreCreatDay1: true,
      ifshowstoreCreatDay2: true
    });
    state.inputClearValue1 = store.data.storeName;
    state.inputClearValue2 = store.data.storeDescribe;
    state.indexTime1 = store.data.storeHour;
    state.indexTime2 = store.data.storeMinute / 10;
    state.index = store.data.storePoint;
    state.ifStoreUpdate = store.data.ifStoreUpdate;
    state.storeId = store.data.storeId;
    if (state.indexTime1 != 0 || state.indexTime2 != 0) {
      state.ifshowstoreCreatDay1 = true;
    }
    if (state.index != 0) {
      state.ifshowstoreCreatDay2 = true;
    }
    const ifshowDayPoints1 = () => {
      state.ifshowstoreCreatDay1 = true;
    };
    const ifshowDayPoints2 = () => {
      state.ifshowstoreCreatDay2 = true;
    };
    const bindPickerChange = (e) => {
      state.index = e.detail.value;
    };
    const multiPickerChange = (e) => {
      state.indexTime1 = e.detail.value[0];
      state.indexTime2 = e.detail.value[1];
    };
    const clearInput1 = (event) => {
      state.inputClearValue1 = event.detail.value;
      if (event.detail.value.length > 0) {
        state.showClearIcon1 = true;
      } else {
        state.showClearIcon1 = false;
      }
    };
    const clearInput2 = (event) => {
      state.inputClearValue2 = event.detail.value;
      if (event.detail.value.length > 0) {
        state.showClearIcon2 = true;
      } else {
        state.showClearIcon2 = false;
      }
    };
    const clearIcon1 = () => {
      state.inputClearValue1 = "";
      state.showClearIcon1 = false;
    };
    const clearIcon2 = () => {
      state.inputClearValue2 = "";
      state.showClearIcon2 = false;
    };
    const ifshowDayPoints = () => {
      state.ifshowstoreCreatDay = !state.ifshowstoreCreatDay;
      state.ifshowtagCreatDay1 = !state.ifshowtagCreatDay1;
      state.ifshowtagCreatDay2 = !state.ifshowtagCreatDay2;
      state.single = "";
      state.index = 0;
    };
    const savestore = () => {
      if (state.inputClearValue1 == "") {
        common_vendor.index.showToast({
          icon: "none",
          title: "请输入商品名"
        });
      } else if (state.inputClearValue2 == "") {
        common_vendor.index.showToast({
          icon: "none",
          title: "请输入商品备注"
        });
      } else if (state.index == 0) {
        common_vendor.index.showToast({
          icon: "none",
          title: "请添加分数"
        });
      } else {
        common_vendor.index.request({
          url: url + "/store/save",
          method: "POST",
          data: {
            userEmail: user.data.userEmail,
            storeName: state.inputClearValue1,
            storeDescribe: state.inputClearValue2,
            storePoint: state.index,
            storeHour: arrayTime[0][state.indexTime1],
            storeMinute: arrayTime[1][state.indexTime2],
            ifStoreUpdate: state.ifStoreUpdate,
            storeId: state.storeId
          },
          success: (res) => {
            if (res.data.data.ifRepeat == 1) {
              common_vendor.index.showToast({
                icon: "none",
                title: "商品名称重复"
              });
              console.log(res);
            } else {
              common_vendor.index.redirectTo({
                url: "../../pages/Store/Store"
              });
            }
          }
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$11,
        b: common_vendor.o(savestore),
        c: common_assets._imports_1$6,
        d: state.inputClearValue1,
        e: common_vendor.o(clearInput1),
        f: state.showClearIcon1
      }, state.showClearIcon1 ? {
        g: common_assets._imports_2$3,
        h: common_vendor.o(clearIcon1)
      } : {}, {
        i: state.inputClearValue2,
        j: common_vendor.o(clearInput2),
        k: state.showClearIcon2
      }, state.showClearIcon2 ? {
        l: common_assets._imports_2$3,
        m: common_vendor.o(clearIcon2)
      } : {}, {
        n: common_vendor.o(ifshowDayPoints),
        o: state.ifshowstoreCreatDay
      }, state.ifshowstoreCreatDay ? {
        p: common_assets._imports_3$3,
        q: common_vendor.o(ifshowDayPoints1),
        r: common_vendor.o(multiPickerChange),
        s: state.indexTime,
        t: arrayTime
      } : {}, {
        v: state.ifshowstoreCreatDay
      }, state.ifshowstoreCreatDay ? {
        w: common_assets._imports_4,
        x: common_vendor.o(ifshowDayPoints2),
        y: common_vendor.o(bindPickerChange),
        z: array
      } : {}, {
        A: state.ifshowstoreCreatDay1,
        B: common_vendor.p({
          title: "倒计时时间：" + arrayTime[0][state.indexTime1] + "小时" + arrayTime[1][state.indexTime2] + "分钟",
          type: "line"
        }),
        C: state.ifshowstoreCreatDay2,
        D: common_vendor.p({
          title: "可得分数：" + array[state.index],
          type: "line"
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1a0e2ee2"], ["__file", "D:/Code/uni-app/clock/components/store-creat-menu/store-creat-menu.vue"]]);
wx.createComponent(Component);
