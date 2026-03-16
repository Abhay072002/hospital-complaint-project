import { useAuth } from "../../context/AuthContext";
import api from "../../axios/instance";
import { useNavigate } from "react-router-dom";
import { Container, NavDropdown } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import mainLogo from "../../assets/header-logo.png";
import "./StaffHeader.css"

const StaffHeader = () => {
  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      navigate("/staff/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Container>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/staff">
            <img className="header-logo" src={mainLogo} alt="header-logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto header-nav">
              <Nav.Link as={Link} to="/staff">
                Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/staff/tasks">
                My Tasks
              </Nav.Link>
              </Nav>
             <Nav className="ms-auto"> 
              <NavDropdown
                id="nav-dropdown-dark-example"
                title={user?.fullName}
                menuVariant="dark"
              >
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
    
  );
};

export default StaffHeader;
