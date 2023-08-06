"use strict";const a=require("../../common/vendor.js"),t=require("../../common/assets.js"),e=require("../../store/target.js"),i=require("../../store/user.js"),r=require("../../store/time.js"),g=require("../../store/tag.js");if(!Array){a.resolveComponent("uni-transition")()}Math;const o={__name:"tag-menu",setup(o){const d=a.inject("url"),s=i.useUserStore();e.useTargetStore();const n=r.useTimeStore(),u=g.useTagStore(),m=a.reactive({tagWithTime:[],hours:0,minutes:0,seconds:0});a.onMounted(a.index.request({url:d+"/tag/get",method:"POST",data:s.data.userEmail,success:a=>{console.log(a),u.data.tagName=a.data.data[0].tagName,u.data.tagDescribe=a.data.data[0].tagDescribe,u.data.tagPoint=a.data.data[0].tagPoint,u.data.tagHour=a.data.data[0].tagHour,u.data.tagMinute=a.data.data[0].tagMinute;for(let t=0;t<a.data.data.length;t++)0==t?m.tagWithTime.push({tagName:a.data.data[t].tagName,tagDescribe:a.data.data[t].tagDescribe,tagHour:a.data.data[t].tagHour,tagMinute:a.data.data[t].tagMinute,tagPoint:a.data.data[t].tagPoint,className:"tagMenuListD1"}):m.tagWithTime.push({tagName:a.data.data[t].tagName,tagDescribe:a.data.data[t].tagDescribe,tagHour:a.data.data[t].tagHour,tagMinute:a.data.data[t].tagMinute,tagPoint:a.data.data[t].tagPoint,className:"tagMenuListD"})}}));const c=a=>String(a).padStart(2,"0"),h=()=>{u.data.ifshowTagMenu=!u.data.ifshowTagMenu,n.data.remainingTime=3600*u.data.tagHour+60*u.data.tagMinute+u.data.tagSecond,n.data.formattedTime=a.computed((()=>(m.hours=Math.floor(n.data.remainingTime/3600),m.minutes=Math.floor(n.data.remainingTime%3600/60),m.seconds=Math.floor(n.data.remainingTime%60),`${c(m.hours)}:${c(m.minutes)}:${c(m.seconds)}`)))};return(e,i)=>({a:a.f(m.tagWithTime,((t,e,i)=>({a:a.t(t.tagName),b:a.n(t.className),c:e,d:a.o((t=>(t=>{m.tagWithTime.forEach((a=>{a.className="tagMenuListD"})),m.tagWithTime[t].className="tagMenuListD1",n.data.ifstart=!1,u.data.tagName=m.tagWithTime[t].tagName,u.data.tagDescribe=m.tagWithTime[t].tagDescribe,u.data.tagPoint=m.tagWithTime[t].tagPoint,u.data.tagHour=m.tagWithTime[t].tagHour,u.data.tagMinute=m.tagWithTime[t].tagMinute,n.data.formattedTime=a.computed((()=>(m.hours=Math.floor(n.data.remainingTime/3600),m.minutes=Math.floor(n.data.remainingTime%3600/60),m.seconds=Math.floor(n.data.remainingTime%60),`${c(u.data.tagHour)}:${c(u.data.tagMinute)}:${c(0)}`)))})(e)),e)}))),b:t._imports_0$12,c:a.t(a.unref(u).data.tagHour),d:a.t(a.unref(u).data.tagMinute),e:a.t(a.unref(u).data.tagDescribe),f:a.o(h),g:a.p({"mode-class":"fade",show:a.unref(u).data.ifshowTagMenu,duration:"300"})})}};wx.createComponent(o);