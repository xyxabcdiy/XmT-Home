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

    static alert(message){
        $(".alert-content").text(message);
        $(".alert").modal({
            show: true
        });
    }
}