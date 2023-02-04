echo "|-检查ntpdate命令是否就绪.."
is_ntpdate=$(which ntpdate)
if [ "$is_ntpdate" = "" ];then
   if [ -f /usr/bin/apt ];then
       apt install ntpdate -y
   else
       is_dnf=$(which dnf)
       if [ "$is_dnf" = "" ];then
                yum install ntpdate -y
       fi
   fi
fi
is_ntpdate=$(which ntpdate)
is_http=0
if [ "$is_ntpdate" != "" ];then
    echo "|-正在尝试同步时间..";
    ntpdate -u ntp.ntsc.ac.cn ntp.aliyun.com time.windows.com
else
    is_http=1
fi
echo "|-正在尝试将当前系统时间写入硬件..";
hwclock -w
echo "|-当前时间为：$(date)"
echo "|-时间同步完成!";
