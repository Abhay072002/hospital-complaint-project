import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
  return (
    <>
    <Container fluid>
        <Row>
            <Col className=' border-top d-flex justify-content-center'>
            <p className=' mt-4 text-muted'>© 2024 Hospital Task & Complaint Management System. All rights reserved.</p>
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default Footer