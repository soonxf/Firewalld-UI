#!/bin/bash

HTTP=$(grep "httpPort" ./express/config.js | grep -Eo '[0-9]{1,4}')
HTTPS=$(grep "httpsPort" ./express/config.js | grep -Eo '[0-9]{1,4}')
SERVER=$(grep "port" ./config/config.prod.js | grep -Eo '[0-9]{1,4}')

redMsg() { echo -e "\\n\E[1;31m$*\033[0m\\n"; }
greMsg() { echo -e "\\n\E[1;32m$*\033[0m\\n"; }
bluMsg() { echo -e "\\n\033[5;34m$*\033[0m\\n"; }
purMsg() { echo -e "\\n\033[35m$*\033[0m\\n"; }

HTTPCHECK=$(firewall-cmd --query-port=$HTTP/tcp)

HTTPANP=$(netstat -anp |grep -w $HTTP)
if [[ -n "$HTTPANP" ]];then
  purMsg $HTTP 端口已被使用
  purMsg "使用 lsof -i:$HTTP  或者 netstat -anp | grep -w $HTTP 可以查看详细信息"
  purMsg "使用 kill PID 可销毁该进程(PID 是进程号)"
fi

if [ $HTTPCHECK = "yes" ];then
bluMsg 防火墙已开放前端 HTTP 端口 $HTTP
else 
redMsg 防火墙未开放前端 HTTP 端口 $HTTP 云服务器需要在控制台同时开启

read -r -p "是否开放端口 $HTTP ? [y/n] " input
case $input in
    [yY][eE][sS]|[yY])
       firewall-cmd --permanent --add-port=$HTTP/tcp
            if [ $? -eq 0 ]; then
            firewall-cmd --reload
            greMsg "开放端口 $HTTP 成功"
            else
            redMsg "开放端口 $HTTP 失败";
            fi
		;;
    [nN][oO]|[nN])
		echo "请手动开放端口 $HTTP 需要跳过检测请删除 startup.sh 脚本中的 sh ./http.sh"
       	;;
    *)
		echo "请输入 y/n"
		;;
    esac
fi

