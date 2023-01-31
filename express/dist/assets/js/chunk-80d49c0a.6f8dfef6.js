(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-80d49c0a","chunk-0f3ece5e","chunk-77e34521","chunk-31e69dbd","chunk-6477d87a","chunk-6477d87a","chunk-5dc81b80","chunk-1c647b78"],{"000f":function(e,t,r){"use strict";r("f5d2")},"0d1e":function(e,t,r){"use strict";r("3b4a")},"20a3":function(e,t,r){"use strict";r.r(t);var n,a,s=r("0e92"),o=r("8f61"),c=r("2178"),i=r("5825"),l=r.n(i),u=(r("d61a"),r("376b"),r("1752"),r("ebe5"),r("6416"),r("839f"),r("365c")),d=r("6912"),f=r("74bf"),p={name:"register-dialog",props:{visible:{type:Boolean,default:!1}},render:function(){var e=this,t=arguments[0];return t("el-dialog",{class:"login-register-dialog",attrs:{visible:this.visible,width:"32%","show-close":!1,placement:"bottom",center:!0},on:{close:function(){return e.cancelClick()},open:function(){return e.open()}}},[t("div",{slot:"title"},["注册用户"]),t("el-form",l()([{},{props:{model:this.form}},{attrs:{rules:this.rules,"label-position":"top"},ref:"registerForm"}]),[t("el-form-item",{attrs:{prop:"username"}},[t("el-input",{ref:"register-username",attrs:{clearable:!0,disabled:this.loading,type:"text",placeholder:"用户名"},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)}}},[t("i",{slot:"prepend",class:"el-icon-s-custom"})])]),t("el-form-item",{attrs:{prop:"password"}},[t("el-input",{attrs:{clearable:!0,"show-password":!0,disabled:this.loading,type:"password",placeholder:"密码"},ref:"register-password",model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)}}},[t("i",{slot:"prepend",class:"el-icon-lock"})])]),t("el-form-item",{attrs:{prop:"secret"}},[t("el-input",{attrs:{disabled:!0,clearable:!0,type:"text",placeholder:"自定义口令,用于修改密码"},ref:"register-secret",model:{value:e.form.secret,callback:function(t){e.$set(e.form,"secret",t)}}},[t("i",{slot:"prepend",class:"el-icon-chat-line-square"}),t("el-button",{attrs:{disabled:this.loading},slot:"append",on:{click:function(){return e.generateClick()}}},["生成"])])]),t("el-form-item",{attrs:{prop:"code"}},[t("el-input",{attrs:{placeholder:"不区分大小写",clearable:!0},ref:"register-code",model:{value:e.form.code,callback:function(t){e.$set(e.form,"code",t)}}},[t("div",{slot:"append",on:{click:function(){return e.uuid=f()}}},[t("global-captcha",{attrs:{uuid:this.uuid},on:{captcha:function(t){return e.captcha=t}}})])])])]),t("div",{slot:"footer",class:"dialog-footer"},[t("el-button",{on:{click:function(){return e.cancelClick()}}},["取 消"]),t("el-button",{attrs:{type:"primary"},on:{click:function(){return e.confirmClick()}}},["确 定"])])])},data:function(){return{form:{username:"",password:"",secret:"",code:"",secretCode:""},uuid:f(),captcha:{svg:"",publicKey:"",captchaSecret:""},rules:{username:[{required:!0,message:"请输入用户名",trigger:"change"},{min:4,max:10,message:"长度在 4 到 10 个字符",trigger:"change"}],password:[{required:!0,message:"请输入密码",trigger:"change"},{validator:function(e,t,r){/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/.test(t)?r():r(new Error("最少6位,至少分别1个大小写字母和数字,!@#$%^&*?其中一个"))},trigger:"change"}],secret:[{required:!0,message:"请生成自定义口令",trigger:"change"},{validator:function(e,t,r){/^[\d\w]+$/.test(t)?r():r(new Error("注册口令只能是数字或者字母"))},trigger:"change"}],code:[{required:!0,message:"请输入验证码",trigger:"change"},{validator:function(e,t,r){/^[\d]{1,2}$/.test(t)?r():r(new Error("验证码至多2个数字"))},trigger:"change"}]},loading:!1,autofocus:!1}},methods:{open:function(){this.uuid=f()},cancelClick:function(){this.$emit("cancel")},confirmClick:function(){var e=this;return Object(c["a"])(Object(s["a"])().mark((function t(){return Object(s["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$refs.registerForm.validate(function(){var t=Object(c["a"])(Object(s["a"])().mark((function t(r,n){var a,c,i,l,d;return Object(s["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if((null===(a=Object.keys(n))||void 0===a?void 0:a[0])&&e.$refs["register-".concat(Object.keys(n)[0])].focus(),!r){t.next=21;break}return e.loading=!0,e.form=Object(o["a"])(Object(o["a"])({},e.form),{},{captchaSecret:e.captcha.captchaSecret}),t.next=6,Object(u["B"])(e.form);case 6:if(c=t.sent,i=c.success,l=c.message,e.$message({showClose:!0,message:i?"注册成功":l,type:i?"success":"error"}),i||(e.uuid=f()),d=["验证码错误","验证码已被使用","验证码过期"],d.includes(l)&&e.$refs["register-code"].focus(),e.loading=!1,0!=i){t.next=16;break}return t.abrupt("return");case 16:e.form={username:"",password:"",secret:"",code:""},e.$refs.registerForm.resetFields(),e.$emit("confirm"),t.next=22;break;case 21:return t.abrupt("return",!1);case 22:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}}),t)})))()},generateClick:function(){this.form.secret=f(20),Object(d["a"])(this.form.secret)}}},m=p,h=(r("000f"),r("3427")),g=Object(h["a"])(m,n,a,!1,null,"7787d94a",null);t["default"]=g.exports},2129:function(e,t,r){"use strict";r("d962")},"351e":function(e,t,r){"use strict";r.r(t);var n,a,s=r("0e92"),o=r("2178"),c=r("8f61"),i=(r("7f82"),r("9a30"),r("ebe5"),r("8f25"),r("72e2"),r("f0a4")),l=r("6912"),u={name:"menu-container",render:function(){var e=this,t=arguments[0];return t("el-menu",{attrs:{collapse:this.collapse,"default-active":this.otherMenuActive,"popper-append-to-body":!0,"collapse-transition":!1},on:{select:function(t,r){return e.select(t,r)}},ref:"menu"},[t("el-menu-item",{attrs:{index:"home-index"}},[t("i",{class:"el-icon-s-home"}),t("span",{slot:"title"},["首页"])]),t("el-submenu",{attrs:{index:"management"}},[t("template",{slot:"title"},[t("i",{class:"el-icon-s-data"}),t("span",{slot:"title"},["管理项目"])]),t("el-menu-item",{attrs:{index:"management-projects"}},[t("i",{class:"iconfont icon-xiangmu"}),t("span",["我的项目"])]),t("el-menu-item",{attrs:{index:"management-rule"}},[t("i",{class:"iconfont icon-bianmaguize"}),t("span",["已有规则"])]),t("el-menu-item",{attrs:{index:"list-blacklist"}},[t("i",{class:"iconfont icon-heimingdan"}),t("span",{slot:"title"},["屏蔽名单"])])]),t("el-submenu",{attrs:{index:"log"}},[t("template",{slot:"title"},[t("i",{class:"iconfont icon-zhuanxierizhi"}),t("span",{slot:"title"},["日志服务"])]),t("el-menu-item",{attrs:{index:"log-accessLog"}},[t("i",{class:"iconfont icon-yonghurizhi"}),t("span",["访问日志"])]),t("el-menu-item",{attrs:{index:"log-systemLog"}},[t("i",{class:"iconfont icon-rizhi"}),t("span",["系统日志"])])]),t("el-menu-item",{attrs:{index:"Settings"}},[t("i",{class:"iconfont icon-guizeshezhi"}),t("span",{slot:"title"},["系统设置"])])])},computed:Object(c["a"])({},Object(i["b"])(["otherCollapse","otherMenuActive"])),watch:{otherCollapse:{immediate:!0,handler:function(e,t){var r=this;return Object(o["a"])(Object(s["a"])().mark((function t(){return Object(s["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(l["b"])(100);case 2:r.collapse=e;case 3:case"end":return t.stop()}}),t)})))()}}},data:function(){return{collapse:!1,defaultActive:"",menu:{"home-index":"Index","management-projects":"Projects","management-rule":"Rule","log-accessLog":"AccessLog","log-systemLog":"SystemLog","list-blacklist":"Blacklist",Settings:"Settings"}}},mounted:function(){this.initMenu()},methods:Object(c["a"])(Object(c["a"])({},Object(i["c"])(["otherMutationsCollapse","otherMutationsMenuActive"])),{},{initMenu:function(){var e=this;return Object(o["a"])(Object(s["a"])().mark((function t(){return Object(s["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.collapse=e.otherCollapse,Object.keys(e.menu).forEach((function(t){return e.menu[t]==e.$route.name&&e.otherMutationsMenuActive(t)}));case 2:case"end":return t.stop()}}),t)})))()},seleteActiveuMenu:function(e){this.otherMutationsMenuActive(e),this.$router.push({name:this.menu[e]})},select:function(e,t){this.seleteActiveuMenu(e)}})},d=u,f=(r("f7f4"),r("3427")),p=Object(f["a"])(d,n,a,!1,null,"31e05c7a",null);t["default"]=p.exports},"3b4a":function(e,t,r){},"43db":function(e,t,r){},5825:function(e,t,r){"use strict";function n(){return n=Object.assign?Object.assign.bind():function(e){for(var t,r=1;r<arguments.length;r++)for(var n in t=arguments[r],t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},n.apply(this,arguments)}var a=["attrs","props","domProps"],s=["class","style","directives"],o=["on","nativeOn"],c=function(e){return e.reduce((function(e,t){for(var r in t)if(e[r])if(-1!==a.indexOf(r))e[r]=n({},e[r],t[r]);else if(-1!==s.indexOf(r)){var c=e[r]instanceof Array?e[r]:[e[r]],l=t[r]instanceof Array?t[r]:[t[r]];e[r]=[].concat(c,l)}else if(-1!==o.indexOf(r))for(var u in t[r])if(e[r][u]){var d=e[r][u]instanceof Array?e[r][u]:[e[r][u]],f=t[r][u]instanceof Array?t[r][u]:[t[r][u]];e[r][u]=[].concat(d,f)}else e[r][u]=t[r][u];else if("hook"===r)for(var p in t[r])e[r][p]=e[r][p]?i(e[r][p],t[r][p]):t[r][p];else e[r]=t[r];else e[r]=t[r];return e}),{})},i=function(e,t){return function(){e&&e.apply(this,arguments),t&&t.apply(this,arguments)}};e.exports=c},"74bf":function(e,t,r){"use strict";var n="0123456789",a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",s="~!@#$%^*()_+-=[]{}|;:,./<>?";function o(e,t){e||(e=8),t||(t={});var r="",o="";!0===t?r=n+a+s:"string"==typeof t?r=t:(!1!==t.numbers&&(r+="string"==typeof t.numbers?t.numbers:n),!1!==t.letters&&(r+="string"==typeof t.letters?t.letters:a),t.specials&&(r+="string"==typeof t.specials?t.specials:s));while(e>0)e--,o+=r[Math.floor(Math.random()*r.length)];return o}e.exports=o.default=o},"98f4":function(e,t,r){"use strict";r.r(t);var n,a,s=r("0e92"),o=r("2178"),c=r("5825"),i=r.n(c),l=(r("d2fb"),r("8f25"),r("1752"),r("365c")),u=r("6e0e"),d=r.n(u),f={name:"create-project-dialog",props:{visible:{type:Boolean,default:!1}},render:function(){var e=this,t=arguments[0];return t("el-dialog",{class:"create-project",attrs:{visible:this.visible,width:"32%","show-close":!1,placement:"bottom",center:!0},on:{open:function(){return e.open()},close:function(){return e.close()}}},[t("div",{slot:"title"},["新建项目"]),t("el-form",i()([{ref:"form"},{props:{model:this.form}},{attrs:{"label-position":"top",rules:this.rules}}]),[t("el-form-item",{attrs:{prop:"name",label:"项目名称"}},[t("el-input",{attrs:{clearable:!0,disabled:this.loading,placeholder:"项目名称"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)}}},[t("i",{slot:"prepend",class:"el-icon-s-grid"})])]),t("el-form-item",{attrs:{prop:"port",label:"绑定端口"}},[t("el-input",{attrs:{clearable:!0,disabled:this.loading,maxLength:5,max:65535,min:0,placeholder:"绑定端口"},model:{value:e.form.port,callback:function(t){e.$set(e.form,"port",t)}}},[t("i",{slot:"prepend",class:"el-icon-s-platform"})])]),t("el-form-item",{attrs:{prop:"remarks",label:"备注"}},[t("el-input",{attrs:{clearable:!0,disabled:this.loading,placeholder:"备注"},model:{value:e.form.remarks,callback:function(t){e.$set(e.form,"remarks",t)}}},[t("i",{slot:"prepend",class:"iconfont icon-remark"})])])]),t("div",{slot:"footer",class:"dialog-footer"},[t("el-button",{on:{click:function(){return e.$emit("close")}}},["取 消"]),t("el-button",{attrs:{type:"primary",loading:this.loading},on:{click:function(){return e.confirmClick()}}},["确 定"])])])},data:function(){return{loading:!1,form:{name:"",port:"",remarks:""},rules:{name:[{required:!0,message:"请输入项目名称",trigger:"blur"},{min:2,max:12,message:"长度在 2 到 12 个字符",trigger:"change"}],port:[{required:!0,message:"请输入项目端口",trigger:"blur"},{min:1,max:5,message:"长度在 1 到 5 个数字",trigger:"change"},{validator:function(e,t,r){parseInt(t)?r():r(new Error("请输入数字"))},trigger:"change"},{validator:function(e,t,r){t>65536||t<0?r(new Error("端口范围 0 - 65535")):r()},trigger:"change"}],remarks:[]}}},methods:{close:function(){d.a.unbind("enter"),this.$emit("close")},open:function(){this.onEnter()},onEnter:function(){var e=this;d.a.bind("enter",(function(t){return e.confirmClick()})),this.$once("hook:beforeDestroy",(function(){return d.a.unbind("enter")}))},confirmClick:function(){var e=this;return Object(o["a"])(Object(s["a"])().mark((function t(){return Object(s["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.loading){t.next=2;break}return t.abrupt("return");case 2:e.$refs.form.validate(function(){var t=Object(o["a"])(Object(s["a"])().mark((function t(r){var n,a,o;return Object(s["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!r){t.next=16;break}return e.loading=!0,t.next=4,Object(l["c"])(e.form);case 4:if(n=t.sent,a=n.success,o=n.message,e.$message({showClose:!0,message:a?"创建成功":o,type:a?"success":"error"}),e.loading=!1,0!=a){t.next=11;break}return t.abrupt("return");case 11:e.$emit("confirm"),e.form={name:"",port:"",remarks:""},e.$refs.form.resetFields(),t.next=17;break;case 16:return t.abrupt("return",!1);case 17:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 3:case"end":return t.stop()}}),t)})))()}}},p=f,m=(r("0d1e"),r("3427")),h=Object(m["a"])(p,n,a,!1,null,"0329d9a8",null);t["default"]=h.exports},c377:function(e,t,r){"use strict";r.r(t);var n,a,s=r("0e92"),o=r("8f61"),c=r("2178"),i=r("5825"),l=r.n(i),u=(r("d61a"),r("376b"),r("1752"),r("ebe5"),r("6416"),r("839f"),r("365c")),d=(r("6912"),r("74bf")),f={name:"update-pass-dialog",props:{visible:{type:Boolean,default:!1}},render:function(){var e=this,t=arguments[0];return t("el-dialog",{class:"login-update-password-dialog",attrs:{visible:this.visible,width:"32%","show-close":!1,center:!0},on:{open:function(){return e.open()},close:function(){return e.cancelClick()}}},[t("div",{slot:"title"},["修改密码"]),t("el-form",l()([{},{props:{model:this.form}},{attrs:{rules:this.rules,"label-position":"top"},ref:"updateForm"}]),[t("el-form-item",{attrs:{prop:"username"}},[t("el-input",{attrs:{clearable:!0,disabled:this.loading,type:"text",placeholder:"用户名"},ref:"update-username",model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)}}},[t("i",{slot:"prepend",class:"el-icon-s-custom"})])]),t("el-form-item",{attrs:{prop:"password"}},[t("el-input",{attrs:{clearable:!0,"show-password":!0,disabled:this.loading,type:"password",placeholder:"新密码"},ref:"update-password",model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)}}},[t("i",{slot:"prepend",class:"el-icon-lock"})])]),t("el-form-item",{attrs:{prop:"jwtSecret"}},[t("el-input",{attrs:{clearable:!0,"show-password":!0,disabled:this.loading,type:"password",placeholder:"当前服务器 JWT 密钥"},ref:"update-jwtSecret",model:{value:e.form.jwtSecret,callback:function(t){e.$set(e.form,"jwtSecret",t)}}},[t("i",{slot:"prepend",class:"el-icon-unlock"})])]),t("el-form-item",{attrs:{prop:"secret"}},[t("el-input",{attrs:{clearable:!0,"show-password":!0,disabled:this.loading,type:"password",placeholder:"注册时口令,丢失删库重新注册"},ref:"update-secret",model:{value:e.form.secret,callback:function(t){e.$set(e.form,"secret",t)}}},[t("i",{slot:"prepend",class:"el-icon-chat-line-square"})])]),t("el-form-item",{attrs:{prop:"code"}},[t("el-input",{attrs:{placeholder:"不区分大小写",clearable:!0},ref:"update-code",model:{value:e.form.code,callback:function(t){e.$set(e.form,"code",t)}}},[t("div",{slot:"append",on:{click:function(){return e.uuid=d()}}},[t("global-captcha",{attrs:{uuid:this.uuid},on:{captcha:function(t){return e.captcha=t}}})])])])]),t("div",{slot:"footer",class:"dialog-footer"},[t("el-button",{on:{click:function(){return e.cancelClick()}}},["取 消"]),t("el-button",{attrs:{type:"primary"},on:{click:function(){return e.confirmClick()}}},["确 定"])])])},data:function(){return{form:{username:"",password:"",secret:"",jwtSecret:"",code:"",captchaSecret:""},rules:{username:[{required:!0,message:"请输入用户名",trigger:"change"},{min:4,max:10,message:"长度在 4 到 10 个字符",trigger:"change"}],password:[{required:!0,message:"请输入密码",trigger:"change"},{validator:function(e,t,r){/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/.test(t)?r():r(new Error("最少6位,至少分别1个大小写字母和数字,!@#$%^&*?其中一个"))},trigger:"change"}],jwtSecret:[{required:!0,message:"请输入 JWT 密钥",trigger:"change"},{validator:function(e,t,r){/^[\d\w]+$/.test(t)?r():r(new Error("JWT 密钥只能是数字或者字母"))},trigger:"change"}],secret:[{required:!0,message:"请输入注册口令",trigger:"change"},{validator:function(e,t,r){/^[\d\w]+$/.test(t)?r():r(new Error("注册口令只能是数字或者字母"))},trigger:"change"}],code:[{required:!0,message:"请输入验证码",trigger:"change"},{validator:function(e,t,r){/^[\d]{1,2}$/.test(t)?r():r(new Error("验证码至多2个数字"))},trigger:"change"}]},uuid:d(),captcha:{svg:"",publicKey:"",captchaSecret:""},loading:!1,autofocus:!1}},methods:{open:function(){this.uuid=d()},cancelClick:function(){this.$emit("cancel")},confirmClick:function(){var e=this;return Object(c["a"])(Object(s["a"])().mark((function t(){return Object(s["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.loading){t.next=2;break}return t.abrupt("return");case 2:e.$refs.updateForm.validate(function(){var t=Object(c["a"])(Object(s["a"])().mark((function t(r,n){var a,c,i,l,f;return Object(s["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if((null===(a=Object.keys(n))||void 0===a?void 0:a[0])&&e.$refs["update-".concat(Object.keys(n)[0])].focus(),!r){t.next=21;break}return e.loading=!0,e.form=Object(o["a"])(Object(o["a"])({},e.form),{},{captchaSecret:e.captcha.captchaSecret}),t.next=6,Object(u["v"])(e.form);case 6:if(c=t.sent,i=c.success,l=c.message,e.$message({showClose:!0,message:i?"修改成功":l,type:i?"success":"error"}),i||(e.uuid=d()),e.loading=!1,f=["验证码错误","验证码已被使用","验证码过期"],f.includes(l)&&e.$refs["update-code"].focus(),0!=i){t.next=16;break}return t.abrupt("return");case 16:e.form={username:"",password:"",secret:"",captchaSecret:"",jwtSecret:"",code:""},e.$refs.updateForm.resetFields(),e.$emit("confirm"),t.next=22;break;case 21:return t.abrupt("return",!1);case 22:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}());case 3:case"end":return t.stop()}}),t)})))()}}},p=f,m=(r("2129"),r("3427")),h=Object(m["a"])(p,n,a,!1,null,"9531ca82",null);t["default"]=h.exports},d962:function(e,t,r){},f5d2:function(e,t,r){},f7f4:function(e,t,r){"use strict";r("43db")}}]);