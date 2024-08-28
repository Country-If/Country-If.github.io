---
title: 研究生工具—LatexDiff
date: 2024-02-27 00:20:30 +0800
categories: [Efficiency,Tools]
tags: [efficiency,tools,latex]
pin: false
---


## 介绍

- LatexDiff可以比较两个tex文件之间的差异，并输出为一个新的tex文件
- 使用方法：
1. Overleaf、Github
2. Overleaf、本地
- 非premium用户配合 [OverleafSync](/posts/OverleafSync) 使用

## 方法1：结合GitHub
### Overleaf文件托管到Github
#### Premium用户
- 左上角 `Menu` -> `Sync` 下的 `Github`
- 首次提交需要设置仓库位置以及权限等
- 每次需要比较差异前，需要准备新旧两个tex文件，如果文件删除了可以通过Git回退到某一版本后获取，回退命令参考如下：
```bash
git reset --hard commit_id
```

#### 非Premium用户
1. 通过本地作为介质上传到github
  - 在GitHub上创建仓库（建议私有库），并克隆到本地
  - 在Overleaf上下载整个项目到本地，并解压
  - 将解压后的文件复制或移动到本地仓库文件夹中，推送到GitHub（add、commit、push）

2. 用github actions同步，见博客：[OverleafSync](/posts/OverleafSync)

### Github创建Codespaces
- 左上角菜单按钮 -> `Codespaces` -> `New codespace`
- 选择Overleaf项目存放的仓库位置，创建Codespaces，得到vscode界面
- 在`Terminal`中，安装latexdiff：
```bash
sudo apt update && sudo apt install latexdiff -y
```
- 安装完成后即可使用latexdiff，命令如：`latexdiff old.tex new.tex > diff.tex`
- 随后将diff.tex推到Github，命令：
```bash
git add diff.tex && git commit -m "add diff" && git push
```

### Overleaf同步获取diff文件
> 同步后的diff文件需要重新编译，编译后即可得到两个tex文件的修改差异

- Premium用户

  左上角 `Menu` -> `Sync` 下的 `Github` -> Pull，如果没有pull的按钮需要刷新下页面等待同步，同步后再编译

- 非Premium用户

  在本地仓库拉取更新，将更新的diff文件上传到Overleaf上，再编译

### 注意
#### Overleaf的使用
- 建议是每写完一版，就创建一个副本，命名为版本号或者日期，方便后续对比差异（虽说用Git也能恢复但是还是麻烦一点）
- 如果是使用 GitHub Action 进行同步的话，可以直接手动触发一次工作流以完成同步，参考：[OverleafSync](/posts/OverleafSync/#3-actions)

#### Codespaces的使用
- 文件同步

  Codespaces每次打开的时候先同步当前所有文件，终端下：
  ```bash
  git pull
  ```

- Codespaces使用完记得关闭（每个月使用额度是有限制的）


## 方法2：本地使用
对GitHub了解不多的可以通过本地使用，此部分略写，有关的命令往上翻翻

- Windows安装latexdiff参考： [latexdiff安装及使用-csdn](https://blog.csdn.net/luosnongning/article/details/128221172)

- 在overleaf上将当前项目整个打包下载到本地，解压后进入目录，使用latexdiff生成 `diff.tex` 文件，再将 `diff.tex` 上传到overleaf，选中 `diff.tex` 文件重新编译即可
