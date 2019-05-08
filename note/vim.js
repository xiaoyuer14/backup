vim 参考手册
索引

跳转
undo
代码折叠
缓冲区
标签
文件打开与保存
插入
光标移动
复制粘贴删除
缩进
查找替换
bookmarks
ctags
bash
自动补全
分屏
diff
其他
 

跳跃指令 (jumps)
跳跃指令类似于游览器中的<前进><后退>按钮
CTRL-] -> 跟着link/tag转入 (follow link/tag)
CTRL-o -> 回到上一次的jump (go back)
CTRL-i -> 跳回下一个 (go forward)
:ju -> 显示所有的可以跳跃的地方 (print jump list)

 

重做/回复
u -> undo
CTRL-r -> redo
vim的undo是树结构的，你可以回到这个结构中的任何地方
:undo 2 -> undo 到结构的2层 (undo to tree 2)
:undolist -> 显示所有的undo列表 (show undo list)
:earlier 10s -> undo到10秒前的编辑 (undo to 10 seconds ago)
:earlier 10h -> undo到10小时前的编辑 (back to 10 hours ago)
:earlier 1m -> undo到1分钟前 (back to 1 minutes ago)
下面是undo的tree结构的解释
………..one
…………. |
……..change 1
…………. |
………one too
………. /……..\
…..change 2 ……. change 3
………… | ………………… |
…….one two ………. me too
……….. |
….. change 4
………..|
…… not two

 

代码折叠

1. 折叠方式 
可用选项 'foldmethod' 来设定折叠方式：set fdm=*****。
有 6 种方法来选定折叠：
          manual           手工定义折叠
          indent             更多的缩进表示更高级别的折叠
          expr                用表达式来定义折叠
          syntax             用语法高亮来定义折叠
          diff                  对没有更改的文本进行折叠
          marker            对文中的标志折叠
注意，每一种折叠方式不兼容，如不能即用expr又用marker方式，我主要轮流使用indent和marker方式进行折叠。

使用时，用：set fdm=marker 命令来设置成marker折叠方式（fdm是foldmethod的缩写）。
要使每次打开vim时折叠都生效，则在.vimrc文件中添加设置，如添加：set fdm=syntax，就像添加其它的初始化设置一样。

2. 折叠命令
选取了折叠方式后，我们就可以对某些代码实施我们需要的折叠了，由于我使用indent和marker稍微多一些，故以它们的使用为例：
如果使用了indent方式，vim会自动的对大括号的中间部分进行折叠，我们可以直接使用这些现成的折叠成果。
在可折叠处（大括号中间）：
zc      折叠
zC     对所在范围内所有嵌套的折叠点进行折叠 
zo      展开折叠
zO     对所在范围内所有嵌套的折叠点展开
[z       到当前打开的折叠的开始处。
]z       到当前打开的折叠的末尾处。
zj       向下移动。到达下一个折叠的开始处。关闭的折叠也被计入。
zk      向上移动到前一折叠的结束处。关闭的折叠也被计入。

当使用marker方式时，需要用标计来标识代码的折叠，系统默认是{{{和}}}，最好不要改动之：）
我们可以使用下面的命令来创建和删除折叠：
zf      创建折叠，比如在marker方式下：
                   zf56G，创建从当前行起到56行的代码折叠；
                   10zf或10zf+或zf10↓，创建从当前行起到后10行的代码折叠。
                   10zf-或zf10↑，创建从当前行起到之前10行的代码折叠。
                   在括号处zf%，创建从当前行起到对应的匹配的括号上去（（），{}，[]，<>等）。
zd      删除 (delete) 在光标下的折叠。仅当 'foldmethod' 设为 "manual" 或 "marker" 时有效。
zD     循环删除 (Delete) 光标下的折叠，即嵌套删除折叠。
          仅当 'foldmethod' 设为 "manual" 或 "marker" 时有效。
zE     除去 (Eliminate) 窗口里“所有”的折叠。
          仅当 'foldmethod' 设为 "manual" 或 "marker" 时有效。

关于vim的代码折叠，小弟也是初学，仅做参考。

 

* zo 将当前折叠打开
* zc 折叠光标所在处
* zr 打开所有折叠层次（依层次打开）
* zm 折叠所有层次（依层次折叠）
* zR 打开所有折叠  zn
* zM 折叠所有      zN
* zi 切换折叠与不折叠指令


 

缓冲区

* vim file1 file2 多个文件调入缓冲
* :e filename 在vim中再打开文件
* :ls 列出所有的缓冲区
* :n 编辑下一个文件
* :bp 跳转到上一个缓冲区
* :bn 跳转到下一个缓冲区
* :bN 跳转到指定编号的缓冲区:b3
* :bd1 删除编号为1的缓冲区

 

标签

