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

  toggleSortDirection() {
    const newState = (this.state.sortDirection === "asc" ? "desc" : "asc");
    this.setState({
      sortDirection: newState,
    });
  }
  getTable() {
    const headers = ["Name", "Email", "Phone"]
    return (
      <Table className="App-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              // temporary solution - index
              <th key={index} onClick={() => { this.sortBy(header); console.log(this.state.sortDirection) }}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
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

  compareBy(key) {
    const sortDirection = this.state.sortDirection;
    this.toggleSortDirection();
    return function (a, b) {
      if (sortDirection === "asc") {
        return (a[key] > b[key]) ? 1 : -1;
      }
      if (sortDirection === "desc") {
        return (a[key] < b[key]) ? -1 : 1;
      }
      return 0;
    };
  }

  sortBy(key) {
    let arrayCopy = [...this.state.data];
    arrayCopy.sort(this.compareBy(key));
    this.setState({ data: arrayCopy });
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
