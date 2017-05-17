import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import muiThemeable from 'material-ui/styles/muiThemeable';
import compose from 'recompose/compose';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import { toggleSidebar as toggleSidebarAction } from '../../actions';
import ActionHome from 'material-ui/svg-icons/action/home';
import { blue50 } from 'material-ui/styles/colors';

const iconStyles = {
    marginRight: 24,
};

const click = index => (e) => {
    const curUrl = document.location.href;
    window.location.href = `${curUrl.split('/').slice(0, 3).join('/')}/${index}`;
};

const AppBar = ({ title, toggleSidebar, appMenus }) => (
    <Toolbar
        title={title}
        onLeftIconButtonTouchTap={toggleSidebar}
    >
        <ToolbarGroup firstChild>
            <IconButton tooltip={title} onTouchTap={toggleSidebar}>
                <ActionHome color={blue50} />
            </IconButton>
            <ToolbarTitle text={title} />
        </ToolbarGroup>
        <ToolbarGroup>
            {appMenus && appMenus.map(appMenu => <RaisedButton
                label={appMenu.local}
                primary
                onTouchTap={click(appMenu.index)}
            />)}
        </ToolbarGroup>
    </Toolbar>
);

AppBar.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]).isRequired,
    toggleSidebar: PropTypes.func.isRequired,
    appMenus: PropTypes.array,
};

const enhance = compose(
    muiThemeable(), // force redraw on theme change
    connect(null, {
        toggleSidebar: toggleSidebarAction,
    }),
);

export default enhance(AppBar);
