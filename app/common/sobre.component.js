import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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
                                <img src="../styles/images/otavio-sanchez.jpg" className="sobre__image" alt="Otávio Sanchez" />
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
                            </article>

                            <header className="sobre__item">
                                <h2 className="item__title align_h_center">Skills</h2>
                            </header>
                            <div  className="sobre__item">
                                <Skills />
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
                                <h2 className="item__title">Experiência Acadêmica</h2>
                            </header>
                            <div  className="sobre__item">
                                <Profissional />
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
                                <Certificacoes />
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
                        <h1 className="title">{l.instituicao}</h1>
                        <h2 className="cursos__sub">{l.nome}</h2>
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
                        <h1 className="title">{l.empresa}</h1>
                        <h2 className="cursos__sub">{l.nome}</h2>
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
                            <li className="cursos__sub title">{l.instituicao}</li>
                            <li className="cursos__sub">{l.nome}</li>
                            <li className="data">{l.data}</li>
                        </ul>
                    </li>
                }) }
            </ul>
        );
    }
});

var Certificacoes = React.createClass({
    render: function () {
        return (
            <ul className="cursos">
                {certificacoes.map(function (l) {
                    return <li className="cursos__item">

                        <ul className="cursos__list">
                            <li className="cursos__sub title">{l.instituicao}</li>
                            <li className="cursos__sub">{l.nome}</li>
                            <li className="cursos__sub"><a href={l.link} target="_blank" className="link">Acessar</a></li>
                            <li className="data">{l.data}</li>
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
                            <li className="cursos__sub title">{l.instituicao}</li>
                            <li className="cursos__sub ">{l.nome}</li>
                            <li className="data">{l.data}</li>
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
    { nome: 'Curso Técnico de Informática para Internet', data: 'Junho de 2010 a Dezembro de 2011', instituicao: 'Centro Paula Souza - ETEC São Mateus' },
    { nome: 'Criação de Web Sites em HTML 5 e CSS 3.0', data: 'Julho de 2013 a Agosto de 2013', instituicao: 'SENAC' },
    { nome: ' Programando em C# com Visual Studio', data: 'Janeiro de 2014', instituicao: 'SENAC' },
];

var cursosAleatorios = [
    { nome: 'Arduino na UFABC', data: 'Janeiro de 2014', instituicao: 'Universidade Federal do ABC - UFABC' }
];

var academico = [
    { nome: 'Bacharel Ciência e Tecnologia', data: 'Julho de 2013 a Dezembro de 2017', instituicao: 'Universidade Federal do ABC - UFABC ', descricao: 'Dando ênfase para a formação em Ciências da Computação' }
];

var profissional = [
    { nome: 'Universidade Federal do ABC', data: 'Março de 2014 a Março de 2015 ', empresa: 'PIBID – Programa de iniciação à docência', descricao: 'Bolsista que atuava desenvolvendo projetos em sala de aula e auxiliando o trabalho do professor. Além de atuar desenvolvendo sistemas digitais que contribuíssem para o ensino e aprendizado dos alunos. Área de atuação: Matemática' }
];

var skills = [
    { nome: 'HTML5', nivel: 9 },
    { nome: 'CSS3', nivel: 8 },
    { nome: 'SASS', nivel: 8 },
    { nome: 'Javascript', nivel: 8 },
    { nome: 'AngularJS', nivel: 7 },
    { nome: 'NodeJS', nivel: 7 },
    { nome: 'React', nivel: 8 },
    { nome: 'C#', nivel: 6 },
    { nome: '.NET', nivel: 6 }
];



var certificacoes = [
    { nome: '70-480 - Programming in HTML5 with JavaScript and CSS3', data: '2/26/2016', instituicao: 'MCPS: Microsoft Certified Professional', link: 'http://www.mycertprofile.com/Profile/1599820672' }
]

export default Sobre