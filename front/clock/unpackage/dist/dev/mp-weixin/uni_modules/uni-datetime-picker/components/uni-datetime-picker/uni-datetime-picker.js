"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uniDatetimePicker_components_uniDatetimePicker_i18n_index = require("./i18n/index.js");
const uni_modules_uniDatetimePicker_components_uniDatetimePicker_util = require("./util.js");
const Calendar = () => "./calendar.js";
const TimePicker = () => "./time-picker.js";
const _sfc_main = {
  name: "UniDatetimePicker",
  options: {
    virtualHost: true
  },
  components: {
    Calendar,
    TimePicker
  },
  data() {
    return {
      isRange: false,
      hasTime: false,
      displayValue: "",
      inputDate: "",
      calendarDate: "",
      pickerTime: "",
      calendarRange: {
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: ""
      },
      displayRangeValue: {
        startDate: "",
        endDate: ""
      },
      tempRange: {
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: ""
      },
      // 左右日历同步数据
      startMultipleStatus: {
        before: "",
        after: "",
        data: [],
        fulldate: ""
      },
      endMultipleStatus: {
        before: "",
        after: "",
        data: [],
        fulldate: ""
      },
      pickerVisible: false,
      pickerPositionStyle: null,
      isEmitValue: false,
      isPhone: false,
      isFirstShow: true,
      i18nT: () => {
      }
    };
  },
  props: {
    type: {
      type: String,
      default: "datetime"
    },
    value: {
      type: [String, Number, Array, Date],
      default: ""
    },
    modelValue: {
      type: [String, Number, Array, Date],
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
    placeholder: {
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
    rangeSeparator: {
      type: String,
      default: "-"
    },
    border: {
      type: [Boolean],
      default: true
    },
    disabled: {
      type: [Boolean],
      default: false
    },
    clearIcon: {
      type: [Boolean],
      default: true
    },
    hideSecond: {
      type: [Boolean],
      default: false
    },
    defaultValue: {
      type: [String, Object, Array],
      default: ""
    }
  },
  watch: {
    type: {
      immediate: true,
      handler(newVal) {
        this.hasTime = newVal.indexOf("time") !== -1;
        this.isRange = newVal.indexOf("range") !== -1;
      }
    },
    modelValue: {
      immediate: true,
      handler(newVal) {
        if (this.isEmitValue) {
          this.isEmitValue = false;
          return;
        }
        this.initPicker(newVal);
      }
    },
    start: {
      immediate: true,
      handler(newVal) {
        if (!newVal)
          return;
        this.calendarRange.startDate = uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.getDate(newVal);
        if (this.hasTime) {
          this.calendarRange.startTime = uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.getTime(newVal);
        }
      }
    },
    end: {
      immediate: true,
      handler(newVal) {
        if (!newVal)
          return;
        this.calendarRange.endDate = uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.getDate(newVal);
        if (this.hasTime) {
          this.calendarRange.endTime = uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.getTime(newVal, this.hideSecond);
        }
      }
    }
  },
  computed: {
    timepickerStartTime() {
      const activeDate = this.isRange ? this.tempRange.startDate : this.inputDate;
      return activeDate === this.calendarRange.startDate ? this.calendarRange.startTime : "";
    },
    timepickerEndTime() {
      const activeDate = this.isRange ? this.tempRange.endDate : this.inputDate;
      return activeDate === this.calendarRange.endDate ? this.calendarRange.endTime : "";
    },
    mobileCalendarTime() {
      const timeRange = {
        start: this.tempRange.startTime,
        end: this.tempRange.endTime
      };
      return this.isRange ? timeRange : this.pickerTime;
    },
    mobSelectableTime() {
      return {
        start: this.calendarRange.startTime,
        end: this.calendarRange.endTime
      };
    },
    datePopupWidth() {
      return this.isRange ? 653 : 301;
    },
    /**
     * for i18n
     */
    singlePlaceholderText() {
      return this.placeholder || (this.type === "date" ? this.selectDateText : this.selectDateTimeText);
    },
    startPlaceholderText() {
      return this.startPlaceholder || this.startDateText;
    },
    endPlaceholderText() {
      return this.endPlaceholder || this.endDateText;
    },
    selectDateText() {
      return this.i18nT("uni-datetime-picker.selectDate");
    },
    selectDateTimeText() {
      return this.i18nT("uni-datetime-picker.selectDateTime");
    },
    selectTimeText() {
      return this.i18nT("uni-datetime-picker.selectTime");
    },
    startDateText() {
      return this.startPlaceholder || this.i18nT("uni-datetime-picker.startDate");
    },
    startTimeText() {
      return this.i18nT("uni-datetime-picker.startTime");
    },
    endDateText() {
      return this.endPlaceholder || this.i18nT("uni-datetime-picker.endDate");
    },
    endTimeText() {
      return this.i18nT("uni-datetime-picker.endTime");
    },
    okText() {
      return this.i18nT("uni-datetime-picker.ok");
    },
    clearText() {
      return this.i18nT("uni-datetime-picker.clear");
    },
    showClearIcon() {
      return this.clearIcon && !this.disabled && (this.displayValue || this.displayRangeValue.startDate && this.displayRangeValue.endDate);
    }
  },
  created() {
    this.initI18nT();
    this.platform();
  },
  methods: {
    initI18nT() {
      const vueI18n = common_vendor.initVueI18n(uni_modules_uniDatetimePicker_components_uniDatetimePicker_i18n_index.i18nMessages);
      this.i18nT = vueI18n.t;
    },
    initPicker(newVal) {
      if (!newVal && !this.defaultValue || Array.isArray(newVal) && !newVal.length) {
        this.$nextTick(() => {
          this.clear(false);
        });
        return;
      }
      if (!Array.isArray(newVal) && !this.isRange) {
        if (newVal) {
          this.displayValue = this.inputDate = this.calendarDate = uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.getDate(newVal);
          if (this.hasTime) {
            this.pickerTime = uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.getTime(newVal, this.hideSecond);
            this.displayValue = `${this.displayValue} ${this.pickerTime}`;
          }
        } else if (this.defaultValue) {
          this.inputDate = this.calendarDate = uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.getDate(this.defaultValue);
          if (this.hasTime) {
            this.pickerTime = uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.getTime(this.defaultValue, this.hideSecond);
          }
        }
      } else {
        const [before, after] = newVal;
        if (!before && !after)
          return;
        const beforeDate = uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.getDate(before);
        const beforeTime = uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.getTime(before, this.hideSecond);
        const afterDate = uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.getDate(after);
        const afterTime = uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.getTime(after, this.hideSecond);
        const startDate = beforeDate;
        const endDate = afterDate;
        this.displayRangeValue.startDate = this.tempRange.startDate = startDate;
        this.displayRangeValue.endDate = this.tempRange.endDate = endDate;
        if (this.hasTime) {
          this.displayRangeValue.startDate = `${beforeDate} ${beforeTime}`;
          this.displayRangeValue.endDate = `${afterDate} ${afterTime}`;
          this.tempRange.startTime = beforeTime;
          this.tempRange.endTime = afterTime;
        }
        const defaultRange = {
          before: beforeDate,
          after: afterDate
        };
        this.startMultipleStatus = Object.assign({}, this.startMultipleStatus, defaultRange, {
          which: "right"
        });
        this.endMultipleStatus = Object.assign({}, this.endMultipleStatus, defaultRange, {
          which: "left"
        });
      }
    },
    updateLeftCale(e) {
      const left = this.$refs.left;
      left.cale.setHoverMultiple(e.after);
      left.setDate(this.$refs.left.nowDate.fullDate);
    },
    updateRightCale(e) {
      const right = this.$refs.right;
      right.cale.setHoverMultiple(e.after);
      right.setDate(this.$refs.right.nowDate.fullDate);
    },
    platform() {
      const { windowWidth } = common_vendor.index.getSystemInfoSync();
      this.isPhone = windowWidth <= 500;
      this.windowWidth = windowWidth;
    },
    show() {
      if (this.disabled) {
        return;
      }
      this.platform();
      if (this.isPhone) {
        this.$refs.mobile.open();
        return;
      }
      this.pickerPositionStyle = {
        top: "10px"
      };
      const dateEditor = common_vendor.index.createSelectorQuery().in(this).select(".uni-date-editor");
      dateEditor.boundingClientRect((rect) => {
        if (this.windowWidth - rect.left < this.datePopupWidth) {
          this.pickerPositionStyle.right = 0;
        }
      }).exec();
      setTimeout(() => {
        this.pickerVisible = !this.pickerVisible;
        if (!this.isPhone && this.isRange && this.isFirstShow) {
          this.isFirstShow = false;
          const {
            startDate,
            endDate
          } = this.calendarRange;
          if (startDate && endDate) {
            if (this.diffDate(startDate, endDate) < 30) {
              this.$refs.right.changeMonth("pre");
            }
          } else {
            this.$refs.right.changeMonth("next");
            this.$refs.right.cale.lastHover = false;
          }
        }
      }, 50);
    },
    close() {
      setTimeout(() => {
        this.pickerVisible = false;
        this.$emit("maskClick", this.value);
        this.$refs.mobile && this.$refs.mobile.close();
      }, 20);
    },
    setEmit(value) {
      if (this.returnType === "timestamp" || this.returnType === "date") {
        if (!Array.isArray(value)) {
          if (!this.hasTime) {
            value = value + " 00:00:00";
          }
          value = this.createTimestamp(value);
          if (this.returnType === "date") {
            value = new Date(value);
          }
        } else {
          if (!this.hasTime) {
            value[0] = value[0] + " 00:00:00";
            value[1] = value[1] + " 00:00:00";
          }
          value[0] = this.createTimestamp(value[0]);
          value[1] = this.createTimestamp(value[1]);
          if (this.returnType === "date") {
            value[0] = new Date(value[0]);
            value[1] = new Date(value[1]);
          }
        }
      }
      this.$emit("update:modelValue", value);
      this.$emit("input", value);
      this.$emit("change", value);
      this.isEmitValue = true;
    },
    createTimestamp(date) {
      date = uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.fixIosDateFormat(date);
      return Date.parse(new Date(date));
    },
    singleChange(e) {
      this.calendarDate = this.inputDate = e.fulldate;
      if (this.hasTime)
        return;
      this.confirmSingleChange();
    },
    confirmSingleChange() {
      if (!uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.checkDate(this.inputDate)) {
        const now = new Date();
        this.calendarDate = this.inputDate = uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.getDate(now);
        this.pickerTime = uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.getTime(now, this.hideSecond);
      }
      let startLaterInputDate = false;
      let startDate, startTime;
      if (this.start) {
        let startString = this.start;
        if (typeof this.start === "number") {
          startString = uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.getDateTime(this.start, this.hideSecond);
        }
        [startDate, startTime] = startString.split(" ");
        if (this.start && !uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.dateCompare(startDate, this.inputDate)) {
          startLaterInputDate = true;
          this.inputDate = startDate;
        }
      }
      let endEarlierInputDate = false;
      let endDate, endTime;
      if (this.end) {
        let endString = this.end;
        if (typeof this.end === "number") {
          endString = uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.getDateTime(this.end, this.hideSecond);
        }
        [endDate, endTime] = endString.split(" ");
        if (this.end && !uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.dateCompare(this.inputDate, endDate)) {
          endEarlierInputDate = true;
          this.inputDate = endDate;
        }
      }
      if (this.hasTime) {
        if (startLaterInputDate) {
          this.pickerTime = startTime || uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.getDefaultSecond(this.hideSecond);
        }
        if (endEarlierInputDate) {
          this.pickerTime = endTime || uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.getDefaultSecond(this.hideSecond);
        }
        if (!this.pickerTime) {
          this.pickerTime = uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.getTime(Date.now(), this.hideSecond);
        }
        this.displayValue = `${this.inputDate} ${this.pickerTime}`;
      } else {
        this.displayValue = this.inputDate;
      }
      this.setEmit(this.displayValue);
      this.pickerVisible = false;
    },
    leftChange(e) {
      const {
        before,
        after
      } = e.range;
      this.rangeChange(before, after);
      const obj = {
        before: e.range.before,
        after: e.range.after,
        data: e.range.data,
        fulldate: e.fulldate
      };
      this.startMultipleStatus = Object.assign({}, this.startMultipleStatus, obj);
    },
    rightChange(e) {
      const {
        before,
        after
      } = e.range;
      this.rangeChange(before, after);
      const obj = {
        before: e.range.before,
        after: e.range.after,
        data: e.range.data,
        fulldate: e.fulldate
      };
      this.endMultipleStatus = Object.assign({}, this.endMultipleStatus, obj);
    },
    mobileChange(e) {
      if (this.isRange) {
        const { before, after } = e.range;
        if (!before || !after) {
          return;
        }
        this.handleStartAndEnd(before, after, true);
        if (this.hasTime) {
          const {
            startTime,
            endTime
          } = e.timeRange;
          this.tempRange.startTime = startTime;
          this.tempRange.endTime = endTime;
        }
        this.confirmRangeChange();
      } else {
        if (this.hasTime) {
          this.displayValue = e.fulldate + " " + e.time;
        } else {
          this.displayValue = e.fulldate;
        }
        this.setEmit(this.displayValue);
      }
      this.$refs.mobile.close();
    },
    rangeChange(before, after) {
      if (!(before && after))
        return;
      this.handleStartAndEnd(before, after, true);
      if (this.hasTime)
        return;
      this.confirmRangeChange();
    },
    confirmRangeChange() {
      if (!this.tempRange.startDate || !this.tempRange.endDate) {
        this.pickerVisible = false;
        return;
      }
      if (!uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.checkDate(this.tempRange.startDate)) {
        this.tempRange.startDate = uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.getDate(Date.now());
      }
      if (!uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.checkDate(this.tempRange.endDate)) {
        this.tempRange.endDate = uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.getDate(Date.now());
      }
      let start, end;
      let startDateLaterRangeStartDate = false;
      let startDateLaterRangeEndDate = false;
      let startDate, startTime;
      if (this.start) {
        let startString = this.start;
        if (typeof this.start === "number") {
          startString = uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.getDateTime(this.start, this.hideSecond);
        }
        [startDate, startTime] = startString.split(" ");
        if (this.start && !uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.dateCompare(this.start, this.tempRange.startDate)) {
          startDateLaterRangeStartDate = true;
          this.tempRange.startDate = startDate;
        }
        if (this.start && !uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.dateCompare(this.start, this.tempRange.endDate)) {
          startDateLaterRangeEndDate = true;
          this.tempRange.endDate = startDate;
        }
      }
      let endDateEarlierRangeStartDate = false;
      let endDateEarlierRangeEndDate = false;
      let endDate, endTime;
      if (this.end) {
        let endString = this.end;
        if (typeof this.end === "number") {
          endString = uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.getDateTime(this.end, this.hideSecond);
        }
        [endDate, endTime] = endString.split(" ");
        if (this.end && !uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.dateCompare(this.tempRange.startDate, this.end)) {
          endDateEarlierRangeStartDate = true;
          this.tempRange.startDate = endDate;
        }
        if (this.end && !uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.dateCompare(this.tempRange.endDate, this.end)) {
          endDateEarlierRangeEndDate = true;
          this.tempRange.endDate = endDate;
        }
      }
      if (!this.hasTime) {
        start = this.displayRangeValue.startDate = this.tempRange.startDate;
        end = this.displayRangeValue.endDate = this.tempRange.endDate;
      } else {
        if (startDateLaterRangeStartDate) {
          this.tempRange.startTime = startTime || uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.getDefaultSecond(this.hideSecond);
        } else if (endDateEarlierRangeStartDate) {
          this.tempRange.startTime = endTime || uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.getDefaultSecond(this.hideSecond);
        }
        if (!this.tempRange.startTime) {
          this.tempRange.startTime = uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.getTime(Date.now(), this.hideSecond);
        }
        if (startDateLaterRangeEndDate) {
          this.tempRange.endTime = startTime || uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.getDefaultSecond(this.hideSecond);
        } else if (endDateEarlierRangeEndDate) {
          this.tempRange.endTime = endTime || uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.getDefaultSecond(this.hideSecond);
        }
        if (!this.tempRange.endTime) {
          this.tempRange.endTime = uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.getTime(Date.now(), this.hideSecond);
        }
        start = this.displayRangeValue.startDate = `${this.tempRange.startDate} ${this.tempRange.startTime}`;
        end = this.displayRangeValue.endDate = `${this.tempRange.endDate} ${this.tempRange.endTime}`;
      }
      if (!uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.dateCompare(start, end)) {
        [start, end] = [end, start];
      }
      this.displayRangeValue.startDate = start;
      this.displayRangeValue.endDate = end;
      const displayRange = [start, end];
      this.setEmit(displayRange);
      this.pickerVisible = false;
    },
    handleStartAndEnd(before, after, temp = false) {
      if (!(before && after))
        return;
      const type = temp ? "tempRange" : "range";
      const isStartEarlierEnd = uni_modules_uniDatetimePicker_components_uniDatetimePicker_util.dateCompare(before, after);
      this[type].startDate = isStartEarlierEnd ? before : after;
      this[type].endDate = isStartEarlierEnd ? after : before;
    },
    /**
     * 比较时间大小
     */
    dateCompare(startDate, endDate) {
      startDate = new Date(startDate.replace("-", "/").replace("-", "/"));
      endDate = new Date(endDate.replace("-", "/").replace("-", "/"));
      return startDate <= endDate;
    },
    /**
     * 比较时间差
     */
    diffDate(startDate, endDate) {
      startDate = new Date(startDate.replace("-", "/").replace("-", "/"));
      endDate = new Date(endDate.replace("-", "/").replace("-", "/"));
      const diff = (endDate - startDate) / (24 * 60 * 60 * 1e3);
      return Math.abs(diff);
    },
    clear(needEmit = true) {
      if (!this.isRange) {
        this.displayValue = "";
        this.inputDate = "";
        this.pickerTime = "";
        if (this.isPhone) {
          this.$refs.mobile && this.$refs.mobile.clearCalender();
        } else {
          this.$refs.pcSingle && this.$refs.pcSingle.clearCalender();
        }
        if (needEmit) {
          this.$emit("change", "");
          this.$emit("input", "");
          this.$emit("update:modelValue", "");
        }
      } else {
        this.displayRangeValue.startDate = "";
        this.displayRangeValue.endDate = "";
        this.tempRange.startDate = "";
        this.tempRange.startTime = "";
        this.tempRange.endDate = "";
        this.tempRange.endTime = "";
        if (this.isPhone) {
          this.$refs.mobile && this.$refs.mobile.clearCalender();
        } else {
          this.$refs.left && this.$refs.left.clearCalender();
          this.$refs.right && this.$refs.right.clearCalender();
          this.$refs.right && this.$refs.right.changeMonth("next");
        }
        if (needEmit) {
          this.$emit("change", []);
          this.$emit("input", []);
          this.$emit("update:modelValue", []);
        }
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_time_picker = common_vendor.resolveComponent("time-picker");
  const _component_Calendar = common_vendor.resolveComponent("Calendar");
  (_easycom_uni_icons2 + _component_time_picker + _component_Calendar)();
}
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.isRange
  }, !$data.isRange ? {
    b: common_vendor.p({
      type: "calendar",
      color: "#c0c4cc",
      size: "22"
    }),
    c: common_vendor.t($data.displayValue || $options.singlePlaceholderText)
  } : {
    d: common_vendor.p({
      type: "calendar",
      color: "#c0c4cc",
      size: "22"
    }),
    e: common_vendor.t($data.displayRangeValue.startDate || $options.startPlaceholderText),
    f: common_vendor.t($props.rangeSeparator),
    g: common_vendor.t($data.displayRangeValue.endDate || $options.endPlaceholderText)
  }, {
    h: $options.showClearIcon
  }, $options.showClearIcon ? {
    i: common_vendor.p({
      type: "clear",
      color: "#c0c4cc",
      size: "22"
    }),
    j: common_vendor.o((...args) => $options.clear && $options.clear(...args))
  } : {}, {
    k: $props.disabled ? 1 : "",
    l: $props.border ? 1 : "",
    m: common_vendor.o((...args) => $options.show && $options.show(...args)),
    n: $data.pickerVisible,
    o: common_vendor.o((...args) => $options.close && $options.close(...args)),
    p: !$data.isPhone
  }, !$data.isPhone ? common_vendor.e({
    q: !$data.isRange
  }, !$data.isRange ? common_vendor.e({
    r: $data.hasTime
  }, $data.hasTime ? {
    s: $options.selectDateText,
    t: $data.inputDate,
    v: common_vendor.o(($event) => $data.inputDate = $event.detail.value),
    w: $options.selectTimeText,
    x: !$data.inputDate,
    y: $data.pickerTime,
    z: common_vendor.o(($event) => $data.pickerTime = $event.detail.value),
    A: common_vendor.o(($event) => $data.pickerTime = $event),
    B: common_vendor.p({
      type: "time",
      border: false,
      disabled: !$data.inputDate,
      start: $options.timepickerStartTime,
      end: $options.timepickerEndTime,
      hideSecond: $props.hideSecond,
      modelValue: $data.pickerTime
    })
  } : {}, {
    C: common_vendor.sr("pcSingle", "aa23bcf8-4"),
    D: common_vendor.o($options.singleChange),
    E: common_vendor.p({
      showMonth: false,
      ["start-date"]: $data.calendarRange.startDate,
      ["end-date"]: $data.calendarRange.endDate,
      date: $data.calendarDate,
      ["default-value"]: $props.defaultValue
    }),
    F: $data.hasTime
  }, $data.hasTime ? {
    G: common_vendor.t($options.okText),
    H: common_vendor.o((...args) => $options.confirmSingleChange && $options.confirmSingleChange(...args))
  } : {}, {
    I: common_vendor.s($data.pickerPositionStyle)
  }) : common_vendor.e({
    J: $data.hasTime
  }, $data.hasTime ? {
    K: $options.startDateText,
    L: $data.tempRange.startDate,
    M: common_vendor.o(($event) => $data.tempRange.startDate = $event.detail.value),
    N: $options.startTimeText,
    O: !$data.tempRange.startDate,
    P: $data.tempRange.startTime,
    Q: common_vendor.o(($event) => $data.tempRange.startTime = $event.detail.value),
    R: common_vendor.o(($event) => $data.tempRange.startTime = $event),
    S: common_vendor.p({
      type: "time",
      start: $options.timepickerStartTime,
      border: false,
      disabled: !$data.tempRange.startDate,
      hideSecond: $props.hideSecond,
      modelValue: $data.tempRange.startTime
    }),
    T: common_vendor.p({
      type: "arrowthinright",
      color: "#999"
    }),
    U: $options.endDateText,
    V: $data.tempRange.endDate,
    W: common_vendor.o(($event) => $data.tempRange.endDate = $event.detail.value),
    X: $options.endTimeText,
    Y: !$data.tempRange.endDate,
    Z: $data.tempRange.endTime,
    aa: common_vendor.o(($event) => $data.tempRange.endTime = $event.detail.value),
    ab: common_vendor.o(($event) => $data.tempRange.endTime = $event),
    ac: common_vendor.p({
      type: "time",
      end: $options.timepickerEndTime,
      border: false,
      disabled: !$data.tempRange.endDate,
      hideSecond: $props.hideSecond,
      modelValue: $data.tempRange.endTime
    })
  } : {}, {
    ad: common_vendor.sr("left", "aa23bcf8-8"),
    ae: common_vendor.o($options.leftChange),
    af: common_vendor.o($options.updateRightCale),
    ag: common_vendor.p({
      showMonth: false,
      ["start-date"]: $data.calendarRange.startDate,
      ["end-date"]: $data.calendarRange.endDate,
      range: true,
      pleStatus: $data.endMultipleStatus
    }),
    ah: common_vendor.sr("right", "aa23bcf8-9"),
    ai: common_vendor.o($options.rightChange),
    aj: common_vendor.o($options.updateLeftCale),
    ak: common_vendor.p({
      showMonth: false,
      ["start-date"]: $data.calendarRange.startDate,
      ["end-date"]: $data.calendarRange.endDate,
      range: true,
      pleStatus: $data.startMultipleStatus
    }),
    al: $data.hasTime
  }, $data.hasTime ? {
    am: common_vendor.t($options.clearText),
    an: common_vendor.o((...args) => $options.clear && $options.clear(...args)),
    ao: common_vendor.t($options.okText),
    ap: common_vendor.o((...args) => $options.confirmRangeChange && $options.confirmRangeChange(...args))
  } : {}, {
    aq: common_vendor.s($data.pickerPositionStyle)
  }), {
    ar: $data.pickerVisible
  }) : {}, {
    as: $data.isPhone
  }, $data.isPhone ? {
    at: common_vendor.sr("mobile", "aa23bcf8-10"),
    av: common_vendor.o($options.mobileChange),
    aw: common_vendor.o($options.close),
    ax: common_vendor.p({
      clearDate: false,
      date: $data.calendarDate,
      defTime: $options.mobileCalendarTime,
      ["start-date"]: $data.calendarRange.startDate,
      ["end-date"]: $data.calendarRange.endDate,
      selectableTimes: $options.mobSelectableTime,
      startPlaceholder: $props.startPlaceholder,
      endPlaceholder: $props.endPlaceholder,
      ["default-value"]: $props.defaultValue,
      pleStatus: $data.endMultipleStatus,
      showMonth: false,
      range: $data.isRange,
      hasTime: $data.hasTime,
      insert: false,
      hideSecond: $props.hideSecond
    })
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Code/uni-app/clock/uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.vue"]]);
wx.createComponent(Component);
