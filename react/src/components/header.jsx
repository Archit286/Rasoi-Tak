import React, { Component } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import Logo from ".././images/logo.png";

class header extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar collapseOnSelect expand="md">
          <Navbar.Brand href="/">
            <img src={Logo} alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="header-collapse">
            <FontAwesomeIcon icon={faBars} color="#ffaa00" />
          </Navbar.Toggle>
          <Navbar.Collapse id="header-collapse">
            <Nav fill className="ml-auto">
              <NavDropdown title="Menu" id="nav-dropdown">
                <NavDropdown.Item eventKey="1.1" href="/menu/Quencher">
                  Quencher
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="1.2" href="/menu/Snacks">
                  Snacks
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="1.3" href="/menu/Breakfast">
                  Breakfast
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="1.4" href="/menu/Main Course">
                  Main Course
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="1.5" href="/menu/Cuisines">
                  Cuisines
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="1.6" href="/menu/Desserts">
                  Desserts
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="1.7" href="/menu/Vrat">
                  Vrat Recipes
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Item>
                <Nav.Link eventKey="2" href="/menu">
                  All Recipes
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="3" href="/about">
                  About
                </Nav.Link>
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