* :tabnew 打开新标签页.
* :tabe <file> 在新标签页打开文件.
* <ctrl> + PageUp, PageDown 切换标签页.
* :tabnext, tabprev 切换标签页，Putty 下只能用这个.

 

文件打开保存

* :e <file> 打开文件.
* :enew 新文件.
* :w 保存.
* :wa 全部保存.
* :w <file> 另存为.
* :wq 保存并退出.
* :q 退出.
* :qa 全部退出.
* :q! 强制退出.
* ZZ 退出vim并保存文档

 

快捷插入

* esc 切换命令模式 (距离太遥远了，用 Ctrl+C 代替吧).
* i 插入模式.
* I 在当前行开头插入.
* R 替换模式.
* a 在光标后插入.
* A 在当前行尾部插入.
* o 将在光标所在行下面加入一行，并进入编辑模式。
* O 将在光标上面加入一行,注意是大写。
* v Visual 模式按字符选择.
* V Visual 模式按行选择.

 

光标移动

h 左移光标.
j 下移光标.
k 上移光标.
l 右移光标.
gg 将光标移到文件头部.
G 将光标移到文件尾部.
#G 移动光标到指定行#. 例如: 5G
% 跳转到配对的括号去
[[ 跳转到代码块的开头去(但要求代码块中’{‘必须单独占一行)
gD 跳转到局部变量的定义处
” 跳转到光标上次停靠的地方, 是两个’, 而不是一个”
mx 设置书签,x只能是a-z的26个字母
`x 跳转到书签处(“`”是1左边的键)
fx：移动光标到当前行的下一个 x 处。很明显，x 可以是任意一个字母，而且你可以使用 ; 来重复你的上一个 f 命令。
tx：和上面的命令类似，但是是移动到 x 的左边一个位置。（这真的很有用）
Fx：和 fx 类似，不过是往回找。
 

w : 向后词移动　（前面加数字移动多少个词）
b : 向前词移动　（前面加数字移动多少个词）
e : 向后移到词末
ge : 向前移到词末
 

0：移动光标到当前行首。
^：移动光标到当前行的第一个字母位置。
$：移动光标到行尾。
)：移动光标到下一个句子。
( ：移动光标到上一个句子
tx : 向右查找本行的x并移到那儿（大写时向左）
33G : 移到文件的第33行
gg : 文件首行
G : 文件尾行
33% : 文件的33%处
H/M/L : 屏幕的首/中/尾行
zt/zz/zb : 当前行移到屏幕的首/中/底部
 

复制粘贴删除
 yy 拷贝当前行到剪贴板.
nyy 复制从当前行开始的n行
 y^ 从文件头开始拷贝.
 y$ 拷贝到文件尾部.
 :#,&y 拷贝 # 到 & 行. 例如: 4,5y
 p 在光标后粘贴.
 P 粘贴到光标前.
 dd 删除当前行.
 d^ 删除到行首.
 d$ 删除到行尾.
 :#,&d 删除 # 到 & 行. 例如: 3,5d
D 当前光标开始删除到行尾
ndd 从当前行开始向后删除n行
d1G 删除第1行到当前行的数据
dnG 删除第n行到当前行的数据
dG 删除当前行到最后一行的数据
x 向后删除1个字符
nx 向后删除n个字符
X 向前删除1个字符
 


缩进
  >> 增大缩进.
  << 减少缩进.
  == 自动缩进.

 

查找替换

/# 查找 #. 例如: /printf
?# 反向查找 #.
n 查找下一个.
N 反向查找下一个.
:s/old/new/g 当前行无提示替换.
:%s/old/new/g 无提示替换.
:%s/old/new/gc 确认替换.
:#,&s/old/new/g 从 # 到 & 行无提示替换.
*  查找光标所在单词
 

书签跳转

* :marks 查看所有书签, 输入 “:<num>” 可跳转.
* m<name> 定义书签, 如 ma 在当前行定义名为 a 的书签.
* `<name> 跳转到某书签, “`” 为键盘 Tab 上一行第一键.
* :jumps 查看所有跳转记录, 输入 “:<num>” 可跳转.
* <ctrl> + o 返回上一次跳转处.
* <ctrl> + i 和 <ctrl> + o 反向转处.

 

Ctags

* :! ctags -R . 生成 ctags 文件.
* <ctrl> + ] 查看函数定义.
* <ctrl> + T 返回.
* shift + k 查看函数 man 帮助信息.

 

 

cmd

* ! <command> 执行命令.
* :r <file> 插入文件内容.
* :r !<command> 插入命令输出结果.
* :cd <path> 修改默认工作目录.

 

自动补全

Ctrl+X Ctrl+L整行补全

Ctrl+X Ctrl+N 根据当前文件里关键字补全

Ctrl+X Ctrl+K 根据字典补全

Ctrl+X Ctrl+T 根据同义词字典补全

Ctrl+X Ctrl+I 根据头文件内关键字补全

Ctrl+X Ctrl+] 根据标签补全

