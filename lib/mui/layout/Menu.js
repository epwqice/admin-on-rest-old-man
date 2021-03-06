'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _inflection = require('inflection');

var _inflection2 = _interopRequireDefault(_inflection);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _reactRouter = require('react-router');

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _DashboardMenuItem = require('./DashboardMenuItem');

var _DashboardMenuItem2 = _interopRequireDefault(_DashboardMenuItem);

var _translate = require('../../i18n/translate');

var _translate2 = _interopRequireDefault(_translate);

var _viewList = require('material-ui/svg-icons/action/view-list');

var _viewList2 = _interopRequireDefault(_viewList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100%'
    },
    menu: {
        margin: '0 0 0 1em'
    }
};

var translatedResourceName = function translatedResourceName(resource, translate) {
    return translate('resources.' + resource.name + '.name', {
        smart_count: 2,
        _: resource.options && resource.options.label ? translate(resource.options.label, { smart_count: 2, _: resource.options.label }) : _inflection2.default.humanize(_inflection2.default.pluralize(resource.name))
    });
};

var createMenu = function createMenu(resources, translate, onMenuTap) {
    var groupName = void 0;
    var childNode = [];

    resources.filter(function (r) {
        return r.list;
    }).map(function (resource) {
        if (resource.group !== groupName) {
            groupName = resource.group;
            childNode.push(_react2.default.createElement(_MenuItem2.default, {
                key: groupName,
                primaryText: resource.groupLocal

            }));
        }
        childNode.push(_react2.default.createElement(_MenuItem2.default, {
            key: resource.name,
            primaryText: translatedResourceName(resource, translate),
            containerElement: _react2.default.createElement(_reactRouter.Link, { to: '/' + resource.name }),
            leftIcon: _react2.default.createElement(resource.icon, null),
            onTouchTap: onMenuTap
        }));
    });

    return childNode;
};

var Menu = function Menu(_ref) {
    var hasDashboard = _ref.hasDashboard,
        onMenuTap = _ref.onMenuTap,
        resources = _ref.resources,
        translate = _ref.translate,
        logout = _ref.logout,
        basePath = _ref.basePath;
    return _react2.default.createElement(
        'div',
        { style: styles.main },
        hasDashboard && _react2.default.createElement(_DashboardMenuItem2.default, { onTouchTap: onMenuTap }),
        createMenu(resources, translate, onMenuTap, basePath),
        logout
    );
};

Menu.propTypes = {
    hasDashboard: _react.PropTypes.bool,
    logout: _react.PropTypes.element,
    onMenuTap: _react.PropTypes.func,
    resources: _react.PropTypes.array.isRequired,
    translate: _react.PropTypes.func.isRequired,
    basePath: _react.PropTypes.string
};

Menu.defaultProps = {
    onMenuTap: function onMenuTap() {
        return null;
    }
};

var enhance = (0, _compose2.default)(_pure2.default, _translate2.default);

exports.default = enhance(Menu);
module.exports = exports['default'];