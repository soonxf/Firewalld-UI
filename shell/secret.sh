#!/bin/bash
DIR=$(pwd)

# 定义输出颜色 
redMsg() { echo -e "\\n\E[1;31m$*\033[0m\\n"; }
greMsg() { echo -e "\\n\E[1;32m$*\033[0m\\n"; }
bluMsg() { echo -e "\\n\033[5;34m$*\033[0m\\n"; }
purMsg() { echo -e "\\n\033[35m$*\033[0m\\n"; }

if [ ! -f "$DIR/secretKey/fingerprint/PRIVATE-KEY.txt" ];then
    redMsg "检测到指纹密钥不存在"
    redMsg 不能正常生成,需要跳过密钥检测,删除 $DIR/shell/startup.sh 脚本中的密钥生成下面一行即可
    redMsg 生成指纹密钥中
    redMsg 全部回车即可
    ssh-keygen -t rsa -b 2048 -f$DIR/secretKey/fingerprint/PRIVATE-KEY.txt
    openssl rsa -in $DIR/secretKey/fingerprint/PRIVATE-KEY.txt -pubout -outform PEM -out $DIR/secretKey/fingerprint/PUBLIC-KEY.txt
else
greMsg 指纹密钥已经存在
fi

if [ ! -f "$DIR/secretKey/token/PRIVATE-KEY.txt" ];then
    redMsg "检测到 token 密钥不存在"
    redMsg 不能正常生成,需要跳过密钥检测,删除 $DIR/shell/startup.sh 脚本中的密钥生成下面一行即可
    redMsg 生成 token 密钥中
    redMsg 全部回车即可
    ssh-keygen -t rsa -b 2048 -f $DIR/secretKey/token/PRIVATE-KEY.txt
    openssl rsa -in $DIR/secretKey/token/PRIVATE-KEY.txt -pubout -outform PEM -out $DIR/secretKey/token/PUBLIC-KEY.txt
else
greMsg token 已经存在
fi
