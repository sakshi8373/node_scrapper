$(document).ready(function($) {
	 var seconds = 0;
setInterval(function() {
  seconds = seconds + 1;
  //console.log(seconds + " seconds have elapsed");
  setprogress();
}, 100);

    });
	


$(window).bind('resizeEnd', function() {
  setprogress()
});


 $(window).resize(function() {
        if(this.resizeTO) clearTimeout(this.resizeTO);
        this.resizeTO = setTimeout(function() {
            $(this).trigger('resizeEnd');
        }, 500);
    });	
	
	
	function setprogress(){
		
		var stepwidth=$("#steps").width(); 
	 var steplength=$(".progressbar li").size();
	
	 var setwidth=stepwidth/steplength;
     $(".progressbar li,.progressbar2 li").width(setwidth);
	}