Ctrl+X Ctrl+F 补全文件名

Ctrl+X Ctrl+D 补全宏定义

Ctrl+X Ctrl+V 补全vim命令

Ctrl+X Ctrl+U 用户自定义补全方式

Ctrl+X Ctrl+S 拼写建议

 

分屏

分屏启动Vim    注释: n是数字，表示分成几个屏。

vim -On file1 file2 …     使用大写的O参数来垂直分屏。

vim -on file1 file2 …   使用小写的o参数来水平分屏。

Ctrl+W c   关闭分屏  关闭当前窗口。

Ctrl+W q    关闭当前窗口，如果只剩最后一个了，则退出Vim

     分屏

Ctrl+W s        上下分割当前打开的文件。

:sp filename    上下分割，并打开一个新的文件。

Ctrl+W v    左右分割当前打开的文件。

:vsp filename    左右分割，并打开一个新的文件。

    移动光标    Vi中的光标键是h, j, k, l，要在各个屏间切换，只需要先按一下Ctrl+W

Ctrl+W l     把光标移到右边的屏。

Ctrl+W h    把光标移到左边的屏中。

Ctrl+W k    把光标移到上边的屏中。

Ctrl+W j    把光标移到下边的屏中。

Ctrl+W w    把光标移到下一个的屏中。.

   移动分屏    这个功能还是使用了Vim的光标键，只不过都是大写。当然了，如果你的分屏很乱很复杂的话，这个功能可能会出现一些非常奇怪的症状。

Ctrl+W L    向右移动。

Ctrl+W H    向左移动

Ctrl+W K    向上移动

Ctrl+W J    向下移动

   屏幕尺寸    下面是改变尺寸的一些操作，主要是高度，对于宽度你可以使用Ctrl+W <或是>，但这可能需要最新的版本才支持。

Ctrl+W =    让所有的屏都有一样的高度。

Ctrl+W +    增加高度。

Ctrl+W -    减少高度。

ctrl+w >    向右扩展

ctrl+w <    向左扩展

 

 diff 模式

  参考

比较 A ， B 文件， vim – d A B 或者这样

或先打开文件 A，然后 :vsp（全名vsplit） 打开 B，然后输入命令 :diffthis

或 vimdiff   FILE_LEFT FILE_RIGHT

]c 跳转到下一差异点

[c 反向跳转

 

上下文折叠 参考

默认情况下，vimdiff会将文件中不同之处上下6行之外的相同文本折叠隐藏，可通过 :set diffopt=context:3 修改显示的上下文行数。

zo 打开折叠

zc 关闭折叠

文件合并

dp 将当前窗口光标位置处的内容复制到另一窗口

do 将另一窗口光标位置处的内容复制到当前窗口

diffupdate 重新比较两个文件，如果手动修改文件的话有时不会自动同步

其他

gg=G 源码格式化

:e! 强行重新编辑
shift insert 从系统拷贝到vim
u 撤销上一步操作.
U 撤销最后编辑的行上的操作
* . 重做.


键盘移动 (Move)
一切都从键盘的移动
k -> 上 up
j -> 下 down
h -> 左 left
l -> 右 right
z -> 重画屏幕，当前光标变成屏幕的第一行 (redraw current line at top of window)
CTRL-f -> 跳到下一页 (page down)
CTRL-b -> 跳到上一页 (page up)

跳跃指令 (jumps)
跳跃指令类似于游览器中的<前进><后退>按钮
CTRL-] -> 跟着link/tag转入 (follow link/tag)
CTRL-o -> 回到上一次的jump (go back)
CTRL-i -> 跳回下一个 (go forward)
:ju -> 显示所有的可以跳跃的地方 (print jump list)

重做/回复
u -> undo
CTRL-r -> redo
vim的undo是树结构的，你可以回到这个结构中的任何地方
:undo 2 -> undo 到结构的2层 (undo to tree 2)
:undolist -> 显示所有的undo列表 (show undo list)
:earlier 10s -> undo到10秒前的编辑 (undo to 10 seconds ago)
:earlier 10h -> undo到10小时前的编辑 (back to 10 hours ago)
:earlier 1m -> undo到1分钟前 (back to 1 minutes ago)
下面是undo的tree结构的解释
………..one
…………. |
……..change 1
…………. |
………one too
………. /……..\
…..change 2 ……. change 3
………… | ………………… |
…….one two ………. me too
……….. |
….. change 4
………..|
…… not two

视觉模式 (visual)
v -> 进入视觉模式
在视觉模式内可以作block的编辑
CTRL-v -> visual block

打印 (print)
:hardcopy -> 打印vim中的内容 (print text)
混合视觉模式 (visual) 可以选择打印的区域
没试过是否可以直接给值打印（应该可以）例如 :1,15hardcopy 打印前15行

将文件写成网页格式 (html)
:source $VIMRUNTIME/syntax/2html.vim -> change current open file to html

