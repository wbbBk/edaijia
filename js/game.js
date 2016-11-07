var Game = function(){
    this.proxy_point = {};
    this.flag        = 'left';
    this.point       = 0;
    this.x           = 10;
    this.vx          = 0;
    this.timeId      = 0;
    this.anime_time  = ~~(Math.random()*5)+25;
    this.change_time = 0;
    this.time        = 0;
    this.drink_elem  = $('#drink');
    this.hand_elem   = $('#hand');
    this.happy_end   = 0;
    this.bad_end     = 0;
    this.body_height = $('body').height();
    this.li          = $('ol li');
    this.index       = 0;
    this.last_index  = 0;
    var self         = this;
    this.touchstart = function(ev){
        ev.preventDefault();
        var elem              = ev.touches[0].target;
        var point             = self.getX_Y(ev);
        self.proxy_point.x    = point.x;
        self.proxy_point.y    = point.y;
        self.proxy_point.elem = elem;
    };
    this.touchmove = function(ev){
        ev.preventDefault();
        var point = self.getX_Y(ev);
        if(self.proxy_point.x != point.x){
            // if(!(self.hand_elem.offset().left+324 >= 640)){
                // self.flag = 'right';
                // self.point+=18;
                // self.hand_elem.css('transform','translateX('+self.point+'px)');
                self.hand_elem.css('transform','translateX('+(point.x-self.proxy_point.x)+'px)');
            // }
        // }else{
            // if(!(self.hand_elem.offset().left <= 0)){
                // self.flag = 'left';
                // self.point-=18;
                // self.hand_elem.css('transform','translateX('+self.point+'px)');
                self.hand_elem.css('transform','translateX('+(point.x-self.proxy_point.x)+'px)');
            // }
        }
    };
    this.touchend = function(ev){
        self.proxy_point = {};
    };
    this.getX_Y = function(event){
        var client = event.touches[0] || event.changedTouches[0];
        return {
            x : client.clientX,
            y : client.clientY
        };
    };
    this.drink_speed = function(){
        if(self.anime_time == self.time){
            clearTimeout(self.timeId);
            self.time = 0;
            self.anime_time  = ~~(Math.random()*5)+25;
            self.drink();
        }else{
            if((self.drink_elem.offset().left <= 0)){
                self.x=10;
            }else if((self.drink_elem.offset().left+184 >= 640)){
                self.x=-10;
            }
            self.vx += self.x;
            self.drink_elem.css('transform','translateX('+self.vx+'px)');
            self.time++;
            self.timeId = setTimeout(self.drink_speed,33);
        }
    };
    this.drink = function(){
        self.drink_elem.addClass('Pour');
        var x = self.drink_elem.offset().left + 70;
        $('body').append('<div class="vodka" style="left:'+x+'px" data-id="'+self.index+'"></div>');
        $('.vodka').css({top:$(document).height()});
        self.index++;
        self.drink_speed();
        if(self.change_time){
            clearTimeout(self.change_time);
        }
        self.change_time = setTimeout(function(){
            self.drink_elem.removeClass('Pour');
        },200);
    };
    //碰撞检测;
    //漏掉一个算失败
    //连续接5个算成功
    //连续2-4个算微醉
    this.collision = function(){
        $('.vodka').each(function(){
            var top = $(this).offset().top+252;
            var left = $(this).offset().left;
            //碗的左边距
            if( left > (self.hand_elem.offset().left + 68) && left < (self.hand_elem.offset().left + 68 +136) && top >= self.hand_elem.offset().top && self.hand_elem.offset().top+68 > top ){
                $(this).remove();
                self.li.eq(self.happy_end).addClass('active');
                if(($(this).data('id')-self.last_index) != 1){//判断是不是连续接住的
                    if(self.happy_end >= 2 && self.happy_end <=4){
                        location.href = 'game_end_2.html';
                    }
                }
                if(self.happy_end == 4){
                    location.href = 'game_end_3.html';
                }
                self.last_index = $(this).data('id');
                self.happy_end++;
            }
            if($(this).offset().top > self.body_height){
                if($(this).data('id') == 0){//强制结束
                    location.href = 'game_end_1.html';
                }
                $(this).remove();
                self.bad_end++;
                if(self.bad_end == 5){
                     location.href = 'game.html';//游戏失败
                }
            }
        });
        setTimeout(self.collision,33);
    };
    this.init = function(){
        var hand_ = document.getElementById('hand');
        hand_.addEventListener('touchstart',this.touchstart,false);
        hand_.addEventListener('touchmove',this.touchmove,false);
        hand_.addEventListener('touchend',this.touchend,false);
        this.drink_speed();
        this.collision();
    };
};
