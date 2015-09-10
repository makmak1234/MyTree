//кнопка вверх
$(document).ready(function(){
	var btn = $('.btn_up');
	var btn_show = false;
	var dopac = 2/window.innerHeight;

	$(document).scroll(function(){
		if($(document).scrollTop() >= window.innerHeight/2 && $(document).scrollTop() <= window.innerHeight){
			//btn_show = true;
			//btn.fadeIn(500);
			var cur_opc = $(document).scrollTop() * 2 / window.innerHeight - 1; 
			btn.fadeTo(0, cur_opc);
			//console.log($(document).scrollTop());
		}
		if(!btn_show && $(document).scrollTop() > window.innerHeight){
			btn_show = true;
			btn.fadeTo(0, 1);
		}
		if(btn_show && $(document).scrollTop() < window.innerHeight/2){
			btn_show = false;
			btn.fadeTo(0, 0);
		}
	});
	btn.click(function(){
		$('html, body').animate({scrollTop: 0}, 500);
	});
	var click_li = "#header .menu > ul > li";
	$(click_li).click(function(){
		$(click_li).css("background-color", "transparent");
		$(this).css("background-color", "rgb(35, 35, 36)");
	});
	
	//слайдер портфолио
	i = 3;
	var dlr = 250;//$('.pre-wrapper').width / 4;
	$('#portfolio .all-cont .content').css("left", "-250px");
	$('#portfolio .pagination .grey0').css("background-color", "rgb(108, 195, 114)");
	for(l = 0; l <= 3; l++){
		var cyrclass = ".port" + l;	
		var px = i * dlr + "px";
		$(cyrclass).css("left", px);
		i--;
	}
	i = 0;
	$('.arrow_portn').click(function(){
		$("#portfolio .all-cont .content").removeClass("anim");
		$('#portfolio .pagination .grey').css("background-color", "rgb(101, 101, 101)");
		for(j = 4 * i; j <= 4 * i + 3; j++){
			var cyrclass = ".port" + j;
			$(cyrclass).addClass("anim");
		}
		i++;
		//alert("i++ = " + i);
		if(i == 4){i = 0};
		var k = 1;
		for(j = 4 * i; j <= 4 * i + 3; j++){
			cyrclass = ".port" + j;
			px = -k * dlr + "px"; 
			$(cyrclass).css("left", px);
			$(cyrclass).addClass("anim");
			k++;
		};
		//alert("i = " + i);
		$('#portfolio .all-cont .anim').animate({"left": "+=1000px"}, 500);
		px = "#portfolio .pagination .grey" + i;
		$(px).css("background-color", "rgb(108, 195, 114)");
	});
	$('.arrow_portp').click(function(){
		$("#portfolio .all-cont .content").removeClass("anim");
		$('#portfolio .pagination .grey').css("background-color", "rgb(101, 101, 101)");
		for(j = 4 * i; j <= 4 * i + 3; j++){
			var cyrclass = ".port" + j;
			$(cyrclass).addClass("anim");
		}
		i--;
		//alert("i++ = " + i);
		if(i == -1){i = 3};
		var k = 4;
		for(j = 4 * i; j <= 4 * i + 3; j++){
			cyrclass = ".port" + j;
			px = k * dlr + dlr * 3 + "px"; 
			$(cyrclass).css("left", px);
			$(cyrclass).addClass("anim");
			k--;
		};
		//alert("i = " + i);
		$('#portfolio .all-cont .anim').animate({"left": "-=1000px"}, 500);
		px = "#portfolio .pagination .grey" + i;
		$(px).css("background-color", "rgb(108, 195, 114)");
	});
});



//$(document).scroll(function(){console.log($(document).scrollTop())})