---
title: Teracloud其他玩法（GoodSync，RaiDrive）
date: 2023-08-16 11:00:00 +0800
categories: [Efficiency,Tools]
tags: [efficiency,tools]
pin: false
---


## 前言
- Teracloud除了存文献外，它还是个云盘，可以搭配各种同步软件使用，之前在博客[多终端云同步文献管理：Zotero+TeraCloud（Windows+Android）](../Zotero+TeraCloud)里提到用同步软件搭配Teracloud使用，这里只以Windows下的GoodSync为例，介绍下常用用法。
- 后面又扒到一个网盘挂载软件RaiDrive，支持TeraCloud提供的WebDAV服务，但是对环境好像有一定要求，我Win11的电脑安装成功了，Win10的电脑一直报错。建议先试试RaiDrive，RaiDrive可以将TeraCloud挂载到本地磁盘，文件操作比GoodSync方便一点，RaiDrive如果装不了再用GoodSync叭。



## GoodSync

- 介绍
GoodSync是一个文件同步工具，可以实现两台电脑或者电脑与U盘之间的数据和文件的同步转换。GoodSync提供了使用多种第三方云服务进行备份的服务，如Google Drive、OneDrive、以及今天要介绍的WebDAV等等。
- 下载安装
到GoodSync的官网下载([https://www.goodsync.com/download](https://www.goodsync.com/download))，安装略过，安装后会有两个软件：GoodSync和GoodSync Explorer。
- GoodSync备份本地文件
	- 打开GoodSync软件，账号同步我给关了，因为我用两台电脑，我只想用GoodSync同步本地内容，不需要同步两台电脑的信息。
	- 在左边可以添加任务Job，创建任务时可以选择是备份或者同步，同步的话能保持本地和云端的内容一致，我不需要同步，选择了备份，后续也可以通过任务方向修改。
	![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202308162332551.png)
	- 如果创建的是备份任务，那么箭头方向只有单向向右，表示将左边的目录同步到右边的目录，因此点击左边的目录，选择要备份的本地目录，右边往下滑找到WebDAV，创建新用户，Teracloud给的URL需要进行拆分，URL一般最后一个结点是根节点，我的是/dav，将URL按照/dav拆分成两部分，前面部分填入Server Address，后面部分填入WebDAV root，Credentials填Teracloud给出的UserId和Password就好了，勾选Secure Connection，可以测试连接，连接成功即可保存，如果是网络原因连接失败，多尝试几次，或者科学上网。
	![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202308162332647.png)
	- 左边是备份本地的目录，右边也需要指定文件备份的目录，连接成功后可以直接在右边的WebDAV里创建文件夹指定备份目录。
	- 左右两边目录指定完成后，点击上方的Apply任务即创建完成。
	- 点击Analyze开始分析任务，GoodSync会分析出本地和云端的文件列表，然后可以按照自己的需求选择将指定的文件备份到云端，也可以点击Do Not Copy排除指定的文件，最后可以通过上方任务栏里确认需要同步的文件，确认无误后点击Sync，等待同步完成即可。
	![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202308162333491.png)



## RaiDrive

- 官网下载地址：[https://www.raidrive.com/download](https://www.raidrive.com/download)
- 根据自己的电脑下载对应安装包，我选的是x64。下载后无脑安装就好了，语言可以选中文，路径可以自己改。
![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202308162333182.png)
- 打开软件，右上角添加，选择NAS，（Personal里还可以挂载其他网盘，比如onedrive），选择WebDAV，虚拟驱动器第二个位置是本地虚拟盘的名称，如果要挂载多个WebDAV的话建议改改名字，改成TeraCloud啥的，后面的就根据自己TeraCloud的信息填就好了（**注意地址里的 /dav 要拆开成两部分，前部分填在地址里，端口不用改，后部分填在路径里**），用户名密码自己填。保存后就会测试连接，连接成功后即可在本地挂载上TeraCloud云盘啦。
![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202308162333021.png)

- 效果图：
![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202308162333154.png)
- WebDAV挂载的云盘容量显示是不准的，没办法实时更新容量和已使用空间，容量可以自己改。
- BTW，RaiDrive还可以挂载阿里云盘，不过阿里云盘的挂载就比较麻烦一点，感兴趣的可以自己再去了解，这里推荐个我用的方法，B站视频：[给电脑整个80亿GB硬盘，Alist+RaiDrive实现国产网盘转本地硬盘~](https://www.bilibili.com/video/BV1HS4y1J77j)