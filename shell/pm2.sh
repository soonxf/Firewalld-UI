#!/bin/bash

redMsg() { echo -e "\\n\E[1;31m$*\033[0m\\n"; }
greMsg() { echo -e "\\n\E[1;32m$*\033[0m\\n"; }
bluMsg() { echo -e "\\n\033[5;34m$*\033[0m\\n"; }
purMsg() { echo -e "\\n\033[35m$*\033[0m\\n"; }

DIR=$(pwd)

read -r -p "请先安装 pm2  是否安装 ? [y/n] " input
case $input in
    [yY][eE][sS]|[yY])
       npm install pm2 -g --registry=https://registry.npm.taobao.org
            if [ $? -eq 0 ]; then
            ln -sf $DIR/shell/node/node-v16.18.1-linux-x64/bin/pm2 /usr/local/bin
            greMsg "pm2 安装成功"
            exit 0
            else
            redMsg "pm2 安装失败";
            exit 1
            fi
		;;
    [nN][oO]|[nN])
		echo "请手动安装 pm2"
        exit 1
       	;;
    *)
		echo "请输入 y/n"
		;;
    esac