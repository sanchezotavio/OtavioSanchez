import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Particles from 'react-particles-js';
import {Link} from 'react-router'

import nilsan1 from '../../styles/images/png/nilsan-1.PNG'
import igapira1 from '../../styles/images/png/igapira-1.png'
import igapira2 from '../../styles/images/png/igapira-2.png'
import otaviosanchez from '../../styles/images/otavio-sanchez.jpg'

var particles = 120
var area = 1000

if ($(window).width() < 800) {
    particles = 50
    area = 500
}
var particles = 120
var area = 1000

if ($(window).width() < 800) {
    particles = 50
    area = 500
}

class Home extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
        document.title = "Otávio Sanchez - Desenvolvedor Web"
    }
    render() {
        return (
            <div className="wrap">
                <HomeSection/>
                <ServicosSection/>
                <ProjetosSection/>
                <SobreSection/>
                <SocialSection/>
                <ContatoSection/>
            </div>
        );
    }
}

class ParticlesHome extends React.Component {
    render() {
        return (
            <div className="ParticlesHome">
                <Particles
                    params={{
                    'particles': {
                        'number': {
                            'value': particles,
                            'density': {
                                'enable': true,
                                'value_area': area
                            }
                        },
                        'color': {
                            'value': ['#f26838', '#6d737f']
                        },
                        'shape': {
                            'type': 'circle',
                            'stroke': {
                                'width': 0,
                                'color': '#fff'
                            },
                            'polygon': {
                                'nb_sides': 5
                            },
                            'image': {
                                'src': 'img/github.svg',
                                'width': 100,
                                'height': 100
                            }
                        },
                        'opacity': {
                            'value': 0.6,
                            'random': false,
                            'anim': {
                                'enable': false,
                                'speed': 1,
                                'opacity_min': 0.1,
                                'sync': false
                            }
                        },
                        'size': {
                            'value': 2,
                            'random': true,
                            'anim': {
                                'enable': false,
                                'speed': 40,
                                'size_min': 0.3,
                                'sync': false
                            }
                        },
                        'line_linked': {
                            'enable': true,
                            'distance': 100,
                            'color': '#ffffff',
                            'opacity': 0.2,
                            'width': 1
                        }
                    },
                    'interactivity': {
                        'detect_on': 'canvas',
                        'events': {
                            'onhover': {
                                'enable': true,
                                'mode': 'grab'
                            },
                            'onclick': {
                                'enable': false
                            },
                            'resize': true
                        },
                        'modes': {
                            'grab': {
                                'distance': 140,
                                'line_linked': {
                                    'opacity': 1
                                }
                            },
                            'bubble': {
                                'distance': 400,
                                'size': 40,
                                'duration': 2,
                                'opacity': 8,
                                'speed': 3
                            },
                            'repulse': {
                                'distance': 200,
                                'duration': 0.4
                            },
                            'push': {
                                'particles_nb': 4
                            },
                            'remove': {
                                'particles_nb': 2
                            }
                        }
                    },
                    'retina_detect': true
                }}/>
            </div>
        )
    }
}

class HomeSection extends React.Component {
    render() {
        return (
            <section className="home" id="home">
                <ParticlesHome/>
                <article className="home__article">
                    <div className="home__center">
                        <hgroup className="home__group">
                            <h1 id="home__titleNameMain" className="home__title">Otávio</h1>
                            <h1 id="home__titleName" className="home__title">Sanchez</h1>
                            <h1 id="home__titleSub" className="home__title--sub">DESENVOLVEDOR WEB</h1>
                        </hgroup>
                        <div className="row display-flex fadeOn">
                            <div className="o-col-xs-12">
                                <Link className="button button-1--main" to="/projetos">
                                    <svg>
                                        <rect fill="none" height="100%" width="100%" x="0" y="0"></rect>
                                    </svg>
                                    Conheça Meus Projetos
                                </Link>
                            </div>
                        </div>
                    </div>
                </article>
            </section>
        );
    }
};

