mysql 常用命令 汇总
参考阅读

摘要

    权限

允许公网访问
    列操作

修改列名
mysql 修改列属性
    其他

登录设置自动补全与utf-8编码
其他
一次添加多条记录
修改表名字
 

允许公网访问
1,修改表,登录mysql数据库,切换到mysql数据库,使用sql语句查看"select host,user from user ;"

mysql -u root -pvmwaremysql>use mysql;

mysql>update user set host = '%' where user ='root';

mysql>select host, user from user;

mysql>flush privileges;

注意:最后一句很重要,目的是使修改生效.如果没有写,则还是不能进行远程连接. 现在你就可以远程连接你的数据库了。

2,授权用户,你想root使用密码从任何主机连接到mysql服务器

GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root' WITH GRANT OPTION;

flush privileges;

如果你想允许用户root从ip为192.168.1.104的主机连接到mysql服务器

GRANT ALL PRIVILEGES ON *.* TO 'myuser'@'192.168.1.104' IDENTIFIED BY 'root' WITH GRANT OPTION;

flush privileges;

 

 mysql命令：

登录 mysql

mysql -h127.0.0.1 -uroot -p --default-character-set=utf8 --auto-rehash
auto-rehash　为设置tab自动补充功能 

 

修改表表名

 ALTER  TABLE table_name RENAME TO new_table_name

 

建立新数据库：

mysql> create database new_db;
 

查看当前数据库：

mysql> show databases;
 

选择某个数据库进行操作：

mysql> use mysql;

 

建立数据表：

mysql> create table new_tb (字段设定列表);
 

查看该数据库中有哪些表。

mysql> show tables;
 

查看某个表的结构：

mysql> describe user;
 

查看某个表中所有的元素：

mysql> select * from user;
 

可以加上where进行过滤。

mysql> select * from user where username=’**’;
 

可以对某个值进行更新：

mysql> update wp_users set user_pass=’new passwd’ where user_login=’admin’;
 

删除数据库或者数据表：

mysql> drop database 库名;
mysql> drop table 表名;
 
清空数据表中的记录：

mysql> delete from 表名;
 

修改密码(在终端下)

mysql> mysqladmin -u用户名 -p旧密码 password 新密码;
 

增加新用户：

mysql> grant  on 数据库.* to 用户名@登录主机 identified by "密码" ;
 

新用户只有select权限，多个权限以逗号间隔即可。
导出整个数据库

mysqldump -u root -p wp > wp.sql
 

导入数据库

 mysql>create database wp_temp;

mysql>use wp_temp;
mysql>source ~/wp.sql;
清理垃圾数据：
最好先为数据库做一下备份。

mysql> DELETE FROM wp_posts WHERE post_type = 'revision';
 
修改列属性
 
 ALTER   TABLE   t1   MODIFY   a   TINYINT   NOT   NULL,   CHANGE   b   c   CHAR(20); 

一次添加多条记录
INSERT INTO users(name, age)

VALUES('姚明', 25), ('比尔.盖茨', 50), ('火星人', 600);

 

修改列名

alter table persons change id id_p integer;

实例

create table test (id integer primary key, value text);    包含自增长 create table test (id int auto_increment primary key, value text)；

insert into test (value) values('hxl'); 

insert into test (value) values('sqlite'); 

insert into test (value) values('test'); 

insert into test (value) values('for'); 

insert into test (value) values('linux'); 