
Git配置
git config --global user.name "storm"
git config --global user.email "stormzhang.dev@gmail.com"
git config --global color.ui true
git config --global alias.co checkout  # 别名
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.br branch
git config --global core.editor "vim"  # 设置Editor使用vim
git config --global core.quotepath false # 设置显示中文文件名
//用户的git配置文件~/.gitconfig
查看系统config:
git config --system --list
查看当前用户（global）配置:
git config --global  --list
查看当前仓库配置信息:
git config --local  --list

Git常用命令
查看、添加、提交、删除、找回，重置修改文件
git help <command>  # 显示command的help
git show            # 显示某次提交的内容
git show $id

git checkout  -- <file>   # 抛弃工作区修改
git checkout  .           # 抛弃工作区修改

git add <file>      # 将工作文件修改提交到本地暂存区
git add .           # 将所有修改过的工作文件提交暂存区

git rm <file>       # 从版本库中删除文件
git rm <file> --cached  # 从版本库中删除文件，但不删除文件

git reset <file>    # 从暂存区恢复到工作文件
git reset -- .      # 从暂存区恢复到工作文件
git reset --hard    # 恢复最近一次提交过的状态，即放弃上次提交后的所有本次修改

git commit <file>
git commit .
git commit -a           # 将git add, git rm和git ci等操作都合并在一起做
git commit -am "some comments"
git commit --amend      # 修改最后一次提交记录

git revert <$id>    # 恢复某次提交的状态，恢复动作本身也创建了一次提交对象
git revert HEAD     # 恢复最后一次提交的状态
查看文件diff
git diff <file>     # 比较当前文件和暂存区文件差异
git diff            #比较工作区和暂存区的差别
git diff HEAD       #查看工作区和版本库的差别
git diff <$id1> <$id2>   # 比较两次提交之间的差异
git diff <branch1>..<branch2> # 在两个分支之间比较 
git diff --staged   # 比较暂存区和版本库差异
git diff --cached   # 比较暂存区和版本库差异
git diff --stat     # 仅仅比较统计信息
 
查看提交记录
git log
git log <file>      # 查看该文件每次提交记录
git log -p <file>   # 查看每次详细修改内容的diff
git log -p -2       # 查看最近两次详细
tig
Mac上可以使用tig代替diff和log，brew install tig

Git 本地分支管理
查看、切换、创建和删除分支
git branch -r           # 查看远程分支
git branch <new_branch> # 创建新的分支
git branch -v           # 查看各个分支最后提交信息
git branch --merged     # 查看已经被合并到当前分支的分支
git branch --no-merged  # 查看尚未被合并到当前分支的分支

git checkout <branch>     # 切换到某个分支
git checkout -b <new_branch> # 创建新的分支，并且切换过去
git checkout -b <new_brancranch>  # 基于branch创建新的new_branch

git checkout $id          # 把某次历史提交记录checkout出来，但无分支信息，切换到其他分支会自动删除
git checkout $id -b <new_branch>  # 把某次历史提交记录checkout出来，创建成一个分支

git branch -d <branch>  # 删除某个分支
git branch -D <branch>  # 强制删除某个分支 (未被合并的分支被删除的时候需要强制)
分支合并和rebase
git merge <branch>               # 将branch分支合并到当前分支
git merge origin/master --no-ff  # 不要Fast-Foward合并，这样可以生成merge提交

git rebase master <branch>       # 将master rebase到branch，相当于：
git checkout <branch> && git rebase master && git checkout master && git merge <branch>
Git补丁管理(方便在多台机器上开发同步时用)
git diff > ../sync.patch         # 生成补丁
git apply ../sync.patch          # 打补丁
git apply --check ../sync.patch  # 测试补丁能否成功
Git暂存管理
git stash                        # 暂存
git stash list                   # 列所有stash
git stash apply                  # 恢复暂存的内容
git stash drop                   # 删除暂存区
git stash clear
Git远程分支管理
git pull                         # 抓取远程仓库所有分支更新并合并到本地
git pull --no-ff                 # 抓取远程仓库所有分支更新并合并到本地，不要快进合并
git fetch origin                 # 抓取远程仓库更新
git merge origin/master          # 将远程主分支合并到本地当前分支
git checkout --track origin/branch     # 跟踪某个远程分支创建相应的本地分支
git checkout -b <local_branch> origin/<remote_branch>  # 基于远程分支创建本地分支，功能同上

