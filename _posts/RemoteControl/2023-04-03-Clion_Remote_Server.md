---
title: CLion Connect Remote Server (Docker)
date: 2023-04-03 16:00:00 +0800
categories: [Remote Control]
tags: [remote control]
pin: true
---

## 需求
- 为了不混淆生产环境，使用Docker搭建运行环境
- 在本地CLion中编写代码，在远程服务器的Docker里运行代码

## 环境

- Clion装在本地Windows 11
- 远程服务器Ubuntu 20.04

## Clion连接服务器内的Docker


### Docker

- Docker安装 (仅供参考)

  ```bash
  curl -sSL https://get.docker.com/ | sh
  sudo chmod 777 /var/run/docker.sock
  ```

- Docker创建容器
	```shell
	sudo docker run --privileged -it --name helib -p 12022:22 ubuntu:20.04 bash
	```
	命令解释：`--privileged`提高权限，不然可能没办法debug；`--name`指定容器名字；`-p`指定端口，用于服务器端口映射到Docker内端口，由于后续需要通过ssh连接Docker容器，故映射到**22**端口；使用的镜像为ubuntu:20.04，镜像随意；bash指定运行终端
	PS. 可以加个`-v`参数指定挂载目录
	
- 进入Docker后，先退出然后再重启进入（想让容器一直运行不关闭我就这么干的）
	```shell
	在容器内：exit		# 退出后容器也会退出
	sudo docker start helib		# 启动容器
	sudo docker exec -it helib bash		# 进入容器，之后再退出容器也不会退出了
	```
	
- 安装ssh等服务

  - Ubuntu (sudo)
    ```shell
    apt update && apt install openssl openssh-server -y
    ```
    后面依次选6，31
    ```shell
    echo "PermitRootLogin yes" >> /etc/ssh/sshd_config
    ```
    ```shell
    service ssh restart
    ```
    设置Docker容器的root密码，用于后续连接：
    ```shell
    passwd root
    ```
  
  - CentOS (sudo)
  
    ```shell
    yum install openssh-server    # 安装OpenSSH服务
    systemctl enable sshd    # 启动SSH服务并设置为开机启动
    systemctl start sshd
    firewall-cmd --zone=public --add-port=22/tcp --permanent    # 开启SSH端口
    firewall-cmd --reload
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




## 参考
> [以clion为例记录一次基于docker环境配置开发-CSDN](https://blog.csdn.net/xiaomu_347/article/details/126762754)
