"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const store_user = require("../../store/user.js");
const store_time = require("../../store/time.js");
const store_tag = require("../../store/tag.js");
const _sfc_main = {
  __name: "Wx",
  setup(__props) {
    const url = common_vendor.inject("url");
    const user = store_user.useUserStore();
    const time = store_time.useTimeStore();
    const tag = store_tag.useTagStore();
    if (user.data.ifUpdate != 3) {
      user.data.picUrl = "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0";
    }
    const state = common_vendor.reactive({
      userConfirm: "",
      flag: false,
      countdown: 0,
      showClearIcon1: false,
      showClearIcon2: false,
      password: "password",
      eye: "eye",
      avatarUrl: user.data.picUrl
    });
    const onNickName = (e) => {
      state.inputClearValue1 = e.detail.value;
      user.data.userName = state.inputClearValue1;
    };
    const onChooseAvatar = (e) => {
      state.avatarUrl = e.detail.avatarUrl;
      console.log(state.avatarUrl);
      common_vendor.index.uploadFile({
        url: url + "/user/uploadFile",
        //后台接口
        filePath: state.avatarUrl,
        // 上传图片 url
        name: "file",
        // formData: this.formData,
        header: {
          "content-type": "multipart/form-data"
        },
        // header 值
        success: (res) => {
          console.log("成功上传文件");
          const responseData = JSON.parse(res.data);
          user.data.picData = responseData.data.picData;
          state.avatarUrl = `data:image/jpeg;base64,${user.data.picData}`;
          user.data.picUrl = state.avatarUrl;
        },
        fail: (res) => {
          console.log("文件上传失败");
        }
      });
    };
    const toHome = () => {
      console.log(user.data.ifUpdate);
      if (user.data.ifUpdate == 2) {
        common_vendor.index.redirectTo({
          url: "../../pages/Nav/Nav"
        });
      } else if (user.data.ifUpdate == 3) {
        common_vendor.index.redirectTo({
          url: "../../pages/index/Time"
        });
      }
    };
    const toIndex = () => {
      common_vendor.index.redirectTo({
        url: "../../pages/index/Time"
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
      user.data.userName = null;
      state.showClearIcon1 = false;
    };
    const sign = () => {
      user.data.userPassword = "";
      user.data.userCode = "";
      common_vendor.index.showLoading({
        title: "保存中..."
      });
      if (user.data.userName == "") {
        common_vendor.index.showToast({
          icon: "none",
          title: "请输入名字"
        });
      } else {
        common_vendor.index.request({
          url: url + "/user/sign",
          method: "POST",
          data: {
            userEmail: user.data.userEmail,
            userName: user.data.userName,
            userPassword: user.data.userPassword,
            userCode: user.data.userCode,
            ifUpdate: user.data.ifUpdate,
            picUrl: user.data.picUrl
          },
          success: (res) => {
            console.log(user.data.userInfo);
            user.data.userInfo[1].userdatapicUrl = user.data.picUrl;
            user.data.userInfo[1].userdatauserName = user.data.userName;
            common_vendor.index.hideLoading();
            if (res.data.code != null) {
              if (user.data.picUrl == "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0") {
                user.data.picUrl = "/static/Avatar.png";
              }
              common_vendor.index.setStorage({
                key: "userInfo",
                data: user.data.userInfo,
                success: () => {
                  console.log("success");
                }
              });
              common_vendor.index.redirectTo({
                url: "../../pages/index/Time"
              });
            }
          }
        });
        if (user.data.ifUpdate == 2) {
          tag.data.tagHour = 1;
          tag.data.tagMinute = 30;
          time.data.remainingTime = tag.data.tagHour * 3600 + tag.data.tagMinute * 60 + tag.data.tagSecond;
        }
      }
    };
    common_vendor.ref(0);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$2,
        b: common_vendor.o(toHome),
        c: common_vendor.unref(user).data.ifUpdate == 2
      }, common_vendor.unref(user).data.ifUpdate == 2 ? {} : {}, {
        d: common_vendor.unref(user).data.ifUpdate == 2
      }, common_vendor.unref(user).data.ifUpdate == 2 ? {} : {}, {
        e: common_vendor.unref(user).data.ifUpdate == 2
      }, common_vendor.unref(user).data.ifUpdate == 2 ? {
        f: common_vendor.o(toHome)
      } : {}, {
        g: common_vendor.unref(user).data.ifUpdate == 2
      }, common_vendor.unref(user).data.ifUpdate == 2 ? {} : {}, {
        h: common_vendor.unref(user).data.ifUpdate == 3
      }, common_vendor.unref(user).data.ifUpdate == 3 ? {} : {}, {
        i: common_vendor.unref(user).data.ifUpdate == 3
      }, common_vendor.unref(user).data.ifUpdate == 3 ? {} : {}, {
        j: common_vendor.unref(user).data.ifUpdate == 3
      }, common_vendor.unref(user).data.ifUpdate == 3 ? {
        k: common_vendor.t(common_vendor.unref(user).data.userName),
        l: common_vendor.o(toIndex)
      } : {}, {
        m: common_vendor.unref(user).data.ifUpdate == 3
      }, common_vendor.unref(user).data.ifUpdate == 3 ? {} : {}, {
        n: state.avatarUrl,
        o: common_vendor.o(onChooseAvatar),
        p: common_vendor.o([($event) => common_vendor.unref(user).data.userName = $event.detail.value, clearInput1]),
        q: common_vendor.o(onNickName),
        r: common_vendor.unref(user).data.userName,
        s: state.showClearIcon1
      }, state.showClearIcon1 ? {
        t: common_assets._imports_2$3,
        v: common_vendor.o(clearIcon1)
      } : {}, {
        w: common_vendor.o(sign)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/uni-app/clock/pages/Wx/Wx.vue"]]);
wx.createPage(MiniProgramPage);
