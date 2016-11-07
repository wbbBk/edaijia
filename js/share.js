(function () {
    var _title = 'e家镖局';
    var _desc = '城里镖局真会玩，好礼都送面前了！';
    var _link = 'http://bj.vdong.cn/edaijia_2/index.html';
    var _imgUrl = 'http://bj.vdong.cn/edaijia_2/images/sns.jpg';
    var url = window.location.href.split("#")[0];
    var signPackage;
    var info = {
        appId: '',
        secret: '',
        url: url
    };

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        //url: "http://app.hocodo.com/webapps/weixinservice/weixinservice.php?callback=?",
        url: "http://bj.vdong.cn/joyup/weixinservice/weixinservice.php?callback=?", 
        data: {"param": JSON.stringify(info)},
        async: false,
        success: function (data) {
            // alert(JSON.stringify(data));
            // alert(wx);
            wx.config({
                // debug: true,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: [
                    // 所有要调用的 API 都要加到这个列表中
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'hideMenuItems',
                    'showMenuItems',
                    'hideAllNonBaseMenuItem',
                    'showAllNonBaseMenuItem',
                    'getNetworkType',
                    'openLocation',
                    'getLocation',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'closeWindow'
                ]
            });
            wx.ready(function () {
                // 在这里调用 API
                // 2. 分享接口
                // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口

                wx.onMenuShareAppMessage({
                    title: _title,
                    desc: _desc,
                    link: _link,
                    imgUrl: _imgUrl,
                    trigger: function (res) {
                        //alert('用户点击发送给朋友');
                    },
                    success: function (res) {
                        //alert('已分享');
                    },
                    cancel: function (res) {
                        //alert('已取消');
                    },
                    fail: function (res) {
                        //alert(JSON.stringify(res));
                    }
                });


                // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口

                wx.onMenuShareTimeline({
                    title: 'e家镖局-城里镖局真会玩，好礼都送面前了！',
                    link: _link,
                    imgUrl: _imgUrl,
                    trigger: function (res) {
                        // alert('用户点击分享到朋友圈');
                    },
                    success: function (res) {
                        // alert('已分享');
                    },
                    cancel: function (res) {
                        // alert('已取消');
                    },
                    fail: function (res) {
                        // alert(JSON.stringify(res));
                    }
                });
            });	//end of wx.ready
        }
    })
})();
