---
title: Github Page Configuration
date: 2023-04-03 10:00:00 +0800
categories: [Tutorial]
tags: [github page]
pin: true
---


## 云端部署

### 创建新网站

使用 Chirpy Starter: 登录Github，访问 [**Chirpy Starter**](https://github.com/cotes2020/chirpy-starter/), 
点击按钮 <kbd>Use this template</kbd> > <kbd>Create a new repository</kbd>, 
新仓库名为 `USERNAME.github.io`, 其中 `USERNAME` 是你的GitHub username

### 检查

创建完成后，源代码将自动生成在仓库中。最好检查文件夹（如 _layouts、_includes 等）是否与原始仓库相同。若有缺失可以将官方的 Git 仓库里对应的文件夹copy过来

### 配置

通常，打开 `_config.yml` 文件并根据需要配置变量。下面一些是典型选项：

- `url`
- `avatar`
- `timezone`

### 部署

在部署开始之前，检查 `_config.yml` 文件并确保 `url` 被正确配置。

配置 *Pages* 的服务. 

1. 访问 GitHub 上之前创建的仓库。*Settings* -> *Pages*，在 *Build and deployment* 下的 **Source**，从下拉菜单中选择 **GitHub Actions**
2. 将任何提交推送到 GitHub 以触发 Actions 工作流程。在仓库的 *Actions* 选项卡中，可以看到名为 *Build and Deploy* 的工作流正在运行。一旦构建完成并且成功，网站将自动部署

## Windows本地编写

本地部署可以更加方便地修改网站内容，实时查看效果，然后再推送到云端。

1. 安装 Git, Ruby, RubyGems. 安装参考: [搭建个人博客(Jekyll+Github)](https://blog.csdn.net/m0_46578941/article/details/126489793)
2. 克隆你的 github.io 仓库
3. cmd 进入仓库目录
4. bundle 安装
```bash 
bundle install
```
   - 如果未响应，尝试切换镜像: 
  ```bash
   bundle config mirror.https://rubygems.org https://gems.ruby-china.com
   ```
5. 启动本地服务
```bash
bundle exec jekyll server
```
6. 浏览器访问: [http://localhost:4000](http://localhost:4000)
7. 云端更新：使用Git Bash或者Github Desktop等，推送 **修改的文件** 到Github仓库

## Codespaces云端编写

如果不想在Windows下部署，或者Windows下部署失败，可以使用Github的 Codespaces 功能，在浏览器中启动服务，实现本地运行。

### 创建 Codespaces
侧边栏选择菜单，点击 `Codespaces`，或者访问：[https://github.com/codespaces](https://github.com/codespaces)，然后点击 `New codespace`，
仓库选择你的 github.io 仓库，机器类型可以选大一点的，比如4核，点击 `Create codespace`，等待创建完成
   ![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202401041357645.png)

### 环境配置
在vscode的Terminal中，执行以下命令：
```bash
sudo apt update && 
sudo apt install build-essential -y && 
sudo apt install nodejs ruby ruby-dev git -y && 
gem install jekyll bundler
```

- 一些坑

   1. 如果安装失败，参考[Ubuntu20.04 安装jekyll](https://blog.csdn.net/zcy_wxy/article/details/136139323)，安装ruby**3.0.2**版本 (博客中的3.1.1貌似不可行)

   2. 如果在root下提示：`Don't run Bundler as root. Installing your bundle as root will break this application for all non-root users on this machine.`，运行下面的命令：
```bash
bundle config --global silence_root_warning 1
```
   
   3. 如果提示编码问题：``[!] There was an error while loading `jekyll-theme-chirpy.gemspec`: invalid byte sequence in US-ASCII. Bundler cannot continue.``，运行下面的命令：
```bash
export LANG="C.UTF-8" && export LC_ALL="C.UTF-8"
```
   也可将其永久设置：写入`~/.bashrc`后
```bash
source ~/.bashrc
```

   4. 解决bundle install太慢的问题：
```bash
bundle config mirror.https://rubygems.org https://gems.ruby-china.com
```

### 启动服务

- bundle 安装
```bash
bundle install
```
- 启动本地服务
```bash
bundle exec jekyll server
```

### 浏览器访问

- 服务启动后，右下角会弹出提示，打开链接即可访问
- 在vscode的Port中，打开浏览器访问
  ![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202401041405408.png)

### 云端更新
![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202401041425922.png)

### 注意事项

- Codespaces使用后需要关闭，否则会一直计费 (访问 [Billing](https://github.com/settings/billing/summary) 查看自己的Codespaces额度)，关闭方法： 

   在 `Codespaces` 页面中，点击 `...`，点击 `Stop Codespaces`，等待关闭

- 官方教程还是读一遍，官方文档给出了撰写文章的格式，整理了官方的文档：[official-tutorials](../official-tutorials/)

## Windows本地编写 + Linux远程服务

服务器宿主机/docker容器配置Jekyll的环境，Windows本地使用vscode远程连接到远程服务。优势在于，相比于Windows和codespace，不需要使用后关闭服务，可以让docker一直运行，随时在本地打开vscode就可以连接开始撰写博客以及预览效果

### 远程配置 (以docker为例)

因为有多人编写博客的需求，因此考虑构建一个基础Jekyll镜像，不同用户可以基于基础镜像去启动自己的Jekyll容器服务。如果没有多人的需求，直接构建一个自己的Jekyll容器即可。

1. 构建基础Jekyll镜像

   - Jekyll的配置参考上文[环境配置](#环境配置)

   - 由于之后需要在Windows本地远程连接容器，所以需要配置SSH，参考前文[CLion Connect Remote Server (Docker)中`安装ssh等服务`的部分](../Clion_Remote_Server/#安装ssh等服务)

   - 容器创建后，退出容器，保存当前容器（容器名假定为 github_page_container）为镜像（镜像名假定为github_page，版本号假定为v3）
   
     ```bash
     sudo docker commit github_page_container github_page:v3
     ```

   - 便捷shell脚本(可选)
     
     在根目录下编写了三个脚本，分别为`start_jekyll.sh`、`stop_jekyll.sh`和`restart_jekyll.sh`，用于快速启动、停止、重启Jekyll服务。注意：脚本需要给写权限，使用时需要修改脚本中自己GitHub Page仓库路径

     `start_jekyll.sh`:

     ```shell
     #!/bin/bash
     
     PAGE_PATH="你的Github Page仓库路径"
     PROGRAM_NAME="jekyll server --host 0.0.0.0"
     PID=$(pgrep -f "$PROGRAM_NAME")
     
     if [ -z "$PID" ]; then
         if [ -z "$PAGE_PATH" ] || [ ! -d "$PAGE_PATH" ]; then
             echo "错误：请编辑该shell脚本，修改PAGE_PATH的路径为自己的Github Page仓库路径。"
             exit 1
         fi
     
         cd $PAGE_PATH
         nohup bundle exec jekyll server --host 0.0.0.0 > ../jekyll_log 2>&1 &
     fi
     ```
     
     `stop_jekyll.sh`:
     ```shell
     #!/bin/bash
     
     PROGRAM_NAME="jekyll server --host 0.0.0.0"
     
     PID=$(pgrep -f "$PROGRAM_NAME")
     
     if [ ! -z "$PID" ]; then
         kill $PID
     else
         echo "Jekyll is not running."
     fi
     ```
     
     `restart_jekyll.sh`:
     ```shell
     #!/bin/bash
     
     PAGE_PATH="你的Github Page仓库路径"
     PROGRAM_NAME="jekyll server --host 0.0.0.0"
     
     if [ -z "$PAGE_PATH" ] || [ ! -d "$PAGE_PATH" ]; then
         echo "错误：请编辑该shell脚本，修改PAGE_PATH的路径为自己的Github Page仓库路径。"
         exit 1
     fi
     
     PID=$(pgrep -f "$PROGRAM_NAME")
     
     if [ ! -z "$PID" ]; then
         kill $PID
         sleep 3
         cd $PAGE_PATH
         nohup bundle exec jekyll server --host 0.0.0.0 > ../jekyll_log 2>&1 &
     else
         echo "Jekyll is not running."
     fi
     ```

2. 创建自己的Jekyll容器

   - 基于前面保存的镜像，创建容器，进入容器

     ```bash
     sudo docker run -itd --privileged --name username_github_page -p xxxxx:4000 -p xxxxx:22 github_page:v3 /bin/bash
     sudo docker exec -it username_github_page bash
     ```
     
     参数说明：`username_github_page`是自己定义的容器名；`github_page:v3`是前面保存的镜像；这里需要配置两个端口，4000是web预览服务的端口，22是SSH的端口，需要对外映射
     
   - 配置Github SSH，参考前文[Server/Docker Gtihub SSH Configuration](../Server_Docker_Github_SSH/)
   
   - 克隆自己的Github Page仓库 (走SSH方式)，进入仓库目录
   
   - 安装bundle
   
     ```bash
     bundle install
     ```
   
   - 启动Jekyll
   
     ```bash
     bundle exec jekyll server --host 0.0.0.0
     ```
   
     也可以后台启动Jekyll，将日志输出到上一级目录下的`jekyll_log`文件中
   
     ```bash
     nohup bundle exec jekyll server --host 0.0.0.0 > ../jekyll_log 2>&1 &
     ```

   - 预览博客效果

     网页访问`服务器ip:端口`，注意这里的端口是创建容器时4000端口对外映射的端口

### 本地连接

- vscode左下角打开远程窗口
- 连接到Host或者连接当前窗口到Host
- 添加新的SSH Host，按照提示输入`ssh root@ip -p 端口`，注意这里的端口是前面创建容器时22端口对外映射的端口
- 输入密码即可连接到容器
- 打开文件夹，输入容器中Github Page仓库所在的路径即可打开，之后即可正常编写，git的管理可以使用vscode，也可以使用命令行

## 写作Tips
先码这了，凑够篇幅再另水一篇
- 交叉引用
   
   在一篇博客里引用自己的其他博客（这里指的是发在Github Page上的博客），超链接部分可以用相对路径：`[](../title)`，其中的 `title` 可以从博客的URL(`https://xxx.github.io/posts/title`)中截取

## 参考

> [Getting-Started-Tutorial](https://chirpy.cotes.page/posts/getting-started/)
> 
> [Jekyll-Github](https://github.com/cotes2020/jekyll-theme-chirpy)
> 
> [Github+Jekyll 搭建个人网站详细教程-简书](https://www.jianshu.com/p/9f71e260925d)
> 
> [Jekyll + Github Pages 搭建个人免费博客-知乎](https://zhuanlan.zhihu.com/p/87225594)
> 
> [2020-08-20-github-page的搭建过程](https://blog.csdn.net/sinat_38816924/article/details/108236046)
> 
> [搭建个人博客(Jekyll+Github)](https://blog.csdn.net/m0_46578941/article/details/126489793)
