#!/bin/bash

# 先给脚本执行权限,项目根目录执行 chmod -R 777 ./startup.sh

# 获取上级,项目根目录
DIR=$(dirname $(dirname "$0"))
RES=$(grep "$DIR/shell/startup.sh" /etc/rc.d/rc.local)

chmod -R 777 $DIR

cd $DIR

chmod -R 777 $DIR/shell/http.sh
chmod -R 777 $DIR/shell/https.sh
chmod -R 777 $DIR/shell/modules.sh
chmod -R 777 $DIR/shell/node.sh
chmod -R 777 $DIR/shell/pm2.sh
chmod -R 777 $DIR/shell/server.sh
chmod -R 777 $DIR/shell/reload.sh
chmod -R 777 $DIR/shell/clean.sh
chmod -R 777 $DIR/shell/secret.sh

# 定义输出颜色 
redMsg() { echo -e "\\n\E[1;31m$*\033[0m\\n"; }
greMsg() { echo -e "\\n\E[1;32m$*\033[0m\\n"; }
bluMsg() { echo -e "\\n\033[5;34m$*\033[0m\\n"; }
purMsg() { echo -e "\\n\033[35m$*\033[0m\\n"; }

HTTP=$(grep "httpPort" $DIR/express/config.js | grep -Eo '[0-9]{1,4}')
HTTPS=$(grep "httpsPort" $DIR/express/config.js | grep -Eo '[0-9]{1,4}')
SERVER=$(grep "port" $DIR/config/config.prod.js | grep -Eo '[0-9]{1,4}')

greMsg -------------------------启动流程开始 $(date +%F%n%T)------------------------- 

echo -------------------------端口信息-------------------------

if [ ! $HTTP ]; then
redMsg 前端端口 HTTP 不存在
else
bluMsg 前端端口 HTTP: $HTTP
sh ./shell/http.sh
fi

if [ ! $HTTPS ]; then  
redMsg 前端端口 HTTPS 不存在 
else
bluMsg 前端端口 HTTPS: $HTTPS
sh ./shell/https.sh
fi

if [ ! $SERVER ]; then
redMsg 后端端口 不存在 
else
bluMsg 后端端口: $SERVER
sh ./shell/server.sh
fi

sleep 3

# 删除下面跳过密钥检测
echo -------------------------密钥生成-------------------------
sh $DIR/shell/secret.sh
# 删除上面跳过密钥检测

echo -------------------------环境检测-------------------------

NODEFILES=$(dirname $(pwd))
# 检测是否安装 node
NODE=$(node -v)
if [ $? -ne 0 ]; then
    redMsg "请先安装 node 再试"
    redMsg "注意: 每次安装 node 都会删除$NODEFILES/node 目录"
    sh ./shell/node.sh
    if [ $? -eq 1 ]; then
    exit 1
fi
else
greMsg "node 已安装 版本: $NODE 推荐的 node 版本为 >= v16.18.1"
fi

sleep 3

# 检测是否安装 pm2
PM=$(pm2 -v)
if [ $? -ne 0 ]; then
    redMsg "请先安装 pm2 再试"
    sh ./shell/pm2.sh
    if [ $? -eq 1 ]; then
    exit 1
    fi
else
    PMV=$(pm2 -v)
    greMsg "pm2  已安装 版本: $PMV"
fi

FIRE=$(firewall-cmd -V)
if [ $? -ne 0 ]; then
redMsg "请先安装 firewalld 防火墙 再试"
exit 1
else
greMsg "firewalld  已安装 版本: $FIRE"
fi

# 检测是否安装 tcpkill
which dsniff >/dev/null
if [ $? -ne 0 ]; then
    redMsg "建议安装 dsniff (不影响使用)"
else
greMsg "tcpkill  已安装"
fi

FIRE=$(firewall-cmd -V)
if [ $? -ne 0 ]; then
redMsg "请先安装 firewalld 防火墙 再试"
exit 1
else
greMsg "firewalld  已安装 版本: $FIRE"
fi

