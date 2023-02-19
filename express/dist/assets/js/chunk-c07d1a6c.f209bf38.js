(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c07d1a6c"],{"20a3":function(e,t,r){"use strict";r.r(t);var a,s,n=r("c7eb"),c=r("5530"),o=r("1da1"),i=r("2638"),l=r.n(i),u=(r("ac1f"),r("00b4"),r("d9e2"),r("b64b"),r("caad"),r("2532"),r("365c")),d=r("6912"),f=r("381a"),p={name:"register-dialog",props:{visible:{type:Boolean,default:!1}},render:function(){var e=this,t=arguments[0];return t("el-dialog",{class:"login-register-dialog",attrs:{visible:this.visible,width:"30%",top:"8vh","show-close":!1,placement:"bottom",center:!0},on:{close:function(){return e.close()},open:function(){return e.open()}}},[t("div",{slot:"title"},["注册用户"]),t("el-form",l()([{},{props:{model:this.form}},{attrs:{rules:this.rules,"label-position":"top"},ref:"registerForm"}]),[t("el-form-item",{attrs:{prop:"username",label:"用户名"}},[t("el-input",{ref:"register-username",attrs:{clearable:!0,disabled:this.loading,type:"text",placeholder:"用户名"},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)}}},[t("i",{slot:"prepend",class:"el-icon-s-custom"})])]),t("el-form-item",{attrs:{prop:"password",label:"密码"}},[t("el-input",{attrs:{clearable:!0,"show-password":!0,disabled:this.loading,type:"password",placeholder:"密码"},ref:"register-password",model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)}}},[t("i",{slot:"prepend",class:"el-icon-lock"})])]),t("el-form-item",{attrs:{prop:"secret",label:"口令"}},[t("el-input",{attrs:{disabled:!0,clearable:!0,type:"text",placeholder:"自定义口令,用于修改密码"},ref:"register-secret",model:{value:e.form.secret,callback:function(t){e.$set(e.form,"secret",t)}}},[t("i",{slot:"prepend",class:"el-icon-chat-line-square"}),t("el-button",{attrs:{disabled:this.loading},slot:"append",on:{click:function(){return e.generateClick()}}},["生成"])])]),t("el-form-item",{attrs:{prop:"code",label:"验证码"}},[t("el-input",{attrs:{placeholder:"不区分大小写",clearable:!0,disabled:this.loading},ref:"register-code",model:{value:e.form.code,callback:function(t){e.$set(e.form,"code",t)}}},[t("div",{slot:"append",on:{click:function(){return e.uuid=f()}}},[t("global-captcha",{attrs:{uuid:this.uuid,disabled:this.loading},on:{captcha:function(t){return e.captcha=t}}})])])])]),t("div",{slot:"footer",class:"dialog-footer"},[t("el-button",{attrs:{disabled:this.loading},on:{click:function(){return e.cancelClick()}}},["取 消"]),t("el-button",{attrs:{type:"primary",loading:this.loading},on:{click:function(){return e.confirmClick()}}},["确 定"])])])},data:function(){return{form:{username:"",password:"",secret:"",code:"",secretCode:""},uuid:f(),captcha:{svg:"",publicKey:"",captchaSecret:""},rules:{username:[{required:!0,message:"请输入用户名",trigger:"change"},{min:4,max:10,message:"长度在 4 到 10 个字符",trigger:"change"}],password:[{required:!0,message:"请输入密码",trigger:"change"},{validator:function(e,t,r){/^\S*(?=\S{8,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/.test(t)?r():r(new Error("最少8位和分别1个大小写字母数字,!@#$%^&*?其中一个"))},trigger:"change"}],secret:[{required:!0,message:"请生成自定义口令",trigger:"change"},{validator:function(e,t,r){/^[\d\w]+$/.test(t)?r():r(new Error("注册口令只能是数字或者字母"))},trigger:"change"}],code:[{required:!0,message:"请输入验证码",trigger:"change"},{validator:function(e,t,r){/^[\d]{1,2}$/.test(t)?r():r(new Error("验证码至多2个数字"))},trigger:"change"}]},loading:!1,autofocus:!1}},methods:{open:function(){this.uuid=f()},close:function(){this.loading=!1,this.$emit("close")},cancelClick:function(){this.$emit("cancel")},confirmClick:function(){var e=this;return Object(o["a"])(Object(n["a"])().mark((function t(){return Object(n["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$refs.registerForm.validate(function(){var t=Object(o["a"])(Object(n["a"])().mark((function t(r,a){var s,o,i,l,d;return Object(n["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if((null===(s=Object.keys(a))||void 0===s?void 0:s[0])&&e.$refs["register-".concat(Object.keys(a)[0])].focus(),!r){t.next=21;break}return e.loading=!0,e.form=Object(c["a"])(Object(c["a"])({},e.form),{},{captchaSecret:e.captcha.captchaSecret}),t.next=6,Object(u["E"])(e.form);case 6:if(o=t.sent,i=o.success,l=o.message,e.$message({showClose:!0,message:i?"注册成功":l,type:i?"success":"error"}),i||(e.uuid=f()),d=["验证码错误","验证码已被使用","验证码过期"],d.includes(l)&&e.$refs["register-code"].focus(),e.loading=!1,0!=i){t.next=16;break}return t.abrupt("return");case 16:e.form={username:"",password:"",secret:"",code:""},e.$refs.registerForm.resetFields(),e.$emit("confirm"),t.next=22;break;case 21:return t.abrupt("return",!1);case 22:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}}),t)})))()},generateClick:function(){this.form.secret=f(20),Object(d["b"])(this.form.secret)}}},g=p,m=(r("cdd7"),r("2877")),b=Object(m["a"])(g,a,s,!1,null,"67236963",null);t["default"]=b.exports},2638:function(e,t,r){"use strict";function a(){return a=Object.assign?Object.assign.bind():function(e){for(var t,r=1;r<arguments.length;r++)for(var a in t=arguments[r],t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},a.apply(this,arguments)}var s=["attrs","props","domProps"],n=["class","style","directives"],c=["on","nativeOn"],o=function(e){return e.reduce((function(e,t){for(var r in t)if(e[r])if(-1!==s.indexOf(r))e[r]=a({},e[r],t[r]);else if(-1!==n.indexOf(r)){var o=e[r]instanceof Array?e[r]:[e[r]],l=t[r]instanceof Array?t[r]:[t[r]];e[r]=[].concat(o,l)}else if(-1!==c.indexOf(r))for(var u in t[r])if(e[r][u]){var d=e[r][u]instanceof Array?e[r][u]:[e[r][u]],f=t[r][u]instanceof Array?t[r][u]:[t[r][u]];e[r][u]=[].concat(d,f)}else e[r][u]=t[r][u];else if("hook"===r)for(var p in t[r])e[r][p]=e[r][p]?i(e[r][p],t[r][p]):t[r][p];else e[r]=t[r];else e[r]=t[r];return e}),{})},i=function(e,t){return function(){e&&e.apply(this,arguments),t&&t.apply(this,arguments)}};e.exports=o},b188:function(e,t,r){},cdd7:function(e,t,r){"use strict";r("b188")}}]);