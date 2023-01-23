#!/bin/bash

# 定义输出颜色 
redMsg() { echo -e "\\n\E[1;31m$*\033[0m\\n"; }
greMsg() { echo -e "\\n\E[1;32m$*\033[0m\\n"; }
bluMsg() { echo -e "\\n\033[5;34m$*\033[0m\\n"; }
purMsg() { echo -e "\\n\033[35m$*\033[0m\\n"; }

# DIR=$( cd "$(dirname "${BASH_SOURCE[0]}")" && pwd);

DIR=$(pwd)

read -r -p "请先安装 node  是否下载 node-v16.18.1-linux-x64 ? [y/n] " input
case $input in
    [yY][eE][sS]|[yY])
      rm -rf $DIR/shell/node/*
      wget https://nodejs.org/dist/v16.18.1/node-v16.18.1-linux-x64.tar.gz -P $DIR/shell/node/
            if [ $? -eq 0 ]; then
            RES=$(grep "$DIR/shell/node/node-v16.18.1-linux-x64/bin" /etc/profile)
            tar xvf $DIR/shell/node/node-v16.18.1-linux-x64.tar.gz -C $DIR/shell/node/
              if [ "$RES" = "" ];then
              chmod -R 777 /etc/profile
              echo >>/etc/profile
              echo export PATH=\$PATH:$DIR/sehll/node/node-v16.18.1-linux-x64/bin>>/etc/profile
              source /etc/profile
              ln -sf $DIR/shell/node/node-v16.18.1-linux-x64/bin/node /usr/local/bin/node
              ln -sf $DIR/shell/node/node-v16.18.1-linux-x64/bin/npm /usr/local/bin/npm

              sleep 3
              NODE=$(node -v)
              if [ $? -eq 0 ]; then
              greMsg "node 安装成功"
              exit 0
              else
              redMsg "node 安装失败"
              exit 1
              fi

              else
              ln -sf $DIR/shell/node/node-v16.18.1-linux-x64/bin/node /usr/local/bin/node
              ln -sf $DIR/shell/node/node-v16.18.1-linux-x64/bin/npm /usr/local/bin/npm

              sleep 3
              NODE=$(node -v)
              if [ $? -eq 0 ]; then
              greMsg "node 安装成功"
              exit 0
              else
              redMsg "node 安装失败"
              exit 1
              fi

              exit 0
              fi
            else
            redMsg "下载失败";
            exit 1
            fi
		;;
    [nN][oO]|[nN])
		echo "请手动安装 推荐的 node 版本为 >= v16.18.1"
		echo "需要修改版本请进入 $DIR/node.sh 修改链接再替换本文件和 pm2.sh 中出现 node-v16.18.1-linux-x64 的地方即可"
        exit 1
       	;;
    *)
		echo "请输入 y/n"
		;;
    esac