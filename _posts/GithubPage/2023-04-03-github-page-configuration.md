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

## Windows 本地运行

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

## Codespaces 本地运行

如果不想在Windows下部署，或者Windows下部署失败，可以使用Github的 Codespaces 功能，在浏览器中启动服务，实现本地运行。

### 创建 Codespaces
侧边栏选择菜单，点击 `Codespaces`，或者访问：[https://github.com/codespaces](https://github.com/codespaces)，然后点击 `New codespace`，
仓库选择你的 github.io 仓库，机器类型可以选大一点的，比如4核，点击 `Create codespace`，等待创建完成
   ![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202401041357645.png)

### 环境配置
在vscode的Terminal中，执行以下命令：
```bash
sudo apt-get update && 
sudo apt-get install build-essential && 
sudo apt-get install nodejs ruby ruby-dev git -y && 
gem install jekyll bundler
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

### 写作Tips
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
