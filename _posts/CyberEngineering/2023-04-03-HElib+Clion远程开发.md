---
title: Clion连接Docker远程开发，使用HElib库
date: 2023-04-03 16:00:00 +0800
categories: [Cyber Engineering]
tags: [cyber engineering, remote control]
pin: false

---

## 需求
- [HElib](https://github.com/homenc/HElib)库是用C++编写的同态加密开源库，一般在Linux下使用
- 为了不混淆生产环境，使用Docker搭建HElib运行环境
- 本地在Windows下开发，使用的IDE为Clion，本地无HElib运行环境
- 综上，需求是，让CLion连接搭建好HElib的Docker上，在本地CLion中编写代码，在远程服务器的Docker里运行代码

## Clion连接服务器内的Docker


### Docker

- Docker安装略
- Docker创建容器
	```
	sudo docker run --privileged -it --name helib -p 12022:22 ubuntu:20.04 bash
	```
	命令解释：`--privileged`提高权限，不然可能没办法debug；`--name`指定容器名字；`-p`指定端口，用于服务器端口映射到Docker内端口，由于后续需要通过ssh连接Docker容器，故映射到**22**端口；使用的镜像为ubuntu:20.04，镜像随意；bash指定运行终端
	PS. 可以加个`-v`参数指定挂载目录
- 进入Docker后，先退出然后再重启进入（想让容器一直运行不关闭我就这么干的）
	```
	在容器内：exit		# 退出后容器也会退出
	sudo docker start helib		# 启动容器
	sudo docker exec -it helib bash		# 进入容器，之后再退出容器也不会退出了
	```
- 安装ssh等服务
	```
	apt update
	apt install openssl openssh-server -y
	echo "PermitRootLogin yes" >> /etc/ssh/sshd_config
	service ssh restart
	passwd root		# 设置Docker容器的root密码，用于后续连接
	```
- 测试连接
	- 在Docker外，用ssh测试连接：`ssh root@localhost -p 12022`，输入Docker的root密码，成功如下：![welcome](/assets/img/f7b4d81a3d22432b8bcb8662ef8aecea.png)



### CLion

- Settings -> Build... -> Toolchains -> '+' -> Remote Host
![settings](/assets/img/165066cf44de4621836de6525e2f106e.png)
- 可以自定义名字，然后设置连接
![config](/assets/img/7f1c778c2502492fb30ec445d8c310c1.png)
- 按下图填写，注意port应该填写的是Docker对外映射的端口，我这里就应该是12022，而不是22，测试连接没问题就可以了
![在这里插入图片描述](/assets/img/6bc130135b2b452ba2fa3fd1b23cd6cc.png)
- 设置CMake：Settings -> Build... -> CMake，指定toolchains就行
![cmake-settings](/assets/img/f6a0655272d7428195783316d781e3bb.png)
- 另外，如果想把代码啥的也同步到Docker上，则添加SFTP：Settings -> Build... -> Deployment，添加SFTP，设置Mappings，见下图：
![sftp](/assets/img/21b2dfac7ffe465ea945082dbbbc8d3a.png)
- 下面这个看自己情况设置
![upload](/assets/img/f4ec534460254a08b08ab16047b5f6df.png)

至此，CLion可以顺利连接到服务器里的Docker啦

## Docker内配置HElib库
> 参考官方文档：[HElib/INSTALL.md](https://github.com/homenc/HElib/blob/master/INSTALL.md)
- apt安装依赖：g++, cmake这些
- 克隆项目，在Docker内或者在Docker外对应挂载的目录下克隆都行
- 按照官网教程编译（编译就行，不需要make install）后，在build路径下会得到一个目录`helib_pack`，建议将其放至全局变量里：`cp -r helib_pack /usr/local`，这样在编译自己写的程序时不需要指定路径，在Clion里也能检测到这些依赖
- 测试部分参考：[HElib/examples/README.md](https://github.com/homenc/HElib/blob/master/examples/README.md)

- 自己编写程序时，注意CMakeList.txt的写法，注意文件路径是否写对，自己编写的程序路径不同，CMakeList就需要修改对应的路径，下面是我的CMakeList，大概能改的地方圈出来了
![CMakeList](/assets/img/144c6834fa6c46449f0f51cd74465eec.png)



## 效果

- CLion能够检索到HElib的库

	![lib](/assets/img/1f9f046e0a434844a1752abc2625f9a2.png)
- 代码里导入头文件不报错

	![include](/assets/img/2d8b64ec6d7b4a58b5d42aa656b39311.png)


## 参考
> [以clion为例记录一次基于docker环境配置开发-CSDN](https://blog.csdn.net/xiaomu_347/article/details/126762754)