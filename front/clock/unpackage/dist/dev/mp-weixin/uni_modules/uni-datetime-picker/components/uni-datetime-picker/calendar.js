"use strict";
const uni_modules_uniDatetimePicker_components_uniDatetimePicker_util = require("./util.js");
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uniDatetimePicker_components_uniDatetimePicker_i18n_index = require("./i18n/index.js");
const calendarItem = () => "./calendar-item.js";
const timePicker = () => "./time-picker.js";
const { t } = common_vendor.initVueI18n(uni_modules_uniDatetimePicker_components_uniDatetimePicker_i18n_index.i18nMessages);
const _sfc_main = {
  components: {
    calendarItem,
    timePicker
  },
  props: {
    date: {
      type: String,
      default: ""
    },
    defTime: {
      type: [String, Object],
      default: ""
    },
    selectableTimes: {
      type: [Object],
      default() {
        return {};
      }
    },
    selected: {
      type: Array,
      default() {
        return [];
      }
    },
    startDate: {
      type: String,
      default: ""
    },
    endDate: {
      type: String,
      default: ""
    },
    startPlaceholder: {
      type: String,
      default: ""
    },
    endPlaceholder: {
      type: String,
      default: ""
    },
    range: {
      type: Boolean,
      default: false
    },
    hasTime: {
      type: Boolean,
      default: false
    },
    insert: {
      type: Boolean,
      default: true
    },
    showMonth: {
      type: Boolean,
      default: true
    },
    clearDate: {
      type: Boolean,
      default: true
    },
    checkHover: {
      type: Boolean,
      default: true
    },
    hideSecond: {
      type: [Boolean],
      default: false
    },
    pleStatus: {
      type: Object,
      default() {
        return {
          before: "",
          after: "",
          data: [],
          fulldate: ""
        };
      }
    },
    defaultValue: {
      type: [String, Object, Array],
      default: ""
    }
  },
  data() {
    return {
      show: false,
      weeks: [],
      calendar: {},
      nowDate: {},
      aniMaskShow: false,
      firstEnter: true,
      time: "",
      timeRange: {
        startTime: "",
        endTime: ""
      },
      tempSingleDate: "",
      tempRange: {
        before: "",
        after: ""
      }
    };
  },
  watch: {
    date: {
      immediate: true,
      handler(newVal) {
        if (!this.range) {
          this.tempSingleDate = newVal;
          setTimeout(() => {
            this.init(newVal);
          }, 100);
        }
      }
    },
    defTime: {
      immediate: true,
      handler(newVal) {
        if (!this.range) {
          this.time = newVal;
        } else {
          this.timeRange.startTime = newVal.start;
          this.timeRange.endTime = newVal.end;
        }
      }
    },
    startDate(val) {
      if (!this.cale) {
        return;
      }
      this.cale.setStartDate(val);
      this.cale.setDate(this.nowDate.fullDate);
      this.weeks = this.cale.weeks;
    },
    endDate(val) {
      if (!this.cale) {
        return;
      }
      this.cale.setEndDate(val);
      this.cale.setDate(this.nowDate.fullDate);
      this.weeks = this.cale.weeks;
    },
    selected(newVal) {
      if (!this.cale) {
        return;
      }
      this.cale.setSelectInfo(this.nowDate.fullDate, newVal);
      this.weeks = this.cale.weeks;
    },
    pleStatus: {
      immediate: true,
      handler(newVal) {
        const {
          before,
          after,
          fulldate,
          which
        } = newVal;
        this.tempRange.before = before;
        this.tempRange.after = after;
        setTimeout(() => {
          if (fulldate) {
            this.cale.setHoverMultiple(fulldate);
            if (before && after) {
              this.cale.lastHover = true;
              if (this.rangeWithinMonth(after, before))
                return;
              this.setDate(before);
            } else {
              this.cale.setMultiple(fulldate);
              this.setDate(this.nowDate.fullDate);
              this.calendar.fullDate = "";
              this.cale.lastHover = false;
            }
          } else {
            if (!this.cale) {
              return;
            }
            this.cale.setDefaultMultiple(before, after);
            if (which === "left" && before) {
              this.setDate(before);
              this.weeks = this.cale.weeks;
            } else if (after) {
              this.setDate(after);
              this.weeks = this.cale.weeks;
            }
            this.cale.lastHover = true;
          }
        }, 16);
      }
    }
  },
  computed: {
    timepickerStartTime() {
      const activeDate = this.range ? this.tempRange.before : this.calendar.fullDate;
      return activeDate === this.startDate ? this.selectableTimes.start : "";
    },
    timepickerEndTime() {
      const activeDate = this.range ? this.tempRange.after : this.calendar.fullDate;
      return activeDate === this.endDate ? this.selectableTimes.end : "";
    },
    /**
     * for i18n
     */
    selectDateText() {
      return t("uni-datetime-picker.selectDate");
    },
    startDateText() {
      return this.startPlaceholder || t("uni-datetime-picker.startDate");
    },
    endDateText() {
      return this.endPlaceholder || t("uni-datetime-picker.endDate");
    },
    okText() {
      return t("uni-datetime-picker.ok");
    },
    yearText() {
      return t("uni-datetime-picker.year");
    },
    monthText() {
      return t("uni-datetime-picker.month");
    },
    MONText() {
      return t("uni-calender.MON");
    },
    TUEText() {
      return t("uni-calender.TUE");
    },
    WEDText() {
      return t("uni-calender.WED");
    },
    THUText() {
      return t("uni-calender.THU");
    },
    FRIText() {
      return t("uni-calender.FRI");
    },
    SATText() {
      return t("uni-calender.SAT");
    },
    SUNText() {
      return t("uni-calender.SUN");
    },
    confirmText() {
      return t("uni-calender.confirm");
    }
  },
  created() {
    this.cale = new uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.Calendar({
      selected: this.selected,
      startDate: this.startDate,
      endDate: this.endDate,
      range: this.range
    });
    this.init(this.date);
  },
  methods: {
    leaveCale() {
      this.firstEnter = true;
    },
    handleMouse(weeks) {
      if (weeks.disable)
        return;
      if (this.cale.lastHover)
        return;
      let {
        before,
        after
      } = this.cale.multipleStatus;
      if (!before)
        return;
      this.calendar = weeks;
      this.cale.setHoverMultiple(this.calendar.fullDate);
      this.weeks = this.cale.weeks;
      if (this.firstEnter) {
        this.$emit("firstEnterCale", this.cale.multipleStatus);
        this.firstEnter = false;
      }
    },
    rangeWithinMonth(A, B) {
      const [yearA, monthA] = A.split("-");
      const [yearB, monthB] = B.split("-");
      return yearA === yearB && monthA === monthB;
    },
    // 蒙版点击事件
    maskClick() {
      this.close();
      this.$emit("maskClose");
    },
    clearCalender() {
      if (this.range) {
        this.timeRange.startTime = "";
        this.timeRange.endTime = "";
        this.tempRange.before = "";
        this.tempRange.after = "";
        this.cale.multipleStatus.before = "";
        this.cale.multipleStatus.after = "";
        this.cale.multipleStatus.data = [];
        this.cale.lastHover = false;
      } else {
        this.time = "";
        this.tempSingleDate = "";
      }
      this.calendar.fullDate = "";
      this.setDate(new Date());
    },
    bindDateChange(e) {
      const value = e.detail.value + "-1";
      this.setDate(value);
    },
    /**
     * 初始化日期显示
     * @param {Object} date
     */
    init(date) {
      if (!this.cale) {
        return;
      }
      this.cale.setDate(date || new Date());
      this.weeks = this.cale.weeks;
      this.nowDate = this.cale.getInfo(date);
      this.calendar = { ...this.nowDate };
      if (!date) {
        this.calendar.fullDate = "";
        if (this.defaultValue && !this.range) {
          const defaultDate = new Date(this.defaultValue);
          const fullDate = uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.getDate(defaultDate);
          const year = defaultDate.getFullYear();
          const month = defaultDate.getMonth() + 1;
          const date2 = defaultDate.getDate();
          const day = defaultDate.getDay();
          this.calendar = {
            fullDate,
            year,
            month,
            date: date2,
            day
          }, this.tempSingleDate = fullDate;
          this.time = uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.getTime(defaultDate, this.hideSecond);
        }
      }
    },
    /**
     * 打开日历弹窗
     */
    open() {
      if (this.clearDate && !this.insert) {
        this.cale.cleanMultipleStatus();
        this.init(this.date);
      }
      this.show = true;
      this.$nextTick(() => {
        setTimeout(() => {
          this.aniMaskShow = true;
        }, 50);
      });
    },
    /**
     * 关闭日历弹窗
     */
    close() {
      this.aniMaskShow = false;
      this.$nextTick(() => {
        setTimeout(() => {
          this.show = false;
          this.$emit("close");
        }, 300);
      });
    },
    /**
     * 确认按钮
     */
    confirm() {
      this.setEmit("confirm");
      this.close();
    },
    /**
     * 变化触发
     */
    change() {
      if (!this.insert)
        return;
      this.setEmit("change");
    },
    /**
     * 选择月份触发
     */
    monthSwitch() {
      let {
        year,
        month
      } = this.nowDate;
      this.$emit("monthSwitch", {
        year,
        month: Number(month)
      });
    },
    /**
     * 派发事件
     * @param {Object} name
     */
    setEmit(name) {
      if (!this.range) {
        if (!this.calendar.fullDate) {
          this.calendar = this.cale.getInfo(new Date());
          this.tempSingleDate = this.calendar.fullDate;
        }
        if (this.hasTime && !this.time) {
          this.time = uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.getTime(new Date(), this.hideSecond);
        }
      }
      let {
        year,
        month,
        date,
        fullDate,
        extraInfo
      } = this.calendar;
      this.$emit(name, {
        range: this.cale.multipleStatus,
        year,
        month,
        date,
        time: this.time,
        timeRange: this.timeRange,
        fulldate: fullDate,
        extraInfo: extraInfo || {}
      });
    },
    /**
     * 选择天触发
     * @param {Object} weeks
     */
    choiceDate(weeks) {
      if (weeks.disable)
        return;
      this.calendar = weeks;
      this.calendar.userChecked = true;
      this.cale.setMultiple(this.calendar.fullDate, true);
      this.weeks = this.cale.weeks;
      this.tempSingleDate = this.calendar.fullDate;
      const beforeDate = new Date(this.cale.multipleStatus.before).getTime();
      const afterDate = new Date(this.cale.multipleStatus.after).getTime();
      if (beforeDate > afterDate && afterDate) {
        this.tempRange.before = this.cale.multipleStatus.after;
        this.tempRange.after = this.cale.multipleStatus.before;
      } else {
        this.tempRange.before = this.cale.multipleStatus.before;
        this.tempRange.after = this.cale.multipleStatus.after;
      }
      this.change();
    },
    changeMonth(type) {
      let newDate;
      if (type === "pre") {
        newDate = this.cale.getPreMonthObj(this.nowDate.fullDate).fullDate;
      } else if (type === "next") {
        newDate = this.cale.getNextMonthObj(this.nowDate.fullDate).fullDate;
      }
      this.setDate(newDate);
      this.monthSwitch();
    },
    /**
     * 设置日期
     * @param {Object} date
     */
    setDate(date) {
      this.cale.setDate(date);
      this.weeks = this.cale.weeks;
      this.nowDate = this.cale.getInfo(date);
    }
  }
};
if (!Array) {
  const _component_calendar_item = common_vendor.resolveComponent("calendar-item");
  const _component_time_picker = common_vendor.resolveComponent("time-picker");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_component_calendar_item + _component_time_picker + _easycom_uni_icons2)();
}
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$props.insert && $data.show
  }, !$props.insert && $data.show ? {
    b: $data.aniMaskShow ? 1 : "",
    c: common_vendor.o((...args) => $options.maskClick && $options.maskClick(...args))
  } : {}, {
    d: $props.insert || $data.show
  }, $props.insert || $data.show ? common_vendor.e({
    e: common_vendor.o(($event) => $options.changeMonth("pre")),
    f: common_vendor.t(($data.nowDate.year || "") + $options.yearText + ($data.nowDate.month || "") + $options.monthText),
    g: $props.date,
    h: common_vendor.o((...args) => $options.bindDateChange && $options.bindDateChange(...args)),
    i: common_vendor.o(($event) => $options.changeMonth("next")),
    j: !$props.insert
  }, !$props.insert ? {
    k: common_vendor.o((...args) => $options.close && $options.close(...args))
  } : {}, {
    l: !$props.insert ? 1 : "",
    m: $props.showMonth
  }, $props.showMonth ? {
    n: common_vendor.t($data.nowDate.month)
  } : {}, {
    o: common_vendor.t($options.SUNText),
    p: common_vendor.t($options.MONText),
    q: common_vendor.t($options.TUEText),
    r: common_vendor.t($options.WEDText),
    s: common_vendor.t($options.THUText),
    t: common_vendor.t($options.FRIText),
    v: common_vendor.t($options.SATText),
    w: common_vendor.f($data.weeks, (item, weekIndex, i0) => {
      return {
        a: common_vendor.f(item, (weeks, weeksIndex, i1) => {
          return {
            a: common_vendor.o($options.choiceDate, weeksIndex),
            b: common_vendor.o($options.handleMouse, weeksIndex),
            c: "12eb3b66-0-" + i0 + "-" + i1,
            d: common_vendor.p({
              weeks,
              calendar: $data.calendar,
              selected: $props.selected,
              checkHover: $props.range
            }),
            e: weeksIndex
          };
        }),
        b: weekIndex
      };
    }),
    x: !$props.insert && !$props.range && $props.hasTime
  }, !$props.insert && !$props.range && $props.hasTime ? {
    y: common_vendor.t($data.tempSingleDate ? $data.tempSingleDate : $options.selectDateText),
    z: common_vendor.o(($event) => $data.time = $event),
    A: common_vendor.p({
      type: "time",
      start: $options.timepickerStartTime,
      end: $options.timepickerEndTime,
      disabled: !$data.tempSingleDate,
      border: false,
      ["hide-second"]: $props.hideSecond,
      modelValue: $data.time
    })
  } : {}, {
    B: !$props.insert && $props.range && $props.hasTime
  }, !$props.insert && $props.range && $props.hasTime ? {
    C: common_vendor.t($data.tempRange.before ? $data.tempRange.before : $options.startDateText),
    D: common_vendor.o(($event) => $data.timeRange.startTime = $event),
    E: common_vendor.p({
      type: "time",
      start: $options.timepickerStartTime,
      border: false,
      ["hide-second"]: $props.hideSecond,
      disabled: !$data.tempRange.before,
      modelValue: $data.timeRange.startTime
    }),
    F: common_vendor.p({
      type: "arrowthinright",
      color: "#999"
    }),
    G: common_vendor.t($data.tempRange.after ? $data.tempRange.after : $options.endDateText),
    H: common_vendor.o(($event) => $data.timeRange.endTime = $event),
    I: common_vendor.p({
      type: "time",
      end: $options.timepickerEndTime,
      border: false,
      ["hide-second"]: $props.hideSecond,
      disabled: !$data.tempRange.after,
      modelValue: $data.timeRange.endTime
    })
  } : {}, {
    J: !$props.insert
  }, !$props.insert ? {
    K: common_vendor.t($options.confirmText),
    L: common_vendor.o((...args) => $options.confirm && $options.confirm(...args))
  } : {}, {
    M: !$props.insert ? 1 : "",
    N: $data.aniMaskShow ? 1 : "",
    O: $data.aniMaskShow ? 1 : ""
  }) : {}, {
    P: common_vendor.o((...args) => $options.leaveCale && $options.leaveCale(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Code/uni-app/clock/uni_modules/uni-datetime-picker/components/uni-datetime-picker/calendar.vue"]]);
wx.createComponent(Component);
