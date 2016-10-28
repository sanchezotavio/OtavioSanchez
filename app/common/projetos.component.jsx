import React, { Component } from 'react';

class Projetos extends Component {
    render(){
        return (<SobreSection/>);
    }
}

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

                        <div  className="o-col-xs-6 o-col-lg-12">
                            <figure className="sobre__figure">
                                <img src="styles/images/otavio-sanchez.jpg" className="sobre__image" alt="Otávio Sanchez" />
                            </figure>
                            <article id="quemsou">
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
                            </article>


                        </div>
                        <div className="o-col-md-12 o-col-xs-6">
                            <div className="sobre__mobile">
                                <div className="display">

                                    <SVGSprite  id="battery" class="battery"  />

                                    <div className="hour">
                                        {new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) }
                                    </div>

                                    <SVGSprite  id="wifi" class="wifi" />
                                    
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
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

var SVG = React.createClass({
    render: function () {
        return (
            <svg alt={this.props.name} className={this.props.class}>
                <use xlinkHref={ '#' + this.props.id }></use>
            </svg>
        );
    }
});

export default Projetos