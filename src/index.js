import React from "react";
import ReactDom from "react-dom";
import { Container, Row, Col } from "react-bootstrap";
//import TabsDemo from "./components/TabsDemo";
import CollapseDemo from "./components/CollapseDemo";
import { TransferList } from "./components/TransferList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sass/app.scss";

const App = () => {
  var items = [
    { name: "Item 1", id: 1 },
    { name: "Item 2", id: 2 },
    { name: "Item 3", id: 3 },
    { name: "Item 4", id: 4 },
  ];
  return (
    <Container>
      <Row>
        <Col>
          <TransferList items={items} />
        </Col>
      </Row>
    </Container>
  );
};

ReactDom.render(<App />, document.getElementById("root"));
