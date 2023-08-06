"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const store_tag = require("../../store/tag.js");
const store_user = require("../../store/user.js");
const store_time = require("../../store/time.js");
if (!Array) {
  const _easycom_navbar2 = common_vendor.resolveComponent("navbar");
  const _easycom_uni_transition2 = common_vendor.resolveComponent("uni-transition");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_navbar2 + _easycom_uni_transition2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_navbar = () => "../../components/navbar/navbar.js";
const _easycom_uni_transition = () => "../../uni_modules/uni-transition/components/uni-transition/uni-transition.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_navbar + _easycom_uni_transition + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "Tag",
  setup(__props) {
    const url = common_vendor.inject("url");
    const user = store_user.useUserStore();
    const tag = store_tag.useTagStore();
    store_time.useTimeStore();
    const state = common_vendor.reactive({
      tagWithTime: [],
      ifshowButton: true,
      ifshowTagDetailBNull: false
    });
    common_vendor.onMounted(
      () => {
        tag.data.tagPoint = 1;
        tag.data.ifTagUpdate = 0;
        common_vendor.index.request({
          url: url + "/tag/get",
          method: "POST",
          data: user.data.userEmail,
          success: (res) => {
            console.log(res);
            if (res.data.data[0].ifTagNull == 1) {
              state.ifshowTagDetailBNull = true;
              tag.data.tagHour = 0;
              tag.data.tagMinute = 30;
            } else {
              tag.data.tagName = "";
              tag.data.tagDescribe = "";
              state.ifshowTagDetailBNull = false;
              tag.data.tagHour = res.data.data[0].tagHour;
              tag.data.tagMinute = res.data.data[0].tagMinute;
              for (let i = 0; i < res.data.data.length; i++) {
                state.tagWithTime.push({
                  "tagName": res.data.data[i].tagName,
                  "tagDescribe": res.data.data[i].tagDescribe,
                  "tagHour": res.data.data[i].tagHour,
                  "tagMinute": res.data.data[i].tagMinute,
                  "tagPoint": res.data.data[i].tagPoint,
                  "tagId": res.data.data[i].id
                });
              }
            }
          }
        });
      }
    );
    const tosaveTag = (index) => {
      tag.data.tagName = state.tagWithTime[index].tagName;
      tag.data.tagDescribe = state.tagWithTime[index].tagDescribe;
      tag.data.tagHour = state.tagWithTime[index].tagHour;
      tag.data.tagMinute = state.tagWithTime[index].tagMinute;
      tag.data.tagPoint = state.tagWithTime[index].tagPoint;
      tag.data.ifTagUpdate = 1;
      tag.data.tagId = state.tagWithTime[index].tagId;
      common_vendor.index.redirectTo({
        url: "../../pages/TagCreat/TagCreat"
      });
    };
    let popup = common_vendor.ref(null);
    const TagTaskPATDelete = (index) => {
      popup.value.open();
      state.index = index;
    };
    const confirm = () => {
      popup.value.close();
      common_vendor.index.request({
        url: url + "/tag/delete",
        method: "POST",
        data: state.tagWithTime[state.index].tagName,
        success: (res) => {
          common_vendor.index.showToast({
            icon: "none",
            title: "删除标签"
          });
          state.tagWithTime.length--;
          if (state.tagWithTime.length == 0) {
            state.ifshowTagDetailBNull = true;
          }
          state.tagWithTime.splice(state.index, 1);
        }
      });
    };
    const close = () => {
      popup.value.close();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          navbarTo: "/menu/3"
        }),
        b: !state.ifshowTagDetailBNull
      }, !state.ifshowTagDetailBNull ? {
        c: common_vendor.f(state.tagWithTime, (item, index, i0) => {
          return {
            a: common_vendor.t(item.tagName),
            b: common_vendor.t(item.tagDescribe),
            c: common_vendor.o(($event) => tosaveTag(index), index),
            d: "a1d91c32-1-" + i0,
            e: common_vendor.o(($event) => TagTaskPATDelete(index), index),
            f: "a1d91c32-2-" + i0,
            g: index
          };
        }),
        d: common_assets._imports_0$5,
        e: common_assets._imports_1$3,
        f: common_vendor.p({
          ["mode-class"]: "fade",
          show: common_vendor.unref(tag).data.ifshowTagDetailB
        }),
        g: common_assets._imports_2$4,
        h: common_vendor.p({
          ["mode-class"]: "fade",
          show: common_vendor.unref(tag).data.ifshowTagDetailBDelete
        })
      } : {}, {
        i: state.ifshowTagDetailBNull
      }, state.ifshowTagDetailBNull ? {
        j: common_assets._imports_0$5
      } : {}, {
        k: common_assets._imports_3$1,
        l: common_vendor.o(close),
        m: common_vendor.o(confirm),
        n: common_vendor.p({
          type: "error",
          mode: "base",
          title: "确定要删除吗?",
          content: "删除后将会从您的标签移除数据",
          duration: 2e3,
          ["before-close"]: true
        }),
        o: common_vendor.sr(popup, "a1d91c32-3", {
          "k": "popup"
        }),
        p: common_vendor.p({
          type: "dialog"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/uni-app/clock/pages/Tag/Tag.vue"]]);
wx.createPage(MiniProgramPage);
