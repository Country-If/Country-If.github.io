L2Dwidget
    .on('*', (name) => {
        console.log('%c EVENT ' + '%c -> ' + name, 'background: #222; color: yellow', 'background: #fff; color: #000')
    })
    .init({
        "model": {
            jsonPath: "https://unpkg.com/live2d-widget-model-koharu@1.0.5/assets/koharu.model.json",
            //如果要换模型修改 live2d-widget-model-hibiki
            //以及 assets后面的hibiki.model.json 其中bibiki为model名字
            //参考文献[参考文献](https://www.hxahr.cn/2019/09/04/%E6%B2%99%E9%9B%95%E7%9C%8B%E6%9D%BF%E5%A8%98/ "参考文献")
            "scale": 0.8
        },

        display: {
            // 居左
            "position": "right",
            // 宽度
            "width": 200,
            // 高度
            "height": 300,
            // 距左右
            "hOffset": 35,
            // 距下
            "vOffset": -20
        },

        mobile: {
            // 移动端，false为关闭
            "show": true,
            "scale": 0.5
        },

        dialog: {
            // 开启对话框，false为关闭
            enable: true,
            script: {
                // 每空闲 10 秒钟，显示一条一言
                'every idle 10s': '$hitokoto$',
                // 当触摸到角色身体
                'tap body': '哎呀！别碰我！',
                // 当触摸到角色头部
                'tap face': '人家已经不是小孩子了！'
            }
        }
    });
