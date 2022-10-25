import * as React from 'react';
import PropTypes from 'prop-types';

const ViewEditToggle = ({ isEditMode, renderView, renderEdit }) => (
  <React.Fragment>
    {
      !isEditMode
        ? renderView
        : renderEdit
    }
  </React.Fragment>
);

ViewEditToggle.propTypes = {
  isEditMode: PropTypes.bool,
  renderView: PropTypes.any,
  renderEdit: PropTypes.element,
};

export default ViewEditToggle;