格式 (format)
dos/windows跟unix/linux对于文件的结束是不一样的。vim可以直接设定/更改格式
用纸令:set fileformats=unix,dos 可以改变文件的格式 (change format)

:set ff=unix -> 设定文件成unix格式 (set file in unix format)
:set ff=dos -> 设定文件成dos格式 (set file in dos format)
:set ff? -> 检查当前文件格式 (check the format of current file)
如果改变格式，直接:w存档就会存成新的格式了。

加密 (encryption)
vim可以给文件加密码
vim -x 文件名 (filename) -> 输入2次密码，保存后文件每次都会要密码才能进入 (encrypt the file with password)
vim 处理加密文件的时候，并不会作密码验证，也就是说，当你打开文件的时候，vim不管你输入的密码是否正确，直接用密码对本文进行解密。如果密码错误，你看 到的就会是乱码，而不会提醒你密码错误（这样增加了安全性，没有地方可以得知密码是否正确）当然了，如果用一个够快的机器作穷举破解，vim还是可以揭开 的

vim 语法显示 (syntax)
:syntax enable -> 打开语法的颜色显示 (turn on syntax color)
:syntax clear -> 关闭语法颜色 (remove syntax color)
:syntax off -> 完全关闭全部语法功能 (turn off syntax)
:syntax manual -> 手动设定语法 (set the syntax manual, when need syntax use :set syntax=ON)

输入特殊字符 (special character)
CTRL-v 编码就可以了
例如 CTRL-v 273 -> ÿ 得到 ÿ

二进 制文件 (binary file)
vim可以显示，编辑2进位文件

vim -b datafile 
:set display=uhex -> 这样会以uhex显示。用来显示一些无法显示的字符（控制字符之类）(display in uhex play non-display char)

:%!xxd -> 更改当前文件显示为2进位 (change display to binary)
:%!xxd -r -> 更改二进位为text格式 (convert back to text)

自动完成 (auto-completion)
vim本身有自动完成功能（这里不是说ctag，而是vim内建的）
CTRL-p -> 向后搜索自动完成 (search backward)
CTRL-n -> 向前搜索自动完成 (search forward)
CTRL-x+CTRL-o -> 代码自动补全 (code completion)

自动备份 (backup)
vim可以帮你自动备份文件（储存的时候，之前的文件备份出来）
:set backup -> 开启备份，内建设定备份文件的名字是 源文件名加一个 ‘~’ (enable backup default filename+~)
:set backupext=.bak -> 设定备份文件名为源文件名.bak (change backup as filename.bak)

自动备份有个问题就是，如果你多次储存一个文件，那么这个你的备份文件会被不断覆盖，你只能有最后一次存文件之前的那个备份。没关系，vim还提 供了patchmode，这个会把你第一次的原始文件备份下来，不会改动
:set patchmode=.orig -> 保存原始文件为 文件名.orig (keep orignal file as filename.orig)

开启，保存与退出 （save & exit)
:w -> 保存文件 (write file)
:w! -> 强制保存 (force write)
:q -> 退出文件 (exit file without save)
:q! -> 强制退出 (force quite without save)
:e filename -> 打开一个文件名为filename的文件 (open file to edit)
:e! filename -> 强制打开一个文件，所有未保存的东西会丢失 (force open, drop dirty buffer)
:saveas filename -> 另存为 filename (save file as filename)

