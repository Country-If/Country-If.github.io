---
title: Github自动同步Overleaf
date: 2024-03-20 00:20:30 +0800
categories: [Efficiency,Tools]
tags: [efficiency,latex,git,tools]
pin: true
---


## 前言

- 某天发现不能用IEEE的账号白嫖Overleaf的Premium了
![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202403201954277.png)
- 个人比较需要Overleaf的Premium里的GitHub同步功能
- 项目来源：通过GitHub Actions自动同步Overleaf项目，GitHub：[overleaf_sync_with_git](https://github.com/subhamX/overleaf_sync_with_git)
- 拓展：[Github自动同步ShareLatex](/posts/ShareLatexSync)

## 使用步骤
### Overleaf端——新建项目保存至GitHub
- Premium没过期的话，可以直接在菜单页面上传到GitHub
- Premium过期的话，通过本地同步，或者通过Actions同步 ([LatexDiff](/posts/LatexDiff) 中简述了步骤，此处不赘述)

### Github端——权限、Secrets、Actions
> 通过GitHub的Actions开启定时任务，定期从Overleaf获取文件，完成更新，自动commit以及push

#### 1. 权限
- 给Actions读写权限：
![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202403201943704.png)

#### 2. Secrets
- 创建两个secrets，分别名为 `OVERLEAF_COOKIE` 和 `OVERLEAF_PROJECT_ID`，如下图所示：
![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202403202116660.png)
其中，`OVERLEAF_PROJECT_ID` 为Overleaf打开项目后网址中 `project/` 后的一串标识符，eg：若项目网址为`https://www.overleaf.com/project/abcdefg1234`，则 `OVERLEAF_PROJECT_ID` 为 `abcdefg1234`；`OVERLEAF_COOKIE` 需要通过开发者终端获取，在Overleaf网页上F12，如下图所指位置即为 `OVERLEAF_COOKIE`：
![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202403311019136.png)
> Cookies获取后请勿退出登录Overleaf，否则cookies可能被撤销导致失效
>
> 开发者还建议在获取cookies后，清除当前cookies并通过重新登录以开启一个新会话，保持cookies不需要更新至少维持2个月 (这需要使用到cookie-editor等插件，当然，我并不认为需要这样做，我的actions始于2024.3.20，原有效时间为一周，目前仍正常运行，更新于2024.6.7)

#### 3. Actions
- 在项目的根目录下，创建yml文件，路径为 `.github/workflows/FileName.yml`，`FileName` 可以自定义，yml文件前的路径是固定的，如下所示：

  ![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202403202133340.png)

- 复制粘贴 [YML](https://github.com/Country-If/Country-If/blob/main/public_files/sync_overleaf.yml) 中的内容，其中的cron我设定的是每四小时更新一次，可以自定义，比如：`"30 4,10,16 * * *"` (UTC+8时间的12:30，18:30，0:30)
> 更新了一下YML，更新内容见 [PR](https://github.com/subhamX/overleaf_sync_with_git/pull/9)：1. 更新 actions/upload-artifact 的版本，由v2改为了v4；2. 在任务开始前添加步骤，删除旧的组件，以免过多消耗账号的共享存储额度

- 手动触发一次以启动工作流
![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202403202153114.png)
