---
title: Windows实时编译Latex
date: 2024-12-04 18:30:30 +0800
categories: [Efficiency,Tools]
tags: [efficiency,latex,tools]
pin: false
---


## 前言

- 在Windows中的vscode使用 texpresso-vscode 插件，在WSL(windows subsystem linux)中配置 texpresso，实现在Windows实时编译latex
- 项目来源
  > [let-def/texpresso](https://github.com/let-def/texpresso)
  > 
  > [DominikPeters/texpresso-vscode](https://github.com/DominikPeters/texpresso-vscode)

## 方法1：从零搭建
### WSL

#### 1. 在Windows中安装WSL2

  - 开启Windows的功能

    参考：[windows11 安装WSL2全流程](https://blog.csdn.net/u011119817/article/details/130745551) 的 `1.2 使用图形界面`

  - 升级到WSL2
  
    将版本从WSL1升级到WSL2

    ```bash
    wsl --install
    ```

    上面命令执行后会下载Ubuntu，也可以自定义下载其他版本的Ubuntu，如

    ```bash
    wsl --install -d Ubuntu-20.04
    ```
  
    可以通过以下命令查看wsl状态
    ```bash
    wsl -l -v
    ```

    启动WSL
    ```bash
    dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
    ```

    启动虚拟机功能
    ```bash
    dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
    ```

    设置WSL2为默认版本
    ```bash
    wsl --set-default-version 2
    ```

#### 2. 安装texpresso

   > [官方文档](https://github.com/let-def/texpresso/blob/main/INSTALL.md)

  - 安装依赖
  
    ```bash
    sudo apt update && sudo apt install build-essential libsdl2-dev libmupdf-dev libmujs-dev libfreetype-dev  libgumbo-dev libjbig2dec0-dev libjpeg-dev libopenjp2-7-dev cargo libssl-dev libfontconfig-dev libleptonica-dev libharfbuzz-dev -y
    ```

  - 克隆整个项目

    ```bash
    git clone --recurse-submodules https://github.com/let-def/texpresso.git
    ```

  - 构建texpresso与texpresso-tonic

    ```bash
    cd texpresso && make texpresso && make texpresso-tonic
    ```

  - 测试
    ```bash
    ./build/texpresso test/simple.tex
    ```

### Windows

- 配置

  vscode需要安装插件：texpresso 与 wsl。需要修改texpresso的设置，修改 Paht to the texpresso binary 为 wsl 中texpresso可执行文件的路径，如`/home/user/texpresso/build/texpresso`；另外还需勾选 use WSL

- 使用

  使用快捷键 ctrl shift p，键入命令：`texpresso: start Document`，回车，初次编译可能较慢，需要等待完全编译完再继续编辑。鼠标和键盘的控制快捷键参考：[Viewer Controls](https://github.com/let-def/texpresso/?tab=readme-ov-file#viewer-controls)

- 撰写注意

  1. 本地编译时需要加以下命令，修复字体错误：

     ```latex
     \usepackage{newtxtext}
     \usepackage{newtxmath}
     ```

  2. 中文支持，使用Ctex

     ```latex
     \documentclass[UTF8]{ctexart}
     ```

## 方法2：使用已搭建好的环境
方法2是建立在方法1的基础上，即需要其他人使用方法1构建环境后，将其环境导出，再进行导入使用

### WSL

- 导出

  在使用方法1配置成功的机器上，启动cmd，执行导出命令：

  ```bash
  wsl --export 镜像名 导出路径
  ```

- 导入
  
  需要安装WSL2，参考方法1中的步骤

  导入环境，启动cmd，执行导入命令：
  
  ```bash
  wsl --import wsl名称 存储的文件夹路径 tar文件的路径 --version 2
  ```

  如 `wsl --import Ubuntu D:\Ubuntu D:\Ubuntu\t.tar --version 2`

  导入后可以自行配置WSL，如添加用户等，参考：[Win10安装并迁移WSL2 + 实现WSL2图形桌面 + 常用配置](https://www.cnblogs.com/solo666/p/18209875)

### Windows
- 通过这种方式无法像方法1一样，Windows的vscode无法调用WSL中的texpresso，解决办法是，vscode左下角 -> connect to WSL using Distro... -> 选中刚导入的wsl

- 同样需要安装texpresso插件，设置上，路径仍然设置为texpresso可执行文件的路径，但是不要勾选 use WSL

## 参考
- [win10重新安装导出的WSL2镜像](https://cloud.tencent.com/developer/article/1792943)
- [如何使用 WSL 在 Windows 上安装 Linux](https://learn.microsoft.com/zh-cn/windows/wsl/install)
- [解决"wsl: 检测到 localhost 代理配置，但未镜像到 WSL。NAT 模式下的 WSL 不支持 localhost 代理"](https://www.cnblogs.com/hg479/p/17869109.html)