"use strict";
const common_vendor = require("../common/vendor.js");
const useUserStore = common_vendor.defineStore("user", {
  state: () => ({
    data: {
      userEmail: "",
      userName: "",
      userPassword: "",
      userCode: "",
      point: 0,
      completeTarget: 0,
      ifUpdate: 0,
      code: 0,
      picData: "",
      picUrl: "",
      userInfo: []
    }
  }),
  actions: {}
});
exports.useUserStore = useUserStore;
