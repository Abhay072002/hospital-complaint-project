import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import "./Home.css";
import { CiEdit } from "react-icons/ci";
import { RiEdit2Fill, RiLoopLeftLine } from "react-icons/ri";
import { MdOutlineDownloadDone } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="navbar-wrapper">
        <Container>
          <Row>
            <Col md={6} className=" main-heading text-start">
              <div className=" d-flex flex-column">
                <h1>
                  <span className="heading-black"> Hospital Task &</span>
                  <br />
                  <span className="heading-blue">Complaint Management</span>
                  <br />
                  <span className="heading-black">System</span>
                </h1>
                <p className=" fs-5">
                  Streamline your healthcare experience with our comprehensive
                  task and complaint management platform. Submit complaints
                  easily, track progress, and ensure timely resolution of all
                  your concerns.
                </p>
              </div>
            </Col>
            <Col
              md={6}
              className="home-btns d-flex justify-content-center align-items-center"
            >
              <div className="d-flex flex-column  mb-3">
                <button
                onClick={()=>navigate("/submit")}
                className="complaint-btn py-4 border rounded fw-bold">
                  Submit Complaint
                </button>
                <button className="track-btn py-4 border rounded mt-4 fw-bold" onClick={() => navigate("/track")}>
                  Track Status
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className=" mt-5">
        <Container>
          <Row>
            <Col className=" d-flex flex-column align-items-center">
              <h6 className=" fw-bold">How It Works</h6>
              <p className="">
                Simple steps to submit and track your complaints
              </p>
            </Col>
          </Row>
          <Row className="mt-5 mb-5 g-4">
            <Col md={4}>
              <Card className="how-it-works-card p-4 border-0 shadow text-center">
                <div className=" d-flex justify-content-center mt-3">
                  <RiEdit2Fill size={35} fill="blue" />
                </div>
                <h6 className=" d-flex justify-content-center mt-3 fw-bold">
                  Submit Complaint{" "}
                </h6>
                <p className="text-center px-3 text-muted">
                  Fill out a simple form with your details and complaint
                  description.
                </p>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="how-it-works-card p-4 border-0 shadow text-center">
                <div className=" d-flex justify-content-center mt-3">
                  <RiLoopLeftLine size={35} fill="red" />
                </div>
                <h6 className=" d-flex justify-content-center mt-3 fw-bold">
                  Track Progress
                </h6>
                <p className="text-center px-3 text-muted">
                  Your complaint is assigned to staff and tracked until
                  resolution.
                </p>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="how-it-works-card p-4 border-0 shadow text-center">
                <div className=" d-flex justify-content-center mt-3">
                  <MdOutlineDownloadDone size={35} fill="green" />
                </div>
                <h6 className=" d-flex justify-content-center mt-3 fw-bold">
                  Get Resolution
                </h6>
                <p className="text-center px-3 text-muted">
                  Receive timely updates and confirmation when your issue is
                  resolved.
                </p>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Home;
