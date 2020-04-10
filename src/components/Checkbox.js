import React from "react";

export class Checkbox extends React.Component {
  componentDidMount() {
    this.refs.ref.indeterminate = this.props.indeterminate;
  }

  componentDidUpdate(previousProps) {
    if (previousProps.indeterminate !== this.props.indeterminate) {
      this.refs.ref.indeterminate = this.props.indeterminate;
    }
  }

  render() {
    const { label, ...props } = this.props;
    return (
      <label>
        <input type="checkbox" ref="ref" {...props} />
        <span>{label}</span>
      </label>
    );
  }
}
