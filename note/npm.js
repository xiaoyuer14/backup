将npm的注册表源设置为国内的镜像
1、国内用户，建议将npm的注册表源设置为国内的镜像，可以大幅提升安装速度

2、国内优秀npm镜像推荐及使用：http://riny.net/2014/cnpm/

淘宝npm镜像

 ·搜索地址：http://npm.taobao.org/

 ·registry地址：http://registry.npm.taobao.org/

 

 

cnpmjs镜像

 ·搜索地址：http://cnpmjs.org/

 ·registry地址：http://r.cnpmjs.org/

 

如何使用

 有很多方法来配置npm的registry地址，下面根据不同情境列出几种比较常用的方法。以淘宝npm镜像举例：

  1、临时使用

npm --registry https://registry.npm.taobao.org install express
 
2、持久使用
npm config set registry https://registry.npm.taobao.org
 
// 配置后可通过下面方式来验证是否成功
npm config get registry
// 或
npm info express
 
3、通过cnpm使用
npm install -g cnpm --registry=https://registry.npm.taobao.org
 
// 使用
cnpm install express
 
我使用的是cnpm，如下图
 

npm使用国内镜像的方法
一.通过命令配置
1. 命令

npm config set registry https://registry.npm.taobao.org
2. 验证命令

npm config get registry
如果返回https://registry.npm.taobao.org，说明镜像配置成功。

 

二、通过使用cnpm安装
1. 安装cnpm

npm install -g cnpm --registry=https://registry.npm.taobao.org
2. 使用cnpm

cnpm install xxx