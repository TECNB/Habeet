"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uniDatetimePicker_components_uniDatetimePicker_i18n_index = require("./i18n/index.js");
const uni_modules_uniDatetimePicker_components_uniDatetimePicker_util = require("./util.js");
const { t } = common_vendor.initVueI18n(uni_modules_uniDatetimePicker_components_uniDatetimePicker_i18n_index.i18nMessages);
const _sfc_main = {
  name: "UniDatetimePicker",
  data() {
    return {
      indicatorStyle: `height: 50px;`,
      visible: false,
      fixNvueBug: {},
      dateShow: true,
      timeShow: true,
      title: "日期和时间",
      // 输入框当前时间
      time: "",
      // 当前的年月日时分秒
      year: 1920,
      month: 0,
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      // 起始时间
      startYear: 1920,
      startMonth: 1,
      startDay: 1,
      startHour: 0,
      startMinute: 0,
      startSecond: 0,
      // 结束时间
      endYear: 2120,
      endMonth: 12,
      endDay: 31,
      endHour: 23,
      endMinute: 59,
      endSecond: 59
    };
  },
  props: {
    type: {
      type: String,
      default: "datetime"
    },
    value: {
      type: [String, Number],
      default: ""
    },
    modelValue: {
      type: [String, Number],
      default: ""
    },
    start: {
      type: [Number, String],
      default: ""
    },
    end: {
      type: [Number, String],
      default: ""
    },
    returnType: {
      type: String,
      default: "string"
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    border: {
      type: [Boolean, String],
      default: true
    },
    hideSecond: {
      type: [Boolean, String],
      default: false
    }
  },
  watch: {
    modelValue: {
      handler(newVal) {
        if (newVal) {
          this.parseValue(uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.fixIosDateFormat(newVal));
          this.initTime(false);
        } else {
          this.time = "";
          this.parseValue(Date.now());
        }
      },
      immediate: true
    },
    type: {
      handler(newValue) {
        if (newValue === "date") {
          this.dateShow = true;
          this.timeShow = false;
          this.title = "日期";
        } else if (newValue === "time") {
          this.dateShow = false;
          this.timeShow = true;
          this.title = "时间";
        } else {
          this.dateShow = true;
          this.timeShow = true;
          this.title = "日期和时间";
        }
      },
      immediate: true
    },
    start: {
      handler(newVal) {
        this.parseDatetimeRange(uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.fixIosDateFormat(newVal), "start");
      },
      immediate: true
    },
    end: {
      handler(newVal) {
        this.parseDatetimeRange(uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.fixIosDateFormat(newVal), "end");
      },
      immediate: true
    },
    // 月、日、时、分、秒可选范围变化后，检查当前值是否在范围内，不在则当前值重置为可选范围第一项
    months(newVal) {
      this.checkValue("month", this.month, newVal);
    },
    days(newVal) {
      this.checkValue("day", this.day, newVal);
    },
    hours(newVal) {
      this.checkValue("hour", this.hour, newVal);
    },
    minutes(newVal) {
      this.checkValue("minute", this.minute, newVal);
    },
    seconds(newVal) {
      this.checkValue("second", this.second, newVal);
    }
  },
  computed: {
    // 当前年、月、日、时、分、秒选择范围
    years() {
      return this.getCurrentRange("year");
    },
    months() {
      return this.getCurrentRange("month");
    },
    days() {
      return this.getCurrentRange("day");
    },
    hours() {
      return this.getCurrentRange("hour");
    },
    minutes() {
      return this.getCurrentRange("minute");
    },
    seconds() {
      return this.getCurrentRange("second");
    },
    // picker 当前值数组
    ymd() {
      return [this.year - this.minYear, this.month - this.minMonth, this.day - this.minDay];
    },
    hms() {
      return [this.hour - this.minHour, this.minute - this.minMinute, this.second - this.minSecond];
    },
    // 当前 date 是 start
    currentDateIsStart() {
      return this.year === this.startYear && this.month === this.startMonth && this.day === this.startDay;
    },
    // 当前 date 是 end
    currentDateIsEnd() {
      return this.year === this.endYear && this.month === this.endMonth && this.day === this.endDay;
    },
    // 当前年、月、日、时、分、秒的最小值和最大值
    minYear() {
      return this.startYear;
    },
    maxYear() {
      return this.endYear;
    },
    minMonth() {
      if (this.year === this.startYear) {
        return this.startMonth;
      } else {
        return 1;
      }
    },
    maxMonth() {
      if (this.year === this.endYear) {
        return this.endMonth;
      } else {
        return 12;
      }
    },
    minDay() {
      if (this.year === this.startYear && this.month === this.startMonth) {
        return this.startDay;
      } else {
        return 1;
      }
    },
    maxDay() {
      if (this.year === this.endYear && this.month === this.endMonth) {
        return this.endDay;
      } else {
        return this.daysInMonth(this.year, this.month);
      }
    },
    minHour() {
      if (this.type === "datetime") {
        if (this.currentDateIsStart) {
          return this.startHour;
        } else {
          return 0;
        }
      }
      if (this.type === "time") {
        return this.startHour;
      }
    },
    maxHour() {
      if (this.type === "datetime") {
        if (this.currentDateIsEnd) {
          return this.endHour;
        } else {
          return 23;
        }
      }
      if (this.type === "time") {
        return this.endHour;
      }
    },
    minMinute() {
      if (this.type === "datetime") {
        if (this.currentDateIsStart && this.hour === this.startHour) {
          return this.startMinute;
        } else {
          return 0;
        }
      }
      if (this.type === "time") {
        if (this.hour === this.startHour) {
          return this.startMinute;
        } else {
          return 0;
        }
      }
    },
    maxMinute() {
      if (this.type === "datetime") {
        if (this.currentDateIsEnd && this.hour === this.endHour) {
          return this.endMinute;
        } else {
          return 59;
        }
      }
      if (this.type === "time") {
        if (this.hour === this.endHour) {
          return this.endMinute;
        } else {
          return 59;
        }
      }
    },
    minSecond() {
      if (this.type === "datetime") {
        if (this.currentDateIsStart && this.hour === this.startHour && this.minute === this.startMinute) {
          return this.startSecond;
        } else {
          return 0;
        }
      }
      if (this.type === "time") {
        if (this.hour === this.startHour && this.minute === this.startMinute) {
          return this.startSecond;
        } else {
          return 0;
        }
      }
    },
    maxSecond() {
      if (this.type === "datetime") {
        if (this.currentDateIsEnd && this.hour === this.endHour && this.minute === this.endMinute) {
          return this.endSecond;
        } else {
          return 59;
        }
      }
      if (this.type === "time") {
        if (this.hour === this.endHour && this.minute === this.endMinute) {
          return this.endSecond;
        } else {
          return 59;
        }
      }
    },
    /**
     * for i18n
     */
    selectTimeText() {
      return t("uni-datetime-picker.selectTime");
    },
    okText() {
      return t("uni-datetime-picker.ok");
    },
    clearText() {
      return t("uni-datetime-picker.clear");
    },
    cancelText() {
      return t("uni-datetime-picker.cancel");
    }
  },
  mounted() {
  },
  methods: {
    /**
     * @param {Object} item
     * 小于 10 在前面加个 0
     */
    lessThanTen(item) {
      return item < 10 ? "0" + item : item;
    },
    /**
     * 解析时分秒字符串，例如：00:00:00
     * @param {String} timeString
     */
    parseTimeType(timeString) {
      if (timeString) {
        let timeArr = timeString.split(":");
        this.hour = Number(timeArr[0]);
        this.minute = Number(timeArr[1]);
        this.second = Number(timeArr[2]);
      }
    },
    /**
     * 解析选择器初始值，类型可以是字符串、时间戳，例如：2000-10-02、'08:30:00'、 1610695109000
     * @param {String | Number} datetime
     */
    initPickerValue(datetime) {
      let defaultValue = null;
      if (datetime) {
        defaultValue = this.compareValueWithStartAndEnd(datetime, this.start, this.end);
      } else {
        defaultValue = Date.now();
        defaultValue = this.compareValueWithStartAndEnd(defaultValue, this.start, this.end);
      }
      this.parseValue(defaultValue);
    },
    /**
     * 初始值规则：
     * - 用户设置初始值 value
     * 	- 设置了起始时间 start、终止时间 end，并 start < value < end，初始值为 value， 否则初始值为 start
     * 	- 只设置了起始时间 start，并 start < value，初始值为 value，否则初始值为 start
     * 	- 只设置了终止时间 end，并 value < end，初始值为 value，否则初始值为 end
     * 	- 无起始终止时间，则初始值为 value
     * - 无初始值 value，则初始值为当前本地时间 Date.now()
     * @param {Object} value
     * @param {Object} dateBase
     */
    compareValueWithStartAndEnd(value, start, end) {
      let winner = null;
      value = this.superTimeStamp(value);
      start = this.superTimeStamp(start);
      end = this.superTimeStamp(end);
      if (start && end) {
        if (value < start) {
          winner = new Date(start);
        } else if (value > end) {
          winner = new Date(end);
        } else {
          winner = new Date(value);
        }
      } else if (start && !end) {
        winner = start <= value ? new Date(value) : new Date(start);
      } else if (!start && end) {
        winner = value <= end ? new Date(value) : new Date(end);
      } else {
        winner = new Date(value);
      }
      return winner;
    },
    /**
     * 转换为可比较的时间戳，接受日期、时分秒、时间戳
     * @param {Object} value
     */
    superTimeStamp(value) {
      let dateBase = "";
      if (this.type === "time" && value && typeof value === "string") {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        dateBase = year + "/" + month + "/" + day + " ";
      }
      if (Number(value)) {
        value = parseInt(value);
        dateBase = 0;
      }
      return this.createTimeStamp(dateBase + value);
    },
    /**
     * 解析默认值 value，字符串、时间戳
     * @param {Object} defaultTime
     */
    parseValue(value) {
      if (!value) {
        return;
      }
      if (this.type === "time" && typeof value === "string") {
        this.parseTimeType(value);
      } else {
        let defaultDate = null;
        defaultDate = new Date(value);
        if (this.type !== "time") {
          this.year = defaultDate.getFullYear();
          this.month = defaultDate.getMonth() + 1;
          this.day = defaultDate.getDate();
        }
        if (this.type !== "date") {
          this.hour = defaultDate.getHours();
          this.minute = defaultDate.getMinutes();
          this.second = defaultDate.getSeconds();
        }
      }
      if (this.hideSecond) {
        this.second = 0;
      }
    },
    /**
     * 解析可选择时间范围 start、end，年月日字符串、时间戳
     * @param {Object} defaultTime
     */
    parseDatetimeRange(point, pointType) {
      if (!point) {
        if (pointType === "start") {
          this.startYear = 1920;
          this.startMonth = 1;
          this.startDay = 1;
          this.startHour = 0;
          this.startMinute = 0;
          this.startSecond = 0;
        }
        if (pointType === "end") {
          this.endYear = 2120;
          this.endMonth = 12;
          this.endDay = 31;
          this.endHour = 23;
          this.endMinute = 59;
          this.endSecond = 59;
        }
        return;
      }
      if (this.type === "time") {
        const pointArr = point.split(":");
        this[pointType + "Hour"] = Number(pointArr[0]);
        this[pointType + "Minute"] = Number(pointArr[1]);
        this[pointType + "Second"] = Number(pointArr[2]);
      } else {
        if (!point) {
          pointType === "start" ? this.startYear = this.year - 60 : this.endYear = this.year + 60;
          return;
        }
        if (Number(point)) {
          point = parseInt(point);
        }
        const hasTime = /[0-9]:[0-9]/;
        if (this.type === "datetime" && pointType === "end" && typeof point === "string" && !hasTime.test(
          point
        )) {
          point = point + " 23:59:59";
        }
        const pointDate = new Date(point);
        this[pointType + "Year"] = pointDate.getFullYear();
        this[pointType + "Month"] = pointDate.getMonth() + 1;
        this[pointType + "Day"] = pointDate.getDate();
        if (this.type === "datetime") {
          this[pointType + "Hour"] = pointDate.getHours();
          this[pointType + "Minute"] = pointDate.getMinutes();
          this[pointType + "Second"] = pointDate.getSeconds();
        }
      }
    },
    // 获取 年、月、日、时、分、秒 当前可选范围
    getCurrentRange(value) {
      const range = [];
      for (let i = this["min" + this.capitalize(value)]; i <= this["max" + this.capitalize(value)]; i++) {
        range.push(i);
      }
      return range;
    },
    // 字符串首字母大写
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    // 检查当前值是否在范围内，不在则当前值重置为可选范围第一项
    checkValue(name, value, values) {
      if (values.indexOf(value) === -1) {
        this[name] = values[0];
      }
    },
    // 每个月的实际天数
    daysInMonth(year, month) {
      return new Date(year, month, 0).getDate();
    },
    //兼容 iOS、safari 日期格式
    fixIosDateFormat(value) {
      if (typeof value === "string") {
        value = value.replace(/-/g, "/");
      }
      return value;
    },
    /**
     * 生成时间戳
     * @param {Object} time
     */
    createTimeStamp(time) {
      if (!time)
        return;
      if (typeof time === "number") {
        return time;
      } else {
        time = time.replace(/-/g, "/");
        if (this.type === "date") {
          time = time + " 00:00:00";
        }
        return Date.parse(time);
      }
    },
    /**
     * 生成日期或时间的字符串
     */
    createDomSting() {
      const yymmdd = this.year + "-" + this.lessThanTen(this.month) + "-" + this.lessThanTen(this.day);
      let hhmmss = this.lessThanTen(this.hour) + ":" + this.lessThanTen(this.minute);
      if (!this.hideSecond) {
        hhmmss = hhmmss + ":" + this.lessThanTen(this.second);
      }
      if (this.type === "date") {
        return yymmdd;
      } else if (this.type === "time") {
        return hhmmss;
      } else {
        return yymmdd + " " + hhmmss;
      }
    },
    /**
     * 初始化返回值，并抛出 change 事件
     */
    initTime(emit = true) {
      this.time = this.createDomSting();
      if (!emit)
        return;
      if (this.returnType === "timestamp" && this.type !== "time") {
        this.$emit("change", this.createTimeStamp(this.time));
        this.$emit("input", this.createTimeStamp(this.time));
        this.$emit("update:modelValue", this.createTimeStamp(this.time));
      } else {
        this.$emit("change", this.time);
        this.$emit("input", this.time);
        this.$emit("update:modelValue", this.time);
      }
    },
    /**
     * 用户选择日期或时间更新 data
     * @param {Object} e
     */
    bindDateChange(e) {
      const val = e.detail.value;
      this.year = this.years[val[0]];
      this.month = this.months[val[1]];
      this.day = this.days[val[2]];
    },
    bindTimeChange(e) {
      const val = e.detail.value;
      this.hour = this.hours[val[0]];
      this.minute = this.minutes[val[1]];
      this.second = this.seconds[val[2]];
    },
    /**
     * 初始化弹出层
     */
    initTimePicker() {
      if (this.disabled)
        return;
      const value = uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.fixIosDateFormat(this.time);
      this.initPickerValue(value);
      this.visible = !this.visible;
    },
    /**
     * 触发或关闭弹框
     */
    tiggerTimePicker(e) {
      this.visible = !this.visible;
    },
    /**
     * 用户点击“清空”按钮，清空当前值
     */
    clearTime() {
      this.time = "";
      this.$emit("change", this.time);
      this.$emit("input", this.time);
      this.$emit("update:modelValue", this.time);
      this.tiggerTimePicker();
    },
    /**
     * 用户点击“确定”按钮
     */
    setTime() {
      this.initTime();
      this.tiggerTimePicker();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.time),
    b: !$data.time
  }, !$data.time ? {
    c: common_vendor.t($options.selectTimeText)
  } : {}, {
    d: $props.disabled ? 1 : "",
    e: $props.border ? 1 : "",
    f: common_vendor.o((...args) => $options.initTimePicker && $options.initTimePicker(...args)),
    g: $data.visible
  }, $data.visible ? {
    h: common_vendor.o((...args) => $options.tiggerTimePicker && $options.tiggerTimePicker(...args))
  } : {}, {
    i: $data.visible
  }, $data.visible ? common_vendor.e({
    j: common_vendor.t($options.selectTimeText),
    k: $data.dateShow
  }, $data.dateShow ? {
    l: common_vendor.f($options.years, (item, index, i0) => {
      return {
        a: common_vendor.t($options.lessThanTen(item)),
        b: index
      };
    }),
    m: common_vendor.f($options.months, (item, index, i0) => {
      return {
        a: common_vendor.t($options.lessThanTen(item)),
        b: index
      };
    }),
    n: common_vendor.f($options.days, (item, index, i0) => {
      return {
        a: common_vendor.t($options.lessThanTen(item)),
        b: index
      };
    }),
    o: $data.indicatorStyle,
    p: $options.ymd,
    q: common_vendor.o((...args) => $options.bindDateChange && $options.bindDateChange(...args))
  } : {}, {
    r: $data.timeShow
  }, $data.timeShow ? common_vendor.e({
    s: common_vendor.f($options.hours, (item, index, i0) => {
      return {
        a: common_vendor.t($options.lessThanTen(item)),
        b: index
      };
    }),
    t: common_vendor.f($options.minutes, (item, index, i0) => {
      return {
        a: common_vendor.t($options.lessThanTen(item)),
        b: index
      };
    }),
    v: !$props.hideSecond
  }, !$props.hideSecond ? {
    w: common_vendor.f($options.seconds, (item, index, i0) => {
      return {
        a: common_vendor.t($options.lessThanTen(item)),
        b: index
      };
    })
  } : {}, {
    x: common_vendor.n($props.hideSecond ? "time-hide-second" : ""),
    y: $data.indicatorStyle,
    z: $options.hms,
    A: common_vendor.o((...args) => $options.bindTimeChange && $options.bindTimeChange(...args)),
    B: common_vendor.n($props.hideSecond ? "sign-center" : "sign-left"),
    C: !$props.hideSecond
  }, !$props.hideSecond ? {} : {}) : {}, {
    D: common_vendor.t($options.clearText),
    E: common_vendor.o((...args) => $options.clearTime && $options.clearTime(...args)),
    F: common_vendor.t($options.cancelText),
    G: common_vendor.o((...args) => $options.tiggerTimePicker && $options.tiggerTimePicker(...args)),
    H: common_vendor.t($options.okText),
    I: common_vendor.o((...args) => $options.setTime && $options.setTime(...args)),
    J: common_vendor.n($data.dateShow && $data.timeShow ? "" : "fix-nvue-height"),
    K: common_vendor.s($data.fixNvueBug)
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Code/uni-app/clock/uni_modules/uni-datetime-picker/components/uni-datetime-picker/time-picker.vue"]]);
wx.createComponent(Component);
