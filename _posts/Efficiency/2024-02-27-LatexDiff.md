---
title: 研究生工具—LatexDiff
date: 2024-02-27 00:20:30 +0800
categories: [Efficiency]
tags: [efficiency, latex]
pin: false

---

## 介绍

- LatexDiff可以比较两个tex文件之间的差异，并输出为一个新的tex文件
- 需要：Overleaf、Github

## 配置
### Overleaf文件托管到Github
- 左上角 `Menu` -> `Sync` 下的 `Github`
- 首次提交需要设置仓库位置以及权限等
- 每次需要比较差异前，需要准备新旧两个tex文件，如果文件删除了可以通过Git回退到某一版本后获取，回退命令参考如下：
```bash
git reset --hard commit_id
```

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
- 左上角 `Menu` -> `Sync` 下的 `Github` -> Pull，如果没有pull的按钮需要刷新下页面等待同步
- 同步后的diff文件需要重新编译，编译后即可得到两个tex文件的修改差异

### 注意
#### Overleaf的使用
- 建议是每写完一版，就创建一个副本，命名为版本号或者日期，方便后续对比差异（虽说用Git也能恢复但是还是麻烦一点）

#### Codespaces的使用
- 文件同步

  Codespaces每次打开的时候先同步当前所有文件，终端下：
  ```bash
  git pull
  ```

- Codespaces使用完记得关闭（每个月使用额度是有限制的）

