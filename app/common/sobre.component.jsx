import React, { Component } from 'react';

var SobreSection = React.createClass({
    render: function () {
        return (
            <section className="sobre bg border" id="sobre">
                <header className="sobre__header">
                    <h2 className="sobre__title">Quem Sou</h2>
                    <span className="division"></span>
                </header>
                <div className="container">
                    <div className="quem_sou display-flex">
                        <div className="o-col-md-12 o-col-xs-3">
                            <figure className="sobre__figure--alter">
                                <img src="styles/images/otavio-sanchez.jpg" className="sobre__image" alt="Otávio Sanchez" />
                            </figure>
                        </div>
                        <div  className="o-col-md-12 o-col-xs-9">
                            <article id="quemsou">
                                <p className="paragraph">
                                    Olá, me chamo Otávio Sanchez.Sou Desenvolvedor Web, entusiasta de tecnologia, autodidata e apaixonado por código.
                                </p>
                                <p className="paragraph">
                                    Estudante do Bacharelado em Ciência e Tecnologia pela Universidade Federal do ABC - curso multidisciplinar - que me permitiu abrir espaço para novas possibilidades através da tecnologia da informação em suas mais diferentes vertentes.
                                </p>

                                <Skills />

                            </article>

                            <hr className="hr" />

                            <header className="sobre__item">
                                <h2 className="item__title">Profissional</h2>
                            </header>
                            <div  className="sobre__item">
                                <Profissional />
                            </div>

                            <hr className="hr" />

                            <header className="sobre__item">
                                <h2 className="item__title">Academico</h2>
                            </header>
                            <div  className="sobre__item">
                                <Academico />
                            </div>

                            <hr className="hr" />

                            <header className="sobre__item">
                                <h2 className="item__title">Cursos</h2>
                            </header>
                            <div  className="sobre__item">
                                <Cursos />
                            </div>

                            <hr className="hr" />

                            <header className="sobre__item">
                                <h2 className="item__title">Certificações</h2>
                            </header>
                            <div  className="sobre__item">
                                <CursosAleatorios />
                            </div>

                            <hr className="hr" />

                            <header className="sobre__item">
                                <h2 className="item__title">Outros Cursos</h2>
                            </header>
                            <div  className="sobre__item">
                                <CursosAleatorios />
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        );
    }
});


var Academico = React.createClass({
    render: function () {
        return (
            <ul className="academico">
                {academico.map(function (l) {
                    return <li className="cursos__item">
                        <h1 className="title">{l.nome}</h1>
                        <h2 className="title--sub">{l.instituicao}</h2>
                        <p className="text">{l.descricao}</p>
                        <div className="data">{l.data}</div>
                    </li>
                }) }
            </ul>
        );
    }
});


var Skills = React.createClass({
    render: function () {
        return (
            <div className="skills">
                {skills.map(function (l) {
                    return <div className="skills__item"> {l.nome} <span className="skills__nivel">{l.nivel}</span> </div>
                }) }
            </div>
        );
    }
});


var Profissional = React.createClass({
    render: function () {
        return (
            <ul className="profissional">
                {profissional.map(function (l) {
                    return <li className="cursos__item">
                        <h1 className="title">{l.nome}</h1>
                        <h2 className="title--sub">{l.instituicao}</h2>
                        <p className="text">{l.descricao}</p>
                        <div className="data">{l.data}</div>
                    </li>
                }) }
            </ul>
        );
    }
});


var Cursos = React.createClass({
    render: function () {
        return (
            <ul className="cursos">
                {cursos.map(function (l) {
                    return <li className="cursos__item">
                        <ul className="cursos__list">
                            <li className="cursos__sub title">{l.nome}</li>
                            <li className="cursos__sub">{l.instituicao}</li>
                            <li className="cursos__sub">{l.data}</li>
                        </ul>
                    </li>
                }) }
            </ul>
        );
    }
});

var Certificações = React.createClass({
    render: function () {
        return (
            <ul className="cursos">
                {certificacoes.map(function (l) {
                    return <li className="cursos__item">

                        <ul className="cursos__list">
                            <li className="cursos__sub title">{l.nome}</li>
                            <li className="cursos__sub">{l.instituicao}</li>
                            <li className="cursos__sub">{l.data}</li>
                            <li className="cursos__sub">{l.link}</li>
                        </ul>
                    </li>
                }) }
            </ul>
        );
    }
});


var CursosAleatorios = React.createClass({
    render: function () {
        return (
            <ul className="cursos">
                {cursosAleatorios.map(function (l) {
                    return <li className="cursos__item">
                        <ul className="cursos__list">
                            <li className="cursos__sub title"> {l.nome}</li>
                            <li className="cursos__sub ">{l.instituicao}</li>
                            <li className="cursos__sub">{l.data}</li>
                        </ul>
                    </li>
                }) }
            </ul>
        );
    }
});



class Sobre extends Component {
    render() {
        return (<SobreSection />);
    }
}

var cursos = [
    { nome: 'Senac', data: 'auuuii aui', instituicao: '' },
    { nome: 'Senac', data: 'auuuii aui', instituicao: '' },

];

var cursosAleatorios = [
    { nome: 'Senac', data: 'auuuii aui', instituicao: '' },
    { nome: 'Senac', data: 'auuuii aui', instituicao: '' },

];

var academico = [
    { nome: 'Senac', data: 'auuuii aui', instituicao: '', descricao: 'asdjsisaji' }
];

var profissional = [
    { nome: 'Senac', data: 'auuuii aui', empresa: '', descricao: 'asdjsisaji' }
];

var skills = [
    { nome: 'HTML', nivel: 8},
    { nome: 'CSS', nivel: 6 }
];

var certificacoes = [
    { nome: 'Microsoft', data: 'auuuii aui', instituicao: '', link: 'auuuii aui' }
]

export default Sobre