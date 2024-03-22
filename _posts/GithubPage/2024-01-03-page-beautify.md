---
title: Github Page Beautify
date: 2024-01-03 10:00:00 +0800
categories: [Tutorial]
tags: [github page]
pin: false
---


## 看板娘

1. 将下面的代码复制粘贴到 `_layouts/default.html` 文件中，位置随便放，我放在了 `</body>` 后
  ```html
  <script type="text/javascript" charset="utf-8" src="https://l2dwidget.js.org/lib/L2Dwidget.min.js"></script>
  <script type="text/javascript">
    L2Dwidget
      .on('*', (name) => {
        console.log('%c EVENT ' + '%c -> ' + name, 'background: #222; color: yellow', 'background: #fff; color: #000')
      })
      .init({
        "model": {
          jsonPath: "/L2DWidgets/live2d-widget-model-shizuku/assets/shizuku.model.json",
          "scale": 0.8
        },
        display: {
          "position": "right",
          "width": 200,
          "height": 280,
          "vOffset": -25,
          "hOffset": 20
        },
        mobile: {
          "show": true,
          "scale": 0.5
        },
        dialog: {
          enable: true,
          script: {
            'every idle 10s': '$hitokoto$',
            'tap body': '哎呀！别碰我！[○･｀Д´･ ○]',
            'tap face': '害羞 ヾ^_^♪'
          }
        }
      });
  </script>
  ```
  注：上面代码中，`jsonPath` 的值是 `live2d-widget-model-shizuku` 文件夹下的 `assets` 文件夹下的 `shizuku.model.json` 文件的路径，如果你使用的是其他的看板娘，那么需要修改这个路径；其他参数自行调整
2. 克隆仓库： [raoenhui/live2d-example: 看板娘案例](https://github.com/raoenhui/live2d-example)，在顶级创建 `L2DWidgets` 文件夹，将仓库中的 `live2d-widget-model-shizuku` 文件夹复制到 `L2DWidgets` 中

## 雪花背景
1. 在 `_layouts/default.html` 中添加下面的代码，放在了 `</body>` 前
  ```html
  <script type="text/javascript" src="/js/snow_background.js"></script>
  ```
2. 在 `js` 文件夹下创建 `snow_background.js` 文件，将下面的代码复制粘贴到 `snow_background.js` 中
  ```js
  (function($){
    $.fn.snow = function(options){
      var $flake = $('<div id="snowbox" ></div>').css({'position': 'absolute','z-index':'9999', 'top': '-50px', 'cursor': 'pointer'}).html('❄'),
        documentHeight  = $(document).height(),
        documentWidth   = $(document).width(),
        defaults = {
          minSize     : 10,
          maxSize     : 20,
          newOn       : 1000,
          flakeColor  : "#AFDAEF" /* 此处可以定义雪花颜色，若要白色可以改为#FFFFFF */
        },
        options = $.extend({}, defaults, options);
      var interval= setInterval( function(){
        var startPositionLeft = Math.random() * documentWidth - 100,
          startOpacity = 0.5 + Math.random(),
          sizeFlake = options.minSize + Math.random() * options.maxSize,
          endPositionTop = documentHeight - 200,
          endPositionLeft = startPositionLeft - 500 + Math.random() * 500,
          durationFall = documentHeight * 10 + Math.random() * 5000;
        $flake.clone().appendTo('body').css({
          left: startPositionLeft,
          opacity: startOpacity,
          'font-size': sizeFlake,
          color: options.flakeColor
        }).animate({
          top: endPositionTop,
          left: endPositionLeft,
          opacity: 0.2
        },durationFall,'linear',function(){
          $(this).remove()
        });
      }, options.newOn);
    };
  })(jQuery);
  $(function(){
    $.fn.snow({
      minSize: 5, /* 定义雪花最小尺寸 */
      maxSize: 20,/* 定义雪花最大尺寸 */
      newOn: 200  /* 定义密集程度，数字越小越密集 */
    });
  });
  ```

## 点击特效
### 爱心特效
1. 在 `_layouts/default.html` 中添加下面的代码，放在了 `</body>` 前
  ```html
  <script type="text/javascript" src="/js/love_onClick.js"></script>
  ```
2. 在 `js` 文件夹下创建 `snow_background.js` 文件，将下面的代码复制粘贴到 `snow_background.js` 中
  ```js
  !function (e, t, a) {
    function n() {
      c(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"), o(), r()
    }
  
    function r() {
      for (var e = 0; e < d.length; e++) d[e].alpha <= 0 ? (t.body.removeChild(d[e].el), d.splice(e, 1)) : (d[e].y--, d[e].scale += .004, d[e].alpha -= .013, d[e].el.style.cssText = "left:" + d[e].x + "px;top:" + d[e].y + "px;opacity:" + d[e].alpha + ";transform:scale(" + d[e].scale + "," + d[e].scale + ") rotate(45deg);background:" + d[e].color + ";z-index:99999");
      requestAnimationFrame(r)
    }
  
    function o() {
      var t = "function" == typeof e.onclick && e.onclick;
      e.onclick = function (e) {
        t && t(), i(e)
      }
    }
  
    function i(e) {
      var a = t.createElement("div");
      a.className = "heart", d.push({
        el: a,
        x: e.clientX - 5,
        y: e.clientY - 5,
        scale: 1,
        alpha: 1,
        color: s()
      }), t.body.appendChild(a)
    }
  
    function c(e) {
      var a = t.createElement("style");
      a.type = "text/css";
      try {
        a.appendChild(t.createTextNode(e))
      } catch (t) {
        a.styleSheet.cssText = e
      }
      t.getElementsByTagName("head")[0].appendChild(a)
    }
  
    function s() {
      return "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + ")"
    }
  
    var d = [];
    e.requestAnimationFrame = function () {
      return e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function (e) {
        setTimeout(e, 1e3 / 60)
      }
    }(), n()
  }(window, document);
  ```

### 其他点击特效
> 参考：[网页鼠标点击特效案例收集-CSDN](https://blog.csdn.net/ungoing/article/details/125071691)

- 可以直接自行复制代码，合并进 `_layouts/default.html`
- 也可以将代码保存为 `.js` 文件，然后在 `_layouts/default.html` 中引入，如前面的爱心特效所示

## 页面细节优化

加了看板娘后，会挡住原本页面的东西，比如 `回到顶部` 按钮，以及遮挡右下角主题

- 回到顶部

修改 `_sass/addon/commons.scss` 文件，如下图所示，自行调参
  ![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202401031542773.png)

- 右下角主题

修改 `_sass/addon/commons.scss` 文件，如下图所示，自行调参
  ![](https://cdn.jsdelivr.net/gh/Country-If/Typora-images/img/202401031544028.png)
