import React, { PropTypes } from 'react';
import ViewListIcon from 'material-ui/svg-icons/action/view-list';

const componentPropType = PropTypes.oneOfType([PropTypes.func, PropTypes.string]);

const Resource = () => <span>&lt;Resource&gt; elements are for configuration only and should not be rendered</span>;

Resource.propTypes = {
    categoryID: PropTypes.string.isRequired,
    menuID: PropTypes.string.isRequired,
    name: PropTypes.string,
    menuLocal: PropTypes.string,
    list: componentPropType,
    create: componentPropType,
    edit: componentPropType,
    show: componentPropType,
    remove: componentPropType,
    icon: componentPropType,
    options: PropTypes.object,
    checkCredentials: PropTypes.func,
};

Resource.defaultProps = {
    icon: ViewListIcon,
    options: {},
};

export default Resource;
