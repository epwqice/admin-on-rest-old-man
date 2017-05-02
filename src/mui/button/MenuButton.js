import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import shouldUpdate from 'recompose/shouldUpdate';
import compose from 'recompose/compose';
import FlatButton from 'material-ui/FlatButton';
import linkToRecord from '../../util/linkToRecord';
import { Redirect } from 'react-router';

const MenuButton = ({ basePath = '', label,  theme }) => <FlatButton
  label={label}
  containerElement={<Link to={basePath} />}
  style={{ overflow: 'inherit', color: theme.flatButton.menuTextColor }}
/>;

MenuButton.propTypes = {
  basePath: PropTypes.string,
  label: PropTypes.string,
  threm: PropTypes.element,
};

const enhance = compose(
  shouldUpdate((props, nextProps) =>
    props.record
    && props.record.id !== nextProps.record.id
    || props.basePath !== nextProps.basePath
  )
);

export default enhance(MenuButton);
