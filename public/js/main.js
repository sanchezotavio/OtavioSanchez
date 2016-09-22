var controller = new ScrollMagic.Controller()

var tween = new TimelineMax()
  .add([
    TweenMax.fromTo('#servicos #layer1', 1, { scale: 1, autoAlpha: 1, bottom: 0 + '%' }, { bottom: 0 + '%', ease: Linear.easeNone }),
    TweenMax.fromTo('#servicos #layer2', 1, { scale: 1, autoAlpha: 1, bottom: 0 + '%' }, { bottom: 20 + '%', ease: Linear.easeNone }),
    TweenMax.fromTo('#servicos #layer3', 1, { scale: 1, autoAlpha: 1, bottom: 0 + '%' }, { bottom: 40 + '%', ease: Linear.easeNone }),

    TweenMax.fromTo('#servicos #layer4', 1, { scale: 1, autoAlpha: 1, bottom: 0 + '%', width: 100 + '%' }, { bottom: 5 + '%', ease: Linear.easeNone }),
    TweenMax.fromTo('#servicos #layer5', 1, { scale: 1, autoAlpha: 1, bottom: 0 + '%', width: 100 + '%' }, { bottom: 15 + '%', ease: Linear.easeNone }),
    TweenMax.fromTo('#servicos #layer6', 1, { scale: 1, autoAlpha: 1, bottom: 0 + '%', width: 100 + '%' }, { bottom: 25 + '%', ease: Linear.easeNone }),

  ]);

var parallaxScene = new ScrollMagic.Scene({
  triggerElement: '#servicos',
  duration: 800
})
  .setTween(tween)
  .addTo(controller);

skrollr.init({
  forceHeight: false
});

var menu = true;

$(document).ready(function () {

  $(window).scroll(function () {
    if (window.pageYOffset > 0) {
      $(".scroll").addClass('hidden');
      $(".scroll").css('display','none');
    }
    else {
      $(".scroll").removeClass('hidden');
      $(".scroll").css('display','block');
    }
  });

  $('#menu').click(function () {
    if (menu) {
      menu = false;
      $('#menu').removeClass('open').addClass('close');
      $('#menu-container').removeClass('menu-open').addClass('menu-close');
    } else {
      menu = true;
      $('#menu').removeClass('close').addClass('open');
      $('#menu-container').removeClass('menu-close').addClass('menu-open');
    }
  });

  $("#bg").jParticle({
    background: "#151C23",
    color: "#262D34"
		});

  $('#navigation li a').click(function () {
    if (menu) {
      menu = false;
      $('#menu').removeClass('open').addClass('close');
      $('#menu-container').removeClass('menu-open').addClass('menu-close');
    } else {
      menu = true;
      $('#menu').removeClass('close').addClass('open');
      $('#menu-container').removeClass('menu-close').addClass('menu-open');
    }
  }
  );
});

$(window).on("load", function () {
  $('#load-item').fadeOut('fast', function () {
    $('.load').animate({ left: '-100%' })
  })
});

var ss = TweenMax.to("#servico1", 1.2, { opacity: 1, bottom: 0 });

var sceneServico1 = new ScrollMagic.Scene({ triggerElement: "#servicos" })
  .setTween(ss)
  .addTo(controller);

var ss2 = TweenMax.to("#servico2", 1.4, { opacity: 1, bottom: 0 });

var sceneServico2 = new ScrollMagic.Scene({ triggerElement: "#servicos #servico1" })
  .setTween(ss2)
  .addTo(controller);

var ss3 = TweenMax.to("#servico3", 1.6, { opacity: 1, bottom: 0 });

var sceneServico3 = new ScrollMagic.Scene({ triggerElement: "#servicos #servico2" })
  .setTween(ss3)
  .addTo(controller);

var topMenu = TweenMax.to(".top__header", 0.3, { background: "rgba(255, 255, 255, 1)", borderBottom: "1px solid rgb(74, 87, 93)" });

var topMenuLogo = TweenMax.to(".logo__link", 0.3, { opacity: 1 });

var sceneMenu = new ScrollMagic.Scene({ triggerElement: "#servicos" })
  .setTween(topMenu)
  .addTo(controller);

var sceneMenuLogo = new ScrollMagic.Scene({ triggerElement: "#servicos" })
  .setTween(topMenuLogo)
  .addTo(controller);

var projeto = TweenMax.to(".projeto", 1.2, { opacity: 1, bottom: 0 });

var sceneProjetos = new ScrollMagic.Scene({ triggerElement: "#projetos" })
  .setTween(projeto)
  .addTo(controller);
