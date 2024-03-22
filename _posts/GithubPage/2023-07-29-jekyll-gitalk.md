---
title: Jekyll使用Gitalk实现评论功能
date: 2023-07-30 10:00:00 +0800
categories: [Tutorial]
tags: [github page]
pin: true
---


# Jekyll使用Gitalk实现评论功能

## why gitalk

### gitalk介绍

- 引用官方介绍

  ![gitalk-github](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202307301036772.png)
  
- 我自己的理解

  Gitalk使用Github的issue功能，为Github Page里的每一篇博客创建一个issue，在博客里面评论相当于在issue里交流

### gitalk效果

- 已登录用户

  ![login](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202307301037237.png)

- 未登录用户

  ![logout](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202307301039698.png)

## how to configure

### step 1: 创建Github  OAuth Apps -> 拿到`Client ID`和`Client secrets`

- Github -> Settings -> Developer Settings -> OAuth Apps -> New OAuth App
- 必填项三个
  - Application name: 给这个OAuth App起个名字，随便填，比如Gitalk
  - Homepage URL: Github Page的URL
  - Authorization callback URL: 同上
- 获取`Client ID`和`Client secrets`，`Client secrets`需要保存到本地，因为刷新后无法再次查看(secret的安全性见下文)

### Step 2: 修改`_config.yml`和`_layouts/post.html`文件 -> 在博客中添加Gitalk插件

#### _config.yml -> 配置Gitalk信息

```yaml
gitalk:
  enable: true
  github_id: # 你的Github ID/用户名
  repo: # 评论存放的仓库名称，可以是Github Page(username.github.io)所在的仓库或者另建一个仓库
  client_id: # 前面拿到的Client ID
  client_secret: # 前面拿到的Client secret
```

将以上代码粘贴到`_config.yml`文件中，选项替换成自己的设置，冒号后面需要有一个空格不然语法会出错，另外注意这是独立的一段配置，不可放置在其他标签内，随便找一处空位粘贴即可

#### _layouts/post.html -> 注册Gitalk插件

```html

<div id="gitalk-container"></div>
<link rel="stylesheet" href="https://unpkg.com/gitalk/dist/gitalk.css">
<script src="https://unpkg.com/gitalk@latest/dist/gitalk.min.js"></script>
<script src="/js/md5.min.js"></script>
<script type="text/javascript">
    var gitalk = new Gitalk({
        clientID: '自己的Client ID',
        clientSecret: '自己的Client secret',
        repo: '评论存放的仓库名称',
        owner: 'Github ID/username',
        admin: ['同owner, 也可添加其他管理员'],
        id: md5(location.href.match('/(?<=posts/)(.*)(?=/)/')[1]),
        language: 'en',
        perPage: 10,
    });
    gitalk.render('gitalk-container');
</script>
```

- `ClientID`到`admin`的选项需要填写自己的内容，注意！引号需要保留！
- 前五个选项是必须的，第六个选项`id`其实也是必须的，得设置好不然可能会出问题，再后面的选项是自定义的(自定义选项见下文)
- 将上面的代码，贴到`_layouts/post.html`中，注意粘贴的位置，我是把它嵌入到最后一个`<div>`标签里面的，自己贴完可以打开HTML查看位置，能显示出来应该位置就对了，粘贴的位置可以多尝试去调整(懂前端的当我没说)
- 注意到上面代码里的这一行：`<script src="/js/md5.min.js"></script>`以及`id: md5(location.href.match('/(?<=posts/)(.*)(?=/)/')[1])`，这是使用md5进行处理，获取到的唯一标识符作为id，这个id将会是评论仓库里issue对应的标签，`location.href`对应网站的url，使用正则表达式，提取`posts/`到下一个`/`之间的字符串，也就是文章对应的文件名称(标题)

##### /js/md5.min.js -> 提供md5处理的方法

- 在跟`_layouts`文件夹同级的地方，创建一个名为`js`的文件夹，在里面创建一个名为`md5.min.js`的文件，粘贴下面的代码，用于提供md5处理功能

