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
            { classe: "footer" },
            React.createElement(
                "div",
                { className: "container  align_h_center" },
                React.createElement(
                    "nav",
                    { className: "nav" },
                    React.createElement(
                        "ul",
                        { className: "footer__nav", id: "navigation" },
                        paginas.map(function (l) {
                            return React.createElement(
                                "li",
                                { className: "footer__item" },
                                React.createElement(
                                    "a",
                                    { className: "link", title: l.title, href: l.href },
                                    l.title
                                )
                            );
                        })
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "border space container" },
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