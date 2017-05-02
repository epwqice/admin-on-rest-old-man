import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import FlatButton  from 'material-ui/FlatButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import muiThemeable from 'material-ui/styles/muiThemeable';
import compose from 'recompose/compose';
import { toggleSidebar as toggleSidebarAction } from '../../actions';
import MenuButton from '../button/MenuButton';


const AppBar = ({ title, toggleSidebar, appMenus, theme }) => (
    <Toolbar>
        <ToolbarGroup firstChild={true}>
            <IconButton onTouchTap={toggleSidebar}>
                <ActionHome />
            </IconButton>
            <ToolbarTitle text={title} />
        </ToolbarGroup>
        <ToolbarGroup>
          {appMenus && appMenus.map(menu =>
            <MenuButton  label={menu.local} source={menu.index} theme={theme} basePath={menu.index} />
          )}
        </ToolbarGroup>
        <ToolbarSeparator />
    </Toolbar>
);

AppBar.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]).isRequired,
    toggleSidebar: PropTypes.func.isRequired,
    theme: PropTypes.element,
};

const enhance = compose(
    muiThemeable(), // force redraw on theme change
    connect(null, {
        toggleSidebar: toggleSidebarAction,
    }),
);

export default enhance(AppBar);
