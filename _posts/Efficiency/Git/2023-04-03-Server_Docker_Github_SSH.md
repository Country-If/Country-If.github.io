---
title: Server/Docker Gtihub SSH Configuration
date: 2024-01-19 13:00:00 +0800
categories: [Efficiency,Git]
tags: [efficiency,git,linux]
pin: true
---


在服务器/Docker容器上配置ssh，通过ssh方式连接Github

## 服务器端配置

1. 安装Git，ssh等 (已安装可跳过)
```bash
sudo apt update && sudo apt install git openssl openssh-server -y
```

2. Git 用户配置 (已配置可跳过)
```bash
git config --global user.name "YOUR USERNAME"
git config --global user.email "YOUR EMAIL"
```

3. 生成密钥
```bash
ssh-keygen -t rsa -C "YOUR EMAIL"
```
一路回车即可，公钥保存在 `~/.ssh/id_rsa.pub`
```bash
cat ~/.ssh/id_rsa.pub
```
复制公钥信息用于填到Github上

4. 配置 `config` 文件
```bash
vi ~/.ssh/config
```
粘贴以下内容
```bash
Host github.com
User git
Hostname ssh.github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa
Port 443
```

## Github上配置
Github -> Settings -> SSH and GPG keys, 或者访问 [SSH and GPG keys](https://github.com/settings/keys)

添加SSH，`Key` 填入前面复制的公钥，保存，之后便可以通过Github的SSH的链接克隆项目了
