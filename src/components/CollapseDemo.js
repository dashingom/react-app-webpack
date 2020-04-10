import React, { Component } from "react";
import Collapsible from "react-collapsible";

class CollapseDemo extends Component {
  render() {
    return (
      <React.Fragment>
        <Collapsible trigger="Start here">
          <p>
            This is the collapsible content. It can be any element or React
            component you like.
          </p>
          <p>
            It can even be another Collapsible component. Check out the next
            section!
          </p>
        </Collapsible>
        <Collapsible trigger="Start here">
          <p>
            This is the collapsible content. It can be any element or React
            component you like.
          </p>
          <p>
            It can even be another Collapsible component. Check out the next
            section!
          </p>
        </Collapsible>
        <Collapsible trigger="Start here">
          <p>
            This is the collapsible content. It can be any element or React
            component you like.
          </p>
          <p>
            It can even be another Collapsible component. Check out the next
            section!
          </p>
        </Collapsible>
      </React.Fragment>
    );
  }
}

export default CollapseDemo;
