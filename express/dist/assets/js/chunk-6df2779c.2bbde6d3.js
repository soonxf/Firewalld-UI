(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6df2779c"],{1587:function(t,e,n){"use strict";n.r(e);n("8f25");var o,i,c={name:"global-query-project-popover",props:{name:{type:String,default:""}},render:function(){var t=this,e=arguments[0];return e("el-popover",{attrs:{placement:"left",width:"220","popper-class":"global-query-project-popover"},model:{value:t.visible,callback:function(e){t.visible=e}}},[e("div",{class:"g-q-p-p-text"},[e("i",{class:"el-icon-question",style:"color: rgb(255, 153, 0);"}),"搜索项目 ",e("span",{class:"g-q-p-p-t-ip"},[" ",this.name])," ?"]),e("div",{class:"g-q-p-p-button"},[e("el-button",{attrs:{type:"text"},on:{click:function(){return t.visible=!1}}},["取消"]),e("el-button",{attrs:{type:"primary"},on:{click:function(){return t.confirm()}}},["确定"])]),e("template",{slot:"reference"},[this.$scopedSlots.default()])])},data:function(){return{visible:!1,options:[],projectName:""}},created:function(){},methods:{confirm:function(){this.$emit("confirm"),this.visible=!1}}},r=c,s=(n("affe"),n("3427")),l=Object(s["a"])(r,o,i,!1,null,"8399fe54",null);e["default"]=l.exports},"8fd0":function(t,e,n){},affe:function(t,e,n){"use strict";n("8fd0")}}]);