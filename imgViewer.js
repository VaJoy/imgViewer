/*
 imgViewer 1.0.0
 Licensed under the MIT license.
 https://github.com/VaJoy/imgViewer
 */
(function ($, window, undefined) {
    $.bindViewer = function (elm) {
        var $obj = $(elm),
            src = $obj.attr("src"),
            $win = $(window);
        $("html").css("minHeight", "100%");

        if ($obj.data("bindCategory")) $obj.off("click", viewImg);  //单例模式
        else {
            $obj.data("bindCategory", "bound");
            $obj.on("click", viewImg);
        }

        function viewImg() {
            var win_h = window.innerHeight || document.documentElement.clientHeight,
                sroll_t = $win.scrollTop(),
                sroll_l = $win.scrollLeft(),
                doc_h = Math.max($("body").height(), $("html").height()),
                $img = $("<img style='position:absolute;z-index:9999998;left:50%;border-radius:8px;' src='" + src + "' />"),
                $bg = $("<div style='position:absolute;z-index:9999997;top:0;left:0;width:100%;height:" + doc_h + "px;background:black;opacity:0.6;'></div>"),
                $close = $("<a title='关闭' style='position:absolute;z-index:9999999;left:50%;padding:11px 15px;cursor:pointer;background:black;color:white;border-radius:50%;font-family:Arial;font-size:14px;transition:background .5s;text-decoration:none;'>X</a>");
            $bg.appendTo("body").hide().fadeIn(200);
            $close.appendTo("body").hover(function () {
                $(this).css({"background": "#D90000", "text-decoration": "none"})
            }, function () {
                $(this).css("background", "black")
            }).hide();
            $img.appendTo("body").load(function () {
                var img_w = $(this).width(),
                    img_h = $(this).height();
                $(this).css({"top": win_h / 2 + sroll_t, "margin-left": sroll_l - 50, "margin-top": "-50px", "width": "100px", "height": "100px", "opacity": "0"})
                    .animate({"opacity": "1", "margin-left": -img_w / 2, "margin-top": -img_h / 2, "width": img_w, "height": img_h}, 300, function () {
                        $close.css({"top": win_h / 2 + sroll_t, "margin-left": img_w / 2 - 20 + sroll_l, "margin-top": -10 - img_h / 2}).fadeIn(500);
                    });
                $close.add($bg).click(function () {
                    $img.add($bg).add($close).remove();
                    $img = $bg = $close = null;
                })
            })
        }
    };

}(jQuery, window, undefined));