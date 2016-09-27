var Load = React.createClass({
    displayName: "Load",

    render: function () {
        return React.createElement(SVG, { name: "load", id: "load-item", "class": "load__item" });
    }
});

var SVG = React.createClass({
    displayName: "SVG",

    render: function () {
        return React.createElement("img", { id: this.props.id, className: this.props.class, src: "./styles/images/svg/" + this.props.name + ".svg" });
    }
});

var Header = React.createClass({
    displayName: "Header",

    render: function () {
        return React.createElement(
            "div",
            { className: "container--header" },
            React.createElement(
                "div",
                { className: "o-col-xs-5 align_h_left" },
                React.createElement(ButtonMenu, null)
            ),
            React.createElement(
                "div",
                { className: "o-col-xs-2 align_h_center" },
                React.createElement(Logo, { href: mainLink, title: name, logo: "<OS>" })
            ),
            React.createElement(
                "nav",
                { className: "o-col-xs-5 align_h_right" },
                React.createElement(NavRedesSociais, null)
            )
        );
    }
});

var Logo = React.createClass({
    displayName: "Logo",

    render: function () {
        return React.createElement(
            "h1",
            { id: "logo", className: "logo__title" },
            React.createElement(
                "a",
                { className: "logo__link", href: this.props.href, title: this.props.title },
                this.props.logo
            )
        );
    }
});

var Menu = React.createClass({
    displayName: "Menu",

    render: function () {
        return React.createElement(
            "div",
            { "class": "row" },
            React.createElement(
                "div",
                { className: "container" },
                React.createElement(
                    "nav",
                    { className: "nav__menu o-col-xs-12" },
                    React.createElement(
                        "ul",
                        { className: "list", id: "navigation" },
                        paginas.map(function (l) {
                            return React.createElement(
                                "li",
                                { className: "list__item" },
                                React.createElement(
                                    "a",
                                    { className: "list__link", title: l.title, href: l.href },
                                    l.title
                                )
                            );
                        })
                    )
                ),
                React.createElement(
                    "div",
                    { className: "footer o-col-xs-12" },
                    React.createElement(FooterText, null)
                )
            )
        );
    }
});

var FooterText = React.createClass({
    displayName: "FooterText",

    render: function () {
        return React.createElement(
            "div",
            { className: "container border space" },
            React.createElement(
                "div",
                { className: "o-col-xs-6 o-col-lg-12  align_h_left--responsive" },
                React.createElement(
                    "div",
                    { "class": "text" },
                    "Desenvolvido por ",
                    React.createElement(
                        "a",
                        { href: mainLink, className: "link", title: name },
                        name
                    ),
                    "."
                ),
                React.createElement(
                    "div",
                    { "class": "text" },
                    "Copyright © ",
                    ano,
                    " ",
                    name,
                    ".Todos os direitos reservados."
                )
            ),
            React.createElement(
                "div",
                { className: "o-col-xs-6 o-col-lg-12  align_h_right--responsive" },
                React.createElement(
                    "div",
                    { "class": "text" },
                    " Entre em contato: "
                ),
                React.createElement(
                    "div",
                    { "class": "text" },
                    " ",
                    React.createElement(
                        "a",
                        { href: "mailto:" + email, className: "link", title: email },
                        email
                    ),
                    " "
                )
            )
        );
    }
});

var NavRedesSociais = React.createClass({
    displayName: "NavRedesSociais",

    render: function () {
        return React.createElement(
            "ul",
            { className: "social_network" },
            redesSociais.map(function (l) {
                return React.createElement(
                    "li",
                    { className: "social_network__item" },
                    React.createElement(
                        "a",
                        { className: "social_network__link", title: l.title, href: l.href },
                        React.createElement(SVG, { "class": "social_network__image", name: l.name, alt: l.title })
                    )
                );
            })
        );
    }
});

var ButtonMenu = React.createClass({
    displayName: "ButtonMenu",

    render: function () {
        return React.createElement("input", { type: "button", id: "menu", title: "Menu", className: "button--menu open" });
    }
});

var Footer = React.createClass({
    displayName: "Footer",

    render: function () {
        return React.createElement(
            "div",
            { "class": "container" },
            React.createElement(FooterText, null)
        );
    }
});

var mainLink = "otaviosanchez.com";

var email = "dev@otaviosanchez.com";

var name = "Otávio Sanchez";

var ano = new Date().getFullYear;

var redesSociais = [{ title: 'Linkedin', href: 'https://br.linkedin.com/in/ot%C3%A1vio-sanchez-88440294', name: 'linkedin' }, { title: 'GitHub', href: 'https://github.com/sanchezotavio', name: 'github' }];

var paginas = [{ title: 'Home', href: '#home' }, { title: 'Quem Sou', href: '#quemsou' }, { title: 'Projetos', href: '#projetos' }, { title: 'Contato', href: '#contato' }];

ReactDOM.render(React.createElement(Header, null), document.getElementById('header'));

ReactDOM.render(React.createElement(Load, null), document.getElementById('load'));

ReactDOM.render(React.createElement(Menu, null), document.getElementById('menu-container'));

ReactDOM.render(React.createElement(Footer, null), document.getElementById('footer'));
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

$(document).ready(function () {
  $(window).scroll(function () {
    if (window.pageYOffset > 0) {
      $('.scroll').addClass('hidden')
      $('.scroll').css('opacity', '0')
    }else {
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
    $('.load').animate({ left: '-100%' })
  })
})

/* End Load */

/* Slide */

var menu = true
var item_width = 0
var left_value = 0


$(document).ready(function () {
  item_width = $('.carousel__item').outerWidth();
  left_value = item_width * (-1);
  $('.slide').clone().prependTo('#visor');
  $('#visor').css("width", $('.carousel__item').outerWidth());
  $('#visor').css("height",$('.carousel__item').outerHeight());
  var speed = 2000
  var run = setInterval('rotate()', speed)
})

function rotate () {
  var left_indent = parseInt($('.slide').css('left')) - item_width ;

    $('.slide').animate({ 'left': left_indent }, 200, function () {
    $('.carousel__item:last').after($('.carousel__item:first'))
    $('.slide').css({ 'left': left_value })
  })

  return false
}

/* Slide End */
