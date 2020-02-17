import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  label: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired
};

class SidebarItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isChecked: false };
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
  }

  toggleCheckboxChange() {
    const { handleCheckboxChange, label } = this.props;
    const { isChecked } = this.state;
    this.setState({ isChecked: !isChecked });
    handleCheckboxChange(label);
  };

  render() {
    const { label, classes } = this.props;
    const { isChecked } = this.state;

    return (
      <div className={classes}>
        <label>
          <input
            type="checkbox"
            value={label}
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
          />

          <span className="checkmark">{label}</span>
        </label>
      </div>
    );
  }
}

SidebarItem.propTypes = propTypes;

export default SidebarItem;
