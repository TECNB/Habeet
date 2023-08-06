"use strict";
const common_vendor = require("../common/vendor.js");
const useTargetStore = common_vendor.defineStore("target", {
  state: () => ({
    data: {
      targetName: "",
      targetDescribe: "",
      targetPoint: "",
      deadline: "",
      ifDoing: false,
      Doing: true,
      ifDone: true,
      Done: false,
      ifExpire: true,
      Expire: false,
      currentTime: "",
      deadline: [],
      deadlineDate: [],
      dayDiff: [],
      timeDiff: [],
      ifshowDay: [],
      ifshowTargetTaskPAT: true,
      ifshowTargetTaskPATDelete: false,
      targetId: 0,
      ifshowTargetTaskNull0: false,
      ifshowTargetTaskNull1: false,
      ifshowTargetTaskNull2: false,
      ifshowTargetTaskNull3: false,
      targetNoTimeLength: 0,
      targetWithTimeLength: 0,
      targetCompletedLength: 0,
      targetExpireLength: 0
    }
  }),
  actions: {}
});
exports.useTargetStore = useTargetStore;
