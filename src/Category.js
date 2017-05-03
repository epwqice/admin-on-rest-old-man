import React, { PropTypes } from 'react';
import ViewListIcon from 'material-ui/svg-icons/action/view-list';

const componentPropType = PropTypes.oneOfType([PropTypes.func, PropTypes.string]);

const ResourceGroup = () => <span>&lt;Resource&gt; elements are for configuration only and should not be rendered</span>;

ResourceGroup.propTypes = {
    name: PropTypes.string.isRequired,
    icon: componentPropType,
    options: PropTypes.object,
};

ResourceGroup.defaultProps = {
    icon: ViewListIcon,
    options: {},
};

export default ResourceGroup;
