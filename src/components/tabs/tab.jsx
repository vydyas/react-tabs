import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Tab extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        children: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.component
        ]).isRequired
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}