---
title: IDEA Connect Remote Server
date: 2023-10-11 23:30:00 +0800
categories: [Remote Control]
tags: [remote control]
pin: false
---

# IDEA远程连接服务器

## SSH配置

## Rsync配置

### Server端 (Ubuntu)

`apt install rsync`

### 本地端 (Windows)

- 官网下载：[https://www.rsync.net/resources/howto/windows_rsync.html](https://www.rsync.net/resources/howto/windows_rsync.html)

  ![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202310112341345.png)

- 解压到本地

- IDEA配置

  - File -> Settings -> Tools -> Rsync

  - Rsync executable path 选 rsync.exe 所在的路径

    ![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202310112345996.png)

  - 至此，rsync安装完成，但是运行时IDEA会报些上传失败的错(但是影响并不是很大)，程序还能正常跑。可以尝试使用后续的方法解决。

  - 在 cwRsync 路径下以管理员方式打开cmd，执行`ssh-keygen.exe -t dsa`，路径建议填在当前路径下，如`./id_dsa`，随后会生成两个文件：`id_dsa`和`id_dsa.pub`，将 pub 文件上传到服务器的 `~/.ssh` 中，执行`cat id_dsa.pub >> authorized_keys` 实现免密登录

    ![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202310112354030.png)

    - 上一步中若找不到`.ssh`文件夹，使用`ssh localhost`命令

      ![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202310120000285.png)

  - 然后需要将`C:/Windows/System32/OpenSSH`中的`ssh.exe`文件复制到`cwRsync`中替换掉`ssh.exe`

  - 最后测试是否成功