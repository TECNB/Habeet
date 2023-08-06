"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const store_target = require("../../store/target.js");
const store_user = require("../../store/user.js");
if (!Array) {
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_datetime_picker2 + _easycom_uni_section2)();
}
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_datetime_picker + _easycom_uni_section)();
}
const _sfc_main = {
  __name: "target-creat-menu",
  setup(__props) {
    const url = common_vendor.inject("url");
    const user = store_user.useUserStore();
    const target = store_target.useTargetStore();
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
    const state = common_vendor.reactive({
      single: "",
      showPicker: false,
      index: 0,
      ifshowtargetCreatDay: true,
      inputClearValue1: "",
      inputClearValue2: "",
      showClearIcon1: false,
      showClearIcon2: false,
      ifshowtargetCreatDay1: true,
      ifshowtargetCreatDay2: true,
      ifTargetUpdate: 0
    });
    state.inputClearValue1 = target.data.targetName;
    state.inputClearValue2 = target.data.targetDescribe;
    state.single = target.data.deadline;
    state.index = target.data.targetPoint;
    state.ifTargetUpdate = target.data.ifTargetUpdate;
    state.targetId = target.data.targetId;
    if (state.single != "") {
      state.ifshowtargetCreatDay1 = true;
    }
    if (state.index != 0) {
      state.ifshowtargetCreatDay2 = true;
    }
    const ifshowDayPoints1 = () => {
      state.ifshowtargetCreatDay1 = true;
    };
    const ifshowDayPoints2 = () => {
      state.ifshowtargetCreatDay2 = true;
    };
    const bindPickerChange = (e) => {
      state.index = e.detail.value;
    };
    const clearInput1 = (event) => {
      state.inputClearValue1 = event.target.value;
      if (event.target.value.length > 0) {
        state.showClearIcon1 = true;
      } else {
        state.showClearIcon1 = false;
      }
    };
    const clearInput2 = (event) => {
      state.inputClearValue2 = event.target.value;
      if (event.target.value.length > 0) {
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
      state.ifshowtargetCreatDay = !state.ifshowtargetCreatDay;
      state.ifshowtargetCreatDay1 = !state.ifshowtargetCreatDay1;
      state.ifshowtargetCreatDay2 = !state.ifshowtargetCreatDay2;
      state.single = "";
      state.index = 0;
    };
    const saveTarget = () => {
      if (state.inputClearValue1 == "") {
        common_vendor.index.showToast({
          icon: "none",
          title: "请输入目标名"
        });
      } else if (state.inputClearValue2 == "") {
        common_vendor.index.showToast({
          icon: "none",
          title: "请输入目标备注"
        });
      } else if (state.index == 0) {
        common_vendor.index.showToast({
          icon: "none",
          title: "请添加分数"
        });
      } else {
        common_vendor.index.request({
          url: url + "/target/save",
          method: "POST",
          data: {
            deadlineString: state.single,
            userEmail: user.data.userEmail,
            targetName: state.inputClearValue1,
            targetDescribe: state.inputClearValue2,
            targetPoint: state.index,
            ifTargetUpdate: state.ifTargetUpdate,
            targetId: state.targetId
          },
          success: (res) => {
            if (res.data.data.status == 4) {
              common_vendor.index.showToast({
                icon: "none",
                title: "重复输入"
              });
            } else if (res.data.data.status == 0) {
              target.data.ifshowTargetTaskNull0 = false;
            } else if (res.data.data.status == 1) {
              console.log(res);
              let deadline = new Date(res.data.data.deadlineString);
              if (!target.data.deadlineDate.includes(deadline)) {
                target.data.deadlineDate.push(deadline);
              }
              target.data.ifshowTargetTaskNull1 = false;
              common_vendor.index.redirectTo({
                url: "../../pages/Target/Target"
              });
            }
          }
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$11,
        b: common_vendor.o(saveTarget),
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
        o: state.ifshowtargetCreatDay
      }, state.ifshowtargetCreatDay ? {
        p: common_assets._imports_3$3,
        q: common_vendor.o(ifshowDayPoints1),
        r: common_vendor.o(($event) => state.single = $event),
        s: common_vendor.p({
          type: "datetime",
          ["hide-second"]: "true",
          modelValue: state.single
        })
      } : {}, {
        t: state.ifshowtargetCreatDay
      }, state.ifshowtargetCreatDay ? {
        v: common_assets._imports_4,
        w: common_vendor.o(ifshowDayPoints2),
        x: common_vendor.o(ifshowDayPoints2),
        y: common_vendor.o(($event) => state.showPicker = true),
        z: common_vendor.o(bindPickerChange),
        A: state.index,
        B: array
      } : {}, {
        C: state.ifshowtargetCreatDay1,
        D: common_vendor.p({
          title: "截止时间：" + state.single,
          type: "line"
        }),
        E: state.ifshowtargetCreatDay2,
        F: common_vendor.p({
          title: "可得分数：" + array[state.index],
          type: "line"
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7f242f12"], ["__file", "D:/Code/uni-app/clock/components/target-creat-menu/target-creat-menu.vue"]]);
wx.createComponent(Component);