编辑指令 (edit)
a -> 在光表后插入 (append after cursor)
A -> 在一行的结尾插入 (append at end of the line)
i -> 在光标前插入 (insert before cursor)
I -> 在第一个非空白字符前插入 (insert before first non-blank)
o -> 光标下面插入一个新行 (open line below)
O -> 光标上面插入一个新行 (open line above)
x -> 删除光标下（或者之后）的东西 (delete under and after cursor)
例如x就是删除当前光标下，3x就是删除光标下+光标后2位字符
X -> 删除光标前的字符 (delete before cursor)
d -> 删除 (delete)
可以用dd删除一行，或者3dw删除3个词等等
J -> 将下一行提到这行来 (join line)
r -> 替换个字符 (replace characters)
R -> 替换多个字符 (replace mode – continue replace)
gr -> 不影响格局布置的替换 (replace without affecting layout)
c -> 跟d键一样，但是删除后进入输入模式 (same as “d” but after delete, in insert mode)
S -> 删除一行(好像dd一样）但是删除后进入输入模式 (same as “dd” but after delete, in insert mode)
s -> 删除字符，跟(d)一样，但是删除后进入输入模式 (same as “d” but after delete, in insert mode)
s4s 会删除4个字符，进入输入模式 (delete 4 char and put in insert mode)
~ -> 更改大小写，大变小，小变大 (change case upper-> lower or lower->upper)
gu -> 变成小写 (change to lower case)
例如 guG 会把光标当前到文件结尾全部变成小写 (change lower case all the way to the end)
gU -> 变成大写 (change to upper case)
例如 gUG 会把光标当前到文件结尾全部变成大写 (change upper case all the way to the end)

复制与粘贴 (copy & paste)
y -> 复制 (yank line)
yy -> 复制当前行 (yank current line)
“{a-zA-Z}y -> 把信息复制到某个寄存中 (yank the link into register {a-zA-Z})
例如我用 “ayy 那么在寄存a，就复制了一行，然后我再用“byw复制一个词在寄存b
粘贴的时候，我可以就可以选择贴a里面的东西还是b里面的，这个就好像是多个复制版一样
“*y -> 这个是把信息复制进系统的复制版（可以在其他程序中贴出来）(yank to OS buffer)
p -> 当前光标下粘贴 (paste below)
P -> 当前光标上粘贴 (paste above)
“{a-zA-Z}p -> 将某个寄存的内容贴出来 (paste from register)
例如“ap那么就在当前光标下贴出我之前在寄存a中 的内容。“bP就在当前光标上贴出我之前寄存b的内容
“*p -> 从系统的剪贴板中读取信息贴入vim (paste from OS buffer to vim)
reg -> 显示所有寄存中的内容 (list all registers)

书签 (Mark)
书签是vim中非常强大的一个功能，书签分为文件书签跟全局书签。文件书签是你标记文件中的不同位置，然后可以在文件内快速跳转到你想要的位置。 而全局书签是标记不同文件中的位置。也就是说你可以在不同的文件中快速跳转

m{a-zA-Z} -> 保存书签，小写的是文件书签，可以用(a-z）中的任何字母标记。大写的是全局 书签，用大写的(A-Z)中任意字母标记。(mark position as bookmark. when lower, only stay in file. when upper, stay in global)
‘{a-zA-Z} -> 跳转到某个书签。如果是全局书签，则会开启被书签标记的文件跳转至标记的行 (go to mark. in file {a-z} or global {A-Z}. in global, it will open the file)
’0 -> 跳转入现在编辑的文件中上次退出的位置 (go to last exit in file)
” -> 跳转如最后一次跳转的位置 (go to last jump -> go back to last jump)
‘” -> 跳转至最后一次编辑的位置 (go to last edit)
g’{mark} -> 跳转到书签 (jump to {mark})
:delm{marks} -> 删除一个书签 (delete a mark) 例如:delma那么就删除了书签a
:delm! -> 删除全部书签 (delete all marks)
:marks -> 显示系统全部书签 (show all bookmarks)

标志 (tag)
:ta -> 跳转入标志 (jump to tag)
:ts -> 显示匹配标志，并且跳转入某个标志 (list matching tags and select one to jump)
:tags -> 显示所有标志 (print tag list)

运行外部命令 (using an external program)
:! -> 直接运行shell中的一个外部命令 (call any external program)
:!make -> 就直接在当前目录下运行make指令了 (run make on current path)
:r !ls -> 读取外部运行的命令的输入，写入当然vim中。这里读取ls的输出 (read the output of ls and append the result to file)
:3r !date -u -> 将外部命令date -u的结果输入在vim的第三行中 (read the date -u, and append result to 3rd line of file)

:w !wc -> 将vim的内容交给外部指令来处理。这里让wc来处理vim的内容 (send vim’s file to external command. this will send the current file to wc command)
vim对于常用指令有一些内建，例如wc (算字数）(vim has some buildin functions, such like wc)
g CTRL-G -> 计算当前编译的文件的字数等信息 (word count on current buffer)
!!date -> 插入当前时间 (insert current date)

多个文件的编辑 (edit multifiles)
vim可以编辑多个文件，例如
vim a.txt b.txt c.txt 就打开了3个文件

:next -> 编辑下一个文件 (next file in buffer)
:next! -> 强制编辑下个文件，这里指如果更改了第一个文件 (force to next file in buffer if current buffer changed)
:wnext -> 保存文件，编辑下一个 (save the file and goto next)
:args -> 查找目前正在编辑的文件名 (find out which buffer is editing now)
:previous -> 编辑上个文件 (previous buffer)
:previous! -> 强制编辑上个文件，同 :next! (force to previous buffer, same as :next!)
:last -> 编辑最后一个文件 (last buffer)
:first -> 编辑最前面的文件 (first buffer)
:set autowrite -> 设定自动保存，当你编辑下一个文件的时候，目前正在编辑的文件如果改动，将会自动保存 (automatic write the buffer when you switch to next buffer)
:set noautowrite -> 关闭自动保存 (turn autowrite off)
:hide e abc.txt -> 隐藏当前文件，打开一个新文件 abc.txt进行编辑 (hide the current buffer and edit abc.txt)
:buffers -> 显示所有vim中的文件 (display all buffers)
:buffer2 -> 编辑文件中的第二个 (edit buffer 2)

vim中很多东西可以用简称来写，就不用打字那么麻烦了，例如 :edit=:e, :next=:n 这样.

分屏 (split)
vim提供了分屏功能（跟screen里面的split一样）
:split -> 将屏幕分成2个 (split screen)
:split abc.txt -> 将屏幕分成两个，第二个新的屏幕中显示abc.txt的内容 (split the windows, on new window, display abc.txt)
:vsplit -> 竖着分屏 (split vertically)
:{d}split -> 设定分屏的行数，例如我要一个屏幕只有20行，就可以下:20split (split the windows with {d} line. 20split: open new windows with 3 lines)
:new -> 分屏并且在新屏中建立一个空白文件 (split windows with a new blank file)
CTRL-w+j/k/h/l -> 利用CTRL加w加上j/k/h/l在不同的屏内切换 (switch, move between split screens)
CTRL-w+ -/+ -> 增减分屏的大小 (change split size)
CTRL-w+t -> 移动到最顶端的那个屏 (move to the top windows)
CTRL-w+b -> 移动到最下面的屏 (move to bottom window)
:close -> 关闭一个分出来的屏 (close splited screen)
: only -> 只显示光标当前屏 ，其他将会关闭(only display current active screen, close all others )
:qall -> 退出所有屏 (quite all windows)
:wall -> 保存所有屏 （write to all windows）
:wqall -> 保存并退出所有屏 (write and quite all windows)
:qall! -> 退出所有屏，不保存任何变动 (quite all windows without save)
开启文件的时候，利用 -o选项，就可以直接开启多个文件在分屏中 (with -o option from command line, it will open files and display in split mode)
vim -o a.txt b.txt

今天有人说不会看diff，其实vim也可以用来看diff，这个也是属于分屏的部分，这里也写一下。

vimdiff a.txt b.txt 如果直接给 -d选项是一样的 vim -d a.txt b.txt
:diffsplit abc.txt 如果你现在已经开启了一个文件，想vim帮你区分你的文件跟abc.txt有什么区别，可以在vim中用diffsplit的方式打开第二个文件，这个时 候vim会用split的方式开启第二个文件，并且通过颜色，fold来显示两个文件的区别
这样vim就会用颜色帮你区分开2个文件的区别。如果文件比较大（源码）重复的部分会帮你折叠起来（折叠后面会说）
现在来说patch
:diffpatch filename 通过:diffpatch 你的patch的文件名，就可以以当前文件加上你的patch来显示。vim会split一个新的屏，显示patch后的信息并且用颜色标明区别。
如果不喜欢上下对比，喜欢左右（比较符合视觉）可以在前面加vert，例如：
:vert diffsplit abc.txt
:vert diffpatch abc.txt
看完diff，用: only回到原本编辑的文件，觉 得diff的讨厌颜色还是在哪里，只要用:diffoff关闭就好了。
还有个常用的diff中的就是 :diffu 这个是 :diffupdate 的简写，更新用

TAB
除了split之外， vim还可以用 tab

:tab split filename -> 这个就用tab的方式来显示多个文件 (use tab to display buffers)
gt -> 到下一个tab (go to next tab)
gT -> 到上一个tab (go to previous tab)
vim大多数东西都是可一给数字来执行的，tab也是一样
0gt ->跳到第一个tab (switch to 1st tab)
5gt -> 跳到第五个tab (switch to 5th tab)

关闭所有的tab可以使用qall的指令。另外让vim在启动的时候就自动用tabnew的方式来开启多个文件，可以用alias
linux: 添加 alias vim=’vim -p’ 到 ~/.bashrc
windows: 自己写个vim.bat的文件，然后放在path中，文件内容：
@echo off
vim -p %*
当需要更改多个tab中的文件的时候，可以用 :tabdo 这个指令 这个就相当于 loop 到你的所有的 tab 中然后运行指令。
例如有5个文件都在tab里面，需要更改一个变量名称：abc 到 def， 就可以用 :tabdo %s/abc/def/g 这样所有的5个tab里面的abc就都变成def了
 
折叠 (folding)
vim的折叠功能。。。我记得应该是6版出来的时候才推出的吧。这个对于写程序的人来说，非常有用。
zfap -> 按照段落折叠 (fold by paragraph)
zo -> 打开一个折叠 (open fold)
zc -> 关闭一个折叠 (close fold)
zf -> 创建折叠 (create fold) 这个可以用v视觉模式，可以直接给行数等等
zr -> 打开一定数量的折叠，例如3rz (reduce the folding by number like 3zr)
zm -> 折叠一定数量（之前你定义好的折叠） (fold by number)
zR -> 打开所有的折叠 (open all fold)
zM -> 关闭所有的摺叠 (close all fold)
zn -> 关闭折叠功能 (disable fold)
zN -> 开启折叠功能 (enable fold)
zO -> 将光标下所有折叠打开 (open all folds at the cursor line)
zC -> 将光标下所有折叠关闭 (close all fold at cursor line)
zd -> 将光标下的折叠删除，这里不是删除内容，只是删除折叠标记 (delete fold at cursor line)
zD -> 将光标下所有折叠删除 (delete all folds at the cursor line)
按照tab来折叠，python最好用的 (ford by indent, very useful for python)
:set foldmethod=indent -> 设定后用zm 跟 zr 就可以的开关关闭了 (use zm zr)

保存 (save view)
对于vim来说，如果你设定了折叠，但是退出文件，不管是否保持文件，折叠部分会自动消失的。这样来说非常不方便。所以vim给你方法去保存折 叠，标签，书签等等记录。最厉害的是，vim对于每个文件可以保存最多10个view，也就是说你可以对同一个文件有10种不同的标记方法，根据你的需 要，这些东西都会保存下来。
:mkview -> 保存记录 (save setting)
:loadview -> 读取记录 (load setting)
:mkview 2 -> 保存记录在寄存2 （save view to register 2)
:loadview 3 -> 从寄存3中读取记录 (load view from register 3)

常用指令 (commands)
:set ic ->设定为搜索时不区分大小 写 (search case insensitive)
:set noic ->搜索时区分大小写。 vim内定是这个(case sensitive )
& -> 重复上次的”:s” (repeat previous “:s”)
. -> 重复上次的指令 (repeat last command)
K -> 在man中搜索当前光标下的词 (search man page under cursor)
{0-9}K -> 查找当前光标下man中的章节，例如5K就是同等于man 5 (search section of man. 5K search for man 5)
:history -> 查看命令历史记录 (see command line history)
q: -> 打开vim指令窗口 (open vim command windows)
:e -> 打开一个文件，vim可以开启http/ftp/scp的文件 (open file. also works with http/ftp/scp)
:e http://www.google.com/index.html -> 这里就在vim中打开google的index.html (open google’s index.html)
:cd -> 更换vim中的目录 (change current directory in vim)
:pwd -> 显示vim当前目录 (display pwd in vim)
gf -> 打开文件。例如你在vim中有一行写了#include 那么在abc.h上面按gf，vim就会把abc.h这个文件打开 (look for file. if you have a file with #include , then the cursor is on abc.h press gf, it will open the file abc.h in vim )

记录指令 (record)
q{a-z} -> 在某个寄存中记录指令 (record typed char into register)
q{A-Z} -> 将指令插入之前的寄存器 (append typed char into register{a-z})
q -> 结束记录 (stop recording)
@{a-z} -> 执行寄存中的指令 (execute recording)
@@ -> 重复上次的指令 (repeat previours :@{a-z})
还是给个例子来说明比较容易明白
我现在在一个文件中下qa指令,然后输入itest然后ESC然后q
这里qa就是说把我的指令记录进a寄存，itest实际是分2步，i 是插入 (insert) 写入的文字是 text 然后用ESC退回指令模式q结束记录。这样我就把itest记录再一个寄存了。
下面我执行@a那么就会自动插入test这个词。@@就重复前一个动作，所以还是等于@a

搜索 (search)
vim超级强大的一个功能就是搜索跟替换了。要是熟悉正表达(regular expressions)这个搜索跟后面的替换将会是无敌利器（支持RE的编辑器不多吧）

从简单的说起
# -> 光标下反向搜索关键词 (search the word under cursor backward)
* -> 光标下正向搜索关键词 (search the word under cursor forward)
/ -> 向下搜索 (search forward)
? -> 向上搜索 (search back)
这里可以用 /abc 或 ?abc的方式向上，向下搜索abc
% -> 查找下一个结束，例如在”(“下查找下一个”)”，可以找”()”, “[]” 还有shell中常用的 if, else这些 (find next brace, bracket, comment or #if/#else/#endif)

下面直接用几个例子说话
/a* -> 这个会搜到 a aa aaa
/\(ab\)* -> 这个会搜到 ab abab ababab
/ab\+ -> 这个会搜到 ab abb abbb
/folers\= -> 这个会搜到 folder folders
/ab\{3,5} -> 这个会搜到 abbb abbbb abbbbb
/ab\{-1,3} -> 这个会在abbb中搜到ab (will match ab in abbb)
/a.\{-}b -> 这个会在axbxb中搜到axb (match ‘axb’ in ‘axbxb’)
/a.*b -> 会搜索到任何a开头后面有b的 (match a*b any)
/foo\|bar -> 搜索foo或者bar，就是同时搜索2个词 (match ‘foo’ or ‘bar’)
/one\|two\|three -> 搜索3个词 (match ‘one’, ‘two’ or ‘three’)
/\(foo\|bar\)\+ -> 搜索foo, foobar, foofoo, barfoobar等等 (match ‘foo’, ‘foobar’, ‘foofoo’, ‘barfoobar’ … )
/end\(if\|while\|for\) -> 搜索endif, endwhile endfor (match ‘endif’, ‘endwhile’, ‘endfor’)
/forever\&… -> 这个会在forever中搜索到”for”但是不会在fortuin中搜索到”for” 因为我们这里给了&…的限制 (match ‘for’ in ‘forever’ will not match ‘fortuin’)

特殊字符前面加^就可以 (for special character, user “^” at the start of range)
/”[^"]*”
这里解释一下
” 双引号先引起来 (double quote)
[^"] 任何不是双引号的东西(any character that is not a double quote)
* 所有的其他 (as many as possible)
” 结束最前面的引号 (double quote close)
上面那个会搜到“foo” “3!x”这样的包括引号 (match “foo” -> and “3!x” include double quote)

更多例子，例如搜索车牌规则，假设车牌是 “1MGU103” 也就是说，第一个是数字，3个大写字幕，3个数字的格式。那么我们可以直接搜索所有符合这个规则的字符
(A sample license plate number is “1MGU103″. It has one digit, three upper case
letters and three digits. Directly putting this into a search pattern)
这个应该很好懂，我们搜索
\数字\大写字母\大写字母\大写字母\数字\数字\数字

/\d\u\u\u\d\d\d

另外一个方法，是直接定义几位数字（不然要是30位，难道打30个\u去？）
(specify there are three digits and letters with a count)

/\d\u\{3}\d\{3}

也可以用范围来搜索 (Using [] ranges)
/[0-9][A-Z]\{3}[0-9]\{3}

用到范围搜索，列出一些范围(range)
这个没什么好说了，看一下就都明白了，要全部记住。。。用的多了就记住了，用的少了就忘记了。每次看帮助，呵呵

/[a-z]
/[0123456789abcdef] = /[0-9a-f]
\e
\t
\r
\b
简写 (item matches equivalent)

\d digit [0-9]
\D non-digit [^0-9]
\x hex digit [0-9a-fA-F]
\X non-hex digit [^0-9a-fA-F]
\s white space [ ] ( and )
\S non-white characters [^ ] (not and )
\l lowercase alpha [a-z]
\L non-lowercase alpha [^a-z]
\u uppercase alpha [A-Z]
\U non-uppercase alpha [^A-Z]

:help /[] –> 特殊的定义的，可以在vim中用用help来看 (everything about special)
:help /\s –> 普通的也可以直接看一下 (everything about normal)

替换 (string substitute) – RX
替换其实跟搜索是一样的。只不过替换是2个值，一个是你搜索的东西，一个是搜索到之后要替换的 string substitute (use rx)

%s/abc/def/ -> 替换abc到def (substitute abc to def)
%s/abc/def/c -> 替换abc到def，会每次都问你确定(substitute on all text with confirmation (y,n,a,q,l))
1,5s/abc/def/g -> 只替换第一行到第15行之间的abc到def (substitute abc to def only between line 1 to 5)
54s/abc/def/ -> 只替换第54行的abc到def (only substitute abc to def on line 54)

结合上面的搜索正表达式，这个替换功能。。。就十分只强大。linux中很多地方都是用正表达来做事请的，所以学会了受益无穷。

全局 (global)
这个不知道怎么翻译，反正vim是叫做global，可以对搜索到的东西执行一些vim的命令。我也是2-3个星期前因为读log中一些特殊的东 西，才学会用的。 (find the match pater and execute a command)

global具体自行方法是 g/pattern/command
:g/abc/p -> 查找并显示出只有abc的行 (only print line with “abc” )
:g/abc/d -> 删除所有有abc的行 (delete all line with “abc”)
:v/abc/d -> 这个会把凡是不是行里没有abc的都删掉 (delete all line without “abc”)

信息过滤 (filter)
vim又一强大功能

! -> 用!就是告诉vim，执行过滤流程 (tell vim to performing a filter operation)
!5G -> 从光标下向下5行执行过滤程序 (tell vim to start filter under cursor and go down 5 lines)

正式指令开始，这里用sort来做例子：
!5Gsort -> 从光标下开始执行sort，一共执行5行，就是说我只要sort5行而已 (this will sort the text from cursor line down to 5 lines)
!Gsort -k3 -> 可以直接代sort的参数，我要sort文字中的第三段 (sort to the end of file by column 3)
!! -> 值过滤当前的这行 (filter the current line)

如果觉得!这样的方法5G这样的方法用起来别扭（我是这么觉得），可以用标准的命令模式来做
!其实就是个:.,而已 （to type the command）
:.,start,end!sort 这里定义:.,起始行，结束行!运行指令
:.,$!sort -> 从当前这行一直执行至文件结束 (sort from current line to end)
:.0,$!sort -> 从文件的开始第一个行一直执行到文件结束 (sort from start of file to end)
:.10,15!sort -> 只在文件的第10行到第15行之间执行 (sort between line 10 to 15)