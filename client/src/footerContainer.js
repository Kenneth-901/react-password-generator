import React from "react";
import Footer from './components/footer/footer';

const FooterContainer = () => {
  return(
    <Footer>
      <Footer.Wrapper>
        <Footer.Row>
          <Footer.Column>
          <Footer.Title>About Us</Footer.Title>
            <Footer.Label>Content</Footer.Label>
          </Footer.Column>
          <Footer.Column>
          <Footer.Title>Services</Footer.Title>
            <Footer.Link href="/genPassword.js">Password Meter</Footer.Link>
            <Footer.Link href="/genPassword.js">Passowrd Generator</Footer.Link>
          </Footer.Column>
          <Footer.Column>
          <Footer.Title>Contact Us</Footer.Title>
            <Footer.Link href="contactForm">Message Us</Footer.Link>
          </Footer.Column>
        </Footer.Row>
      </Footer.Wrapper>
    </Footer>
  )
}

export default FooterContainer