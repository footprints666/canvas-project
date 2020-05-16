$(function () {
    //获取选中背景图
    addr_img($(".images"), $(".bg"));

    //获取选中头像
    addr_img($(".people"), $(".img"));

    function addr_img(obj, item) {
        obj.find("img").click(function () {
            src = $(this).attr("src");
            item.attr("src", src);
        })
    }

    //拖动小人图
    var x = 0,
        y = 0,
        left0 = 0,
        top0 = 0;
    var dis_L, dis_T, endL, endT, x_new, y_new;
    // 鼠标按下时
    $('.drag').mousedown(function (e) {
        console.log(1)
        var e = event || window.event;
        x = e.pageX; //或者 x=e.clientX
        y = e.pageY; //或者y=e.clientY;
        console.log("x", x)
        left0 = $(this).offset().left;
        //  console.log("left0",left0)
        top0 = $(this).offset().top;
        dis_L = x - left0;
        //  console.log("dis_L",dis_L)
        dis_T = y - top0;

        //拖动时
        $(document).mousemove(function (ev) {
            var ev = event || window.event;
            console.log("ev.pageX", ev.pageX)
            console.log("ev.pageY", ev.pageY)
            endL = ev.pageX - dis_L;
            endT = ev.pageY - dis_T;
            // console.log("dis_L",dis_L)
            // console.log("endL",endL)

            // 鼠标范围控制
             if(ev.pageX>$(".box0").width()||ev.pageY>$(".box0").height()){
                return;
            }
              
            // 小人拖动范围控制
            if (endL < 0) {
                endL = 0;
            } else if (endL > $(".box0").width() - $('.img').width()) {
                endL = $(".box0").width() - $('.img').width();
            }

            if (endT < 0) {
                endT = 0;
            } else if (endT > $(".box0").height() - $('.img').height()) {
                endT = $(".box0").height() - $('.img').height();
            }  

            $(".drag,.img").css({
                left: endL + "px",
                top: endT + 'px'
            })
        })

        // 松开鼠标时
        $(document).mouseup(function () {
            $(this).off("mousemove");
        })
    })

    // 合成图片
    $(".btn").click(function () {
        CanvasList();
    })

    function CanvasList() {
        var myCanvas = document.getElementById("myCanvas");
        if (myCanvas.getContext) {
            var ctx = myCanvas.getContext("2d");
            // 背景大图
            var img = new Image();
            //添加小人图
            var imgs = new Image();
            //合成图片
            var newImag = new Image();
            //图片加载  绘制小人图
            imgs.onload = function () {
                // 手动清除上次绘制的图片
                ctx.clearRect(0, 0, 790, 340);

                 //获取图片拖拽后的坐标点，绘制到canvas中
                 x_new = $(".img").position().left;
                 y_new = $(".img").position().top;
                 console.log( "x_new", x_new)
                 console.log( "y_new ", y_new )
                 ctx.drawImage(imgs, x_new, y_new, 120, 120);
                 
                //绘制背景图
                 img.onload = function () {
                    ctx.drawImage(img, 0, 0, 790, 340);

                    newImag = myCanvas.toDataURL("images/png", 0.8);
                    $("#imgList").attr("src", newImag);
                    $(".news").css("opacity", "1");
                }
                img.src = $('.bg').attr("src");   
            }
            imgs.src = $(".img").attr("src");
        } else {
            console.log("不支持Canvas")
        }
    }
})