---
title: 更适合中国宝宝的docker技巧
date: 2024-07-29 10:00:00 +0800
categories: [Efficiency,Linux]
tags: [efficiency,linux,docker]
pin: false
---

## 容器环境配置

### 前言

连着几天搭了 [RVC](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI)，[facefusion](https://github.com/facefusion/facefusion-docker)，[stable-diffusion](https://github.com/AbdBarho/stable-diffusion-webui-docker)，踩了些坑，记录下自己搭建过程中的tips

### docker compose 与 docker run 结合
- 使用docker run创建容器后配置环境过于繁琐。懒人做法通常是直接基于Dockerfile创建容器，但这样很容易在构建过程中断。因此折衷的办法是，将较简单但冗余的步骤交给docker compose完成，剩下一些难解决的问题，留待docker compose创建容器后，进入容器再细细配置
- 亦或是，基于docker compose创建的容器，保存为镜像，再使用docker run继续搭建环境。在搭建facefusion的时候，由于模型未下载完全，docker compose创建的容器启动一直失败，解决办法是，将其保存为镜像，再使用docker run创建容器，继续配置

### 换源 & 镜像站

#### pip换源
1. Dockerfile中永久换源

   ```dockerfile
   RUN pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
   ```
2. Dockerfile中临时换源

   包的安装命令带上`-i`参数。有些源使用清华源下载较快，但也有的的包清华源没有(搭建stable-diffusion时清华源就没有tb-nightly)，这时候需要使用官方的包

   - 清华源

     ```bash
     https://pypi.tuna.tsinghua.edu.cn/simple
     ```

   - 官方源

     ```bash
     https://pypi.org/simple
     ```

#### git换源
1. 仓库

     不要在一棵树上吊死，github访问多次超时的话，尝试去[gitee](https://gitee.com/)找其他人的复制版，将克隆的url改到Dockerfile中

2. releases

     遇到releases中特别难下载的模型时，复制待下载文件的地址，到[doget](https://doget.nocsdn.com/#/)，获取高速下载链接，将链接替换掉Dockerfile中对应releases文件的下载链接

#### hugging face镜像站
hugging face模型的下载是最头大的，模型基本都超过1G，还被墙，下载慢的一，折腾了巨久

1. 整个克隆
    
    如果hugging face的文件较多，需要获取整个仓库，那么参考以下链接：
    
    > [如何快速下载huggingface大模型](https://padeoe.com/huggingface-large-models-downloader/)
    >
    > [下载huggingface上模型的正确姿势](https://blog.csdn.net/ljp1919/article/details/125977360)
    
    我本人尝试过huggingface-cli和git clone，偏向前者吧

2. 单独下载
    
    如果只需要部分文件，那最简单的方式是直接在hugging face网页点击下载按钮下载到本地，再拷贝或者挂载到容器内。这里有个下载的小技巧，可以去hugging face的镜像站下载，如：[hf-mirror](https://hf-mirror.com/)。也可以在容器内配置环境：`export HF_ENDPOINT=https://hf-mirror.com`

### 容器外下载
在外部机器(windows)或者linux宿主机下载文件比在容器内下载要方便的多，可以预先将部分难下载的文件下载到本地，再通过`docker cp`拷贝或者`docker run -v`在创建容器时将目录挂载到容器，或者在Dockerfile中定义挂载目录

## docker日常使用
### docker run 参数
- 给够权限

  ```bash
  --privileged
  ```

- 使用GPU (N卡)
  
  ```bash
  --gpus all -e NVIDIA_DRIVER_CAPABILITIES=compute,utility -e NVIDIA_VISIBLE_DEVICES=all
  ```
