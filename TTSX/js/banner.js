$(function(){
    var imgLi = $('.slide_list li');
    var liLen = imgLi.length; //用jq动态根据图片li的个数生成圆点个数，所以先保存了图片li的个数
    var points = $('.points');
    var oldLi=0;//存现有的图
    var newLi=0;//存单击之后的目标图
    //alert(liLen);
    //var plis = $('.points li');
    //alert( plis.length)//弹出0.因为创建代码在下面
    var prev = $('.prev');
    var next = $('.next');
    //定义动画点击开关（左右箭头）
    var flag = false;
    var  timer = null;

    //精髓：不管将来图片的运动方向如何，都要先把li图片的位置摆放正确：例如由小到大 -- 从右侧往左走（瞬间图片固定到右侧）
    // 例如：由大到小 -- 从左往右走（瞬间图片固定到左侧）
    imgLi.not(':first').css('left','760px');// 固定初始状态各个li的位置，除去第一个其他的都在显示区域的右侧
    for(var i=0;i<liLen;i++)
    {
        var pLi = $('<li>');
        //第一个圆点是当前状态，当索引值等于0的li添加active类名
        if(i==0)
        {
            pLi.addClass('active');
        }
        pLi.appendTo(points);
    }

    //圆点动画
    var plis = $('.points li');
    //alert( plis.length)
    plis.click(function(){
        $(this).addClass('active').siblings().removeClass();//控制圆点样式
        newLi = $(this).index();
        if(newLi == oldLi)
        {
            return;
        }
        fnMove();
    });

    //左右箭头的单击事件
    prev.click(function(){
        newLi--;//eq取负值：取到的是集合中的最后一个：应该 -- newli小于0.应该回到第4个（3）
        //alert(newLi);
        if(flag){
            return;
        }
        flag = true;
        fnMove();
        plis.eq(newLi).addClass('active').siblings().removeClass();
    });

    next.click(function(){
        newLi++;//每次确实递增1，但是一共4张图，索引号最大是3，应该单击到第四张（3），就应该回到第一张（0）
        //alert(newLi);
        if(flag){
            return;
        }
        flag = true;
        fnMove();
        plis.eq(newLi).addClass('active').siblings().removeClass();
    });

//自动播放
    timer = setInterval(autoPlay,3000);
    function autoPlay(){
        newLi++;//每次确实递增1，但是一共4张图，索引号最大是3，应该单击到第四张（3），就应该回到第一张（0）
        //alert(newLi);
        fnMove();
        plis.eq(newLi).addClass('active').siblings().removeClass();
    }
    $('.slide').hover(function(){
        clearInterval(timer);
    },function(){
        timer = setInterval(autoPlay,3000);
    });

    function fnMove(){
        // -- 到第一张的情况：newli小于0.应该回到第4个（3）
        if(newLi<0)
        {
            newLi = liLen - 1;
            oldLi = 0;
            //摆位置：4在最左，然后4和1向右侧移动
            imgLi.eq(newLi).css('left',-760);
            imgLi.eq(newLi).stop().animate({'left':0},500,function(){
                flag = false;
            });
            imgLi.eq(oldLi).stop().animate({'left':760},500,function(){
                flag = false;
            });
            oldLi = newLi;
            return;
        }
        // ++ 第四张再++ 要回第一张：newli大于了3，回到第一张（0）
        if(newLi > liLen-1)
        {
           oldLi = liLen-1;
           newLi = 0;
           //摆位置：1在最右，然后4和1一起向左侧移动
            imgLi.eq(newLi).css('left',760);
            imgLi.eq(newLi).stop().animate({'left':0},500,function(){
                flag = false;
            });
            imgLi.eq(oldLi).stop().animate({'left':-760},500,function(){
                flag = false;
            });
            oldLi = newLi;
            return;
        }

        //判断：索引值的大小关系
        if(oldLi<newLi)//由小到大的 -- 从右侧往左侧走：old移动到左侧；new瞬间到右侧；new移动到显示区域（left=0）
        {
            imgLi.eq(oldLi).stop().animate({'left':-760},500);
            imgLi.eq(newLi).css('left',760);
            //imgLi.eq(newLi).animate({'left':0},500);
            //oldLi = newLi;
        }
        else//由大到小 -- 从左侧移动到右侧：old移动到右侧；new瞬间移动到左侧；new移动到显示区域（left=0）
        {
            imgLi.eq(oldLi).stop().animate({'left':760},500);
            imgLi.eq(newLi).css('left',-760);
            //imgLi.eq(newLi).animate({'left':0},500);
            //oldLi = newLi;
        }
        imgLi.eq(newLi).stop().animate({'left':0},500,function(){
            flag = false;
        });
        oldLi = newLi;
    }
})