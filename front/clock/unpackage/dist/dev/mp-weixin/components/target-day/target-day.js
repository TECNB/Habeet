"use strict";
const common_vendor = require("../../common/vendor.js");
const store_target = require("../../store/target.js");
const _sfc_main = {
  __name: "target-day",
  setup(__props) {
    common_vendor.inject("url");
    const target = store_target.useTargetStore();
    let time = new Date();
    time.getDate();
    time.getDay();
    time.getMonth();
    let weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const state = common_vendor.reactive({
      dayList: []
    });
    state.dayList.push({
      "day": time.getDate(),
      "month": time.getMonth(),
      "week": weeks[time.getDay()],
      "className": "NumCenter"
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
        console.log(target.data.dayDiff);
      });
    });
    for (let i = 0; i < 30; i++) {
      time.setDate(time.getDate() + 1);
      state.dayList.push({
        "day": time.getDate(),
        "month": time.getMonth(),
        "week": weeks[time.getDay()],
        "className": "Num"
      });
    }
    const classChange = (index) => {
      state.dayList.forEach((item) => {
        item.className = "Num";
      });
      state.dayList[index].className = "NumCenter";
      const selectedDate = new Date(time.getFullYear(), state.dayList[index].month, 1);
      time = new Date(selectedDate);
      time.setDate(state.dayList[index].day);
      time.setMonth(state.dayList[index].month);
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
      target.data.dayDiff.forEach((item) => {
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(state.dayList, (item, index, i0) => {
          return {
            a: common_vendor.t(item.week),
            b: common_vendor.t(item.day),
            c: common_vendor.n(item.className),
            d: index,
            e: common_vendor.o(($event) => classChange(index), index)
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/uni-app/clock/components/target-day/target-day.vue"]]);
wx.createComponent(Component);
