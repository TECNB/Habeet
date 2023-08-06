"use strict";const a=require("../../common/vendor.js"),t=require("../../common/assets.js"),e=require("../../store/user.js"),d=require("../../store/time.js"),r=require("../../store/tag.js"),i=require("../../store/target.js"),s={__name:"Nav",setup(s){const o=a.inject("url"),g=e.useUserStore(),u=d.useTimeStore(),n=r.useTagStore(),m=i.useTargetStore(),l=a.reactive({currentswiper:0,targetNoTime:[],targetWithTime:[],targetCompleted:[],targetExpire:[],ifshowButton:!0,ifshowTargetTaskNull0:!1,ifshowTargetTaskNull1:!1,ifshowTargetTaskPAT:!1,ifshowTargetTaskPATDelete:!0,index:0}),c=()=>{a.index.showLoading({title:"微信登录中..."}),a.index.login({provider:"weixin",success:t=>{g.data.code=t.code,a.index.request({url:o+"/user/wxLogin",method:"POST",data:g.data.code,success:t=>{g.data.userEmail=t.data.data.openId,g.data.userPassword="Wx",g.data.userInfo.push({ifLogin:!0}),a.index.request({url:o+"/user/home",method:"POST",data:g.data.userEmail,success:t=>{null!=t.data.code?(a.index.request({url:o+"/user/login",method:"POST",data:{userEmail:g.data.userEmail,userPassword:g.data.userPassword},success:a=>{g.data.userPassword="",null!=a.data.code&&(g.data.point=a.data.data.point,g.data.completeTarget=a.data.data.completeTarget,g.data.userName=a.data.data.userName,g.data.picUrl=a.data.data.picUrl,g.data.userInfo.push({userdatauserEmail:g.data.userEmail,userdatapoint:g.data.point,userdatacompleteTarget:g.data.completeTarget,userdatauserName:g.data.userName,userdatapicUrl:g.data.picUrl}))}}),a.index.request({url:o+"/tag/get",method:"POST",data:g.data.userEmail,success:a=>{console.log(a),n.data.tagName=a.data.data[0].tagName,n.data.tagDescribe=a.data.data[0].tagDescribe,n.data.tagPoint=a.data.data[0].tagPoint,n.data.tagHour=a.data.data[0].tagHour,n.data.tagMinute=a.data.data[0].tagMinute,g.data.userInfo.push({tagdatatagName:n.data.tagName,tagdatatagDescribe:n.data.tagDescribe,tagdatatagPoint:n.data.tagPoint,tagdatatagHour:n.data.tagHour,tagdatatagMinute:n.data.tagMinute}),u.data.remainingTime=3600*n.data.tagHour+60*n.data.tagMinute+n.data.tagSecond}}),a.index.request({url:o+"/target/get",method:"POST",data:{userEmail:g.data.userEmail,ifTargetUpdate:1},success:t=>{m.data.deadlineDate=[];for(let a=0;a<t.data.data.length;a++)if(0==t.data.data[a].status)l.targetNoTime.push({targetName:t.data.data[a].targetName,targetDescribe:t.data.data[a].targetDescribe,targetPoint:t.data.data[a].targetPoint,deadline:t.data.data[a].deadline,targetId:t.data.data[a].targetId});else if(1==t.data.data[a].status){let e=new Date(t.data.data[a].deadline);m.data.deadlineDate.includes(e)||m.data.deadlineDate.push(e),l.targetWithTime.push({targetName:t.data.data[a].targetName,targetDescribe:t.data.data[a].targetDescribe,targetPoint:t.data.data[a].targetPoint,deadline:t.data.data[a].deadline,targetId:t.data.data[a].targetId})}g.data.userInfo.push({statetargetNoTime:l.targetNoTime,statetargetWithTime:l.targetWithTime,targetdatadeadlineDate:m.data.deadlineDate}),a.index.setStorage({key:"userInfo",data:g.data.userInfo}),a.index.hideLoading(),a.index.redirectTo({url:"../../pages/index/Time"})}})):(a.index.redirectTo({url:"../../pages/Wx/Wx"}),g.data.ifUpdate=2)}})}})}})},p=()=>{a.index.showToast({icon:"none",title:"功能开发中"})},T=()=>{a.index.redirectTo({url:"../../pages/Home/Home"})},h=()=>{a.index.redirectTo({url:"../../pages/UserAgreement/UserAgreement"})},x=()=>{a.index.redirectTo({url:"../../pages/PrivacyPolicy/PrivacyPolicy"})};return a.onMounted((()=>{g.data.userEmail="",a.index.getStorage({key:"userInfo",success:t=>{g.data.userInfo=t.data,1==g.data.userInfo[0].ifLogin&&(g.data.completeTarget=t.data[1].userdatacompleteTarget,g.data.picUrl=t.data[1].userdatapicUrl,g.data.point=t.data[1].userdatapoint,g.data.userEmail=t.data[1].userdatauserEmail,g.data.userName=t.data[1].userdatauserName,n.data.tagDescribe=t.data[2].tagdatatagDescribe,n.data.tagHour=t.data[2].tagdatatagHour,n.data.tagMinute=t.data[2].tagdatatagMinute,n.data.tagName=t.data[2].tagdatatagName,n.data.tagPoint=t.data[2].tagdatatagPoint,l.targetNoTime=t.data[3].statetargetNoTime,l.targetWithTime=t.data[3].statetargetWithTime,m.data.deadlineDate=t.data[3].targetdatadeadlineDate,a.index.redirectTo({url:"../../pages/index/Time"}))}})})),(e,d)=>({a:t._imports_0$1,b:t._imports_1$1,c:t._imports_2$1,d:t._imports_3,e:a.o(((...a)=>e.changeswiper&&e.changeswiper(...a))),f:l.currentswiper,g:t._imports_2$2,h:a.o(T),i:t._imports_5,j:a.o(p),k:t._imports_6,l:a.o(c),m:a.o(h),n:a.o(x)})}};wx.createPage(s);
