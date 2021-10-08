import './App.css'
import Rules from './components/rules'
import Home from './components/home'
import Navigation from './components/navigation'
import Play from './components/play'
import React from 'react'
import { Switch, Route } from 'react-router-dom'

const App = () => (
  <div className="App">
    <Navigation />
    <div className="component">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/play">
          <Play />
        </Route>
        <Route path="/rules">
          <Rules />
        </Route>
      </Switch>
    </div>
  </div>
)

export default App
