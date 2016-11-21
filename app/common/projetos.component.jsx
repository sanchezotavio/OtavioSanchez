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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    </h2>
                    <div className="row">
                        <div className="o-col-xs-12">
                            Filtro
                        </div>
                    </div>
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
                                <a href={l.link} title={"Acessar " + l.title} className="link">Acessar</a>
                            </div>
                        </div>
                    }) }
                </article>

            </section>

        );
    }
});



var projetos = [
    { title: 'Projeto 1', href: 'http://otaviosanchez.com', img: 'https://www.invisionapp.com/subsystems/main_landing/assets/img/screens/ecommerce-5.png', descricao: 'auuuii aui' },
    { title: 'Projeto 2', href: 'http://otaviosanchez.com', img: 'https://www.invisionapp.com/subsystems/main_landing/assets/img/screens/ecommerce-5.png', descricao: 'auuuii aui' },
    { title: 'Projeto 3', href: 'http://otaviosanchez.com', img: 'https://www.invisionapp.com/subsystems/main_landing/assets/img/screens/ecommerce-5.png', descricao: 'auuuii aui' }
];



export default Projetos