"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const store_target = require("../../store/target.js");
const store_tag = require("../../store/tag.js");
const store_user = require("../../store/user.js");
const store_time = require("../../store/time.js");
const _sfc_main = {
  __name: "Home",
  setup(__props) {
    const url = common_vendor.inject("url");
    const target = store_target.useTargetStore();
    const user = store_user.useUserStore();
    const tag = store_tag.useTagStore();
    const time = store_time.useTimeStore();
    const state = common_vendor.reactive({
      showClearIcon1: false,
      showtargetMenuDetail: false,
      showtargetArrowUp: true,
      showtargetArrowDown: false,
      targetWithTime: [],
      targetNoTime: [],
      dayList: []
    });
    const Nav = () => {
      common_vendor.index.redirectTo({
        url: "../../pages/Nav/Nav"
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
      user.data.userEmail = null;
      state.showClearIcon1 = false;
    };
    const home = () => {
      if (!isValidQQEmail(user.data.userEmail)) {
        common_vendor.index.showToast({
          icon: "none",
          title: "QQ邮箱格式错误"
        });
        return;
      }
      common_vendor.index.request({
        url: url + "/user/home",
        method: "POST",
        data: user.data.userEmail,
        success: (res) => {
          if (res.data.code != null) {
            common_vendor.index.redirectTo({
              url: "../../pages/Login/Login"
            });
            common_vendor.index.request({
              url: url + "/tag/get",
              method: "POST",
              data: user.data.userEmail,
              success: (res2) => {
                console.log(res2);
                tag.data.tagName = res2.data.data[0].tagName;
                tag.data.tagDescribe = res2.data.data[0].tagDescribe;
                tag.data.tagPoint = res2.data.data[0].tagPoint;
                tag.data.tagHour = res2.data.data[0].tagHour;
                tag.data.tagMinute = res2.data.data[0].tagMinute;
              }
            });
            common_vendor.index.request({
              url: url + "/target/get",
              method: "POST",
              data: {
                userEmail: user.data.userEmail,
                ifTargetUpdate: 1
              },
              success: (res2) => {
                target.data.deadlineDate = [];
                for (let i = 0; i < res2.data.data.length; i++) {
                  if (res2.data.data[i].status == 0) {
                    state.targetNoTime.push({
                      "targetName": res2.data.data[i].targetName,
                      "targetDescribe": res2.data.data[i].targetDescribe,
                      "targetPoint": res2.data.data[i].targetPoint,
                      "deadline": res2.data.data[i].deadline,
                      "targetId": res2.data.data[i].targetId
                    });
                  } else if (res2.data.data[i].status == 1) {
                    let deadline = new Date(res2.data.data[i].deadline);
                    if (!target.data.deadlineDate.includes(deadline)) {
                      target.data.deadlineDate.push(deadline);
                    }
                    state.targetWithTime.push({
                      "targetName": res2.data.data[i].targetName,
                      "targetDescribe": res2.data.data[i].targetDescribe,
                      "targetPoint": res2.data.data[i].targetPoint,
                      "deadline": res2.data.data[i].deadline,
                      "targetId": res2.data.data[i].targetId
                    });
                  }
                }
              }
            });
          } else {
            common_vendor.index.redirectTo({
              url: "../../pages/Sign/Sign"
            });
            user.data.ifUpdate = 0;
          }
        }
      });
      common_vendor.onMounted(() => {
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
      });
      time.data.remainingTime = tag.data.tagHour * 3600 + tag.data.tagMinute * 60 + tag.data.tagSecond;
    };
    const isValidQQEmail = (email) => {
      const qqEmailRegex = /^[1-9]\d{4,10}@qq\.com$/;
      return qqEmailRegex.test(email);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$2,
        b: common_vendor.o(Nav),
        c: common_vendor.o([($event) => common_vendor.unref(user).data.userEmail = $event.detail.value, clearInput1]),
        d: common_vendor.unref(user).data.userEmail,
        e: state.showClearIcon1
      }, state.showClearIcon1 ? {
        f: common_assets._imports_2$3,
        g: common_vendor.o(clearIcon1)
      } : {}, {
        h: common_vendor.o(home)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/uni-app/clock/pages/Home/Home.vue"]]);
wx.createPage(MiniProgramPage);
