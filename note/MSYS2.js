Msys2安装+配置
1.安装msys2

http://www.msys2.org/
1
2.<msys64目录>\usr\bin 加入环境变量 Path

3.<msys64目录>\mingw64\bin 加入环境变量 Path

4.运行 <msys64目录> 下的mingw64.exe 开启终端

安装完成后：
1.安装tree ，以树的格式查看文件夹

pacman -S tree
1
2.下载或更新安装包

pacman -Syu 检查版本
pacman -Su 更新
1
2
3.下载fish

pacman -S fish
1
4.下载vim或emacs编辑器，这里下载vim

pacman -S vim
1
5.修改启动msys默认启动fish

vim /etc/nsswwitch.conf
1
在末尾添加：

db_shell: /usr/bin/fish
1
6.开启执行msys默认执行的脚步命令
进入 /home/Administrator/.config/fish 创建 config.fish
内容填写为： cd /d (表示启动msys默认进入d盘)

https://blog.csdn.net/qq_32523809/article/details/84634046


pacman -S tar
pacman -S base-devel  
curl -L github.com/oh-my-fish/oh-my-fish/raw/master/bin/install | fish
// 
// 
// 
// MSYS2开发环境搭建
软件安装
下载msys2-x86_64软件包，双击安装到某根目录下，比如D:\msys64。

pacman是MSYS2自带的软件管理工具：

可通过修改msys64\etc\pacman.d下的三个文件修改软件源，参考帮助文档，可供选择的有：中国科学技术开源软件镜像、北京理工大学镜像、日本北陆先端科学技术大学院大学SourceForge镜像、The UK Mirror Service Sorceforge mirror等。
下载后的软件包默认存放目录msys64\var\cache\pacman\pkg；若命令行下载速度较慢，可以到到软件源网站使用下载工具下载相应的软件包，然后拷贝到此目录，接着使用命令行进行安装。
运行msys2_shell.bat: pacman -Sy 更新本地包数据
升级核心包: pacman -S --needed filesystem msys2-runtime bash libreadline libiconv libarchive libgpgme libcurl pacman ncurses libintl, 之后需要关闭所有 MSYS2 shell，然后运行 autorebase.bat
升级其他包：pacman -Su
常用命令：
pacman -Q查看已安装的软件包
pacman -S -g查看软件组
pacman -Q -g base-devel查看软件组包含的软件
pacman -Q -l vim查询软件包的内容
pacman -Q -s nettle查询软件所在的包
查看工具帮助：pacman -h ；pacman -S -h
建议通过安装软件组来安装工具链
pacman -S mingw-w64-x86_64-toolchain
pacman -S mingw-w64-i686-toolchain
pacman -S base-devel
pacman -S vim

MSYS2应用说明
运行环境说明
msys64\etc\fstab中可以配置文件目录映射：比如配置C:\Users\lenovo\Desktop /desktop后，可以在终端直接cd /desktop后可以直接切换到C:\Users\lenovo\Desktop目录下。

任务栏快捷键：msys64\usr\bin\mintty.exe拖拽到任务栏上，右击选择属性，将目标改成三种BAT脚本中的一个。

vim高亮配置：将msys64\etc\skel.vimrc拷贝到用户目录下。

MSYS2有三个执行脚本，分别是 msys2_shell.bat、mingw32_shell.bat 和 mingw64_shell.bat，查看内容可以看到其中只有一行区别，即是设定 MSYSTEM 变量。这个变量在 /etc/profile 中会用到:

