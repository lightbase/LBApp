var App = function () {

    var handleSelectTheme = function () {        
        $('.themes .selected').click(function(){
            if ($(this).hasClass("open")) {
                $(this).removeClass("open");
                $('#themes_selector').hide();
            } else {
                $(this).addClass("open");
                $('#themes_selector').show();
            }
        });

        $('#themes_selector > li').click(function(){
            window.location.href = 'http://www.keenthemes.com/preview/index.php?theme=' + $(this).attr("data-id");
            $(this).removeClass("open");
            $('#themes_selector').hide();
        });
    }

    var fixIFrameHeight = function  () {    
        var headerHeight = jQuery(".header").height();
        jQuery("#iframe").attr("height", ((jQuery(window).height() - 8) - headerHeight) + 'px');    
    }
    
    var handleWindowResize = function () {
        jQuery(window).resize(function () {
            fixIFrameHeight();
        }).resize();
    }  

    return {

        //main function to initiate template pages
        init: function () {
            handleSelectTheme();
            handleWindowResize();
        }
        
    };

}();