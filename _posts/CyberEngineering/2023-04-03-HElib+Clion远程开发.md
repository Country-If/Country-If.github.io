---
title: 云端Docker搭建HElib库以及本地CLion远程开发
date: 2023-04-03 17:00:00 +0800
categories: [Cyber Engineering]
tags: [cyber engineering]
pin: false

---

## 需求
- [HElib](https://github.com/homenc/HElib)库是用C++编写的同态加密开源库，一般在Linux下使用
- 为了不混淆生产环境，使用Docker搭建HElib运行环境
- 本地在Windows下开发，使用的IDE为Clion，本地无HElib运行环境
- 综上，需求是，让CLion连接搭建好HElib的Docker上，在本地CLion中编写代码，在远程服务器的Docker里运行代码



## Docker内配置HElib库
> 参考官方文档：[HElib/INSTALL.md](https://github.com/homenc/HElib/blob/master/INSTALL.md)
- apt安装依赖

  ```bash	
  apt update && apt install git g++ make cmake clang-format m4 patchelf -y
  ```

- 克隆项目，在Docker内或者在Docker外对应挂载的目录下克隆都行

- 按照官网教程编译（编译就行，不需要make install）后，在build路径下会得到一个目录`helib_pack`，建议将其放至全局变量里：`cp -r helib_pack /usr/local`，这样在编译自己写的程序时不需要指定路径，在Clion里也能检测到这些依赖

- 测试部分参考：[HElib/examples/README.md](https://github.com/homenc/HElib/blob/master/examples/README.md)

- 自己编写程序时，注意CMakeList.txt的写法，注意文件路径是否写对，自己编写的程序路径不同，CMakeList就需要修改对应的路径，下面是我的CMakeList，大概能改的地方圈出来了
![CMakeList](/assets/img/144c6834fa6c46449f0f51cd74465eec.png)



## Clion配置

- Clion挂载Docker，详细请移步：[Clion Connect Remote Server (Docker)](../Clion_Remote_Server/)

- 挂载项目目录，修改Mapping

  ![在这里插入图片描述](/assets/img/feda4de96e124c87ba772c0af94ebe93.png)



## 效果

- CLion能够检索到HElib的库

	![lib](/assets/img/1f9f046e0a434844a1752abc2625f9a2.png)
- 代码里导入头文件不报错

	![include](/assets/img/2d8b64ec6d7b4a58b5d42aa656b39311.png)

