(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-347fedfa"],{1587:function(e,t,n){"use strict";n.r(t);n("b0c0");var o,i,c={name:"global-query-project-popover",props:{name:{type:String,default:""}},render:function(){var e=this,t=arguments[0];return t("el-popover",{attrs:{placement:"left",width:"220","popper-class":"global-query-project-popover"},model:{value:e.visible,callback:function(t){e.visible=t}}},[t("div",{class:"g-q-p-p-text"},[t("i",{class:"el-icon-question",style:"color: rgb(255, 153, 0);"}),"搜索项目 ",t("span",{class:"g-q-p-p-t-ip"},[" ",this.name])," ?"]),t("div",{class:"g-q-p-p-button"},[t("el-button",{attrs:{type:"text"},on:{click:function(){return e.visible=!1}}},["取消"]),t("el-button",{attrs:{type:"primary"},on:{click:function(){return e.confirm()}}},["确定"])]),t("template",{slot:"reference"},[this.$scopedSlots.default()])])},data:function(){return{visible:!1,options:[],projectName:""}},created:function(){},methods:{confirm:function(){this.$emit("confirm"),this.visible=!1}}},r=c,s=(n("affe"),n("2877")),l=Object(s["a"])(r,o,i,!1,null,"8399fe54",null);t["default"]=l.exports},affe:function(e,t,n){"use strict";n("ee01")},ee01:function(e,t,n){}}]);