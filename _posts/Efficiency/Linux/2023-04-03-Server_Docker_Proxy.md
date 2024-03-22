---
title: Server/Docker Use Proxy
date: 2024-01-19 12:00:00 +0800
categories: [Efficiency,Linux]
tags: [efficiency,linux,docker]
pin: false
---


## Linux下使用代理

> [clash-for-linux-backup](https://github.com/Elegycloud/clash-for-linux-backup)

### 宿主机
#### 配置流程
1. 克隆该项目
```bash
git clone https://github.com/Elegycloud/clash-for-linux-backup.git
```
如果克隆失败可以在官网下载安装包到服务器上解压

2. 进入项目目录，编辑 `.env` 文件
```bash
cd clash-for-linux && vi .env
```

填写其中的 `CLASH_URL`，该值为自己的梯子订阅地址

3. 在项目目录内运行 `start.sh`，这里使用bash运行，且最好在root用户下或者sudo提权
```bash
sudo bash start.sh
```

4. 启动成功后加载环境变量
```bash
source /etc/profile.d/clash.sh
```

之后便可以通过 `proxy_on` 和 `proxy_off` 开启和关闭代理

#### 配置检查
- 检查服务端口是否正常启动，正常启动应该能监听到 9090 以及 7890-7892 端口
```bash
netstat -tln | grep -E '9090|789.'
```

- 检查环境变量
```bash
env | grep -E 'http_proxy|https_proxy'
```
出现以下提示为正常
```
http_proxy=http://127.0.0.1:7890
https_proxy=http://127.0.0.1:7890
```

#### 网页访问
1. 网页访问 `http://<ip>:9090/ui`, 这里的`<ip>`是服务器的ip，完整如：`http://10.2.34.56:9090/ui`

2. 在 `API Base URL` 中输入 `http://<ip>`，`Secret(optional)` 中填写 `start.sh` 运行后输出的 Secret

3. 然后Add，之后便可通过网页进行配置


### Docker
- Docker与宿主机运行的区别在于端口的映射，Docker容器创建时，应该使用 `-p` 参数映射端口，内部端口可以是默认要求的9090,7890-7892，也可以自定义端口后再到容器里修改配置文件，这里先给出前者的配置，后续有空再补坑

- 假设以 `-p 19090:9090 -p 17890-17892:7890-7892` 创建容器，按照与宿主机相同的配置方法后，网页端访问的URL为：`http://<ip>:19090/ui`，即通过容器9090端口对外映射的端口进行访问，完整如：`http://10.2.34.56:19090/ui`，`API Base URL` 同理使用对外的端口进行访问，即 `http://<ip>:19090`
