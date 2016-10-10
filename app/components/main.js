var controller = new ScrollMagic.Controller()

var tween = new TimelineMax()
  .add([
    TweenMax.fromTo('#servicos #layer1', 1, { scale: 1, autoAlpha: 1, bottom: 0 + '%' }, { bottom: 0 + '%', ease: Linear.easeNone }),
    TweenMax.fromTo('#servicos #layer2', 1, { scale: 1, autoAlpha: 1, bottom: 0 + '%' }, { bottom: 20 + '%', ease: Linear.easeNone }),
    TweenMax.fromTo('#servicos #layer3', 1, { scale: 1, autoAlpha: 1, bottom: 0 + '%' }, { bottom: 40 + '%', ease: Linear.easeNone }),

    TweenMax.fromTo('#servicos #layer4', 1, { scale: 1, autoAlpha: 1, bottom: 0 + '%', width: 100 + '%' }, { bottom: 5 + '%', ease: Linear.easeNone }),
    TweenMax.fromTo('#servicos #layer5', 1, { scale: 1, autoAlpha: 1, bottom: 0 + '%', width: 100 + '%' }, { bottom: 15 + '%', ease: Linear.easeNone }),
    TweenMax.fromTo('#servicos #layer6', 1, { scale: 1, autoAlpha: 1, bottom: 0 + '%', width: 100 + '%' }, { bottom: 25 + '%', ease: Linear.easeNone })

  ])

var parallaxScene = new ScrollMagic.Scene({
  triggerElement: '#servicos',
  duration: 800
})
  .setTween(tween)
  .addTo(controller)

skrollr.init({
  forceHeight: false
})

var ss = TweenMax.to('#servico1', 1.2, { opacity: 1, bottom: 0 })

var sceneServico1 = new ScrollMagic.Scene({ triggerElement: '#servicos' })
  .setTween(ss)
  .addTo(controller)

var ss2 = TweenMax.to('#servico2', 1.4, { opacity: 1, bottom: 0 })

var sceneServico2 = new ScrollMagic.Scene({ triggerElement: '#servicos #servico1' })
  .setTween(ss2)
  .addTo(controller)

var ss3 = TweenMax.to('#servico3', 1.6, { opacity: 1, bottom: 0 })

var sceneServico3 = new ScrollMagic.Scene({ triggerElement: '#servicos #servico2' })
  .setTween(ss3)
  .addTo(controller)

var topMenu = TweenMax.to('.top__header', 0.3, { background: 'rgba(25, 29, 38, 0.8)', borderBottom: '1px solid rgba(26, 29, 34, 1)' })

var topMenuLogo = TweenMax.to('.logo__link', 0.3, { opacity: 1 })

var sceneMenu = new ScrollMagic.Scene({ triggerElement: '#servicos' })
  .setTween(topMenu)
  .addTo(controller)

var sceneMenuLogo = new ScrollMagic.Scene({ triggerElement: '#servicos' })
  .setTween(topMenuLogo)
  .addTo(controller)

var sqs = TweenMax.to('#quemsou', 1.6, { opacity: 1, bottom: 0 })

var sceneQuemSou = new ScrollMagic.Scene({ triggerElement: '#sobre' })
  .setTween(sqs)
  .addTo(controller)



var sc = TweenMax.to('#contatos', 1.6, { opacity: 1, bottom: 0 })

var sceneContato = new ScrollMagic.Scene({ triggerElement: '#contato' })
  .setTween(sc)
  .addTo(controller)



$(document).ready(function () {
  $(window).scroll(function () {
    if (window.pageYOffset > 0) {
      $('.scroll').addClass('hidden')
      $('.scroll').css('opacity', '0')
    } else {
      $('.scroll').removeClass('hidden')
      $('.scroll').css('opacity', '1')
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
          $('#home__titleNameMain').css('opacity', '1');
          $('#home__titleName').css('opacity', '1');
          $('#home__titleSub').css('opacity', '1');
          $('.fadeOn').css('opacity', '1');
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

function timeout() {
  setTimeout(function () {
      rotate()
      rotateMobile()
    timeout()
  }, speed)
}

function rotate() {
    item_width_2 = $('#carousel_container-2 .carousel__item').outerWidth()
    left_indent_2 = parseInt($('.slide').css('left')) + item_width_2
    $('#carousel_container-2 .slide:not(:animated)').animate({ 'left': left_indent_2 }, 500, function () {
    $('#carousel_container-2 .carousel__item:first').before($('#carousel_container-2 .carousel__item:last'))
    $('#carousel_container-2 .slide').css({ 'left': - item_width_2 + 'px' })
  })
}

function rotateMobile() {
    item_width = $('#carousel_container .carousel__item').outerWidth()
    left_indent = parseInt($('.slide').css('left')) + item_width
    $('#carousel_container .slide:not(:animated)').animate({ 'left': left_indent }, 500, function () {
        $('#carousel_container .carousel__item:first').before($('#carousel_container .carousel__item:last'))
        $('#carousel_container .slide').css({ 'left': -item_width + 'px' })
    })
}

/* Slide End */

particlesJS('particles', {
  "particles": {
    "number": {
      "value": 120,
      "density": {
        "enable": true,
        "value_area":1000
      }
    },
    "color": {
      "value": ["#f26838", "#6d737f"]
    },
    
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#fff"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.6,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 2,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.3,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 100,
      "color": "#ffffff",
      "opacity": 0.2,
      "width": 1
    },
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": false
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});
/* Slide */

var menu = true
var item_width = 0
var item_width_2 = 0
var left_indent = 0
var left_indent_2 = 0
var item = 0
var speed = 2000

particlesJS('bg',
  
  {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#cccccc"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 5,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 100,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    "config_demo": {
      "hide_card": false,
      "background_color": "#b61924",
      "background_image": "",
      "background_position": "50% 50%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
  }
);
