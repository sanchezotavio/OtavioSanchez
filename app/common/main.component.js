import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router'
import ImageScroll from '../../styles/images/svg/scroll.svg'
import ImageLoad from '../../styles/images/svg/load.svg'

class Load extends React.Component {
    render() {
        return (
            <div className={`load ${this.props.loading}`}>
                <img
                    name="load-item"
                    title="load-item"
                    className={`load__item`}
                    src={ImageLoad}/>
            </div>
        );
    }
}

class SVGSprite extends React.Component {
    render() {
        return (
            <svg className={this.props.class}>
                <use xlinkHref={"#" + this.props.id}></use>
            </svg>
        );
    }
};

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: true
        };

        this.handleClick = this
            .handleClick
            .bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render() {
        return (
            <div>
                <div id="menu-bar" className="container--header">
                    <div className="o-col-xs-5 align_h_left">
                        <button
                            className={`button--menu ${this.state.isToggleOn
                            ? 'open'
                            : 'close'}`}
                            onClick={this.handleClick}></button>
                    </div>
                    <div className="o-col-xs-2 align_h_center">
                        <Logo href={mainLink} title={name} logo={"<OS>"}/>
                    </div>
                    <nav className="o-col-xs-5 align_h_right">
                        <NavRedesSociais/>
                    </nav>

                </div>
                <div
                    id="Menu"
                    className={`menu ${this.state.isToggleOn
                    ? 'menu-open'
                    : 'menu-close'}`}>
                    <nav className="nav__menu o-col-xs-12">
                        <ul className="list" id="navigation">
                            {paginas
                                .map(function (l) {
                                    return <li key={`${l.id}-paginas-menu`} className="list__item">
                                        <Link
                                            className="list__link link first after"
                                            title={l.title}
                                            onClick={this
                                            .handleClick
                                            .bind(this)}
                                            key={`${l.id}-paginas-menu`}
                                            to={`/${l.href}`}>
                                            {l.title}
                                        </Link>
                                    </li>
                                }, this)}
                        </ul>
                    </nav>
                </div>
            </div>

        );
    }
};

class Logo extends React.Component {
    render() {
        return (

            <h1 id="logo" className="logo__title hidden">
                <Link to={`/`} className="logo__link" title={this.props.title}>
                    {this.props.logo}
                </Link>
            </h1>

        )
    }
};

class ScrollItem extends React.Component {
    render() {
        return (
            <div className="scroll">
                <img id="scroll" className="scroll__button" src={ImageScroll}/>
            </div>
        )
    }
};

class FooterText extends React.Component {
    render() {
        return (
            <div className="footer">
                <div className="container  align_h_center">
                    <nav className="nav">
                        <ul className="footer__nav" id="navigation">
                            {paginas
                                .map(function (l) {
                                    return <li className="footer__item" key={`${l.id}-paginas--li`}>
                                        <Link
                                            className="link first after"
                                            title={l.title}
                                            to={`/${l.href}`}
                                            key={`${l.id}-paginas--link`}>
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
};

class FooterConteudo extends React.Component {
    render() {
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
};

class NavRedesSociais extends React.Component {
    render() {
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
};

class Footer extends React.Component {
    render() {
        return (<FooterText/>)
    }
}

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
        href: 'quem_sou',
        id: 2
    }, {
        title: 'Projetos',
        href: 'projetos',
        id: 3
    }
];

class Main extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            loading: ''
        };
    }

   componentDidMount() {
    setTimeout(() => this.setState({ loading: 'loadComplete' }), 500); 
  }

    render() {
        return (
            <div>
                <Load loading={this.state.loading}/>
                <ScrollItem/>
                <Header/> {this.props.children}
                <Footer/>
            </div>
        )
    }

}

export default Main
