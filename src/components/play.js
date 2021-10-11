import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import pluralize from 'pluralize'
import { LinkContainer } from 'react-router-bootstrap'

const Play = () => {
  const MAX_NUMBER_OF_TRIES = 12
  const CHARACTER_VARIANCE = 6

  const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
  const letterFromNumber = (number) => String.fromCharCode(65 + number)
  const validInput = () => {
    let v = ""
    for (let i = 0; i < CHARACTER_VARIANCE; i++) {
      v += letterFromNumber(i)
    }
    return v
  }

  const generateCode = () => {
    let code = ""
    for (let i = 0; i < 4; i++) {
      code += letterFromNumber(randomIntFromInterval(1, CHARACTER_VARIANCE - 1))
    }
    return code
  };

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

  const calculateHint = (guess) => {
    let tempCode = code.split('')
    let tempGuess = guess.split('')
    let bullCount = 0
    let cowCount = 0

    for (let i = 0; i < tempGuess.length; i++) {
      if (tempGuess[i] === tempCode[i]) {
        bullCount ++
        tempCode[i] = null
        tempGuess[i] = null
      }
    }

    for (let i = 0; i < tempGuess.length; i++) {
      if (!!tempGuess[i] && tempCode.includes(tempGuess[i])) {
        cowCount++
        tempCode[tempCode.indexOf(tempGuess[i])] = null
      }
    }

    return `${pluralize("Bull", bullCount, true)}, ${pluralize("Cow", cowCount, true)}`
  }

  const updateAttempts = (guess) => {
    const currentAttempt = {
      guess: guess,
      hint: calculateHint(guess),
    }
    setAttempts(old => [...old, currentAttempt])
  }

  const updateCurrentGuess = (value) => {
    if (validInput().includes(value.charAt(value.length-1).toUpperCase()) && value.length <= 4) {
      setCurrentGuess(value.toUpperCase())
    }
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
        {!!gameEnd ? <span>{code}</span> : <span>Good luck!</span> }
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
            type="text"
            placeholder={`Enter 4 letters from A to ${letterFromNumber(CHARACTER_VARIANCE - 1).toUpperCase()}`}
            value={currentGuess}
            onChange={e => updateCurrentGuess(e.target.value)}
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
