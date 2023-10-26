import React, { useRef } from 'react'
import { Navbar, Container, Nav, Button, Form, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = () => {

  const searchRef = useRef()

  const clickFeatures = () => {
    
  }

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark" style={{justifyContent:'space-between'}}>
        <Container style={{padding : '0', margin: '0', marginLeft : '1vw'}}>
          <Navbar.Brand href="/">
            <img alt=''
              src='https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png'
              width= '120px'/>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/" className='link-item'>Home</Link>
            <Link to="#" className='link-item' onClick={()=>{
              clickFeatures()
            }}>Features</Link>
          </Nav>
        </Container>
        <Form inline action='/search'>
          <Row style={{padding: '0', margin: '0'}}>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Search"
                className=" mr-sm-2"
                style={{outline : 'none'}}
                ref = {searchRef}
              />
            </Col>
            <Col xs="auto" >
              <Button variant="outline-danger" type="submit">Search</Button>
            </Col>
          </Row>
        </Form>
      </Navbar>
    </div>
  )
}

export default Header