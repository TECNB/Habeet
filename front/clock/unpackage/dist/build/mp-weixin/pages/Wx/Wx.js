"use strict";const a=require("../../common/vendor.js"),e=require("../../common/assets.js"),t=require("../../store/user.js"),r=require("../../store/time.js"),d=require("../../store/tag.js"),i={__name:"Wx",setup(i){const s=a.inject("url"),o=t.useUserStore(),u=r.useTimeStore(),n=d.useTagStore();3!=o.data.ifUpdate&&(o.data.picUrl="https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0");const l=a.reactive({userConfirm:"",flag:!1,countdown:0,showClearIcon1:!1,showClearIcon2:!1,password:"password",eye:"eye",avatarUrl:o.data.picUrl}),c=a=>{l.inputClearValue1=a.detail.value,o.data.userName=l.inputClearValue1},f=e=>{l.avatarUrl=e.detail.avatarUrl,console.log(l.avatarUrl),a.index.uploadFile({url:s+"/user/uploadFile",filePath:l.avatarUrl,name:"file",header:{"content-type":"multipart/form-data"},success:a=>{console.log("成功上传文件");const e=JSON.parse(a.data);o.data.picData=e.data.picData,l.avatarUrl=`data:image/jpeg;base64,${o.data.picData}`,o.data.picUrl=l.avatarUrl},fail:a=>{console.log("文件上传失败")}})},p=()=>{console.log(o.data.ifUpdate),2==o.data.ifUpdate?a.index.redirectTo({url:"../../pages/Nav/Nav"}):3==o.data.ifUpdate&&a.index.redirectTo({url:"../../pages/index/Time"})},m=()=>{a.index.redirectTo({url:"../../pages/index/Time"})},U=a=>{l.inputClearValue1=a.detail.value,a.detail.value.length>0?l.showClearIcon1=!0:l.showClearIcon1=!1},g=()=>{o.data.userName=null,l.showClearIcon1=!1},w=()=>{o.data.userPassword="",o.data.userCode="",a.index.showLoading({title:"保存中..."}),""==o.data.userName?a.index.showToast({icon:"none",title:"请输入名字"}):(a.index.request({url:s+"/user/sign",method:"POST",data:{userEmail:o.data.userEmail,userName:o.data.userName,userPassword:o.data.userPassword,userCode:o.data.userCode,ifUpdate:o.data.ifUpdate,picUrl:o.data.picUrl},success:e=>{console.log(o.data.userInfo),o.data.userInfo[1].userdatapicUrl=o.data.picUrl,o.data.userInfo[1].userdatauserName=o.data.userName,a.index.hideLoading(),null!=e.data.code&&("https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0"==o.data.picUrl&&(o.data.picUrl="/static/Avatar.png"),a.index.setStorage({key:"userInfo",data:o.data.userInfo,success:()=>{console.log("success")}}),a.index.redirectTo({url:"../../pages/index/Time"}))}}),2==o.data.ifUpdate&&(n.data.tagHour=1,n.data.tagMinute=30,u.data.remainingTime=3600*n.data.tagHour+60*n.data.tagMinute+n.data.tagSecond))};return a.ref(0),(t,r)=>a.e({a:e._imports_0$2,b:a.o(p),c:2==a.unref(o).data.ifUpdate},(a.unref(o).data.ifUpdate,{}),{d:2==a.unref(o).data.ifUpdate},(a.unref(o).data.ifUpdate,{}),{e:2==a.unref(o).data.ifUpdate},2==a.unref(o).data.ifUpdate?{f:a.o(p)}:{},{g:2==a.unref(o).data.ifUpdate},(a.unref(o).data.ifUpdate,{}),{h:3==a.unref(o).data.ifUpdate},(a.unref(o).data.ifUpdate,{}),{i:3==a.unref(o).data.ifUpdate},(a.unref(o).data.ifUpdate,{}),{j:3==a.unref(o).data.ifUpdate},3==a.unref(o).data.ifUpdate?{k:a.t(a.unref(o).data.userName),l:a.o(m)}:{},{m:3==a.unref(o).data.ifUpdate},(a.unref(o).data.ifUpdate,{}),{n:l.avatarUrl,o:a.o(f),p:a.o([e=>a.unref(o).data.userName=e.detail.value,U]),q:a.o(c),r:a.unref(o).data.userName,s:l.showClearIcon1},l.showClearIcon1?{t:e._imports_2$3,v:a.o(g)}:{},{w:a.o(w)})}};wx.createPage(i);