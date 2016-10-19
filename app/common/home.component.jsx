import React, { Component } from 'react';

class Home extends Component {
    render() {
        return (
            <div className="wrap">
                <HomeSection />
                <ServicosSection />
                <ProjetosSection />
                <SobreSection />
                <SocialSection />
                <ContatoSection />
            </div>
        );
    }
}

var HomeSection = React.createClass({
    render: function () {
        return (
            <section className="home" id="home">                
                <article className="home__article">
                    <div className="home__center">
                        <hgroup className="home__group">
                            <h1 id="home__titleNameMain" className="home__title">Otávio</h1>
                            <h1 id="home__titleName" className="home__title">Sanchez</h1>
                            <h1 id="home__titleSub" className="home__title--sub">DESENVOLVEDOR WEB</h1>
                        </hgroup>
                        <div className="row display-flex fadeOn">
                            <div className="o-col-xs-12">
                                <a className="button button-1--main" href="/projetos">
                                    <svg>
                                        <rect fill="none" height="100%" width="100%" x="0" y="0">
                                        </rect></svg> Conheça Meus Projetos
                                </a>
                            </div>
                        </div>                     
                    </div>
                </article>
            </section>
        );
    }
});


var ServicosSection = React.createClass({
    render: function () {
        return (
            <section className="servicos border" id="servicos">

                <header className="servicos__header" id="app">
                    <h1 className="servicos__title">Serviços</h1>
                    <span className="division"></span>
                </header>

                <div className="container--body">

                    <article className="servico">
                        <div className="o-col-md-12 o-col-xs-6" id="servico1">
                            <h2 className="servicos__title">
                                SAV
                            </h2>
                            <p className="paragraph">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nunc nec accumsan velit, quis gravida odio.Aliquam mattis fermentum dictum.Vivamus ac diam vitae erat euismod maximus.Aenean porta, diam eu maximus finibus, libero magna facilisis odio, sit amet
                                ullamcorper augue velit at leo.Fusce id luctus ipsum.Nullam et bibendum justo.
                            </p>
                        </div>
                        <div className="o-col-md-12 o-col-xs-6">
                        </div>
                    </article>

                    <article className="servico">
                        <div className="o-col-md-12 o-col-xs-6" id="servico2">
                            <h2 className="servicos__title">
                                SAV
                            </h2>
                            <p className="paragraph">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nunc nec accumsan velit, quis gravida odio.Aliquam mattis fermentum dictum.Vivamus ac diam vitae erat euismod maximus.Aenean porta, diam eu maximus finibus, libero magna facilisis odio, sit amet
                                ullamcorper augue velit at leo.Fusce id luctus ipsum.Nullam et bibendum justo.
                            </p>
                        </div>
                        <div className="o-col-md-12 o-col-xs-6">
                        </div>
                    </article>

                    <article className="servico">
                        <div className="o-col-md-12 o-col-xs-6" id="servico3">
                            <h2 className="servicos__title">
                                SAV
                            </h2>
                            <p className="paragraph">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nunc nec accumsan velit, quis gravida odio.Aliquam mattis fermentum dictum.Vivamus ac diam vitae erat euismod maximus.Aenean porta, diam eu maximus finibus, libero magna facilisis odio, sit amet
                                ullamcorper augue velit at leo.Fusce id luctus ipsum.Nullam et bibendum justo.
                            </p>
                        </div>
                        <div className="o-col-md-12 o-col-xs-6">
                        </div>
                    </article>
                </div>
            </section>
        );
    }
});

var ProjetosSection = React.createClass({
    render: function () {
        return (
            <section className="projetos border" id="projetos">

                <header className="projetos__header">
                    <h1 className="projetos__title">
                        Projetos
                    </h1>
                    <span className="division"></span>
                    <h2 className="projetos__title--sub">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    </h2>
                    <div className="row">
                        <div className="o-col-xs-12">
                            <a className="button button-1" href="/projetos">
                                <svg>
                                    <rect fill="none" height="100%" width="100%" x="0" y="0">
                                    </rect>
                                </svg> Ver Todos
                            </a>
                        </div>
                    </div>
                </header>

                <div className="article">
                    <div className="carousel">
                        <div className="mobile">
                            <div id="visor" className="visor">
                                <div id='carousel_container'>
                                    <ul className="slide" id='carousel_ul'>
                                        <li className="carousel__item">
                                            <a href='#'><img className="carousel__image"  src="styles/images/min/mobile.jpg" alt="Slide 1" /></a>
                                        </li>
                                        <li className="carousel__item">
                                            <a href='#'><img className="carousel__image"  src="styles/images/min/mobile.jpg" alt="Slide 1" /></a>
                                        </li>
                                        <li className="carousel__item">
                                            <a href='#'><img className="carousel__image"  src="styles/images/min/mobile.jpg" alt="Slide 1" /></a>
                                        </li>
                                        <li className="carousel__item">
                                            <a href='#'><img className="carousel__image"  src="styles/images/min/mobile.jpg"alt="Slide 1" /></a>
                                        </li>
                                        <li className="carousel__item">
                                            <a href='#'><img className="carousel__image" src="styles/images/min/mobile.jpg" alt="Slide 1" /></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="carousel__bg"></div>
                        <div id='carousel_container-2'>
                            <div id='carousel_inner-2'>
                                <ul className="slide" id='carousel_ul-2'>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        );
    }
});