```js
! function(n) {
    "use strict";

    function d(n, t) {
        var r = (65535 & n) + (65535 & t);
        return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r
    }

    function f(n, t, r, e, o, u) {
        return d(function(n, t) {
            return n << t | n >>> 32 - t
        }(d(d(t, n), d(e, u)), o), r)
    }

    function l(n, t, r, e, o, u, c) {
        return f(t & r | ~t & e, n, t, o, u, c)
    }

    function g(n, t, r, e, o, u, c) {
        return f(t & e | r & ~e, n, t, o, u, c)
    }

    function v(n, t, r, e, o, u, c) {
        return f(t ^ r ^ e, n, t, o, u, c)
    }

    function m(n, t, r, e, o, u, c) {
        return f(r ^ (t | ~e), n, t, o, u, c)
    }

    function i(n, t) {
        var r, e, o, u, c;
        n[t >> 5] |= 128 << t % 32, n[14 + (t + 64 >>> 9 << 4)] = t;
        var f = 1732584193,
            i = -271733879,
            a = -1732584194,
            h = 271733878;
        for (r = 0; r < n.length; r += 16) i = m(i = m(i = m(i = m(i = v(i = v(i = v(i = v(i = g(i = g(i = g(i = g(i = l(i = l(i = l(i = l(o = i, a = l(u = a, h = l(c = h, f = l(e = f, i, a, h, n[r], 7, -680876936), i, a, n[r + 1], 12, -389564586), f, i, n[r + 2], 17, 606105819), h, f, n[r + 3], 22, -1044525330), a = l(a, h = l(h, f = l(f, i, a, h, n[r + 4], 7, -176418897), i, a, n[r + 5], 12, 1200080426), f, i, n[r + 6], 17, -1473231341), h, f, n[r + 7], 22, -45705983), a = l(a, h = l(h, f = l(f, i, a, h, n[r + 8], 7, 1770035416), i, a, n[r + 9], 12, -1958414417), f, i, n[r + 10], 17, -42063), h, f, n[r + 11], 22, -1990404162), a = l(a, h = l(h, f = l(f, i, a, h, n[r + 12], 7, 1804603682), i, a, n[r + 13], 12, -40341101), f, i, n[r + 14], 17, -1502002290), h, f, n[r + 15], 22, 1236535329), a = g(a, h = g(h, f = g(f, i, a, h, n[r + 1], 5, -165796510), i, a, n[r + 6], 9, -1069501632), f, i, n[r + 11], 14, 643717713), h, f, n[r], 20, -373897302), a = g(a, h = g(h, f = g(f, i, a, h, n[r + 5], 5, -701558691), i, a, n[r + 10], 9, 38016083), f, i, n[r + 15], 14, -660478335), h, f, n[r + 4], 20, -405537848), a = g(a, h = g(h, f = g(f, i, a, h, n[r + 9], 5, 568446438), i, a, n[r + 14], 9, -1019803690), f, i, n[r + 3], 14, -187363961), h, f, n[r + 8], 20, 1163531501), a = g(a, h = g(h, f = g(f, i, a, h, n[r + 13], 5, -1444681467), i, a, n[r + 2], 9, -51403784), f, i, n[r + 7], 14, 1735328473), h, f, n[r + 12], 20, -1926607734), a = v(a, h = v(h, f = v(f, i, a, h, n[r + 5], 4, -378558), i, a, n[r + 8], 11, -2022574463), f, i, n[r + 11], 16, 1839030562), h, f, n[r + 14], 23, -35309556), a = v(a, h = v(h, f = v(f, i, a, h, n[r + 1], 4, -1530992060), i, a, n[r + 4], 11, 1272893353), f, i, n[r + 7], 16, -155497632), h, f, n[r + 10], 23, -1094730640), a = v(a, h = v(h, f = v(f, i, a, h, n[r + 13], 4, 681279174), i, a, n[r], 11, -358537222), f, i, n[r + 3], 16, -722521979), h, f, n[r + 6], 23, 76029189), a = v(a, h = v(h, f = v(f, i, a, h, n[r + 9], 4, -640364487), i, a, n[r + 12], 11, -421815835), f, i, n[r + 15], 16, 530742520), h, f, n[r + 2], 23, -995338651), a = m(a, h = m(h, f = m(f, i, a, h, n[r], 6, -198630844), i, a, n[r + 7], 10, 1126891415), f, i, n[r + 14], 15, -1416354905), h, f, n[r + 5], 21, -57434055), a = m(a, h = m(h, f = m(f, i, a, h, n[r + 12], 6, 1700485571), i, a, n[r + 3], 10, -1894986606), f, i, n[r + 10], 15, -1051523), h, f, n[r + 1], 21, -2054922799), a = m(a, h = m(h, f = m(f, i, a, h, n[r + 8], 6, 1873313359), i, a, n[r + 15], 10, -30611744), f, i, n[r + 6], 15, -1560198380), h, f, n[r + 13], 21, 1309151649), a = m(a, h = m(h, f = m(f, i, a, h, n[r + 4], 6, -145523070), i, a, n[r + 11], 10, -1120210379), f, i, n[r + 2], 15, 718787259), h, f, n[r + 9], 21, -343485551), f = d(f, e), i = d(i, o), a = d(a, u), h = d(h, c);
        return [f, i, a, h]
    }

    function a(n) {
        var t, r = "",
            e = 32 * n.length;
        for (t = 0; t < e; t += 8) r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255);
        return r
    }

    function h(n) {
        var t, r = [];
        for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1) r[t] = 0;
        var e = 8 * n.length;
        for (t = 0; t < e; t += 8) r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32;
        return r
    }

    function e(n) {
        var t, r, e = "0123456789abcdef",
            o = "";
        for (r = 0; r < n.length; r += 1) t = n.charCodeAt(r), o += e.charAt(t >>> 4 & 15) + e.charAt(15 & t);
        return o
    }

    function r(n) {
        return unescape(encodeURIComponent(n))
    }

    function o(n) {
        return function(n) {
            return a(i(h(n), 8 * n.length))
        }(r(n))
    }

    function u(n, t) {
        return function(n, t) {
            var r, e, o = h(n),
                u = [],
                c = [];
            for (u[15] = c[15] = void 0, 16 < o.length && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1) u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r];
            return e = i(u.concat(h(t)), 512 + 8 * t.length), a(i(c.concat(e), 640))
        }(r(n), r(t))
    }

    function t(n, t, r) {
        return t ? r ? u(t, n) : function(n, t) {
            return e(u(n, t))
        }(t, n) : r ? o(n) : function(n) {
            return e(o(n))
        }(n)
    }
    "function" == typeof define && define.amd ? define(function() {
        return t
    }) : "object" == typeof module && module.exports ? module.exports = t : n.md5 = t
}(this);
//# sourceMappingURL=md5.min.js.map
```

