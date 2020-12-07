const menuBtn = document.querySelector('.menuButton');
const drinkBtn = document.querySelector('.drink-Button');

function showMenu () {
  const menuDivs = document.querySelectorAll('.menu-container');

  menuDivs.forEach((div) => {
    // div.style.display = "block"
    if(div.style.display === "none"){
      div.style.display = "block";
    } else{
      div.style.display = "none";
    }

  })
}

function drinkMenu () {
  const drinkDivs = document.querySelectorAll('.drink-menu-container');

  drinkDivs.forEach((div) => {

    if(div.style.display === "none"){
      div.style.display = "block";
    } else{
      div.style.display = "none";
    }

  })
}

menuBtn.addEventListener('click', showMenu);
drinkBtn.addEventListener('click', drinkMenu);

$(document).ready(function() {
  $("#myCarousel").on("slide.bs.carousel", function(e) {
    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 3;
    var totalItems = $(".carousel-item").length;

    if (idx >= totalItems - (itemsPerSlide - 1)) {
      var it = itemsPerSlide - (totalItems - idx);
      for (var i = 0; i < it; i++) {
        // append slides to end
        if (e.direction == "left") {
          $(".carousel-item")
            .eq(i)
            .appendTo(".carousel-inner");
        } else {
          $(".carousel-item")
            .eq(0)
            .appendTo($(this).find(".carousel-inner"));
        }
      }
    }
  });
});
