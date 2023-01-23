#!/bin/bash

# 获取上级,项目根目录
DIR=$(dirname $(dirname "$0"))

sleep 10

echo 执行第一次 >/dev/null 1>>$DIR/shell/shell.log
sh $DIR/shell/startup.sh 1 >> $DIR/shell/shell.log
if [ $? -ne 0 ]; then
sleep 5
echo 执行第二次 >/dev/null 1>>$DIR/shell/shell.log
sh $DIR/shell/startup.sh 2 >> $DIR/shell/shell.log
    if [ $? -ne 0 ]; then
    sleep 5
    cd $DIR
    npm run start:linux  >>$DIR/shell/shell.log
    sh $DIR/shell/startup.sh 3 >> $DIR/shell/shell.log
        if [ $? -ne 0 ]; then
        echo "reload 第三次成功">>$DIR/shell/shell.log
        else
        echo "reload 第三次失败">>$DIR/shell/shell.log
        fi
    else
    echo "reload 第二次成功">>$DIR/shell/shell.log
    fi
else
echo "reload 第一次成功">>$DIR/shell/shell.log
fi

    
       
       
        
