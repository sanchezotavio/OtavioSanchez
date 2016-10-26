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

/* Parallax End */

/* Menu */

$('#menu').click(function () {
  if (menu) {
    menu = false
    $('#menu').removeClass('open').addClass('close')
    $('#menu-container').removeClass('menu-open').addClass('menu-close')
  } else {
    menu = true
    $('#menu').removeClass('close').addClass('open')
    $('#menu-container').removeClass('menu-close').addClass('menu-open')
  }
})

$(document).ready(function () {
  $('#navigation li a').click(function () {
    if (menu) {
      menu = false
      $('#menu').removeClass('open').addClass('close')
      $('#menu-container').removeClass('menu-open').addClass('menu-close')
    } else {
      menu = true
      $('#menu').removeClass('close').addClass('open')
      $('#menu-container').removeClass('menu-close').addClass('menu-open')
    }
  }
  )
})

/* Menu End */

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

var particles = 120
var area = 1000

if ($(window).width() < 800) {
  particles = 50
  area = 500
}

particlesJS('particles', {
  'particles': {
    'number': {
      'value': particles,
      'density': {
        'enable': true,
        'value_area': area
      }
    },
    'color': {
      'value': ['#f26838', '#6d737f']
    },

    'shape': {
      'type': 'circle',
      'stroke': {
        'width': 0,
        'color': '#fff'
      },
      'polygon': {
        'nb_sides': 5
      },
      'image': {
        'src': 'img/github.svg',
        'width': 100,
        'height': 100
      }
    },
    'opacity': {
      'value': 0.6,
      'random': false,
      'anim': {
        'enable': false,
        'speed': 1,
        'opacity_min': 0.1,
        'sync': false
      }
    },
    'size': {
      'value': 2,
      'random': true,
      'anim': {
        'enable': false,
        'speed': 40,
        'size_min': 0.3,
        'sync': false
      }
    },
    'line_linked': {
      'enable': true,
      'distance': 100,
      'color': '#ffffff',
      'opacity': 0.2,
      'width': 1
    }
  },
  'interactivity': {
    'detect_on': 'canvas',
    'events': {
      'onhover': {
        'enable': true,
        'mode': 'grab'
      },
      'onclick': {
        'enable': false
      },
      'resize': true
    },
    'modes': {
      'grab': {
        'distance': 140,
        'line_linked': {
          'opacity': 1
        }
      },
      'bubble': {
        'distance': 400,
        'size': 40,
        'duration': 2,
        'opacity': 8,
        'speed': 3
      },
      'repulse': {
        'distance': 200,
        'duration': 0.4
      },
      'push': {
        'particles_nb': 4
      },
      'remove': {
        'particles_nb': 2
      }
    }
  },
  'retina_detect': true
})
