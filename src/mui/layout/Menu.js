import React, { PropTypes } from 'react';
import inflection from 'inflection';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router';
import pure from 'recompose/pure';
import compose from 'recompose/compose';
import DashboardMenuItem from './DashboardMenuItem';
import translate from '../../i18n/translate';
import ViewListIcon from 'material-ui/svg-icons/action/view-list';

const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100%',
    },
    menu: {
        margin: '0 0 0 1em',
    },
};

const translatedResourceName = (resource, translate) =>
    translate(`resources.${resource.name}.name`, {
        smart_count: 2,
        _: resource.options && resource.options.label ?
            translate(resource.options.label, { smart_count: 2, _: resource.options.label }) :
            inflection.humanize(inflection.pluralize(resource.name)),
    });

const createMenu = (resources, translate, onMenuTap) => {
    let groupName;
    const childNode = [];
    resources
        .filter(r => r.list)
        .map((resource) => {
            if (resource.group !== groupName) {
              groupName = resource.group;
              childNode.push(React.createElement(MenuItem, {
                    key: groupName,
                    primaryText: resource.groupLocal,

                }));
            }
          childNode.push(React.createElement(MenuItem, {
                key: resource.name,
                primaryText: translatedResourceName(resource, translate),
                containerElement: <Link to={`/${resource.name}`} />,
                leftIcon: <resource.icon />,
                onTouchTap: onMenuTap,
            }));
        });

    return childNode;
};

const Menu = ({ hasDashboard, onMenuTap, resources, translate, logout }) => (
    <div style={styles.main}>
        {hasDashboard && <DashboardMenuItem onTouchTap={onMenuTap} />}
        {createMenu(resources, translate, onMenuTap)}
        {logout}
    </div>
);

Menu.propTypes = {
    hasDashboard: PropTypes.bool,
    logout: PropTypes.element,
    onMenuTap: PropTypes.func,
    resources: PropTypes.array.isRequired,
    translate: PropTypes.func.isRequired,
};

Menu.defaultProps = {
    onMenuTap: () => null,
};

const enhance = compose(
    pure,
    translate,
);

export default enhance(Menu);