git push                         # push所有分支
git push origin master           # 将本地主分支推到远程主分支
git push -u origin master        # 将本地主分支推到远程(如无远程主分支则创建，用于初始化远程仓库)
git push origin <local_branch>   # 创建远程分支， origin是远程仓库名
git push origin <local_branch>:<remote_branch>  # 创建远程分支
git push origin :<remote_branch>  #先删除本地分支(git branch -d <branch>)，然后再push删除远程分支
Git远程仓库管理
git remote -v                    # 查看远程服务器地址和仓库名称
git remote show origin           # 查看远程服务器仓库状态
git remote add origin git@github:stormzhang/demo.git         # 添加远程仓库地址
git remote set-url origin git@github.com:stormzhang/demo.git # 设置远程仓库地址(用于修改远程仓库地址
创建远程仓库
git clone --bare robbin_site robbin_site.git  # 用带版本的项目创建纯版本仓库
scp -r my_project.git git@git.csdn.net:~      # 将纯仓库上传到服务器上

mkdir robbin_site.git && cd robbin_site.git && git --bare init # 在服务器创建纯仓库
git remote add origin git@github.com:robbin/robbin_site.git    # 设置远程仓库地址
git push -u origin master                                      # 客户端首次提交
git push -u origin develop  # 首次将本地develop分支提交到远程develop分支，并且track

git remote set-head origin master   # 设置远程仓库的HEAD指向master分支
也可以命令设置跟踪远程库和本地库

git branch --set-upstream master origin/master
git branch --set-upstream develop origin/develop

***********************************************************************************************************
创建
复制一个已创建的仓库:

$ git clone ssh://user@domain.com/repo.git
创建一个新的本地仓库:

$ git init
本地修改
显示工作路径下已修改的文件：

$ git status
显示与上次提交版本文件的不同：

$ git diff
把当前所有修改添加到下次提交中：

$ git add
把对某个文件的修改添加到下次提交中：

$ git add -p <file>
提交本地的所有修改：

$ git commit -a
提交之前已标记的变化：

$ git commit
附加消息提交：

$ git commit -m 'message here'
提交，并将提交时间设置为之前的某个日期:

git commit --date="`date --date='n day ago'`" -am "Commit Message"
修改上次提交
请勿修改已发布的提交记录!

$ git commit --amend
把当前分支中未提交的修改移动到其他分支

git stash
git checkout branch2
git stash pop
搜索
从当前目录的所有文件中查找文本内容：

$ git grep "Hello"
在某一版本中搜索文本：

$ git grep "Hello" v2.5
提交历史
从最新提交开始，显示所有的提交记录（显示hash， 作者信息，提交的标题和时间）：

$ git log
显示所有提交（仅显示提交的hash和message）：

$ git log --oneline
显示某个用户的所有提交：

$ git log --author="username"
显示某个文件的所有修改：

$ git log -p <file>
谁，在什么时间，修改了文件的什么内容：

$ git blame <file>
分支与标签
列出所有的分支：

$ git branch
切换分支：

$ git checkout <branch>
创建并切换到新分支:

$ git checkout -b <branch>
基于当前分支创建新分支：

$ git branch <new-branch>
基于远程分支创建新的可追溯的分支：

$ git branch --track <new-branch> <remote-branch>
删除本地分支:

$ git branch -d <branch>
给当前版本打标签：

$ git tag <tag-name>
更新与发布
列出当前配置的远程端：

$ git remote -v
显示远程端的信息：

$ git remote show <remote>
添加新的远程端：

$ git remote add <remote> <url>
下载远程端版本，但不合并到HEAD中：

$ git fetch <remote>
下载远程端版本，并自动与HEAD版本合并：

$ git remote pull <remote> <url>
将远程端版本合并到本地版本中：

$ git pull origin master
将本地版本发布到远程端：

$ git push remote <remote> <branch>
删除远程端分支：

$ git push <remote> :<branch> (since Git v1.5.0)
或
git push <remote> --delete <branch> (since Git v1.7.0)
发布标签:

$ git push --tags
合并与重置
将分支合并到当前HEAD中：

$ git merge <branch>
将当前HEAD版本重置到分支中:
请勿重置已发布的提交!

$ git rebase <branch>
退出重置:

$ git rebase --abort
解决冲突后继续重置：

$ git rebase --continue
使用配置好的merge tool 解决冲突：

$ git mergetool
在编辑器中手动解决冲突后，标记文件为已解决冲突

$ git add <resolved-file>
$ git rm <resolved-file>
撤销
放弃工作目录下的所有修改：

$ git reset --hard HEAD
移除缓存区的所有文件（i.e. 撤销上次git add）:

$ git reset HEAD
放弃某个文件的所有本地修改：

