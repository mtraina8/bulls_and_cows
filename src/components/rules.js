import Container from 'react-bootstrap/Container'
import React from 'react'

const About = () => (
  <Container className="p-4">
    <p>Bulls and Cows is a code guessing game. A random code is generated every time you play. Enter your guess at the bottom, consisting of 4 letters from A - F, and get a hint back that follows the form below</p>
    <h4>Bulls</h4>
    <p>An individual letter is deemed a 'bull' if it exists in the code <b>and</b> it is in the correct location. For example, with a code of "ABDDE" and a guess of "EBCCC", the "B" in the guess is the correct letter in the correct location</p>
    <h4>Cows</h4>
    <p>An individual letter is deemed a 'cow' if it exists in the code but <b>not</b> in the correct location. In the above example, the letter "E" would be a Cow because it is in the code, but <i>not</i> in the correct location</p>
    <a href="https://en.wikipedia.org/wiki/Bulls_and_Cows" target="_blank" rel="noreferrer">Read more on wikipedia</a>
  </Container>
)

export default About
