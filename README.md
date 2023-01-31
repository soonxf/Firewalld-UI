
<div align="center">

##### 留个 🌟🌟🌟 再走吧!!!
##### 好人一生平安!!!

</div>

## 演示环境

> 演示环境没有部署在 linux ,因此很多功能是失效的

## [点击查看演示](https://340200.xyz:65001)

### Micro-Firewall

Micro-Firewall 基于 linux 的 node 微型界面化防火墙,支持自定义创建屏蔽规则,根据规则自动屏蔽 IP

##### 要求

* linux 系统
* 安装有 firewalld 防火墙
* nodejs 和 pm2 (node 推荐 16.18.1)

> 脚本会检测安装 除 firewalld 防火墙外的所有环境,可以实现一键部署启动

##### 项目介绍和技术栈

* 前端基于 Vue(element UI), 后端 基于 nodejs(eggjs)
* vuex 和 数据持久化, pm2 管理和部署项目, pkg 打包前端静态资源
* express 部署前端 https 静态资源,使用 limiter 帽子防护 xss 等攻击
* 使用 jwt 和 浏览器指纹维护前端的登录状态
* 前后端 根据 IP 的限流措施
* 基于 sqlite3 的数据库存储,接口使用事务处理数据
* linux 防火墙 firewall 的使用
* shell 脚本的使用,检测环境和下载依赖等
* 自动化屏蔽 IP,可以根据 IP 归属地屏蔽
* 部署简单,一键化部署前端后端
* 使用 rsa 加密 token 和 指纹等信息

### 目录和文件

* shell: 自动化脚本目录
* secretKey: 存放 rsa 密钥,用于加密 token 和 指纹
* shell/shell.log: 记录自动化脚本的日志
* config.json: 系统设置,同界面化 系统设置 页面
* express 前端根目录
  * express/ssl: 存放 https 证书
  * express/dist: 前端静态资源
  * express/config.js: 前端配置文件

### startup.sh 脚本

> 暖心的自动化脚本,做到了那些功能

* 检测环境 node pm2 firewalld
* 自动下载 node pm2 ,自动创建 node pm2 软连接
* 检测依赖,并自动下载(node_modules)
* 检测 secretKey 密钥,和自动生成密钥
* 自动检测端口,并自动在防火墙开放项目端口
* 检测开机启动,自动追加开机脚本(/etc/rc.d/rc.local)
* 检测完环境后自动启动前后端服务,默认端口 http:5000,https:5001

> 项目根目录运行

```
./shell/startup.sh
```

或者

```
chmod -R 777 ./shell/startup.sh && ./shell/startup.sh
```

> 启动完成浏览器打开 本机IP:5000(5001)

### 登录

默认用户名

```
admin
```

默认密码

```
Admin123456@
```

### 查看注册口令

> 项目根目录打开终端执行,
>
> linux 环境下执行,没有自带 sqlite3 环境需要自行下载
>
> 将 你的用户名 (五个汉字)替换为自己注册的用户名,完整复制不要丢失

```
sqlite3 ./database/sqlite-prod.db 'SELECT secret FROM users WHERE username = "你的用户名";'
```

### 查看 JWT 密钥

> 项目根目录打开 linux 终端执行

```
grep secret ./config.json | head -n 1
```


### 部署 https

* 将证书存储在 express/ssl
* 修改 express/config.js 中的 ssl.key ssl.crt
* 重启生效

> ssl.key ssl.crt 填入文件名即可,不需要路径,空 (表示空 == "") 表示不启用 https


### 问题

##### 脚本下载依赖失败

> 删除根目录 node_modules

> 使用 cnpm 下载

```
npm install -g cnpm -registry=https://registry.npm.taobao.org
```

##### 检查是否安装成功

```
cnpm -v
```

##### 下载依赖

```
cnpm install
```

#### gitee

[Micro-firewall](https://gitee.com/SOONXFGetee/micro-firewall)

#### 完整启动流程截图

![image](https://github.com/soonxf/Micro-Firewall/blob/main/images/%E5%90%AF%E5%8A%A8%E6%88%AA%E5%9B%BE.png?raw=true)

#### 部分截图

![image](https://github.com/soonxf/Micro-Firewall/blob/main/images/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202023-01-23%20225233.png?raw=true)

![image](https://github.com/soonxf/Micro-Firewall/blob/main/images/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202023-01-23%20224657.png?raw=true)

![image](https://github.com/soonxf/Micro-Firewall/blob/main/images/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202023-01-23%20235608.png?raw=true)

![image](https://github.com/soonxf/Micro-Firewall/blob/main/images/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202023-01-23%20235644.png?raw=true)

![image](https://github.com/soonxf/Micro-Firewall/blob/main/images/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202023-01-23%20235740.png?raw=true)

![image](https://github.com/soonxf/Micro-Firewall/blob/main/images/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202023-01-23%20235833.png?raw=true)

![image](https://github.com/soonxf/Micro-Firewall/blob/main/images/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202023-01-23%20235951.png?raw=true)

![image](https://github.com/soonxf/Micro-Firewall/blob/main/images/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202023-01-23%20224802.png?raw=true)

![image](https://github.com/soonxf/Micro-Firewall/blob/main/images/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202023-01-23%20224842.png?raw=true)

![image](https://github.com/soonxf/Micro-Firewall/blob/main/images/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202023-01-23%20225144.png?raw=true)