$ git checkout HEAD <file>
重置一个提交（通过创建一个截然不同的新提交）

$ git revert <commit>
将HEAD重置到指定的版本，并抛弃该版本之后的所有修改：

$ git reset --hard <commit>
将HEAD重置到上一次提交的版本，并将之后的修改标记为未添加到缓存区的修改：

$ git reset <commit>
将HEAD重置到上一次提交的版本，并保留未提交的本地修改：

$ git reset --keep <commit>

**************************************************************************

$ git branch -m templocal feature/dataquery
分支templocal改名为feeature/dataquery

// $ git push --set-upstream origin feature/dataquery
// 将feature/dataquery分支push到远端并创建分支
git push -u origin feature/dataquery
第一次push，创建并绑定远程分支 -u

**************************************************************************

1) 远程仓库相关命令
检出仓库：$ git clone git://github.com/jquery/jquery.git
查看远程仓库：$ git remote -v
添加远程仓库：$ git remote add [name] [url]
删除远程仓库：$ git remote rm [name]
修改远程仓库：$ git remote set-url --push[name][newUrl]
拉取远程仓库：$ git pull [remoteName] [localBranchName]
推送远程仓库：$ git push [remoteName] [localBranchName]
 
2）分支(branch)操作相关命令
查看本地分支：$ git branch
查看远程分支：$ git branch -r
创建本地分支：$ git branch [name] ----注意新分支创建后不会自动切换为当前分支
切换分支：$ git checkout [name]
创建新分支并立即切换到新分支：$ git checkout -b [name]
删除分支：$ git branch -d [name] ---- -d选项只能删除已经参与了合并的分支，对于未有合并的分支是无法删除的。如果想强制删除一个分支，可以使用-D选项
合并分支：$ git merge [name] ----将名称为[name]的分支与当前分支合并
创建远程分支(本地分支push到远程)：$ git push origin [name]
删除远程分支：$ git push origin :heads/[name]
我从master分支创建了一个issue5560分支，做了一些修改后，使用git push origin master提交，但是显示的结果却是'Everything up-to-date'，发生问题的原因是git push origin master 在没有track远程分支的本地分支中默认提交的master分支，因为master分支默认指向了origin master 分支，这里要使用git push origin issue5560：master 就可以把issue5560推送到远程的master分支了。

    如果想把本地的某个分支test提交到远程仓库，并作为远程仓库的master分支，或者作为另外一个名叫test的分支，那么可以这么做。

$ git push origin test:master         // 提交本地test分支作为远程的master分支 //好像只写这一句，远程的github就会自动创建一个test分支
$ git push origin test:test              // 提交本地test分支作为远程的test分支

如果想删除远程的分支呢？类似于上面，如果:左边的分支为空，那么将删除:右边的远程的分支。

$ git push origin :test              // 刚提交到远程的test将被删除，但是本地还会保存的，不用担心
3 版本(tag)操作相关命令
查看版本：$ git tag
创建版本：$ git tag [name]
删除版本：$ git tag -d [name]
查看远程版本：$ git tag -r
创建远程版本(本地版本push到远程)：$ git push origin [name]
删除远程版本：$ git push origin :refs/tags/[name]
 
4 子模块(submodule)相关操作命令
添加子模块：$ git submodule add [url] [path]
如：$ git submodule add git://github.com/soberh/ui-libs.git src/main/webapp/ui-libs
初始化子模块：$ git submodule init ----只在首次检出仓库时运行一次就行
更新子模块：$ git submodule update ----每次更新或切换分支后都需要运行一下
删除子模块：（分4步走哦）
1 $ git rm --cached [path]
2  编辑“.gitmodules”文件，将子模块的相关配置节点删除掉
3  编辑“.git/config”文件，将子模块的相关配置节点删除掉
4  手动删除子模块残留的目录
 
5 忽略一些文件、文件夹不提交
在仓库根目录下创建名称为“.gitignore”的文件，写入不需要的文件夹名或文件，每个元素占一行即可，如
target
bin
*.db
 
 
git操作-删除文件
日期:2012-05-20 来源: bg090721 分享至:
 

git删除文件

rm add2.txt

git rm add2.txt

git commit -m "rm test"

git push web

 

-----------at server

cd /var/www/foo.git;sudo git update-server-info

 

------------检查删除效果

cd;rm foo3 -rf;git clone http://[某ip]/foo.git foo3

 

------------更新已经存在的local code

cd;cd foo2

git remote add web [某user]@[某ip]:/var/www/foo.git/

git pull web master