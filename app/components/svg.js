import React, { Component } from 'react';
import ReactDOM from 'react-dom';

var SVG = React.createClass({
    render: function () {
        return (
            <img id={this.props.id} className={this.props.class} src={"./styles/images/svg/" + this.props.name + ".svg"} />
        );
    }
});