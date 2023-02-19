(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f1ac7ba6"],{3035:function(e,l,t){},"93b1":function(e,l,t){"use strict";t("3035")},aee3:function(e,l,t){"use strict";t.r(l);var i,a,s=t("c7eb"),o=t("5530"),n=t("2909"),c=t("1da1"),d=(t("d81d"),t("99af"),t("13d5"),t("d3b7"),t("4de4"),t("ac1f"),t("1276"),t("00b4"),t("caad"),t("2532"),t("365c")),r={name:"global-rule-dialog",props:{visible:{type:Boolean,default:!1},unblocked:{type:Boolean,default:!1}},render:function(){var e=this,l=arguments[0];return l("el-dialog",{class:"global-rule-dialog",attrs:{visible:this.visible,width:"35%","show-close":!1,placement:"bottom",center:!0},on:{close:function(){return e.close()}}},[l("div",{slot:"title"},["新建",this.unblockedCom,"规则"]),l("div",{class:"g-r-container"},[l("div",{class:"g-r-c-checkbox"},[this.unblocked?null:l("el-checkbox",{attrs:{border:!0,disabled:this.loading},model:{value:e.rule.abroadDisabled,callback:function(l){e.$set(e.rule,"abroadDisabled",l)}}},["禁止境外"]),this.unblocked?null:l("el-checkbox",{attrs:{border:!0,disabled:this.loading},model:{value:e.rule.limitDisabled,callback:function(l){e.$set(e.rule,"limitDisabled",l)}}},["频率检测"]),l("el-checkbox",{attrs:{border:!0,disabled:this.loading},model:{value:e.rule.portsDisabled,callback:function(l){e.$set(e.rule,"portsDisabled",l)}}},["端口检测"]),l("el-checkbox",{attrs:{border:!0,disabled:this.loading},model:{value:e.rule.ipsDisabled,callback:function(l){e.$set(e.rule,"ipsDisabled",l)}}},["IP 检测"]),l("el-checkbox",{attrs:{border:!0,disabled:this.loading},model:{value:e.rule.sitesDisabled,callback:function(l){e.$set(e.rule,"sitesDisabled",l)}}},["关键词检测"]),this.unblocked?null:l("el-checkbox",{attrs:{border:!0,disabled:this.loading},model:{value:e.rule.shieldTimeDisabled,callback:function(l){e.$set(e.rule,"shieldTimeDisabled",l)}}},["屏蔽时长"])]),l("div",{class:"g-r-c-item"},[l("el-select",{attrs:{disabled:this.loading,placeholder:"规则状态","popper-class":"global-project-select",loading:this.loading},on:{change:function(){return e.$emit("change",""==e.projectName?"":e.projectName)}},model:{value:e.rule.effective,callback:function(l){e.$set(e.rule,"effective",l)}}},[this.ruleEffectiveOptions.map((function(e,t){return l("el-option",{key:e.label,attrs:{label:e.label,value:e.value}})}))])]),this.rule.limitDisabled&&0==this.unblocked?l("div",{class:"g-r-c-traffic"},[l("el-select",{attrs:{disabled:this.loading,placeholder:"时间范围",clearable:!0},model:{value:e.rule.limitShield,callback:function(l){e.$set(e.rule,"limitShield",l)}}},[this.limitOptions.map((function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))]),l("el-input-number",{attrs:{min:1,max:9999,clearable:!0,disabled:this.loading,label:"访问总量/单位次"},model:{value:e.rule.limitTotal,callback:function(l){e.$set(e.rule,"limitTotal",l)}}})]):null,this.rule.portsDisabled?l("div",{class:"g-r-c-item"},[l("global-rule-project-select",{attrs:{multiple:!0,disabled:this.loading},on:{change:function(l){return e.projectSelectChange(l)}}})]):null,this.rule.ipsDisabled?l("div",{class:"g-r-c-item"},[l("el-input",{attrs:{disabled:this.loading,type:"textarea",rows:2,clearable:!0,maxlength:200,placeholder:"根据 IP ".concat(this.unblockedCom,",不填会").concat(this.unblockedCom,"所有 IP")},model:{value:e.rule.ips,callback:function(l){e.$set(e.rule,"ips",l)}}},[l("template",{slot:"append"},[l("el-button",{attrs:{disabled:this.loading,type:"primary",icon:"el-icon-plus"}})])])]):null,this.rule.sitesDisabled?l("div",{class:"g-r-c-item"},[l("el-input",{attrs:{disabled:this.loading,type:"textarea",rows:3,clearable:!0,maxlength:200,placeholder:"根据地区关键词".concat(this.unblockedCom,",不填会").concat(this.unblockedCom,"所有地区,多个关键词换行间隔,如: 北京 ,检测到 北京 的 IP 就会被").concat(this.unblockedCom)},model:{value:e.rule.sites,callback:function(l){e.$set(e.rule,"sites",l)}}},[l("template",{slot:"append"},[l("el-button",{attrs:{disabled:this.loading,type:"primary",icon:"el-icon-plus"}})])])]):null,this.rule.shieldTimeDisabled&&0==this.unblocked?l("div",{class:"g-r-c-item"},[l("el-select",{attrs:{disabled:this.loading,placeholder:"屏蔽时长",clearable:!0},model:{value:e.rule.shieldTime,callback:function(l){e.$set(e.rule,"shieldTime",l)}}},[this.shieldTimeOptions.map((function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))])]):null,l("div",{class:"g-r-c-item"},[l("el-alert",{attrs:{title:"注意:".concat(this.unblocked?"全部符合才会被允许":"符合其中一项就会被屏蔽"),type:"success"}})])]),l("div",{slot:"footer",class:"dialog-footer"},[l("el-button",{attrs:{disabled:this.loading},on:{click:function(){return e.$emit("close")}}},["取 消"]),l("el-button",{attrs:{type:"primary",loading:this.loading},on:{click:function(){return e.confirm()}}},["确 定"])])])},computed:{unblockedCom:function(){return this.unblocked?"允许":"屏蔽"}},data:function(){return{ruleEffectiveOptions:[{label:"新建的规则立即生效",value:!0},{label:"新建的规则手动生效",value:!1}],limitOptions:[{value:30,label:"30分钟"},{value:60,label:"60分钟"},{value:90,label:"90分钟"},{value:120,label:"120分钟"},{value:150,label:"150分钟"},{value:180,label:"180分钟"}],shieldTimeOptions:[{value:600,label:"10 分钟"},{value:3600,label:"1 小时"},{value:10800,label:"3 小时"},{value:21600,label:"6 小时"},{value:86400,label:"1 天"},{value:172800,label:"2 天"},{value:259200,label:"3 天"},{value:604800,label:"7 天"},{value:2592e3,label:"30 天"},{value:31536e3,label:"365 天"}],rule:{ips:"",sites:"",ports:"",limitShield:30,limitTotal:100,shieldTime:600,abroadDisabled:!1,limitDisabled:!1,ipsDisabled:!1,portsDisabled:!1,sitesDisabled:!1,shieldTimeDisabled:!1,effective:!0},loading:!1}},methods:{close:function(){this.loading=!1,this.$emit("close")},projectSelectChange:function(e){this.rule.ports=e},confirm:function(){var e=this;return Object(c["a"])(Object(s["a"])().mark((function l(){var t,i,a,c,r,u,b,h,p,m,v,f,g;return Object(s["a"])().wrap((function(l){while(1)switch(l.prev=l.next){case 0:return e.loading=!0,h=null!==(t=null===(i=e.rule.ips)||void 0===i?void 0:i.split(/\n{1,}/g).filter((function(e){return/^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$/.test(e)})).reduce((function(e,l){return e.includes(l)?e:e=[].concat(Object(n["a"])(e),[l])}),[]))&&void 0!==t?t:[],p=null!==(a=null===(c=e.rule.sites)||void 0===c?void 0:c.split(/\n{1,}/g).filter((function(e){return""!=e})))&&void 0!==a?a:[],m=null!==(r=null===(u=(b=e.rule.ports).filter)||void 0===u?void 0:u.call(b,(function(e){return""!=e})))&&void 0!==r?r:[],l.next=6,Object(d["b"])(Object(o["a"])(Object(o["a"])({},e.rule),{},{ports:m,ips:h,sites:p,unblocked:e.unblocked}));case 6:v=l.sent,f=v.success,g=v.data,e.loading=!1,f?(e.$emit("confirm"),e.rule={ips:"",sites:"",ports:"",limitShield:30,limitTotal:100,shieldTime:259200,abroadDisabled:!0,limitDisabled:!1,ipsDisabled:!1,portsDisabled:!1,sitesDisabled:!1,shieldTimeDisabled:!1,effective:!0}):e.$message({showClose:!0,message:g.message,type:"error"});case 11:case"end":return l.stop()}}),l)})))()}}},u=r,b=(t("93b1"),t("2877")),h=Object(b["a"])(u,i,a,!1,null,"6359af44",null);l["default"]=h.exports}}]);