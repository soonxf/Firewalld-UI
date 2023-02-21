(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-98a47ec6","chunk-0d81c3ce","chunk-821ed708","chunk-2d0ba86b"],{"0663":function(e,t,r){},"0b06":function(e,t,r){"use strict";r("2e9d")},"14a7":function(e,t,r){"use strict";r("8964")},"20a3":function(e,t,r){"use strict";r.r(t);var a,n,s=r("c7eb"),o=r("5530"),c=r("1da1"),i=r("2638"),l=r.n(i),u=(r("ac1f"),r("00b4"),r("d9e2"),r("b64b"),r("caad"),r("2532"),r("365c")),d=r("6912"),p=r("381a"),m={name:"register-dialog",props:{visible:{type:Boolean,default:!1}},render:function(){var e=this,t=arguments[0];return t("el-dialog",{class:"login-register-dialog",attrs:{visible:this.visible,width:"380px","show-close":!1,placement:"bottom",center:!0},on:{close:function(){return e.close()},open:function(){return e.open()}}},[t("div",{slot:"title"},["注册用户"]),t("el-form",l()([{},{props:{model:this.form}},{attrs:{rules:this.rules,"label-position":"top"},ref:"registerForm"}]),[t("el-form-item",{attrs:{prop:"username",label:"用户名"}},[t("el-input",{ref:"register-username",attrs:{clearable:!0,maxlength:10,disabled:this.loading,type:"text",placeholder:"用户名"},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)}}},[t("i",{slot:"prepend",class:"el-icon-s-custom"})])]),t("el-form-item",{attrs:{prop:"password",label:"密码"}},[t("el-input",{attrs:{clearable:!0,"show-password":!0,maxlength:15,disabled:this.loading,type:"password",placeholder:"密码"},ref:"register-password",model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)}}},[t("i",{slot:"prepend",class:"el-icon-lock"})])]),t("el-form-item",{attrs:{prop:"secret",label:"口令"}},[t("el-input",{attrs:{disabled:!0,clearable:!0,type:"text",placeholder:"自定义口令,用于修改密码"},ref:"register-secret",model:{value:e.form.secret,callback:function(t){e.$set(e.form,"secret",t)}}},[t("i",{slot:"prepend",class:"el-icon-chat-line-square"}),t("el-button",{attrs:{disabled:this.loading},slot:"append",on:{click:function(){return e.generateClick()}}},["生成"])])]),t("el-form-item",{attrs:{prop:"code",label:"验证码"}},[t("el-input",{class:"global-captcha-input",attrs:{placeholder:"不区分大小写",clearable:!0,maxlength:4,disabled:this.loading},ref:"register-code",model:{value:e.form.code,callback:function(t){e.$set(e.form,"code",t)}}},[t("global-captcha",{slot:"append",attrs:{uuid:this.uuid},on:{captcha:function(t){return e.captcha=t}}})])])]),t("div",{slot:"footer",class:"dialog-footer"},[t("el-button",{attrs:{disabled:this.loading},on:{click:function(){return e.cancelClick()}}},["取 消"]),t("el-button",{attrs:{type:"primary",loading:this.loading},on:{click:function(){return e.confirmClick()}}},["确 定"])])])},data:function(){return{form:{username:"",password:"",secret:"",code:"",secretCode:""},uuid:p(),captcha:{svg:"",publicKey:"",captchaSecret:""},rules:{username:[{required:!0,message:"请输入用户名",trigger:"change"},{min:4,max:10,message:"长度在 4 到 10 个字符",trigger:"change"}],password:[{required:!0,message:"请输入密码",trigger:"change"},{validator:function(e,t,r){/^\S*(?=\S{8,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/.test(t)?r():r(new Error("最少8位和分别1个大小写字母数字,!@#$%^&*?其中一个"))},trigger:"change"}],secret:[{required:!0,message:"请生成自定义口令",trigger:"change"},{validator:function(e,t,r){/^[\d\w]+$/.test(t)?r():r(new Error("注册口令只能是数字或者字母"))},trigger:"change"}],code:[{required:!0,message:"请输入验证码",trigger:"change"},{validator:function(e,t,r){/^[\d]{1,2}$/.test(t)?r():r(new Error("验证码至多2个数字"))},trigger:"change"}]},loading:!1,autofocus:!1}},methods:{open:function(){this.uuid=p()},close:function(){this.loading=!1,this.$emit("close")},cancelClick:function(){this.$emit("cancel")},confirmClick:function(){var e=this;return Object(c["a"])(Object(s["a"])().mark((function t(){return Object(s["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$refs.registerForm.validate(function(){var t=Object(c["a"])(Object(s["a"])().mark((function t(r,a){var n,c,i,l,d;return Object(s["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if((null===(n=Object.keys(a))||void 0===n?void 0:n[0])&&e.$refs["register-".concat(Object.keys(a)[0])].focus(),!r){t.next=21;break}return e.loading=!0,e.form=Object(o["a"])(Object(o["a"])({},e.form),{},{captchaSecret:e.captcha.captchaSecret}),t.next=6,Object(u["E"])(e.form);case 6:if(c=t.sent,i=c.success,l=c.message,e.$message({showClose:!0,message:i?"注册成功":l,type:i?"success":"error"}),i||(e.uuid=p()),d=["验证码错误","验证码已被使用","验证码过期"],d.includes(l)&&e.$refs["register-code"].focus(),e.loading=!1,0!=i){t.next=16;break}return t.abrupt("return");case 16:e.form={username:"",password:"",secret:"",code:""},e.$refs.registerForm.resetFields(),e.$emit("confirm"),t.next=22;break;case 21:return t.abrupt("return",!1);case 22:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}}),t)})))()},generateClick:function(){this.form.secret=p(20),Object(d["b"])(this.form.secret)}}},f=m,b=(r("bdb6"),r("2877")),g=Object(b["a"])(f,a,n,!1,null,"45b4429d",null);t["default"]=g.exports},"24a0":function(e,t,r){"use strict";r("8c8b")},"2e9d":function(e,t,r){},"351e":function(e,t,r){"use strict";r.r(t);var a,n,s=r("c7eb"),o=r("1da1"),c=r("5530"),i=(r("d3b7"),r("159b"),r("b64b"),r("b0c0"),r("14d9"),r("2f62")),l=r("6912"),u={name:"menu-container",render:function(){var e=this,t=arguments[0];return t("el-menu",{attrs:{collapse:this.collapse,"default-active":this.otherMenuActive,"popper-append-to-body":!0,"collapse-transition":!1},on:{select:function(t,r){return e.select(t,r)}},ref:"menu"},[t("el-menu-item",{attrs:{index:"home-index"}},[t("i",{class:"el-icon-s-home"}),t("span",{slot:"title"},["首页"])]),t("el-menu-item",{attrs:{index:"monit"}},[t("i",{class:"iconfont icon-jiankong"}),t("span",{slot:"title"},["监控"])]),t("el-submenu",{attrs:{index:"management"}},[t("template",{slot:"title"},[t("i",{class:"el-icon-s-data"}),t("span",{slot:"title"},["管理项目"])]),t("el-menu-item",{attrs:{index:"management-projects"}},[t("i",{class:"iconfont icon-xiangmu"}),t("span",["我的项目"])]),t("el-menu-item",{attrs:{index:"management-rule"}},[t("i",{class:"iconfont icon-bianmaguize"}),t("span",["已有规则"])]),t("el-menu-item",{attrs:{index:"list-blacklist"}},[t("i",{class:"iconfont icon-heimingdan"}),t("span",{slot:"title"},["屏蔽名单"])])]),t("el-submenu",{attrs:{index:"log"}},[t("template",{slot:"title"},[t("i",{class:"iconfont icon-zhuanxierizhi"}),t("span",{slot:"title"},["日志服务"])]),t("el-menu-item",{attrs:{index:"log-accessLog"}},[t("i",{class:"iconfont icon-yonghurizhi"}),t("span",["访问日志"])]),t("el-menu-item",{attrs:{index:"log-systemLog"}},[t("i",{class:"iconfont icon-rizhi"}),t("span",["系统日志"])])]),t("el-menu-item",{attrs:{index:"Settings"}},[t("i",{class:"iconfont icon-guizeshezhi"}),t("span",{slot:"title"},["系统设置"])])])},computed:Object(c["a"])({},Object(i["b"])(["otherCollapse","otherMenuActive"])),watch:{otherCollapse:{immediate:!0,handler:function(e,t){var r=this;return Object(o["a"])(Object(s["a"])().mark((function t(){return Object(s["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(l["c"])(100);case 2:r.collapse=e;case 3:case"end":return t.stop()}}),t)})))()}}},data:function(){return{collapse:!1,defaultActive:"",menu:{"home-index":"Index","management-projects":"Projects","management-rule":"Rule","log-accessLog":"AccessLog","log-systemLog":"SystemLog","list-blacklist":"Blacklist",Settings:"Settings",monit:"Monit",xterm:"Xterm"}}},mounted:function(){this.initMenu()},methods:Object(c["a"])(Object(c["a"])({},Object(i["c"])(["otherMutationsCollapse","otherMutationsMenuActive"])),{},{initMenu:function(){var e=this;return Object(o["a"])(Object(s["a"])().mark((function t(){return Object(s["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.collapse=e.otherCollapse,Object.keys(e.menu).forEach((function(t){return e.menu[t]==e.$route.name&&e.otherMutationsMenuActive(t)}));case 2:case"end":return t.stop()}}),t)})))()},seleteActiveuMenu:function(e){this.otherMutationsMenuActive(e),this.$router.push({name:this.menu[e]})},select:function(e,t){this.seleteActiveuMenu(e)}})},d=u,p=(r("0b06"),r("2877")),m=Object(p["a"])(d,a,n,!1,null,"5d622c91",null);t["default"]=m.exports},"381a":function(e,t,r){"use strict";var a="0123456789",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",s="~!@#$%^*()_+-=[]{}|;:,./<>?";function o(e,t){e||(e=8),t||(t={});var r="",o="";!0===t?r=a+n+s:"string"==typeof t?r=t:(!1!==t.numbers&&(r+="string"==typeof t.numbers?t.numbers:a),!1!==t.letters&&(r+="string"==typeof t.letters?t.letters:n),t.specials&&(r+="string"==typeof t.specials?t.specials:s));while(e>0)e--,o+=r[Math.floor(Math.random()*r.length)];return o}e.exports=o.default=o},"63e3":function(e,t,r){"use strict";r.r(t);var a,n,s={name:"default-pass",props:{},render:function(){var e=arguments[0];return e("div",{class:"default-pass"},[e("label",["默认用户: ",this.username]),e("label",["默认密码: ",this.passworld]),e("label",[" enter 自动获取输入焦点 "])])},data:function(){return{username:"admin",passworld:"Admin123456@"}},methods:{},created:function(){}},o=s,c=(r("d41f"),r("2877")),i=Object(c["a"])(o,a,n,!1,null,"1e0db392",null);t["default"]=i.exports},6716:function(e,t,r){},8964:function(e,t,r){},"8c8b":function(e,t,r){},"98f4":function(e,t,r){"use strict";r.r(t);var a,n,s=r("c7eb"),o=r("1da1"),c=r("2638"),i=r.n(c),l=r("b047"),u=r.n(l),d=(r("e25e"),r("b0c0"),r("d9e2"),r("365c")),p=r("3851"),m=r.n(p),f={name:"create-project-dialog",props:{visible:{type:Boolean,default:!1}},render:function(){var e=this,t=arguments[0];return t("el-dialog",{class:"create-project",attrs:{visible:this.visible,width:"28%","show-close":!1,placement:"bottom",center:!0},on:{open:function(){return e.open()},close:function(){return e.close()}}},[t("div",{slot:"title"},["新建项目"]),t("el-form",i()([{ref:"form"},{props:{model:this.form}},{attrs:{"label-position":"top",rules:this.rules}}]),[t("el-form-item",{attrs:{prop:"name",label:"项目名称"}},[t("el-input",{attrs:{clearable:!0,disabled:this.loading,placeholder:"项目名称"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)}}},[t("i",{slot:"prepend",class:"el-icon-s-grid"})])]),t("el-form-item",{attrs:{prop:"port",label:"绑定端口"}},[t("el-input",{attrs:{clearable:!0,disabled:this.loading,maxLength:5,max:65535,min:0,placeholder:"绑定端口"},model:{value:e.form.port,callback:function(t){e.$set(e.form,"port",t)}}},[t("i",{slot:"prepend",class:"el-icon-s-platform"})])]),t("el-form-item",{attrs:{label:"开启端口"}},[t("div",{class:"c-p-port"},[t("el-checkbox-group",{attrs:{disabled:this.loading},on:{change:function(t){return e.change(t)}},model:{value:e.form.portStatus,callback:function(t){e.$set(e.form,"portStatus",t)}}},[t("el-checkbox",{attrs:{border:!0,label:"tcp"}},["开启 TCP"]),t("el-checkbox",{attrs:{border:!0,label:"udp"}},["开启 UDP"])])])]),t("el-form-item",{attrs:{prop:"remarks",label:"备注"}},[t("el-input",{attrs:{clearable:!0,disabled:this.loading,placeholder:"备注"},model:{value:e.form.remarks,callback:function(t){e.$set(e.form,"remarks",t)}}},[t("i",{slot:"prepend",class:"iconfont icon-remark"})])])]),t("div",{slot:"footer",class:"dialog-footer"},[t("el-button",{attrs:{disabled:this.loading},on:{click:function(){return e.$emit("close")}}},["取 消"]),t("el-button",{attrs:{type:"primary",loading:this.loading},on:{click:function(){return e.confirmClick()}}},["确 定"])])])},data:function(){return{loading:!1,form:{name:"",port:"",remarks:"",portStatus:["tcp","udp"]},rules:{name:[{required:!0,message:"请输入项目名称",trigger:"blur"},{min:2,max:12,message:"长度在 2 到 12 个字符",trigger:"change"}],port:[{required:!0,message:"请输入项目端口",trigger:"blur"},{min:1,max:5,message:"长度在 1 到 5 个数字",trigger:"change"},{validator:function(e,t,r){parseInt(t)?r():r(new Error("请输入数字"))},trigger:"change"},{validator:function(e,t,r){t>65536||t<0?r(new Error("端口范围 0 - 65535")):r()},trigger:"change"}],remarks:[]}}},methods:{close:function(){m.a.unbind("enter"),this.$emit("close")},open:function(){this.onEnter()},onEnter:function(){var e=this;m.a.bind("enter",u()((function(){return e.confirmClick()}),200)),this.$once("hook:beforeDestroy",(function(){return m.a.unbind("enter")}))},change:function(e){console.log(e)},confirmClick:function(){var e=this;return Object(o["a"])(Object(s["a"])().mark((function t(){return Object(s["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.loading){t.next=2;break}return t.abrupt("return");case 2:e.$refs.form.validate(function(){var t=Object(o["a"])(Object(s["a"])().mark((function t(r){var a,n,o;return Object(s["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!r){t.next=16;break}return e.loading=!0,t.next=4,Object(d["c"])(e.form);case 4:if(a=t.sent,n=a.success,o=a.message,e.$message({showClose:!0,message:n?"创建成功":o,type:n?"success":"error"}),e.loading=!1,0!=n){t.next=11;break}return t.abrupt("return");case 11:e.$emit("confirm"),e.form={name:"",port:"",remarks:"",portStatus:["tcp","udp"]},e.$refs.form.resetFields(),t.next=17;break;case 16:return t.abrupt("return",!1);case 17:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 3:case"end":return t.stop()}}),t)})))()}}},b=f,g=(r("14a7"),r("2877")),h=Object(g["a"])(b,a,n,!1,null,"071abb75",null);t["default"]=h.exports},bdb6:function(e,t,r){"use strict";r("6716")},c377:function(e,t,r){"use strict";r.r(t);var a,n,s=r("c7eb"),o=r("5530"),c=r("1da1"),i=r("2638"),l=r.n(i),u=(r("ac1f"),r("00b4"),r("d9e2"),r("b64b"),r("caad"),r("2532"),r("365c")),d=r("381a"),p={name:"update-pass-dialog",props:{visible:{type:Boolean,default:!1}},render:function(){var e=this,t=arguments[0];return t("el-dialog",{class:"login-update-password-dialog",attrs:{visible:this.visible,width:"380px","show-close":!1,center:!0},on:{open:function(){return e.open()},close:function(){return e.close()}}},[t("div",{slot:"title"},["修改密码"]),t("el-form",l()([{},{props:{model:this.form}},{attrs:{rules:this.rules,"label-position":"top"},ref:"updateForm"}]),[t("el-form-item",{attrs:{prop:"username",label:"用户名"}},[t("el-input",{attrs:{clearable:!0,maxlength:10,disabled:this.loading,type:"text",placeholder:"用户名"},ref:"update-username",model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)}}},[t("i",{slot:"prepend",class:"el-icon-s-custom"})])]),t("el-form-item",{attrs:{prop:"password",label:"密码"}},[t("el-input",{attrs:{clearable:!0,"show-password":!0,maxlength:15,disabled:this.loading,type:"password",placeholder:"新密码",label:"新密码"},ref:"update-password",model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)}}},[t("i",{slot:"prepend",class:"el-icon-lock"})])]),t("el-form-item",{attrs:{prop:"jwtSecret",label:"JWT 密钥"}},[t("el-input",{attrs:{clearable:!0,"show-password":!0,disabled:this.loading,type:"password",placeholder:"当前服务器 JWT 密钥"},ref:"update-jwtSecret",model:{value:e.form.jwtSecret,callback:function(t){e.$set(e.form,"jwtSecret",t)}}},[t("i",{slot:"prepend",class:"el-icon-unlock"})])]),t("el-form-item",{attrs:{prop:"secret",label:"口令"}},[t("el-input",{attrs:{clearable:!0,"show-password":!0,disabled:this.loading,type:"password",placeholder:"注册时口令"},ref:"update-secret",model:{value:e.form.secret,callback:function(t){e.$set(e.form,"secret",t)}}},[t("i",{slot:"prepend",class:"el-icon-chat-line-square"})])]),t("el-form-item",{attrs:{prop:"code",label:"验证码"}},[t("el-input",{class:"global-captcha-input",attrs:{placeholder:"不区分大小写",clearable:!0,maxlength:4,disabled:this.loading},ref:"update-code",model:{value:e.form.code,callback:function(t){e.$set(e.form,"code",t)}}},[t("global-captcha",{slot:"append",attrs:{uuid:this.uuid},on:{captcha:function(t){return e.captcha=t}}})])])]),t("div",{slot:"footer",class:"dialog-footer"},[t("el-button",{attrs:{disabled:this.loading},on:{click:function(){return e.cancelClick()}}},["取 消"]),t("el-button",{attrs:{type:"primary",loading:this.loading},on:{click:function(){return e.confirmClick()}}},["确 定"])])])},data:function(){return{form:{username:"",password:"",secret:"",jwtSecret:"",code:"",captchaSecret:""},rules:{username:[{required:!0,message:"请输入用户名",trigger:"change"},{min:4,max:10,message:"长度在 4 到 10 个字符",trigger:"change"}],password:[{required:!0,message:"请输入密码",trigger:"change"},{validator:function(e,t,r){/^\S*(?=\S{8,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/.test(t)?r():r(new Error("最少8位和分别1个大小写字母数字,!@#$%^&*?其中一个"))},trigger:"change"}],jwtSecret:[{required:!0,message:"请输入 JWT 密钥",trigger:"change"},{validator:function(e,t,r){/^[\d\w]+$/.test(t)?r():r(new Error("JWT 密钥只能是数字或者字母"))},trigger:"change"}],secret:[{required:!0,message:"请输入注册口令",trigger:"change"},{validator:function(e,t,r){/^[\d\w]+$/.test(t)?r():r(new Error("注册口令只能是数字或者字母"))},trigger:"change"}],code:[{required:!0,message:"请输入验证码",trigger:"change"},{validator:function(e,t,r){/^[\d]{1,2}$/.test(t)?r():r(new Error("验证码至多2个数字"))},trigger:"change"}]},uuid:d(),captcha:{svg:"",publicKey:"",captchaSecret:""},loading:!1,autofocus:!1}},methods:{open:function(){this.uuid=d()},close:function(){this.loading=!1,this.$emit("close")},cancelClick:function(){this.$emit("cancel")},confirmClick:function(){var e=this;return Object(c["a"])(Object(s["a"])().mark((function t(){return Object(s["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.loading){t.next=2;break}return t.abrupt("return");case 2:e.$refs.updateForm.validate(function(){var t=Object(c["a"])(Object(s["a"])().mark((function t(r,a){var n,c,i,l,p;return Object(s["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if((null===(n=Object.keys(a))||void 0===n?void 0:n[0])&&e.$refs["update-".concat(Object.keys(a)[0])].focus(),!r){t.next=21;break}return e.loading=!0,e.form=Object(o["a"])(Object(o["a"])({},e.form),{},{captchaSecret:e.captcha.captchaSecret}),t.next=6,Object(u["w"])(e.form);case 6:if(c=t.sent,i=c.success,l=c.message,e.$message({showClose:!0,message:i?"修改成功":l,type:i?"success":"error"}),i||(e.uuid=d()),e.loading=!1,p=["验证码错误","验证码已被使用","验证码过期"],p.includes(l)&&e.$refs["update-code"].focus(),0!=i){t.next=16;break}return t.abrupt("return");case 16:e.form={username:"",password:"",secret:"",captchaSecret:"",jwtSecret:"",code:""},e.$refs.updateForm.resetFields(),e.$emit("confirm"),t.next=22;break;case 21:return t.abrupt("return",!1);case 22:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}());case 3:case"end":return t.stop()}}),t)})))()}}},m=p,f=(r("24a0"),r("2877")),b=Object(f["a"])(m,a,n,!1,null,"ab23cb22",null);t["default"]=b.exports},d41f:function(e,t,r){"use strict";r("0663")}}]);