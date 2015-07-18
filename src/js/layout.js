DTFINDER.Layout = {

    handleScreenSize: function(){
        var wW = $(window).innerWidth();

        if(wW <= 756) {
            $('.dtf-breadcrumb-container').show();
            $('.dtf-nav').hide();
            $('.toolbar').css({margin: '5px'});
            $('.dtf-area').width('98%');
        } else {
            $('.dtf-breadcrumb-container').hide();
            $('.dtf-nav').show();
            $('.toolbar').css({margin: '0px'});

            var w = $('.dtf-browser-container').width() - $('.dtf-nav').width();
            $('.dtf-area').width(w-35);
        }

    },

    listenWindowResize: function(){
        var _this = this;
        $(window).resize(function(){
            _this.handleScreenSize();
        });
    }
}
