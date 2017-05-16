'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _shouldUpdate = require('recompose/shouldUpdate');

var _shouldUpdate2 = _interopRequireDefault(_shouldUpdate);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _linkToRecord = require('../../util/linkToRecord');

var _linkToRecord2 = _interopRequireDefault(_linkToRecord);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuButton = function MenuButton(_ref) {
  var _ref$basePath = _ref.basePath,
      basePath = _ref$basePath === undefined ? '' : _ref$basePath,
      label = _ref.label,
      theme = _ref.theme;
  return _react2.default.createElement(_FlatButton2.default, {
    label: label,
    containerElement: _react2.default.createElement(_reactRouter.Link, { to: basePath }),
    style: { overflow: 'inherit', color: theme.flatButton.menuTextColor }
  });
};

MenuButton.propTypes = {
  basePath: _react.PropTypes.string,
  label: _react.PropTypes.string,
  threm: _react.PropTypes.element
};

var enhance = (0, _compose2.default)((0, _shouldUpdate2.default)(function (props, nextProps) {
  return props.record && props.record.id !== nextProps.record.id || props.basePath !== nextProps.basePath;
}));

exports.default = enhance(MenuButton);
module.exports = exports['default'];