---
title: IDEA Connect Remote Server
date: 2023-10-11 23:30:00 +0800
categories: [Remote Control]
tags: [remote control,jetbrains]
pin: false
---


# IDEA远程连接服务器

## 环境

- IDEA装在本地Windows 11
- 远程服务器Ubuntu 20.04

## 前言

- 实现的功能是，用本地的JDK编译代码，将class文件上传到服务器上运行
- 服务器上必需：rsync(可以不用，配Windows感觉鸡肋), openssh-server, openssl
- 本地(Windows)必需：cwRsync(Windows的很鸡肋), IDEA
- 网上看到了很多教程要很多配置，但是其实并不需要，只需装核心的依赖，但因实现了，也就记录了

## Rsync配置 (忽略)

### Server端 (Ubuntu)

- 安装

  ```bash
  apt install rsync
  ```

- Rsync配置 (可以不配置)

  ```bash
  vi /etc/rsyncd.conf
  ```

  粘贴以下代码：

  ```
  uid = 0
  gid = 0
  port = 873
  fake super = yes
  use chroot = no
  max connections = 200
  timeout = 600
  ignore errors = no
  read only = no
  list = false
  auth users = star
  secrets file = /etc/rsyncd.secrets
  log file = /var/log/rsyncd.log
  
  [public]
  comment = welcome to oldboyedu backup!
  path = /tmp/public
  ```

### 本地端 (Windows)

- 官网下载：[https://www.rsync.net/resources/howto/windows_rsync.html](https://www.rsync.net/resources/howto/windows_rsync.html)

  ![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202310112341345.png)

- 解压到本地

- IDEA配置

  - File -> Settings -> Tools -> Rsync

  - Rsync executable path 选 rsync.exe 所在的路径

    ![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202310132105179.png)

  - 在后续SSH配置中可以查看是否配置成功

## SSH配置

### 服务器上配置

- SSH的配置，移步：[Clion Connect Remote Server (Docker)](../Clion_Remote_Server/)
- JDK安装 (jdk 1.8)
```bash
apt update && apt install openjdk-8-jdk
```

### 本地IDEA配置

1. 添加SSH

   - Editor Configurations -> Manage Targets -> Add SSH, 填写Host, Port(Docker的话填容器22端口对外映射的宿主机端口), Username, Password

   - 勾选Use rsync(也可以不勾)，填写项目在服务器上的路径，选择JDK路径以及JDK版本(不填也可以)

     ![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202310132248853.png)

     - JDK路径查看 (能跑起来不报错就可以不管这个)

       ```bash
       which java		# 查看Java路径，可能是软链接，是软链接的话就用 ls -l 一直查找下去，直到非软链接为止
       ```

       如下圈出部分为JDK路径：

       ![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202310132253582.png)

     - JDK版本查看

       ```bash
       java -version
       ```

   - 配置后测试连接

     ![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202310132256840.png)

2. 检查配置

   Runs on选择刚添加的target，检查路径等

   ![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202310132259875.png)

#### Rsync的其他配置

网上看到关于Rsync的很多配置，下面给出一些，如果配置失败的话就尝试下面的方法：

1. 免密登录

   - 在 cwRsync 路径下以管理员方式打开cmd，执行`ssh-keygen.exe -t dsa`，路径建议填在当前路径下，如`./id_dsa`，随后会生成两个文件：`id_dsa`和`id_dsa.pub`，将 pub 文件上传到服务器的 `~/.ssh` 中，执行`cat id_dsa.pub >> authorized_keys` 实现免密登录

     ![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202310112354030.png)

     - 上一步中若找不到`.ssh`文件夹，使用`ssh localhost`命令 (若没有ssh则执行`apt intall openssh-client`)

       ![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202310120000285.png)


2. ssh.exe (不建议)

- 将`C:/Windows/System32/OpenSSH`中的`ssh.exe`文件复制到`cwRsync`中替换掉`ssh.exe`

## 最后

- 相比起Jetbrains的其他产品，如CLion和Pycharm，由于Windows和Linux路径定义和符号规则等差异，Windows下的IDEA连接远程服务器使用起来并不方便，Rsync配置后也还是鸡肋，因此建议还是在Mac下或者Linux虚拟机里使用IDEA

## 参考

> [IDEA Run Target远程执行Java & Debug-CSDN](https://blog.csdn.net/chike0039/article/details/120862392)
>
> [rsync常见问题及解决办法-简书](https://www.jianshu.com/p/31cef3e2a923)