### Step 3: 初始化

- 第一次使用时，需要为每篇博客创建一个issue，具体的做法是，将上述修改推送到Github后，等待部署完成，进入一篇博客，以所有者的身份登录Github，即可完成初始化，另外，所有的博客都得点击进入一次，为每一篇博客创建一个issue以完成初始化
- 登录Github的操作只有初始化第一篇博客才需要，后续的博客初始化操作不需要再登录Github

## Q&A

### Client secret直接暴露出来是否存在安全性？

- 这篇博客 [gitalk-运作原理](https://carl-zk.github.io/blog/2020/03/03/gitalk-%E8%BF%90%E4%BD%9C%E5%8E%9F%E7%90%86/) 给出了分析与结论，安全性不必担心

### 为什么要使用md5对id进行处理？

- 参考：[Jekyll个人博客利用gitalk增加评论功能](https://zoharandroid.github.io/2019-08-02-Jekyll%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2%E5%88%A9%E7%94%A8gitalk%E5%A2%9E%E5%8A%A0%E8%AF%84%E8%AE%BA%E5%8A%9F%E8%83%BD/)

### Gitalk插件的其他参数？

- 参数选项请见官方README文档的Options部分：[Gitalk-Github](https://github.com/gitalk/gitalk)

### 有啥坑？

- 注意 `post.html` 文件里代码粘贴的位置
- 同样是 `post.html` 文件里，注意检查引号
- 不使用md5进行处理的话，issue的标签过长时会出错

### 没有_layouts等文件夹？

- 去对应主题的Github上，把缺的文件夹拷贝到自己的仓库里

### 评论文字是白色看不见的问题

- 深色模式下，可能会出现在评论区键入文字时文字显示异常的问题。[ISSUE-511](https://github.com/gitalk/gitalk/issues/511)中给出了一些解决办法

- 我的解决方案如下：

  修改`_layouts/post.html`文件，在注册Gitalk时插入全局样式

  ```html
    <style lang="scss">
      .gt-header-textarea {
    color: #000 !important;
      }
    </style>
  ```

  ![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202312132128432.png)

### 评论区文字框在键入一个字符后，无法继续键入字符的问题

- emmm这个是由grammarly的插件导致的，目前的解决办法只有禁用该插件

### 其他问题

- 到[Issues区](https://github.com/gitalk/gitalk/issues)查查有无解决办法
