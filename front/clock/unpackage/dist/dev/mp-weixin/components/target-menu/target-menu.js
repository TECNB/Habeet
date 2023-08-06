"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const store_target = require("../../store/target.js");
const store_user = require("../../store/user.js");
if (!Array) {
  const _easycom_uni_transition2 = common_vendor.resolveComponent("uni-transition");
  _easycom_uni_transition2();
}
const _easycom_uni_transition = () => "../../uni_modules/uni-transition/components/uni-transition/uni-transition.js";
if (!Math) {
  _easycom_uni_transition();
}
const _sfc_main = {
  __name: "target-menu",
  setup(__props) {
    const url = common_vendor.inject("url");
    const user = store_user.useUserStore();
    const target = store_target.useTargetStore();
    let time = new Date();
    time.getDate();
    time.getDay();
    time.getMonth();
    const state = common_vendor.reactive({
      showtargetMenuDetail: false,
      showtargetArrowUp: true,
      showtargetArrowDown: false,
      targetWithTime: [],
      targetNoTime: [],
      dayList: []
    });
    state.dayList.push({
      "day": time.getDate(),
      "month": time.getMonth(),
      "className": "NumCenter"
    });
    const targetMenuDetail = () => {
      state.showtargetMenuDetail = !state.showtargetMenuDetail;
      state.showtargetArrowUp = !state.showtargetArrowUp;
      state.showtargetArrowDown = !state.showtargetArrowDown;
      if (state.targetNoTime.length == 0 && state.targetWithTime.length == 0) {
        common_vendor.index.showToast({
          icon: "none",
          title: "没有目标，快去建立吧"
        });
      }
    };
    const targetNoTimeDelete = (index) => {
      common_vendor.index.request({
        url: url + "/target/delete",
        method: "POST",
        data: {
          targetName: state.targetNoTime[index].targetName,
          ifPoints: 1,
          userEmail: user.data.userEmail,
          targetId: state.targetNoTime[index].targetId
        },
        success: (res) => {
          common_vendor.index.showToast({
            icon: "none",
            title: "完成目标"
          });
          console.log(res);
          state.targetNoTime.splice(index, 1);
          user.data.point = res.data.data.targetPoint;
        }
      });
    };
    const targetWithTimeDelete = (index) => {
      common_vendor.index.request({
        url: url + "/target/delete",
        method: "POST",
        data: {
          targetName: state.targetWithTime[index].targetName,
          ifPoints: 1,
          userEmail: user.data.userEmail,
          targetId: state.targetWithTime[index].targetId
        },
        success: (res) => {
          common_vendor.index.showToast({
            icon: "none",
            title: "完成目标"
          });
          console.log(res);
          state.targetWithTime.splice(index, 1);
          user.data.point = res.data.data.targetPoint;
        }
      });
    };
    common_vendor.index.request({
      url: url + "/target/get",
      method: "POST",
      data: {
        userEmail: user.data.userEmail,
        ifTargetUpdate: 1
      },
      success: (res) => {
        target.data.deadlineDate = [];
        for (let i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].status == 0) {
            state.targetNoTime.push({
              "targetName": res.data.data[i].targetName,
              "targetDescribe": res.data.data[i].targetDescribe,
              "targetPoint": res.data.data[i].targetPoint,
              "deadline": res.data.data[i].deadline,
              "targetId": res.data.data[i].targetId
            });
          } else if (res.data.data[i].status == 1) {
            let deadline = new Date(res.data.data[i].deadline);
            if (!target.data.deadlineDate.includes(deadline)) {
              target.data.deadlineDate.push(deadline);
            }
            state.targetWithTime.push({
              "targetName": res.data.data[i].targetName,
              "targetDescribe": res.data.data[i].targetDescribe,
              "targetPoint": res.data.data[i].targetPoint,
              "deadline": res.data.data[i].deadline,
              "targetId": res.data.data[i].targetId
            });
          }
        }
      }
    });
    common_vendor.onMounted(
      () => {
        const selectedDate = new Date(time.getFullYear(), state.dayList[0].month, 1);
        time = new Date(selectedDate);
        time.setDate(state.dayList[0].day);
        time.setMonth(state.dayList[0].month);
        target.data.currentTime = time.toString();
        target.data.dayDiff = [];
        target.data.ifshowDay = [];
        target.data.deadlineDate.forEach((item) => {
          let currentTime = new Date(target.data.currentTime);
          let timeDiff = item.getTime() - currentTime.getTime();
          let dayDiff = Math.floor(timeDiff / (1e3 * 3600 * 24));
          if (dayDiff > 0) {
            target.data.ifshowDay.push(true);
          } else if (dayDiff < 0) {
            const month = item.getMonth() + 1;
            const date = item.getDate();
            dayDiff = `${month}.${date}`;
            target.data.ifshowDay.push(false);
          } else {
            const hours = item.getHours();
            const minutes = item.getMinutes();
            const timeString = `${hours}:${minutes.toString().padStart(2, "0")}`;
            dayDiff = timeString;
            target.data.ifshowDay.push(false);
          }
          target.data.dayDiff.push(dayDiff);
        });
      }
    );
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: state.showtargetArrowUp
      }, state.showtargetArrowUp ? {
        b: common_assets._imports_0$8,
        c: common_vendor.o(targetMenuDetail)
      } : {}, {
        d: state.showtargetArrowDown
      }, state.showtargetArrowDown ? {
        e: common_assets._imports_1$4,
        f: common_vendor.o(targetMenuDetail)
      } : {}, {
        g: common_vendor.f(state.targetNoTime, (item, index, i0) => {
          return {
            a: common_vendor.t(item.targetName),
            b: common_vendor.t(item.targetPoint),
            c: index,
            d: common_vendor.o(($event) => targetNoTimeDelete(index), index)
          };
        }),
        h: common_assets._imports_4,
        i: common_vendor.f(state.targetWithTime, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.targetName),
            b: common_vendor.t(item.targetPoint),
            c: common_vendor.unref(target).data.ifshowDay[index]
          }, common_vendor.unref(target).data.ifshowDay[index] ? {} : {}, {
            d: !common_vendor.unref(target).data.ifshowDay[index]
          }, !common_vendor.unref(target).data.ifshowDay[index] ? {} : {}, {
            e: common_vendor.t(common_vendor.unref(target).data.dayDiff[index]),
            f: common_vendor.unref(target).data.ifshowDay[index]
          }, common_vendor.unref(target).data.ifshowDay[index] ? {} : {}, {
            g: index,
            h: common_vendor.o(($event) => targetWithTimeDelete(index), index)
          });
        }),
        j: common_assets._imports_4,
        k: common_vendor.p({
          ["mode-class"]: "fade",
          show: state.showtargetMenuDetail,
          duration: "300"
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/uni-app/clock/components/target-menu/target-menu.vue"]]);
wx.createComponent(Component);