class ServicosSection extends React.Component {
    render() {
        return (
            <section className="section servicos border" id="servicos">

                <header className="servicos__header" id="app">
                    <h1 className="servicos__title">Serviços</h1>
                    <span className="division"></span>
                </header>

                <div className="container--body">

                    <article className="servico">
                        <div className="o-col-xs-6 o-col-md-12 order-2" id="servico3">
                            <h2 className="servicos__title">
                                Planejamento e eficiência
                            </h2>
                            <p className="paragraph">
                                Cada sistema web é desenvolvido sob medida.Isso permite uma resposta adequada às
                                suas necessidades e elimina funcionalidades e custos desnecessários.
                            </p>
                        </div>
                        <div className="o-col-xs-6 o-col-md-12 order-1">
                            <SVGSprite id="servicos_3" class="servicos__image"/>
                        </div>
                    </article>

                    <article className="servico">
                        <div className="o-col-xs-6 o-col-md-12 order-1">
                            <SVGSprite id="servicos_2" class="servicos__image"/>
                        </div>
                        <div className="o-col-xs-6 o-col-md-12 order-2" id="servico2">
                            <h2 className="servicos__title">
                                Desenvolvimento de Sistemas Web
                            </h2>
                            <p className="paragraph">
                                Desenvolvimento de sistemas web exclusivos, personalizados e criativos de acordo
                                com os seus requisitos.Buscando sempre novas tecnologias, capazes de otimizar os
                                processos de seu negócio.
                            </p>
                        </div>
                    </article>

                    <article className="servico">
                        <div className="o-col-xs-6 o-col-md-12 order-2" id="servico1">
                            <h2 className="servicos__title">
                                Idéias para o seu negócio
                            </h2>
                            <p className="paragraph">
                                Estudando e entendendo os usuário que vão utilizar o sistema web, unindo a visão
                                de negócio com a visão do usuário e a tecnologia necessária.
                            </p>
                        </div>
                        <div className="o-col-xs-6 o-col-md-12 order-1">
                            <SVGSprite id="servicos_1" class="servicos__image"/>
                        </div>
                    </article>
                </div>
            </section>
        );
    }
}

class ProjetosSection extends React.Component {
    render() {
        return (
            <section className="section projetos border" id="projetos">

                <header className="projetos__header">
                    <h1 className="projetos__title">
                        Projetos
                    </h1>
                    <span className="division"></span>
                    <h2 className="projetos__title--sub">
                        Conheça meu Portfólio e alguns de meus projetos pessoais.

                    </h2>
                    <div className="row">
                        <div className="o-col-xs-12">
                            <Link className="button button-1" to="/projetos">
                                <svg>
                                    <rect fill="none" height="100%" width="100%" x="0" y="0"></rect>
                                </svg>
                                Ver Todos
                            </Link>
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
                                            <img
                                                className="carousel__image"
                                                src={nilsan1}
                                                alt="Slide 1"/>
                                        </li>
                                        <li className="carousel__item">
                                            <img
                                                className="carousel__image"
                                                src={igapira1}
                                                alt="Slide 1"/>
                                        </li>
                                        <li className="carousel__item">
                                            <img
                                                className="carousel__image"
                                                src={igapira2}
                                                alt="Slide 1"/>
                                        </li>
                                        <li className="carousel__item">
                                            <img
                                                className="carousel__image"
                                                src={nilsan1}
                                                alt="Slide 1"/>
                                        </li>
                                        <li className="carousel__item">
                                            <img
                                                className="carousel__image"
                                                src={igapira2}
                                                alt="Slide 1"/>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="carousel__bg"></div>
                        <div id='carousel_container-2'>
                            <div id='carousel_inner-2'>
                                <ul className="slide" id='carousel_ul-2'></ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        );
    }
};

