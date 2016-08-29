var headerHeight = 190;

function main() {
	checkCarouselHeight();
	
	$(window).resize(function() {
		checkCarouselHeight();
	});
	
	// animate carousel
	$('#slideShow').carousel({
		interval: 4444
	});
	// on navbar-menu click
	$(".menu-item").click(function() {
		onNavbarItemClick(this);	
	});
	
	$('#moreaboutmebtn').click(function() {
		scrollTo("scienceolympiad");
	});
	$('#nextbtn').click(function() {
		scrollTo("blog");
	});
	$('.navbar').click(function() {
		checkScreenWidth();
	});
	
	/*$('#blogslides').bind('slid', checkDownloadbtn());
	
	($('.blog-archive-toggle').click(function() {
		checkDownloadbtn();
	}); */
	
	$(window).scroll(onScroll);
	
	$('#topbtn').click(function() {
		$('html, body').animate({
			scrollTop: $('#top').offset().top
		}, 600);
	});
}

function onNavbarItemClick(currentli) {
	// when the navbar items are clicked
	var id = genId(currentli);
	scrollTo(id);
}

function scrollTo(id) {
	// animate scroll
	if ($("." + id).attr('class') == $('.aboutme').attr('class') || $("." + id).attr('class') == $('.connect').attr('class')) {
		headerHeight = 50;
	} else {
		headerHeight = 190;
	}
	$('html, body').animate({
		scrollTop: $("#" + id).offset().top - headerHeight
	}, 600);
}

function genId(object) {
	// create div id from text
	var currentString = $(object).html();
	currentString = currentString.slice(3, currentString.length - 4);
	do {
		var spaceIndex = currentString.indexOf(" ");
		if(spaceIndex > -1) {
			currentString = currentString.slice(0,spaceIndex) + currentString.slice(spaceIndex + 1, currentString.length);
		}
	} while(spaceIndex != -1);
	var id = currentString.toLowerCase();
	return id;
}

function onScroll() {
	// checks where one is on the page and makes the corresponding navbar item active
	var currentPos = Math.floor($(document).scrollTop());
	var ids = [];
	$('li.menu-Item').each(function() {
		ids.push(genId(this));
	});
 	
	$.each(ids, function() {
		var object = this;
		currentElem = $('#' + this);
		if (currentPos >= (currentElem.position().top - headerHeight) && currentPos < (currentElem.position().top + currentElem.height()) - headerHeight) {
			$('.active.menu-Item').removeClass('active');
			$("." + this).addClass('active');
			/* if ($("." + this).parent().parent().attr("class") == $(".dropdown").attr('class')) {
				$('.dropdown').addClass('active');
			} else {
				$('.dropdown').removeClass('active');
			} */
		}
	}); 
	
}

function checkScreenWidth() {
	// make sure dropdown is the right color according to screen size
	if ($(window).width() <= 992) {
		$('.navbar-collapse').addClass('navbar-color');
	} else {
		$('.navbar-collapse').removeClass('navbar-color');
	}
}

function checkCarouselHeight() {
	// need to debug more !!!!!!!!!!!!!!!!!!!!!!
	var screenHeight = screen.height;
	var shortestimgHeight = $('#shortestimg').height();
	if (screenHeight >= shortestimgHeight) {
		$('.item-main').css('max-height', shortestimgHeight);
	} else {
		$('.item-main').css('max-height', screenHeight);
	}
}

/*function checkDownloadbtn() {
	var archivedict = {0:"Pencils", 1: "Pencils2", 2: "Pencils3"}
	var currentIndex = $('.blog-item.active').index();
	console.log($('.blog-item.active').index());
	for (var index in archivedict) {
		if (currentIndex == index) {
			$('#downloadbtn').attr('href','images/blog/' + archivedict[index] + '.pdf');
		}
	}
	
} */

$(document).ready(function () {
	window.onload = function () {
		// causes loader to slide out of view when page is loaded 
		$('#loader-wrapper').css("-webkit-transition", "all .8s .5s ease-out");
		$('#loader-wrapper').css("transition", "all .8s .5s ease-out");
		$('#loader-wrapper').animate({
			top:'100%'
		}, 1000);
		main();
	};
});
