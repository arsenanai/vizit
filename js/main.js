//definig functions
function changeNavbar(scrollPos,height){
	if(scrollPos <= 112 && height>=400){
		clearNavbar();
        $(".navbar").addClass('navbar-dark bg-transparent');
        //$("#main-logo").attr('src','assets/global-colorful-dark.svg');
	}else if(scrollPos > 112 && scrollPos < height-56 && height>=400) {
		clearNavbar();
        $(".navbar").addClass('navbar-dark bg-dark material-dark');
        $("#main-logo").attr('src','assets/global-colorful-dark.svg');
    }else if(scrollPos >= height-56 && height>=400){
    	clearNavbar();
        $(".navbar").addClass('navbar-light bg-light material');
        $("#main-logo").attr('src','assets/global-colorful-light.svg');
    }else if(height<400)  {
    	clearNavbar();
    	$(".navbar").addClass('navbar-dark bg-dark material-dark');
    	$("#main-logo").attr('src','assets/global-colorful-dark.svg');
    }
}
function clearNavbar(){
	$(".navbar").removeClass('navbar-dark navbar-light bg-dark bg-light bg-transparent material-dark material');
}
function decideNavbarMode(height){
	if(height<400){
		$(".navbar").removeClass('fixed-top');
	}else{
		$(".navbar").addClass('fixed-top');
	}
}
function changeActivMenu(lastId, topMenuHeight, menuItems, scrollItems){
	var fromTop = $(this).scrollTop()+topMenuHeight;
	var cur = scrollItems.map(function(){
	 if ($(this).offset().top < fromTop)
	   return this;
	});
	cur = cur[cur.length-1];
	var id = cur && cur.length ? cur[0].id : "";
	if (lastId !== id) {
	   lastId = id;
	   menuItems
	     .parent().removeClass("active")
	     .end().filter("[href='#"+id+"']").parent().addClass("active");
	}
}
function countNumbers(){
	try{
		if (window.matchMedia('(prefers-reduced-motion)').matches===false) {
			var oTop = $('#statistics').offset().top - window.innerHeight;
			if (a == 0 && $(window).scrollTop() > oTop) {
				let els = document.querySelectorAll('.counter-value');
				//let el = document.getElementById('counter1');
				els.forEach(function(el) {
				  animateValue(
				  	el.id, 
				  	parseInt(el.getAttribute('data-start')),
				  	parseInt(el.getAttribute('data-end')),
				  	parseInt(el.getAttribute('data-duration')),
				  	el.getAttribute('data-prepend')
				  );
				  a=1;
				});
			}
		}
	}catch(err){
		console.log(err);
	}
}
function smoothScrolling(){
	/*$("a.nav-link, #scroll-down, a.navbar-brand").on('click', function(event) {
	    if (this.hash !== "") {
	      event.preventDefault();
	      var hash = this.hash;
	      $('html , body').stop().animate({
	        scrollTop: $(hash).offset().top
	      }, 500, function(){
	        window.location.hash = hash;
	      });
	    }
	    return false;
	});*/
}
function animateValue(id, start, end, duration, prepend = '') {
    var range = end - start;
    var current = start;
    if(duration-range>1000){
    	var stepTime = Math.ceil(duration/range);
    	var increment = 1;
    }else{
    	var stepTime = 10;
    	var increment = Math.floor(range/(duration/stepTime));
    }
    var obj = document.getElementById(id);
    var timer = setInterval(function() {
        current += increment;
        if (current >= end) {
            clearInterval(timer);
            obj.innerHTML = end;
        }else{
        	obj.innerHTML = current+prepend;
        }
    }, stepTime);
}
//defining variables
var height = $(window).height();
var lastId,
topMenu = $(".navbar-nav"),
topMenuHeight = topMenu.outerHeight()+15,
// All list items
menuItems = topMenu.find("a"),
// Anchors corresponding to menu items
scrollItems = menuItems.map(function(){
  var item = $($(this).attr("href"));
  if (item.length) { return item; }
});
var a = 0;

//document loaded and ready event
$(document).ready(function(){
	decideNavbarMode(height);
	window.addEventListener("orientationchange", function() {
		height = $(window).height();
		changeNavbar(scrollPos, height);
		decideNavbarMode(height);
	},false);
	window.addEventListener("resize", function() {
		height = $(window).height();
		changeNavbar(scrollPos, height);
	    decideNavbarMode(height);
	}, false);
	var scrollPos = 0;
    scrollPos = $(this).scrollTop();
    height = $(window).height();
    changeNavbar(scrollPos, height);
    countNumbers();
    $(document).scroll(function() { 
    	//change navbar
    	height = $(window).height();
        scrollPos = $(this).scrollTop();
        changeNavbar(scrollPos, height);
		changeActivMenu(lastId, topMenuHeight, menuItems, scrollItems);
		countNumbers();
    });
    //smooth scrolling
    //smoothScrolling();
});