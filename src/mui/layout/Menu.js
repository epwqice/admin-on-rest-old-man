import React, { PropTypes } from 'react';
import inflection from 'inflection';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router';
import pure from 'recompose/pure';
import compose from 'recompose/compose';
import DashboardMenuItem from './DashboardMenuItem';
import translate from '../../i18n/translate';

const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100%',
    },
};

const translatedResourceName = (resource, translate) =>
    translate(`resources.${resource.name}.name`, {
        smart_count: 2,
        _: resource.options && resource.options.label ?
            translate(resource.options.label, { smart_count: 2, _: resource.options.label }) :
            inflection.humanize(inflection.pluralize(resource.name)),
    });

const createMenu = (menuStruct) => {
  for (let r of menuStruct) {

  }

  const menuStructKeys = Object.keys(menuStruct);


}

const Menu = ({ hasDashboard, onMenuTap, resources, translate, logout }) => {
  const menuStruct = {};
  for (let r of resources) {
    const rMenuID = r.menuID;
    if (!menuStruct[rMenuID]) {
      menuStruct[rMenuID] = [];
      menuStruct[rMenuID].items = [];
    }
    menuStruct[rMenuID].local = r.menuLocal;
    menuStruct[rMenuID].items.push(r.name);
  }
  console.log('menuStruct');
  console.log(menuStruct);
  menuStruct.map(index => console.log(index));
  return (
    <div style={styles.main}>
      {hasDashboard && <DashboardMenuItem onTouchTap={onMenuTap}/>}
      {
        menuStruct.map(index =>
        <MenuItem
          key={index}
          primaryText={menuStruct[index].local}
          leftIcon={<resource.icon />}
          menuItems={[
            menuStruct[index].items.map(item =>
              <MenuItem
                key={item}
                containerElement={<Link to={`/${menu + "/" + item}`}/>}
                primaryText={translatedResourceName(item, translate)}
                leftIcon={<resource.icon />}
                onTouchTap={onMenuTap}
              />
            )
          ]}
        />
        )
      }
      {logout}
    </div>
  );
}

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
