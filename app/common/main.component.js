import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router'

var Load = React.createClass({
    render: function () {
        return (
            <div className="load">
                <SVG name="load" id="load-item" class="load__item"/>
            </div>
        );
    }
});

var SVG = React.createClass({
    render: function () {
        return (<img
            id={this.props.id}
            className={this.props.class}
            onerror={this.src = '../styles/images/png/' + this.props.name + '.png'}
            src={"../styles/images/svg/" + this.props.name + ".svg"}/>);
    }
});

var SVGSprite = React.createClass({
    render: function () {
        return (
            <svg className={this.props.class}>
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
                    <ButtonMenu/>
                </div>
                <div className="o-col-xs-2 align_h_center">
                    <Logo href={mainLink} title={name} logo={"<OS>"}/>
                </div>
                <nav className="o-col-xs-5 align_h_right">
                    <NavRedesSociais/>
                </nav>
            </div>

        );
    }
});

var Logo = React.createClass({
    render: function () {
        return (

            <h1 id="logo" className="logo__title hidden">
                <Link to={`/`} className="logo__link" title={this.props.title}>
                    {this.props.logo}
                </Link>
            </h1>

        )
    }
});

var Menu = React.createClass({
    render: function () {
        return (

            <div id="Menu" className="container">
                <nav className="nav__menu o-col-xs-12">
                    <ul className="list" id="navigation">
                        {paginas
                            .map(function (l) {
                                return <li className="list__item" key={`${l.id}-paginas`}>
                                   <Link
                                        className="list__link link first after"
                                        title={l.title}
                                        to={`#${l.href}`}>
                                        {l.title}
                                    </Link>
                                </li>
                            })}
                    </ul>
                </nav>
            </div>

        )
    }
});

var ScrollItem = React.createClass({
    render: function () {
        return (
            <div className="scroll">
                <SVG name="scroll" id="scroll" className="scroll__button"/>
            </div>
        )
    }
});

var FooterText = React.createClass({
    render: function () {
        return (
            <div className="footer">
                <div className="container  align_h_center">
                    <nav className="nav">
                        <ul className="footer__nav" id="navigation">
                            {paginas
                                .map(function (l) {
                                    return <li className="footer__item" key={`${l.id}-paginas`}>
                                        <Link className="link first after" title={l.title} to={`/home#${l.href}`}>
                                            {l.title}
                                        </Link>
                                    </li>
                                })}
                        </ul>
                    </nav>
                </div>
                <FooterConteudo/>
            </div>
        )
    }
});

var FooterConteudo = React.createClass({
    render: function () {
        return (
            <div className="border space container">
                <div className="o-col-xs-6 o-col-lg-12  align_h_left--responsive">
                    <div className="text">
                        Desenvolvido por&nbsp;
                        <a href={mainLink} className="link first after" title={name}>{name}</a>.
                    </div>
                    <div className="text">
                        Copyright © {ano}
                        {name}.Todos os direitos reservados.
                    </div>
                </div>
                <div className="o-col-xs-6 o-col-lg-12  align_h_right--responsive">
                    <div className="text">
                        Entre em contato:
                    </div>
                    <div className="text">
                        <a href={"mailto:" + email} className="link first after" title={email}>{email}</a>
                    </div>
                </div>
            </div>
        )
    }
});

var NavRedesSociais = React.createClass({
    render: function () {
        return (

            <ul className="social_network">
                {redesSociais
                    .map(function (l) {
                        return <li className="social_network__item" key={`${l.title}-rs`}>
                            <a className="social_network__link" title={l.title} href={l.href}>
                                <SVGSprite class="social_network__image" id={l.title}/>
                            </a>
                        </li>
                    })}
            </ul>

        )
    }
});

var ButtonMenu = React.createClass({
    render: function () {
        return (<input type="button" id="menu" title="Menu" className="button--menu open"/>)
    }
})

var Footer = React.createClass({
    render: function () {
        return (<FooterText/>)
    }
})



var mainLink = "http://otaviosanchez.com/";

var email = "dev@otaviosanchez.com"

var name = "Otávio Sanchez";

var ano = new Date().toLocaleString('en-US', {year: 'numeric'})

var redesSociais = [
    {
        title: 'linkedin',
        href: 'https://br.linkedin.com/in/ot%C3%A1vio-sanchez-88440294',
        name: 'linkedin'
    }, {
        title: 'github',
        href: 'https://github.com/sanchezotavio',
        name: 'github'
    }
];

var paginas = [
    {
        title: 'Home',
        href: 'home',
        id: 1
    }, {
        title: 'Quem Sou',
        href: 'quemsou',
        id: 2
    }, {
        title: 'Projetos',
        href: 'projetos',
        id: 3
    }, {
        title: 'Contato',
        href: 'contato',
        id: 4
    }
];

class Main extends Component {

    render() {
        return (
            <div>
                <Load/>
                <ScrollItem/>
                <Header/> {this.props.children}
                <Footer/>
            </div>
        )
    }

}

export default Main
