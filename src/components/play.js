import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import pluralize from 'pluralize'

const Play = () => {
  const MAX_NUMBER_OF_TRIES = 12
  const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
  const generateCode = () => `${randomIntFromInterval(1000, 10000)}`

  const [code, setCode] = useState(generateCode())
  const [attempts, setAttempts] = useState([])
  const [currentGuess, setCurrentGuess] = useState('')
  const [gameEnd, setGameEnd] = useState(null)

  const reset = () => {
    setAttempts([])
    setCurrentGuess('')
    setGameEnd(null)
    setCode(generateCode())
  }

  useEffect(() => {
    if (attempts.length >= MAX_NUMBER_OF_TRIES && !gameEnd) {
      setGameEnd("You lost :(")
    } else if (attempts.length > 0 && attempts[attempts.length - 1].guess === code) {
      setGameEnd("You won :)")
    }
  }, [gameEnd, attempts, code])

  const calculateHint = (guess, code) => {
    let tempCode = code.split('')
    let tempGuess = guess.split('')
    let bullCount = 0

    for (var i = 0; i < guess.length; i++) {
      if (guess.charAt(i) === code.charAt(i)) {
        bullCount ++
        tempCode[i] = null
        tempGuess[i] = null
      }
    }

    const cowCount = tempCode.filter(value => tempGuess.includes(value) && value != null).length

    return `${pluralize("Bull", bullCount, true)}, ${pluralize("Cow", cowCount, true)}`
  }
  const updateAttempts = (guess) => {
    const currentAttempt = {
      guess: guess,
      hint: calculateHint(guess, code),
    }
    setAttempts(old => [...old, currentAttempt])
  }

  const onSubmit = e => {
    e.preventDefault()
    updateAttempts(currentGuess)
    setCurrentGuess('')
  }

  const DisplayAttempts = () => (
    <Table size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Attempt</th>
          <th>Hint</th>
        </tr>
      </thead>
      <tbody>
        {attempts.map((attempt, i) =>
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{attempt.guess}</td>
            <td>{attempt.hint}</td>
          </tr>
        )}
      </tbody>
    </Table>
  )

  return (
    <Container>
      <div className="p-5 pb-0 d-flex justify-content-between">
        <Button variant="warning" onClick={reset}>Restart</Button>
        {!!gameEnd ? <span>{code}</span> : <span>Good luck!</span>}
        <LinkContainer to="/">
          <Button variant="danger">Quit</Button>
        </LinkContainer>
      </div>

      <hr />

      {attempts.length > 0 && <DisplayAttempts />}
      {gameEnd && <h1>{gameEnd}</h1>}

      <Form id='input-box' className="p-5" onSubmit={onSubmit}>
        <InputGroup>
          <Form.Control
            type="number"
            placeholder="Enter a positive 4 digit number"
            value={currentGuess}
            onChange={e => setCurrentGuess(e.target.value)}
            disabled={!!gameEnd}
            required
          />
          <Button
            type="submit"
            disabled={!!gameEnd || currentGuess.length > 4 || currentGuess.length < 4}
          >
            Submit
          </Button>
        </InputGroup>
      </Form>
    </Container>
  )
}

export default Play
