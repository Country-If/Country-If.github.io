---
title: Github自动同步ShareLatex
date: 2024-03-22 16:30:30 +0800
categories: [Efficiency,Tools]
tags: [efficiency,latex,git,tools]
pin: false
---


## 前言

- 续上文 [Github自动同步Overleaf](/posts/OverleafSync)，将actions结合国内搭建的Overleaf -- [ShareLatex](https://sharelatex.cstcloud.cn/project)，实现自动同步到GitHub。(Sharelatex支持多人协同编辑，优于普通版Overleaf)
- 项目来源：还是这个项目：[overleaf_sync_with_git](https://github.com/subhamX/overleaf_sync_with_git)，由于大号fork过无法再fork了，用小号fork了一个，魔改成ShareLatex版本：[sharelatex_sync_with_git](https://github.com/MaylonXGT/sharelatex_sync_with_git)
- 大部分配置在上文 [Github自动同步Overleaf](/posts/OverleafSync) 中，本文只简述异同点，配合 [上文](/posts/OverleafSync) 使用

## 使用步骤
### ShareLatex端——新建项目保存至GitHub
- 此处配置与Overleaf一致

### Github端——权限、Secrets、Actions
- 此处的不同点主要在于secrets的名称将Overleaf改为了Sharelatex，以及yml文件的修改

#### 1. 权限
- 给Actions读写权限：
![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202403201943704.png)

#### 2. Secrets
- 创建两个secrets，分别名为 `SHARELATEX_COOKIE` 和 `SHARELATEX_PROJECT_ID`，其中，`SHARELATEX_PROJECT_ID` 和 `SHARELATEX_COOKIE` 的获取方式与 [前文](/posts/OverleafSync) 一样

#### 3. Actions
- 在项目的根目录下，创建yml文件，路径为 `.github/workflows/FileName.yml`，`FileName` 可以自定义，yml文件前的路径是固定的，如下所示：

  ![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202403202133340.png)

- 复制粘贴 [YML](https://github.com/MaylonXGT/sharelatex_sync_with_git/blob/master/sync/Sync.yml) 中的内容，其中的cron我设定的是每四小时更新一次，可以自定义

- 手动触发一次以启动工作流
![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202403202153114.png)