class SobreSection extends React.Component {
    render() {
        return (
            <section className="sobre border" id="quemsou">
                <header className="sobre__header">
                    <h2 className="sobre__title">Quem Sou</h2>
                    <span className="division"></span>
                </header>
                <div className="container--body">
                    <div className="quem_sou">

                        <div className="o-col-xs-12 align_h_center">
                            <figure className="sobre__figure">
                                <img
                                    src={otaviosanchez}
                                    className="sobre__image"
                                    alt="Otávio Sanchez"
                                    title="Otávio Sanchez"/>
                            </figure>
                            <article id="quemsou">
                                <p className="paragraph">
                                    Olá, eu sou Otávio Sanchez.Sou Desenvolvedor Web, entusiasta de tecnologia,
                                    autodidata e apaixonado por código.
                                </p>
                                <p className="paragraph">
                                    Estudante do Bacharelado em Ciência e Tecnologia pela Universidade Federal do
                                    ABC - curso multidisciplinar - que me permitiu abrir espaço para novas
                                    possibilidades através da tecnologia da informação em suas mais diferentes
                                    vertentes.
                                </p>

                                <div className="sobre__row">
                                    <div className="o-col-xs-12">
                                        <Link className="button button-1" to="/quem_sou">
                                            <svg>
                                                <rect fill="none" height="100%" width="100%" x="0" y="0"></rect>
                                            </svg>
                                            Veja Completo
                                        </Link>
                                    </div>
                                </div>
                            </article>

                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

class mobileItem extends React.Component {
    render() {
        return (
            <div className="o-col-md-12 o-col-xs-6">
                <div className="sobre__mobile">
                    <div className="display">

                        <SVGSprite id="battery" class="battery"/>

                        <div className="hour">
                            {new Date().toLocaleString('en-US', {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true
                            })}
                        </div>

                        <SVGSprite id="wifi" class="wifi"/>

                    </div>
                </div>
            </div>
        );
    }
};

class SocialSection extends React.Component {
    render() {
        return (
            <div className="content_social border">
                <div className="overlay"></div>
                <header className="content_social__header">
                    <h1 className="content_social__title">
                        Redes Sociais
                    </h1>
                    <span className="division"></span>

                </header>
                <div>
                    <nav className="nav">
                        <ul className="social_network">
                            <li className="social_network__item--lite">
                                <a
                                    className="social_network__link"
                                    title="GitHub"
                                    target="_blank"
                                    href="https://github.com/sanchezotavio">
                                    <SVGSprite id="githubWhite" class="social_network__image"/>
                                </a>
                            </li>
                            <li className="social_network__item--lite">
                                <a
                                    className="social_network__link"
                                    title="Linkedin"
                                    target="_blank"
                                    target="_blank"
                                    href="https://www.linkedin.com/in/ot%C3%A1vio-sanchez-a3ba967a">
                                    <SVGSprite id="linkedinWhite" class="social_network__image"/>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
};

class ContatoSection extends React.Component {
    render() {
        return (
            <section id="contato" className="contato border">
                <header className="contato__header">
                    <h1 className="contato__title">
                        Contato
                    </h1>
                    <span className="division"></span>
                    <h2 className="contato__title--sub">
                        Deseja entrar em contato comigo?
                    </h2>
                </header>
                <div className="container">
                    <div id="contatos" className="o-col-md-12 o-col-xs-4">
                        <h2 className="contato__title--info">Entre em contato</h2>
                        <div className="contato__text">
                            Email:&nbsp;
                            <a className="link first after" href="mailto:dev@otaviosanchez.com">dev@otaviosanchez.com</a>
                        </div>
                        <div className="contato__text first after">
                            São Paulo - SP
                        </div>
                        <div className="contato__text">
                            Celular:&nbsp;
                            <a className="link first after" href="tel:11945336910">(11) 94533-6910</a>
                        </div>
                    </div>
                    <div className="o-col-md-12 o-col-xs-8">
                        <FormContato/>
                    </div>
                </div>
            </section>
        );
    }
};

class FormContato extends React.Component {
    render() {
        return (
            <form
                className="form"
                action="mailto:dev@otaviosanchez.com"
                method="post">
                <div className="o-col-md-12 o-col-xs-6">
                    <input
                        type="text"
                        name="assunto"
                        id="assunto"
                        className="textbox"
                        placeholder="Assunto*"
                        required/>
                </div>
                <div className="o-col-md-12 o-col-xs-6">
                    <input
                        type="tel"
                        name="telefone"
                        id="telefone"
                        className="textbox"
                        placeholder="Telefone"/>
                </div>
                <div className="o-col-md-12 o-col-xs-6">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="textbox"
                        placeholder="Seu Nome*"
                        required/>
                </div>
                <div className="o-col-md-12 o-col-xs-6">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="textbox"
                        placeholder="Email*"
                        required/>
                </div>
                <div className="o-col-md-12 o-col-xs-12">
                    <textarea
                        className="textbox--mensagem"
                        name="comment"
                        id="comment"
                        placeholder="Mensagem*"
                        required></textarea>
                </div>
                <div className="row">
                    <input
                        type="submit"
                        className="button button-2"
                        value="Enviar"
                        name="enviar"
                        id="enviar"/>
                </div>
            </form>
        );
    }
};

class SVGSprite extends React.Component {
    render() {
        return (
            <svg className={this.props.class}>
                <use xlinkHref={"#" + this.props.id}></use>
            </svg>
        );
    }
};

class SVG extends React.Component {
    render() {
        return (
            <svg alt={this.props.name} className={this.props.class}>
                <use xlinkHref={'#' + this.props.id}></use>
            </svg>
        );
    }
};

export default Home