import React, { Component } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";

class header extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar collapseOnSelect expand="md">
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src="/logo.png" alt="logo" />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="header-collapse">
            <FontAwesomeIcon icon={faBars} color="#ffaa00" />
          </Navbar.Toggle>
          <Navbar.Collapse id="header-collapse">
            <Nav fill className="ml-auto">
              <NavDropdown title="Menu" id="nav-dropdown">
                <LinkContainer to="/menu/Quencher" eventKey="1.1">
                  <NavDropdown.Item>Quencher</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/menu/Snacks" eventKey="1.2">
                  <NavDropdown.Item>Snacks</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer eventKey="1.3" to="/menu/Breakfast">
                  <NavDropdown.Item>Breakfast</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer eventKey="1.4" to="/menu/Main Course">
                  <NavDropdown.Item>Main Course</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer eventKey="1.5" to="/menu/Cuisines">
                  <NavDropdown.Item>Cuisines</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer eventKey="1.6" to="/menu/Desserts">
                  <NavDropdown.Item>Desserts</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer eventKey="1.7" to="/menu/Vrat">
                  <NavDropdown.Item>Vrat Recipes</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <Nav.Item>
                <LinkContainer eventKey="2" to="/menu">
                  <Nav.Link>All Recipes</Nav.Link>
                </LinkContainer>
              </Nav.Item>
              <Nav.Item>
                <LinkContainer eventKey="3" to="/about">
                  <Nav.Link>About</Nav.Link>
                </LinkContainer>
              </Nav.Item>
              <div className="search">
                <input
                  type="text"
                  placeholder="Search.."
                  value={this.props.str}
                  onChange={(e) => this.props.handleChange(e.target.value)}
                />
                <FontAwesomeIcon icon={faSearch} color="#ffaa00" />
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default header;
