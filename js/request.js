var api_path = "http://bj.vdong.cn/edaijia_inc/";
var flag = false;
// 更新用户信息
function update(openid){
    var name    = $('input[name=username]').val();
    var mobile  = $('input[name=tel]').val();
    var address = $('input[name=addres]').val();
    var str = '&name=' + name + '&mobile=' + mobile + '&address=' + address;
    $.get(api_path+'tupuserinfo.php?openid='+openid + str,function(data){
        data = JSON.parse(data.replace(/'/g,'\"'));
        if(data[0].upuser == 'ok'){
            location.href = 'success.html';
        }else{
            alert('更新失败请重新提交');
        }
    });
}

//抽奖
function sprize(openid){
    if(flag){return;}
    $.ajax({
        url:api_path+'tisprize.php?openid='+openid,
        success:function(data){
            data = JSON.parse(data.replace(/'/g,'\"'));
           // alert(data[0].isprize)
            play('../sound/sprize.mp3');
            if(data[0].isprize == 1){
                setTimeout(function(){
                    location.href = 'step-h-1.html';
                },2000);
            }else if(data[0].isprize == 2){
                localStorage.card = data[0].card;
                setTimeout(function(){
                    location.href = 'step-h-2.html';
                },2000);
            }else{
                location.href = 'done.html';
            }
        },
        beforeSend:function(){
            flag = true;
        },
        complete:function(){
        }
    });
}
//获取获奖信息
function viewprize(openid){
    $.get(api_path+'tviewprize.php?openid='+openid,function(data){
        data = JSON.parse(data.replace(/'/g,'\"'));
        if(data[0].isprize == 1){
            location.href = 'step-h-1-1.html';
        }else if(data[0].isprize == 2){
            if(!localStorage.card){
                localStorage.card = data[0].card;
            }
            location.href = 'step-h-2.html';
        }
        else{
            location.href = 'empty.html';
        }
    });
}
