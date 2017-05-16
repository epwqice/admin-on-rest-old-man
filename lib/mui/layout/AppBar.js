'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _muiThemeable = require('material-ui/styles/muiThemeable');

var _muiThemeable2 = _interopRequireDefault(_muiThemeable);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _Toolbar = require('material-ui/Toolbar');

var _FontIcon = require('material-ui/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _actions = require('../../actions');

var _home = require('material-ui/svg-icons/action/home');

var _home2 = _interopRequireDefault(_home);

var _colors = require('material-ui/styles/colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iconStyles = {
    marginRight: 24
};

var click = function click(index) {
    return function (e) {
        var curUrl = document.location.href;
        window.location.href = curUrl.split('/').slice(0, 3).join('/') + '/' + index;
    };
};

var AppBar = function AppBar(_ref) {
    var title = _ref.title,
        toggleSidebar = _ref.toggleSidebar,
        appMenus = _ref.appMenus;
    return _react2.default.createElement(
        _Toolbar.Toolbar,
        {
            title: title,
            onLeftIconButtonTouchTap: toggleSidebar
        },
        _react2.default.createElement(
            _Toolbar.ToolbarGroup,
            { firstChild: true },
            _react2.default.createElement(
                _IconButton2.default,
                { tooltip: title, onTouchTap: toggleSidebar },
                _react2.default.createElement(_home2.default, { color: _colors.blue50 })
            ),
            _react2.default.createElement(_Toolbar.ToolbarTitle, { text: title })
        ),
        _react2.default.createElement(
            _Toolbar.ToolbarGroup,
            null,
            appMenus && appMenus.map(function (appMenu) {
                return _react2.default.createElement(_RaisedButton2.default, {
                    label: appMenu.local,
                    primary: true,
                    onTouchTap: click(appMenu.index)
                });
            })
        )
    );
};

AppBar.propTypes = {
    title: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]).isRequired,
    toggleSidebar: _react.PropTypes.func.isRequired,
    appMenus: _react.PropTypes.array
};

var enhance = (0, _compose2.default)((0, _muiThemeable2.default)(), // force redraw on theme change
(0, _reactRedux.connect)(null, {
    toggleSidebar: _actions.toggleSidebar
}));

exports.default = enhance(AppBar);
module.exports = exports['default'];