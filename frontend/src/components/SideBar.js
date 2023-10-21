import React, { useState } from 'react'
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse,
} from 'mdb-react-ui-kit'
import { Link , useNavigate} from 'react-router-dom'

export default function App() {
  const [showNavColor, setShowNavColor] = useState(false)
  const navigate = useNavigate();
  return (
    <>
      <MDBNavbar expand='lg' dark bgColor='primary'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>Navbar</MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarColor02'
            aria-controls='navbarColor02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavColor(!showNavColor)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse show={showNavColor} navbar>
            <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
              <MDBNavbarItem className='active'>
              <Link to='/home'><MDBNavbarLink aria-current='page' href='/home'>
                  Home
                </MDBNavbarLink></Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
                 <Link to='/history'><MDBNavbarLink >History</MDBNavbarLink></Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <Link to='/login'><MDBNavbarLink>User Details</MDBNavbarLink></Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='#'>About</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  )
}
