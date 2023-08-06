"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const store_tag = require("../../store/tag.js");
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
  __name: "tag-creat-menu",
  setup(__props) {
    const url = common_vendor.inject("url");
    const user = store_user.useUserStore();
    const tag = store_tag.useTagStore();
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
      ifshowtagCreatDay: true,
      inputClearValue1: "",
      inputClearValue2: "",
      showClearIcon1: false,
      showClearIcon2: false,
      indexTime1: 0,
      indexTime2: 0,
      ifshowtagCreatDay1: true,
      ifshowtagCreatDay2: true,
      ifTagUpdate: 0,
      tagId: 0
    });
    state.inputClearValue1 = tag.data.tagName;
    state.inputClearValue2 = tag.data.tagDescribe;
    state.indexTime1 = tag.data.tagHour;
    state.indexTime2 = tag.data.tagMinute / 10;
    state.index = tag.data.tagPoint;
    state.ifTagUpdate = tag.data.ifTagUpdate;
    state.tagId = tag.data.tagId;
    if (state.indexTime1 != 0 || state.indexTime2 != 0) {
      state.ifshowtagCreatDay1 = true;
    }
    if (state.index != 0) {
      state.ifshowtagCreatDay2 = true;
    }
    common_vendor.onMounted(() => {
    });
    const ifshowDayPoints1 = () => {
      state.ifshowtagCreatDay1 = true;
    };
    const ifshowDayPoints2 = () => {
      state.ifshowtagCreatDay2 = true;
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
      state.ifshowtagCreatDay = !state.ifshowtagCreatDay;
      state.ifshowtagCreatDay1 = !state.ifshowtagCreatDay1;
      state.ifshowtagCreatDay2 = !state.ifshowtagCreatDay2;
      state.single = "";
      state.index = 0;
    };
    const savetag = () => {
      if (state.inputClearValue1 == "") {
        common_vendor.index.showToast({
          icon: "none",
          title: "请输入标签名"
        });
      } else if (state.inputClearValue2 == "") {
        common_vendor.index.showToast({
          icon: "none",
          title: "请输入标签备注"
        });
      } else if (state.index == 0) {
        common_vendor.index.showToast({
          icon: "none",
          title: "请添加分数"
        });
      } else if (state.indexTime1 == 0 && state.indexTime2 == 0) {
        common_vendor.index.showToast({
          icon: "none",
          title: "请添加不为空的时间"
        });
      } else {
        common_vendor.index.request({
          url: url + "/tag/save",
          method: "POST",
          data: {
            userEmail: user.data.userEmail,
            tagName: state.inputClearValue1,
            tagDescribe: state.inputClearValue2,
            tagPoint: state.index,
            tagHour: arrayTime[0][state.indexTime1],
            tagMinute: arrayTime[1][state.indexTime2],
            ifTagUpdate: state.ifTagUpdate,
            tagId: state.tagId
          },
          success: (res) => {
            if (res.data.data.ifRepeat == 1) {
              common_vendor.index.showToast({
                icon: "none",
                title: "标签名称重复"
              });
              console.log(res);
            } else {
              common_vendor.index.redirectTo({
                url: "../../pages/Tag/Tag"
              });
            }
          }
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$11,
        b: common_vendor.o(savetag),
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
        o: state.ifshowtagCreatDay
      }, state.ifshowtagCreatDay ? {
        p: common_assets._imports_3$3,
        q: common_vendor.o(ifshowDayPoints1),
        r: common_vendor.o(multiPickerChange),
        s: state.indexTime,
        t: arrayTime
      } : {}, {
        v: state.ifshowtagCreatDay
      }, state.ifshowtagCreatDay ? {
        w: common_assets._imports_4,
        x: common_vendor.o(ifshowDayPoints2),
        y: common_vendor.o(bindPickerChange),
        z: array
      } : {}, {
        A: state.ifshowtagCreatDay1,
        B: common_vendor.p({
          title: "倒计时时间：" + arrayTime[0][state.indexTime1] + "小时" + arrayTime[1][state.indexTime2] + "分钟",
          type: "line"
        }),
        C: state.ifshowtagCreatDay2,
        D: common_vendor.p({
          title: "可得分数：" + array[state.index],
          type: "line"
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6c766856"], ["__file", "D:/Code/uni-app/clock/components/tag-creat-menu/tag-creat-menu.vue"]]);
wx.createComponent(Component);
