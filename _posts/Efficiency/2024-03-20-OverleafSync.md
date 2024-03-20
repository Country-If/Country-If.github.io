---
title: Github自动同步Overleaf
date: 2024-03-20 00:20:30 +0800
categories: [Efficiency]
tags: [efficiency, latex]
pin: false

---

## 前言

- 某天发现不能用IEEE的账号白嫖Overleaf的Premium了
![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202403201954277.png)
- 个人比较需要Overleaf的Premium里的GitHub同步功能
- 项目来源：通过GitHub Actions自动同步Overleaf项目，GitHub：[overleaf_sync_with_git](https://github.com/subhamX/overleaf_sync_with_git)

## 使用步骤
### Overleaf端——新建项目保存至GitHub
- Premium没过期的话，可以直接在菜单页面上传到GitHub
- Premium过期的话，只能先将项目下载到本地，再上推到GitHub ([LatexDiff](/posts/LatexDiff) 中简述了步骤，此处不赘述)

### Github端——权限、Secrets、Actions
> 通过GitHub的Actions开启定时任务，定期从Overleaf获取文件，完成更新，自动commit以及push

#### 1. 权限
- 给Actions读写权限：
![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202403201943704.png)

#### 2. Secrets
- 创建两个secrets，分别名为 `OVERLEAF_COOKIE` 和 `OVERLEAF_PROJECT_ID`，如下图所示：
![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202403202116660.png)
其中，`OVERLEAF_PROJECT_ID` 为Overleaf打开项目后网址中 `project/` 后的一串标识符，eg：若项目网址为`https://www.overleaf.com/project/abcdefg1234`，则 `OVERLEAF_PROJECT_ID` 为 `abcdefg1234`；`OVERLEAF_COOKIE` 需要通过开发者终端获取，在Overleaf网页上F12，如下图所指位置即为 `OVERLEAF_COOKIE`：
![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202403202125833.png)
(另外还能看到该cookies过期的时间，cookies过期后需要重新获取更新该secret值)

#### 3. Actions
- 在项目的根目录下，创建yml文件，路径为 `.github/workflow/FileName.yml`，`FileName` 可以自定义，yml文件前的路径是固定的，如下所示：

  ![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202403202133340.png)

- 复制粘贴 [YML](https://github.com/Country-If/overleaf_sync_with_git/blob/master/YML.yml) 中的内容，其中的cron我设定的是每四小时更新一次，可以自定义

- 手动触发一次以启动工作流
![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202403202153114.png)
