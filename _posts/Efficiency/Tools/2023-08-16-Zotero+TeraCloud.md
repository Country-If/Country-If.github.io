---
title: 多终端云同步文献管理：Zotero+TeraCloud（Windows+Android）
date: 2023-08-16 10:00:00 +0800
categories: [Efficiency,Tools]
tags: [efficiency,tools]
pin: false
---


# 前言
- 最近刚在Windows和Android下搭建完zotero+teracloud，水一篇博客记录下，由于使用的云盘是日本的，所以搭建过程可能需要科学上网，不会科学上网的建议别看下去了，或者先去学下怎么科学上网。亦或是换个国内的网盘搭建，可以用坚果云，但是坚果云只能白嫖3G，Teracloud可以白嫖15G，所以看自己需要叭。


# 软件/云盘

## Windows
- 本人电脑使用的系统是Windows 10和Windows 11。


### Zotero

- 介绍
Zotero([https://www.zotero.org/](https://www.zotero.org/))是开源的文献管理工具，可以方便的收集，组织，引用，和共享文献的工具。
- 注册
注册过程就略过了，应该都会的。
注册后Windows下记得安装zotero的软件（左边那个）。Android的后面会说。
![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202308162330437.png)

- 浏览器插件
使用不同的浏览器打开zotero下载页面，会提示对应的浏览器插件的，我这里用的是Chrome，所以安装上图右边的插件Zotero Connector。（Chrome可能需要科学上网）
安装这个插件建议置顶该插件，在谷歌学术查文献的时候，这个插件会变成文件夹的图标，点击后可以选中文献保存至zotero中。使用sci-hub读文献时，这个插件会变成文件的图标，点击可以将PDF保存至zotero中。
- 第三方插件
zotero还可以安装其他第三方的插件，比如翻译之类的，但是我自己用的有道词典有划线取词功能，然后还有一些跟知网有关的插件，但是我读英文文献居多，也就没搞了，有需求的扒下其他人的博客。


### Teracloud

- 介绍
Teracloud([https://teracloud.jp/en/](https://teracloud.jp/en/))是一家日本的网盘服务商，免费套餐10G容量，加上邀请码可获得额外5-10G（看具体活动）。速度还是不错的（我自己访问经常需要科学上网，但是我舍友校园网访问又贼快，迷，所以用不用梯就得看命了），比欧美的要好，并且支持WebDAV（可以直接挂载在电脑上用）。
- 注册
官网提供的语言只有英文和日文，用英文应该问题不大。略过。
注册后默认就有10G，进入[My Page](https://teracloud.jp/en/modules/mypage/usage/)，往下滑到Referral Bonus，在Enter Friends Referral Code出填下本人的邀请码**ZX78Y**，可以额外获得5-10G（现在好像没活动了只有5G）
- 使用/管理
主页右上角可以进入[File Browser](https://yura.teracloud.jp/browser/)，在里面可以对文件进行管理（上传下载分享...）
- zotero挂载Teracloud WebDAV
	- Teracloud里还是在My Page中，划到Apps Connection，勾选Turn on Apps Connection，生成链接后记得保存好URL、ID、Password，然后，**刷新**，**刷新**，**刷新**，不刷新后面zotero会连不上WebDAV。
	- 打开zotero软件，菜单栏Edit->Preferences->Sync，Data Syncing里自动同步(Sync automatically)可选可不选，全文同步(Sync full-text content)建议不选，zotero里文献的条目还是会备份到官网zotero.org的，但是一些PDF附件之类的可以不用zotero备份。File Syncing参考下图勾选，WebDAV部分填上Teracloud的信息，测试连接没问题就完成了（连不上就科学上网吧）。如果不选用自动同步的话，也可以通过zotero里右边有个绿色的同步按钮进行同步。
	![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202308162330608.png)

- Teracloud的其他玩法
Teracloud除了文献同步，也可以当做也云盘使用，可以配合一些同步软件使用，Teracloud官网给出了能使用WebDAV的各个终端使用的APP：([https://teracloud.jp/en/clients.html](https://teracloud.jp/en/clients.html))，比如GoodSync。
参考本人的另一篇博客：[Teracloud其他玩法](../TeraCloud(GoodSync&RaiDrive))


## Android

- 本人使用的Android设备是红米手机和以及华为平板Matebook 11。


### Zoo for Zotero

- 介绍
[Zoo for Zotero Github 开源仓库](https://github.com/mickstar/Zoo-For-Zotero)
- 下载安装
下载方法有挺多的，如果有Google Play的话可以直接在Play Store里下载。我手机里的Zoo for Zotero是用Play Store装的，平板没装Play Store，是在电脑下载了APK再拖到平板里安装的。科学上网，访问apkpure或者apkmirror，搜索软件名，根据对应的安卓系统选择apk下载。（MateBook 11的CPU是骁龙，一般是arm64架构）
- 使用
登录zotero账号后就可以同步zotero的文献条目，但是PDF是备份在Teracloud的，所以需要设置WebDAV，设置方式跟Windows端类似，略过，设置后即可下载和同步PDF。


### Xodo

- 介绍
Xodo可以在不另开一个副本的情况下对原文件进行编辑，便于将批注同步到云端。
- 下载安装
有Google Play的用Play Store下载，没有的话还是在apkpure或者apkmirror上找安装包下载。
- 使用
Zoo for Zotero第一次打开PDF时可以选择打开方式，选择以Xodo打开即可。


# 写在最后

- 个人使用体验，搭建后使用了一段时间，多终端还是有其优势的，平时出门去图书馆可以不用带电脑，只需要带个平板，在学校排队做核酸的时候也可以用手机读文献。
- 总结评价一下，首先Zotero肯定是个研党必备的文献管理工具，在电脑上可以直接用zotero自带的PDF阅读器阅读，也可以直接在上面做笔记。安卓端不管是手机还是平板，也有对应的软件可以阅读文献和做笔记。Teracloud作为多终端的桥梁，提供了更大容量的云盘存储，唯一缺点就是云盘在日本，连接偶尔会不太稳定，但是大部分情况下，我基本不挂梯也可以使用。
- 觉得本文有用的话，注册个teracloud然后填个邀请码，让博主多薅点容量叭，谢谢各位佬了。


# 参考

> [TeraCLOUD+Zotero文献管理云同步手把手教程](https://www.bilibili.com/read/cv18956813/)
>
> [多终端跨平台终极学术文献管理解决方案——Zotero](https://post.smzdm.com/p/aqn2o9dk/p2/#comments)