(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fade33b4","chunk-5ab016a6"],{"20a3":function(e,t,r){"use strict";r.r(t);var n,s,a=r("0e92"),c=r("8f61"),o=r("2178"),i=r("5825"),l=r.n(i),u=(r("d61a"),r("376b"),r("1752"),r("ebe5"),r("6416"),r("839f"),r("365c")),f=r("6912"),p=r("74bf"),d={name:"register-dialog",props:{visible:{type:Boolean,default:!1}},render:function(){var e=this,t=arguments[0];return t("el-dialog",{class:"login-register-dialog",attrs:{visible:this.visible,width:"32%","show-close":!1,placement:"bottom",center:!0},on:{close:function(){return e.cancelClick()},open:function(){return e.open()}}},[t("div",{slot:"title"},["注册用户"]),t("el-form",l()([{},{props:{model:this.form}},{attrs:{rules:this.rules,"label-position":"top"},ref:"registerForm"}]),[t("el-form-item",{attrs:{prop:"username"}},[t("el-input",{ref:"register-username",attrs:{clearable:!0,disabled:this.loading,type:"text",placeholder:"用户名"},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)}}},[t("i",{slot:"prepend",class:"el-icon-s-custom"})])]),t("el-form-item",{attrs:{prop:"password"}},[t("el-input",{attrs:{clearable:!0,"show-password":!0,disabled:this.loading,type:"password",placeholder:"密码"},ref:"register-password",model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)}}},[t("i",{slot:"prepend",class:"el-icon-lock"})])]),t("el-form-item",{attrs:{prop:"secret"}},[t("el-input",{attrs:{disabled:!0,clearable:!0,type:"text",placeholder:"自定义口令,用于修改密码"},ref:"register-secret",model:{value:e.form.secret,callback:function(t){e.$set(e.form,"secret",t)}}},[t("i",{slot:"prepend",class:"el-icon-chat-line-square"}),t("el-button",{attrs:{disabled:this.loading},slot:"append",on:{click:function(){return e.generateClick()}}},["生成"])])]),t("el-form-item",{attrs:{prop:"code"}},[t("el-input",{attrs:{placeholder:"不区分大小写",clearable:!0},model:{value:e.form.code,callback:function(t){e.$set(e.form,"code",t)}}},[t("div",{slot:"append",on:{click:function(){return e.uuid=p()}}},[t("global-captcha",{attrs:{uuid:this.uuid},on:{captcha:function(t){return e.captcha=t}}})])])])]),t("div",{slot:"footer",class:"dialog-footer"},[t("el-button",{on:{click:function(){return e.cancelClick()}}},["取 消"]),t("el-button",{attrs:{type:"primary"},on:{click:function(){return e.confirmClick()}}},["确 定"])])])},data:function(){return{form:{username:"",password:"",secret:"",code:"",secretCode:""},uuid:p(),captcha:{svg:"",publicKey:"",captchaSecret:""},rules:{username:[{required:!0,message:"请输入用户名",trigger:"change"},{min:4,max:10,message:"长度在 4 到 10 个字符",trigger:"change"}],password:[{required:!0,message:"请输入密码",trigger:"change"},{validator:function(e,t,r){/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/.test(t)?r():r(new Error("最少6位,至少分别1个大小写字母和数字,!@#$%^&*?其中一个"))},trigger:"change"}],secret:[{required:!0,message:"请生成自定义口令",trigger:"change"},{validator:function(e,t,r){/^[\d\w]+$/.test(t)?r():r(new Error("注册口令只能是数字或者字母"))},trigger:"change"}],code:[{required:!0,message:"请输入验证码",trigger:"change"},{validator:function(e,t,r){/^[\d]{1,2}$/.test(t)?r():r(new Error("验证码至多2个数字"))},trigger:"change"}]},loading:!1,autofocus:!1}},methods:{open:function(){this.uuid=p()},cancelClick:function(){this.$emit("cancel")},confirmClick:function(){var e=this;return Object(o["a"])(Object(a["a"])().mark((function t(){return Object(a["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$refs.registerForm.validate(function(){var t=Object(o["a"])(Object(a["a"])().mark((function t(r,n){var s,o,i,l,f;return Object(a["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if((null===(s=Object.keys(n))||void 0===s?void 0:s[0])&&e.$refs["register-".concat(Object.keys(n)[0])].focus(),!r){t.next=21;break}return e.loading=!0,e.form=Object(c["a"])(Object(c["a"])({},e.form),{},{captchaSecret:e.captcha.captchaSecret}),t.next=6,Object(u["A"])(e.form);case 6:if(o=t.sent,i=o.success,l=o.message,e.$message({showClose:!0,message:i?"注册成功":l,type:i?"success":"error"}),i||(e.uuid=p()),f=["验证码错误","验证码已被使用","验证码过期"],f.includes(l)&&e.$refs["register-code"].focus(),e.loading=!1,0!=i){t.next=16;break}return t.abrupt("return");case 16:e.form={username:"",password:"",secret:"",code:""},e.$refs.registerForm.resetFields(),e.$emit("confirm"),t.next=22;break;case 21:return t.abrupt("return",!1);case 22:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}}),t)})))()},generateClick:function(){this.form.secret=p(20),Object(f["a"])(this.form.secret)}}},m=d,g=(r("8f3b"),r("3427")),b=Object(g["a"])(m,n,s,!1,null,"6d38e63e",null);t["default"]=b.exports},5825:function(e,t,r){"use strict";function n(){return n=Object.assign?Object.assign.bind():function(e){for(var t,r=1;r<arguments.length;r++)for(var n in t=arguments[r],t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},n.apply(this,arguments)}var s=["attrs","props","domProps"],a=["class","style","directives"],c=["on","nativeOn"],o=function(e){return e.reduce((function(e,t){for(var r in t)if(e[r])if(-1!==s.indexOf(r))e[r]=n({},e[r],t[r]);else if(-1!==a.indexOf(r)){var o=e[r]instanceof Array?e[r]:[e[r]],l=t[r]instanceof Array?t[r]:[t[r]];e[r]=[].concat(o,l)}else if(-1!==c.indexOf(r))for(var u in t[r])if(e[r][u]){var f=e[r][u]instanceof Array?e[r][u]:[e[r][u]],p=t[r][u]instanceof Array?t[r][u]:[t[r][u]];e[r][u]=[].concat(f,p)}else e[r][u]=t[r][u];else if("hook"===r)for(var d in t[r])e[r][d]=e[r][d]?i(e[r][d],t[r][d]):t[r][d];else e[r]=t[r];else e[r]=t[r];return e}),{})},i=function(e,t){return function(){e&&e.apply(this,arguments),t&&t.apply(this,arguments)}};e.exports=o},"74bf":function(e,t,r){"use strict";var n="0123456789",s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",a="~!@#$%^*()_+-=[]{}|;:,./<>?";function c(e,t){e||(e=8),t||(t={});var r="",c="";!0===t?r=n+s+a:"string"==typeof t?r=t:(!1!==t.numbers&&(r+="string"==typeof t.numbers?t.numbers:n),!1!==t.letters&&(r+="string"==typeof t.letters?t.letters:s),t.specials&&(r+="string"==typeof t.specials?t.specials:a));while(e>0)e--,c+=r[Math.floor(Math.random()*r.length)];return c}e.exports=c.default=c},"8f3b":function(e,t,r){"use strict";r("bc2b")},bc2b:function(e,t,r){}}]);