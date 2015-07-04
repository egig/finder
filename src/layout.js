DTFINDER.Layout = {

    handleScreenSize: function(){
        var wW = $(window).innerWidth();
        console.log(wW);

        if(wW <= 756) {
            $('.dtf-nav').hide();
            $('.toolbar').css({margin: '5px'});
        } else {
            $('.dtf-nav').show();
            $('.toolbar').css({margin: '0px'});
        }
    },

    listenWindowResize: function(){
        var _this = this;
        $(window).resize(function(){
            _this.handleScreenSize();
        });
    }
}
