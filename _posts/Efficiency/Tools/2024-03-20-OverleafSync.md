---
title: Github自动同步Overleaf
date: 2024-03-20 00:20:30 +0800
categories: [Efficiency,Tools]
tags: [efficiency,latex,git,tools]
pin: false
---


## TODO

### 该Action占用github的shared storage问题

- 这个TODO比较急，但是暂时没时间整，先记录，写在了前面，这边建议按此教程配置的**先停用对应的工作流**，以免造成额度浪费，待我有空更新解决方案 😭
- 通过usage report，我发现action中的upload-artifact这个组件会使用shared storage，目前我的处理方法：先disable该同步的工作流，我修改了其中的cron，从一天四次改为一天一次
- 另外，我注意到，actions/upload-artifact已经发布最新版本v4，而当前还在使用v2，不清楚新版本有无对shared storage做优化，但是也更新一下版本，新yml配置见 [YML](https://github.com/Country-If/Country-If/blob/main/public_files/sync_overleaf.yml)
- 查阅了一些方案，可能的解决办法如下：
  1. 修改artifact存储时间：对应仓库settings -> Actions -> General -> Artifact and log retention -> 从原先 90 days 改为 3 days
  2. 使用action在每次执行任务前先删除旧的artifact，参考：[stackoverflow](https://stackoverflow.com/questions/70730786/github-actions-create-artifact-container-failed-artifact-storage-quota-has-b/76859008#76859008)
  
  ```script
    - name: Delete Old Artifacts
    uses: actions/github-script@v6
    id: artifact
    with:
      script: |
        const res = await github.rest.actions.listArtifactsForRepo({
          owner: context.repo.owner,
          repo: context.repo.repo,
        })

        res.data.artifacts
          .forEach(({ id }) => {
            github.rest.actions.deleteArtifact({
              owner: context.repo.owner,
              repo: context.repo.repo,
              artifact_id: id,
            })
          })
  ```


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
![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202403311019136.png)
> Cookies获取后请勿退出登录Overleaf，否则cookies可能被撤销导致失效
>
> 开发者还建议在获取cookies后，清除当前cookies并通过重新登录以开启一个新会话，保持cookies不需要更新至少维持2个月 (这需要使用到cookie-editor等插件，当然，我并不认为需要这样做，我的actions始于2024.3.20，原有效时间为一周，目前仍正常运行，更新于2024.3.31)

#### 3. Actions
- 在项目的根目录下，创建yml文件，路径为 `.github/workflows/FileName.yml`，`FileName` 可以自定义，yml文件前的路径是固定的，如下所示：

  ![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202403202133340.png)

- 复制粘贴 [YML](https://github.com/Country-If/Country-If/blob/main/public_files/sync_overleaf.yml) 中的内容，其中的cron我设定的是每四小时更新一次，可以自定义

- 手动触发一次以启动工作流
![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202403202153114.png)
