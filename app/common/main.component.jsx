


var Load = React.createClass({
    render: function () {
        return (
            <SVG name="load" id="load-item" class="load__item" />
        );
    }
});


var SVG = React.createClass({
    render: function () {
        return (
            <img id={this.props.id} className={this.props.class} onerror={this.src = './styles/images/png/' + this.props.name + '.png'} src={"./styles/images/svg/" + this.props.name + ".svg"} />
        );
    }
});

var SVGSprite = React.createClass({
    render: function () {
        return (
            <svg  className={this.props.class}>
                <use xlinkHref={"#" + this.props.id}></use>
            </svg>
        );
    }
});

var Header = React.createClass({
    render: function () {
        return (

            <div id="menu-bar" className="container--header">
                <div className="o-col-xs-5 align_h_left">
                    <ButtonMenu />
                </div>
                <div className="o-col-xs-2 align_h_center">
                    <Logo href={mainLink} title={name} logo={"<OS>"} />
                </div>
                <nav className="o-col-xs-5 align_h_right">
                    <NavRedesSociais />
                </nav>
            </div>

        );
    }
});

var Logo = React.createClass({
    render: function () {
        return (

            <h1 id="logo" className="logo__title hidden">
                <a className="logo__link" href={this.props.href} title={this.props.title}>
                    {this.props.logo}
                </a>
            </h1>

        )
    }
});

var Menu = React.createClass({
    render: function () {
        return (
            <div class="row">
                <div className="container">
                    <nav className="nav__menu o-col-xs-12">
                        <ul className="list" id="navigation">
                            {paginas.map(function (l) {
                                return <li className="list__item">
                                    <a className="list__link link first after" title={l.title} href={checkURL() + l.href}>
                                        {l.title}
                                    </a>
                                </li>
                            }) }
                        </ul>
                    </nav>
                </div>
                <div className="scroll">
                    <SVG name="scroll" id="scroll" class="scroll__button"  />
                </div>
            </div>
        )
    }
});

var FooterText = React.createClass({
    render: function () {
        return (
            <div classe="footer">
                <div className="container  align_h_center">
                    <nav className="nav">
                        <ul className="footer__nav" id="navigation">
                            {paginas.map(function (l) {
                                return <li className="footer__item">
                                    <a className="link first after" title={l.title} href={checkURL() + l.href}>
                                        {l.title}
                                    </a>
                                </li>
                            }) }
                        </ul>
                    </nav>
                </div>
                <FooterConteudo />
            </div>
        )
    }
});


var FooterConteudo = React.createClass({
    render: function () {
        return (
            <div className="border space container">
                <div className="o-col-xs-6 o-col-lg-12  align_h_left--responsive">
                    <div class="text">
                        Desenvolvido por <a href={mainLink} className="link first after" title={name}>{name}</a>.
                    </div>
                    <div class="text">
                        Copyright © {ano} {name}.Todos os direitos reservados.
                    </div>
                </div>
                <div className="o-col-xs-6 o-col-lg-12  align_h_right--responsive">
                    <div class="text"> Entre em contato: </div>
                    <div class="text"> <a href={"mailto:" + email} className="link first after" title={email}>{email}</a> </div>
                </div>
            </div>
        )
    }
});


var NavRedesSociais = React.createClass({
    render: function () {
        return (

            <ul className="social_network">
                {redesSociais.map(function (l) {
                    return <li className="social_network__item">
                        <a className="social_network__link" title={l.title} href={l.href}>
                            <SVGSprite class="social_network__image" id={l.title} />
                        </a>
                    </li>
                }) }
            </ul>

        )
    }
});

var ButtonMenu = React.createClass({
    render: function () {
        return (
            <input type="button" id="menu" title="Menu" className="button--menu open" />
        )
    }
})

var Footer = React.createClass({
    render: function () {
        return (
            <div class="container">
                <FooterText />
            </div>
        )
    }
})

function checkURL(){
    if(document.location.pathname != "/index.html" || document.location.pathname != "/"){
        return mainLink + "index.html"
    }
}

var mainLink = "http://otaviosanchez.com/";

var email = "dev@otaviosanchez.com"

var name = "Otávio Sanchez";

var ano = new Date().toLocaleString('en-US', { year: 'numeric' })

var redesSociais = [
    { title: 'linkedin', href: 'https://br.linkedin.com/in/ot%C3%A1vio-sanchez-88440294', name: 'linkedin' },
    { title: 'github', href: 'https://github.com/sanchezotavio', name: 'github' }
];

var paginas = [
    { title: 'Home', href:   '#home' },
    { title: 'Quem Sou', href: '#quemsou' },
    { title: 'Projetos', href:  '#projetos' },
    { title: 'Contato', href:   '#contato' }
];


ReactDOM.render(<Header />, document.getElementById('header'));

ReactDOM.render(<Load />, document.getElementById('load'));

ReactDOM.render(<Menu />, document.getElementById('menu-container'));

ReactDOM.render(<Footer />, document.getElementById('footer'));