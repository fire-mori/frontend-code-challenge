import React, { Component } from 'react';
import { Container, Row, Col, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import data from './api/data.json';
import logo from './archipro_dev.webp';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data,
      sortDirection: "desc",
    };
  }

  getTable() {
    const headers = ["Name", "Email", "Phone"]
    return (
      <Table className="App-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              // temporary solution - index
              <th key={index} onClick={() => { this.sortBy(header); }}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody key={this.state.sortDirection}>
          {this.getRow()}
        </tbody>
      </Table>
    );
  }

  getRow() {
    const data = this.state.data;
    return data.map(
      ({ _id, name, email, phone }) => (
        <tr key={_id}>
          <td>{name}</td>
          <td>{email}</td>
          <td>{phone}</td>
        </tr>
      )
    );
  }

  compareBy(key, sortDirection) {
    return function (a, b) {
      if (sortDirection === "asc") {
        return (a[key] < b[key]) ? 1 : -1;
      }
      if (sortDirection === "desc") {
        return (a[key] > b[key]) ? 1 : -1;
      }
      return 0
    };
  }


  sortBy(key) {

    let arrayCopy = [...this.state.data];
    const sortDirection = (this.state.sortDirection === "asc" ? "desc" : "asc");
    arrayCopy.sort(this.compareBy(key, sortDirection));
    this.setState({
      sortDirection,
      data: arrayCopy,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <main className="App-content">
          <Container>
            <Row>
              <Col>
                {this.getTable()}
              </Col>
            </Row>
          </Container>

        </main>
      </div>
    );
  }
}

export default App;
