import React from "react";
import { Card, Row, Col, Button, ListGroup, FormCheck } from "react-bootstrap";
import { Checkbox } from "./Checkbox";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export class TransferList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: [],
      left: [0, 1, 2, 3],
      right: [4, 5, 6, 7],
    };

    this.numberOfChecked = this.numberOfChecked.bind(this);
  }

  handleToggle(value) {
    const currentIndex = this.state.checked.indexOf(value);
    const newChecked = [...this.state.checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  }

  leftChecked() {
    return intersection(this.state.checked, this.state.left);
  }
  rightChecked() {
    return intersection(this.state.checked, this.state.right);
  }

  numberOfChecked(items) {
    return intersection(this.state.checked, items).length;
  }

  handleToggleAll(items) {
    if (this.numberOfChecked(items) === items.length) {
      this.setState(function (prevState) {
        return {
          checked: not(prevState.checked, items),
        };
      });
    } else {
      this.setState(function (prevState) {
        return {
          checked: union(prevState.checked, items),
        };
      });
    }
  }

  handleCheckedRight() {
    this.setState(function (prevState) {
      return {
        right: prevState.right.concat(this.leftChecked()),
        left: not(prevState.left, this.leftChecked()),
        checked: not(prevState.checked, this.leftChecked()),
      };
    });
  }

  handleCheckedLeft() {
    this.setState(function (prevState) {
      return {
        left: prevState.left.concat(this.rightChecked()),
        right: not(prevState.right, this.rightChecked()),
        checked: not(prevState.checked, this.rightChecked()),
      };
    });
  }

  customList(title, items) {
    return (
      <Card>
        <Card.Body>
          <Card.Title>
            <Checkbox
              onClick={() => {
                this.handleToggleAll(items);
              }}
              checked={
                this.numberOfChecked(items) === items.length &&
                items.length !== 0
              }
              indeterminate={
                this.numberOfChecked(items) !== items.length &&
                this.numberOfChecked(items) !== 0
              }
              disabled={items.length === 0}
            />
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {`${this.numberOfChecked(items)}/${items.length} selected`}
          </Card.Subtitle>

          <ListGroup className="makeStyles-list-3">
            {items.map((value) => {
              const labelId = `transfer-list-all-item-${value}-label`;

              return (
                <ListGroup.Item key={value}>
                  <FormCheck
                    checked={this.state.checked.indexOf(value) !== -1}
                    type="checkbox"
                    id={`${labelId}`}
                    onChange={() => {
                      this.handleToggle(value);
                    }}
                    label={`List item ${value + 1}`}
                  />
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Card.Body>
      </Card>
    );
  }

  render() {
    let leftChecked = this.leftChecked();
    let rightChecked = this.rightChecked();
    return (
      <React.Fragment>
        <Row className="justify-content-md-center align-items-center">
          <Col lg="3">
            <h4>Transfer List</h4>
          </Col>
        </Row>
        <Row className="justify-content-md-center align-items-center">
          <Col lg="3">{this.customList("Choices", this.state.left)}</Col>
          <Col lg="1">
            <Row className="flex-column align-items-center">
              <Button
                style={{ minWidth: "64px" }}
                className="mb-1"
                variant="outline-secondary"
                size="sm"
                onClick={() => {
                  this.handleCheckedRight();
                }}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
              >
                &gt;
              </Button>
              <Button
                style={{ minWidth: "64px" }}
                variant="outline-secondary"
                size="sm"
                onClick={() => {
                  this.handleCheckedLeft();
                }}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
              >
                &lt;
              </Button>
            </Row>
          </Col>
          <Col lg="3">{this.customList("Chosen", this.state.right)}</Col>
        </Row>
      </React.Fragment>
    );
  }
}
