import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classSet from 'react-classset';

class Tabs extends Component {
  static propTypes = {
    tabActive: PropTypes.number,
    onBeforeChange: PropTypes.func,
    onAfterChange: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.component
    ]).isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      tabActive: this.props.tabActive,
    };
  }

  render = () => {
    var menuItems = this._getMenuItems();
    var panelsList = this._getPanels();

    return (
      <div className="tabs">
        {menuItems}
        {panelsList}
      </div>
    );
  }

  setActive = (e) => {
    var id = parseInt(e.target.getAttribute('data-tab-id'));
    var onAfterChange = this.props.onAfterChange;
    var onBeforeChange = this.props.onBeforeChange;
    var $selectedPanel = this.refs['tab-panel-' + id];
    var $selectedTabMenu = this.refs['tab-menu-' + id];

    if (onBeforeChange) {
      onBeforeChange(id, $selectedPanel, $selectedTabMenu);
    }

    this.setState({ tabActive: id }, function () {
      if (onAfterChange) {
        onAfterChange(id, $selectedPanel, $selectedTabMenu);
      }
    });

    e.preventDefault();
  }

  _getMenuItems = () => {
    if (!this.props.children) {
      throw new Error('Tabs must contain at least one Tabs.Panel');
    }

    if (!Array.isArray(this.props.children)) {
      this.props.children = [this.props.children];
    }

    var $menuItems = this.props.children.map(function ($panel, index) {
      var ref = 'tab-menu-${index + 1}';
      var title = $panel.props.title;
      var classes = classSet({
        'tabs-menu-item': true,
        'is-active': this.state.tabActive === (index + 1)
      });

      return (
        <li ref={ref} key={index} className={classes}>
          <a href='#' data-tab-id={index + 1} onClick={this.setActive}>{title}</a>
        </li>
      );
    }.bind(this));

    return (
      <nav className="tabs-navigation">
        <ul className="tabs-menu">
          {$menuItems}
        </ul>
      </nav>
    );
  }

  _getPanels = () => {
    var $panels = this.props.children.map(function ($panel, index) {
      var ref = 'tab-panel-${index + 1}';
      var classes = classSet({
        'tabs-panel': true,
        'is-active': this.state.tabActive === (index + 1)
      });

      return (
        <article ref={ref} key={index} className={classes}>{$panel}</article>
      );
    }.bind(this));

    return (
      <section className="tabs-panels">
        {$panels}
      </section >
    );
  }
}

export default Tabs;