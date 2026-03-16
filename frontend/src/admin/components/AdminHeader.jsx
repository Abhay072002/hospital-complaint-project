
import { Container, NavDropdown } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import mainLogo from "../../assets/header-logo.png";
import { useAuth } from "../../context/AuthContext";
import api from "../../axios/instance";

const AdminHeader = () => {
    const navigate = useNavigate();
    const {user, setUser} = useAuth();

    const handleLogout = async () =>{
        try {
            await api.post("/auth/logout");
            setUser(null);
            navigate("/admin/login")
        } catch (error) {
            console.log(error);
        }

    }
  return (
    <div className="bg-body-tertiary">
      <Container>
      <Navbar expand="lg" >
        <Container>
          <Navbar.Brand as={Link} to="/admin">
            <img className="header-logo" src={mainLogo} alt="header-logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto fw-bold">
              <Nav.Link as={Link} to="/admin">
                Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/staff">
                Staff
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/tasks">
                Tasks
              </Nav.Link> 
              <Nav.Link as={Link} to="/admin/complaints">
                Complaints
              </Nav.Link>
              </Nav>
              <Nav className="ms-auto">
              <NavDropdown
                id="nav-dropdown-dark-example"
                title={user?.fullName}
                menuVariant="dark"
              >
                <NavDropdown.Item as={Link} to="/admin/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
    </div>
     
  )
}

export default AdminHeader