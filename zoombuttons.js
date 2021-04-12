$("#magnify").click(function(){
  $("div").animate({
    fontSize: '+=3pt',
  });
});

$("#minimize").click(function(){
  $("div").animate({
    fontSize: '-=3pt',
  });
});

$("#p1").ready(function() {
	$(this).css({"font-size" : "-=3pt"});	
})