var SobreSection = React.createClass({
    render: function () {
        return (
            <section className="sobre border" id="sobre">
                <header className="sobre__header">
                    <h2 className="sobre__title">Quem Sou</h2>
                    <span className="division"></span>
                </header>
                <div className="container">
                    <article className="quem_sou">

                        <div id="quemsou" className="o-col-xs-6 o-col-lg-12">
                            <figure className="sobre__figure">
                                <img src="styles/images/otavio-sanchez.jpg" className="sobre__image" alt="Otávio Sanchez" />
                            </figure>
                            <h3 className="quem_sou__title">Olá, </h3>
                            <p className="paragraph">
                                Me chamo Otávio Sanchez, sou Desenvolvedor Web, entusiasta de tecnologia, autodidata e apaixonado por código.
                            </p>
                            <p className="paragraph">
                                Estudante do Bacharelado em Ciência e Tecnologia pela Universidade Federal do ABC - curso multidisciplinar - que me permitiu abrir espaço para novas possibilidades através da tecnologia da informação em suas mais diferentes vertentes.
                            </p>

                            <div className="sobre__row">
                                <div className="o-col-xs-12">
                                    <a className="button button-1" href="/quem_sou">
                                        <svg>
                                            <rect fill="none" height="100%" width="100%" x="0" y="0">
                                            </rect></svg> Veja Completo
                                    </a>
                                </div>
                            </div>


                        </div>
                        <div className="o-col-md-12 o-col-xs-6">
                            <div className="sobre__mobile">
                            <div className="display">
                          
                             <SVG name="battery" id="battery" class="battery" erro />
                         
                            <div className="hour">
                            {new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' , hour12: true })}
                            </div>
                            <SVG name="wifi" id="wifi" class="wifi" />
                            </div>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        );
    }
});

var SocialSection = React.createClass({
    render: function () {
        return (
            <div className="content_social border">
                <div className="overlay"></div>
                <header className="content_social__header">
                    <h1 className="content_social__title">
                        Redes Sociais
                    </h1>
                    <span className="division"></span>
                    <h2 className="content_social__title--sub">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    </h2>
                </header>
                <div>
                    <nav className="nav">
                        <ul className="social_network">
                            <li className="social_network__item--lite">
                                <a className="social_network__link" title="" href="#">
                                    <img src="styles/images/svg/githubWhite.svg" className="social_network__image" name="" alt="" />
                                </a>
                            </li>
                            <li className="social_network__item--lite">
                                <a className="social_network__link" title="" href="#">
                                    <img src="styles/images/svg/linkedinWhite.svg" className="social_network__image" name="" alt="" />
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
});

var ContatoSection = React.createClass({
    render: function () {
        return (
            <section id="contato" className="contato border">
                <header className="contato__header">
                    <h1 className="contato__title">
                        Contato
                    </h1>
                    <span className="division"></span>
                    <h2 className="contato__title--sub">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    </h2>
                </header>
                <div className="container">
                    <div id="contatos" className="o-col-md-12 o-col-xs-4">
                        <h2 className="contato__title--info">Entre em contato</h2>
                        <div className="contato__text">
                            Email: <a className="link" href="#">dev @otaviosanchez.com</a>
                        </div>
                        <div className="contato__text">
                            São Paulo - SP
                        </div>
                        <div className="contato__text">
                            Celular: <a className="link" href="#">1234-5678</a>
                        </div>
                    </div>
                    <div className="o-col-md-12 o-col-xs-8">
                        <form className="form">
                            <div className="o-col-md-12 o-col-xs-6">
                                <input type="text" name="assunto" id="assunto" className="textbox" placeholder="Assunto*" required />
                            </div>
                            <div className="o-col-md-12 o-col-xs-6">
                                <input type="tel" name="telefone" id="telefone" className="textbox" placeholder="Telefone" />
                            </div>
                            <div className="o-col-md-12 o-col-xs-6">
                                <input type="text" name="nome" id="nome" className="textbox" placeholder="Seu Nome*" required />
                            </div>
                            <div className="o-col-md-12 o-col-xs-6">
                                <input type="email" name="email" id="email" className="textbox" placeholder="Email*" required />
                            </div>
                            <div className="o-col-md-12 o-col-xs-12">
                                <textarea className="textbox--mensagem" name="mensagem" id="mensagem" placeholder="Mensagem*" required></textarea>
                            </div>
                            <div className="row">
                                <input type="submit" className="button button-2" value="Enviar" name="enviar" id="enviar" />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
});






var SVG = React.createClass({
    render: function () {
        return (
            <img id={this.props.id} className={this.props.class} onerror="this.src={'./styles/images/png/' + this.props.name + '.png'}" src={"./styles/images/svg/" + this.props.name + ".svg"} />
        );
    }
});

export default Home