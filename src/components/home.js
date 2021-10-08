import React from 'react'
import bull from '../bull.jpg'
import { LinkContainer } from 'react-router-bootstrap'
import Button from 'react-bootstrap/Button'

const Home = () => (
  <div>
    <img src={bull} className="bull-photo" alt="logo" />
    <p>
      Welcome to Bulls and Cows (also known as <b><i>Master Mind</i></b>)
    </p>
    <LinkContainer to="/play">
      <Button>
        Click here to begin!
      </Button>
    </LinkContainer>
  </div>
)

export default Home