MSYS2_PATH="/usr/local/bin:/usr/bin:/bin"
MANPATH="/usr/local/man:/usr/share/man:/usr/man:/share/man:${MANPATH}"
INFOPATH="/usr/local/info:/usr/share/info:/usr/info:/share/info:${INFOPATH}"
MINGW_MOUNT_POINT=
if [ -n "$MSYSTEM" ]
then
 case "$MSYSTEM" in
   MINGW32)
     MINGW_MOUNT_POINT=/mingw32
     PATH="${MINGW_MOUNT_POINT}/bin:${MSYS2_PATH}:${PATH}"
     PKG_CONFIG_PATH="${MINGW_MOUNT_POINT}/lib/pkgconfig:${MINGW_MOUNT_POINT}/share/pkgconfig"
     ACLOCAL_PATH="${MINGW_MOUNT_POINT}/share/aclocal:/usr/share/aclocal"
     MANPATH="${MINGW_MOUNT_POINT}/share/man:${MANPATH}"
   ;;
   MINGW64)
     MINGW_MOUNT_POINT=/mingw64
     PATH="${MINGW_MOUNT_POINT}/bin:${MSYS2_PATH}:${PATH}"
     PKG_CONFIG_PATH="${MINGW_MOUNT_POINT}/lib/pkgconfig:${MINGW_MOUNT_POINT}/share/pkgconfig"
     ACLOCAL_PATH="${MINGW_MOUNT_POINT}/share/aclocal:/usr/share/aclocal"
     MANPATH="${MINGW_MOUNT_POINT}/share/man:${MANPATH}"
   ;;
   MSYS)
     PATH="${MSYS2_PATH}:/opt/bin:${PATH}"
     PKG_CONFIG_PATH="/usr/lib/pkgconfig:/usr/share/pkgconfig:/lib/pkgconfig"
   ;;
   *)
     PATH="${MSYS2_PATH}:${PATH}"
   ;;
 esac
else
 PATH="${MSYS2_PATH}:${PATH}"
Fi

可见，三个 .bat 的区别就是 PATH 的设置，mingw32_shell.bat 优先使用 msys64/mingw32 下的工具，mingw64_shell.bat 优先使用 msys64/mingw64 下的工具，而 msys2_shell.bat 两个都不使用，只用自身 msys 的工具。这么做的好处是当需要编译 32bit Target 的项目时使用 mingw32_shell.bat，64 bit 使用 mingw64_shell.bat，各套工具互不干扰。

添加右键快捷方式 <2018-10-29 win10>
msys2.reg

Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\Directory\Background\shell\Mingw64]
@="MinGW &64 Bash Here"
"Icon"="D:\\msys64\\msys2.ico"

[HKEY_CLASSES_ROOT\Directory\Background\shell\Mingw64\command]
@="D:\\msys64\\msys2_shell.cmd -mingw64 -here"


制作软件包makepkg
MSYS2官网的软件包是通过makepkg或makepkg-mingw制作的。
可参

MINGW_INSTALLS=mingw64 makepkg -sLf --skippgpcheck
http://sourceforge.net/p/msys2/wiki/Contributing to MSYS2/，
C:\msys64\usr\share\pacman\PKGBUILD.proto
常用软件包编译
常用软件包我们可以简单的使用命令直接从官网安装即可，比如安装openssl：

32bit：pacman -S mingw-w64-i686-openssl
64bit: pacman -S mingw-w64-x86_64-openssl
有时候根据项目需要我们不得不自己动手编译依赖的软件包，以下是我在工作用到的库编译过程记录。

openssl
64bit
mkdir openssl64
cd openssl64
tar zxvf openssl-1.0.2c.tar.gz
cd openssl-1.0.2c
./configure mingw64 shared
make
make INSTALL_PREFIX=../ install


32bit
mkdir openssl32
cd openssl32
tar zxvf openssl-1.0.2c.tar.gz
cd openssl-1.0.2c
./configure mingw shared
make
make INSTALL_PREFIX=../ install


zlib
32bit
mkdir zlib32
cd zlib32
tar zxvf zlib-1.2.8.tar.gz
cd zlib-1.2.8/
make -f ./win32/Makefile.gcc
make
make install -f win32/Makefile.gcc  DESTDIR=../

