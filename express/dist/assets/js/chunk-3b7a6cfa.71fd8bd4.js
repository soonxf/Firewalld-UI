(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3b7a6cfa"],{1843:function(s,e,c){"use strict";c("ce20")},6963:function(s,e,c){"use strict";c.r(e);c("6912"),c("eec4"),c("2ef0"),c("365c");var t,r,i={components:{},name:"remark",render:function(){var s=arguments[0];return s("div",{class:"remark"},[s("div",{class:"r-container"},[s("div",{class:"r-c-tools"},[s("div",{class:"r-c-t-circle"},[s("span",{class:"r-c-t-c-box red"})]),s("div",{class:"r-c-t-circle"},[s("span",{class:"r-c-t-c-box  yellow"})]),s("div",{class:"r-c-t-circle"},[s("span",{class:"r-c-t-c-box green"})]),s("div",{class:"r-c-t-circle"},[s("span",{class:"r-c-t-c-text"},["备注"])])]),s("div",{class:"r-content"},[s("div",[s("h3",["目录和文件"]),s("ul",[s("li",["shell: 自动化脚本目录"]),s("li",["secretKey: 存放 rsa 密钥,用于加密 token 和 指纹"]),s("li",["shell/shell.log: 记录自动化脚本的日志"]),s("li",["config.json: 系统设置,同界面化 系统设置 页面"]),s("li",["express 前端根目录"]),s("ul",[s("li",["express/ssl: 存放 https 证书"]),s("li",["express/dist: 前端静态资源"]),s("li",["express/config.js: 前端配置文件"]),s("li",["express/config.js.httpPort: http 端口"]),s("li",["express/config.js.httpsPort: https 端口(没有部署 https 证书无法访问)"]),s("li",["express/config.js.limiter: 前端流量限制配置"]),s("li",["express/config.js.proxy.target:代理的后端路径"])])])]),s("div",[s("h3",["查看注册口令"]),s("p",['echo -e "注册口令:" $(sqlite3 ./database/sqlite-prod.db \'SELECT secret FROM users WHERE username = "你的用户名";\')'])])])])])},inject:["triggerLoading"],data:function(){return{}},methods:{},mounted:function(){},beforeDestroy:function(){}},l=i,n=(c("1843"),c("2877")),o=Object(n["a"])(l,t,r,!1,null,"546ad56a",null);e["default"]=o.exports},ce20:function(s,e,c){}}]);