# 检查通过

cd $DIR

# 检测 node_modules 是否存在
sh ./shell/modules.sh
if [ $? -ne 0 ]; then
redMsg "请下载前后端依赖后再试,前端: $DIR/express 后端: $DIR"
exit 1
else
greMsg "前后端依赖已经下载";
fi
# 检测 node_modules 是否存在

# 追加开机脚本
if [ "$RES" = "" ];then
redMsg "在 /etc/rc.d/rc.local 未检测到开机脚本,正在追加自动开机脚本"


# ------------------------------------------------
chmod -R 777 /etc/rc.d/rc.local

if [ $? -ne 0 ]; then
redMsg "chmod -R 777 /etc/rc.d/rc.local 执行错误"
exit 1
else
greMsg "修改 /etc/rc.d/rc.local 权限成功";
fi

echo >>/etc/rc.d/rc.local
echo $DIR"/shell/startup.sh >"$DIR"/shell/shell.log 1>&1">>/etc/rc.d/rc.local

if [ $? -ne 0 ]; then
redMsg "在 /etc/rc.d/rc.local 追加开机脚本错误"
exit 1
else
greMsg "在 /etc/rc.d/rc.local 成功追加开机脚本";
fi

fi
# ------------------------------------------------

# 启动前端和后端服务
cd $DIR
purMsg "进入根目录 $DIR"

if [ ! -f "./express/express-linux" ];then
redMsg "前端目录或者执行程序不存在"
exit 1
fi

purMsg "进入前端目录 $DIR/express"
cd ./express
# chmod -R 777
purMsg "修改前端执行权限,执行命令 chmod -R 777 express-linux"
chmod -R 777 express-linux

if [ $? -ne 0 ]; then
redMsg "前端目录或者执行程序不存在"
exit 1
fi

sleep 5

echo -------------------------正式启动-------------------------

purMsg "返回根目录 $DIR 启动服务"
cd ../

echo -e >/dev/null 1>>$DIR/shell/shell.log
echo -e ------------------------- $(date +%F%n%T) >/dev/null 1>>$DIR/shell/shell.log -------------------------

purMsg "启动日志存储在 $DIR/shell.log"

if [[ $1 -eq 2 ]];then
    echo 执行 reload >>$DIR/shell/shell.log
else 
    npm run stop:linux >/dev/null 1>>$DIR/shell/shell.log
    if [ $? -ne 0 ]; then
    redMsg "npm run stop:linux 命令执行错误 可能原因分析: 1:环境不全 2:已经启动 3:端口占用"
    exit 1
    else
    greMsg "正在检测是否存在已经启动过服务成功";
    fi
fi

# #未安装 pm2 运行 npm run start:linux:index
npm run start:linux >/dev/null 1>>$DIR/shell/shell.log
cd ./express
pm2 start express-linux --name=HttpServer --exp-backoff-restart-delay=1000
cd ../

if [ $? -ne 0 ]; then
redMsg "服务启动失败"
redMsg "npm run start:linux 命令执行错误 可能原因分析: 1:环境不全 2:已经启动 3:端口占用"
redMsg "使用 lsof -i:端口号 可查看占用的进程"
redMsg "使用 kill PID 可销毁进程(PID 是进程号)"
exit 1
else
greMsg "服务启动成功";
bluMsg "前端 HTTP: 本机IP:$HTTP"
bluMsg "前端 HTTPS: 本机IP:$HTTPS (未部署 HTTPS 请访问 HTTP)"
bluMsg "后端: 本机IP:$SERVER"
fi

greMsg -------------------------启动流程结束 $(date +%F%n%T)-------------------------
echo -e \ >/dev/null 1>>$DIR/shell/shell.log
echo -e ------------------------- $(date +%F%n%T) >/dev/null 1>>$DIR/shell/shell.log -------------------------

exit 0