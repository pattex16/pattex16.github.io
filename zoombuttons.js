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
