#!/bin/bash

# 定义输出颜色 
redMsg() { echo -e "\\n\E[1;31m$*\033[0m\\n"; }
greMsg() { echo -e "\\n\E[1;32m$*\033[0m\\n"; }
bluMsg() { echo -e "\\n\033[5;34m$*\033[0m\\n"; }
purMsg() { echo -e "\\n\033[35m$*\033[0m\\n"; }

# DIR=$( cd "$(dirname "${BASH_SOURCE[0]}")" && pwd);
# 获取当前所在目录,不是代码文件所在目录,在 startup.sh cd $(dirname $(pwd)) 过了
DIR=$(pwd)

if [ ! -d "$DIR/node_modules/" ];then
redMsg "检测到 $DIR/node_modules 不存在"
redMsg "下载失败请删除 $DIR/node_modules 和 $DIR/express/node_modules 再试"
read -r -p "是否进行 npm install 下载时请确保网络通畅(建议手动使用 cnpm/yarn) ? [y/n] " input
case $input in
    [yY][eE][sS]|[yY])
        npm install --registry=https://registry.npm.taobao.org
            if [ $? -ne 0 ]; then
            redMsg "下载后端依赖错误"
            exit 1
            else
            greMsg "下载后端依赖成功";
            fi
        cd ./express
        if [ ! -d "$DIR/express/node_modules/" ];then
            npm install --registry=https://registry.npm.taobao.org
                if [ $? -ne 0 ]; then
                redMsg "下载前端依赖错误"
                exit 1
                else
                greMsg "下载前端依赖成功";
                exit 0
                fi
            cd ../
            exit 0
            else
            exit 0
        fi
		;;
    [nN][oO]|[nN])
		echo "请手动进行下载"
        exit 1
       	;;
    *)
		echo "请输入 y/n"
		exit 1
		;;
esac
fi