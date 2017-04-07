$(document).ready(function () {
  $(window).scroll(function () {
    if (window.pageYOffset > 0) {
      $('.scroll').addClass('hidden')
    } else {
      $('.scroll').removeClass('hidden')
    }

    if (window.pageYOffset > 300) {
      $('#logo').addClass('visible')
      $('#logo').removeClass('hidden')
      $('#menu-bar').addClass('menu__bar')
    } else {
      $('#logo').addClass('hidden')
      $('#logo').removeClass('visible')
       $('#menu-bar').removeClass('menu__bar')
    }
  })
})

$(".projetos__list").hover(function() {
  $(".projetos__list").removeClass("no-opacity").addClass("opacity");
  $(this).addClass("no-opacity").removeClass("opacity");
});



/* Parallax End */


/* Load */

$(window).on('load', function () {
  $('#load-item').fadeOut('fast', function () {
    $('.load').animate({ left: '-100%' }, function () {
      $('#home__titleNameMain').css('opacity', '1')
      $('#home__titleName').css('opacity', '1')
      $('#home__titleSub').css('opacity', '1')
      $('.fadeOn').css('opacity', '1')
    })
  })
})

/* End Load */

/* Slide */

var menu = true
var item_width = 0
var item_width_2 = 0
var left_indent = 0
var left_indent_2 = 0
var item = 0
var speed = 2000

$(document).ready(function () {
  $('#visor').css('width', $('.carousel__item').outerWidth()).css('height', $('.carousel__item').outerHeight())
  $('.carousel__item').clone().prependTo('#carousel_container-2 .slide').clone().prependTo('#carousel_container-2 .slide')
  rotate()
  timeout()
})

function timeout () {
  setTimeout(function () {
    rotate()
    rotateMobile()
    timeout()
  }, speed)
}

function rotate () {
  item_width_2 = $('#carousel_container-2 .carousel__item').outerWidth()
  left_indent_2 = parseInt($('.slide').css('left')) + item_width_2
  $('#carousel_container-2 .slide:not(:animated)').animate({ 'left': left_indent_2 }, 500, function () {
    $('#carousel_container-2 .carousel__item:first').before($('#carousel_container-2 .carousel__item:last'))
    $('#carousel_container-2 .slide').css({ 'left': - item_width_2 + 'px' })
  })
}

function rotateMobile () {
  item_width = $('#carousel_container .carousel__item').outerWidth()
  left_indent = parseInt($('.slide').css('left')) + item_width
  $('#carousel_container .slide:not(:animated)').animate({ 'left': left_indent }, 500, function () {
    $('#carousel_container .carousel__item:first').before($('#carousel_container .carousel__item:last'))
    $('#carousel_container .slide').css({ 'left': -item_width + 'px' })
  })
}

/* Slide End */

