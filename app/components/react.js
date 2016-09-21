


var Load = React.createClass({
    render: function () {
        return (         
            <img id="load-item" className="load__item" src="http://simpleicon.com/wp-content/uploads/cloud-2.svg" />
             );
    }
});


var Header = React.createClass({
    render: function () {
        return (

            <div className="container--header">
                <div className="o-col-xs-6 align_h_left">
                    <Logo href={mainLink} title={name} logo={"<OS>"} />
                </div>
                <nav className="o-col-xs-6 align_h_right">
                    <ButtonMenu />
                </nav>
            </div>
 
        );
    }
});

var Logo = React.createClass({
    render: function () {
        return (

            <h1 id="logo" className="logo__title">
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
           
                <div className="container center">
                    <div class="">
                      <nav className="nav__menu">
                        <ul className="list" id="navigation">
                            {paginas.map(function (l) {
                                return <li className="item">
                                    <a className="menu__link" title={l.title} href={l.href}>
                                        {l.title}
                                    </a>
                                </li>
                            }) }
                        </ul>
                    </nav>
                    </div>
                    <nav className="nav__menu">
                        <ul className="list">
                            {redesSociais.map(function (l) {
                                return <li className="menu__item">
                                    <a className="menu__link" title={l.title} href={l.href} target="_blank">
                                        <img src="styles/images/svg/ico.svg" className='menu__image' alt={l.title} />
                                    </a>
                                </li>
                            }) }
                        </ul>
                    </nav>
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
                            <img src={l.svg} className='social_network__image' alt={l.title} />
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


var mainLink = "otaviosanchez.com";

var name = "Otávio Sanchez"

var redesSociais = [
    { title: 'Linkedin', href: 'https://br.linkedin.com/in/ot%C3%A1vio-sanchez-88440294', svg: 'styles/images/svg/linkedin.svg' },
    { title: 'GitHub', href: 'https://github.com/sanchezotavio', svg: 'styles/images/svg/github.svg' }
];

var paginas = [
    { title: 'Home', href: '#home' },
    { title: 'Quem Sou', href: '#quemsou' },
    { title: 'Projetos', href: '#projetos' },
    { title: 'Contato', href: '#contato' }
];


ReactDOM.render(<Header />, document.getElementById('header'));

ReactDOM.render(<Load />, document.getElementById('load'));

ReactDOM.render(<Menu />, document.getElementById('menu-container'));