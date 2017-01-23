import React, { Component } from 'react';

class Projetos extends Component {
    render() {
        return (<ProjetosSection />);
    }
}

var ProjetosSection = React.createClass({
    render: function () {
        return (
            <section className="section projetos border" id="projetos">

                <header className="projetos__header">
                    <h1 className="projetos__title">
                        Projetos
                    </h1>
                    <span className="division"></span>
                    <h2 className="projetos__title--sub">
                         Conheça meu portfólio e alguns de meus projetos pessoais.
                    </h2>                  
                </header>

                <article className="container">

                    {projetos.map(function (l) {
                        return <div className="projetos__list  display-flex">
                            <div className="o-col-xs-3 o-col-md-12">
                                <img src={l.img} className="projeto__img" alt={l.title}/>
                            </div>
                            <div className="o-col-xs-9 o-col-md-12">
                                <h2 className="title">{l.title}</h2>
                                <p className="projetos__text">{l.descricao}</p>
                                <a className="button button-1" target="_blank" href={l.link} title={"Acessar " + l.title}>
                                    <svg>
                                        <rect fill="none" height="100%" width="100%" x="0" y="0">
                                        </rect></svg> Acessar Projeto
                                </a>                             
                            </div>
                        </div>
                    }) }
                </article>

            </section>

        );
    }
});



var projetos = [
    { title: 'Igapira Consultoria', href: 'http://igapiraconsultoria.com.br/', img:  'styles/images/png/igapira-1.png', descricao: 'A Igapira Consultoria Turística, é uma empresa especializada na elaboração de estudos e planejamento de turismo em nível nacional. Foi criada no ano de 2015, por jovens empreendedores com formação superior em turismo, que resolveram por em prática os conhecimentos adquiridos na universidade.' , github: '' , link: 'http://igapiraconsultoria.com.br/' },
    { title: 'Nilsan Ferramentaria', href: 'http://nilsan.com.br', img: 'styles/images/png/nilsan-1.PNG', descricao: 'A Nilsan é uma empresa especializada no ramo de injeção de plásticos.' , github: '' , link: 'http://nilsan.com.br/'  },
    { title: 'Associação Bianca Alves', href: 'http://associacaobiancaalves.ga/', img:  'styles/images/png/aba.png', descricao: 'Associação sem fins lucrativos de caráter filantrópico, fundada em 2007. Atende portadores de múltipla deficiência, disponibilizando seus voluntários em psicologia, fonoaudiologia e fisioterapia. Oferece todo o tratamento gratuito aos seus pacientes.' , github: ''  , link: 'http://associacaobiancaalves.ga/'  }
];



export default Projetos