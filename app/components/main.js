/* Parallax */

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

/* Particles */

$('#bg').jParticle({
  background: '#232730',
  color: 'rgba(70, 83, 93, 0.4)'
})

/* End Particles */

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
