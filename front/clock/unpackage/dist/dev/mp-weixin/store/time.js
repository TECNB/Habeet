"use strict";
const common_vendor = require("../common/vendor.js");
const useTimeStore = common_vendor.defineStore("time", {
  state: () => ({
    data: {
      ifstart: false,
      ifbegin: true,
      ifend: false,
      formattedTime: 0,
      remainingTime: 0,
      showNav_menu: true
    }
  }),
  actions: {}
});
exports.useTimeStore = useTimeStore;
