#!/bin/bash
DIR=$(dirname $(dirname "$0"))

echo --------------------定时任务执行整理数据库 $(date +%F%n%T)-------------------->>$DIR/shell/shell.log
sqlite3 $DIR/database/sqlite-prod.db 'VACUUM;'>>$DIR/shell/shell.log
sqlite3 $DIR/database/sqlite-local.db 'VACUUM;'>>$DIR/shell/shell.log
sqlite3 $DIR/database/sqlite-default.db 'VACUUM;'>>$DIR/shell/shell.log

echo --------------------定时任务执行清理日志 $(date +%F%n%T)-------------------->>$DIR/shell/shell.log
rm -rf $DIR/logs/*

rm -rf $DIR/shell/shell.log

sh $DIR/shell/reload.sh>>$DIR/shell/shell.log

# 清理数据库命令
# 清理 accesss 表内的所有数据(不会删除表,只会删除里面的所有数据)
# 根目录/database 目录下
# sqlite3 ./sqlite-prod.db "DELETE FROM accesss;"
# sqlite3 ./sqlite-prod.db 'VACUUM;'

#根目录
# sqlite3 ./database/sqlite-prod.db 'SELECT secret FROM users WHERE username = "你的用户名";'
# grep secret ./config.json | head -n 1