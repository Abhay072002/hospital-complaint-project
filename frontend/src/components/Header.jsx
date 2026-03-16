
import { Container } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import mainLogo from "../assets/header-logo.png"
import "./header.css"


const Header = () => {
  return (
    <Container>
        <Navbar expand="lg" >
      <Container>
        <Navbar.Brand as = {Link} to="/">
          <img className='header-logo' src={mainLogo} alt="header-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as = {Link} to ="/">Home</Nav.Link>
            <Nav.Link as = {Link} to ="/submit">Submit</Nav.Link>
            <Nav.Link as = {Link} to ="/track">Track</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </Container>
  )
}

export default Header