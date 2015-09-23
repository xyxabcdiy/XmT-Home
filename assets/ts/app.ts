/**
 * Copyright by XmT Ltd.
 */

"use strict";

class App {
    private url:string;
    private user:string;

    constructor() {
        this.url = "/webapi";
    }

    public init() {
        this.handleBootstrap();
        this.handleHeader();
        this.getResentArticles();
    }

    public getResentArticles() {
        let self = this;
        $.ajax({
            type: "GET",
            url: "/webapi/xmter/resent",
            dataType: "json",
            beforeSend: function () {
                $(".latest-list").before('<div class="spinner-next" id="xmterResentLoading"><div class="rect1"></div> <div class="rect2"></div> <div class="rect3"></div> <div class="rect4"></div> <div class="rect5"></div> </div>');
            },
            complete: function () {
                $("#xmterResentLoading").remove();
            },
            success: function (data) {
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        var href:string = "/blog/details?articleId=" + data[i].id;
                        $(".latest-list").append('<li><a href="' + href + '">' + data[i].title + '</a><small>' +
                            self.publicationTime(Number(data[i].date)) + '</small></li>');
                    }
                } else {
                    $(".latest-list").empty().append('<li><p>对不起，暂无更新~！<p></li>');
                }
            },
            error: function () {
                $(".latest-list").empty().append('<li><p>对不起，暂无更新~！<p></li>');
            }
        });
    }

    public initParallaxBg() {
        $(window).load(function () {
            $(".parallaxBg").parallax("50%", 0.2);
            $(".parallaxBg1").parallax("50%", 0.4);
        });
    }

    public handleHeader() {
        $(window).scroll(function () {
            if ($(window).scrollTop() > 100) {
                $(".header-fixed .header-sticky").addClass("header-fixed-shrink");
            }
            else {
                $(".header-fixed .header-sticky").removeClass("header-fixed-shrink");
            }
        })
    }

    public handleBootstrap() {
        //Bootstrap Carousel
        $(".carousel").carousel({
            interval: 2500,
            pause: "hover"
        });
    }

    public publicationTime(date:number) {
        let dateObj = new Date(date);
        let interval = (Date.now() - dateObj.getTime()) / 1000 / 60 / 60;
        if (interval > 24) {
            let htmlDate = ' ';
            htmlDate += dateObj.getFullYear() + ' . ' + (dateObj.getMonth() + 1) + ' . ' + dateObj.getDate();
            return htmlDate;
        } else if (interval > 1) {
            return Math.ceil(interval) + " Сʱ֮ǰ";
        } else {
            return Math.ceil(interval * 60) + " ����֮ǰ";
        }
    }

    static alert(message){
        $(".alert-content").text(message);
        $(".alert").modal({
            show: true
        });
    }
}