/**
 * Copyright by XmT Ltd.
 */

"use strict";

class Home {

    public init(){
        this.initOwlCarousel();
        this.handleEqualHeightColums();
    }
    /**
     * Initialize plugin owl-carousel
     */
    public initOwlCarousel() {
        $(".owl-slider-v3").owlCarousel({
            items: 9,
            autoPlay: 5000,
            itemsDesktop: [1000, 5],
            itemsDesktopSmall: [900, 4],
            itemsTablet: [600, 3],
            itemsMobile: [300, 2]
        });
    }

    public handleEqualHeightColums(){
        let equalHeightColums = function (arg?:string) {
            $(".equal-height-columns").each(function () {
                let heights:string[] = [];
                $(".equal-height-column", this).each(function () {
                    $(this).removeAttr("style");
                    heights.push($(this).height());
                });
                $(".equal-height-column", this).height(Math.max.apply(Math, heights));
            });
        };

        equalHeightColums();
        $(window).resize(function () {
            equalHeightColums();
        });
        $(window).load(function () {
            equalHeightColums("img.equal-height-column");
        });
    }
}
